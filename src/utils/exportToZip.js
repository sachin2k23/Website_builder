/**
 * exportToZip.js — with Mobile Navigation
 *
 * Changes from previous version:
 *  1. Imports buildMobileNavHTML / buildMobileNavStyles / buildMobileNavScript
 *     from mobileNavExport.js and injects them into the exported HTML/CSS.
 *  2. Accepts two new optional params:  navLinks, projectTheme
 *  3. Everything else unchanged.
 */

import { buildMobileNavHTML, buildMobileNavStyles, buildMobileNavScript } from './mobileNavExport.js'

// ─── Helpers ─────────────────────────────────────────────────────────────────

function camelToKebab(str) {
  return str.replace(/([A-Z])/g, m => `-${m.toLowerCase()}`)
}

function escapeHTML(str) {
  return String(str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function escapeAttr(str) {
  return String(str).replace(/"/g, '&quot;').replace(/'/g, '&#39;')
}

// ─── Read props from the correct breakpoint bucket ───────────────────────────

function getProps(el, breakpoint = 'desktop') {
  if (el.desktop !== undefined) {
    return el[breakpoint] || el.desktop
  }
  return el
}

// ─── Image extraction ─────────────────────────────────────────────────────────

function extractImageAsset(src, index) {
  if (!src) return null
  const match = src.match(/^data:([^;]+);base64,(.+)$/)
  if (!match) return null
  const [, mimeType, base64Data] = match
  const ext = mimeType.split('/')[1] || 'png'
  return { filename: `image-${index}.${ext}`, mimeType, base64Data }
}

// ─── Per-element HTML generation ─────────────────────────────────────────────

function elementToHTML(el, index) {
  const p = getProps(el, 'desktop')
  const id = `el-${el.id || index}`
  const opacity = ((p.opacity ?? 100) / 100)

  const baseInline = [
    p.borderColor ? `border: 1.5px solid ${p.borderColor}` : '',
    p.shadowColor ? `box-shadow: 0 4px 24px ${p.shadowColor}` : '',
    p.radius      ? `border-radius: ${p.radius}px` : '',
    opacity !== 1  ? `opacity: ${opacity}` : '',
  ].filter(Boolean).join('; ')

  switch (el.type) {
    case 'heading':
      return `<h2 class="${id}" style="${baseInline}" data-type="heading">${escapeHTML(p.content || el.content || 'Heading')}</h2>`
    case 'paragraph':
    case 'label':
      return `<p class="${id}" style="${baseInline}">${escapeHTML(p.content || el.content || '')}</p>`
    case 'link':
      return `<a href="${escapeAttr(el.href || '#')}" class="${id}" style="${baseInline}">${escapeHTML(p.content || el.content || 'Link')}</a>`
    case 'button':
      return `<button class="${id}" style="${baseInline}">${escapeHTML(p.content || el.content || 'Button')}</button>`
    case 'image':
      if (p.src || el.src) {
        return `<img src="${escapeAttr(p.src || el.src)}" alt="${escapeAttr(el.alt || '')}" class="${id}" style="${baseInline}" />`
      }
      return `<div class="${id} img-placeholder" style="${baseInline}">🖼</div>`
    case 'container':
    case 'section':
      return `<div class="${id}" style="${baseInline}"></div>`
    case 'divider':
      return `<hr class="${id}" style="${baseInline}" />`
    case 'input':
      return `<input type="text" placeholder="${escapeAttr(p.content || el.content || 'Enter text...')}" class="${id}" style="${baseInline}" />`
    case 'video':
      return `<div class="${id} video-placeholder" style="${baseInline}">▶</div>`
    default:
      return `<!-- unknown type: ${escapeHTML(el.type)} -->`
  }
}

// ─── CSS generation per element ───────────────────────────────────────────────

function elementToCSS(el, index) {
  const id = `el-${el.id || index}`
  const desktop = getProps(el, 'desktop')
  const tablet  = getProps(el, 'tablet')
  const phone   = getProps(el, 'phone')

  function propsToCSS(p) {
    const lines = []
    if (p.x       != null)  lines.push(`left: ${p.x}px`)
    if (p.y       != null)  lines.push(`top: ${p.y}px`)
    if (p.width   != null)  lines.push(`width: ${p.width}px`)
    if (p.height  != null)  lines.push(`height: ${p.height}px`)
    if (p.fill    != null)  lines.push(`background-color: ${p.fill}`)
    if (p.textColor != null) lines.push(`color: ${p.textColor}`)
    if (p.fontSize != null)  lines.push(`font-size: ${p.fontSize}px`)
    if (p.fontWeight != null) lines.push(`font-weight: ${p.fontWeight}`)
    if (p.fontFamily != null) lines.push(`font-family: '${p.fontFamily}', sans-serif`)
    if (p.lineHeight != null) lines.push(`line-height: ${p.lineHeight}`)
    if (p.letterSpacing != null) lines.push(`letter-spacing: ${p.letterSpacing}px`)
    if (p.textAlign != null) lines.push(`text-align: ${p.textAlign}`)
    return lines.join(';\n    ')
  }

  const desktopCSS = `
.${id} {
  position: absolute;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  ${propsToCSS(desktop)}
}`

  const tabletCSS = tablet && tablet !== desktop ? `
@media (max-width: 1024px) {
  .${id} {
    ${propsToCSS(tablet)}
  }
}` : ''

  const phoneCSS = phone && phone !== desktop ? `
@media (max-width: 640px) {
  .${id} {
    ${propsToCSS(phone)}
  }
}` : ''

  return desktopCSS + tabletCSS + phoneCSS
}

// ─── Stylesheet builder ───────────────────────────────────────────────────────

function buildStylesheet(canvasSettings, elements, theme = 'light') {
  const globalCSS = `
/* ── Reset ── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html, body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background-color: ${canvasSettings.fill || '#ffffff'};
}

img { max-width: 100%; display: block; }

.canvas {
  position: relative;
  width: ${canvasSettings.width || 1200}px;
  min-height: ${canvasSettings.height || 900}px;
  margin: 0 auto;
  overflow: hidden;
  background-color: ${canvasSettings.fill || '#ffffff'};
}

.img-placeholder {
  background-color: #F3F6FB;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
}

.video-placeholder {
  background-color: #0F1A2E;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 32px;
}

/* ── Responsive canvas ── */
@media (max-width: 1024px) {
  .canvas { width: 100%; overflow-x: hidden; }
}
`

  const elementCSS = elements
    .map((el, i) => elementToCSS(el, i))
    .join('\n')

  // ← NEW: mobile nav styles appended to the same stylesheet
  const mobileNavCSS = buildMobileNavStyles(theme)

  return globalCSS + '\n\n/* ── Elements ── */\n' + elementCSS + '\n\n' + mobileNavCSS
}

// ─── Google Fonts loader ──────────────────────────────────────────────────────

function buildGoogleFontsLink(elements) {
  const families = new Set()
  elements.forEach(el => {
    const desktop = getProps(el, 'desktop')
    if (desktop.fontFamily) families.add(desktop.fontFamily)
    if (el.fontFamily)      families.add(el.fontFamily)
  })

  const systemFonts = new Set(['Inter', 'Arial', 'Helvetica', 'sans-serif', 'serif', 'monospace'])
  const googleFonts = [...families].filter(f => f && !systemFonts.has(f))

  if (!googleFonts.length) {
    return `<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />`
  }

  const query = googleFonts
    .map(f => `family=${encodeURIComponent(f)}:wght@400;500;600;700;800`)
    .join('&')

  return `<link href="https://fonts.googleapis.com/css2?${query}&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />`
}

// ─── Derive nav links from elements ──────────────────────────────────────────
//
// If the caller doesn't supply explicit navLinks, we attempt to auto-detect
// them by scanning for button/link elements that look like nav items
// (short text, near the top of the canvas).

function inferNavLinks(elements) {
  const NAV_Y_THRESHOLD = 120 // only consider elements in the top 120px
  const candidates = elements.filter(el => {
    if (!['link', 'button', 'heading'].includes(el.type)) return false
    const p = getProps(el, 'desktop')
    return (p.y ?? 0) < NAV_Y_THRESHOLD
  })

  return candidates.map(el => {
    const p = getProps(el, 'desktop')
    const label = p.content || el.content || el.label || el.type
    const href  = el.href || '#'
    return { label: String(label).trim(), href: String(href).trim() }
  }).filter(l => l.label.length > 0 && l.label.length < 40)
}

// ─── Main export function ─────────────────────────────────────────────────────

export async function exportToZip(
  elements,
  canvasSettings,
  projectName = 'my-project',
  customFonts = [],
  {
    /** Optional: nav links for the mobile hamburger menu */
    navLinks    = null,
    /** Optional: brand/logo text shown in the mobile header */
    logoText    = projectName,
    /** Optional: accent color for CTA buttons in the mobile nav */
    accentColor = '#2563EB',
    /** Optional: 'light' | 'dark' */
    theme       = 'light',
  } = {},
) {
  // Deep clone — never mutate editor state
  const clonedElements = JSON.parse(JSON.stringify(elements))
  const clonedCanvas   = JSON.parse(JSON.stringify(canvasSettings))

  const JSZip = (typeof window !== 'undefined' && window.JSZip)
    ? window.JSZip
    : (await import('jszip')).default

  const zip = new JSZip()

  // ── Extract base64 images → images/ ──────────────────────────────────────
  const imagesFolder = zip.folder('images')
  const processedElements = clonedElements.map((el, i) => {
    const src = el.src || getProps(el, 'desktop').src
    if (el.type !== 'image' || !src) return el
    const asset = extractImageAsset(src, i)
    if (!asset) return el
    imagesFolder.file(asset.filename, asset.base64Data, { base64: true })
    return { ...el, src: `./images/${asset.filename}` }
  })

  // ── Resolve nav links ─────────────────────────────────────────────────────
  const resolvedNavLinks = navLinks ?? inferNavLinks(processedElements)

  // ── CSS ───────────────────────────────────────────────────────────────────
  const cssFolder  = zip.folder('css')
  const stylesheet = buildStylesheet(clonedCanvas, processedElements, theme)
  cssFolder.file('styles.css', stylesheet)

  // ── HTML ──────────────────────────────────────────────────────────────────
  const bodyHTML  = processedElements.map((el, i) => `    ${elementToHTML(el, i)}`).join('\n')
  const fontsLink = buildGoogleFontsLink(processedElements)

  // ← NEW: mobile nav markup
  const mobileNavHTML   = buildMobileNavHTML(resolvedNavLinks, logoText, accentColor, theme)
  const mobileNavScript = buildMobileNavScript()

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHTML(projectName)}</title>
  ${fontsLink}
  <link rel="stylesheet" href="./css/styles.css" />
</head>
<body>
${mobileNavHTML}
  <div class="canvas">
${bodyHTML}
  </div>
  <script>${mobileNavScript}<\/script>
</body>
</html>`

  zip.file('index.html', html)

  // ── Download ──────────────────────────────────────────────────────────────
  const blob = await zip.generateAsync({
    type: 'blob',
    compression: 'DEFLATE',
    compressionOptions: { level: 6 },
  })

  const safeFilename = projectName
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-_]/gi, '')
    .toLowerCase() || 'project'

  const url = URL.createObjectURL(blob)
  const a   = document.createElement('a')
  a.href     = url
  a.download = `${safeFilename}.zip`
  a.click()
  setTimeout(() => URL.revokeObjectURL(url), 10_000)
}