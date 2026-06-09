/**
 * responsive.js
 *
 * Independent responsive editing system.
 *
 * SCHEMA — two supported formats, both safe to read at all times:
 *
 *   NEW (independent):
 *     { id, type, name,
 *       desktop: { x, y, width, height, fill, fontSize, ... },
 *       tablet:  { x, y, width, height, fill, fontSize, ... },
 *       phone:   { x, y, width, height, fill, fontSize, ... },
 *       custom:  { x, y, width, height, fill, fontSize, ... } }
 *
 *   OLD (cascading — legacy, read-only path):
 *     { id, type, name, x, y, width, height, fill, fontSize, ...,
 *       breakpoints: { tablet: {...overrides}, phone: {...overrides} } }
 *
 * READ  → getElementProperties() handles both formats transparently.
 *          It NEVER mutates the element.
 * WRITE → setBreakpointProps() always emits the new independent format.
 *          First write on an old-format element transparently upgrades it.
 */

// ─── Breakpoint registry ───────────────────────────────────────────────────────

export const BREAKPOINTS = [
  { id: 'desktop', label: 'Desktop', width: 1200 },
  { id: 'tablet',  label: 'Tablet',  width: 768  },
  { id: 'phone',   label: 'Phone',   width: 390  },
  { id: 'custom',  label: 'Custom',  width: null  },
]

export function getCanvasWidth(breakpointId, canvasSettings, customWidth = 800) {
  switch (breakpointId) {
    case 'desktop': return canvasSettings?.width || 1200
    case 'tablet':  return 768
    case 'phone':   return 390
    case 'custom':  return customWidth
    default:        return canvasSettings?.width || 1200
  }
}

// ─── Default prop shape ────────────────────────────────────────────────────────

function defaultProps(overrides = {}) {
  return {
    x:             0,
    y:             0,
    width:         200,
    height:        100,
    fill:          '#ffffff',
    borderColor:   null,
    borderWidth:   0,
    shadowColor:   null,
    radius:        0,
    opacity:       100,
    textColor:     '#111827',
    fontSize:      16,
    fontWeight:    'normal',
    lineHeight:    1.5,
    letterSpacing: 0,
    textAlign:     'left',
    paddingTop:    0,
    paddingRight:  0,
    paddingBottom: 0,
    paddingLeft:   0,
    ...overrides,
  }
}

// ─── Detect which format an element is in ─────────────────────────────────────

function isNewFormat(element) {
  return element.desktop !== undefined && typeof element.desktop === 'object'
}

// ─── Extract the desktop-baseline props from an element (non-mutating) ────────

function extractDesktopProps(element) {
  if (isNewFormat(element)) {
    return defaultProps(element.desktop ?? {})
  }
  // Old flat format
  return defaultProps({
    x:             element.x             ?? 0,
    y:             element.y             ?? 0,
    width:         element.width         ?? 200,
    height:        element.height        ?? 100,
    fill:          element.fill,
    borderColor:   element.borderColor,
    borderWidth:   element.borderWidth,
    shadowColor:   element.shadowColor,
    radius:        element.radius,
    opacity:       element.opacity,
    textColor:     element.textColor,
    fontSize:      element.fontSize,
    fontWeight:    element.fontWeight,
    lineHeight:    element.lineHeight,
    letterSpacing: element.letterSpacing,
    textAlign:     element.textAlign,
    paddingTop:    element.paddingTop,
    paddingRight:  element.paddingRight,
    paddingBottom: element.paddingBottom,
    paddingLeft:   element.paddingLeft,
  })
}

// ─── READ: getElementProperties ───────────────────────────────────────────────
//
// Returns a complete, normalised property set for a specific breakpoint.
// NEVER mutates the element. Works on both old and new format.

export function getElementProperties(element, breakpointId) {
  if (isNewFormat(element)) {
    // New independent format — read straight from the breakpoint bucket.
    // If that bucket doesn't exist yet, fall back to desktop (covers the
    // case where desktop exists but tablet/phone haven't been written yet).
    const src = element[breakpointId] ?? element.desktop ?? {}
    return defaultProps(src)
  }

  // Old cascading format — desktop props are on the root, overrides in
  // element.breakpoints.{tablet,phone,custom}.
  const desktopProps = extractDesktopProps(element)

  if (breakpointId === 'desktop') return desktopProps

  const overrides = element.breakpoints?.[breakpointId] ?? {}
  return defaultProps({ ...desktopProps, ...overrides })
}

