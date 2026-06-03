/**
 * responsive.js
 *
 * Single source of truth for breakpoint definitions and per-breakpoint
 * layout resolution. Elements store their desktop layout as the base.
 * Tablet / phone / custom overrides are stored in element.breakpoints[bp].
 */

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

export function getElementLayout(element, breakpointId) {
  const base = {
    x:      element.x      ?? 0,
    y:      element.y      ?? 0,
    width:  element.width  ?? 200,
    height: element.height ?? 100,
  }

  if (breakpointId === 'desktop') return base

  const bpOverrides = element.breakpoints ?? {}

  if (breakpointId === 'phone') {
    return { ...base, ...(bpOverrides.tablet ?? {}), ...(bpOverrides.phone ?? {}) }
  }
  if (breakpointId === 'tablet') {
    return { ...base, ...(bpOverrides.tablet ?? {}) }
  }
  return { ...base, ...(bpOverrides.tablet ?? {}), ...(bpOverrides.custom ?? {}) }
}

export function getResponsiveValue(element, breakpointId, key, fallback) {
  const baseValue   = element[key] ?? fallback
  const bpOverrides = element.breakpoints ?? {}
  if (breakpointId === 'desktop') return baseValue
  if (breakpointId === 'phone')   return bpOverrides.phone?.[key]  ?? bpOverrides.tablet?.[key] ?? baseValue
  if (breakpointId === 'tablet')  return bpOverrides.tablet?.[key] ?? baseValue
  return bpOverrides.custom?.[key] ?? bpOverrides.tablet?.[key] ?? baseValue
}

export function getResponsiveFontSize(element, breakpointId, fallback = 16) {
  const base        = element.fontSize ?? fallback
  const bpOverrides = element.breakpoints ?? {}
  if (breakpointId === 'desktop') return base
  if (breakpointId === 'tablet')  return bpOverrides.tablet?.fontSize ?? Math.round(base * 0.9)
  if (breakpointId === 'phone')   return bpOverrides.phone?.fontSize  ?? Math.round(base * 0.8)
  return bpOverrides.custom?.fontSize ?? Math.round(base * 0.9)
}

export function setElementLayout(element, breakpointId, changes) {
  if (breakpointId === 'desktop') return { ...element, ...changes }
  return {
    ...element,
    breakpoints: {
      ...(element.breakpoints ?? {}),
      [breakpointId]: { ...(element.breakpoints?.[breakpointId] ?? {}), ...changes },
    },
  }
}

export function generateResponsiveDefaults(element, desktopCanvasWidth = 1200) {
  const deskX = element.x      ?? 0
  const deskY = element.y      ?? 0
  const deskW = element.width  ?? 200
  const deskH = element.height ?? 100
  const tabletScale = 768 / desktopCanvasWidth
  let tabX = Math.round(deskX * tabletScale)
  let tabW = Math.round(deskW * tabletScale)
  if (tabX + tabW > 768 - 16) tabW = Math.max(40, 768 - tabX - 16)
  if (tabX < 0) tabX = 0
  const phoneW = deskW < 200
    ? Math.min(deskW, 390 - 48)
    : 390 - 48
  return {
    ...element,
    breakpoints: {
      ...(element.breakpoints ?? {}),
      tablet: element.breakpoints?.tablet ?? { x: tabX, y: deskY, width: tabW,  height: deskH },
      phone:  element.breakpoints?.phone  ?? { x: 24,   y: deskY, width: phoneW, height: deskH },
      custom: element.breakpoints?.custom ?? { x: tabX, y: deskY, width: tabW,  height: deskH },
    },
  }
}

export function applyResponsiveDefaultsToTree(tree, desktopCanvasWidth = 1200) {
  return tree.map(el => {
    if (el.breakpoints?.tablet || el.breakpoints?.phone) return el
    return generateResponsiveDefaults(el, desktopCanvasWidth)
  })
}

// ─── Constants ────────────────────────────────────────────────────────────────

const PHONE_W      = 390
const PHONE_MARGIN = 20
const PHONE_INNER  = PHONE_W - PHONE_MARGIN * 2  // 350

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

/**
 * Estimate how tall a text element will be at a given container width + font size.
 *
 * Uses 0.50× fontSize as average char width — slightly conservative so we
 * never underestimate and produce boxes that clip their content.
 */
