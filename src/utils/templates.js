import { applySmartResponsive } from './responsive'

import {
  techSummitElements,
  isTechSummitTemplate,
  applyTechSummitTheme,
  getTechSummitCanvasFill,
} from '../templates/TechSummitTemplate'

import {
  artDecoElements,
  isArtDecoTemplate,
  applyArtDecoTheme,
  getArtDecoCanvasFill,
} from '../templates/ArtDecoTemplate'

import {
  boldSummitElements,
  isBoldSummitTemplate,
  applyBoldSummitTheme,
  getBoldSummitCanvasFill,
} from '../templates/BoldSummitTemplate'

import {
  neuSummitElements,
  isNeuSummitTemplate,
  applyNeuSummitTheme,
  getNeuSummitCanvasFill,
} from '../templates/NeuSummitTemplate'

import {
  playfulGeometricElements,
  isPlayfulGeometricTemplate,
  applyPlayfulGeometricTheme,
  getPlayfulGeometricCanvasFill,
} from '../templates/PlayfulGeometricTemplate'

import {
  vaporWaveFestElements,
  isVaporWaveFestTemplate,
  applyVaporWaveFestTheme,
  getVaporWaveFestCanvasFill,
} from '../templates/VaporWaveFestTemplate'

import {
  minimalistMonochromeElements,
  isMinimalistMonochromeTemplate,
  applyMinimalistMonochromeTheme,
  getMinimalistMonochromeCanvasFill,
} from '../templates/MinimalistMonochromeTemplate'

import {
  flatDesignElements,
  isFlatDesignTemplate,
  applyFlatDesignTheme,
  getFlatDesignCanvasFill,
} from '../templates/FlatDesignTemplate'

import {
  botanicalOrganicElements,
  isBotanicalOrganicTemplate,
  applyBotanicalOrganicTheme,
  getBotanicalOrganicCanvasFill,
} from '../templates/BotanicalOrganicTemplate'

// ─────────────────────────────────────────────────────────────────────────────

const withResponsive = (elements, width = 1200) =>
  applySmartResponsive(elements, width)

// ─────────────────────────────────────────────────────────────────────────────
// Detection helpers
// ─────────────────────────────────────────────────────────────────────────────

export function isTechSummitTemplate2(elements = []) { return false }

export function isAnyTechSummitTemplate(elements = []) {
  return isTechSummitTemplate(elements) || isTechSummitTemplate2(elements)
}

