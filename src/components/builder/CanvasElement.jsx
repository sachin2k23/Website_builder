import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import {
  AtSign,
  CheckCircle2,
  Feather,
  GitBranch,
  Globe2,
  Link,
  Orbit,
  Shapes,
  Smile,
  Star,
  Trash2,
  Zap,
  Pencil,
} from 'lucide-react'
import { getElementLayout, getResponsiveValue, setElementLayout, getResponsiveFontSize } from '../../utils/responsive'
import { clampBoxToCanvas, getContainedElements, getSnapResult, isContainerElement } from '../../utils/editorGeometry'
import {
  getResizeDirection,
  DEFAULT_MIN_WIDTH,
  DEFAULT_MIN_HEIGHT
} from './box-model/boxModelUtils'
import { calculateStableResize } from './box-model/boxModelConstraints'

const HANDLES = [
  { id: 'nw', cursor: 'nw-resize', style: { top: -5,                left: -5                } },
  { id: 'n',  cursor: 'n-resize',  style: { top: -5,                left: 'calc(50% - 4px)' } },
  { id: 'ne', cursor: 'ne-resize', style: { top: -5,                right: -5               } },
  { id: 'e',  cursor: 'e-resize',  style: { top: 'calc(50% - 4px)', right: -5               } },
  { id: 'se', cursor: 'se-resize', style: { bottom: -5,             right: -5               } },
  { id: 's',  cursor: 's-resize',  style: { bottom: -5,             left: 'calc(50% - 4px)' } },
  { id: 'sw', cursor: 'sw-resize', style: { bottom: -5,             left: -5                } },
  { id: 'w',  cursor: 'w-resize',  style: { top: 'calc(50% - 4px)', left: -5                } },
]

const ICON_COMPONENTS = {
  iconic:   Smile,
  phosphor: Shapes,
  hero:     AtSign,
  feather:  Feather,
  meteor:   Globe2,
  material: Zap,
  basicons: Orbit,
  flowbite: GitBranch,
  nonicons: Feather,
  sargam:   CheckCircle2,
}

// ─── Types that support inline text editing ────────────────────────────────────
const EDITABLE_TYPES = new Set([
  'heading', 'paragraph', 'text', 'link', 'label',
  'button', 'select', 'checkbox',
])

// ─── Types where the native input IS the editing UI ───────────────────────────
const NATIVE_INPUT_TYPES = new Set(['input', 'textarea'])

const STYLE_ID = '__canvas-el-styles__'

const cssLength = (value, fallback = '0px') => {
  const text = String(value ?? '').trim()
  if (!text) return fallback
  if (text === 'auto' || /^-?\d*\.?\d+(px|%|rem)$/i.test(text)) return text
  if (/^-?\d*\.?\d+$/.test(text)) return `${text}px`
  return fallback
}

function ensureCanvasElementStyles() {
  if (typeof document === 'undefined' || document.getElementById(STYLE_ID)) return
  const s = document.createElement('style')
  s.id = STYLE_ID
  s.textContent = `
    .ce-root:not(.ce-selected):hover::before {
      content: '';
      position: absolute;
      inset: -4px;
      border: 2px solid #0EA5E9;
      border-radius: inherit;
      pointer-events: none;
      z-index: 12;
      opacity: 1;
      box-shadow: 0 0 0 3px rgba(14,165,233,0.15), inset 0 0 0 1px rgba(14,165,233,0.1);
      transition: all 0.15s ease;
    }

    .ce-root:not(.ce-selected):hover .ce-hover-label { opacity: 1; }

    .ce-hover-label {
      opacity: 0;
      transition: opacity 0.1s ease;
      position: absolute;
      top: -24px;
      left: 0;
      background: linear-gradient(135deg, #2348D7 0%, #1a37b8 100%);
      color: #fff;
      font-size: 11px;
      font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      font-weight: 600;
      padding: 4px 8px;
      border-radius: 4px;
      white-space: nowrap;
      pointer-events: none;
      z-index: 20;
      box-shadow: 0 2px 8px rgba(35,72,215,0.3);
    }

    .ce-root.ce-selected::after {
      content: '';
      position: absolute;
      inset: -3px;
      border: 2px solid #0EA5E9;
      border-radius: inherit;
      pointer-events: none;
      z-index: 12;
      box-shadow: 0 0 0 4px rgba(14,165,233,0.15),
                  inset 0 0 0 1px rgba(14,165,233,0.1),
                  0 0 12px rgba(14,165,233,0.2);
    }

    .ce-root.ce-selected::before {
      content: '';
      position: absolute;
      inset: 0;
      border: 1px solid rgba(14,165,233,0.3);
      border-radius: inherit;
      pointer-events: none;
      z-index: 11;
      background: radial-gradient(circle at top-left, rgba(14,165,233,0.08) 0%, transparent 100%);
    }

    /* Editing mode ring — overrides the selection outline */
    .ce-root.ce-editing::after {
      border-color: #f59e0b !important;
      box-shadow: 0 0 0 4px rgba(245,158,11,0.15),
                  0 0 12px rgba(245,158,11,0.2) !important;
    }
    .ce-root.ce-editing::before {
      border-color: rgba(245,158,11,0.3) !important;
    }

    .ce-root { cursor: move; }

    .ce-resize-handle {
      position: absolute;
      background: white;
      border: 2px solid #2348D7;
      border-radius: 3px;
      width: 10px;
      height: 10px;
      z-index: 20;
      transition: all 0.1s ease;
      box-shadow: 0 2px 6px rgba(35,72,215,0.25);
    }
    .ce-resize-handle:hover {
      transform: scale(1.15);
      box-shadow: 0 2px 8px rgba(35,72,215,0.4);
      background: #f0f8ff;
    }

    /* Edit-mode hint badge */
    .ce-edit-badge {
      position: absolute;
      bottom: -22px;
      left: 50%;
      transform: translateX(-50%);
      background: #f59e0b;
      color: white;
      font-size: 10px;
      font-weight: 700;
      font-family: Inter, sans-serif;
      padding: 2px 8px;
      border-radius: 4px;
      white-space: nowrap;
      pointer-events: none;
      z-index: 30;
      box-shadow: 0 2px 6px rgba(245,158,11,0.35);
      letter-spacing: 0.3px;
    }

    /* Editing cursor for contentEditable elements */
    [contenteditable="true"] {
      cursor: text !important;
      caret-color: #2348D7;
    }
  `
  document.head.appendChild(s)
}

