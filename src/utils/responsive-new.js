/**
 * responsive.js
 *
 * Independent responsive editing system.
 *
 * Each element maintains completely independent property sets for:
 * - desktop: Full desktop layout and styling
 * - tablet: Full tablet layout and styling  
 * - phone: Full mobile layout and styling
 *
 * No fallback/cascading — each breakpoint is self-contained.
 * Changes in one breakpoint do not affect other breakpoints.
 */

export const BREAKPOINTS = [
  { id: 'desktop', label: 'Desktop', width: 1200 },
  { id: 'tablet',  label: 'Tablet',  width: 768  },
  { id: 'phone',   label: 'Phone',   width: 390  },
  { id: 'custom',  label: 'Custom',  width: null  },
]

/**
 * Get canvas width for a breakpoint
 */
export function getCanvasWidth(breakpointId, canvasSettings, customWidth = 800) {
  switch (breakpointId) {
    case 'desktop': return canvasSettings?.width || 1200
    case 'tablet':  return 768
    case 'phone':   return 390
    case 'custom':  return customWidth
    default:        return canvasSettings?.width || 1200
  }
}

/**
 * Migrate element from old format to new independent format
 * Old: desktop props on root + breakpoints.tablet/phone overrides
 * New: desktop/tablet/phone are all independent with complete props
 */
export function migrateElementToIndependent(element) {
  // Already migrated
  if (element.desktop !== undefined) {
    return element
  }

  // Extract base (desktop) properties
  const baseProps = {
    x: element.x ?? 0,
    y: element.y ?? 0,
    width: element.width ?? 200,
    height: element.height ?? 100,
    fill: element.fill ?? '#ffffff',
    borderColor: element.borderColor ?? null,
    borderWidth: element.borderWidth ?? 0,
    shadowColor: element.shadowColor ?? null,
    shadowBlur: element.shadowBlur ?? 0,
    shadowX: element.shadowX ?? 0,
    shadowY: element.shadowY ?? 0,
    shadowSpread: element.shadowSpread ?? 0,
    radius: element.radius ?? 0,
    opacity: element.opacity ?? 100,
    textColor: element.textColor ?? '#111827',
    fontSize: element.fontSize ?? 16,
    fontWeight: element.fontWeight ?? 'normal',
    lineHeight: element.lineHeight ?? 1.5,
    letterSpacing: element.letterSpacing ?? 0,
    textAlign: element.textAlign ?? 'left',
    paddingTop: element.paddingTop ?? 0,
    paddingRight: element.paddingRight ?? 0,
    paddingBottom: element.paddingBottom ?? 0,
    paddingLeft: element.paddingLeft ?? 0,
    marginTop: element.marginTop ?? 0,
    marginRight: element.marginRight ?? 0,
    marginBottom: element.marginBottom ?? 0,
    marginLeft: element.marginLeft ?? 0,
    hidden: element.hidden ?? false,
    cursor: element.cursor ?? 'default',
  }

  // Get old breakpoint overrides
  const oldTablet = element.breakpoints?.tablet || {}
  const oldPhone = element.breakpoints?.phone || {}
  const oldCustom = element.breakpoints?.custom || {}

  // Create independent tablet props (merge old override with base)
  const tabletProps = { ...baseProps, ...oldTablet }

  // Create independent phone props (merge old overrides with base)
  const phoneProps = { ...baseProps, ...oldPhone }

  // Create independent custom props (merge old override with base)
  const customProps = { ...baseProps, ...oldCustom }

  return {
    ...element,
    // New independent structure
    desktop: baseProps,
    tablet: tabletProps,
    phone: phoneProps,
    custom: customProps,
    // Remove old format
    x: undefined,
    y: undefined,
    width: undefined,
    height: undefined,
    breakpoints: undefined,
  }
}

/**
 * Get complete element properties for a specific breakpoint
 * Returns all properties (layout + styling) for that breakpoint
 */
