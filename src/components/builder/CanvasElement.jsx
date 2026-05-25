import { useEffect, useRef, useState } from 'react'
import {
  AtSign,
  CheckCircle2,
  Feather,
  GitBranch,
  Globe2,
  Orbit,
  Shapes,
  Smile,
  Star,
  Trash2,
  Zap,
} from 'lucide-react'
import { getElementLayout, getResponsiveValue, setElementLayout } from '../../utils/responsive'
import { clampBoxToCanvas, getContainedElements, getSnapResult, isContainerElement } from '../../utils/editorGeometry'
import { 
  getResizeDirection, 
  DEFAULT_MIN_WIDTH, 
  DEFAULT_MIN_HEIGHT 
} from './box-model/boxModelUtils'
import { calculateStableResize } from './box-model/boxModelConstraints'

const HANDLES = [
  { id: 'nw', cursor: 'nw-resize', style: { top: -5,               left: -5               } },
  { id: 'n',  cursor: 'n-resize',  style: { top: -5,               left: 'calc(50% - 4px)' } },
  { id: 'ne', cursor: 'ne-resize', style: { top: -5,               right: -5              } },
  { id: 'e',  cursor: 'e-resize',  style: { top: 'calc(50% - 4px)', right: -5             } },
  { id: 'se', cursor: 'se-resize', style: { bottom: -5,            right: -5              } },
  { id: 's',  cursor: 's-resize',  style: { bottom: -5,            left: 'calc(50% - 4px)' } },
  { id: 'sw', cursor: 'sw-resize', style: { bottom: -5,            left: -5               } },
  { id: 'w',  cursor: 'w-resize',  style: { top: 'calc(50% - 4px)', left: -5             } },
]