// ─── Scale a numeric value proportionally using the geometric mean of x/y scales ─
// Using the geometric mean (√(sx·sy)) gives balanced scaling when width and height
// change by different amounts, matching how Figma scales text and padding.
function scaleValue(baseValue, scaleX, scaleY) {
  return baseValue * Math.sqrt(scaleX * scaleY)
}

// ─── Default baseline dimensions per element type (used when element has no stored baseline) ─
const TYPE_BASELINES = {
  heading:   { width: 400, height: 60,  fontSize: 32, paddingH: 0,  paddingV: 0  },
  label:     { width: 120, height: 24,  fontSize: 11, paddingH: 0,  paddingV: 0  },
  paragraph: { width: 320, height: 80,  fontSize: 16, paddingH: 0,  paddingV: 0  },
  text:      { width: 320, height: 80,  fontSize: 16, paddingH: 0,  paddingV: 0  },
  link:      { width: 120, height: 24,  fontSize: 16, paddingH: 0,  paddingV: 0  },
  button:    { width: 160, height: 44,  fontSize: 14, paddingH: 24, paddingV: 12 },
  input:     { width: 240, height: 44,  fontSize: 14, paddingH: 12, paddingV: 10 },
  textarea:  { width: 240, height: 120, fontSize: 14, paddingH: 12, paddingV: 10 },
  select:    { width: 200, height: 44,  fontSize: 14, paddingH: 12, paddingV: 10 },
  checkbox:  { width: 140, height: 24,  fontSize: 14, paddingH: 0,  paddingV: 0  },
  image:     { width: 300, height: 200, fontSize: 14, paddingH: 0,  paddingV: 0  },
  video:     { width: 320, height: 180, fontSize: 32, paddingH: 0,  paddingV: 0  },
  icon:      { width: 48,  height: 48,  fontSize: 24, paddingH: 0,  paddingV: 0  },
  divider:   { width: 300, height: 2,   fontSize: 0,  paddingH: 0,  paddingV: 0  },
  card:      { width: 320, height: 200, fontSize: 14, paddingH: 16, paddingV: 16 },
  container: { width: 400, height: 300, fontSize: 14, paddingH: 16, paddingV: 16 },
  section:   { width: 800, height: 400, fontSize: 14, paddingH: 32, paddingV: 32 },
  frame:     { width: 400, height: 300, fontSize: 14, paddingH: 16, paddingV: 16 },
}