export function getElementProperties(element, breakpointId) {
  // Migrate if needed
  const el = migrateElementToIndependent(element)

  const bpKey = breakpointId === 'custom' ? 'custom' : breakpointId
  const props = el[bpKey] || el.desktop

  return {
    // Layout
    x: props.x ?? 0,
    y: props.y ?? 0,
    width: props.width ?? 200,
    height: props.height ?? 100,
    // Styling
    fill: props.fill ?? '#ffffff',
    borderColor: props.borderColor ?? null,
    borderWidth: props.borderWidth ?? 0,
    shadowColor: props.shadowColor ?? null,
    shadowBlur: props.shadowBlur ?? 0,
    shadowX: props.shadowX ?? 0,
    shadowY: props.shadowY ?? 0,
    shadowSpread: props.shadowSpread ?? 0,
    radius: props.radius ?? 0,
    opacity: props.opacity ?? 100,
    textColor: props.textColor ?? '#111827',
    fontSize: props.fontSize ?? 16,
    fontWeight: props.fontWeight ?? 'normal',
    lineHeight: props.lineHeight ?? 1.5,
    letterSpacing: props.letterSpacing ?? 0,
    textAlign: props.textAlign ?? 'left',
    paddingTop: props.paddingTop ?? 0,
    paddingRight: props.paddingRight ?? 0,
    paddingBottom: props.paddingBottom ?? 0,
    paddingLeft: props.paddingLeft ?? 0,
    marginTop: props.marginTop ?? 0,
    marginRight: props.marginRight ?? 0,
    marginBottom: props.marginBottom ?? 0,
    marginLeft: props.marginLeft ?? 0,
    hidden: props.hidden ?? false,
    cursor: props.cursor ?? 'default',
  }
}

/**
 * Get layout (position + size) for a specific breakpoint
 */
export function getElementLayout(element, breakpointId) {
  const props = getElementProperties(element, breakpointId)
  return {
    x: props.x,
    y: props.y,
    width: props.width,
    height: props.height,
  }
}

/**
 * Set element properties for a specific breakpoint
 * ONLY updates that breakpoint, no other breakpoints are affected
 */
export function setElementLayout(element, breakpointId, changes) {
  const el = migrateElementToIndependent(element)
  const bpKey = breakpointId === 'custom' ? 'custom' : breakpointId

  return {
    ...el,
    [bpKey]: {
      ...el[bpKey],
      ...changes,
    },
  }
}

/**
 * Update element properties for a specific breakpoint
 */
export function updateElementProperties(element, breakpointId, changes) {
  return setElementLayout(element, breakpointId, changes)
}

/**
 * Get a specific property value for a breakpoint
 */
export function getResponsiveValue(element, breakpointId, key, fallback) {
  const props = getElementProperties(element, breakpointId)
  return props[key] ?? fallback
}

/**
 * Get font size for a breakpoint
 */
export function getResponsiveFontSize(element, breakpointId, fallback = 16) {
  return getResponsiveValue(element, breakpointId, 'fontSize', fallback)
}

/**
 * Generate complete initial breakpoint properties for a new element
 * Creates independent properties for desktop, tablet, and phone
 */
