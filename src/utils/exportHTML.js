/**
 * exportToZip.js
 *
 * Converts the current Web Creator project into a self-contained ZIP archive.
 *
 * Structure of the generated ZIP:
 *   index.html          – markup (references ./css/styles.css)
 *   css/styles.css      – all layout + theme styles
 *   css/fonts.css       – @font-face declarations (if custom fonts are used)
 *   images/<name>       – any embedded base64 images, extracted to real files
 *
 * SAFETY CONTRACT
 * ───────────────
 * • Elements and canvasSettings are deep-cloned at the very start.
 *   Nothing in this module ever mutates the originals, so the editor
 *   canvas is completely unaffected by the export.
 * • No React state setters, no DOM manipulation of the live document.
 */

// ---------------------------------------------------------------------------
// Dependency: JSZip  (loaded via CDN in the host page, or npm install jszip)
// If you use a bundler add:  import JSZip from 'jszip'
// ---------------------------------------------------------------------------

// ─── CSS helpers ────────────────────────────────────────────────────────────

/**
 * Returns only the positional / decoration CSS that every element shares.
 * Deliberately does NOT include type-specific rules so those can live in the
 * stylesheet instead of inline styles, keeping the HTML clean.
 */
function elementToBaseCSS(el) {
  const radius  = el.radius  ?? 0
  const border  = el.borderColor ? `1.5px solid ${el.borderColor}` : 'none'
  const shadow  = el.shadowColor ? `0 4px 24px ${el.shadowColor}` : 'none'
  const opacity = (el.opacity ?? 100) / 100

  // All values come from the (cloned) element – no writes back to the object.
  return {
    position    : 'absolute',
    left        : `${el.x}px`,
    top         : `${el.y}px`,
    width       : `${el.width || 200}px`,
    opacity     : String(opacity),
    borderRadius: `${radius}px`,
    border,
    boxShadow   : shadow,
  }
}

/** Serialise a plain CSS-property object to an inline-style string. */
function cssObjToInline(obj) {
  return Object.entries(obj)
    .map(([k, v]) => `${camelToKebab(k)}: ${v}`)
    .join('; ')
}

function camelToKebab(str) {
  return str.replace(/([A-Z])/g, m => `-${m.toLowerCase()}`)
}

// ─── Image extraction ────────────────────────────────────────────────────────

/**
 * If an image element carries a base64 data-URL we extract the raw bytes so
 * they can be stored as a real file inside the ZIP.  The HTML then references
 * `./images/<filename>` instead of an enormous inline blob.
 *
 * Returns { filename, mimeType, base64Data } or null for external URLs.
 */
function extractImageAsset(src, index) {
  if (!src) return null
  const match = src.match(/^data:([^;]+);base64,(.+)$/)
  if (!match) return null // external URL – keep as-is

  const [, mimeType, base64Data] = match
  const ext      = mimeType.split('/')[1] || 'png'
  const filename = `image-${index}.${ext}`
  return { filename, mimeType, base64Data }
}

// ─── Per-element HTML generation ─────────────────────────────────────────────

/**
 * Converts a single (cloned) element descriptor to an HTML string.
 * Images whose src values have been replaced with relative paths receive the
 * already-rewritten src so no further mutation is needed.
 */
