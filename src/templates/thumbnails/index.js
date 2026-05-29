// ─────────────────────────────────────────────────────────────────────────────
// thumbnails/index.js
//
// All template preview thumbnails as inline SVG data URIs.
// Each thumbnail is 400×300px with:
//   - A faithful miniature of the template's visual language
//   - A bottom-gradient dark overlay for legibility
//   - Template name + subtitle + light/dark badge in the lower-left
//
// Usage in JSX:
//   import { TEMPLATE_THUMBNAILS } from './thumbnails'
//   <img src={TEMPLATE_THUMBNAILS.techSummitTemplate1} alt="TechSummit" />
//   // or as a CSS background:
//   style={{ backgroundImage: `url("${TEMPLATE_THUMBNAILS.flatDesignTemplate}")` }}
//
// FIX NOTES (v2):
//   - svgToDataUri() is now applied to every entry at definition time so
//     consumers receive ready-to-use data: URIs — no extra encoding step needed.
//   - TEMPLATE_THUMBNAILS keys exactly match the TEMPLATES object keys in
//     template.js, making thumbnail lookup O(1) and typo-proof.
// ─────────────────────────────────────────────────────────────────────────────


// ─── Helper — converts a raw SVG string to a data URI ────────────────────────
// Exported so consumers can optionally encode custom SVGs with the same method.
export function svgToDataUri(svgString) {
  const encoded = encodeURIComponent(
    svgString.replace(/\n\s*/g, ' ').trim()
  )
  return `data:image/svg+xml,${encoded}`
}


// ─── Internal raw SVG constants ───────────────────────────────────────────────
// These are the source SVG strings.  They are NOT exported directly — consumers
// should use TEMPLATE_THUMBNAILS which returns encoded data URIs.

// ═════════════════════════════════════════════════════════════════════════════
// 1. TECHSUMMIT — Dark tech conference · Blue accent · Inter font
// ═════════════════════════════════════════════════════════════════════════════

const SVG_TECHSUMMIT = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300">
  <defs>
    <linearGradient id="ts-ov" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#080C14" stop-opacity="0"/>
      <stop offset="52%" stop-color="#080C14" stop-opacity="0.52"/>
      <stop offset="100%" stop-color="#080C14" stop-opacity="0.90"/>
    </linearGradient>
    <clipPath id="ts-clip"><rect width="400" height="300" rx="16" ry="16"/></clipPath>
  </defs>
  <g clip-path="url(#ts-clip)">
    <rect width="400" height="300" fill="#080C14"/>
    <rect x="0" y="0" width="400" height="26" fill="#080C14"/>
    <rect x="16" y="7" width="10" height="10" rx="2" fill="#3B82F6"/>
    <rect x="32" y="8" width="56" height="10" rx="3" fill="#F0F4FF" opacity="0.80"/>
    <rect x="140" y="9" width="110" height="7" rx="2" fill="#9BAEC8" opacity="0.40"/>
    <rect x="336" y="6" width="48" height="14" rx="4" fill="#3B82F6"/>
    <rect x="0" y="26" width="400" height="120" fill="#080C14"/>
    <rect x="16" y="34" width="115" height="10" rx="5" fill="rgba(59,130,246,0.14)"/>
    <rect x="22" y="37" width="100" height="4" rx="2" fill="#93C5FD" opacity="0.85"/>
    <rect x="16" y="50" width="175" height="13" rx="3" fill="#F0F4FF" opacity="0.90"/>
    <rect x="16" y="68" width="155" height="13" rx="3" fill="#F0F4FF" opacity="0.90"/>
    <rect x="16" y="86" width="165" height="13" rx="3" fill="#F0F4FF" opacity="0.90"/>
    <rect x="16" y="106" width="148" height="5" rx="2" fill="#9BAEC8" opacity="0.50"/>
    <rect x="16" y="115" width="130" height="5" rx="2" fill="#9BAEC8" opacity="0.50"/>
    <rect x="16" y="128" width="68" height="18" rx="5" fill="#3B82F6"/>
    <rect x="92" y="128" width="60" height="18" rx="5" fill="none" stroke="rgba(255,255,255,0.18)" stroke-width="1.5"/>
    <rect x="232" y="30" width="148" height="112" rx="10" fill="#111B2E" stroke="rgba(59,130,246,0.35)" stroke-width="1"/>
    <rect x="244" y="42" width="70" height="22" rx="3" fill="#F0F4FF" opacity="0.80"/>
    <rect x="244" y="68" width="50" height="12" rx="2" fill="#F0F4FF" opacity="0.60"/>
    <rect x="244" y="84" width="44" height="18" rx="2" fill="#60A5FA" opacity="0.90"/>
    <rect x="298" y="84" width="48" height="18" rx="2" fill="#60A5FA" opacity="0.75"/>
    <rect x="244" y="110" width="60" height="10" rx="2" fill="#9BAEC8" opacity="0.40"/>
    <rect x="314" y="110" width="50" height="10" rx="2" fill="#9BAEC8" opacity="0.40"/>
    <rect x="0" y="146" width="400" height="36" fill="#0D1525"/>
    <rect x="16" y="155" width="46" height="14" rx="2" fill="#F0F4FF" opacity="0.85"/>
    <rect x="16" y="171" width="56" height="5" rx="2" fill="#9BAEC8" opacity="0.35"/>
    <rect x="116" y="155" width="38" height="14" rx="2" fill="#F0F4FF" opacity="0.85"/>
    <rect x="116" y="171" width="60" height="5" rx="2" fill="#9BAEC8" opacity="0.35"/>
    <rect x="216" y="155" width="30" height="14" rx="2" fill="#F0F4FF" opacity="0.85"/>
    <rect x="216" y="171" width="52" height="5" rx="2" fill="#9BAEC8" opacity="0.35"/>
    <rect x="316" y="155" width="42" height="14" rx="2" fill="#F0F4FF" opacity="0.85"/>
    <rect x="316" y="171" width="58" height="5" rx="2" fill="#9BAEC8" opacity="0.35"/>
    <rect x="0" y="182" width="400" height="80" fill="#080C14"/>
    <rect x="16" y="192" width="80" height="8" rx="3" fill="#F0F4FF" opacity="0.75"/>
    <rect x="16" y="205" width="82" height="52" rx="6" fill="#111B2E" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
    <rect x="24" y="212" width="32" height="10" rx="2" fill="#F0F4FF" opacity="0.70"/>
    <rect x="24" y="226" width="60" height="5" rx="2" fill="#9BAEC8" opacity="0.40"/>
    <rect x="24" y="234" width="48" height="5" rx="2" fill="#9BAEC8" opacity="0.35"/>
    <rect x="108" y="205" width="82" height="52" rx="6" fill="#111B2E" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
    <rect x="116" y="212" width="32" height="10" rx="2" fill="#F0F4FF" opacity="0.70"/>
    <rect x="116" y="226" width="60" height="5" rx="2" fill="#9BAEC8" opacity="0.40"/>
    <rect x="200" y="205" width="82" height="52" rx="6" fill="#111B2E" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
    <rect x="208" y="212" width="32" height="10" rx="2" fill="#F0F4FF" opacity="0.70"/>
    <rect x="292" y="205" width="92" height="52" rx="6" fill="#111B2E" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
    <rect x="300" y="212" width="32" height="10" rx="2" fill="#F0F4FF" opacity="0.70"/>
    <rect width="400" height="300" fill="url(#ts-ov)"/>
    <text x="20" y="256" font-family="'Inter','Helvetica Neue',sans-serif" font-size="17" font-weight="800" fill="#F0F4FF" opacity="0.95">TechSummit</text>
    <text x="20" y="274" font-family="'Inter','Helvetica Neue',sans-serif" font-size="11" fill="rgba(240,244,255,0.55)">Tech Conference · Dark Mode</text>
    <rect x="20" y="282" width="36" height="12" rx="6" fill="#3B82F6" opacity="0.90"/>
    <text x="27" y="291" font-family="sans-serif" font-size="7" font-weight="700" fill="#FFFFFF">LIGHT</text>
    <rect x="61" y="282" width="32" height="12" rx="6" fill="rgba(255,255,255,0.14)"/>
    <text x="67" y="291" font-family="sans-serif" font-size="7" font-weight="700" fill="rgba(255,255,255,0.70)">DARK</text>
  </g>
  <rect width="400" height="300" rx="16" ry="16" fill="none" stroke="#3B82F6" stroke-width="1" opacity="0.20"/>