export function isAnyTemplate(elements = []) {
  return (
    isTechSummitTemplate(elements)           ||
    isBoldSummitTemplate(elements)           ||
    isArtDecoTemplate(elements)              ||
    isNeuSummitTemplate(elements)            ||
    isPlayfulGeometricTemplate(elements)     ||
    isVaporWaveFestTemplate(elements)        ||
    isMinimalistMonochromeTemplate(elements) ||
    isFlatDesignTemplate(elements)           ||
    isBotanicalOrganicTemplate(elements)
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// applyThemeToTemplate
// ─────────────────────────────────────────────────────────────────────────────

const THEME_COLOR_KEYS = ['fill', 'textColor', 'borderColor', 'shadowColor']

function syncThemeColorsToBreakpoints(themedElements = []) {
  return themedElements.map(element => {
    const themedColors = THEME_COLOR_KEYS.reduce((acc, key) => {
      if (element[key] !== undefined) acc[key] = element[key]
      return acc
    }, {})

    if (Object.keys(themedColors).length === 0) return element

    return ['desktop', 'tablet', 'phone', 'custom'].reduce((next, breakpoint) => {
      if (!next[breakpoint] || typeof next[breakpoint] !== 'object') return next
      return {
        ...next,
        [breakpoint]: {
          ...next[breakpoint],
          ...themedColors,
        },
      }
    }, element)
  })
}

export function applyThemeToTemplate(elements = [], theme = 'dark') {
  if (isTechSummitTemplate(elements))           return syncThemeColorsToBreakpoints(applyTechSummitTheme(elements, theme))
  if (isBoldSummitTemplate(elements))           return syncThemeColorsToBreakpoints(applyBoldSummitTheme(elements, theme))
  if (isArtDecoTemplate(elements))              return syncThemeColorsToBreakpoints(applyArtDecoTheme(elements, theme))
  if (isNeuSummitTemplate(elements))            return syncThemeColorsToBreakpoints(applyNeuSummitTheme(elements, theme))
  if (isPlayfulGeometricTemplate(elements))     return syncThemeColorsToBreakpoints(applyPlayfulGeometricTheme(elements, theme))
  if (isVaporWaveFestTemplate(elements))        return syncThemeColorsToBreakpoints(applyVaporWaveFestTheme(elements, theme))
  if (isMinimalistMonochromeTemplate(elements)) return syncThemeColorsToBreakpoints(applyMinimalistMonochromeTheme(elements, theme))
  if (isFlatDesignTemplate(elements))           return syncThemeColorsToBreakpoints(applyFlatDesignTheme(elements, theme))
  if (isBotanicalOrganicTemplate(elements))     return syncThemeColorsToBreakpoints(applyBotanicalOrganicTheme(elements, theme))
  return elements
}

// ─────────────────────────────────────────────────────────────────────────────
// getCanvasFillByTemplate
// ─────────────────────────────────────────────────────────────────────────────

export function getCanvasFillByTemplate(elements = [], theme = 'dark') {
  if (isTechSummitTemplate(elements))           return getTechSummitCanvasFill(theme)
  if (isBoldSummitTemplate(elements))           return getBoldSummitCanvasFill(theme)
  if (isArtDecoTemplate(elements))              return getArtDecoCanvasFill(theme)
  if (isNeuSummitTemplate(elements))            return getNeuSummitCanvasFill(theme)
  if (isPlayfulGeometricTemplate(elements))     return getPlayfulGeometricCanvasFill(theme)
  if (isVaporWaveFestTemplate(elements))        return getVaporWaveFestCanvasFill(theme)
  if (isMinimalistMonochromeTemplate(elements)) return getMinimalistMonochromeCanvasFill(theme)
  if (isFlatDesignTemplate(elements))           return getFlatDesignCanvasFill(theme)
  if (isBotanicalOrganicTemplate(elements))     return getBotanicalOrganicCanvasFill(theme)
  return theme === 'dark' ? '#000000' : '#ffffff'
}

// ─────────────────────────────────────────────────────────────────────────────
// Re-exports
// ─────────────────────────────────────────────────────────────────────────────

export { isTechSummitTemplate,           applyTechSummitTheme,           getTechSummitCanvasFill           }
export { isArtDecoTemplate,              applyArtDecoTheme,              getArtDecoCanvasFill              }
export { isBoldSummitTemplate,           applyBoldSummitTheme,           getBoldSummitCanvasFill           }
export { isNeuSummitTemplate,            applyNeuSummitTheme,            getNeuSummitCanvasFill            }
export { isPlayfulGeometricTemplate,     applyPlayfulGeometricTheme,     getPlayfulGeometricCanvasFill     }
export { isVaporWaveFestTemplate,        applyVaporWaveFestTheme,        getVaporWaveFestCanvasFill        }
export { isMinimalistMonochromeTemplate, applyMinimalistMonochromeTheme, getMinimalistMonochromeCanvasFill }
export { isFlatDesignTemplate,           applyFlatDesignTheme,           getFlatDesignCanvasFill           }
export { isBotanicalOrganicTemplate,     applyBotanicalOrganicTheme,     getBotanicalOrganicCanvasFill     }

// ─────────────────────────────────────────────────────────────────────────────
// TEMPLATES
// ─────────────────────────────────────────────────────────────────────────────

export const TEMPLATES = {

  blank: {
    name: 'Blank',
    description: 'Start from scratch',
    elements: [],
    canvasSettings: { width: 1200, height: 900, x: 0, y: 0, fill: '#ffffff' },
  },

  // techSummitElements is already light-mode (toLightThemeTS applied at export)
  // defaultTheme: 'light' so Builder loads it white, toggle switches to dark
  techSummitTemplate1: {
    name: 'TechSummit – Conference',
    description: 'Editable tech conference landing page',
    elements: techSummitElements,
    canvasSettings: {
      width:  1200,
      height: techSummitElements.canvasHeight || 2480,
      x: 0,
      y: 0,
      fill: '#F8FAFF',   // ← light bg, matches LIGHT.bg
    },
    supportsTheme: true,
    defaultTheme:  'light',
    themeApplyFn:  applyTechSummitTheme,
    canvasFillFn:  getTechSummitCanvasFill,
  },

  artDecoGala: {
    name: 'Gatsby Gala – Art Deco',
    description: "Luxury New Year's Eve gala event landing page",
    elements: artDecoElements,   // ← remove withResponsive() wrapper, already applied inside ArtDecoTemplate.js
    canvasSettings: { width: 1200, height: 2820, x: 0, y: 0, fill: '#FAF7EF' },
    supportsTheme: true,
    defaultTheme:  'light',
    themeApplyFn:  applyArtDecoTheme,
    canvasFillFn:  getArtDecoCanvasFill,
  },

  boldSummitTemplate: {
    name: 'DesignConf – Bold Typography',
    description: 'Editorial design conference landing page',
    elements: withResponsive(boldSummitElements),
    canvasSettings: { width: 1200, height: 3952, x: 0, y: 0, fill: '#FAFAFA' },
    supportsTheme: true,
    defaultTheme:  'light',
    themeApplyFn:  applyBoldSummitTheme,
    canvasFillFn:  getBoldSummitCanvasFill,
  },

  neuSummitTemplate: {
    name: 'NeuSummit – Soft UI Design Conference',
    description: 'Premium neumorphic design-systems conference landing page',
    elements: withResponsive(neuSummitElements),
    canvasSettings: { width: 1200, height: 4480, x: 0, y: 0, fill: '#E0E5EC' },
    supportsTheme: true,
    defaultTheme:  'light',
    themeApplyFn:  applyNeuSummitTheme,
    canvasFillFn:  getNeuSummitCanvasFill,
  },

  playfulGeometricTemplate: {
    name: 'PixelFest – Playful Geometric',
    description: 'Design & creative tech festival landing page',
    elements: withResponsive(playfulGeometricElements),
    canvasSettings: { width: 1200, height: 4660, x: 0, y: 0, fill: '#FFFDF5' },
    supportsTheme: true,
    defaultTheme:  'light',
    themeApplyFn:  applyPlayfulGeometricTheme,
    canvasFillFn:  getPlayfulGeometricCanvasFill,
  },

  vaporWaveFestTemplate: {
    name: 'Neon Fest – Vaporwave',
    description: 'Synthwave & retrowave music festival landing page',
    elements: withResponsive(vaporWaveFestElements),
    canvasSettings: { width: 1200, height: 3872, x: 0, y: 0, fill: '#090014' },
    supportsTheme: true,
    defaultTheme:  'dark',
    themeApplyFn:  applyVaporWaveFestTheme,
    canvasFillFn:  getVaporWaveFestCanvasFill,
  },

  minimalistMonochromeTemplate: {
    name: 'FORMA – Minimalist Monochrome',
    description: 'High-end editorial design conference landing page',
    elements: withResponsive(minimalistMonochromeElements),
    canvasSettings: { width: 1200, height: 4114, x: 0, y: 0, fill: '#FFFFFF' },
    supportsTheme: true,
    defaultTheme:  'light',
    themeApplyFn:  applyMinimalistMonochromeTheme,
    canvasFillFn:  getMinimalistMonochromeCanvasFill,
  },

  flatDesignTemplate: {
    name: 'LaunchPad – Flat Design',
    description: 'Bold SaaS product landing page — zero shadows, pure colour',
    elements: withResponsive(flatDesignElements),
    canvasSettings: { width: 1200, height: 3622, x: 0, y: 0, fill: '#FFFFFF' },
    supportsTheme: true,
    defaultTheme:  'light',
    themeApplyFn:  applyFlatDesignTheme,
    canvasFillFn:  getFlatDesignCanvasFill,
  },

  botanicalOrganicTemplate: {
    name: 'Verdana – Botanical Organic',
    description: 'Earthy wellness & spa brand — serif type, organic shapes',
    elements: withResponsive(botanicalOrganicElements),
    canvasSettings: { width: 1200, height: 3980, x: 0, y: 0, fill: '#F9F8F4' },
    supportsTheme: true,
    defaultTheme:  'light',
    themeApplyFn:  applyBotanicalOrganicTheme,
    canvasFillFn:  getBotanicalOrganicCanvasFill,
  },

}
