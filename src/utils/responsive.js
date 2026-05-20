/**
 * responsive.js
 *
 * Single source of truth for breakpoint definitions and per-breakpoint
 * layout resolution. Elements store their desktop layout as the base.
 * Tablet / phone / custom overrides are stored in element.breakpoints[bp].
 *
 * Structure of element.breakpoints:
 * {
 *   tablet:  { x, y, width, height },  // only the keys that differ
 *   phone:   { x, y, width, height },
 *   custom:  { x, y, width, height },
 * }
 *
 * Desktop always reads from the root x/y/width/height — never from
 * element.breakpoints.desktop — so existing data is never broken.
 */

export const BREAKPOINTS = [
  { id: 'desktop', label: 'Desktop', width: 1200 },
  { id: 'tablet',  label: 'Tablet',  width: 768  },
  { id: 'phone',   label: 'Phone',   width: 390  },
  { id: 'custom',  label: 'Custom',  width: null  },
]

/**
 * Returns the canvas width for a given breakpoint id.
 * For 'custom' the caller supplies customWidth.
 */
export function getCanvasWidth(breakpointId, canvasSettings, customWidth = 800) {
  switch (breakpointId) {
    case 'desktop': return canvasSettings?.width  || 1200
    case 'tablet':  return 768
    case 'phone':   return 390
    case 'custom':  return customWidth
    default:        return canvasSettings?.width  || 1200
  }
}

/**
 * Read the effective layout for an element at a given breakpoint.
 * Falls through: phone → tablet → desktop (root).
 *
 * Returns { x, y, width, height } — always fully resolved.
 */
export function getElementLayout(element, breakpointId) {
  const base = {
    x:      element.x      ?? 0,
    y:      element.y      ?? 0,
    width:  element.width  ?? 200,
    height: element.height ?? 100,
  }

  if (breakpointId === 'desktop') return base

  const bpOverrides = element.breakpoints ?? {}

  // Fall-through chain: phone → tablet → desktop
  if (breakpointId === 'phone') {
    return {
      ...base,
      ...(bpOverrides.tablet ?? {}),
      ...(bpOverrides.phone  ?? {}),
    }
  }

  if (breakpointId === 'tablet') {
    return {
      ...base,
      ...(bpOverrides.tablet ?? {}),
    }
  }

  // custom: use custom override if present, otherwise inherit tablet.
  return {
    ...base,
    ...(bpOverrides.tablet ?? {}),
    ...(bpOverrides.custom ?? {}),
  }
}

export function getResponsiveValue(element, breakpointId, key, fallback) {
  const baseValue = element[key] ?? fallback
  const bpOverrides = element.breakpoints ?? {}

  if (breakpointId === 'desktop') return baseValue

  if (breakpointId === 'phone') {
    return bpOverrides.phone?.[key] ?? bpOverrides.tablet?.[key] ?? baseValue
  }

  if (breakpointId === 'tablet') {
    return bpOverrides.tablet?.[key] ?? baseValue
  }

  return bpOverrides.custom?.[key] ?? bpOverrides.tablet?.[key] ?? baseValue
}

/**
 * Produce an updated element after a layout change at a given breakpoint.
 * Desktop edits go to root keys. Other breakpoints write into element.breakpoints[bp].
 */
export function setElementLayout(element, breakpointId, changes) {
  if (breakpointId === 'desktop') {
    return { ...element, ...changes }
  }

  return {
    ...element,
    breakpoints: {
      ...(element.breakpoints ?? {}),
      [breakpointId]: {
        ...(element.breakpoints?.[breakpointId] ?? {}),
        ...changes,
      },
    },
  }
}

/**
 * Auto-generate sensible tablet / phone defaults for a freshly inserted
 * element based on its desktop layout and the canvas width.
 *
 * Rules:
 *   Tablet  — if element right-edge exceeds tablet canvas, clamp width and
 *             reposition to stay in-bounds. Maintain y.
 *   Phone   — full-width minus 24 px margin on each side, stack vertically
 *             preserving relative order (y is kept so order is implicit).
 */
