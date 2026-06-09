/**
 * mobileNavExport.js
 *
 * Generates the self-contained mobile nav HTML + CSS + JS block
 * injected into the exported index.html by exportToZip.js.
 *
 * No React dependency — pure vanilla DOM for the static export.
 * Matches the MobileNav.jsx behaviour 1-to-1.
 *
 * Usage in exportToZip.js:
 *
 *   import { buildMobileNavHTML, buildMobileNavStyles, buildMobileNavScript } from './mobileNavExport.js'
 *
 *   // In buildStylesheet():
 *   stylesheet += buildMobileNavStyles(canvasSettings)
 *
 *   // In the HTML template:
 *   <body>
 *     ${buildMobileNavHTML(navLinks, logoText, accentColor)}
 *     <div class="canvas"> ... </div>
 *   </body>
 *   <script>${buildMobileNavScript()}</script>
 */

// ─── HTML ─────────────────────────────────────────────────────────────────────

/**
 * @param {Array<{label:string, href:string}>} links
 * @param {string} logoText
 * @param {string} accentColor
 * @param {'light'|'dark'} theme
 */
export function buildMobileNavHTML(
  links = [],
  logoText = 'Brand',
  accentColor = '#2563EB',
  theme = 'light',
) {
  const navItems = links
    .map((link, i) => `
      <li role="listitem" class="mnav-item" style="animation-delay:${i * 40}ms">
        <a href="${escAttr(link.href)}" class="mnav-link" onclick="mnavClose()">
          <span>${escHTML(link.label)}</span>
          <span class="mnav-arrow">›</span>
        </a>
      </li>`).join('')

  return `
<!-- ── Mobile Navigation ─────────────────────────────────────────────────── -->
<header class="mnav-header" role="banner">
  <button
    class="mnav-hamburger"
    id="mnav-btn"
    aria-label="Open navigation menu"
    aria-expanded="false"
    aria-controls="mnav-drawer"
    onclick="mnavToggle()"
  >
    <span class="mnav-bar mnav-bar-1"></span>
    <span class="mnav-bar mnav-bar-2"></span>
    <span class="mnav-bar mnav-bar-3"></span>
  </button>

  <a href="/" class="mnav-logo" aria-label="Go to homepage">${escHTML(logoText)}</a>

  <a href="#contact" class="mnav-cta" style="background:${escAttr(accentColor)}">Get started</a>
</header>

<div class="mnav-spacer" aria-hidden="true"></div>

<!-- Overlay -->
<div class="mnav-overlay" id="mnav-overlay" aria-hidden="true" onclick="mnavClose()"></div>

<!-- Drawer -->
<nav
  class="mnav-drawer"
  id="mnav-drawer"
  aria-label="Mobile navigation"
  role="dialog"
  aria-modal="true"
  aria-hidden="true"
>
  <div class="mnav-drawer-header">
    <a href="/" class="mnav-logo">${escHTML(logoText)}</a>
    <button class="mnav-close-btn" aria-label="Close navigation menu" onclick="mnavClose()">✕</button>
  </div>

  <ul class="mnav-list" role="list">${navItems}</ul>

  <div class="mnav-section-label">Quick links</div>

  <div class="mnav-footer">
    <a href="#contact" class="mnav-drawer-cta" style="background:${escAttr(accentColor)};box-shadow:0 2px 12px ${accentColor}55">
      Get started
    </a>
    <p class="mnav-footer-note">
      Need help? <a href="#support" class="mnav-footer-link" style="color:${escAttr(accentColor)}">Contact support</a>
    </p>
  </div>
</nav>
<!-- ── / Mobile Navigation ────────────────────────────────────────────────── -->`
}

// ─── CSS ──────────────────────────────────────────────────────────────────────