// Convenience helpers (non-mutating)

export function getElementLayout(element, breakpointId) {
  const p = getElementProperties(element, breakpointId)
  return { x: p.x, y: p.y, width: p.width, height: p.height }
}

export function getResponsiveValue(element, breakpointId, key, fallback) {
  const p = getElementProperties(element, breakpointId)
  return p[key] ?? fallback
}

export function getResponsiveFontSize(element, breakpointId, fallback = 16) {
  return getResponsiveValue(element, breakpointId, 'fontSize', fallback)
}

// ─── WRITE: setBreakpointProps ────────────────────────────────────────────────
//
// THE only function editor mutations should call.
// Writes to ONE breakpoint only. Never touches the others.
// Transparently upgrades old-format elements to the new independent schema
// on first write — so existing projects keep working.

export function setBreakpointProps(element, breakpointId, patch) {
  // If already in new format, just patch the target breakpoint.
  if (isNewFormat(element)) {
    const existing = element[breakpointId] ?? { ...element.desktop }
    return {
      ...element,
      [breakpointId]: { ...existing, ...patch },
    }
  }

  // Old format: upgrade the element to new format in-place.
  // All four breakpoints get independent copies so that after the first
  // write nothing cascades any more.
  const desktopProps = extractDesktopProps(element)
  const oldBp        = element.breakpoints ?? {}

  const upgraded = {
    ...element,
    // Keep all non-layout fields (content, src, name, type, id, …)
    // but add the four independent breakpoint buckets.
    desktop: desktopProps,
    tablet:  defaultProps({ ...desktopProps, ...(oldBp.tablet ?? {}) }),
    phone:   defaultProps({ ...desktopProps, ...(oldBp.phone  ?? {}) }),
    custom:  defaultProps({ ...desktopProps, ...(oldBp.custom ?? {}) }),
    // Remove old flat layout fields to avoid confusion.
    // We keep a fallback read path in getElementProperties so any element
    // that hasn't been written yet still works.
    x:          undefined,
    y:          undefined,
    width:      undefined,
    height:     undefined,
    breakpoints: undefined,
  }

  // Now apply the patch to the target breakpoint.
  const existing = upgraded[breakpointId] ?? { ...upgraded.desktop }
  return {
    ...upgraded,
    [breakpointId]: { ...existing, ...patch },
  }
}

// Legacy alias — kept for backward-compat with any direct callers of setElementLayout.
export function setElementLayout(element, breakpointId, changes) {
  return setBreakpointProps(element, breakpointId, changes)
}

// ─── migrateElement ───────────────────────────────────────────────────────────
//
// Explicitly upgrades an element to new format WITHOUT applying any patch.
// Used only during import / template application — not during normal editing.
// Safe to call on already-migrated elements.

export function migrateElement(element) {
  if (isNewFormat(element)) return element
  return setBreakpointProps(element, 'desktop', {}) // upgrade + touch nothing
}

// ─── New-element defaults ──────────────────────────────────────────────────────

export function generateResponsiveDefaults(element, desktopCanvasWidth = 1200) {
  const deskX = element.x      ?? 0
  const deskY = element.y      ?? 0
  const deskW = element.width  ?? 200
  const deskH = element.height ?? 100

  const desktopProps = defaultProps({
    x: deskX, y: deskY, width: deskW, height: deskH,
    fill:          element.fill,
    borderColor:   element.borderColor,
    borderWidth:   element.borderWidth,
    shadowColor:   element.shadowColor,
    radius:        element.radius,
    opacity:       element.opacity,
    textColor:     element.textColor,
    fontSize:      element.fontSize,
    fontWeight:    element.fontWeight,
    lineHeight:    element.lineHeight,
    letterSpacing: element.letterSpacing,
    textAlign:     element.textAlign,
    paddingTop:    element.paddingTop,
    paddingRight:  element.paddingRight,
    paddingBottom: element.paddingBottom,
    paddingLeft:   element.paddingLeft,
  })

  // Tablet — proportionally scaled
  const tabletScale = 768 / desktopCanvasWidth
  let tabX = Math.round(deskX * tabletScale)
  let tabW = Math.round(deskW * tabletScale)
  if (tabX + tabW > 768 - 16) tabW = Math.max(40, 768 - tabX - 16)
  if (tabX < 0) tabX = 0

  const tabletProps = defaultProps({
    ...desktopProps,
    x: tabX, y: deskY, width: tabW, height: deskH,
    fontSize: Math.round((desktopProps.fontSize || 16) * 0.95),
  })

  // Phone — full-width stack
  const phoneW = deskW < 200 ? Math.min(deskW, 390 - 48) : 390 - 48
  const phoneProps = defaultProps({
    ...desktopProps,
    x: 24, y: deskY, width: phoneW, height: deskH,
    fontSize: Math.round((desktopProps.fontSize || 16) * 0.85),
  })

  return {
    ...element,
    desktop: desktopProps,
    tablet:  tabletProps,
    phone:   phoneProps,
    custom:  defaultProps({ ...tabletProps }),
    x:          undefined,
    y:          undefined,
    width:      undefined,
    height:     undefined,
    breakpoints: undefined,
  }
}

