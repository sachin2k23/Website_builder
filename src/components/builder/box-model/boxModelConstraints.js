/**
 * Box Model Constraints & Overflow Handling
 * Provides resize stability, constraint checking, and overflow detection
 */

import { cssLengthToNumber, snapToGrid, GRID_SIZE, DEFAULT_MIN_WIDTH, DEFAULT_MIN_HEIGHT } from './boxModelUtils'

/**
 * Check if element overflows parent container
 */
export function checkOverflow(element, parent, tolerance = 0) {
  const elemBox = {
    x: element.x ?? 0,
    y: element.y ?? 0,
    right: (element.x ?? 0) + (element.width ?? 200),
    bottom: (element.y ?? 0) + (element.height ?? 100),
  }

  const parentBox = {
    x: parent.x ?? 0,
    y: parent.y ?? 0,
    right: (parent.x ?? 0) + (parent.width ?? 1200),
    bottom: (parent.y ?? 0) + (parent.height ?? 900),
  }

  return {
    overflowLeft: elemBox.x < parentBox.x - tolerance,
    overflowTop: elemBox.y < parentBox.y - tolerance,
    overflowRight: elemBox.right > parentBox.right + tolerance,
    overflowBottom: elemBox.bottom > parentBox.bottom + tolerance,
  }
}

/**
 * Get overflow handling strategy
 */
export function getOverflowStrategy(element) {
  return element.overflowX || 'visible' // 'visible', 'hidden', 'scroll', 'auto'
}

/**
 * Calculate stable resize with constraints
 */
export function calculateStableResize(
  startPos,
  currentPos,
  startDimensions,
  direction,
  constraints = {}
) {
  const {
    minWidth = DEFAULT_MIN_WIDTH,
    minHeight = DEFAULT_MIN_HEIGHT,
    maxWidth = Infinity,
    maxHeight = Infinity,
    snapToGrid: enableSnap = true,
    gridSize = GRID_SIZE,
    maintainAspect = false,
  } = constraints

  const dx = currentPos.x - startPos.x
  const dy = currentPos.y - startPos.y

  let newX = startDimensions.x
  let newY = startDimensions.y
  let newWidth = startDimensions.width
  let newHeight = startDimensions.height

  // Calculate new dimensions based on direction
  if (direction.includes('e')) {
    newWidth = startDimensions.width + dx
  }
  if (direction.includes('w')) {
    newWidth = startDimensions.width - dx
    newX = startDimensions.x + dx
  }
  if (direction.includes('s')) {
    newHeight = startDimensions.height + dy
  }
  if (direction.includes('n')) {
    newHeight = startDimensions.height - dy
    newY = startDimensions.y + dy
  }

  // Apply constraints
  newWidth = Math.max(minWidth, Math.min(maxWidth, newWidth))
  newHeight = Math.max(minHeight, Math.min(maxHeight, newHeight))

  // Handle aspect ratio if needed
  if (maintainAspect) {
    const aspectRatio = startDimensions.width / startDimensions.height
    if (direction.includes('e') || direction.includes('w')) {
      newHeight = newWidth / aspectRatio
    } else {
      newWidth = newHeight * aspectRatio
    }
  }

  // Apply snapping
  if (enableSnap) {
    newX = snapToGrid(newX, gridSize)
    newY = snapToGrid(newY, gridSize)
    newWidth = snapToGrid(newWidth, gridSize)
    newHeight = snapToGrid(newHeight, gridSize)
  }

  return { x: newX, y: newY, width: newWidth, height: newHeight }
}

/**
 * Clamp element to canvas bounds
 */
export function clampToCanvasBounds(element, canvasWidth, canvasHeight) {
  const margin = {
    top: cssLengthToNumber(element.marginTop ?? 0),
    right: cssLengthToNumber(element.marginRight ?? 0),
    bottom: cssLengthToNumber(element.marginBottom ?? 0),
    left: cssLengthToNumber(element.marginLeft ?? 0),
  }

  const x = Math.max(
    0,
    Math.min(element.x ?? 0, canvasWidth - (element.width ?? 200) - margin.right)
  )

  const y = Math.max(
    0,
    Math.min(element.y ?? 0, canvasHeight - (element.height ?? 100) - margin.bottom)
  )

  return {
    x: Math.round(x),
    y: Math.round(y),
    width: element.width ?? 200,
    height: element.height ?? 100,
  }
}