function elementToHTML(el) {
  const baseStyle = cssObjToInline(elementToBaseCSS(el))
  const h         = el.height || 100

  switch (el.type) {
    case 'heading':
      return `<h1 style="${baseStyle}; color: ${el.textColor || '#111827'}; font-size: ${el.fontSize || 32}px; font-weight: ${el.fontWeight || 700}; font-style: ${el.italic ? 'italic' : 'normal'}; text-decoration: ${el.underline ? 'underline' : 'none'}; text-align: ${el.textAlign || 'left'}; line-height: ${el.lineHeight || 1.2}; margin: 0;">${escapeHTML(el.content || 'Your Heading')}</h1>`

    case 'paragraph':
      return `<p style="${baseStyle}; color: ${el.textColor || '#4b5563'}; font-size: ${el.fontSize || 16}px; font-weight: ${el.fontWeight || 400}; font-style: ${el.italic ? 'italic' : 'normal'}; text-decoration: ${el.underline ? 'underline' : 'none'}; text-align: ${el.textAlign || 'left'}; line-height: ${el.lineHeight || 1.6}; margin: 0;">${escapeHTML(el.content || 'Your text goes here')}</p>`

    case 'link':
      return `<a href="${el.href || '#'}" style="${baseStyle}; color: ${el.textColor || '#2348D7'}; font-size: ${el.fontSize || 16}px; text-decoration: underline; text-align: ${el.textAlign || 'left'};">${escapeHTML(el.content || 'Click here')}</a>`

    case 'button':
      return `<button style="${baseStyle}; height: ${h}px; background-color: ${el.fill || '#2348D7'}; color: ${el.textColor || '#ffffff'}; font-size: ${el.fontSize || 14}px; font-weight: ${el.fontWeight || 500}; cursor: pointer; border: none; border-radius: ${el.radius || 8}px;">${escapeHTML(el.content || 'Click me')}</button>`

    case 'image':
      if (el.src) {
        return `<img src="${el.src}" alt="${escapeHTML(el.alt || '')}" style="${baseStyle}; height: ${h}px; object-fit: cover;" />`
      }
      return `<div style="${baseStyle}; height: ${h}px; background-color: ${el.fill || '#F3F6FB'}; display: flex; align-items: center; justify-content: center; font-size: 28px;">🖼</div>`

    case 'container':
    case 'section':
      return `<div style="${baseStyle}; height: ${h}px; background-color: ${el.fill || 'transparent'};"></div>`

    case 'divider':
      return `<hr style="${baseStyle}; height: 2px; background-color: ${el.fill || '#E2E8F4'}; border: none;" />`

    case 'video':
      return `<div style="${baseStyle}; height: ${h}px; background-color: #0F1A2E; display: flex; align-items: center; justify-content: center; color: white; font-size: 32px;">▶</div>`

    case 'input':
      return `<input type="text" placeholder="${escapeAttr(el.content || 'Placeholder...')}" style="${baseStyle}; height: ${h}px; background-color: ${el.fill || '#ffffff'}; padding: 0 12px; font-size: 14px; color: ${el.textColor || '#111827'}; outline: none; box-sizing: border-box;" />`

    case 'checkbox':
      return `<label style="${baseStyle}; display: flex; align-items: center; gap: 8px; cursor: pointer;"><input type="checkbox" style="width: 16px; height: 16px; accent-color: #2348D7;" /><span style="font-size: 14px; color: ${el.textColor || '#111827'};">${escapeHTML(el.content || 'Option')}</span></label>`

    default:
      return `<!-- unsupported element type: ${escapeHTML(el.type)} -->`
  }
}

// ─── Sanitisation helpers ────────────────────────────────────────────────────