export function generateResponsiveDefaults(element, desktopCanvasWidth = 1200) {
  const deskX = element.x ?? 0
  const deskY = element.y ?? 0
  const deskW = element.width ?? 200
  const deskH = element.height ?? 100

  // Desktop properties (from element)
  const desktopProps = {
    x: deskX,
    y: deskY,
    width: deskW,
    height: deskH,
    fill: element.fill ?? '#ffffff',
    borderColor: element.borderColor ?? null,
    borderWidth: element.borderWidth ?? 0,
    shadowColor: element.shadowColor ?? null,
    shadowBlur: element.shadowBlur ?? 0,
    shadowX: element.shadowX ?? 0,
    shadowY: element.shadowY ?? 0,
    shadowSpread: element.shadowSpread ?? 0,
    radius: element.radius ?? 0,
    opacity: element.opacity ?? 100,
    textColor: element.textColor ?? '#111827',
    fontSize: element.fontSize ?? 16,
    fontWeight: element.fontWeight ?? 'normal',
    lineHeight: element.lineHeight ?? 1.5,
    letterSpacing: element.letterSpacing ?? 0,
    textAlign: element.textAlign ?? 'left',
    paddingTop: element.paddingTop ?? 0,
    paddingRight: element.paddingRight ?? 0,
    paddingBottom: element.paddingBottom ?? 0,
    paddingLeft: element.paddingLeft ?? 0,
    marginTop: element.marginTop ?? 0,
    marginRight: element.marginRight ?? 0,
    marginBottom: element.marginBottom ?? 0,
    marginLeft: element.marginLeft ?? 0,
    hidden: element.hidden ?? false,
    cursor: element.cursor ?? 'default',
  }

  // Tablet properties - scaled layout, adjusted typography
  const tabletScale = 768 / desktopCanvasWidth
  let tabX = Math.round(deskX * tabletScale)
  let tabW = Math.round(deskW * tabletScale)
  if (tabX + tabW > 768 - 16) tabW = Math.max(40, 768 - tabX - 16)
  if (tabX < 0) tabX = 0

  const tabletProps = {
    ...desktopProps,
    x: tabX,
    y: deskY,
    width: tabW,
    height: deskH,
    fontSize: Math.round((desktopProps.fontSize || 16) * 0.95), // Slightly smaller
  }

  // Phone properties - full width with margins, scaled typography
  const phoneW = deskW < 200 ? Math.min(deskW, 390 - 48) : 390 - 48

  const phoneProps = {
    ...desktopProps,
    x: 24,
    y: deskY,
    width: phoneW,
    height: deskH,
    fontSize: Math.round((desktopProps.fontSize || 16) * 0.85), // Smaller for mobile
  }

  // Return new independent format
  return {
    ...element,
    desktop: desktopProps,
    tablet: tabletProps,
    phone: phoneProps,
    custom: { ...tabletProps }, // Custom starts as tablet
    // Remove old format if present
    x: undefined,
    y: undefined,
    width: undefined,
    height: undefined,
    breakpoints: undefined,
  }
}

/**
 * Apply responsive defaults to all elements in tree
 * Only fills in missing breakpoints, doesn't override existing ones
 */
export function applyResponsiveDefaultsToTree(tree, desktopCanvasWidth = 1200) {
  return tree.map(el => {
    const migrated = migrateElementToIndependent(el)
    // If all breakpoints already exist, don't regenerate
    if (migrated.desktop && migrated.tablet && migrated.phone) {
      return migrated
    }
    return generateResponsiveDefaults(migrated, desktopCanvasWidth)
  })
}

/**
 * Apply smart responsive layout generation (deprecated - kept for compatibility)
 * Now just applies responsive defaults
 */
export function applySmartResponsive(tree, desktopCanvasWidth = 1200) {
  return applyResponsiveDefaultsToTree(tree, desktopCanvasWidth)
}

/**
 * Ensure element has all breakpoint properties initialized
 */
export function ensureAllBreakpoints(element, desktopCanvasWidth = 1200) {
  const el = migrateElementToIndependent(element)
  
  if (!el.desktop) {
    return generateResponsiveDefaults(element, desktopCanvasWidth)
  }

  if (!el.tablet) {
    const tabletScale = 768 / desktopCanvasWidth
    el.tablet = {
      ...el.desktop,
      x: Math.round((el.desktop.x ?? 0) * tabletScale),
      width: Math.round((el.desktop.width ?? 200) * tabletScale),
      fontSize: Math.round((el.desktop.fontSize ?? 16) * 0.95),
    }
  }

  if (!el.phone) {
    el.phone = {
      ...el.desktop,
      x: 24,
      width: Math.max(40, 390 - 48),
      fontSize: Math.round((el.desktop.fontSize ?? 16) * 0.85),
    }
  }

  if (!el.custom) {
    el.custom = { ...el.tablet }
  }

  return el
}