const ICON_COMPONENTS = {
  iconic: Smile,
  phosphor: Shapes,
  hero: AtSign,
  feather: Feather,
  meteor: Globe2,
  material: Zap,
  basicons: Orbit,
  flowbite: GitBranch,
  nonicons: Feather,
  sargam: CheckCircle2,
}


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
    /* Improved hover state with clear visual feedback */
    .ce-root:not(.ce-selected):hover::before {
      content: '';
      position: absolute;
      inset: -4px;
      border: 2px solid #0EA5E9;
      border-radius: inherit;
      pointer-events: none;
      z-index: 12;
      opacity: 1;
      box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.15), inset 0 0 0 1px rgba(14, 165, 233, 0.1);
      transition: all 0.15s ease;
    }
    
    /* Hover label visibility */
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
      box-shadow: 0 2px 8px rgba(35, 72, 215, 0.3);
    }
    
    /* Improved selection outline with multiple layers for clarity */
    .ce-root.ce-selected::after {
      content: '';
      position: absolute;
      inset: -3px;
      border: 2px solid #0EA5E9;
      border-radius: inherit;
      pointer-events: none;
      z-index: 12;
      box-shadow: 0 0 0 4px rgba(14, 165, 233, 0.15), 
                  inset 0 0 0 1px rgba(14, 165, 233, 0.1),
                  0 0 12px rgba(14, 165, 233, 0.2);
    }
    
    /* Outline indicator showing element boundaries */
    .ce-root.ce-selected::before {
      content: '';
      position: absolute;
      inset: 0;
      border: 1px solid rgba(14, 165, 233, 0.3);
      border-radius: inherit;
      pointer-events: none;
      z-index: 11;
      background: radial-gradient(circle at top-left, rgba(14, 165, 233, 0.08) 0%, transparent 100%);
    }
    
    .ce-root { cursor: move; }
    
    /* Selection handle styling */
    .ce-resize-handle {
      position: absolute;
      background: white;
      border: 2px solid #2348D7;
      border-radius: 3px;
      width: 10px;
      height: 10px;
      z-index: 20;
      transition: all 0.1s ease;
      box-shadow: 0 2px 6px rgba(35, 72, 215, 0.25);
    }
    
    .ce-resize-handle:hover {
      transform: scale(1.15);
      box-shadow: 0 2px 8px rgba(35, 72, 215, 0.4);
      background: #f0f8ff;
    }
  `
  document.head.appendChild(s)
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
  useEffect(() => {
    ensureCanvasElementStyles()
  }, [])

  const dragging    = useRef(false)
  const startPos    = useRef({ mouseX: 0, mouseY: 0, elX: 0, elY: 0 })
  const dragChildren = useRef([])
  const resizing    = useRef(null)
  const resizeStart = useRef({})

  const [isEditing, setIsEditing] = useState(false)

  // Resolve x/y/width/height for the current breakpoint (falls through to desktop)
  const layout = getElementLayout(element, activeBreakpoint)
  const { x, y, width: w, height: h } = layout

  /**
   * Layout changes (x/y/width/height) are written into the active breakpoint slot.
   * Everything else (fill, content, textColor…) is written to the root element
   * so it stays shared across all breakpoints.
   */
  const handleUpdate = (id, changes) => {
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

    onUpdate(id, updated)
  }

  /* ── Drag ── */
  const handleMouseDown = (e) => {
    e.stopPropagation()
    e.preventDefault()
    onSelect(element.id)
    dragging.current = true
    startPos.current = { mouseX: e.clientX, mouseY: e.clientY, elX: x, elY: y }
    dragChildren.current = isContainerElement(element)
      ? getContainedElements(element, elements, activeBreakpoint).map(childElement => ({
          element: childElement,
          layout: getElementLayout(childElement, activeBreakpoint),
        }))
      : []

    const onMove = (e) => {
      if (!dragging.current) return
      const dx = (e.clientX - startPos.current.mouseX) / zoom
      const dy = (e.clientY - startPos.current.mouseY) / zoom
      const nextBox = {
        x: startPos.current.elX + dx,
        y: startPos.current.elY + dy,
        width: w,
        height: h,
      }
      const snap = getSnapResult({
        movingBox: nextBox,
        elements,
        activeId: element.id,
        ignoredIds: dragChildren.current.map(child => child.element.id),
        canvasWidth,
        canvasHeight,
        breakpointId: activeBreakpoint,
      })
      const clampedBox = clampBoxToCanvas({
        ...nextBox,
        x: snap.x,
        y: snap.y,
      }, canvasWidth, canvasHeight)
      onInteractionGuides?.(snap.guides)
      handleUpdate(element.id, {
        x: clampedBox.x,
        y: clampedBox.y,
      })

      const snappedDx = clampedBox.x - startPos.current.elX
      const snappedDy = clampedBox.y - startPos.current.elY
      dragChildren.current.forEach(({ element: childElement, layout }) => {
        onUpdate(childElement.id, {
          x: Math.round((layout.x || 0) + snappedDx),
          y: Math.round((layout.y || 0) + snappedDy),
        })
      })
    }
    const onUp = () => {
      dragging.current = false
      dragChildren.current = []
      onInteractionGuides?.({ vertical: [], horizontal: [] })
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }

  /* ── Resize ── */
  const handleResizeMouseDown = (e, handleId) => {
    e.stopPropagation()
    e.preventDefault()
    resizing.current = handleId
    resizeStart.current = { 
      mouseX: e.clientX, 
      mouseY: e.clientY, 
      x, 
      y, 
      w, 
      h,
      prevDimensions: { x, y, width: w, height: h }
    }

    const onMove = (e) => {
      if (!resizing.current) return
      const dx = (e.clientX - resizeStart.current.mouseX) / zoom
      const dy = (e.clientY - resizeStart.current.mouseY) / zoom
      
      // Calculate stable resize with constraints
      const stableResize = calculateStableResize(
        { x: 0, y: 0 },
        { x: dx, y: dy },
        resizeStart.current,
        resizeStart.current.handleId || handleId,
        {
          minWidth: DEFAULT_MIN_WIDTH,
          minHeight: DEFAULT_MIN_HEIGHT,
          maxWidth: canvasWidth,
          maxHeight: canvasHeight,
          snapToGrid: false, // Disable grid snap for smooth dragging
        }
      )

      const clampedBox = clampBoxToCanvas({
        x: stableResize.x,
        y: stableResize.y,
        width: stableResize.width,
        height: stableResize.height,
      }, canvasWidth, canvasHeight)

      handleUpdate(element.id, {
        x: Math.round(clampedBox.x), 
        y: Math.round(clampedBox.y),
        width: Math.round(clampedBox.width), 
        height: Math.round(clampedBox.height),
      })
    }
    
    const onUp = () => {
      resizing.current = null
      resizeStart.current = {}
      onInteractionGuides?.({ vertical: [], horizontal: [] })
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }

  /* ── Visual styles (not layout) ── */
  const fill    = element.fill        || 'transparent'
  const radius  = cssLength(element.borderRadius ?? element.radius ?? 0)
  const border  = element.borderColor ? `1.5px solid ${element.borderColor}` : undefined
  const shadow  = element.shadowColor ? `0 4px 24px ${element.shadowColor}` : undefined
  const opacity = (element.opacity    ?? 100) / 100
  const isFrameLike = isContainerElement(element)

const sharedTextProps = (
  defaultColor,
  defaultSize,
  defaultWeight,
  defaultLine
) => ({
  contentEditable: isEditing,
  suppressContentEditableWarning: true,

  onDoubleClick: (e) => {
    e.stopPropagation()
    setIsEditing(true)
  },

  onBlur: (e) => {
    handleUpdate(element.id, {
      content: e.target.innerText
    })

    setIsEditing(false)
  },

  style: {
    color: element.textColor || defaultColor,
    fontSize: `${getResponsiveValue(element, activeBreakpoint, 'fontSize', defaultSize)}px`,
    fontWeight: getResponsiveValue(element, activeBreakpoint, 'fontWeight', defaultWeight),
    fontFamily: element.fontFamily || 'inherit',
    textAlign: getResponsiveValue(element, activeBreakpoint, 'textAlign', element.textAlign || 'left'),
    lineHeight: getResponsiveValue(element, activeBreakpoint, 'lineHeight', element.lineHeight || defaultLine),

    outline: 'none',
    cursor: isEditing ? 'text' : 'move',
    width: '100%',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    overflowWrap: 'anywhere',
    boxSizing: 'border-box',
  }
})

  const renderContent = () => {
    switch (element.type) {
      case 'heading':
        return <h1 {...sharedTextProps('#0F2348', 32, 700, 1.2)}>{element.content || 'Your Heading'}</h1>
      case 'label':
        return (
          <span {...sharedTextProps('#5E6F8E', 11, 700, 1.4)}
            style={{
              ...sharedTextProps('#5E6F8E', 11, 700, 1.4).style,
              textTransform: 'uppercase',
              letterSpacing: `${element.letterSpacing ?? 2}px`,
            }}>
            {element.content || 'LABEL'}
          </span>
        )
      case 'paragraph':
      case 'text':
        return <p {...sharedTextProps('#4b5563', 16, 400, 1.6)}>{element.content || 'Your text goes here'}</p>
      case 'link':
        return (
          <a {...sharedTextProps('#2348D7', 16, 400, 1.6)}
            style={{ ...sharedTextProps('#2348D7', 16, 400, 1.6).style, textDecoration: 'underline' }}>
            {element.content || 'Click here'}
          </a>
        )
      case 'button':
        return (
          <div style={{
            width: `${w}px`, height: `${h}px`,
            backgroundColor: element.fill || '#2348D7',
            color: element.textColor || '#ffffff',
            borderRadius: radius, border: border || 'none', boxShadow: shadow,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: `${getResponsiveValue(element, activeBreakpoint, 'fontSize', 14)}px`,
            fontWeight: element.fontWeight || 500,
            fontFamily: element.fontFamily || 'inherit',
            cursor: 'pointer', userSelect: 'none', whiteSpace: 'nowrap',
            boxSizing: 'border-box',
          }}>
            {element.content || 'Click me'}
          </div>
        )
      case 'image':
        return element.src ? (
          <img src={element.src} alt="" style={{
            width: `${w}px`, height: `${h}px`,
            objectFit: 'cover', borderRadius: radius, border, boxShadow: shadow, display: 'block',
            backgroundColor: fill !== 'transparent' ? fill : '#F3F6FB',
            boxSizing: 'border-box',
          }} />
        ) : (
          <div style={{
            width: `${w}px`, height: `${h}px`,
            backgroundColor: fill !== 'transparent' ? fill : '#F3F6FB',
            borderRadius: radius, border: border || '1.5px dashed #D8E1F0', boxShadow: shadow,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '6px',
            boxSizing: 'border-box',
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C5D0E4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="3"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
            <span style={{ fontSize: '11px', color: '#C5D0E4', fontFamily: 'Inter, sans-serif' }}>Image</span>
          </div>
        )
      case 'video':
        return (
          <div style={{
            width: `${w}px`, height: `${h}px`,
            backgroundColor: '#0F1A2E', borderRadius: radius, border, boxShadow: shadow,
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '32px',
            boxSizing: 'border-box',
          }}>▶</div>
        )
      case 'icon':
        {
          const Icon = ICON_COMPONENTS[element.iconSet] || Star
          return (
            <div style={{
              width: `${w}px`, height: `${h}px`,
              color: element.textColor || '#2348D7',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon size={Math.min(w, h)} strokeWidth={2.2} />
            </div>
          )
        }
      case 'divider':
        return <div style={{ width: `${w}px`, height: `${h || 2}px`, backgroundColor: element.fill || '#E2E8F4', borderRadius: '2px' }} />
      case 'card':
      case 'container':
      case 'section':
      case 'frame':
        return (
          <div style={{
            width: `${w}px`, height: `${h}px`, backgroundColor: fill,
            borderRadius: radius,
            border: border || (fill === 'transparent' || !fill ? '1.5px dashed #D8E1F0' : 'none'),
            boxShadow: shadow, position: 'relative', overflow: 'hidden',
            boxSizing: 'border-box',
          }} />
        )
      case 'input':
        return (
          <input
            type="text"
            placeholder={element.content || 'Placeholder...'}
            style={{
              width: `${w}px`, height: `${h}px`,
              backgroundColor: element.fill || '#ffffff',
              color: element.textColor || '#111827',
              borderRadius: radius, border: border || '1.5px solid #D8E1F0',
              padding: '0 12px', fontSize: `${getResponsiveValue(element, activeBreakpoint, 'fontSize', 14)}px`,
              fontFamily: element.fontFamily || 'inherit',
              outline: 'none', boxSizing: 'border-box', display: 'block',
            }}
          />
        )
      case 'textarea':
        return (
          <textarea
            placeholder={element.content || 'Placeholder...'}
            style={{
              width: `${w}px`, height: `${h}px`,
              backgroundColor: element.fill || '#ffffff',
              color: element.textColor || '#111827',
              borderRadius: radius, border: border || '1.5px solid #D8E1F0',
              padding: '10px 12px', fontSize: `${getResponsiveValue(element, activeBreakpoint, 'fontSize', 14)}px`,
              fontFamily: element.fontFamily || 'inherit',
              outline: 'none', boxSizing: 'border-box', display: 'block', resize: 'none',
            }}
          />
        )
      case 'select':
        return (
          <div style={{
            width: `${w}px`, height: `${h}px`,
            backgroundColor: element.fill || '#ffffff',
            color: element.textColor || '#111827',
            borderRadius: radius, border: border || '1.5px solid #D8E1F0',
            padding: '0 12px', fontSize: `${getResponsiveValue(element, activeBreakpoint, 'fontSize', 14)}px`,
            fontFamily: element.fontFamily || 'inherit',
            boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <span>{element.content || 'Choose option'}</span>
            <span style={{ color: '#7D8CA8', fontSize: '12px' }}>v</span>
          </div>
        )
      case 'checkbox':
        return (
          <label style={{
            display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer',
            fontSize: `${getResponsiveValue(element, activeBreakpoint, 'fontSize', 14)}px`,
            color: element.textColor || '#111827',
            fontFamily: element.fontFamily || 'inherit', userSelect: 'none',
          }}>
            <input type="checkbox" style={{ width: '16px', height: '16px', accentColor: '#2348D7' }} />
            {element.content || 'Option'}
          </label>
        )
      default:
        return (
          <div style={{
            width: `${w}px`, height: `${h}px`,
            backgroundColor: fill !== 'transparent' ? fill : '#F3F6FB',
            borderRadius: radius, border: border || '1.5px dashed #D8E1F0',
            boxSizing: 'border-box',
          }} />
        )
    }
  }

  return (
    <div
      className={`ce-root${isSelected ? ' ce-selected' : ''}`}
      onMouseDown={(e) => {
  if (isEditing) return
  handleMouseDown(e)
}}
      onClick={e => e.stopPropagation()}
      onContextMenu={e => onContextMenu?.(e, element.id)}
      style={{
        position: 'absolute',
        left:     `${x}px`,
        top:      `${y}px`,
        width:    `${w}px`,
        height:   `${h}px`,
        opacity,
        userSelect:   'none',
        borderRadius: radius,
        zIndex:       isFrameLike ? 0 : (isSelected ? 10 : 1),
      }}
    >
      <span className="ce-hover-label">{element.name || element.type}</span>
      {renderContent()}

      {isSelected && (
        <button
          onMouseDown={e => { e.stopPropagation(); onDelete(element.id) }}
          style={{
            position: 'absolute', top: '-13px', right: '-13px',
            width: '24px', height: '24px', borderRadius: '50%',
            backgroundColor: '#ef4444', border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', zIndex: 30, boxShadow: '0 2px 8px rgba(239,68,68,0.35)',
          }}
        >
          <Trash2 size={10} color="white" />
        </button>
      )}

      {isSelected && HANDLES.map(handle => (
        <div 
          key={handle.id} 
          className="ce-resize-handle"
          onMouseDown={e => handleResizeMouseDown(e, handle.id)} 
          style={{
            position: 'absolute',
            cursor: handle.cursor,
            ...handle.style,
          }}
          title={`Resize ${handle.id}`}
        />
      ))}
    </div>
  )
}