// ─── Tree-level helpers ────────────────────────────────────────────────────────

export function applyResponsiveDefaultsToTree(tree, desktopCanvasWidth = 1200) {
  return tree.map(el => {
    if (isNewFormat(el) && el.tablet && el.phone) return el
    return generateResponsiveDefaults(el, desktopCanvasWidth)
  })
}

// ─── Constants ────────────────────────────────────────────────────────────────

const PHONE_W      = 390
const PHONE_MARGIN = 20
const PHONE_INNER  = PHONE_W - PHONE_MARGIN * 2   // 350
const TABLET_W     = 768

const TEXT_TYPES = new Set(['heading', 'paragraph', 'text', 'link', 'label'])
const FORM_TYPES = new Set(['button', 'input', 'textarea', 'select', 'checkbox'])
const BOX_TYPES  = new Set(['container', 'section', 'frame', 'card'])

const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi)

// ─── Font scaling ─────────────────────────────────────────────────────────────

function scaleFontPhone(element) {
  const base = element.fontSize
  if (!base) return null
  if (element.type === 'heading') {
    if (base >= 72) return clamp(Math.round(base * 0.40), 22, 40)
    if (base >= 56) return clamp(Math.round(base * 0.50), 22, 38)
    if (base >= 40) return clamp(Math.round(base * 0.58), 20, 34)
    if (base >= 28) return clamp(Math.round(base * 0.72), 18, 30)
    return clamp(Math.round(base * 0.85), 16, 26)
  }
  if (element.type === 'label')         return clamp(Math.round(base * 0.88), 10, 13)
  if (FORM_TYPES.has(element.type))     return clamp(Math.round(base * 0.90), 12, 15)
  return clamp(Math.round(base * 0.86), 12, 16)
}

function scaleFontTablet(element) {
  const base = element.fontSize
  if (!base) return null
  if (element.type === 'heading') {
    if (base >= 56) return clamp(Math.round(base * 0.72), 24, 48)
    if (base >= 36) return clamp(Math.round(base * 0.84), 20, 44)
    return clamp(Math.round(base * 0.92), 16, 36)
  }
  if (element.type === 'label')         return clamp(Math.round(base * 0.94), 10, 13)
  if (FORM_TYPES.has(element.type))     return clamp(Math.round(base * 0.96), 12, 16)
  return clamp(Math.round(base * 0.94), 12, 16)
}

// ─── Text height estimation ───────────────────────────────────────────────────

function estimateTextHeight(element, containerW, fontSize) {
  if (!TEXT_TYPES.has(element.type)) return element.height ?? 40
  const content = String(element.content ?? element.placeholder ?? '').trim()
  if (!content) {
    const lh = element.lineHeight || (element.type === 'heading' ? 1.2 : 1.6)
    return Math.ceil(fontSize * lh) + 16
  }
  const lineHeight   = element.lineHeight || (element.type === 'heading' ? 1.2 : 1.6)
  const padH         = Math.max(0, (element.paddingLeft ?? 0) + (element.paddingRight ?? 0))
  const usable       = Math.max(20, containerW - padH - 8)
  const avgCharW     = Math.max(4, fontSize * 0.50)
  const charsPerLine = Math.max(3, Math.floor(usable / avgCharW))
  const lines        = content.split('\n').reduce(
    (sum, line) => sum + Math.max(1, Math.ceil((line.length || 1) / charsPerLine)), 0)
  const padV = Math.max(0, (element.paddingTop ?? 0) + (element.paddingBottom ?? 0))
  return Math.ceil(lines * fontSize * lineHeight) + padV + 8
}