</svg>`


// ═════════════════════════════════════════════════════════════════════════════
// 2. ART DECO GALA — Gatsby luxury · Gold/Champagne · Serif editorial
// ═════════════════════════════════════════════════════════════════════════════

const SVG_ART_DECO = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300">
  <defs>
    <linearGradient id="ad-bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#FAF7EF"/>
      <stop offset="100%" stop-color="#F2ECDF"/>
    </linearGradient>
    <linearGradient id="ad-gold" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#C9A84C"/>
      <stop offset="50%" stop-color="#F0D080"/>
      <stop offset="100%" stop-color="#C9A84C"/>
    </linearGradient>
    <linearGradient id="ad-ov" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1A1208" stop-opacity="0"/>
      <stop offset="55%" stop-color="#1A1208" stop-opacity="0.50"/>
      <stop offset="100%" stop-color="#1A1208" stop-opacity="0.88"/>
    </linearGradient>
    <clipPath id="ad-clip"><rect width="400" height="300" rx="16" ry="16"/></clipPath>
  </defs>
  <g clip-path="url(#ad-clip)">
    <rect width="400" height="300" fill="url(#ad-bg)"/>
    <polygon points="200,10 220,50 180,50" fill="#C9A84C" opacity="0.12"/>
    <polygon points="200,10 220,50 180,50" fill="none" stroke="#C9A84C" stroke-width="0.8" opacity="0.30"/>
    <line x1="0" y1="0" x2="80" y2="120" stroke="#C9A84C" stroke-width="0.6" opacity="0.18"/>
    <line x1="0" y1="0" x2="100" y2="110" stroke="#C9A84C" stroke-width="0.6" opacity="0.18"/>
    <line x1="400" y1="0" x2="320" y2="120" stroke="#C9A84C" stroke-width="0.6" opacity="0.18"/>
    <line x1="400" y1="0" x2="300" y2="110" stroke="#C9A84C" stroke-width="0.6" opacity="0.18"/>
    <rect x="40" y="28" width="320" height="1" fill="url(#ad-gold)" opacity="0.60"/>
    <rect x="60" y="32" width="280" height="0.5" fill="url(#ad-gold)" opacity="0.35"/>
    <rect x="0" y="0" width="400" height="26" fill="rgba(250,247,239,0.95)"/>
    <rect x="16" y="9" width="58" height="10" rx="2" fill="#1A1208" opacity="0.75"/>
    <rect x="140" y="10" width="120" height="6" rx="2" fill="#8A7A5A" opacity="0.40"/>
    <rect x="330" y="7" width="56" height="12" rx="2" fill="#C9A84C"/>
    <rect x="0" y="38" width="400" height="124" fill="#1A1208"/>
    <rect x="20" y="44" width="360" height="0.8" fill="url(#ad-gold)" opacity="0.55"/>
    <rect x="20" y="156" width="360" height="0.8" fill="url(#ad-gold)" opacity="0.55"/>
    <rect x="20" y="52" width="100" height="6" rx="1" fill="#C9A84C" opacity="0.70"/>
    <rect x="20" y="64" width="200" height="16" rx="2" fill="#FAF7EF" opacity="0.92"/>
    <rect x="20" y="85" width="170" height="16" rx="2" fill="#FAF7EF" opacity="0.92"/>
    <rect x="20" y="143" width="72" height="16" rx="2" fill="#C9A84C"/>
    <rect x="100" y="143" width="60" height="16" rx="2" fill="none" stroke="#C9A84C" stroke-width="1.2"/>
    <rect x="248" y="50" width="132" height="98" rx="4" fill="rgba(201,168,76,0.08)" stroke="#C9A84C" stroke-width="0.8" opacity="0.60"/>
    <rect x="258" y="64" width="80" height="14" rx="2" fill="#FAF7EF" opacity="0.65"/>
    <rect x="258" y="82" width="100" height="8" rx="2" fill="#FAF7EF" opacity="0.45"/>
    <rect x="0" y="162" width="400" height="100" fill="#FAF7EF"/>
    <rect x="20" y="170" width="110" height="60" rx="4" fill="#FFFFFF" stroke="#C9A84C" stroke-width="0.8" opacity="0.70"/>
    <rect x="28" y="178" width="50" height="8" rx="1" fill="#1A1208" opacity="0.70"/>
    <rect x="28" y="190" width="40" height="18" rx="2" fill="#C9A84C" opacity="0.80"/>
    <rect x="145" y="170" width="110" height="60" rx="4" fill="#1A1208" stroke="#C9A84C" stroke-width="0.8" opacity="0.90"/>
    <rect x="153" y="178" width="50" height="8" rx="1" fill="#FAF7EF" opacity="0.70"/>
    <rect x="153" y="190" width="40" height="18" rx="2" fill="#C9A84C" opacity="0.90"/>
    <rect x="270" y="170" width="110" height="60" rx="4" fill="#FFFFFF" stroke="#C9A84C" stroke-width="0.8" opacity="0.70"/>
    <rect x="278" y="178" width="50" height="8" rx="1" fill="#1A1208" opacity="0.70"/>
    <rect x="278" y="190" width="40" height="18" rx="2" fill="#8A7A5A" opacity="0.70"/>
    <rect width="400" height="300" fill="url(#ad-ov)"/>
    <text x="20" y="256" font-family="'Georgia','Times New Roman',serif" font-size="17" font-weight="700" fill="#FAF7EF" opacity="0.95">Gatsby Gala</text>
    <text x="20" y="274" font-family="'Helvetica Neue','Arial',sans-serif" font-size="11" fill="rgba(250,247,239,0.55)">Art Deco · Luxury Event</text>
    <rect x="20" y="282" width="36" height="12" rx="6" fill="#C9A84C" opacity="0.90"/>
    <text x="27" y="291" font-family="sans-serif" font-size="7" font-weight="700" fill="#1A1208">LIGHT</text>
    <rect x="61" y="282" width="32" height="12" rx="6" fill="rgba(255,255,255,0.13)"/>
    <text x="67" y="291" font-family="sans-serif" font-size="7" font-weight="700" fill="rgba(250,247,239,0.65)">DARK</text>
  </g>
  <rect width="400" height="300" rx="16" ry="16" fill="none" stroke="#C9A84C" stroke-width="1" opacity="0.25"/>
</svg>`