function escapeHTML(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function escapeAttr(str) {
  return String(str).replace(/"/g, '&quot;').replace(/'/g, '&#39;')
}

// ─── Stylesheet builder ──────────────────────────────────────────────────────

/**
 * Generates css/styles.css – canvas reset + body background.
 * All element-specific rules remain inline so positioning is self-contained.
 */
function buildStylesheet(canvasSettings) {
  return `/* Generated by Web Creator – do not edit manually */

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background-color: ${canvasSettings.fill || '#ffffff'};
}

.canvas {
  position: relative;
  width: ${canvasSettings.width || 1200}px;
  min-height: ${canvasSettings.height || 900}px;
  margin: 0 auto;
  overflow: hidden;
}
`
}

/**
 * Generates css/fonts.css from an optional array of font descriptors.
 * Each descriptor: { family, url, weight?, style? }
 */
function buildFontsCSS(fonts = []) {
  if (!fonts.length) return null
  return fonts
    .map(f => `@font-face {
  font-family: '${f.family}';
  src: url('${f.url}') format('${f.format || 'woff2'}');
  font-weight: ${f.weight || 'normal'};
  font-style: ${f.style || 'normal'};
  font-display: swap;
}`)
    .join('\n\n')
}

// ─── Main export function ────────────────────────────────────────────────────

/**
 * exportToZip
 *
 * @param {object[]} elements        – Array of element descriptors from the editor.
 * @param {object}   canvasSettings  – Canvas width/height/fill etc.
 * @param {string}   [projectName]   – Used as the ZIP filename.
 * @param {object[]} [customFonts]   – Optional font descriptors (see buildFontsCSS).
 *
 * All parameters are treated as READ-ONLY. Deep clones are made immediately.
 */
export async function exportToZip(
  elements,
  canvasSettings,
  projectName  = 'my-project',
  customFonts  = [],
) {
  // ── 1. Deep-clone everything so the editor state is never touched ──────────
  const clonedElements = JSON.parse(JSON.stringify(elements))
  const clonedCanvas   = JSON.parse(JSON.stringify(canvasSettings))

  // ── 2. Initialise JSZip ───────────────────────────────────────────────────
  // Supports both ESM (import JSZip from 'jszip') and CDN (window.JSZip).
  const JSZip = (typeof window !== 'undefined' && window.JSZip)
    ? window.JSZip
    : (await import('jszip')).default

  const zip = new JSZip()

  // ── 3. Extract embedded images → images/ folder ───────────────────────────
  const imagesFolder = zip.folder('images')
  const processedElements = clonedElements.map((el, i) => {
    if (el.type !== 'image' || !el.src) return el

    const asset = extractImageAsset(el.src, i)
    if (!asset) return el // external URL – keep untouched

    // Add raw bytes to ZIP
    imagesFolder.file(asset.filename, asset.base64Data, { base64: true })

    // Return a *new* object with the rewritten src; original clone is replaced,
    // but the editor's original array is completely unaffected.
    return { ...el, src: `./images/${asset.filename}` }
  })

  // ── 4. Build CSS files ────────────────────────────────────────────────────
  const cssFolder   = zip.folder('css')
  const stylesheet  = buildStylesheet(clonedCanvas)
  cssFolder.file('styles.css', stylesheet)

  const fontsCSS = buildFontsCSS(customFonts)
  if (fontsCSS) cssFolder.file('fonts.css', fontsCSS)

  // ── 5. Build HTML ─────────────────────────────────────────────────────────
  const bodyHTML    = processedElements.map(elementToHTML).join('\n    ')
  const fontLink    = fontsCSS
    ? '<link rel="stylesheet" href="./css/fonts.css" />'
    : ''

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHTML(projectName)}</title>
  ${fontLink}
  <link rel="stylesheet" href="./css/styles.css" />
</head>
<body>
  <div class="canvas">
    ${bodyHTML}
  </div>
</body>
</html>`

  zip.file('index.html', html)

  // ── 6. Generate ZIP blob and trigger download ─────────────────────────────
  // generateAsync is non-blocking and never touches the DOM or React state.
  const blob = await zip.generateAsync({
    type              : 'blob',
    compression       : 'DEFLATE',
    compressionOptions: { level: 6 },
  })

  const safeFilename = projectName
    .replace(/\s+/g, '-')   // fix: was /\s+g/ (missing flag outside regex) in original
    .replace(/[^a-z0-9-_]/gi, '')
    .toLowerCase() || 'project'

  const url = URL.createObjectURL(blob)
  const a   = document.createElement('a')
  a.href     = url
  a.download = `${safeFilename}.zip`
  a.click()

  // Clean up the object URL after a short delay to ensure the download starts.
  setTimeout(() => URL.revokeObjectURL(url), 10_000)
}