export function generateResponsiveDefaults(element, desktopCanvasWidth = 1200) {
  const tabletWidth  = 768
  const phoneWidth   = 390
  const phoneMargin  = 24

  const deskX = element.x      ?? 0
  const deskY = element.y      ?? 0
  const deskW = element.width  ?? 200
  const deskH = element.height ?? 100

  // ── Tablet ─────────────────────────────────────────────────────────────────
  // Scale x proportionally, clamp width if it overflows
  const tabletScale = tabletWidth / desktopCanvasWidth
  let tabX = Math.round(deskX * tabletScale)
  let tabW = Math.round(deskW * tabletScale)

  // Don't let element overflow tablet canvas
  if (tabX + tabW > tabletWidth - 16) {
    tabW = Math.max(40, tabletWidth - tabX - 16)
  }
  if (tabX < 0) tabX = 0

  // ── Phone ──────────────────────────────────────────────────────────────────
  // Most elements go full-width with side margins.
  // Very small elements (buttons, checkboxes, inputs < 200px) keep their size
  // but are left-aligned within the margin.
  const isNarrow = deskW < 200
  const phoneX   = phoneMargin
  const phoneW   = isNarrow
    ? Math.min(deskW, phoneWidth - phoneMargin * 2)
    : phoneWidth - phoneMargin * 2

  return {
    ...element,
    breakpoints: {
      ...(element.breakpoints ?? {}),
      tablet: element.breakpoints?.tablet ?? { x: tabX, y: deskY, width: tabW, height: deskH },
      phone:  element.breakpoints?.phone  ?? { x: phoneX, y: deskY, width: phoneW, height: deskH },
      custom: element.breakpoints?.custom ?? { x: tabX, y: deskY, width: tabW, height: deskH },
    },
  }
}

/**
 * Apply generateResponsiveDefaults to a full tree of elements.
 * Skips elements that already have breakpoint overrides set.
 */
export function applyResponsiveDefaultsToTree(tree, desktopCanvasWidth = 1200) {
  return tree.map(el => {
    const hasOverrides =
      el.breakpoints?.tablet || el.breakpoints?.phone
    if (hasOverrides) return el
    return generateResponsiveDefaults(el, desktopCanvasWidth)
  })
}

const TEXT_TYPES = new Set(['heading', 'paragraph', 'text', 'link', 'label'])
const FORM_TYPES = new Set(['button', 'input', 'textarea', 'select', 'checkbox'])
const BOX_TYPES = new Set(['container', 'section', 'frame', 'card'])

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

function baseBox(element) {
  return {
    x: element.x ?? 0,
    y: element.y ?? 0,
    width: element.width ?? 200,
    height: element.height ?? 100,
  }
}

function containsBox(parent, child, tolerance = 3) {
  return (
    child.x >= parent.x - tolerance &&
    child.y >= parent.y - tolerance &&
    child.x + child.width <= parent.x + parent.width + tolerance &&
    child.y + child.height <= parent.y + parent.height + tolerance
  )
}

function getScaledFontSize(element, breakpointId) {
  if (!element.fontSize) return undefined

  const base = element.fontSize
  if (breakpointId === 'tablet') {
    if (element.type === 'heading') return clamp(Math.round(base * (base >= 48 ? 0.82 : 0.9)), 14, 56)
    return clamp(Math.round(base * 0.94), 10, 18)
  }

  if (element.type === 'heading') return clamp(Math.round(base * (base >= 56 ? 0.62 : base >= 36 ? 0.82 : 0.9)), 16, 42)
  if (element.type === 'label') return clamp(Math.round(base * 0.92), 10, 13)
  if (FORM_TYPES.has(element.type)) return clamp(Math.round(base * 0.9), 12, 15)
  return clamp(Math.round(base * 0.88), 11, 16)
}

function estimateTextHeight(element, width, fontSize) {
  if (!TEXT_TYPES.has(element.type)) return element.height ?? 40

  const content = String(element.content || '')
  const lineHeight = element.lineHeight || (element.type === 'heading' ? 1.18 : 1.6)
  const usableWidth = Math.max(24, width - 8)
  const charsPerLine = Math.max(4, Math.floor(usableWidth / Math.max(6, fontSize * 0.54)))
  const lines = content.split('\n').reduce((count, line) => {
    const text = line.trim() || ' '
    return count + Math.max(1, Math.ceil(text.length / charsPerLine))
  }, 0)

  return Math.ceil(lines * fontSize * lineHeight + 8)
}