export default function CanvasElement({
  element,
  onSelect,
  onDelete,
  isSelected,
  onUpdate,
  onContextMenu,
  zoom = 1,
  activeBreakpoint = 'desktop',
  elements = [],
  canvasWidth = 1200,
  canvasHeight = 900,
  onInteractionGuides,
}) {
  useEffect(() => { ensureCanvasElementStyles() }, [])

  const dragging     = useRef(false)
  const startPos     = useRef({ mouseX: 0, mouseY: 0, elX: 0, elY: 0 })
  const dragChildren = useRef([])
  const resizing     = useRef(null)
  const resizeStart  = useRef({})

  const [isEditing, setIsEditing] = useState(false)
  const [nativeValue, setNativeValue] = useState(element.content || '')

  useEffect(() => {
    if (!isEditing) setNativeValue(element.content || '')
  }, [element.content, isEditing])

  const layout = getElementLayout(element, activeBreakpoint)
  const { x, y, width: w, height: h } = layout

  // ── Baseline dimensions: the "original" size this element was created at.
  //    Stored once in element.baselineWidth / element.baselineHeight so that
  //    proportional scaling always references the same origin across sessions.
  //    Falls back to type defaults if not yet stored.
  const typeDefaults = TYPE_BASELINES[element.type] || { width: 100, height: 40, fontSize: 14, paddingH: 0, paddingV: 0 }

  // ── FIX: Seed baselines on mount if they are missing.
  //
  //    THE BUG: Without this, on first render scaleX = w / typeDefaults.width.
  //    If the template element has a different size than the type default
  //    (e.g. a heading at width=800 vs typeDefault=400), scaleU = 2.0,
  //    inflating resolvedFontSize to 64px. The baselines were only written
  //    inside handleUpdate, which only fires on user interaction — so the
  //    inflated scale persisted until the first click/drag.
  //
  //    THE FIX: Write the baselines immediately at mount if they are absent,
  //    using the element's *actual* current layout dimensions as the reference
  //    point. This ensures scaleU = 1.0 on initial render for all elements
  //    that don't yet have baselines stored (e.g. template-loaded elements).
  //
  //    We use a ref to ensure this only fires once per element identity,
  //    even if the component re-renders before the async onUpdate propagates.
  const baselineSeedFiredRef = useRef(false)
  useEffect(() => {
    // Only seed if baselines are genuinely missing and we haven't already fired
    if (element.baselineWidth && element.baselineHeight) return
    if (baselineSeedFiredRef.current) return
    baselineSeedFiredRef.current = true

    const currentLayout = getElementLayout(element, activeBreakpoint)
    const seeded = {
      ...element,
      baselineWidth:        currentLayout.width,
      baselineHeight:       currentLayout.height,
      baselineFontSize:     element.fontSize      ?? typeDefaults.fontSize,
      baselinePaddingH:     element.paddingLeft   ?? element.paddingRight  ?? typeDefaults.paddingH,
      baselinePaddingV:     element.paddingTop    ?? element.paddingBottom ?? typeDefaults.paddingV,
      baselineBorderRadius: element.borderRadius  ?? element.radius        ?? 0,
    }
    // Use silent update (no commit) — we're just writing metadata, not
    // changing the visual layout. Pass { silent: true } so history stacks
    // don't record this as a user action.
    onUpdate(element.id, seeded, { silent: true })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [element.id]) // Only re-run if the element identity changes

  // ── Read baselines: prefer stored values; fall back to current layout dims.
  //    After the seed above propagates, element.baselineWidth will be set and
  //    scaleU will stabilise at 1.0 for the initial state.
  const baselineWidth  = element.baselineWidth  ?? w
  const baselineHeight = element.baselineHeight ?? h
  const baselineFontSize     = element.baselineFontSize     ?? (element.fontSize      ?? typeDefaults.fontSize)
  const baselinePaddingH     = element.baselinePaddingH     ?? (element.paddingLeft   ?? element.paddingRight  ?? typeDefaults.paddingH)
  const baselinePaddingV     = element.baselinePaddingV     ?? (element.paddingTop    ?? element.paddingBottom ?? typeDefaults.paddingV)
  const baselineBorderRadius = element.baselineBorderRadius ?? (element.borderRadius  ?? element.radius        ?? 0)

  // ── Current scale factors relative to baseline ──────────────────────────────
  const scaleX = baselineWidth  > 0 ? w / baselineWidth  : 1
  const scaleY = baselineHeight > 0 ? h / baselineHeight : 1
  // Uniform scale for scalar properties (font-size, border-radius, padding)
  const scaleU = Math.sqrt(scaleX * scaleY)

  // ── Derived scaled values — updated live as w/h changes during resize ────────
  const scaledFontSize     = Math.max(6,  Math.round(baselineFontSize     * scaleU * 10) / 10)
  const scaledPaddingH     = Math.max(0,  Math.round(baselinePaddingH     * scaleU))
  const scaledPaddingV     = Math.max(0,  Math.round(baselinePaddingV     * scaleU))
  const scaledBorderRadius = Math.max(0,  Math.round(baselineBorderRadius * scaleU))
  const scaledIconSize     = Math.max(8,  Math.round(Math.min(w, h) * 0.6))

  // ── Local update helper — routes layout keys through setElementLayout ─────────
  // Also seeds baseline dimensions the first time an element is moved/resized
  // so subsequent resizes always scale from a stable origin.
  const handleUpdate = useCallback((id, changes, options = {}) => {
    const layoutKeys = new Set(['x', 'y', 'width', 'height'])
    const layoutChanges = {}
    const styleChanges  = {}
    Object.entries(changes).forEach(([k, v]) => {
      if (layoutKeys.has(k)) layoutChanges[k] = v
      else                   styleChanges[k]  = v
    })

    let updated = Object.keys(styleChanges).length
      ? { ...element, ...styleChanges }
      : { ...element }

    if (Object.keys(layoutChanges).length) {
      updated = setElementLayout(updated, activeBreakpoint, layoutChanges)
    }

    // Seed baselines once — on the very first resize/drag commit — so all future
    // proportional scaling has a stable reference point.
    // NOTE: After the mount-time seed above, this branch should rarely fire for
    // new elements, but it's kept as a safety net for any element that slips
    // through (e.g. created programmatically without triggering the mount effect).
    if (!updated.baselineWidth || !updated.baselineHeight) {
      const currentLayout = getElementLayout(updated, activeBreakpoint)
      updated = {
        ...updated,
        baselineWidth:        currentLayout.width,
        baselineHeight:       currentLayout.height,
        baselineFontSize:     updated.fontSize  ?? typeDefaults.fontSize,
        baselinePaddingH:     updated.paddingLeft  ?? updated.paddingRight  ?? typeDefaults.paddingH,
        baselinePaddingV:     updated.paddingTop   ?? updated.paddingBottom ?? typeDefaults.paddingV,
        baselineBorderRadius: updated.borderRadius ?? updated.radius ?? 0,
      }
    }

    onUpdate(id, updated, options)
  }, [element, activeBreakpoint, onUpdate, typeDefaults])

  // ── Enter edit mode ──────────────────────────────────────────────────────────
  const enterEditMode = useCallback((e) => {
    e.stopPropagation()
    if (!isSelected) onSelect(element.id)
    setIsEditing(true)
  }, [isSelected, onSelect, element.id])

  // ── Commit edit (contentEditable) ────────────────────────────────────────────
  const commitEdit = useCallback((e) => {
    handleUpdate(element.id, { content: e.target.innerText })
    setIsEditing(false)
  }, [element.id, handleUpdate])

  // ── Commit edit (native input / textarea) ────────────────────────────────────
  const commitNativeEdit = useCallback((value) => {
    handleUpdate(element.id, { content: value })
    setIsEditing(false)
  }, [element.id, handleUpdate])

  // ── Exit on Escape, commit on Enter (for single-line) ────────────────────────
  const handleEditKeyDown = useCallback((e) => {
    e.stopPropagation()
    if (e.key === 'Escape') {
      setIsEditing(false)
    }
    if (e.key === 'Enter' && !e.shiftKey) {
      const multiline = ['paragraph', 'text', 'textarea'].includes(element.type)
      if (!multiline) {
        e.preventDefault()
        e.target.blur()
      }
    }
  }, [element.type])

  // ── Drag ─────────────────────────────────────────────────────────────────────
  const handleMouseDown = useCallback((e) => {
    if (isEditing) return
    e.stopPropagation()
    e.preventDefault()
    onSelect(element.id)
    dragging.current = true
    startPos.current = { mouseX: e.clientX, mouseY: e.clientY, elX: x, elY: y }
    dragChildren.current = isContainerElement(element)
      ? getContainedElements(element, elements, activeBreakpoint).map(childEl => ({
          element: childEl,
          layout: getElementLayout(childEl, activeBreakpoint),
        }))
      : []

    const onMove = (e) => {
      if (!dragging.current) return
      const dx = (e.clientX - startPos.current.mouseX) / zoom
      const dy = (e.clientY - startPos.current.mouseY) / zoom
      const nextBox = { x: startPos.current.elX + dx, y: startPos.current.elY + dy, width: w, height: h }
      const snap = getSnapResult({
        movingBox: nextBox,
        elements,
        activeId: element.id,
        ignoredIds: dragChildren.current.map(c => c.element.id),
        canvasWidth,
        canvasHeight,
        breakpointId: activeBreakpoint,
      })
      const clampedBox = clampBoxToCanvas({ ...nextBox, x: snap.x, y: snap.y }, canvasWidth, canvasHeight)
      onInteractionGuides?.(snap.guides)
      handleUpdate(element.id, { x: clampedBox.x, y: clampedBox.y })
      const snappedDx = clampedBox.x - startPos.current.elX
      const snappedDy = clampedBox.y - startPos.current.elY
      dragChildren.current.forEach(({ element: childEl, layout }) => {
        onUpdate(childEl.id, {
          x: Math.round((layout.x || 0) + snappedDx),
          y: Math.round((layout.y || 0) + snappedDy),
        })
      })
    }

    const onUp = () => {
      if (!dragging.current) return
      dragging.current = false
      dragChildren.current = []
      onInteractionGuides?.({ vertical: [], horizontal: [] })
      handleUpdate(element.id, { x, y }, { commit: true })
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }, [isEditing, element, x, y, w, h, elements, activeBreakpoint, zoom, canvasWidth, canvasHeight, onSelect, handleUpdate, onUpdate, onInteractionGuides])

  // ── Resize ───────────────────────────────────────────────────────────────────
  const handleResizeMouseDown = useCallback((e, handleId) => {
    e.stopPropagation()
    e.preventDefault()

    resizing.current = handleId

    resizeStart.current = {
      mouseX:  e.clientX,
      mouseY:  e.clientY,
      x,
      y,
      width:   w,
      height:  h,
      handleId,
    }

    // Track last computed box so onUp commits the correct final dimensions
    // rather than the stale closure values captured at drag-start.
    const lastBox = { x, y, width: w, height: h }

    const onMove = (moveEvent) => {
      if (!resizing.current) return

      // Convert absolute screen-space mouse positions → canvas-space by dividing
      // by zoom so all three inputs to calculateStableResize share the same space.
      const startCanvasPos = {
        x: resizeStart.current.mouseX / zoom,
        y: resizeStart.current.mouseY / zoom,
      }
      const currentCanvasPos = {
        x: moveEvent.clientX / zoom,
        y: moveEvent.clientY / zoom,
      }

      const startDimensions = {
        x:      resizeStart.current.x,
        y:      resizeStart.current.y,
        width:  resizeStart.current.width,
        height: resizeStart.current.height,
      }

      const newBox = calculateStableResize(
        startCanvasPos,
        currentCanvasPos,
        startDimensions,
        resizeStart.current.handleId,
        {
          minWidth:   DEFAULT_MIN_WIDTH,
          minHeight:  DEFAULT_MIN_HEIGHT,
          maxWidth:   canvasWidth,
          maxHeight:  canvasHeight,
          snapToGrid: false,
        }
      )

      const clampedBox = clampBoxToCanvas(newBox, canvasWidth, canvasHeight)

      const rounded = {
        x:      Math.round(clampedBox.x),
        y:      Math.round(clampedBox.y),
        width:  Math.round(clampedBox.width),
        height: Math.round(clampedBox.height),
      }

      // Keep lastBox in sync so onUp can commit the final dimensions.
      Object.assign(lastBox, rounded)

      handleUpdate(element.id, rounded)
    }

    const onUp = () => {
      if (!resizing.current) return
      resizing.current    = null
      resizeStart.current = {}
      onInteractionGuides?.({ vertical: [], horizontal: [] })

      // Commit lastBox (final resized dims), not stale closure x/y/w/h.
      handleUpdate(element.id, { ...lastBox }, { commit: true })

      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup',   onUp)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup',   onUp)
  }, [element.id, x, y, w, h, zoom, canvasWidth, canvasHeight, handleUpdate, onInteractionGuides])

  /* ── Visual styles (not layout) ── */
  const fill    = element.fill        || 'transparent'
  // Border-radius: use the live-scaled value during resize, otherwise use stored value.
  const radius  = cssLength(scaledBorderRadius || (element.borderRadius ?? element.radius ?? 0))
  const border  = element.borderColor ? `1.5px solid ${element.borderColor}` : undefined
  const shadow  = element.shadowColor ? `0 4px 24px ${element.shadowColor}` : undefined
  const opacity = (element.opacity    ?? 100) / 100
  const isFrameLike = isContainerElement(element)

  // ── Resolved font size: prefer explicitly-set fontSize from the properties panel,
  //    but scale it proportionally when the element is being resized.
  //    If the user has never explicitly set a font size, fall back to getResponsiveFontSize.
  const resolvedFontSize = useMemo(() => {
    if (activeBreakpoint !== 'desktop') {
      return getResponsiveFontSize(element, activeBreakpoint, typeDefaults.fontSize)
    }
    // If a font size is explicitly stored in the element, scale it proportionally.
    if (element.fontSize != null) {
      return Math.max(6, Math.round(element.fontSize * scaleU * 10) / 10)
    }
    // Otherwise use the responsive helper (which reads breakpoint overrides) and scale.
    const base = getResponsiveFontSize(element, activeBreakpoint, typeDefaults.fontSize)
    return Math.max(6, Math.round(base * scaleU * 10) / 10)
  }, [element, activeBreakpoint, scaleU, typeDefaults.fontSize])

  // ── Shared props for contentEditable text elements ───────────────────────────
  const sharedTextProps = (defaultColor, defaultWeight, defaultLine) => ({
    contentEditable: isEditing,
    suppressContentEditableWarning: true,
    onDoubleClick: enterEditMode,
    onBlur: commitEdit,
    onKeyDown: handleEditKeyDown,
    style: {
      color:       element.textColor || defaultColor,
      fontSize:    `${resolvedFontSize}px`,
      fontWeight:  getResponsiveValue(element, activeBreakpoint, 'fontWeight', defaultWeight),
      fontFamily:  element.fontFamily || 'inherit',
      textAlign:   getResponsiveValue(element, activeBreakpoint, 'textAlign', element.textAlign || 'left'),
      lineHeight:  getResponsiveValue(element, activeBreakpoint, 'lineHeight', element.lineHeight || defaultLine),
      outline:     'none',
      cursor:      isEditing ? 'text' : 'move',
      width:       '100%',
      whiteSpace:  'pre-wrap',
      wordBreak:   'break-word',
      overflowWrap:'anywhere',
      boxSizing:   'border-box',
    },
  })

  // ── Auto-focus contentEditable when entering edit mode ───────────────────────
  const contentEditableRef = useRef(null)
  useEffect(() => {
    if (isEditing && contentEditableRef.current) {
      const el = contentEditableRef.current
      el.focus()
      const range = document.createRange()
      const sel   = window.getSelection()
      range.selectNodeContents(el)
      range.collapse(false)
      sel.removeAllRanges()
      sel.addRange(range)
    }
  }, [isEditing])

  // ── Auto-focus native input when entering edit mode ──────────────────────────
  const nativeInputRef = useRef(null)
  useEffect(() => {
    if (isEditing && nativeInputRef.current) {
      nativeInputRef.current.focus()
      nativeInputRef.current.select?.()
    }
  }, [isEditing])

  // ── renderContent ─────────────────────────────────────────────────────────────
  const renderContent = () => {
    switch (element.type) {

      case 'heading':
        return (
          <h1
            ref={contentEditableRef}
            {...sharedTextProps('#0F2348', 700, 1.2)}
          >
            {element.content || 'Your Heading'}
          </h1>
        )

      case 'label':
        return (
          <span
            ref={contentEditableRef}
            {...sharedTextProps('#5E6F8E', 700, 1.4)}
            style={{
              ...sharedTextProps('#5E6F8E', 700, 1.4).style,
              textTransform: 'uppercase',
              letterSpacing: `${Math.max(0.5, (element.letterSpacing ?? 2) * scaleU)}px`,
            }}
          >
            {element.content || 'LABEL'}
          </span>
        )

      case 'paragraph':
      case 'text':
        return (
          <p
            ref={contentEditableRef}
            {...sharedTextProps('#4b5563', 400, 1.6)}
          >
            {element.content || 'Your text goes here'}
          </p>
        )

      case 'link':
        return (
          <a
            ref={contentEditableRef}
            {...sharedTextProps('#2348D7', 400, 1.6)}
            style={{
              ...sharedTextProps('#2348D7', 400, 1.6).style,
              textDecoration: 'underline',
            }}
          >
            {element.content || 'Click here'}
          </a>
        )

      case 'button':
        return (
          <button
            ref={contentEditableRef}
            contentEditable={isEditing}
            suppressContentEditableWarning
            onDoubleClick={enterEditMode}
            onBlur={commitEdit}
            onKeyDown={handleEditKeyDown}
            style={{
              color:           element.textColor || '#ffffff',
              fontSize:        `${resolvedFontSize}px`,
              fontWeight:      getResponsiveValue(element, activeBreakpoint, 'fontWeight', 500),
              fontFamily:      element.fontFamily || 'inherit',
              width:           `${w}px`,
              height:          `${h}px`,
              backgroundColor: element.fill || '#2348D7',
              borderRadius:    radius,
              border:          border || 'none',
              boxShadow:       shadow,
              display:         'flex',
              alignItems:      'center',
              justifyContent:  'center',
              // Scale padding proportionally with button size
              paddingLeft:     `${scaledPaddingH}px`,
              paddingRight:    `${scaledPaddingH}px`,
              paddingTop:      `${scaledPaddingV}px`,
              paddingBottom:   `${scaledPaddingV}px`,
              cursor:          isEditing ? 'text' : 'pointer',
              whiteSpace:      'nowrap',
              boxSizing:       'border-box',
              outline:         'none',
              userSelect:      isEditing ? 'text' : 'none',
            }}
          >
            {element.content || 'Click me'}
          </button>
        )

      case 'select':
        return (
          <div
            onDoubleClick={enterEditMode}
            style={{
              width:           `${w}px`,
              height:          `${h}px`,
              backgroundColor: element.fill || '#ffffff',
              color:           element.textColor || '#111827',
              borderRadius:    radius,
              border:          border || '1.5px solid #D8E1F0',
              paddingLeft:     `${scaledPaddingH}px`,
              paddingRight:    `${scaledPaddingH}px`,
              fontSize:        `${resolvedFontSize}px`,
              fontFamily:      element.fontFamily || 'inherit',
              boxSizing:       'border-box',
              display:         'flex',
              alignItems:      'center',
              justifyContent:  'space-between',
              cursor:          isEditing ? 'text' : 'move',
            }}
          >
            {isEditing ? (
              <input
                ref={nativeInputRef}
                type="text"
                value={nativeValue}
                onChange={e => setNativeValue(e.target.value)}
                onBlur={() => commitNativeEdit(nativeValue)}
                onKeyDown={(e) => {
                  e.stopPropagation()
                  if (e.key === 'Escape') { setIsEditing(false); setNativeValue(element.content || '') }
                  if (e.key === 'Enter')  { e.preventDefault(); commitNativeEdit(nativeValue) }
                }}
                style={{
                  flex:       1,
                  border:     'none',
                  outline:    'none',
                  background: 'transparent',
                  color:      'inherit',
                  fontSize:   'inherit',
                  fontFamily: 'inherit',
                  cursor:     'text',
                }}
              />
            ) : (
              <span>{element.content || 'Choose option'}</span>
            )}
            <span style={{
              color:      '#7D8CA8',
              fontSize:   `${Math.max(8, resolvedFontSize * 0.85)}px`,
              flexShrink: 0,
              marginLeft: `${Math.max(2, scaledPaddingH * 0.3)}px`,
            }}>▾</span>
          </div>
        )

      case 'checkbox':
        return (
          <label
            onDoubleClick={enterEditMode}
            style={{
              display:    'flex',
              alignItems: 'center',
              gap:        `${Math.max(4, 8 * scaleU)}px`,
              cursor:     isEditing ? 'text' : 'pointer',
              fontSize:   `${resolvedFontSize}px`,
              color:      element.textColor || '#111827',
              fontFamily: element.fontFamily || 'inherit',
              userSelect: 'none',
            }}
          >
            <input
              type="checkbox"
              style={{
                width:       `${Math.max(10, 16 * scaleU)}px`,
                height:      `${Math.max(10, 16 * scaleU)}px`,
                accentColor: '#2348D7',
                flexShrink:  0,
              }}
              onClick={e => e.stopPropagation()}
            />
            {isEditing ? (
              <input
                ref={nativeInputRef}
                type="text"
                value={nativeValue}
                onChange={e => setNativeValue(e.target.value)}
                onBlur={() => commitNativeEdit(nativeValue)}
                onKeyDown={(e) => {
                  e.stopPropagation()
                  if (e.key === 'Escape') { setIsEditing(false); setNativeValue(element.content || '') }
                  if (e.key === 'Enter')  { e.preventDefault(); commitNativeEdit(nativeValue) }
                }}
                style={{
                  flex:         1,
                  border:       'none',
                  borderBottom: '1.5px dashed #2348D7',
                  outline:      'none',
                  background:   'transparent',
                  color:        'inherit',
                  fontSize:     'inherit',
                  fontFamily:   'inherit',
                  cursor:       'text',
                  padding:      '0',
                }}
              />
            ) : (
              <span>{element.content || 'Option'}</span>
            )}
          </label>
        )

      case 'input':
        return (
          <input
            ref={nativeInputRef}
            type="text"
            placeholder={isEditing ? '' : (element.content || 'Placeholder...')}
            value={isEditing ? nativeValue : undefined}
            defaultValue={!isEditing ? undefined : undefined}
            readOnly={!isEditing}
            onChange={isEditing ? (e => setNativeValue(e.target.value)) : undefined}
            onDoubleClick={enterEditMode}
            onBlur={isEditing ? () => commitNativeEdit(nativeValue) : undefined}
            onKeyDown={isEditing ? (e) => {
              e.stopPropagation()
              if (e.key === 'Escape') { setIsEditing(false); setNativeValue(element.content || '') }
              if (e.key === 'Enter')  { e.preventDefault(); commitNativeEdit(nativeValue) }
            } : undefined}
            style={{
              width:           `${w}px`,
              height:          `${h}px`,
              backgroundColor: element.fill || '#ffffff',
              color:           element.textColor || '#111827',
              borderRadius:    radius,
              border:          isEditing
                ? '1.5px solid #f59e0b'
                : (border || '1.5px solid #D8E1F0'),
              paddingLeft:     `${scaledPaddingH}px`,
              paddingRight:    `${scaledPaddingH}px`,
              paddingTop:      `${scaledPaddingV}px`,
              paddingBottom:   `${scaledPaddingV}px`,
              fontSize:        `${resolvedFontSize}px`,
              fontFamily:      element.fontFamily || 'inherit',
              outline:         'none',
              boxSizing:       'border-box',
              display:         'block',
              cursor:          isEditing ? 'text' : 'move',
            }}
          />
        )

      case 'textarea':
        return (
          <textarea
            ref={nativeInputRef}
            placeholder={isEditing ? '' : (element.content || 'Placeholder...')}
            value={isEditing ? nativeValue : undefined}
            readOnly={!isEditing}
            onChange={isEditing ? (e => setNativeValue(e.target.value)) : undefined}
            onDoubleClick={enterEditMode}
            onBlur={isEditing ? () => commitNativeEdit(nativeValue) : undefined}
            onKeyDown={isEditing ? (e) => {
              e.stopPropagation()
              if (e.key === 'Escape') { setIsEditing(false); setNativeValue(element.content || '') }
              if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); commitNativeEdit(nativeValue) }
            } : undefined}
            style={{
              width:           `${w}px`,
              height:          `${h}px`,
              backgroundColor: element.fill || '#ffffff',
              color:           element.textColor || '#111827',
              borderRadius:    radius,
              border:          isEditing
                ? '1.5px solid #f59e0b'
                : (border || '1.5px solid #D8E1F0'),
              paddingLeft:     `${scaledPaddingH}px`,
              paddingRight:    `${scaledPaddingH}px`,
              paddingTop:      `${scaledPaddingV}px`,
              paddingBottom:   `${scaledPaddingV}px`,
              fontSize:        `${resolvedFontSize}px`,
              fontFamily:      element.fontFamily || 'inherit',
              outline:         'none',
              boxSizing:       'border-box',
              display:         'block',
              resize:          'none',
              cursor:          isEditing ? 'text' : 'move',
            }}
          />
        )

      case 'image':
        return element.src ? (
          <img src={element.src} alt="" style={{
            width:           `${w}px`,
            height:          `${h}px`,
            objectFit:       'cover',
            borderRadius:    radius,
            border,
            boxShadow:       shadow,
            display:         'block',
            backgroundColor: fill !== 'transparent' ? fill : '#F3F6FB',
            boxSizing:       'border-box',
          }} />
        ) : (
          <div style={{
            width:           `${w}px`,
            height:          `${h}px`,
            backgroundColor: fill !== 'transparent' ? fill : '#F3F6FB',
            borderRadius:    radius,
            border:          border || '1.5px dashed #D8E1F0',
            boxShadow:       shadow,
            display:         'flex',
            flexDirection:   'column',
            alignItems:      'center',
            justifyContent:  'center',
            gap:             `${Math.max(3, 6 * scaleU)}px`,
            boxSizing:       'border-box',
          }}>
            {/* Icon scales with element */}
            <svg
              width={Math.max(14, 28 * scaleU)}
              height={Math.max(14, 28 * scaleU)}
              viewBox="0 0 24 24"
              fill="none"
              stroke="#C5D0E4"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="3"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
            <span style={{
              fontSize:   `${Math.max(8, 11 * scaleU)}px`,
              color:      '#C5D0E4',
              fontFamily: 'Inter, sans-serif',
            }}>Image</span>
          </div>
        )

      case 'video':
        return (
          <div style={{
            width:           `${w}px`,
            height:          `${h}px`,
            backgroundColor: '#0F1A2E',
            borderRadius:    radius,
            border,
            boxShadow:       shadow,
            display:         'flex',
            alignItems:      'center',
            justifyContent:  'center',
            color:           'white',
            // Play icon scales with the video element
            fontSize:        `${Math.max(16, 32 * scaleU)}px`,
            boxSizing:       'border-box',
          }}>▶</div>
        )

      case 'icon': {
        const Icon = ICON_COMPONENTS[element.iconSet] || Star
        return (
          <div style={{
            width:   `${w}px`,
            height:  `${h}px`,
            color:   element.textColor || '#2348D7',
            display: 'flex',
            alignItems:     'center',
            justifyContent: 'center',
          }}>
            {/* Icon SVG fills 60% of the bounding box, scaling naturally with w/h */}
            <Icon size={scaledIconSize} strokeWidth={Math.max(1, 2.2 / Math.max(scaleU, 0.5))} />
          </div>
        )
      }

      case 'divider':
        // Height is driven by the element box, no scaling needed
        return (
          <div style={{
            width:           `${w}px`,
            height:          `${h || 2}px`,
            backgroundColor: element.fill || '#E2E8F4',
            borderRadius:    '2px',
          }} />
        )

      case 'card':
      case 'container':
      case 'section':
      case 'frame':
        return (
          <div style={{
            width:           `${w}px`,
            height:          `${h}px`,
            backgroundColor: fill,
            borderRadius:    radius,
            border:          border || (fill === 'transparent' || !fill ? '1.5px dashed #D8E1F0' : 'none'),
            boxShadow:       shadow,
            position:        'relative',
            overflow:        'hidden',
            boxSizing:       'border-box',
          }} />
        )

      default:
        return (
          <div style={{
            width:           `${w}px`,
            height:          `${h}px`,
            backgroundColor: fill !== 'transparent' ? fill : '#F3F6FB',
            borderRadius:    radius,
            border:          border || '1.5px dashed #D8E1F0',
            boxSizing:       'border-box',
          }} />
        )
    }
  }

  const isEditableType    = EDITABLE_TYPES.has(element.type)
  const isNativeInputType = NATIVE_INPUT_TYPES.has(element.type)
  const canEdit           = isEditableType || isNativeInputType

  return (
    <div
      className={`ce-root${isSelected ? ' ce-selected' : ''}${isEditing ? ' ce-editing' : ''}`}
      onMouseDown={handleMouseDown}
      onClick={e => e.stopPropagation()}
      onContextMenu={e => onContextMenu?.(e, element.id)}
      style={{
        position:      'absolute',
        left:          `${x}px`,
        top:           `${y}px`,
        width:         `${w}px`,
        height:        `${h}px`,
        opacity,
        userSelect:    isEditing ? 'text' : 'none',
        borderRadius:  radius,
        zIndex:        isEditing ? 20 : (isFrameLike ? 0 : (isSelected ? 10 : 1)),
        display:       element.display || 'block',
        flexDirection: element.display === 'flex' ? (element.flexDirection || 'row') : undefined,
        alignItems:    element.display === 'flex' ? (element.alignItems || 'center') : undefined,
        justifyContent:element.display === 'flex' ? (element.justifyContent || 'flex-start') : undefined,
        gap:           element.gap ? `${element.gap}px` : undefined,
        gridTemplateColumns: element.display === 'grid' ? `repeat(${element.gridCols || 2}, 1fr)` : undefined,
        padding: [element.paddingTop, element.paddingRight, element.paddingBottom, element.paddingLeft]
          .some(v => v !== undefined && v !== 0)
          ? `${element.paddingTop||0}px ${element.paddingRight||0}px ${element.paddingBottom||0}px ${element.paddingLeft||0}px`
          : undefined,
        margin: [element.marginTop, element.marginRight, element.marginBottom, element.marginLeft]
          .some(v => v !== undefined && v !== 0)
          ? `${element.marginTop||0}px ${element.marginRight||0}px ${element.marginBottom||0}px ${element.marginLeft||0}px`
          : undefined,
        overflow: element.overflow || 'visible',
        cursor:   isEditing ? 'text' : (element.cursor || 'move'),
      }}
    >
      {/* Hover label */}
      {!isEditing && <span className="ce-hover-label">{element.name || element.type}</span>}

      {renderContent()}

      {/* Editing mode badge */}
      {isEditing && (
        <div className="ce-edit-badge">
          ✏ Editing — Press Esc to exit
        </div>
      )}

      {/* Double-click-to-edit hint */}
      {isSelected && !isEditing && canEdit && (
        <div
          style={{
            position:      'absolute',
            bottom:        '-22px',
            left:          '50%',
            transform:     'translateX(-50%)',
            background:    'rgba(35,72,215,0.85)',
            color:         'white',
            fontSize:      '10px',
            fontWeight:    600,
            fontFamily:    'Inter, sans-serif',
            padding:       '2px 8px',
            borderRadius:  4,
            whiteSpace:    'nowrap',
            pointerEvents: 'none',
            zIndex:        30,
            opacity:       0.85,
            letterSpacing: '0.2px',
          }}
        >
          Double-click to edit
        </div>
      )}

      {/* Delete button */}
      {isSelected && !isEditing && (
        <button
          onMouseDown={e => { e.stopPropagation(); onDelete(element.id) }}
          style={{
            position:        'absolute',
            top:             '-13px',
            right:           '-13px',
            width:           '24px',
            height:          '24px',
            borderRadius:    '50%',
            backgroundColor: '#ef4444',
            border:          'none',
            display:         'flex',
            alignItems:      'center',
            justifyContent:  'center',
            cursor:          'pointer',
            zIndex:          30,
            boxShadow:       '0 2px 8px rgba(239,68,68,0.35)',
          }}
        >
          <Trash2 size={10} color="white" />
        </button>
      )}

      {/* Link badge */}
      {(element.linkType && element.linkType !== 'none') && (
        <div
          style={{
            position:        'absolute',
            top:             '-10px',
            right:           isSelected ? '22px' : '-10px',
            width:           '20px',
            height:          '20px',
            borderRadius:    '50%',
            backgroundColor: '#2348D7',
            border:          '2px solid white',
            display:         'flex',
            alignItems:      'center',
            justifyContent:  'center',
            cursor:          'pointer',
            zIndex:          25,
            boxShadow:       '0 2px 6px rgba(35,72,215,0.3)',
          }}
          title={`Linked: ${element.linkType}`}
        >
          <Link size={11} color="white" strokeWidth={2.5} />
        </div>
      )}

      {/* Resize handles — hidden while editing */}
      {isSelected && !isEditing && HANDLES.map(handle => (
        <div
          key={handle.id}
          className="ce-resize-handle"
          onMouseDown={e => handleResizeMouseDown(e, handle.id)}
          style={{ cursor: handle.cursor, ...handle.style }}
          title={`Resize ${handle.id}`}
        />
      ))}
    </div>
  )
}