// ═════════════════════════════════════════════════════════════════════════════
// 3. BOLD SUMMIT — Editorial bold typography · Black/White/Lime
// ═════════════════════════════════════════════════════════════════════════════

const SVG_BOLD_SUMMIT = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300">
  <defs>
    <linearGradient id="bs-ov" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0A0A0A" stop-opacity="0"/>
      <stop offset="50%" stop-color="#0A0A0A" stop-opacity="0.48"/>
      <stop offset="100%" stop-color="#0A0A0A" stop-opacity="0.88"/>
    </linearGradient>
    <clipPath id="bs-clip"><rect width="400" height="300" rx="16" ry="16"/></clipPath>
  </defs>
  <g clip-path="url(#bs-clip)">
    <rect width="400" height="300" fill="#FAFAFA"/>
    <rect x="0" y="0" width="400" height="26" fill="#FAFAFA"/>
    <rect x="16" y="8" width="72" height="12" rx="2" fill="#0A0A0A" opacity="0.88"/>
    <rect x="148" y="10" width="104" height="6" rx="2" fill="#6B7280" opacity="0.38"/>
    <rect x="334" y="7" width="50" height="12" rx="2" fill="#0A0A0A"/>
    <rect x="0" y="26" width="400" height="148" fill="#FAFAFA"/>
    <rect x="16" y="36" width="240" height="28" rx="2" fill="#0A0A0A" opacity="0.92"/>
    <rect x="16" y="70" width="200" height="28" rx="2" fill="#0A0A0A" opacity="0.92"/>
    <rect x="16" y="104" width="220" height="28" rx="2" fill="#0A0A0A" opacity="0.92"/>
    <rect x="16" y="136" width="160" height="6" rx="1" fill="#A3E635"/>
    <rect x="16" y="148" width="160" height="5" rx="2" fill="#6B7280" opacity="0.45"/>
    <rect x="272" y="32" width="112" height="136" rx="4" fill="#0A0A0A"/>
    <rect x="280" y="42" width="96" height="52" rx="2" fill="#A3E635" opacity="0.90"/>
    <rect x="280" y="100" width="60" height="10" rx="2" fill="#FAFAFA" opacity="0.60"/>
    <rect x="280" y="114" width="80" height="8" rx="2" fill="#FAFAFA" opacity="0.40"/>
    <rect x="16" y="170" width="76" height="18" rx="2" fill="#0A0A0A"/>
    <rect x="100" y="170" width="64" height="18" rx="2" fill="none" stroke="#0A0A0A" stroke-width="2"/>
    <rect x="0" y="192" width="400" height="6" fill="#0A0A0A"/>
    <rect x="0" y="198" width="400" height="70" fill="#0A0A0A"/>
    <rect x="16" y="208" width="85" height="50" rx="4" fill="#1A1A1A" stroke="rgba(255,255,255,0.10)" stroke-width="1"/>
    <rect x="22" y="216" width="36" height="5" rx="1" fill="#A3E635" opacity="0.85"/>
    <rect x="22" y="226" width="66" height="8" rx="1" fill="#FAFAFA" opacity="0.75"/>
    <rect x="109" y="208" width="85" height="50" rx="4" fill="#A3E635"/>
    <rect x="115" y="216" width="36" height="5" rx="1" fill="#0A0A0A" opacity="0.55"/>
    <rect x="115" y="226" width="66" height="8" rx="1" fill="#0A0A0A" opacity="0.80"/>
    <rect x="202" y="208" width="85" height="50" rx="4" fill="#1A1A1A" stroke="rgba(255,255,255,0.10)" stroke-width="1"/>
    <rect x="208" y="216" width="36" height="5" rx="1" fill="#A3E635" opacity="0.85"/>
    <rect x="295" y="208" width="89" height="50" rx="4" fill="#1A1A1A" stroke="rgba(255,255,255,0.10)" stroke-width="1"/>
    <rect x="301" y="216" width="36" height="5" rx="1" fill="#A3E635" opacity="0.85"/>
    <rect width="400" height="300" fill="url(#bs-ov)"/>
    <text x="20" y="256" font-family="'Helvetica Neue','Arial',sans-serif" font-size="17" font-weight="900" fill="#FAFAFA" opacity="0.95">DesignConf</text>
    <text x="20" y="274" font-family="'Helvetica Neue','Arial',sans-serif" font-size="11" fill="rgba(250,250,250,0.55)">Bold Typography · Design Conference</text>
    <rect x="20" y="282" width="36" height="12" rx="6" fill="#A3E635" opacity="0.90"/>
    <text x="27" y="291" font-family="sans-serif" font-size="7" font-weight="700" fill="#0A0A0A">LIGHT</text>
    <rect x="61" y="282" width="32" height="12" rx="6" fill="rgba(255,255,255,0.14)"/>
    <text x="67" y="291" font-family="sans-serif" font-size="7" font-weight="700" fill="rgba(250,250,250,0.65)">DARK</text>
  </g>
  <rect width="400" height="300" rx="16" ry="16" fill="none" stroke="#0A0A0A" stroke-width="1.5" opacity="0.12"/>
