/**
 * exportHTML.js — Fixed
 * Reads from element.desktop / element.tablet / element.phone
 * Generates proper @media query CSS instead of broken absolute positioning
 */

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

// ─── THE CORE FIX ─────────────────────────────────────────────────────────────
// After responsive.js migration, props live in el.desktop / el.tablet / el.phone
// The old code read el.x, el.y etc which are undefined after migration

function getProps(el, breakpoint = 'desktop') {
  if (el.desktop !== undefined) {
    return el[breakpoint] || el.desktop
  }
  return el // legacy fallback for unmigrated elements
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

// ─── Per-element HTML ─────────────────────────────────────────────────────────

function elementToHTML(el, index) {
  const p   = getProps(el, 'desktop')
  const cls = `el-${el.id || index}`
  const h   = p.height || 100

  const decorInline = [
    p.borderColor ? `border: 1.5px solid ${p.borderColor}` : '',
    p.shadowColor ? `box-shadow: 0 4px 24px ${p.shadowColor}` : '',
    p.radius      ? `border-radius: ${p.radius}px` : '',
    (p.opacity != null && p.opacity !== 100) ? `opacity: ${p.opacity / 100}` : '',
  ].filter(Boolean).join('; ')

  switch (el.type) {
    case 'heading':
      return `<h2 class="${cls}"${decorInline ? ` style="${decorInline}"` : ''}>${escapeHTML(p.content || el.content || 'Heading')}</h2>`

    case 'paragraph':
    case 'label':
      return `<p class="${cls}"${decorInline ? ` style="${decorInline}"` : ''}>${escapeHTML(p.content || el.content || '')}</p>`

    case 'link':
      return `<a href="${escapeAttr(el.href || '#')}" class="${cls}">${escapeHTML(p.content || el.content || 'Link')}</a>`

    case 'button':
      return `<button class="${cls}">${escapeHTML(p.content || el.content || 'Button')}</button>`

    case 'image':
      if (p.src || el.src) {
        return `<img src="${escapeAttr(p.src || el.src)}" alt="${escapeAttr(el.alt || '')}" class="${cls}" />`
      }
      return `<div class="${cls} img-placeholder">🖼</div>`

    case 'container':
    case 'section':
      return `<div class="${cls}"></div>`

    case 'divider':
      return `<hr class="${cls}" />`

    case 'input':
      return `<input type="text" placeholder="${escapeAttr(p.content || el.content || 'Enter text...')}" class="${cls}" />`

    case 'video':
      return `<div class="${cls} video-placeholder">▶</div>`

    default:
      return `<!-- unknown: ${escapeHTML(el.type)} -->`
  }
}

// ─── Per-element CSS (desktop + media queries) ────────────────────────────────

function propsToCSS(p) {
  const lines = []
  if (p.x         != null) lines.push(`left: ${p.x}px`)
  if (p.y         != null) lines.push(`top: ${p.y}px`)
  if (p.width     != null) lines.push(`width: ${p.width}px`)
  if (p.height    != null) lines.push(`height: ${p.height}px`)
  if (p.fill      != null) lines.push(`background-color: ${p.fill}`)
  if (p.textColor != null) lines.push(`color: ${p.textColor}`)
  if (p.fontSize  != null) lines.push(`font-size: ${p.fontSize}px`)
  if (p.fontWeight!= null) lines.push(`font-weight: ${p.fontWeight}`)
  if (p.fontFamily!= null) lines.push(`font-family: '${p.fontFamily}', sans-serif`)
  if (p.lineHeight!= null) lines.push(`line-height: ${p.lineHeight}`)
  if (p.letterSpacing != null) lines.push(`letter-spacing: ${p.letterSpacing}px`)
  if (p.textAlign != null) lines.push(`text-align: ${p.textAlign}`)
  return lines.map(l => `  ${l}`).join(';\n')
}

function elementToCSS(el, index) {
  const cls     = `el-${el.id || index}`
  const desktop = getProps(el, 'desktop')
  const tablet  = getProps(el, 'tablet')
  const phone   = getProps(el, 'phone')

  return `
.${cls} {
  position: absolute;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
${propsToCSS(desktop)};
}

@media (max-width: 1024px) {
  .${cls} {
${propsToCSS(tablet)};
  }
}

@media (max-width: 640px) {
  .${cls} {
${propsToCSS(phone)};
  }
}`
}

// ─── Google Fonts ─────────────────────────────────────────────────────────────

function buildGoogleFontsLink(elements) {
  const families = new Set(['Inter'])
  elements.forEach(el => {
    const p = getProps(el, 'desktop')
    if (p.fontFamily) families.add(p.fontFamily)
    if (el.fontFamily) families.add(el.fontFamily)
  })

  const skip = new Set(['Arial', 'Helvetica', 'sans-serif', 'serif', 'monospace'])
  const toLoad = [...families].filter(f => f && !skip.has(f))

  const query = toLoad
    .map(f => `family=${encodeURIComponent(f)}:wght@400;500;600;700;800`)
    .join('&')

  return `<link href="https://fonts.googleapis.com/css2?${query}&display=swap" rel="stylesheet" />`
}

// ─── Stylesheet ───────────────────────────────────────────────────────────────

function buildStylesheet(canvasSettings, elements) {
  const global = `/* Generated by Web Creator */

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html, body {
  font-family: 'Inter', -apple-system, sans-serif;
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

@media (max-width: 1024px) {
  .canvas { width: 100%; overflow-x: hidden; }
}
`
  const elementCSS = elements.map((el, i) => elementToCSS(el, i)).join('\n')
  return global + '\n/* ── Elements ── */\n' + elementCSS
}

// ─── Main export ──────────────────────────────────────────────────────────────

export async function exportToZip(
  elements,
  canvasSettings,
  projectName = 'my-project',
  customFonts = [],
) {
  const clonedElements = JSON.parse(JSON.stringify(elements))
  const clonedCanvas   = JSON.parse(JSON.stringify(canvasSettings))

  const JSZip = (typeof window !== 'undefined' && window.JSZip)
    ? window.JSZip
    : (await import('jszip')).default

  const zip = new JSZip()

  // Extract base64 images
  const imagesFolder = zip.folder('images')
  const processedElements = clonedElements.map((el, i) => {
    const src = el.src || getProps(el, 'desktop').src
    if (el.type !== 'image' || !src) return el
    const asset = extractImageAsset(src, i)
    if (!asset) return el
    imagesFolder.file(asset.filename, asset.base64Data, { base64: true })
    return { ...el, src: `./images/${asset.filename}` }
  })

  // CSS
  const cssFolder  = zip.folder('css')
  cssFolder.file('styles.css', buildStylesheet(clonedCanvas, processedElements))

  // HTML
  const bodyHTML = processedElements
    .map((el, i) => `    ${elementToHTML(el, i)}`)
    .join('\n')

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHTML(projectName)}</title>
  ${buildGoogleFontsLink(processedElements)}
  <link rel="stylesheet" href="./css/styles.css" />
</head>
<body>
  <div class="canvas">
${bodyHTML}
  </div>
</body>
</html>`

  zip.file('index.html', html)

  // Download
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