// ─── Per-element phone height ─────────────────────────────────────────────────

function phoneElemHeight(element, containerW) {
  const dh = element.height ?? 40
  if (TEXT_TYPES.has(element.type)) {
    const fs = scaleFontPhone(element) ?? element.fontSize ?? 16
    return Math.max(Math.round(dh * 0.85), estimateTextHeight(element, containerW, fs))
  }
  if (element.type === 'image' || element.type === 'video') {
    const ratio = dh / Math.max(1, element.width ?? 200)
    return clamp(Math.round(containerW * ratio), 80, 400)
  }
  if (element.type === 'button')   return clamp(dh, 40, 56)
  if (element.type === 'input')    return clamp(dh, 40, 52)
  if (element.type === 'select')   return clamp(dh, 40, 52)
  if (element.type === 'textarea') return clamp(dh, 80, 200)
  if (element.type === 'checkbox') return clamp(dh, 24, 36)
  if (element.type === 'divider')  return dh || 2
  if (element.type === 'icon') {
    const side = Math.min(element.width ?? 48, element.height ?? 48)
    return clamp(Math.round(side * 0.75), 24, 80)
  }
  return clamp(dh, 20, 500)
}

function phoneGap(element) {
  if (element.type === 'divider')         return 8
  if (element.type === 'label')           return 4
  if (FORM_TYPES.has(element.type))       return 12
  if (element.type === 'heading')         return 8
  return 16
}

function computeWidth(el, maxW) {
  if (el.type === 'icon') {
    const side = Math.min(el.width ?? 48, el.height ?? 48)
    return clamp(Math.round(side * 0.75), 24, 80)
  }
  if (el.type === 'checkbox') return Math.min(el.width ?? maxW, maxW)
  if (el.type === 'divider')  return maxW
  if (el.type === 'image' || el.type === 'video') return maxW
  if ((el.width ?? maxW) <= 120 && !TEXT_TYPES.has(el.type)) return Math.min(el.width ?? maxW, maxW)
  return maxW
}

function findParentSection(el, allElements, fullBleedSet) {
  const ely = el.y ?? 0
  return allElements.find(s => {
    if (!fullBleedSet.has(s.id)) return false
    const sy = s.y ?? 0
    return ely >= sy - 8 && ely < sy + (s.height ?? 0) - 8
  }) ?? null
}

// ─── autoResponsive ───────────────────────────────────────────────────────────
//
// Used only during initial template application / import.
// Produces the initial independent tablet + phone buckets.
// Normal per-breakpoint editing goes through setBreakpointProps, not here.