</svg>`


// ═════════════════════════════════════════════════════════════════════════════
// 4. NEUSUMMIT — Soft UI / Neumorphic · Pale grey · Extruded shadows
// ═════════════════════════════════════════════════════════════════════════════

const SVG_NEU_SUMMIT = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300">
  <defs>
    <linearGradient id="ns-ov" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1E2A3A" stop-opacity="0"/>
      <stop offset="55%" stop-color="#1E2A3A" stop-opacity="0.52"/>
      <stop offset="100%" stop-color="#1E2A3A" stop-opacity="0.90"/>
    </linearGradient>
    <filter id="ns-neu" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="-3" dy="-3" stdDeviation="3" flood-color="#FFFFFF" flood-opacity="0.80"/>
      <feDropShadow dx="3"  dy="3"  stdDeviation="3" flood-color="#A3B1C6" flood-opacity="0.45"/>
    </filter>
    <clipPath id="ns-clip"><rect width="400" height="300" rx="16" ry="16"/></clipPath>
  </defs>
  <g clip-path="url(#ns-clip)">
    <rect width="400" height="300" fill="#E0E5EC"/>
    <rect x="0" y="0" width="400" height="28" fill="#E0E5EC"/>
    <rect x="14" y="7" width="80" height="14" rx="7" fill="#E0E5EC" filter="url(#ns-neu)"/>
    <rect x="22" y="10" width="8" height="8" rx="4" fill="#7B9FD4"/>
    <rect x="36" y="11" width="48" height="6" rx="3" fill="#4A5568" opacity="0.60"/>
    <rect x="148" y="11" width="104" height="6" rx="3" fill="#6B7A8D" opacity="0.38"/>
    <rect x="320" y="6" width="66" height="16" rx="8" fill="#E0E5EC" filter="url(#ns-neu)"/>
    <rect x="328" y="10" width="50" height="8" rx="4" fill="#7B9FD4" opacity="0.80"/>
    <rect x="0" y="28" width="400" height="136" fill="#E0E5EC"/>
    <rect x="16" y="36" width="126" height="12" rx="6" fill="#E0E5EC" filter="url(#ns-neu)"/>
    <rect x="24" y="40" width="110" height="4" rx="2" fill="#7B9FD4" opacity="0.75"/>
    <rect x="16" y="54" width="200" height="14" rx="4" fill="#2D3748" opacity="0.80"/>
    <rect x="16" y="73" width="175" height="14" rx="4" fill="#2D3748" opacity="0.80"/>
    <rect x="16" y="92" width="188" height="14" rx="4" fill="#2D3748" opacity="0.80"/>
    <rect x="16" y="114" width="170" height="5" rx="2" fill="#6B7A8D" opacity="0.45"/>
    <rect x="16" y="123" width="150" height="5" rx="2" fill="#6B7A8D" opacity="0.40"/>
    <rect x="16" y="136" width="80" height="20" rx="10" fill="#E0E5EC" filter="url(#ns-neu)"/>
    <rect x="24" y="140" width="64" height="12" rx="6" fill="#7B9FD4"/>
    <rect x="104" y="136" width="70" height="20" rx="10" fill="#E0E5EC" filter="url(#ns-neu)"/>
    <rect x="112" y="143" width="54" height="6" rx="3" fill="#6B7A8D" opacity="0.55"/>
    <rect x="238" y="34" width="144" height="120" rx="14" fill="#E0E5EC" filter="url(#ns-neu)"/>
    <rect x="248" y="44" width="124" height="4" rx="2" fill="#7B9FD4" opacity="0.50"/>
    <rect x="248" y="56" width="70" height="10" rx="3" fill="#2D3748" opacity="0.65"/>
    <rect x="248" y="72" width="55" height="10" rx="3" fill="#2D3748" opacity="0.65"/>
    <rect x="248" y="92" width="44" height="16" rx="8" fill="#E0E5EC" filter="url(#ns-neu)"/>
    <rect x="252" y="96" width="36" height="8" rx="4" fill="#7B9FD4" opacity="0.70"/>
    <rect x="300" y="92" width="44" height="16" rx="8" fill="#E0E5EC" filter="url(#ns-neu)"/>
    <rect x="304" y="96" width="36" height="8" rx="4" fill="#9B8FD4" opacity="0.70"/>
    <rect x="248" y="118" width="110" height="4" rx="2" fill="#6B7A8D" opacity="0.30"/>
    <rect x="248" y="128" width="90" height="4" rx="2" fill="#6B7A8D" opacity="0.25"/>
    <rect x="0" y="164" width="400" height="44" fill="#D5DBE4"/>
    <rect x="0" y="164" width="400" height="1.5" fill="#FFFFFF" opacity="0.60"/>
    <rect x="0" y="207" width="400" height="1.5" fill="#A3B1C6" opacity="0.50"/>
    <rect x="16"  y="172" width="54" height="14" rx="4" fill="#2D3748" opacity="0.75"/>
    <rect x="16"  y="189" width="62" height="5"  rx="2" fill="#6B7A8D" opacity="0.38"/>
    <rect x="114" y="172" width="40" height="14" rx="4" fill="#2D3748" opacity="0.75"/>
    <rect x="114" y="189" width="54" height="5"  rx="2" fill="#6B7A8D" opacity="0.38"/>
    <rect x="212" y="172" width="46" height="14" rx="4" fill="#2D3748" opacity="0.75"/>
    <rect x="212" y="189" width="50" height="5"  rx="2" fill="#6B7A8D" opacity="0.38"/>
    <rect x="310" y="172" width="60" height="14" rx="4" fill="#2D3748" opacity="0.75"/>
    <rect x="310" y="189" width="58" height="5"  rx="2" fill="#6B7A8D" opacity="0.38"/>
    <rect x="0" y="208" width="400" height="60" fill="#E0E5EC"/>
    <rect x="14"  y="214" width="82" height="48" rx="10" fill="#E0E5EC" filter="url(#ns-neu)"/>
    <rect x="22"  y="222" width="24" height="24" rx="12" fill="#7B9FD4" opacity="0.80"/>
    <rect x="22"  y="250" width="58" height="5"  rx="2" fill="#2D3748" opacity="0.65"/>
    <rect x="106" y="214" width="82" height="48" rx="10" fill="#E0E5EC" filter="url(#ns-neu)"/>
    <rect x="114" y="222" width="24" height="24" rx="12" fill="#9B8FD4" opacity="0.80"/>
    <rect x="198" y="214" width="82" height="48" rx="10" fill="#E0E5EC" filter="url(#ns-neu)"/>
    <rect x="206" y="222" width="24" height="24" rx="12" fill="#7BC4D4" opacity="0.80"/>
    <rect x="290" y="214" width="96" height="48" rx="10" fill="#E0E5EC" filter="url(#ns-neu)"/>
    <rect x="298" y="222" width="24" height="24" rx="12" fill="#D4A07B" opacity="0.80"/>
    <rect width="400" height="300" fill="url(#ns-ov)"/>
    <text x="20" y="256" font-family="'Inter','Helvetica Neue',sans-serif" font-size="17" font-weight="700" fill="#FFFFFF" opacity="0.95">NeuSummit</text>
    <text x="20" y="274" font-family="'Inter','Helvetica Neue',sans-serif" font-size="11" fill="rgba(255,255,255,0.55)">Soft UI · Design Conference</text>
    <rect x="20" y="282" width="36" height="12" rx="6" fill="#7B9FD4" opacity="0.90"/>
    <text x="27" y="291" font-family="sans-serif" font-size="7" font-weight="700" fill="#FFFFFF">LIGHT</text>
    <rect x="61" y="282" width="32" height="12" rx="6" fill="rgba(255,255,255,0.14)"/>
    <text x="67" y="291" font-family="sans-serif" font-size="7" font-weight="700" fill="rgba(255,255,255,0.70)">DARK</text>
  </g>
  <rect width="400" height="300" rx="16" ry="16" fill="none" stroke="#7B9FD4" stroke-width="1" opacity="0.28"/>
</svg>`


// ═════════════════════════════════════════════════════════════════════════════
// 5. PLAYFUL GEOMETRIC — Memphis-Group · Violet/Pink/Amber/Emerald
// ═════════════════════════════════════════════════════════════════════════════

