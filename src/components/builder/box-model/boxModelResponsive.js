/**
 * Responsive Layout Utilities
 * Validates responsive layouts work correctly across breakpoints
 */

import { getElementLayout } from '../../../utils/responsive'
import { cssLengthToNumber } from './boxModelUtils'

/**
 * Validate element layout for responsive design
 */
export function validateResponsiveLayout(element, breakpoints = ['desktop', 'tablet', 'phone']) {
  const validations = {
    element: element.id,
    breakpoints: {},
    issues: [],
  }

  for (const breakpoint of breakpoints) {
    const layout = getElementLayout(element, breakpoint)
    
    const breakpointValidation = {
      breakpoint,
      layout,
      isValid: true,
      warnings: [],
    }

    // Validate dimensions
    if (!layout.width || layout.width < 20) {
      breakpointValidation.warnings.push('Width is less than 20px')
      breakpointValidation.isValid = false
    }

    if (!layout.height || layout.height < 20) {
      breakpointValidation.warnings.push('Height is less than 20px')
      breakpointValidation.isValid = false
    }

    // Validate position
    if (layout.x < 0) {
      breakpointValidation.warnings.push('Element extends beyond left canvas boundary')
      breakpointValidation.isValid = false
    }

    if (layout.y < 0) {
      breakpointValidation.warnings.push('Element extends beyond top canvas boundary')
      breakpointValidation.isValid = false
    }

    validations.breakpoints[breakpoint] = breakpointValidation
    
    if (!breakpointValidation.isValid) {
      validations.issues.push(...breakpointValidation.warnings.map(w => `${breakpoint}: ${w}`))
    }
  }

  return validations
}

/**
 * Check if layout is responsive (has breakpoint overrides)
 */
export function isResponsiveLayout(element) {
  const breakpoints = element.breakpoints || {}
  return Object.keys(breakpoints).length > 0
}

/**
 * Get layout changes needed for responsive design
 */
export function getResponsiveLayoutSuggestions(element, parentWidth, breakpoints = ['desktop', 'tablet', 'phone']) {
  const suggestions = []

  // Check if element should be responsive
  if (element.width > parentWidth * 0.8) {
    suggestions.push({
      type: 'layout',
      severity: 'warning',
      message: 'Element is very wide relative to parent',
      suggestion: 'Consider reducing width or making it responsive for smaller screens',
    })
  }

  // Check padding/margin overflow
  const margin = {
    top: cssLengthToNumber(element.marginTop),
    right: cssLengthToNumber(element.marginRight),
    bottom: cssLengthToNumber(element.marginBottom),
    left: cssLengthToNumber(element.marginLeft),
  }

  if (margin.left + margin.right > parentWidth * 0.5) {
    suggestions.push({
      type: 'spacing',
      severity: 'warning',
      message: 'Margin is taking up too much space',
      suggestion: 'Reduce margin for better layout on smaller screens',
    })
  }

  return suggestions
}

/**
 * Calculate responsive scale factor
 */
export function getResponsiveScaleFactor(baseWidth, targetWidth) {
  if (baseWidth <= 0) return 1
  return Math.min(1, Math.max(0.5, targetWidth / baseWidth))
}

/**
 * Apply responsive scale to dimensions
 */
export function applyResponsiveScale(element, scaleFactor) {
  return {
    ...element,
    width: Math.round((element.width || 200) * scaleFactor),
    height: Math.round((element.height || 100) * scaleFactor),
    x: Math.round((element.x || 0) * scaleFactor),
    y: Math.round((element.y || 0) * scaleFactor),
  }
}

/**
 * Get layout compatibility between breakpoints
 */
export function checkLayoutCompatibility(element, fromBreakpoint, toBreakpoint) {
  const fromLayout = getElementLayout(element, fromBreakpoint)
  const toLayout = getElementLayout(element, toBreakpoint)

  const widthChange = Math.abs(fromLayout.width - toLayout.width)
  const heightChange = Math.abs(fromLayout.height - toLayout.height)
  const xChange = Math.abs(fromLayout.x - toLayout.x)
  const yChange = Math.abs(fromLayout.y - toLayout.y)

  const totalChange = widthChange + heightChange + xChange + yChange

  return {
    compatible: totalChange < 200, // Threshold for "too different"
    changes: { widthChange, heightChange, xChange, yChange },
    totalChange,
    recommendation: totalChange > 200 ? 'Layout changes significantly between breakpoints' : 'Layout is compatible',
  }
}

/**
 * Generate responsive layout preset based on content
 */
export function generateResponsivePreset(baseLayout, targetBreakpoint) {
  const presets = {
    tablet: {
      scale: 0.85,
      marginAdjustment: 0.8,
    },
    phone: {
      scale: 0.6,
      marginAdjustment: 0.6,
    },
  }

  const preset = presets[targetBreakpoint] || { scale: 1, marginAdjustment: 1 }

  return {
    width: Math.round(baseLayout.width * preset.scale),
    height: Math.round(baseLayout.height * preset.scale),
    x: Math.round(baseLayout.x * preset.scale),
    y: Math.round(baseLayout.y * preset.scale),
  }
}