export function autoResponsive(elements, desktopCanvasWidth = 1200, options = {}) {
  if (!elements || elements.length === 0) return elements

  const preserveExisting = options.preserveExisting ?? false
  const tabletScale = TABLET_W / desktopCanvasWidth

  const isFullBleed = (el) => {
    const p = getElementProperties(el, 'desktop')
    return BOX_TYPES.has(el.type) && p.x <= 8 && p.width >= desktopCanvasWidth - 16
  }
  const fullBleedSet = new Set(elements.filter(isFullBleed).map(el => el.id))
  const isNonFullBleedContainer = (el) => BOX_TYPES.has(el.type) && !fullBleedSet.has(el.id)

  const parentOf = new Map()
  elements.forEach(parent => {
    if (!isNonFullBleedContainer(parent)) return
    const pp = getElementProperties(parent, 'desktop')
    const pr = pp.x + pp.width, pb = pp.y + pp.height
    elements.forEach(child => {
      if (child.id === parent.id || BOX_TYPES.has(child.type)) return
      const cp = getElementProperties(child, 'desktop')
      const cr = cp.x + cp.width, cb = cp.y + cp.height
      if (cp.x >= pp.x - 6 && cp.y >= pp.y - 6 && cr <= pr + 6 && cb <= pb + 6 && !parentOf.has(child.id))
        parentOf.set(child.id, parent)
    })
  })

  // Sort by desktop Y then X
  const sorted = [...elements].sort((a, b) => {
    const ap = getElementProperties(a, 'desktop')
    const bp = getElementProperties(b, 'desktop')
    return ap.y !== bp.y ? ap.y - bp.y : ap.x - bp.x
  })

  // Phone stacking pass
  const phonePos = new Map()
  let cursor = PHONE_MARGIN
  let lastSectionId = null

  sorted.forEach(el => {
    if (fullBleedSet.has(el.id) || parentOf.has(el.id)) return
    const mySection = findParentSection(el, elements, fullBleedSet)
    if (mySection?.id !== lastSectionId) {
      if (cursor > 0) cursor += 24
      lastSectionId = mySection?.id ?? null
    }

    if (isNonFullBleedContainer(el)) {
      const children = sorted.filter(c => parentOf.get(c.id)?.id === el.id)
      if (children.length === 0) {
        const h = phoneElemHeight(el, PHONE_INNER)
        phonePos.set(el.id, { x: PHONE_MARGIN, y: cursor, width: PHONE_INNER, height: h })
        cursor += h + 16
        return
      }
      const CPAD = 16
      let childCursor = cursor + CPAD
      const innerW = PHONE_INNER - CPAD * 2
      children
        .sort((a, b) => {
          const ap = getElementProperties(a, 'desktop'), bp = getElementProperties(b, 'desktop')
          return ap.y !== bp.y ? ap.y - bp.y : ap.x - bp.x
        })
        .forEach(child => {
          const childW  = computeWidth(child, innerW)
          const childH  = phoneElemHeight(child, childW)
          const childX  = PHONE_MARGIN + CPAD + (childW < innerW ? Math.round((innerW - childW) / 2) : 0)
          const fontOvr = scaleFontPhone(child)
          phonePos.set(child.id, { x: childX, y: childCursor, width: childW, height: childH, ...(fontOvr != null ? { fontSize: fontOvr } : {}) })
          childCursor += childH + phoneGap(child)
        })
      const containerH = childCursor - cursor + CPAD
      phonePos.set(el.id, { x: PHONE_MARGIN, y: cursor, width: PHONE_INNER, height: containerH })
      cursor += containerH + 16
      return
    }

    const elW     = computeWidth(el, PHONE_INNER)
    const elH     = phoneElemHeight(el, elW)
    const elX     = elW < PHONE_INNER - 10 ? Math.round((PHONE_W - elW) / 2) : PHONE_MARGIN
    const fontOvr = scaleFontPhone(el)
    phonePos.set(el.id, { x: elX, y: cursor, width: elW, height: elH, ...(fontOvr != null ? { fontSize: fontOvr } : {}) })
    cursor += elH + phoneGap(el)
  })

  // Size full-bleed sections around their children
  const SPADY = 28, SPADB = 32
  elements
    .filter(el => fullBleedSet.has(el.id))
    .sort((a, b) => (getElementProperties(a, 'desktop').y) - (getElementProperties(b, 'desktop').y))
    .forEach(section => {
      const sp = getElementProperties(section, 'desktop')
      let minY = Infinity, maxY = -Infinity
      phonePos.forEach((pos, id) => {
        const el = elements.find(e => e.id === id)
        if (!el) return
        const ely = getElementProperties(el, 'desktop').y
        if (ely >= sp.y - 8 && ely < sp.y + sp.height - 8) {
          minY = Math.min(minY, pos.y)
          maxY = Math.max(maxY, pos.y + pos.height)
        }
      })
      if (minY === Infinity) {
        const fallbackH = Math.max(80, Math.round((sp.height || 100) * 0.45))
        phonePos.set(section.id, { x: 0, y: cursor, width: PHONE_W, height: fallbackH })
        cursor += fallbackH + 16
        return
      }
      phonePos.set(section.id, { x: 0, y: Math.max(0, minY - SPADY), width: PHONE_W, height: maxY - minY + SPADY + SPADB })
    })

  // Build tablet layout
  function buildTablet(el) {
    const p = getElementProperties(el, 'desktop')
    if (fullBleedSet.has(el.id)) return { x: 0, y: p.y, width: TABLET_W, height: p.height }
    let tx = Math.round(p.x * tabletScale)
    let tw = Math.round(p.width * tabletScale)
    if (tx + tw > TABLET_W) tw = Math.max(40, TABLET_W - tx)
    if (tx < 0) tx = 0
    let th = p.height
    if (TEXT_TYPES.has(el.type)) {
      const fs = scaleFontTablet(el) ?? p.fontSize ?? 16
      th = Math.max(th, estimateTextHeight(el, tw, fs))
    }
    return { x: tx, y: p.y, width: tw, height: th }
  }

  // Assemble output — write to new independent schema
  return elements.map(el => {
    if (preserveExisting && isNewFormat(el) && el.tablet && el.phone) return el

    const desktopProps = getElementProperties(el, 'desktop')
    const tb    = buildTablet(el)
    const tabSt = scaleFontTablet(el)
    const phone = phonePos.get(el.id)

    const tabletProps = defaultProps({
      ...desktopProps,
      x: tb.x, y: tb.y, width: tb.width, height: tb.height,
      ...(tabSt != null ? { fontSize: tabSt } : {}),
    })
    const phoneProps = phone
      ? defaultProps({ ...desktopProps, x: phone.x, y: phone.y, width: phone.width, height: phone.height, ...(phone.fontSize != null ? { fontSize: phone.fontSize } : {}) })
      : defaultProps({ ...desktopProps, x: PHONE_MARGIN, y: 0, width: PHONE_INNER, height: phoneElemHeight(el, PHONE_INNER) })

    const base = migrateElement(el)
    return {
      ...base,
      tablet: (preserveExisting && base.tablet) ? base.tablet : tabletProps,
      phone:  (preserveExisting && base.phone)  ? base.phone  : phoneProps,
      custom: (preserveExisting && base.custom) ? base.custom : { ...tabletProps },
    }
  })
}