const SVG_PLAYFUL_GEOMETRIC = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300">
  <defs>
    <linearGradient id="pg-bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#FFFDF5"/>
      <stop offset="100%" stop-color="#F8F4EC"/>
    </linearGradient>
    <linearGradient id="pg-ov" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0F0E17" stop-opacity="0"/>
      <stop offset="60%" stop-color="#0F0E17" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#0F0E17" stop-opacity="0.85"/>
    </linearGradient>
    <clipPath id="pg-clip"><rect width="400" height="300" rx="16" ry="16"/></clipPath>
  </defs>
  <g clip-path="url(#pg-clip)">
    <rect width="400" height="300" fill="url(#pg-bg)"/>
    <circle cx="60" cy="110" r="130" fill="#FBBF24" opacity="0.18"/>
    <circle cx="370" cy="48" r="42" fill="#F472B6" opacity="0.22"/>
    <circle cx="310" cy="195" r="24" fill="#8B5CF6" opacity="0.30"/>
    <rect x="335" y="220" width="28" height="28" rx="4" fill="#34D399" opacity="0.40"/>
    <rect x="0" y="0" width="400" height="30" fill="#FFFDF5"/>
    <circle cx="22" cy="15" r="7" fill="#8B5CF6" stroke="#1E293B" stroke-width="1.5"/>
    <rect x="35" y="9" width="60" height="12" rx="4" fill="#1E293B" opacity="0.80"/>
    <rect x="140" y="11" width="110" height="8" rx="3" fill="#64748B" opacity="0.40"/>
    <rect x="336" y="8" width="52" height="16" rx="8" fill="#8B5CF6" stroke="#1E293B" stroke-width="1.2"/>
    <rect x="22" y="46" width="180" height="14" rx="4" fill="#1E293B" opacity="0.85"/>
    <rect x="22" y="66" width="155" height="14" rx="4" fill="#1E293B" opacity="0.85"/>
    <rect x="22" y="86" width="140" height="14" rx="4" fill="#1E293B" opacity="0.85"/>
    <rect x="22" y="33" width="105" height="10" rx="5" fill="#8B5CF6" opacity="0.15"/>
    <rect x="29" y="36" width="90" height="4" rx="2" fill="#8B5CF6" opacity="0.80"/>
    <rect x="22" y="134" width="70" height="18" rx="9" fill="#8B5CF6" stroke="#1E293B" stroke-width="1.2"/>
    <rect x="100" y="134" width="60" height="18" rx="9" fill="none" stroke="#1E293B" stroke-width="1.5"/>
    <rect x="230" y="36" width="148" height="120" rx="12" fill="#FFFFFF" stroke="#1E293B" stroke-width="1.5"/>
    <rect x="242" y="45" width="56" height="10" rx="5" fill="#8B5CF6"/>
    <rect x="242" y="62" width="105" height="11" rx="3" fill="#1E293B" opacity="0.80"/>
    <rect x="242" y="78" width="80" height="11" rx="3" fill="#1E293B" opacity="0.80"/>
    <rect x="242" y="100" width="40" height="14" rx="3" fill="#8B5CF6" opacity="0.85"/>
    <rect x="295" y="100" width="50" height="14" rx="3" fill="#F472B6" opacity="0.85"/>
    <rect x="0" y="165" width="400" height="38" fill="#1E293B"/>
    <rect x="22" y="172" width="50" height="12" rx="3" fill="#FBBF24" opacity="0.90"/>
    <rect x="120" y="172" width="40" height="12" rx="3" fill="#F472B6" opacity="0.90"/>
    <rect x="218" y="172" width="40" height="12" rx="3" fill="#34D399" opacity="0.90"/>
    <rect x="316" y="172" width="35" height="12" rx="3" fill="#A78BFA" opacity="0.90"/>
    <rect x="0" y="203" width="400" height="56" fill="#FFFDF5"/>
    <rect x="22" y="210" width="78" height="44" rx="8" fill="#FFFFFF" stroke="#1E293B" stroke-width="1.2"/>
    <circle cx="38" cy="223" r="9" fill="#8B5CF6" stroke="#1E293B" stroke-width="1"/>
    <rect x="32" y="236" width="54" height="7" rx="2" fill="#1E293B" opacity="0.70"/>
    <rect x="108" y="210" width="78" height="44" rx="8" fill="#FFFFFF" stroke="#1E293B" stroke-width="1.2"/>
    <circle cx="124" cy="223" r="9" fill="#F472B6" stroke="#1E293B" stroke-width="1"/>
    <rect x="194" y="210" width="78" height="44" rx="8" fill="#FFFFFF" stroke="#1E293B" stroke-width="1.2"/>
    <circle cx="210" cy="223" r="9" fill="#FBBF24" stroke="#1E293B" stroke-width="1"/>
    <rect x="280" y="210" width="98" height="44" rx="8" fill="#FFFFFF" stroke="#1E293B" stroke-width="1.2"/>
    <circle cx="296" cy="223" r="9" fill="#34D399" stroke="#1E293B" stroke-width="1"/>
    <rect width="400" height="300" fill="url(#pg-ov)"/>
    <text x="22" y="257" font-family="'Outfit','Helvetica Neue',sans-serif" font-size="17" font-weight="800" fill="#FFFFFF" opacity="0.95">PixelFest</text>
    <text x="22" y="276" font-family="'Plus Jakarta Sans','Helvetica Neue',sans-serif" font-size="11" font-weight="500" fill="rgba(255,255,255,0.65)">Playful Geometric · Design Festival</text>
    <rect x="22" y="284" width="36" height="12" rx="6" fill="#8B5CF6" opacity="0.90"/>
    <text x="29" y="293" font-family="sans-serif" font-size="7" font-weight="700" fill="#FFFFFF">LIGHT</text>
    <rect x="63" y="284" width="32" height="12" rx="6" fill="rgba(255,255,255,0.15)"/>
    <text x="69" y="293" font-family="sans-serif" font-size="7" font-weight="700" fill="rgba(255,255,255,0.75)">DARK</text>
  </g>
  <rect width="400" height="300" rx="16" ry="16" fill="none" stroke="#1E293B" stroke-width="1.5" opacity="0.12"/>
