export const CSS_LENGTH_UNITS = ['px', '%', 'rem']
export const DEFAULT_MIN_WIDTH = 40
export const DEFAULT_MIN_HEIGHT = 20
export const GRID_SIZE = 8  // For snapping

export function normalizeCssLength(value, fallback = '0px', { allowAuto = false } = {}) {
  const text = String(value ?? '').trim()
  if (!text) return fallback
  if (allowAuto && text.toLowerCase() === 'auto') return 'auto'
  if (/^-?\d*\.?\d+(px|%|rem)$/i.test(text)) return text.toLowerCase()
  if (/^-?\d*\.?\d+$/.test(text)) return `${text}px`
  return fallback
}

export function isCompleteCssLength(value, allowAuto = false) {
  const text = String(value ?? '').trim()
  return (
    /^-?\d*\.?\d+(px|%|rem)?$/i.test(text) ||
    (allowAuto && text.toLowerCase() === 'auto')
  )
}

export function cssLengthToNumber(value, fallback = 0) {
  const normalized = normalizeCssLength(value, `${fallback}px`)
  if (normalized === 'auto') return fallback
  if (!normalized.endsWith('px')) return fallback
  const number = Number.parseFloat(normalized)
  return Number.isFinite(number) ? number : fallback
}

/**
 * Calculate bounding box including all spacing (padding + margin)
 */
export function calculateBoundingBox(element, includeMargin = true) {
  const margin = {
    top: cssLengthToNumber(element.marginTop ?? element.breakpoints?.desktop?.marginTop),
    right: cssLengthToNumber(element.marginRight ?? element.breakpoints?.desktop?.marginRight),
    bottom: cssLengthToNumber(element.marginBottom ?? element.breakpoints?.desktop?.marginBottom),
    left: cssLengthToNumber(element.marginLeft ?? element.breakpoints?.desktop?.marginLeft),
  }

  const padding = {
    top: cssLengthToNumber(element.paddingTop ?? element.breakpoints?.desktop?.paddingTop),
    right: cssLengthToNumber(element.paddingRight ?? element.breakpoints?.desktop?.paddingRight),
    bottom: cssLengthToNumber(element.paddingBottom ?? element.breakpoints?.desktop?.paddingBottom),
    left: cssLengthToNumber(element.paddingLeft ?? element.breakpoints?.desktop?.paddingLeft),
  }

  const x = (element.x ?? 0) - (includeMargin ? margin.left : 0)
  const y = (element.y ?? 0) - (includeMargin ? margin.top : 0)
  const width = (element.width ?? 200) + (includeMargin ? margin.left + margin.right : 0) + padding.left + padding.right
  const height = (element.height ?? 100) + (includeMargin ? margin.top + margin.bottom : 0) + padding.top + padding.bottom

  return { x, y, width, height, margin, padding }
}

/**
 * Calculate content box (inside padding)
 */
export function calculateContentBox(element) {
  const padding = {
    top: cssLengthToNumber(element.paddingTop ?? element.breakpoints?.desktop?.paddingTop),
    right: cssLengthToNumber(element.paddingRight ?? element.breakpoints?.desktop?.paddingRight),
    bottom: cssLengthToNumber(element.paddingBottom ?? element.breakpoints?.desktop?.paddingBottom),
    left: cssLengthToNumber(element.paddingLeft ?? element.breakpoints?.desktop?.paddingLeft),
  }

  return {
    x: (element.x ?? 0) + padding.left,
    y: (element.y ?? 0) + padding.top,
    width: Math.max(0, (element.width ?? 200) - padding.left - padding.right),
    height: Math.max(0, (element.height ?? 100) - padding.top - padding.bottom),
    padding,
  }
}

/**
 * Validate and constrain dimensions
 */
export function constrainDimensions(width, height, minWidth = DEFAULT_MIN_WIDTH, minHeight = DEFAULT_MIN_HEIGHT) {
  return {
    width: Math.max(minWidth, width),
    height: Math.max(minHeight, height),
  }
}

/**
 * Snap value to grid
 */
export function snapToGrid(value, gridSize = GRID_SIZE) {
  return Math.round(value / gridSize) * gridSize
}

/**
 * Check if value is within tolerance of target
 */
export function isWithinTolerance(value, target, tolerance = 2) {
  return Math.abs(value - target) <= tolerance
}

/**
 * Get spacing direction from handle ID
 */
export function getResizeDirection(handleId) {
  const directions = {
    n: { vertical: -1, horizontal: 0 },
    s: { vertical: 1, horizontal: 0 },
    e: { vertical: 0, horizontal: 1 },
    w: { vertical: 0, horizontal: -1 },
    nw: { vertical: -1, horizontal: -1 },
    ne: { vertical: -1, horizontal: 1 },
    sw: { vertical: 1, horizontal: -1 },
    se: { vertical: 1, horizontal: 1 },
  }
  return directions[handleId] ?? { vertical: 0, horizontal: 0 }
}

/**
 * Calculate optimal size respecting aspect ratio
 */
export function calculateResizeWithAspectRatio(
  newWidth,
  newHeight,
  originalWidth,
  originalHeight,
  direction,
  maintainAspect = false
) {
  if (!maintainAspect) {
    return { width: newWidth, height: newHeight }
  }

  const aspectRatio = originalWidth / originalHeight

  // For corner drags, adjust height based on width
  if (direction.vertical !== 0 && direction.horizontal !== 0) {
    return { width: newWidth, height: newWidth / aspectRatio }
  }

  // For horizontal drags, keep aspect ratio
  if (direction.horizontal !== 0) {
    return { width: newWidth, height: newWidth / aspectRatio }
  }

  // For vertical drags, keep aspect ratio
  if (direction.vertical !== 0) {
    return { width: newHeight * aspectRatio, height: newHeight }
  }

  return { width: newWidth, height: newHeight }
}