export function buildMobileNavStyles(theme = 'light') {
  const isDark  = theme === 'dark'
  const bg      = isDark ? '#0F172A' : '#FFFFFF'
  const surface = isDark ? '#1E293B' : '#F8FAFC'
  const text    = isDark ? '#F1F5F9' : '#0F172A'
  const sub     = isDark ? '#94A3B8' : '#64748B'
  const border  = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'
  const overlay = isDark ? 'rgba(0,0,0,0.7)' : 'rgba(15,23,42,0.45)'

  return `
/* ══════════════════════════════════════════════════════════════════════════════
   Mobile Navigation
   ══════════════════════════════════════════════════════════════════════════════ */

/* ── Keyframes ── */
@keyframes mnav-slide-in  { from { transform: translateX(-100%); } to { transform: translateX(0); } }
@keyframes mnav-slide-out { from { transform: translateX(0); } to { transform: translateX(-100%); } }
@keyframes mnav-fade-in   { from { opacity: 0; } to { opacity: 1; } }
@keyframes mnav-fade-out  { from { opacity: 1; } to { opacity: 0; } }
@keyframes mnav-item-in   { from { opacity: 0; transform: translateX(-14px); } to { opacity: 1; transform: translateX(0); } }

/* ── Body lock ── */
body.mnav-open { overflow: hidden !important; }

/* ── Header ── */
.mnav-header {
  position: fixed;
  top: 0; left: 0; right: 0;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  background: ${bg};
  border-bottom: 1px solid ${border};
  z-index: 1000;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

/* Hide on desktop, show only on mobile */
.mnav-header,
.mnav-spacer { display: none; }

@media (max-width: 768px) {
  .mnav-header { display: flex; }
  .mnav-spacer { display: block; height: 56px; }

  /* Hide inline desktop nav elements when mobile header is active */
  .desktop-nav { display: none !important; }
}

/* ── Spacer ── */
.mnav-spacer { height: 56px; }

/* ── Hamburger button ── */
.mnav-hamburger {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 40px;
  height: 40px;
  padding: 9px;
  border: none;
  background: transparent;
  border-radius: 8px;
  cursor: pointer;
  flex-shrink: 0;
  transition: background 0.15s ease;
}
.mnav-hamburger:hover { background: ${surface}; }

.mnav-bar {
  display: block;
  width: 22px;
  height: 2px;
  background: ${text};
  border-radius: 2px;
  transition: transform 0.28s cubic-bezier(0.4,0,0.2,1), opacity 0.2s ease;
  transform-origin: center;
}

/* Morphs to × when open */
.mnav-hamburger[aria-expanded="true"] .mnav-bar-1 { transform: translateY(7px) rotate(45deg); }
.mnav-hamburger[aria-expanded="true"] .mnav-bar-2 { opacity: 0; transform: scaleX(0); }
.mnav-hamburger[aria-expanded="true"] .mnav-bar-3 { transform: translateY(-7px) rotate(-45deg); }

/* ── Logo ── */
.mnav-logo {
  font-size: 17px;
  font-weight: 700;
  color: ${text};
  text-decoration: none;
  letter-spacing: -0.02em;
  user-select: none;
}

/* ── Header CTA ── */
.mnav-cta {
  padding: 7px 14px;
  color: #fff;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  letter-spacing: 0.01em;
  flex-shrink: 0;
  transition: opacity 0.15s ease;
}
.mnav-cta:hover { opacity: 0.85; }

/* ── Overlay ── */
.mnav-overlay {
  display: none;
  position: fixed;
  inset: 0;
  z-index: 1010;
  background: ${overlay};
}
.mnav-overlay.mnav-visible {
  display: block;
  animation: mnav-fade-in 0.3s ease forwards;
}
.mnav-overlay.mnav-closing {
  animation: mnav-fade-out 0.3s ease forwards;
}

/* ── Drawer ── */
.mnav-drawer {
  position: fixed;
  top: 0; left: 0; bottom: 0;
  width: min(300px, 82vw);
  background: ${bg};
  z-index: 1020;
  display: none;
  flex-direction: column;
  box-shadow: 4px 0 32px rgba(0,0,0,0.18);
  overflow-y: auto;
  overscroll-behavior: contain;
}
.mnav-drawer.mnav-visible {
  display: flex;
  animation: mnav-slide-in 0.3s cubic-bezier(0.4,0,0.2,1) forwards;
}
.mnav-drawer.mnav-closing {
  display: flex;
  animation: mnav-slide-out 0.3s cubic-bezier(0.4,0,0.2,1) forwards;
}

/* ── Drawer header ── */
.mnav-drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 56px;
  border-bottom: 1px solid ${border};
  flex-shrink: 0;
}
.mnav-drawer-header .mnav-logo { font-size: 16px; }

/* ── Close button ── */
.mnav-close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: 1px solid ${border};
  background: transparent;
  border-radius: 8px;
  cursor: pointer;
  color: ${sub};
  font-size: 18px;
  line-height: 1;
  transition: background 0.15s ease, color 0.15s ease;
}
.mnav-close-btn:hover { background: ${surface}; color: ${text}; }

/* ── Nav list ── */
.mnav-list {
  list-style: none;
  padding: 12px 0;
  margin: 0;
  flex: 1;
}

.mnav-item {
  border-bottom: 1px solid ${border};
  animation: mnav-item-in 0.28s ease both;
}
.mnav-item:last-child { border-bottom: none; }

.mnav-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  color: ${text};
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -0.01em;
  transition: background 0.12s ease;
}
.mnav-link:hover { background: ${surface}; }

.mnav-arrow {
  color: ${sub};
  font-size: 14px;
  transition: transform 0.15s ease;
}
.mnav-link:hover .mnav-arrow { transform: translateX(3px); }

/* ── Section label ── */
.mnav-section-label {
  padding: 8px 20px 6px;
  font-size: 11px;
  font-weight: 600;
  color: ${sub};
  letter-spacing: 0.08em;
  text-transform: uppercase;
  border-top: 1px solid ${border};
}

/* ── Footer ── */
.mnav-footer {
  padding: 16px 20px 32px;
  border-top: 1px solid ${border};
  flex-shrink: 0;
}

.mnav-drawer-cta {
  display: block;
  width: 100%;
  padding: 13px 20px;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  letter-spacing: 0.01em;
  transition: opacity 0.15s ease, transform 0.15s ease;
  box-sizing: border-box;
}
.mnav-drawer-cta:hover {
  opacity: 0.88;
  transform: translateY(-1px);
}

.mnav-footer-note {
  margin-top: 12px;
  font-size: 12px;
  color: ${sub};
  text-align: center;
  line-height: 1.5;
}

.mnav-footer-link {
  text-decoration: none;
  font-weight: 500;
}
.mnav-footer-link:hover { text-decoration: underline; }
`
}