// ─── Grid detection ───────────────────────────────────────────────────────────

export function detectGrid(elements, tolerance = 20) {
  if (elements.length < 2) return null
  const positions = elements.map(el => {
    const p = getElementProperties(el, 'desktop')
    return { id: el.id, x: p.x, width: p.width }
  })
  const cols = []
  positions.forEach(pos => {
    const col = cols.find(c => Math.abs(c.x - pos.x) <= tolerance)
    if (col) col.items.push(pos)
    else     cols.push({ x: pos.x, items: [pos] })
  })
  cols.sort((a, b) => a.x - b.x)
  if (cols.length < 2) return null
  const spacing = cols.length > 1
    ? cols[1].x - (cols[0].x + (positions.find(p => p.x === cols[0].x)?.width ?? 200))
    : 0
  return { isGrid: cols.length >= 2, cols: cols.length, spacing, columnPositions: cols.map(c => c.x) }
}

export function createGridResponsive(elements, gridInfo, desktopCanvasWidth = 1200) {
  if (!gridInfo?.isGrid || elements.length === 0) return elements
  const tabletCols = Math.max(1, Math.ceil(gridInfo.cols / 2))
  return elements.map((el, idx) => {
    const dp = getElementProperties(el, 'desktop')
    const colIndex = idx % (gridInfo.cols || 3)
    const itemW    = Math.floor((TABLET_W - 24) / tabletCols)
    const base     = migrateElement(el)
    return {
      ...base,
      tablet: base.tablet ?? defaultProps({ ...dp, x: 12 + (colIndex % tabletCols) * (itemW + 8), y: dp.y, width: itemW, height: dp.height }),
      phone:  base.phone  ?? defaultProps({ ...dp, x: PHONE_MARGIN, y: dp.y, width: PHONE_INNER, height: dp.height }),
    }
  })
}

// ─── applySmartResponsive ─────────────────────────────────────────────────────
//
// Single export — no duplicate declaration.
// Used during template application / import only.

export function applySmartResponsive(elements, desktopCanvasWidth = 1200) {
  if (!elements || elements.length === 0) return elements

  let result = applyResponsiveDefaultsToTree(elements, desktopCanvasWidth)

  // Detect multi-column groups and apply grid-aware layouts
  const groupedByY = new Map()
  result.forEach(el => {
    const y = Math.round((getElementProperties(el, 'desktop').y) / 20) * 20
    if (!groupedByY.has(y)) groupedByY.set(y, [])
    groupedByY.get(y).push(el)
  })
  groupedByY.forEach(group => {
    if (group.length < 3) return
    const gridInfo = detectGrid(group, 30)
    if (!gridInfo?.isGrid || gridInfo.cols < 3) return
    const gridFixed = createGridResponsive(group, gridInfo, desktopCanvasWidth)
    gridFixed.forEach(fixed => {
      const idx = result.findIndex(el => el.id === fixed.id)
      if (idx >= 0) result[idx] = fixed
    })
  })

  return autoResponsive(result, desktopCanvasWidth, { preserveExisting: false })
}