/**
 * Check if resize is stable (no jumping/flickering)
 */
export function isStableResize(prevDimensions, nextDimensions, tolerance = 0.1) {
  const getDelta = (prev, next) => Math.abs(prev - next)
  
  return (
    getDelta(prevDimensions.x, nextDimensions.x) >= tolerance ||
    getDelta(prevDimensions.y, nextDimensions.y) >= tolerance ||
    getDelta(prevDimensions.width, nextDimensions.width) >= tolerance ||
    getDelta(prevDimensions.height, nextDimensions.height) >= tolerance
  )
}

/**
 * Get nested element constraints
 */
export function getNestedConstraints(element, parentElement) {
  const parentPadding = {
    top: cssLengthToNumber(parentElement.paddingTop ?? 0),
    right: cssLengthToNumber(parentElement.paddingRight ?? 0),
    bottom: cssLengthToNumber(parentElement.paddingBottom ?? 0),
    left: cssLengthToNumber(parentElement.paddingLeft ?? 0),
  }

  const parentContentBox = {
    x: (parentElement.x ?? 0) + parentPadding.left,
    y: (parentElement.y ?? 0) + parentPadding.top,
    width: Math.max(0, (parentElement.width ?? 200) - parentPadding.left - parentPadding.right),
    height: Math.max(0, (parentElement.height ?? 100) - parentPadding.top - parentPadding.bottom),
  }

  return {
    maxWidth: Math.max(DEFAULT_MIN_WIDTH, parentContentBox.width),
    maxHeight: Math.max(DEFAULT_MIN_HEIGHT, parentContentBox.height),
    constrainedX: (element.x ?? 0) - parentContentBox.x,
    constrainedY: (element.y ?? 0) - parentContentBox.y,
  }
}

/**
 * Calculate responsive layout for breakpoint
 */
export function calculateResponsiveLayout(element, breakpoint = 'desktop') {
  const baseLayout = {
    x: element.x ?? 0,
    y: element.y ?? 0,
    width: element.width ?? 200,
    height: element.height ?? 100,
  }

  if (breakpoint === 'desktop') {
    return baseLayout
  }

  const breakpointLayout = element.breakpoints?.[breakpoint]
  if (!breakpointLayout) {
    return baseLayout
  }

  return {
    x: breakpointLayout.x ?? baseLayout.x,
    y: breakpointLayout.y ?? baseLayout.y,
    width: breakpointLayout.width ?? baseLayout.width,
    height: breakpointLayout.height ?? baseLayout.height,
  }
}

/**
 * Validate spacing values
 */
export function validateSpacing(value, maxValue = 500) {
  const numValue = cssLengthToNumber(value, 0)
  return Math.max(0, Math.min(maxValue, numValue))
}

/**
 * Get spacing offset for element with padding/margin
 */
export function getSpacingOffset(element) {
  const margin = {
    top: cssLengthToNumber(element.marginTop ?? 0),
    right: cssLengthToNumber(element.marginRight ?? 0),
    bottom: cssLengthToNumber(element.marginBottom ?? 0),
    left: cssLengthToNumber(element.marginLeft ?? 0),
  }

  const padding = {
    top: cssLengthToNumber(element.paddingTop ?? 0),
    right: cssLengthToNumber(element.paddingRight ?? 0),
    bottom: cssLengthToNumber(element.paddingBottom ?? 0),
    left: cssLengthToNumber(element.paddingLeft ?? 0),
  }

  return {
    margin,
    padding,
    totalOffsetX: margin.left + margin.right + padding.left + padding.right,
    totalOffsetY: margin.top + margin.bottom + padding.top + padding.bottom,
  }
}