</svg>`


// ═════════════════════════════════════════════════════════════════════════════
// 6. VAPORWAVE NEON FEST — Synthwave · Magenta/Cyan/Orange on void black
// ═════════════════════════════════════════════════════════════════════════════

const SVG_VAPORWAVE_FEST = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300">
  <defs>
    <linearGradient id="vw-sun" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#FF9900" stop-opacity="0.28"/>
      <stop offset="100%" stop-color="#FF00FF" stop-opacity="0.12"/>
    </linearGradient>
    <linearGradient id="vw-ov" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#090014" stop-opacity="0"/>
      <stop offset="50%" stop-color="#090014" stop-opacity="0.48"/>
      <stop offset="100%" stop-color="#090014" stop-opacity="0.92"/>
    </linearGradient>
    <clipPath id="vw-clip"><rect width="400" height="300" rx="16" ry="16"/></clipPath>
  </defs>
  <g clip-path="url(#vw-clip)">
    <rect width="400" height="300" fill="#090014"/>
    <circle cx="200" cy="120" r="160" fill="url(#vw-sun)"/>
    <line x1="0" y1="200" x2="400" y2="200" stroke="#FF00FF" stroke-width="0.6" opacity="0.35"/>
    <line x1="0" y1="215" x2="400" y2="215" stroke="#FF00FF" stroke-width="0.5" opacity="0.28"/>
    <line x1="0" y1="232" x2="400" y2="232" stroke="#FF00FF" stroke-width="0.5" opacity="0.22"/>
    <line x1="0" y1="252" x2="400" y2="252" stroke="#FF00FF" stroke-width="0.4" opacity="0.18"/>
    <line x1="0" y1="276" x2="400" y2="276" stroke="#FF00FF" stroke-width="0.4" opacity="0.14"/>
    <line x1="200" y1="150" x2="0"   y2="300" stroke="#FF00FF" stroke-width="0.5" opacity="0.28"/>
    <line x1="200" y1="150" x2="80"  y2="300" stroke="#FF00FF" stroke-width="0.5" opacity="0.22"/>
    <line x1="200" y1="150" x2="160" y2="300" stroke="#FF00FF" stroke-width="0.4" opacity="0.18"/>
    <line x1="200" y1="150" x2="240" y2="300" stroke="#FF00FF" stroke-width="0.4" opacity="0.18"/>
    <line x1="200" y1="150" x2="320" y2="300" stroke="#FF00FF" stroke-width="0.5" opacity="0.22"/>
    <line x1="200" y1="150" x2="400" y2="300" stroke="#FF00FF" stroke-width="0.5" opacity="0.28"/>
    <rect x="0" y="0" width="400" height="24" fill="rgba(9,0,20,0.92)"/>
    <rect x="0" y="23" width="400" height="1" fill="#2D1B4E"/>
    <rect x="14" y="7" width="10" height="10" rx="0" fill="#FF00FF" transform="rotate(45 19 12)"/>
    <rect x="32" y="7" width="58" height="10" rx="0" fill="#00FFFF" opacity="0.85"/>
    <rect x="140" y="9" width="110" height="6" rx="0" fill="#E0E0E0" opacity="0.30"/>
    <rect x="330" y="5" width="56" height="14" rx="0" fill="transparent" stroke="#00FFFF" stroke-width="1"/>
    <rect x="336" y="9" width="44" height="6" rx="0" fill="#00FFFF" opacity="0.80"/>
    <rect x="14" y="32" width="180" height="12" rx="0" fill="rgba(255,153,0,0.10)"/>
    <rect x="18" y="36" width="170" height="4" rx="0" fill="#FF9900" opacity="0.75"/>
    <rect x="14" y="50" width="200" height="22" rx="0" fill="#FF00FF" opacity="0.88"/>
    <rect x="14" y="77" width="220" height="22" rx="0" fill="#00FFFF" opacity="0.88"/>
    <rect x="14" y="108" width="200" height="5" rx="0" fill="#E0E0E0" opacity="0.38"/>
    <rect x="14" y="117" width="180" height="5" rx="0" fill="#E0E0E0" opacity="0.33"/>
    <rect x="14" y="130" width="80" height="18" rx="0" fill="#FF00FF"/>
    <rect x="102" y="130" width="76" height="18" rx="0" fill="transparent" stroke="#00FFFF" stroke-width="1.5"/>
    <rect x="106" y="134" width="64" height="10" rx="0" fill="#00FFFF" opacity="0.75"/>
    <rect x="268" y="38" width="60" height="56" rx="0" fill="rgba(26,16,60,0.85)" stroke="#FF9900" stroke-width="1"/>
    <rect x="274" y="44" width="40" height="22" rx="0" fill="#FF9900" opacity="0.85"/>
    <rect x="274" y="70" width="48" height="5"  rx="0" fill="#E0E0E0" opacity="0.38"/>
    <rect x="334" y="38" width="52" height="56" rx="0" fill="rgba(26,16,60,0.85)" stroke="#FF00FF" stroke-width="1"/>
    <rect x="340" y="44" width="34" height="22" rx="0" fill="#FF00FF" opacity="0.80"/>
    <rect x="0" y="152" width="400" height="46" fill="#0D0022"/>
    <rect x="14"  y="158" width="82" height="34" rx="0" fill="rgba(26,16,60,0.90)" stroke="#FF00FF" stroke-width="1"/>
    <rect x="14"  y="158" width="82" height="20" rx="0" fill="rgba(255,0,255,0.18)"/>
    <rect x="18"  y="180" width="55" height="6"  rx="0" fill="#00FFFF" opacity="0.80"/>
    <rect x="104" y="158" width="82" height="34" rx="0" fill="rgba(26,16,60,0.90)" stroke="#00FFFF" stroke-width="1"/>
    <rect x="104" y="158" width="82" height="20" rx="0" fill="rgba(0,255,255,0.14)"/>
    <rect x="194" y="158" width="82" height="34" rx="0" fill="rgba(26,16,60,0.90)" stroke="#FF9900" stroke-width="1"/>
    <rect x="194" y="158" width="82" height="20" rx="0" fill="rgba(255,153,0,0.14)"/>
    <rect x="284" y="158" width="102" height="34" rx="0" fill="rgba(26,16,60,0.90)" stroke="#FF00FF" stroke-width="1"/>
    <rect width="400" height="300" fill="url(#vw-ov)"/>
    <text x="20" y="256" font-family="'Orbitron','Courier New',monospace" font-size="16" font-weight="900" fill="#00FFFF" opacity="0.95">NEON FEST</text>
    <text x="20" y="274" font-family="'Courier New',monospace" font-size="11" fill="rgba(224,224,224,0.55)">Vaporwave · Synthwave Festival</text>
    <rect x="20" y="282" width="36" height="12" rx="0" fill="#FF00FF" opacity="0.90"/>
    <text x="25" y="291" font-family="sans-serif" font-size="7" font-weight="700" fill="#FFFFFF">DARK</text>
    <rect x="61" y="282" width="36" height="12" rx="0" fill="rgba(255,255,255,0.12)"/>
    <text x="66" y="291" font-family="sans-serif" font-size="7" font-weight="700" fill="rgba(255,255,255,0.65)">LIGHT</text>
  </g>
  <rect width="400" height="300" rx="16" ry="16" fill="none" stroke="#FF00FF" stroke-width="1" opacity="0.30"/>
</svg>`


// ═════════════════════════════════════════════════════════════════════════════
// 7. MINIMALIST MONOCHROME — FORMA · Pure B&W · Playfair serif editorial
// ═════════════════════════════════════════════════════════════════════════════