function responsiveOverrides(element, breakpointId, width, fallbackHeight) {
  const fontSize = getScaledFontSize(element, breakpointId)
  const overrides = fontSize ? { fontSize } : {}

  if (TEXT_TYPES.has(element.type)) {
    overrides.height = Math.max(
      Math.round((fallbackHeight ?? element.height ?? 40) * (breakpointId === 'phone' ? 0.9 : 1)),
      estimateTextHeight(element, width, fontSize || element.fontSize || 16),
    )
  }

  return overrides
}

function isFullBleedContainer(element, desktopCanvasWidth) {
  const box = baseBox(element)
  return BOX_TYPES.has(element.type) && box.x <= 4 && box.width >= desktopCanvasWidth - 8
}

function getPhoneItemHeight(element, width) {
  const box = baseBox(element)
  if (TEXT_TYPES.has(element.type)) {
    const fontSize = getScaledFontSize(element, 'phone') || element.fontSize || 16
    return Math.max(Math.round(box.height * 0.9), estimateTextHeight(element, width, fontSize))
  }
  if (element.type === 'image' || element.type === 'video') {
    return Math.max(96, Math.round(width * (box.height / Math.max(1, box.width))))
  }
  return box.height
}

/**
 * Auto-generate tablet + phone breakpoints for a desktop-only element tree.
 *
 * Tablet: scales x/width proportionally to the tablet canvas (768).
 * Phone:  groups elements into rows by overlapping y-range, then re-flows
 *         each row top-to-bottom — every element becomes full-width and
 *         stacked, so no two elements ever overlap.
 *
 * Existing breakpoint overrides on an element are preserved.
 */