// ─── Vanilla JS ───────────────────────────────────────────────────────────────

export function buildMobileNavScript() {
  return `
(function () {
  var OPEN    = false
  var CLOSING = false

  var btn     = document.getElementById('mnav-btn')
  var drawer  = document.getElementById('mnav-drawer')
  var overlay = document.getElementById('mnav-overlay')

  if (!btn || !drawer || !overlay) return

  function mnavOpen() {
    if (OPEN || CLOSING) return
    OPEN = true
    document.body.classList.add('mnav-open')
    drawer.classList.add('mnav-visible')
    drawer.classList.remove('mnav-closing')
    overlay.classList.add('mnav-visible')
    overlay.classList.remove('mnav-closing')
    btn.setAttribute('aria-expanded', 'true')
    btn.setAttribute('aria-label', 'Close navigation menu')
    drawer.setAttribute('aria-hidden', 'false')
    // Focus first link inside drawer
    setTimeout(function () {
      var first = drawer.querySelector('a, button')
      if (first) first.focus()
    }, 50)
  }

  function mnavClose() {
    if (!OPEN || CLOSING) return
    CLOSING = true
    drawer.classList.add('mnav-closing')
    overlay.classList.add('mnav-closing')
    setTimeout(function () {
      OPEN    = false
      CLOSING = false
      document.body.classList.remove('mnav-open')
      drawer.classList.remove('mnav-visible', 'mnav-closing')
      overlay.classList.remove('mnav-visible', 'mnav-closing')
      drawer.setAttribute('aria-hidden', 'true')
      btn.setAttribute('aria-expanded', 'false')
      btn.setAttribute('aria-label', 'Open navigation menu')
      btn.focus()
    }, 300)
  }

  function mnavToggle() { OPEN ? mnavClose() : mnavOpen() }

  // Expose globally for inline onclick attrs
  window.mnavToggle = mnavToggle
  window.mnavClose  = mnavClose

  // Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && OPEN) mnavClose()
  })

  // Focus trap
  drawer.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab') return
    var focusable = drawer.querySelectorAll('a[href], button, [tabindex]:not([tabindex="-1"])')
    var first = focusable[0]
    var last  = focusable[focusable.length - 1]
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus() }
    } else {
      if (document.activeElement === last)  { e.preventDefault(); first.focus() }
    }
  })
})()
`
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function escHTML(str) {
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')
}
function escAttr(str) {
  return String(str).replace(/"/g,'&quot;').replace(/'/g,'&#39;')
}