function estimateTextHeight(element, containerW, fontSize) {
  if (!TEXT_TYPES.has(element.type)) return element.height ?? 40

  const content    = String(element.content ?? element.placeholder ?? '').trim()
  if (!content) {
    const lh = element.lineHeight || (element.type === 'heading' ? 1.2 : 1.6)
    return Math.ceil(fontSize * lh) + 16
  }

  const lineHeight  = element.lineHeight || (element.type === 'heading' ? 1.2 : 1.6)
  const padH        = Math.max(0, (element.paddingLeft ?? 0) + (element.paddingRight ?? 0))
  const usable      = Math.max(20, containerW - padH - 8)
  const avgCharW    = Math.max(4, fontSize * 0.50)
  const charsPerLine = Math.max(3, Math.floor(usable / avgCharW))

  const lines = content.split('\n').reduce((sum, line) => {
    return sum + Math.max(1, Math.ceil((line.length || 1) / charsPerLine))
  }, 0)

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

// ─── Gap between consecutive phone elements ───────────────────────────────────

function phoneGap(element) {
  if (element.type === 'divider') return 8
  if (element.type === 'label')   return 4
  if (FORM_TYPES.has(element.type)) return 12
  if (element.type === 'heading') return 8
  return 16
}

// ─── Main autoResponsive ──────────────────────────────────────────────────────

/**
 * Generate tablet + phone breakpoints for every element in the tree.
 *
 * PHONE STRATEGY — three rules, applied strictly:
 *
 *   1. SORT  — All elements are sorted by (desktopY, desktopX). This converts
 *              the 2-D desktop canvas into a 1-D reading-order list.
 *
 *   2. STACK — Every element gets y = cursor. The cursor advances by the
 *              element's phone height + a gap. No element ever derives its
 *              phone Y from its desktop Y.
 *
 *   3. WRAP  — Full-bleed containers (sections) get their phone position set
 *              AFTER their children are placed, by taking the min/max of their
 *              children's phone bounds. This guarantees sections always wrap
 *              exactly their content.
 *
 * LEAF ONLY — Only leaf elements (non-container types, or containers with no
 * children) participate in the stacking pass. Non-full-bleed containers
 * (cards, frames) are also given their own stacking slot, and their children
 * are re-stacked inside them.
 *
 * TABLET STRATEGY — proportional X/width scaling to 768 canvas. Font sizes
 * scaled down modestly. Full-bleed containers stretch to full tablet width.
 */
export function autoResponsive(elements, desktopCanvasWidth = 1200, options = {}) {
  if (!elements || elements.length === 0) return elements

  const preserveExisting = options.preserveExisting ?? false
  const tabletScale = TABLET_W / desktopCanvasWidth

  // ── 1. Classify ────────────────────────────────────────────────────────────

  // Full-bleed sections: box-type elements that span the full canvas width
  const isFullBleed = (el) =>
    BOX_TYPES.has(el.type) &&
    (el.x ?? 0) <= 8 &&
    (el.width ?? 0) >= desktopCanvasWidth - 16

  const fullBleedSet = new Set(elements.filter(isFullBleed).map(el => el.id))

  // Non-full-bleed containers: cards, frames, etc.
  const isNonFullBleedContainer = (el) =>
    BOX_TYPES.has(el.type) && !fullBleedSet.has(el.id)

  // Find the parent non-full-bleed container for a given element (if any)
  const parentOf = new Map() // childId → parentEl
  elements.forEach(parent => {
    if (!isNonFullBleedContainer(parent)) return
    const px = parent.x ?? 0, py = parent.y ?? 0
    const pr = px + (parent.width  ?? 0)
    const pb = py + (parent.height ?? 0)
    elements.forEach(child => {
      if (child.id === parent.id) return
      if (BOX_TYPES.has(child.type)) return // don't nest containers
      const cx = child.x ?? 0, cy = child.y ?? 0
      const cr = cx + (child.width  ?? 0)
      const cb = cy + (child.height ?? 0)
      const inside = cx >= px - 6 && cy >= py - 6 && cr <= pr + 6 && cb <= pb + 6
      if (inside && !parentOf.has(child.id)) {
        parentOf.set(child.id, parent)
      }
    })
  })

  // ── 2. Build sorted reading order ─────────────────────────────────────────
  //
  // Sort by desktop Y first, then X. This is the order elements will be
  // stacked on phone.

  const sorted = [...elements].sort((a, b) => {
    const ay = a.y ?? 0, by_ = b.y ?? 0
    if (ay !== by_) return ay - by_
    return (a.x ?? 0) - (b.x ?? 0)
  })

  // ── 3. Phone stacking pass ────────────────────────────────────────────────

  // phonePos: the final phone layout per element id
  const phonePos = new Map()

  let cursor = PHONE_MARGIN
  let lastSectionId = null

  // We process elements in reading order. We skip:
  //   - Full-bleed sections (positioned after their children)
  //   - Children of non-full-bleed containers (positioned inside their parent)
  //
  // Non-full-bleed containers ARE processed here — their children are
  // sub-stacked inside them.

  sorted.forEach(el => {
    // Skip full-bleed sections — they'll be sized around their children
    if (fullBleedSet.has(el.id)) return

    // Skip children of non-full-bleed containers — handled inside parent
    if (parentOf.has(el.id)) return

    // ── Detect section change for extra gap ──────────────────────────────────
    const mySection = findParentSection(el, elements, fullBleedSet)
    if (mySection?.id !== lastSectionId) {
      if (cursor > 0) cursor += 24
      lastSectionId = mySection?.id ?? null
    }

    // ── Non-full-bleed container: stack its children inside ──────────────────
    if (isNonFullBleedContainer(el)) {
      const children = sorted.filter(c => parentOf.get(c.id)?.id === el.id)

      if (children.length === 0) {
        const h = phoneElemHeight(el, PHONE_INNER)
        phonePos.set(el.id, { x: PHONE_MARGIN, y: cursor, width: PHONE_INNER, height: h })
        cursor += h + 16
        return
      }

      // Sub-stack children inside the container
      const CPAD = 16
      let childCursor = cursor + CPAD
      const innerW = PHONE_INNER - CPAD * 2

      children
        .sort((a, b) => (a.y ?? 0) !== (b.y ?? 0) ? (a.y ?? 0) - (b.y ?? 0) : (a.x ?? 0) - (b.x ?? 0))
        .forEach(child => {
          const childW = computeWidth(child, innerW)
          const childH = phoneElemHeight(child, childW)
          const childX = PHONE_MARGIN + CPAD + (childW < innerW ? Math.round((innerW - childW) / 2) : 0)
          const fontOvr = scaleFontPhone(child)
          phonePos.set(child.id, {
            x: childX,
            y: childCursor,
            width: childW,
            height: childH,
            ...(fontOvr != null ? { fontSize: fontOvr } : {}),
          })
          childCursor += childH + phoneGap(child)
        })

      const containerH = childCursor - cursor + CPAD
      phonePos.set(el.id, { x: PHONE_MARGIN, y: cursor, width: PHONE_INNER, height: containerH })
      cursor += containerH + 16
      return
    }

    // ── Regular leaf element ─────────────────────────────────────────────────
    const elW  = computeWidth(el, PHONE_INNER)
    const elH  = phoneElemHeight(el, elW)
    const elX  = elW < PHONE_INNER - 10
      ? Math.round((PHONE_W - elW) / 2)  // centre narrow elements
      : PHONE_MARGIN
    const fontOvr = scaleFontPhone(el)

    phonePos.set(el.id, {
      x: elX,
      y: cursor,
      width: elW,
      height: elH,
      ...(fontOvr != null ? { fontSize: fontOvr } : {}),
    })

    cursor += elH + phoneGap(el)
  })

  // ── 4. Size full-bleed sections around their children ─────────────────────

  const SPADY = 28, SPADB = 32

  elements
    .filter(el => fullBleedSet.has(el.id))
    .sort((a, b) => (a.y ?? 0) - (b.y ?? 0))
    .forEach(section => {
      // Gather phone Y/height for every element whose desktop position is
      // inside this section (both direct children and container children)
      const sectionBox = { x: section.x ?? 0, y: section.y ?? 0, width: section.width ?? 0, height: section.height ?? 0 }

      let minY = Infinity, maxY = -Infinity
      phonePos.forEach((pos, id) => {
        const el = elements.find(e => e.id === id)
        if (!el) return
        const ely = el.y ?? 0
        if (ely >= sectionBox.y - 8 && ely < sectionBox.y + sectionBox.height - 8) {
          minY = Math.min(minY, pos.y)
          maxY = Math.max(maxY, pos.y + pos.height)
        }
      })

      if (minY === Infinity) {
        // No children found — proportional fallback
        const fallbackH = Math.max(80, Math.round((sectionBox.height || 100) * 0.45))
        phonePos.set(section.id, {
          x: 0,
          y: cursor,
          width: PHONE_W,
          height: fallbackH,
        })
        cursor += fallbackH + 16
        return
      }

      phonePos.set(section.id, {
        x: 0,
        y: Math.max(0, minY - SPADY),
        width: PHONE_W,
        height: maxY - minY + SPADY + SPADB,
      })
    })

  // ── 5. Tablet layout ───────────────────────────────────────────────────────

  function buildTablet(el) {
    if (fullBleedSet.has(el.id)) {
      return { x: 0, y: el.y ?? 0, width: TABLET_W, height: el.height ?? 100 }
    }
    let tx = Math.round((el.x ?? 0) * tabletScale)
    let tw = Math.round((el.width  ?? 200) * tabletScale)
    if (tx + tw > TABLET_W) tw = Math.max(40, TABLET_W - tx)
    if (tx < 0) tx = 0

    let th = el.height ?? 40
    if (TEXT_TYPES.has(el.type)) {
      const fs = scaleFontTablet(el) ?? el.fontSize ?? 16
      th = Math.max(th, estimateTextHeight(el, tw, fs))
    }
    return { x: tx, y: el.y ?? 0, width: tw, height: th }
  }

  // ── 6. Assemble final output ───────────────────────────────────────────────

  return elements.map(el => {
    if (preserveExisting && el.breakpoints?.tablet && el.breakpoints?.phone) return el

    const tb    = buildTablet(el)
    const tabSt = scaleFontTablet(el)
    const phone = phonePos.get(el.id)

    const tabletOverride = {
      x: tb.x, y: tb.y, width: tb.width, height: tb.height,
      ...(tabSt != null ? { fontSize: tabSt } : {}),
    }

    const phoneOverride = phone
      ? { x: phone.x, y: phone.y, width: phone.width, height: phone.height, ...(phone.fontSize != null ? { fontSize: phone.fontSize } : {}) }
      : { x: PHONE_MARGIN, y: 0, width: PHONE_INNER, height: phoneElemHeight(el, PHONE_INNER) }

    return {
      ...el,
      breakpoints: {
        ...(el.breakpoints ?? {}),
        tablet: preserveExisting && el.breakpoints?.tablet ? el.breakpoints.tablet : tabletOverride,
        phone:  preserveExisting && el.breakpoints?.phone  ? el.breakpoints.phone  : phoneOverride,
        custom: preserveExisting && el.breakpoints?.custom ? el.breakpoints.custom : tabletOverride,
      },
    }
  })
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Compute phone width for an element. Most elements go full PHONE_INNER.
 *  Small elements (icon, narrow button, checkbox) keep a natural width. */
function computeWidth(el, maxW) {
  if (el.type === 'icon') {
    const side = Math.min(el.width ?? 48, el.height ?? 48)
    return clamp(Math.round(side * 0.75), 24, 80)
  }
  if (el.type === 'checkbox') return Math.min(el.width ?? maxW, maxW)
  if (el.type === 'divider')  return maxW
  if (el.type === 'image' || el.type === 'video') return maxW
  // Narrow elements that aren't text (e.g. compact buttons < 120px wide)
  if ((el.width ?? maxW) <= 120 && !TEXT_TYPES.has(el.type)) {
    return Math.min(el.width ?? maxW, maxW)
  }
  return maxW
}

/** Find the full-bleed section that contains this element (by desktop Y). */
function findParentSection(el, allElements, fullBleedSet) {
  const ely = el.y ?? 0
  return allElements.find(s => {
    if (!fullBleedSet.has(s.id)) return false
    const sy = s.y ?? 0
    return ely >= sy - 8 && ely < sy + (s.height ?? 0) - 8
  }) ?? null
}

// ─── Multi-column grid detection & layout ─────────────────────────────────────

/**
 * Detect if elements form a multi-column grid.
 * Returns { isGrid: boolean, cols: number, spacing: number } or null.
 */
export function detectGrid(elements, tolerance = 20) {
  if (elements.length < 2) return null

  const positions = elements.map(el => ({
    id: el.id,
    x: el.x ?? 0,
    y: el.y ?? 0,
    width: el.width ?? 200,
  }))

  // Group by approximate X position (column detection)
  const cols = []
  positions.forEach(pos => {
    const col = cols.find(c => Math.abs(c.x - pos.x) <= tolerance)
    if (col) {
      col.items.push(pos)
    } else {
      cols.push({ x: pos.x, items: [pos] })
    }
  })

  cols.sort((a, b) => a.x - b.x)

  if (cols.length < 2) return null

  // Calculate spacing between columns
  const spacing = cols.length > 1 
    ? cols[1].x - (cols[0].x + (positions.find(p => p.x === cols[0].x)?.width ?? 200))
    : 0

  return {
    isGrid: cols.length >= 2,
    cols: cols.length,
    spacing,
    columnPositions: cols.map(c => c.x),
  }
}

/**
 * Generate responsive tablet/phone overrides for a multi-column grid.
 * On tablet: reduce columns by half or to 2. On phone: stack to 1 column.
 */
export function createGridResponsive(elements, gridInfo, desktopCanvasWidth = 1200) {
  if (!gridInfo?.isGrid || elements.length === 0) return elements

  const TABLET_W = 768
  const PHONE_W = 390
  const PHONE_PADDING = 20

  // Calculate new column counts
  const tabletCols = Math.max(1, Math.ceil(gridInfo.cols / 2))

  // Calculate item dimensions
  const getTabletLayout = (el, colIndex) => {
    const itemW = Math.floor((TABLET_W - 24) / tabletCols)
    const itemX = 12 + (colIndex % tabletCols) * (itemW + 8)
    const itemY = el.y ?? 0 // Keep original Y spacing

    return {
      x: itemX,
      y: itemY,
      width: itemW,
      height: el.height ?? 100,
    }
  }

  const getPhoneLayout = (el) => {
    const phoneInner = PHONE_W - PHONE_PADDING * 2
    return {
      x: PHONE_PADDING,
      y: el.y ?? 0, // Will be recalculated by autoResponsive
      width: phoneInner,
      height: el.height ?? 100,
    }
  }

  return elements.map((el, idx) => {
    const hasTablet = el.breakpoints?.tablet
    const hasPhone = el.breakpoints?.phone

    if (hasTablet && hasPhone) return el

    const colIndex = idx % (gridInfo.cols || 3)

    return {
      ...el,
      breakpoints: {
        ...(el.breakpoints ?? {}),
        tablet: hasTablet ? el.breakpoints.tablet : getTabletLayout(el, colIndex),
        phone: hasPhone ? el.breakpoints.phone : getPhoneLayout(el, idx),
      },
    }
  })
}

// ─── Improved responsive defaults for templates ────────────────────────────────

/**
 * Generate smart responsive breakpoints that:
 * - Detect and collapse multi-column layouts
 * - Prevent right-side content overflow
 * - Ensure text doesn't clip
 * - Keep spacing balanced
 */
export function applySmartResponsive(elements, desktopCanvasWidth = 1200) {
  if (!elements || elements.length === 0) return elements

  // First pass: apply basic defaults
  let result = applyResponsiveDefaultsToTree(elements, desktopCanvasWidth)

  // Second pass: detect multi-column patterns and fix them
  const groupedByY = new Map()
  result.forEach(el => {
    const y = Math.round((el.y ?? 0) / 20) * 20 // Group by Y proximity
    if (!groupedByY.has(y)) groupedByY.set(y, [])
    groupedByY.get(y).push(el)
  })

  // Apply grid-specific fixes to groups with 3+ items in similar Y positions
  groupedByY.forEach((group) => {
    if (group.length >= 3) {
      const gridInfo = detectGrid(group, 30)
      if (gridInfo?.isGrid && gridInfo.cols >= 3) {
        // Create grid responsives
        const gridFixed = createGridResponsive(group, gridInfo, desktopCanvasWidth)
        gridFixed.forEach(fixed => {
          const idx = result.findIndex(el => el.id === fixed.id)
          if (idx >= 0) result[idx] = fixed
        })
      }
    }
  })

  // Third pass: run the full autoResponsive for final layout. This overwrites
  // generated defaults so templates get a real mobile reflow at 390px.
  return autoResponsive(result, desktopCanvasWidth, { preserveExisting: false })
}



3