export function autoResponsive(elements, desktopCanvasWidth = 1200) {
  const tabletWidth = 768
  const phoneWidth  = 390
  const phoneMargin = 24
  const phoneInner  = phoneWidth - phoneMargin * 2
  const tabletScale = tabletWidth / desktopCanvasWidth

  const boxes = new Map(elements.map(element => [element.id, baseBox(element)]))
  const fullBleedIds = new Set(elements.filter(element => isFullBleedContainer(element, desktopCanvasWidth)).map(element => element.id))
  const groupedChildIds = new Set()
  const groups = []

  elements.forEach(container => {
    if (!BOX_TYPES.has(container.type) || fullBleedIds.has(container.id)) return
    const containerBox = boxes.get(container.id)
    const children = elements.filter(child => {
      if (child.id === container.id || fullBleedIds.has(child.id) || BOX_TYPES.has(child.type)) return false
      return containsBox(containerBox, boxes.get(child.id))
    })
    if (!children.length) return
    children.forEach(child => groupedChildIds.add(child.id))
    groups.push({ type: 'group', element: container, children, box: containerBox })
  })

  const groupByContainerId = new Map(groups.map(group => [group.element.id, group]))
  const phoneLayouts = new Map()
  const sectionBounds = new Map()
  const sections = elements
    .filter(element => fullBleedIds.has(element.id))
    .sort((a, b) => (a.y ?? 0) - (b.y ?? 0))

  const topLevelItems = elements
    .filter(element => !fullBleedIds.has(element.id) && !groupedChildIds.has(element.id))
    .map(element => groupByContainerId.get(element.id) || { type: 'single', element, box: boxes.get(element.id) })
    .sort((a, b) => (a.box.y === b.box.y ? a.box.x - b.box.x : a.box.y - b.box.y))

  const findSection = (itemBox) => sections.find(section => {
    const sectionBox = boxes.get(section.id)
    return itemBox.y >= sectionBox.y - 4 && itemBox.y < sectionBox.y + sectionBox.height - 4
  })

  let cursor = 0
  let currentSectionId = null

  topLevelItems.forEach(item => {
    const section = findSection(item.box)
    const sectionId = section?.id ?? null

    if (sectionId !== currentSectionId) {
      if (cursor > 0) cursor += 28
      currentSectionId = sectionId
      if (sectionId && !sectionBounds.has(sectionId)) {
        sectionBounds.set(sectionId, { start: Math.max(0, cursor - 18), end: cursor })
      }
    }

    if (item.type === 'group') {
      const groupX = phoneMargin
      const groupY = cursor
      const groupW = phoneInner
      const containerBox = item.box
      const scaleX = groupW / Math.max(1, containerBox.width)
      let groupBottom = Math.round(containerBox.height * Math.min(1, scaleX))

      item.children.forEach(child => {
        const childBox = boxes.get(child.id)
        const relX = childBox.x - containerBox.x
        const relY = childBox.y - containerBox.y
        const rightPad = containerBox.x + containerBox.width - (childBox.x + childBox.width)
        const childX = groupX + Math.round(relX * scaleX)
        const childW = Math.max(40, groupW - Math.round((relX + rightPad) * scaleX))
        const childH = getPhoneItemHeight(child, childW)
        const childY = groupY + Math.round(relY * 0.92)

        phoneLayouts.set(child.id, {
          x: childX,
          y: childY,
          width: childW,
          height: childH,
          ...responsiveOverrides(child, 'phone', childW, childH),
        })
        groupBottom = Math.max(groupBottom, childY - groupY + childH + Math.max(18, Math.round((containerBox.height - relY - childBox.height) * 0.6)))
      })

      phoneLayouts.set(item.element.id, {
        x: groupX,
        y: groupY,
        width: groupW,
        height: Math.max(80, groupBottom),
      })
      cursor += Math.max(80, groupBottom) + 20
    } else {
      const element = item.element
      const width = element.type === 'divider' ? phoneInner : phoneInner
      const height = getPhoneItemHeight(element, width)
      phoneLayouts.set(element.id, {
        x: phoneMargin,
        y: cursor,
        width,
        height,
        ...responsiveOverrides(element, 'phone', width, height),
      })
      cursor += height + (FORM_TYPES.has(element.type) ? 14 : 16)
    }

    if (sectionId) {
      const bounds = sectionBounds.get(sectionId)
      bounds.end = Math.max(bounds.end, cursor + 18)
    }
  })

  sections.forEach(section => {
    const bounds = sectionBounds.get(section.id)
    if (bounds) {
      phoneLayouts.set(section.id, {
        x: 0,
        y: bounds.start,
        width: phoneWidth,
        height: Math.max(60, bounds.end - bounds.start),
      })
      return
    }

    const box = boxes.get(section.id)
    phoneLayouts.set(section.id, {
      x: 0,
      y: Math.round(box.y * 0.6),
      width: phoneWidth,
      height: Math.max(60, Math.round(box.height * 0.6)),
    })
  })

  return elements.map(el => {
    if (el.breakpoints?.tablet || el.breakpoints?.phone) return el

    const deskX = el.x ?? 0
    const deskY = el.y ?? 0
    const deskW = el.width ?? 200
    const deskH = el.height ?? 100

    // Tablet: proportional scale, clamp inside canvas.
    let tabX = Math.round(deskX * tabletScale)
    let tabW = Math.round(deskW * tabletScale)
    if (tabX + tabW > tabletWidth) tabW = Math.max(40, tabletWidth - tabX)
    if (tabX < 0) tabX = 0
    const tabletHeight = TEXT_TYPES.has(el.type)
      ? Math.max(deskH, estimateTextHeight(el, tabW, getScaledFontSize(el, 'tablet') || el.fontSize || 16))
      : deskH
    const phoneLayout = phoneLayouts.get(el.id) ?? { x: phoneMargin, y: deskY, width: phoneInner, height: getPhoneItemHeight(el, phoneInner) }

    return {
      ...el,
      breakpoints: {
        ...(el.breakpoints ?? {}),
        tablet: { x: tabX, y: deskY, width: tabW, height: tabletHeight, ...responsiveOverrides(el, 'tablet', tabW, tabletHeight) },
        phone:  phoneLayout,
        custom: { x: tabX, y: deskY, width: tabW, height: tabletHeight, ...responsiveOverrides(el, 'tablet', tabW, tabletHeight) },
      },
    }
  })
}