const SVG_MINIMALIST_MONOCHROME = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300">
  <defs>
    <linearGradient id="mm-ov" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#000000" stop-opacity="0"/>
      <stop offset="50%" stop-color="#000000" stop-opacity="0.42"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.88"/>
    </linearGradient>
    <clipPath id="mm-clip"><rect width="400" height="300" rx="16" ry="16"/></clipPath>
  </defs>
  <g clip-path="url(#mm-clip)">
    <rect width="400" height="300" fill="#FFFFFF"/>
    <line x1="0" y1="60"  x2="400" y2="60"  stroke="#000000" stroke-width="0.3" opacity="0.06"/>
    <line x1="0" y1="90"  x2="400" y2="90"  stroke="#000000" stroke-width="0.3" opacity="0.06"/>
    <line x1="0" y1="120" x2="400" y2="120" stroke="#000000" stroke-width="0.3" opacity="0.06"/>
    <line x1="0" y1="150" x2="400" y2="150" stroke="#000000" stroke-width="0.3" opacity="0.06"/>
    <rect x="0" y="0" width="400" height="24" fill="#FFFFFF"/>
    <rect x="0" y="23" width="400" height="2" fill="#000000"/>
    <rect x="16" y="6" width="58" height="14" rx="0" fill="#000000" opacity="0.88"/>
    <rect x="140" y="10" width="120" height="5" rx="0" fill="#000000" opacity="0.30"/>
    <rect x="334" y="5" width="50" height="14" rx="0" fill="#000000"/>
    <rect x="340" y="9" width="38" height="6" rx="0" fill="#FFFFFF"/>
    <rect x="0" y="25" width="400" height="130" fill="#FFFFFF"/>
    <rect x="14" y="34" width="3" height="36" rx="0" fill="#000000"/>
    <rect x="22" y="34" width="180" height="5" rx="0" fill="#525252" opacity="0.55"/>
    <rect x="14" y="46" width="260" height="28" rx="0" fill="#000000" opacity="0.90"/>
    <rect x="14" y="80" width="290" height="28" rx="0" fill="#000000" opacity="0.90"/>
    <rect x="0" y="114" width="400" height="4" fill="#000000"/>
    <rect x="14" y="122" width="220" height="5" rx="0" fill="#000000" opacity="0.55"/>
    <rect x="14" y="131" width="200" height="5" rx="0" fill="#000000" opacity="0.50"/>
    <rect x="14" y="143" width="90" height="20" rx="0" fill="#000000"/>
    <rect x="112" y="143" width="80" height="20" rx="0" fill="transparent" stroke="#000000" stroke-width="2"/>
    <rect x="0" y="163" width="400" height="48" fill="#000000"/>
    <rect x="16"  y="172" width="52" height="16" rx="0" fill="#FFFFFF" opacity="0.90"/>
    <rect x="16"  y="191" width="60" height="5"  rx="0" fill="#FFFFFF" opacity="0.35"/>
    <rect x="130" y="172" width="1" height="30" fill="#FFFFFF" opacity="0.18"/>
    <rect x="144" y="172" width="46" height="16" rx="0" fill="#FFFFFF" opacity="0.90"/>
    <rect x="144" y="191" width="36" height="5"  rx="0" fill="#FFFFFF" opacity="0.35"/>
    <rect x="248" y="172" width="1" height="30" fill="#FFFFFF" opacity="0.18"/>
    <rect x="262" y="172" width="52" height="16" rx="0" fill="#FFFFFF" opacity="0.90"/>
    <rect x="0" y="211" width="400" height="58" fill="#F5F5F5"/>
    <rect x="14"  y="218" width="82" height="44" rx="0" fill="#FFFFFF" stroke="#000000" stroke-width="1"/>
    <rect x="14"  y="218" width="82" height="28" rx="0" fill="#F5F5F5"/>
    <rect x="18"  y="250" width="55" height="5"  rx="0" fill="#000000" opacity="0.75"/>
    <rect x="104" y="218" width="82" height="44" rx="0" fill="#000000"/>
    <rect x="104" y="218" width="82" height="28" rx="0" fill="#1A1A1A"/>
    <rect x="108" y="250" width="55" height="5"  rx="0" fill="#FFFFFF" opacity="0.80"/>
    <rect x="194" y="218" width="82" height="44" rx="0" fill="#FFFFFF" stroke="#000000" stroke-width="1"/>
    <rect x="194" y="218" width="82" height="28" rx="0" fill="#F5F5F5"/>
    <rect x="284" y="218" width="102" height="44" rx="0" fill="#FFFFFF" stroke="#000000" stroke-width="1"/>
    <rect x="284" y="218" width="102" height="28" rx="0" fill="#F5F5F5"/>
    <rect width="400" height="300" fill="url(#mm-ov)"/>
    <text x="20" y="256" font-family="'Georgia','Times New Roman',serif" font-size="18" font-weight="700" fill="#FFFFFF" opacity="0.96">FORMA</text>
    <text x="20" y="274" font-family="'Courier New',monospace" font-size="11" fill="rgba(255,255,255,0.55)">Minimalist Monochrome · Design Conf</text>
    <rect x="20" y="282" width="36" height="12" rx="0" fill="#FFFFFF" opacity="0.92"/>
    <text x="27" y="291" font-family="sans-serif" font-size="7" font-weight="700" fill="#000000">LIGHT</text>
    <rect x="61" y="282" width="32" height="12" rx="0" fill="rgba(255,255,255,0.14)"/>
    <text x="67" y="291" font-family="sans-serif" font-size="7" font-weight="700" fill="rgba(255,255,255,0.70)">DARK</text>
  </g>
  <rect width="400" height="300" rx="16" ry="16" fill="none" stroke="#000000" stroke-width="1.5" opacity="0.14"/>
</svg>`


// ═════════════════════════════════════════════════════════════════════════════
// 8. FLAT DESIGN — LAUNCHPAD SAAS · Zero shadows · Blue/Emerald/Amber blocks
// ═════════════════════════════════════════════════════════════════════════════

const SVG_FLAT_DESIGN = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300">
  <defs>
    <linearGradient id="fd-ov" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#111827" stop-opacity="0"/>
      <stop offset="55%" stop-color="#111827" stop-opacity="0.50"/>
      <stop offset="100%" stop-color="#111827" stop-opacity="0.88"/>
    </linearGradient>
    <clipPath id="fd-clip"><rect width="400" height="300" rx="16" ry="16"/></clipPath>
  </defs>
  <g clip-path="url(#fd-clip)">
    <rect width="400" height="300" fill="#FFFFFF"/>
    <rect x="0" y="0" width="400" height="28" fill="#FFFFFF"/>
    <rect x="18" y="8" width="12" height="12" rx="3" fill="#3B82F6"/>
    <rect x="36" y="9" width="52" height="10" rx="3" fill="#111827" opacity="0.85"/>
    <rect x="140" y="10" width="110" height="7" rx="2" fill="#6B7280" opacity="0.40"/>
    <rect x="332" y="8" width="50" height="12" rx="3" fill="#3B82F6"/>
    <rect x="0" y="28" width="400" height="138" fill="#3B82F6"/>
    <circle cx="340" cy="65" r="72" fill="rgba(255,255,255,0.08)"/>
    <rect x="18" y="55" width="155" height="14" rx="3" fill="#FFFFFF" opacity="0.92"/>
    <rect x="18" y="74" width="135" height="14" rx="3" fill="#FFFFFF" opacity="0.92"/>
    <rect x="18" y="93" width="148" height="14" rx="3" fill="#FFFFFF" opacity="0.92"/>
    <rect x="18" y="138" width="70" height="20" rx="4" fill="#FFFFFF"/>
    <rect x="96" y="138" width="60" height="20" rx="4" fill="none" stroke="rgba(255,255,255,0.50)" stroke-width="1.5"/>
    <rect x="238" y="38" width="138" height="118" rx="6" fill="#FFFFFF"/>
    <rect x="250" y="48" width="46" height="22" rx="3" fill="#3B82F6" opacity="0.85"/>
    <rect x="300" y="50" width="65" height="18" rx="3" fill="#10B981" opacity="0.80"/>
    <rect x="250" y="78" width="46" height="14" rx="2" fill="#F59E0B" opacity="0.85"/>
    <rect x="300" y="80" width="65" height="14" rx="2" fill="#8B5CF6" opacity="0.75"/>
    <rect x="250" y="110" width="110" height="6" rx="2" fill="#E5E7EB"/>
    <rect x="250" y="110" width="82" height="6" rx="2" fill="#3B82F6"/>
    <rect x="0" y="166" width="400" height="34" fill="#F3F4F6"/>
    <rect x="18" y="173" width="50" height="14" rx="3" fill="#3B82F6" opacity="0.90"/>
    <rect x="110" y="173" width="44" height="14" rx="3" fill="#10B981" opacity="0.90"/>
    <rect x="210" y="173" width="44" height="14" rx="3" fill="#F59E0B" opacity="0.90"/>
    <rect x="310" y="173" width="66" height="14" rx="3" fill="#8B5CF6" opacity="0.80"/>
    <rect x="0" y="200" width="400" height="58" fill="#FFFFFF"/>
    <rect x="18" y="208" width="108" height="44" rx="5" fill="#EFF6FF"/>
    <rect x="28" y="216" width="14" height="14" rx="3" fill="#3B82F6"/>
    <rect x="28" y="234" width="76" height="8" rx="2" fill="#111827" opacity="0.70"/>
    <rect x="146" y="208" width="108" height="44" rx="5" fill="#ECFDF5"/>
    <rect x="156" y="216" width="14" height="14" rx="3" fill="#10B981"/>
    <rect x="274" y="208" width="108" height="44" rx="5" fill="#FFFBEB"/>
    <rect x="284" y="216" width="14" height="14" rx="3" fill="#F59E0B"/>
    <rect width="400" height="300" fill="url(#fd-ov)"/>
    <text x="20" y="255" font-family="'Outfit','Helvetica Neue',sans-serif" font-size="17" font-weight="800" fill="#FFFFFF" opacity="0.95">LaunchPad</text>
    <text x="20" y="274" font-family="'Outfit','Helvetica Neue',sans-serif" font-size="11" font-weight="400" fill="rgba(255,255,255,0.60)">Flat Design · Bold SaaS Landing Page</text>
    <rect x="20" y="282" width="36" height="12" rx="6" fill="#3B82F6" opacity="0.90"/>
    <text x="27" y="291" font-family="sans-serif" font-size="7" font-weight="700" fill="#FFFFFF">LIGHT</text>
    <rect x="61" y="282" width="32" height="12" rx="6" fill="rgba(255,255,255,0.15)"/>
    <text x="67" y="291" font-family="sans-serif" font-size="7" font-weight="700" fill="rgba(255,255,255,0.70)">DARK</text>
  </g>
  <rect width="400" height="300" rx="16" ry="16" fill="none" stroke="#111827" stroke-width="1.5" opacity="0.10"/>
</svg>`


// ═════════════════════════════════════════════════════════════════════════════
// 9. BOTANICAL ORGANIC — VERDANA WELLNESS · Sage/Terracotta · Playfair
// ═════════════════════════════════════════════════════════════════════════════

const SVG_BOTANICAL_ORGANIC = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300">
  <defs>
    <linearGradient id="bo-ov" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#2D3A31" stop-opacity="0"/>
      <stop offset="58%" stop-color="#2D3A31" stop-opacity="0.48"/>
      <stop offset="100%" stop-color="#2D3A31" stop-opacity="0.90"/>
    </linearGradient>
    <clipPath id="bo-clip"><rect width="400" height="300" rx="16" ry="16"/></clipPath>
  </defs>
  <g clip-path="url(#bo-clip)">
    <rect width="400" height="300" fill="#F9F8F4"/>
    <rect x="0" y="0" width="400" height="28" fill="#F9F8F4"/>
    <circle cx="26" cy="14" r="8" fill="#8C9A84"/>
    <rect x="42" y="7" width="58" height="14" rx="3" fill="#2D3A31" opacity="0.80"/>
    <rect x="140" y="10" width="120" height="7" rx="2" fill="#7A8B7F" opacity="0.38"/>
    <rect x="330" y="6" width="60" height="16" rx="8" fill="#2D3A31"/>
    <rect x="240" y="34" width="148" height="146" rx="74" fill="#F2F0EB"/>
    <rect x="18" y="42" width="100" height="7" rx="2" fill="#8C9A84" opacity="0.65"/>
    <rect x="18" y="56" width="160" height="15" rx="3" fill="#2D3A31" opacity="0.88"/>
    <rect x="18" y="76" width="140" height="15" rx="3" fill="#2D3A31" opacity="0.88"/>
    <rect x="18" y="96" width="120" height="15" rx="3" fill="#2D3A31" opacity="0.88"/>
    <rect x="18" y="140" width="78" height="18" rx="9" fill="#2D3A31"/>
    <rect x="104" y="140" width="70" height="18" rx="9" fill="none" stroke="#8C9A84" stroke-width="1.5"/>
    <rect x="258" y="52" width="112" height="72" rx="12" fill="#FFFFFF" opacity="0.92"/>
    <rect x="0" y="180" width="400" height="54" fill="#2D3A31"/>
    <rect x="18" y="190" width="115" height="11" rx="3" fill="#F9F8F4" opacity="0.78"/>
    <rect x="218" y="187" width="72" height="40" rx="8" fill="#8C9A84" opacity="0.90"/>
    <rect x="300" y="187" width="72" height="40" rx="8" fill="#C27B66" opacity="0.90"/>
    <rect x="0" y="234" width="400" height="34" fill="#F9F8F4"/>
    <rect x="18" y="240" width="110" height="22" rx="8" fill="#F2F0EB"/>
    <circle cx="35" cy="250" r="7" fill="#8C9A84"/>
    <rect x="145" y="240" width="110" height="22" rx="8" fill="#FFFFFF" stroke="#E6E2DA" stroke-width="1"/>
    <circle cx="162" cy="250" r="7" fill="#C27B66"/>
    <rect x="272" y="240" width="110" height="22" rx="8" fill="#EEF1EC"/>
    <circle cx="289" cy="250" r="7" fill="#2D3A31"/>
    <rect width="400" height="300" fill="url(#bo-ov)"/>
    <text x="20" y="255" font-family="'Georgia','Times New Roman',serif" font-size="17" font-weight="700" fill="#F9F8F4" opacity="0.95">Verdana</text>
    <text x="20" y="274" font-family="'Helvetica Neue','Arial',sans-serif" font-size="11" fill="rgba(249,248,244,0.60)">Botanical Organic · Wellness &amp; Spa</text>
    <rect x="20" y="282" width="36" height="12" rx="6" fill="#8C9A84" opacity="0.90"/>
    <text x="27" y="291" font-family="sans-serif" font-size="7" font-weight="700" fill="#FFFFFF">LIGHT</text>
    <rect x="61" y="282" width="32" height="12" rx="6" fill="rgba(255,255,255,0.14)"/>
    <text x="67" y="291" font-family="sans-serif" font-size="7" font-weight="700" fill="rgba(249,248,244,0.70)">DARK</text>
  </g>
  <rect width="400" height="300" rx="16" ry="16" fill="none" stroke="#2D3A31" stroke-width="1.5" opacity="0.10"/>
</svg>`


// ═════════════════════════════════════════════════════════════════════════════
// TEMPLATE_THUMBNAILS — single source of truth, keyed by TEMPLATES object key
//
// Every value is a ready-to-use data URI produced by svgToDataUri().
// Consumers can use these directly as <img src={...}> or CSS background-image.
// ═════════════════════════════════════════════════════════════════════════════

export const TEMPLATE_THUMBNAILS = {
  // null for blank canvas — no thumbnail to show
  blank: null,

  // Keys exactly match the TEMPLATES object in template.js
  techSummitTemplate1:           svgToDataUri(SVG_TECHSUMMIT),
  artDecoGala:                   svgToDataUri(SVG_ART_DECO),
  boldSummitTemplate:            svgToDataUri(SVG_BOLD_SUMMIT),
  neuSummitTemplate:             svgToDataUri(SVG_NEU_SUMMIT),
  playfulGeometricTemplate:      svgToDataUri(SVG_PLAYFUL_GEOMETRIC),
  vaporWaveFestTemplate:         svgToDataUri(SVG_VAPORWAVE_FEST),
  minimalistMonochromeTemplate:  svgToDataUri(SVG_MINIMALIST_MONOCHROME),
  flatDesignTemplate:            svgToDataUri(SVG_FLAT_DESIGN),
  botanicalOrganicTemplate:      svgToDataUri(SVG_BOTANICAL_ORGANIC),
}

// ─── Default export for convenience ──────────────────────────────────────────
export default TEMPLATE_THUMBNAILS