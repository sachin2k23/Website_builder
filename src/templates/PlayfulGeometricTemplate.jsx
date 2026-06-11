// ─────────────────────────────────────────────────────────────────────────────
// PlayfulGeometric Template — "PixelFest: Design & Creative Tech Festival"
//
// Design System: Playful Geometric (Memphis-Group inspired)
// Philosophy:    "Stable Grid, Wild Decoration"
// Sections:      Nav · Hero · Stats · About · Speakers · Schedule ·
//                Pricing · Sponsors · Testimonials · CTA · Footer
// Themes:        light (default) · dark
//
// Usage in templates/index.js or template.js:
//   import {
//     playfulGeometricElements,
//     isPlayfulGeometricTemplate,
//     applyPlayfulGeometricTheme,
//     getPlayfulGeometricCanvasFill,
//   } from '../templates/PlayfulGeometricTemplate'
// ─────────────────────────────────────────────────────────────────────────────

import { applySmartResponsive } from '../utils/responsive'

const withResponsive = (elements, width = 1200) =>
  applySmartResponsive(elements, width)

// ─── Design Token Constants ───────────────────────────────────────────────────

// Light palette (default)
const L = {
  bg:           '#FFFDF5',
  bgAlt:        '#F8F4EC',
  card:         '#FFFFFF',
  cardAlt:      '#FFF8F0',
  fg:           '#1E293B',
  fgMuted:      '#64748B',
  accent:       '#8B5CF6',
  accentFg:     '#FFFFFF',
  secondary:    '#F472B6',
  tertiary:     '#FBBF24',
  quaternary:   '#34D399',
  border:       '#1E293B',
  borderLight:  '#E2E8F0',
  muted:        '#F1F5F9',
  violet10:     'rgba(139,92,246,0.10)',
  pink10:       'rgba(244,114,182,0.10)',
  amber10:      'rgba(251,191,36,0.15)',
  green10:      'rgba(52,211,153,0.12)',
  shadow:       '#1E293B',
  pinkShadow:   '#F472B6',
  yellowShadow: '#FBBF24',
}

// Dark palette overrides
const D = {
  bg:           '#0F0E17',
  bgAlt:        '#14131F',
  card:         '#1A1927',
  cardAlt:      '#1E1D2E',
  fg:           '#F0EDFF',
  fgMuted:      '#9B93C8',
  accent:       '#A78BFA',
  accentFg:     '#0F0E17',
  secondary:    '#F9A8D4',
  tertiary:     '#FCD34D',
  quaternary:   '#6EE7B7',
  border:       '#A78BFA',
  borderLight:  '#2D2B45',
  muted:        '#1A1927',
  violet10:     'rgba(167,139,250,0.15)',
  pink10:       'rgba(249,168,212,0.12)',
  amber10:      'rgba(252,211,77,0.12)',
  green10:      'rgba(110,231,183,0.10)',
  shadow:       '#A78BFA',
  pinkShadow:   '#F9A8D4',
  yellowShadow: '#FCD34D',
}

// ─── Base Elements (Light Mode) ───────────────────────────────────────────────

const playfulGeometricBaseElements = [

  // ══ NAVIGATION ══════════════════════════════════════════════════════════════
  { id: 'pg-nav-bg', type: 'container', name: 'Navigation Bar', x: 0, y: 0, width: 1200, height: 80, fill: L.bg, borderColor: L.borderLight, radius: 0, opacity: 100 },
  { id: 'pg-nav-logo-dot', type: 'container', name: 'Logo Dot', x: 48, y: 24, width: 32, height: 32, fill: L.accent, borderColor: L.border, radius: 9999, opacity: 100 },
  { id: 'pg-nav-logo', type: 'heading', name: 'Logo Text', x: 90, y: 24, width: 160, height: 34, content: 'PixelFest', fontSize: 22, fontWeight: 800, fontFamily: 'Outfit', textColor: L.fg, opacity: 100 },
  { id: 'pg-nav-links', type: 'paragraph', name: 'Navigation Links', x: 400, y: 28, width: 400, height: 24, content: 'About     Speakers     Schedule     Tickets', fontSize: 14, fontWeight: 500, fontFamily: 'Plus Jakarta Sans', textColor: L.fgMuted, textAlign: 'center', opacity: 100 },
  { id: 'pg-nav-cta', type: 'button', name: 'Nav CTA', x: 1020, y: 18, width: 130, height: 44, content: 'Get Tickets', fill: L.accent, textColor: L.accentFg, fontSize: 13, fontWeight: 700, fontFamily: 'Outfit', borderColor: L.border, radius: 9999, opacity: 100 },

  // ══ HERO SECTION ════════════════════════════════════════════════════════════
  { id: 'pg-hero-bg', type: 'container', name: 'Hero Section', x: 0, y: 80, width: 1200, height: 680, fill: L.bg, radius: 0, opacity: 100 },
  { id: 'pg-hero-chip', type: 'label', name: 'Hero Eyebrow', x: 76, y: 148, width: 320, height: 32, content: '✦ SEPT 19–21, 2026 / AMSTERDAM', fontSize: 12, fontWeight: 700, fontFamily: 'Outfit', textColor: L.accent, fill: L.violet10, radius: 9999, opacity: 100 },
  { id: 'pg-hero-title', type: 'heading', name: 'Hero Title', x: 72, y: 202, width: 680, height: 220, content: 'Where design\nmeets the future\nof technology.', fontSize: 64, fontWeight: 800, fontFamily: 'Outfit', textColor: L.fg, lineHeight: 1.06, opacity: 100 },
  { id: 'pg-hero-desc', type: 'paragraph', name: 'Hero Description', x: 76, y: 448, width: 520, height: 72, content: 'Three days of bold ideas, hands-on workshops, and the creative minds shaping tomorrow\'s digital world.', fontSize: 18, fontWeight: 400, fontFamily: 'Plus Jakarta Sans', textColor: L.fgMuted, lineHeight: 1.65, opacity: 100 },
  { id: 'pg-hero-primary', type: 'button', name: 'Primary CTA', x: 76, y: 554, width: 180, height: 52, content: 'Reserve Your Spot', fill: L.accent, textColor: L.accentFg, fontSize: 15, fontWeight: 700, fontFamily: 'Outfit', borderColor: L.border, radius: 9999, opacity: 100 },
  { id: 'pg-hero-secondary', type: 'button', name: 'Secondary CTA', x: 274, y: 554, width: 160, height: 52, content: 'View Schedule', fill: 'transparent', textColor: L.fg, fontSize: 15, fontWeight: 700, fontFamily: 'Outfit', borderColor: L.border, radius: 9999, opacity: 100 },

  // ══ STATS BAND ══════════════════════════════════════════════════════════════
  { id: 'pg-stats-bg', type: 'container', name: 'Stats Band', x: 0, y: 760, width: 1200, height: 140, fill: L.fg, radius: 0, opacity: 100 },
  { id: 'pg-stat-1', type: 'heading', name: 'Stat 1', x: 100, y: 786, width: 200, height: 48, content: '3 Days', fontSize: 36, fontWeight: 800, fontFamily: 'Outfit', textColor: L.tertiary, opacity: 100 },
  { id: 'pg-stat-1-label', type: 'paragraph', name: 'Stat 1 Label', x: 100, y: 838, width: 200, height: 22, content: 'of immersive programming', fontSize: 13, fontFamily: 'Plus Jakarta Sans', textColor: 'rgba(255,255,255,0.55)', opacity: 100 },
  { id: 'pg-stat-2', type: 'heading', name: 'Stat 2', x: 380, y: 786, width: 200, height: 48, content: '60+', fontSize: 36, fontWeight: 800, fontFamily: 'Outfit', textColor: L.secondary, opacity: 100 },
  { id: 'pg-stat-2-label', type: 'paragraph', name: 'Stat 2 Label', x: 380, y: 838, width: 200, height: 22, content: 'talks & workshops', fontSize: 13, fontFamily: 'Plus Jakarta Sans', textColor: 'rgba(255,255,255,0.55)', opacity: 100 },
  { id: 'pg-stat-3', type: 'heading', name: 'Stat 3', x: 660, y: 786, width: 200, height: 48, content: '20+', fontSize: 36, fontWeight: 800, fontFamily: 'Outfit', textColor: L.quaternary, opacity: 100 },
  { id: 'pg-stat-3-label', type: 'paragraph', name: 'Stat 3 Label', x: 660, y: 838, width: 200, height: 22, content: 'countries represented', fontSize: 13, fontFamily: 'Plus Jakarta Sans', textColor: 'rgba(255,255,255,0.55)', opacity: 100 },
  { id: 'pg-stat-4', type: 'heading', name: 'Stat 4', x: 940, y: 786, width: 200, height: 48, content: '8yr', fontSize: 36, fontWeight: 800, fontFamily: 'Outfit', textColor: L.accent, opacity: 100 },
  { id: 'pg-stat-4-label', type: 'paragraph', name: 'Stat 4 Label', x: 940, y: 838, width: 200, height: 22, content: 'running strong', fontSize: 13, fontFamily: 'Plus Jakarta Sans', textColor: 'rgba(255,255,255,0.55)', opacity: 100 },

  // ══ ABOUT / OVERVIEW ════════════════════════════════════════════════════════
  { id: 'pg-about-bg', type: 'container', name: 'About Section', x: 0, y: 900, width: 1200, height: 520, fill: L.bgAlt, radius: 0, opacity: 100 },
  { id: 'pg-about-kicker', type: 'label', name: 'About Kicker', x: 100, y: 960, width: 160, height: 28, content: '✦ ABOUT', fontSize: 11, fontWeight: 800, fontFamily: 'Outfit', textColor: L.accent, fill: L.violet10, radius: 9999, opacity: 100 },
  { id: 'pg-about-title', type: 'heading', name: 'About Heading', x: 100, y: 1006, width: 540, height: 110, content: 'The festival built\nfor creative builders.', fontSize: 48, fontWeight: 800, fontFamily: 'Outfit', textColor: L.fg, lineHeight: 1.1, opacity: 100 },
  { id: 'pg-about-copy', type: 'paragraph', name: 'About Body', x: 100, y: 1132, width: 480, height: 100, content: 'PixelFest brings together designers, engineers, directors, and founders who believe that the best products live at the intersection of craft and code. Each edition curates a programme of talks, hands-on labs, and open studios across three thrilling days.', fontSize: 16, fontFamily: 'Plus Jakarta Sans', textColor: L.fgMuted, lineHeight: 1.7, opacity: 100 },
  { id: 'pg-about-link', type: 'button', name: 'About Learn More', x: 100, y: 1260, width: 160, height: 46, content: 'Our Story →', fill: 'transparent', textColor: L.fg, fontSize: 14, fontWeight: 700, fontFamily: 'Outfit', borderColor: L.border, radius: 9999, opacity: 100 },
  { id: 'pg-about-card-1', type: 'container', name: 'About Feature Card 1', x: 688, y: 960, width: 220, height: 180, fill: L.accent, borderColor: L.border, radius: 20, opacity: 100 },
  { id: 'pg-about-card-1-title', type: 'heading', name: 'Feature 1 Title', x: 716, y: 996, width: 164, height: 56, content: 'Design\nTalks', fontSize: 28, fontWeight: 800, fontFamily: 'Outfit', textColor: L.accentFg, lineHeight: 1.1, opacity: 100 },
  { id: 'pg-about-card-1-copy', type: 'paragraph', name: 'Feature 1 Copy', x: 716, y: 1064, width: 164, height: 52, content: 'World-class speakers, cutting-edge ideas.', fontSize: 13, fontFamily: 'Plus Jakarta Sans', textColor: 'rgba(255,255,255,0.75)', lineHeight: 1.5, opacity: 100 },
  { id: 'pg-about-card-2', type: 'container', name: 'About Feature Card 2', x: 928, y: 960, width: 220, height: 180, fill: L.tertiary, borderColor: L.border, radius: 20, opacity: 100 },
  { id: 'pg-about-card-2-title', type: 'heading', name: 'Feature 2 Title', x: 956, y: 996, width: 164, height: 56, content: 'Live\nLabs', fontSize: 28, fontWeight: 800, fontFamily: 'Outfit', textColor: L.fg, lineHeight: 1.1, opacity: 100 },
  { id: 'pg-about-card-2-copy', type: 'paragraph', name: 'Feature 2 Copy', x: 956, y: 1064, width: 164, height: 52, content: 'Hands-on sessions. Real tools. Real output.', fontSize: 13, fontFamily: 'Plus Jakarta Sans', textColor: L.fgMuted, lineHeight: 1.5, opacity: 100 },
  { id: 'pg-about-card-3', type: 'container', name: 'About Feature Card 3', x: 688, y: 1160, width: 220, height: 180, fill: L.secondary, borderColor: L.border, radius: 20, opacity: 100 },
  { id: 'pg-about-card-3-title', type: 'heading', name: 'Feature 3 Title', x: 716, y: 1196, width: 164, height: 56, content: 'Open\nStudios', fontSize: 28, fontWeight: 800, fontFamily: 'Outfit', textColor: L.accentFg, lineHeight: 1.1, opacity: 100 },
  { id: 'pg-about-card-3-copy', type: 'paragraph', name: 'Feature 3 Copy', x: 716, y: 1264, width: 164, height: 52, content: 'Critique, collaborate, and ship together.', fontSize: 13, fontFamily: 'Plus Jakarta Sans', textColor: 'rgba(255,255,255,0.80)', lineHeight: 1.5, opacity: 100 },
  { id: 'pg-about-card-4', type: 'container', name: 'About Feature Card 4', x: 928, y: 1160, width: 220, height: 180, fill: L.quaternary, borderColor: L.border, radius: 20, opacity: 100 },
  { id: 'pg-about-card-4-title', type: 'heading', name: 'Feature 4 Title', x: 956, y: 1196, width: 164, height: 56, content: 'Night\nEvents', fontSize: 28, fontWeight: 800, fontFamily: 'Outfit', textColor: L.fg, lineHeight: 1.1, opacity: 100 },
  { id: 'pg-about-card-4-copy', type: 'paragraph', name: 'Feature 4 Copy', x: 956, y: 1264, width: 164, height: 52, content: 'Showcases, jams, and curated socials.', fontSize: 13, fontFamily: 'Plus Jakarta Sans', textColor: L.fgMuted, lineHeight: 1.5, opacity: 100 },

  // ══ SPEAKERS ════════════════════════════════════════════════════════════════
  { id: 'pg-speakers-bg', type: 'container', name: 'Speakers Section', x: 0, y: 1420, width: 1200, height: 620, fill: L.bg, radius: 0, opacity: 100 },
  { id: 'pg-speakers-kicker', type: 'label', name: 'Speakers Kicker', x: 100, y: 1480, width: 170, height: 28, content: '✦ SPEAKERS', fontSize: 11, fontWeight: 800, fontFamily: 'Outfit', textColor: L.secondary, fill: L.pink10, radius: 9999, opacity: 100 },
  { id: 'pg-speakers-title', type: 'heading', name: 'Speakers Heading', x: 100, y: 1524, width: 600, height: 66, content: 'Voices that move the industry.', fontSize: 46, fontWeight: 800, fontFamily: 'Outfit', textColor: L.fg, lineHeight: 1.1, opacity: 100 },
  // Speaker 1
  { id: 'pg-speaker-card-1', type: 'container', name: 'Speaker Card 1', x: 100, y: 1632, width: 240, height: 270, fill: L.card, borderColor: L.border, radius: 20, opacity: 100 },
  { id: 'pg-spk-1-avatar', type: 'container', name: 'Speaker 1 Avatar', x: 130, y: 1652, width: 64, height: 64, fill: L.accent, borderColor: L.border, radius: 9999, opacity: 100 },
  { id: 'pg-spk-1-name', type: 'heading', name: 'Speaker 1 Name', x: 130, y: 1732, width: 180, height: 34, content: 'Mia Fontaine', fontSize: 20, fontWeight: 800, fontFamily: 'Outfit', textColor: L.fg, opacity: 100 },
  { id: 'pg-spk-1-role', type: 'paragraph', name: 'Speaker 1 Role', x: 130, y: 1770, width: 180, height: 44, content: 'Design Director\nFigma', fontSize: 13, fontFamily: 'Plus Jakarta Sans', textColor: L.fgMuted, lineHeight: 1.55, opacity: 100 },
  { id: 'pg-spk-1-tag', type: 'label', name: 'Speaker 1 Tag', x: 130, y: 1836, width: 110, height: 24, content: 'Design Systems', fontSize: 10, fontWeight: 700, fontFamily: 'Outfit', textColor: L.accent, fill: L.violet10, radius: 9999, opacity: 100 },
  // Speaker 2
  { id: 'pg-speaker-card-2', type: 'container', name: 'Speaker Card 2', x: 360, y: 1632, width: 240, height: 270, fill: L.card, borderColor: L.border, radius: 20, opacity: 100 },
  { id: 'pg-spk-2-avatar', type: 'container', name: 'Speaker 2 Avatar', x: 390, y: 1652, width: 64, height: 64, fill: L.secondary, borderColor: L.border, radius: 9999, opacity: 100 },
  { id: 'pg-spk-2-name', type: 'heading', name: 'Speaker 2 Name', x: 390, y: 1732, width: 180, height: 34, content: 'Ryo Tanaka', fontSize: 20, fontWeight: 800, fontFamily: 'Outfit', textColor: L.fg, opacity: 100 },
  { id: 'pg-spk-2-role', type: 'paragraph', name: 'Speaker 2 Role', x: 390, y: 1770, width: 180, height: 44, content: 'Creative Director\nSony Global Design', fontSize: 13, fontFamily: 'Plus Jakarta Sans', textColor: L.fgMuted, lineHeight: 1.55, opacity: 100 },
  { id: 'pg-spk-2-tag', type: 'label', name: 'Speaker 2 Tag', x: 390, y: 1836, width: 130, height: 24, content: 'Product Futures', fontSize: 10, fontWeight: 700, fontFamily: 'Outfit', textColor: L.secondary, fill: L.pink10, radius: 9999, opacity: 100 },
  // Speaker 3
  { id: 'pg-speaker-card-3', type: 'container', name: 'Speaker Card 3', x: 620, y: 1632, width: 240, height: 270, fill: L.card, borderColor: L.border, radius: 20, opacity: 100 },
  { id: 'pg-spk-3-avatar', type: 'container', name: 'Speaker 3 Avatar', x: 650, y: 1652, width: 64, height: 64, fill: L.tertiary, borderColor: L.border, radius: 9999, opacity: 100 },
  { id: 'pg-spk-3-name', type: 'heading', name: 'Speaker 3 Name', x: 650, y: 1732, width: 180, height: 34, content: 'Amara Osei', fontSize: 20, fontWeight: 800, fontFamily: 'Outfit', textColor: L.fg, opacity: 100 },
  { id: 'pg-spk-3-role', type: 'paragraph', name: 'Speaker 3 Role', x: 650, y: 1770, width: 180, height: 44, content: 'AI Research Lead\nAdobe', fontSize: 13, fontFamily: 'Plus Jakarta Sans', textColor: L.fgMuted, lineHeight: 1.55, opacity: 100 },
  { id: 'pg-spk-3-tag', type: 'label', name: 'Speaker 3 Tag', x: 650, y: 1836, width: 130, height: 24, content: 'Generative AI', fontSize: 10, fontWeight: 700, fontFamily: 'Outfit', textColor: L.fg, fill: L.amber10, radius: 9999, opacity: 100 },
  // Speaker 4
  { id: 'pg-speaker-card-4', type: 'container', name: 'Speaker Card 4', x: 880, y: 1632, width: 240, height: 270, fill: L.card, borderColor: L.border, radius: 20, opacity: 100 },
  { id: 'pg-spk-4-avatar', type: 'container', name: 'Speaker 4 Avatar', x: 910, y: 1652, width: 64, height: 64, fill: L.quaternary, borderColor: L.border, radius: 9999, opacity: 100 },
  { id: 'pg-spk-4-name', type: 'heading', name: 'Speaker 4 Name', x: 910, y: 1732, width: 180, height: 34, content: 'Lena Bauer', fontSize: 20, fontWeight: 800, fontFamily: 'Outfit', textColor: L.fg, opacity: 100 },
  { id: 'pg-spk-4-role', type: 'paragraph', name: 'Speaker 4 Role', x: 910, y: 1770, width: 180, height: 44, content: 'Founder\nStudio Bloom', fontSize: 13, fontFamily: 'Plus Jakarta Sans', textColor: L.fgMuted, lineHeight: 1.55, opacity: 100 },
  { id: 'pg-spk-4-tag', type: 'label', name: 'Speaker 4 Tag', x: 910, y: 1836, width: 120, height: 24, content: 'Brand & Motion', fontSize: 10, fontWeight: 700, fontFamily: 'Outfit', textColor: '#0a7754', fill: L.green10, radius: 9999, opacity: 100 },

  // ══ SCHEDULE ════════════════════════════════════════════════════════════════
  { id: 'pg-schedule-bg', type: 'container', name: 'Schedule Section', x: 0, y: 2040, width: 1200, height: 560, fill: L.bgAlt, radius: 0, opacity: 100 },
  { id: 'pg-schedule-kicker', type: 'label', name: 'Schedule Kicker', x: 100, y: 2100, width: 160, height: 28, content: '✦ SCHEDULE', fontSize: 11, fontWeight: 800, fontFamily: 'Outfit', textColor: L.tertiary, fill: L.amber10, radius: 9999, opacity: 100 },
  { id: 'pg-schedule-title', type: 'heading', name: 'Schedule Heading', x: 100, y: 2144, width: 560, height: 64, content: 'Three days. Packed programme.', fontSize: 44, fontWeight: 800, fontFamily: 'Outfit', textColor: L.fg, lineHeight: 1.1, opacity: 100 },
  { id: 'pg-agenda-card', type: 'container', name: 'Agenda Card', x: 100, y: 2244, width: 1000, height: 280, fill: L.card, borderColor: L.border, radius: 20, opacity: 100 },
  { id: 'pg-agenda-1-day', type: 'label', name: 'Day 1 Label', x: 140, y: 2272, width: 80, height: 24, content: 'DAY 1', fontSize: 10, fontWeight: 800, fontFamily: 'Outfit', textColor: L.accent, fill: L.violet10, radius: 9999, opacity: 100 },
  { id: 'pg-agenda-1-time', type: 'paragraph', name: 'Agenda 1 Time', x: 140, y: 2302, width: 80, height: 22, content: '10:00 AM', fontSize: 12, fontWeight: 700, fontFamily: 'Outfit', textColor: L.accent, opacity: 100 },
  { id: 'pg-agenda-1-title', type: 'heading', name: 'Agenda 1 Title', x: 260, y: 2296, width: 660, height: 36, content: 'Opening Ceremony: Welcome to the Edge of Tomorrow', fontSize: 22, fontWeight: 800, fontFamily: 'Outfit', textColor: L.fg, opacity: 100 },
  { id: 'pg-agenda-2-time', type: 'paragraph', name: 'Agenda 2 Time', x: 140, y: 2362, width: 80, height: 22, content: '01:30 PM', fontSize: 12, fontWeight: 700, fontFamily: 'Outfit', textColor: L.secondary, opacity: 100 },
  { id: 'pg-agenda-2-title', type: 'heading', name: 'Agenda 2 Title', x: 260, y: 2356, width: 660, height: 36, content: 'Workshop: Designing with AI — From Prompt to Product', fontSize: 22, fontWeight: 800, fontFamily: 'Outfit', textColor: L.fg, opacity: 100 },
  { id: 'pg-agenda-3-time', type: 'paragraph', name: 'Agenda 3 Time', x: 140, y: 2422, width: 80, height: 22, content: '04:00 PM', fontSize: 12, fontWeight: 700, fontFamily: 'Outfit', textColor: L.tertiary, opacity: 100 },
  { id: 'pg-agenda-3-title', type: 'heading', name: 'Agenda 3 Title', x: 260, y: 2416, width: 660, height: 36, content: 'Panel: The Great Design Convergence', fontSize: 22, fontWeight: 800, fontFamily: 'Outfit', textColor: L.fg, opacity: 100 },
  { id: 'pg-agenda-4-time', type: 'paragraph', name: 'Agenda 4 Time', x: 140, y: 2482, width: 80, height: 22, content: '07:00 PM', fontSize: 12, fontWeight: 700, fontFamily: 'Outfit', textColor: L.quaternary, opacity: 100 },
  { id: 'pg-agenda-4-title', type: 'heading', name: 'Agenda 4 Title', x: 260, y: 2476, width: 660, height: 36, content: 'Opening Night Showcase & Studio Party', fontSize: 22, fontWeight: 800, fontFamily: 'Outfit', textColor: L.fg, opacity: 100 },

  // ══ PRICING / TICKETS ═══════════════════════════════════════════════════════
  { id: 'pg-pricing-bg', type: 'container', name: 'Pricing Section', x: 0, y: 2600, width: 1200, height: 620, fill: L.bg, radius: 0, opacity: 100 },
  { id: 'pg-pricing-kicker', type: 'label', name: 'Pricing Kicker', x: 100, y: 2660, width: 140, height: 28, content: '✦ TICKETS', fontSize: 11, fontWeight: 800, fontFamily: 'Outfit', textColor: L.quaternary, fill: L.green10, radius: 9999, opacity: 100 },
  { id: 'pg-pricing-title', type: 'heading', name: 'Pricing Heading', x: 100, y: 2704, width: 560, height: 66, content: 'Pick your pass and join us.', fontSize: 46, fontWeight: 800, fontFamily: 'Outfit', textColor: L.fg, lineHeight: 1.1, opacity: 100 },
  // Explorer ticket
  { id: 'pg-ticket-card-1', type: 'container', name: 'Explorer Ticket', x: 100, y: 2808, width: 300, height: 300, fill: L.card, borderColor: L.border, radius: 20, opacity: 100 },
  { id: 'pg-ticket-1-title', type: 'heading', name: 'Explorer Title', x: 132, y: 2844, width: 236, height: 36, content: 'Explorer', fontSize: 26, fontWeight: 800, fontFamily: 'Outfit', textColor: L.fg, opacity: 100 },
  { id: 'pg-ticket-1-price', type: 'heading', name: 'Explorer Price', x: 132, y: 2894, width: 220, height: 56, content: '€249', fontSize: 44, fontWeight: 800, fontFamily: 'Outfit', textColor: L.accent, opacity: 100 },
  { id: 'pg-ticket-1-copy', type: 'paragraph', name: 'Explorer Copy', x: 132, y: 2962, width: 236, height: 72, content: 'General access, exhibition floor, and all recorded talks after the event.', fontSize: 14, fontFamily: 'Plus Jakarta Sans', textColor: L.fgMuted, lineHeight: 1.55, opacity: 100 },
  { id: 'pg-ticket-1-btn', type: 'button', name: 'Explorer Button', x: 132, y: 3060, width: 140, height: 40, content: 'Get Pass', fill: 'transparent', textColor: L.fg, fontSize: 13, fontWeight: 700, fontFamily: 'Outfit', borderColor: L.border, radius: 9999, opacity: 100 },
  // Creator ticket (featured)
  { id: 'pg-ticket-card-2', type: 'container', name: 'Creator Ticket', x: 450, y: 2786, width: 300, height: 340, fill: L.accent, borderColor: L.border, radius: 20, opacity: 100 },
  { id: 'pg-ticket-2-badge', type: 'label', name: 'Most Popular Badge', x: 490, y: 2810, width: 140, height: 28, content: '★ MOST POPULAR', fontSize: 10, fontWeight: 800, fontFamily: 'Outfit', textColor: L.fg, fill: L.tertiary, radius: 9999, opacity: 100 },
  { id: 'pg-ticket-2-title', type: 'heading', name: 'Creator Title', x: 482, y: 2858, width: 236, height: 36, content: 'Creator', fontSize: 26, fontWeight: 800, fontFamily: 'Outfit', textColor: L.accentFg, opacity: 100 },
  { id: 'pg-ticket-2-price', type: 'heading', name: 'Creator Price', x: 482, y: 2906, width: 220, height: 56, content: '€499', fontSize: 44, fontWeight: 800, fontFamily: 'Outfit', textColor: L.tertiary, opacity: 100 },
  { id: 'pg-ticket-2-copy', type: 'paragraph', name: 'Creator Copy', x: 482, y: 2976, width: 236, height: 88, content: 'Everything in Explorer, plus all workshops, priority seating, swag kit, and VIP welcome drinks.', fontSize: 14, fontFamily: 'Plus Jakarta Sans', textColor: 'rgba(255,255,255,0.80)', lineHeight: 1.55, opacity: 100 },
  { id: 'pg-ticket-2-btn', type: 'button', name: 'Creator Button', x: 482, y: 3080, width: 150, height: 40, content: 'Get Pass', fill: L.accentFg, textColor: L.accent, fontSize: 13, fontWeight: 700, fontFamily: 'Outfit', borderColor: L.fg, radius: 9999, opacity: 100 },
  // Studio ticket
  { id: 'pg-ticket-card-3', type: 'container', name: 'Studio Ticket', x: 800, y: 2808, width: 300, height: 300, fill: L.card, borderColor: L.border, radius: 20, opacity: 100 },
  { id: 'pg-ticket-3-title', type: 'heading', name: 'Studio Title', x: 832, y: 2844, width: 236, height: 36, content: 'Studio', fontSize: 26, fontWeight: 800, fontFamily: 'Outfit', textColor: L.fg, opacity: 100 },
  { id: 'pg-ticket-3-price', type: 'heading', name: 'Studio Price', x: 832, y: 2894, width: 220, height: 56, content: '€999', fontSize: 44, fontWeight: 800, fontFamily: 'Outfit', textColor: L.secondary, opacity: 100 },
  { id: 'pg-ticket-3-copy', type: 'paragraph', name: 'Studio Copy', x: 832, y: 2962, width: 236, height: 72, content: 'Full access plus private roundtables, founder dinners, and dedicated concierge support.', fontSize: 14, fontFamily: 'Plus Jakarta Sans', textColor: L.fgMuted, lineHeight: 1.55, opacity: 100 },
  { id: 'pg-ticket-3-btn', type: 'button', name: 'Studio Button', x: 832, y: 3060, width: 140, height: 40, content: 'Get Pass', fill: 'transparent', textColor: L.fg, fontSize: 13, fontWeight: 700, fontFamily: 'Outfit', borderColor: L.border, radius: 9999, opacity: 100 },

  // ══ SPONSORS / PARTNERS ══════════════════════════════════════════════════════
  { id: 'pg-sponsors-bg', type: 'container', name: 'Sponsors Section', x: 0, y: 3220, width: 1200, height: 260, fill: L.bgAlt, radius: 0, opacity: 100 },
  { id: 'pg-sponsors-kicker', type: 'label', name: 'Sponsors Kicker', x: 100, y: 3270, width: 130, height: 28, content: 'OUR PARTNERS', fontSize: 11, fontWeight: 800, fontFamily: 'Outfit', textColor: L.fgMuted, fill: L.muted, radius: 9999, opacity: 100 },
  { id: 'pg-sponsor-1', type: 'heading', name: 'Sponsor 1', x: 100, y: 3340, width: 160, height: 40, content: 'Figma', fontSize: 28, fontWeight: 800, fontFamily: 'Outfit', textColor: L.fgMuted, opacity: 60 },
  { id: 'pg-sponsor-2', type: 'heading', name: 'Sponsor 2', x: 300, y: 3340, width: 160, height: 40, content: 'Vercel', fontSize: 28, fontWeight: 800, fontFamily: 'Outfit', textColor: L.fgMuted, opacity: 60 },
  { id: 'pg-sponsor-3', type: 'heading', name: 'Sponsor 3', x: 500, y: 3340, width: 160, height: 40, content: 'Linear', fontSize: 28, fontWeight: 800, fontFamily: 'Outfit', textColor: L.fgMuted, opacity: 60 },
  { id: 'pg-sponsor-4', type: 'heading', name: 'Sponsor 4', x: 700, y: 3340, width: 160, height: 40, content: 'Framer', fontSize: 28, fontWeight: 800, fontFamily: 'Outfit', textColor: L.fgMuted, opacity: 60 },
  { id: 'pg-sponsor-5', type: 'heading', name: 'Sponsor 5', x: 900, y: 3340, width: 200, height: 40, content: 'Lottiefiles', fontSize: 28, fontWeight: 800, fontFamily: 'Outfit', textColor: L.fgMuted, opacity: 60 },

  // ══ TESTIMONIALS ═════════════════════════════════════════════════════════════
  { id: 'pg-testi-bg', type: 'container', name: 'Testimonials Section', x: 0, y: 3480, width: 1200, height: 520, fill: L.bg, radius: 0, opacity: 100 },
  { id: 'pg-testi-kicker', type: 'label', name: 'Testimonials Kicker', x: 100, y: 3540, width: 180, height: 28, content: '✦ WHAT THEY SAY', fontSize: 11, fontWeight: 800, fontFamily: 'Outfit', textColor: L.accent, fill: L.violet10, radius: 9999, opacity: 100 },
  { id: 'pg-testi-title', type: 'heading', name: 'Testimonials Heading', x: 100, y: 3584, width: 560, height: 64, content: 'Loved by the community.', fontSize: 46, fontWeight: 800, fontFamily: 'Outfit', textColor: L.fg, lineHeight: 1.1, opacity: 100 },
  // Card 1
  { id: 'pg-testi-card-1', type: 'container', name: 'Testimonial Card 1', x: 100, y: 3680, width: 320, height: 240, fill: L.card, borderColor: L.border, radius: 20, opacity: 100 },
  { id: 'pg-testi-1-quote', type: 'paragraph', name: 'Testimonial 1 Quote', x: 130, y: 3712, width: 260, height: 108, content: '"PixelFest changed how I think about design craft. The speakers, the labs, the people — nothing else comes close."', fontSize: 15, fontFamily: 'Plus Jakarta Sans', textColor: L.fg, lineHeight: 1.65, opacity: 100 },
  { id: 'pg-testi-1-name', type: 'heading', name: 'Testimonial 1 Name', x: 130, y: 3840, width: 260, height: 28, content: 'Sara K.', fontSize: 16, fontWeight: 800, fontFamily: 'Outfit', textColor: L.accent, opacity: 100 },
  { id: 'pg-testi-1-role', type: 'paragraph', name: 'Testimonial 1 Role', x: 130, y: 3872, width: 260, height: 22, content: 'Senior Product Designer, Spotify', fontSize: 12, fontFamily: 'Plus Jakarta Sans', textColor: L.fgMuted, opacity: 100 },
  // Card 2 (accent bg)
  { id: 'pg-testi-card-2', type: 'container', name: 'Testimonial Card 2', x: 440, y: 3680, width: 320, height: 240, fill: L.accent, borderColor: L.border, radius: 20, opacity: 100 },
  { id: 'pg-testi-2-quote', type: 'paragraph', name: 'Testimonial 2 Quote', x: 470, y: 3712, width: 260, height: 108, content: '"Every year I leave with new ideas, new collaborators, and a renewed belief that design really matters. See you in Amsterdam!"', fontSize: 15, fontFamily: 'Plus Jakarta Sans', textColor: 'rgba(255,255,255,0.90)', lineHeight: 1.65, opacity: 100 },
  { id: 'pg-testi-2-name', type: 'heading', name: 'Testimonial 2 Name', x: 470, y: 3840, width: 260, height: 28, content: 'David M.', fontSize: 16, fontWeight: 800, fontFamily: 'Outfit', textColor: L.tertiary, opacity: 100 },
  { id: 'pg-testi-2-role', type: 'paragraph', name: 'Testimonial 2 Role', x: 470, y: 3872, width: 260, height: 22, content: 'Creative Technologist, Google', fontSize: 12, fontFamily: 'Plus Jakarta Sans', textColor: 'rgba(255,255,255,0.65)', opacity: 100 },
  // Card 3
  { id: 'pg-testi-card-3', type: 'container', name: 'Testimonial Card 3', x: 780, y: 3680, width: 320, height: 240, fill: L.card, borderColor: L.border, radius: 20, opacity: 100 },
  { id: 'pg-testi-3-quote', type: 'paragraph', name: 'Testimonial 3 Quote', x: 810, y: 3712, width: 260, height: 108, content: '"The workshops are unlike anything else. Intimate, practical, and led by people who are genuinely doing the work."', fontSize: 15, fontFamily: 'Plus Jakarta Sans', textColor: L.fg, lineHeight: 1.65, opacity: 100 },
  { id: 'pg-testi-3-name', type: 'heading', name: 'Testimonial 3 Name', x: 810, y: 3840, width: 260, height: 28, content: 'Priya R.', fontSize: 16, fontWeight: 800, fontFamily: 'Outfit', textColor: L.secondary, opacity: 100 },
  { id: 'pg-testi-3-role', type: 'paragraph', name: 'Testimonial 3 Role', x: 810, y: 3872, width: 260, height: 22, content: 'Motion Designer, Netflix', fontSize: 12, fontFamily: 'Plus Jakarta Sans', textColor: L.fgMuted, opacity: 100 },

  // ══ CTA SECTION ══════════════════════════════════════════════════════════════
  { id: 'pg-cta-bg', type: 'container', name: 'CTA Section', x: 0, y: 4000, width: 1200, height: 380, fill: L.fg, radius: 0, opacity: 100 },
  { id: 'pg-cta-title', type: 'heading', name: 'CTA Title', x: 100, y: 4080, width: 740, height: 130, content: 'Join 3,000+ creatives\nthis September in Amsterdam.', fontSize: 52, fontWeight: 800, fontFamily: 'Outfit', textColor: '#FFFFFF', lineHeight: 1.1, opacity: 100 },
  { id: 'pg-cta-sub', type: 'paragraph', name: 'CTA Subtext', x: 100, y: 4232, width: 520, height: 48, content: 'Early bird tickets available now. Prices increase on August 1st.', fontSize: 16, fontFamily: 'Plus Jakarta Sans', textColor: 'rgba(255,255,255,0.60)', lineHeight: 1.6, opacity: 100 },
  { id: 'pg-cta-btn-primary', type: 'button', name: 'CTA Primary', x: 100, y: 4306, width: 200, height: 52, content: 'Reserve Your Spot', fill: L.accent, textColor: L.accentFg, fontSize: 15, fontWeight: 700, fontFamily: 'Outfit', borderColor: L.accentFg, radius: 9999, opacity: 100 },
  { id: 'pg-cta-btn-secondary', type: 'button', name: 'CTA Secondary', x: 316, y: 4306, width: 160, height: 52, content: 'Learn More', fill: 'transparent', textColor: '#FFFFFF', fontSize: 15, fontWeight: 700, fontFamily: 'Outfit', borderColor: 'rgba(255,255,255,0.40)', radius: 9999, opacity: 100 },

  // ══ FOOTER ══════════════════════════════════════════════════════════════════
  { id: 'pg-footer-bg', type: 'container', name: 'Footer Section', x: 0, y: 4380, width: 1200, height: 280, fill: L.bgAlt, borderColor: L.borderLight, radius: 0, opacity: 100 },
  { id: 'pg-footer-logo-dot', type: 'container', name: 'Footer Logo Dot', x: 100, y: 4434, width: 30, height: 30, fill: L.accent, borderColor: L.border, radius: 9999, opacity: 100 },
  { id: 'pg-footer-logo', type: 'heading', name: 'Footer Logo', x: 142, y: 4433, width: 180, height: 34, content: 'PixelFest', fontSize: 22, fontWeight: 800, fontFamily: 'Outfit', textColor: L.fg, opacity: 100 },
  { id: 'pg-footer-tagline', type: 'paragraph', name: 'Footer Tagline', x: 100, y: 4478, width: 340, height: 44, content: 'The festival for creative builders.\nAmsterdam · Sept 19–21, 2026', fontSize: 14, fontFamily: 'Plus Jakarta Sans', textColor: L.fgMuted, lineHeight: 1.6, opacity: 100 },
  { id: 'pg-footer-links-1', type: 'paragraph', name: 'Footer Col 1', x: 560, y: 4440, width: 160, height: 100, content: 'About\nSpeakers\nSchedule\nSponsors', fontSize: 14, fontFamily: 'Plus Jakarta Sans', textColor: L.fgMuted, lineHeight: 2.0, opacity: 100 },
  { id: 'pg-footer-links-2', type: 'paragraph', name: 'Footer Col 2', x: 760, y: 4440, width: 160, height: 100, content: 'Tickets\nWorkshops\nPress Kit\nContact', fontSize: 14, fontFamily: 'Plus Jakarta Sans', textColor: L.fgMuted, lineHeight: 2.0, opacity: 100 },
  { id: 'pg-footer-social', type: 'paragraph', name: 'Footer Social', x: 960, y: 4440, width: 180, height: 100, content: 'Twitter / X\nInstagram\nLinkedIn\nYouTube', fontSize: 14, fontFamily: 'Plus Jakarta Sans', textColor: L.fgMuted, lineHeight: 2.0, opacity: 100 },
  { id: 'pg-footer-copy', type: 'paragraph', name: 'Footer Copyright', x: 100, y: 4606, width: 500, height: 22, content: '© 2026 PixelFest. All rights reserved.', fontSize: 13, fontFamily: 'Plus Jakarta Sans', textColor: L.fgMuted, opacity: 100 },
  { id: 'pg-footer-legal', type: 'paragraph', name: 'Footer Legal Links', x: 760, y: 4606, width: 340, height: 22, content: 'Privacy Policy     Terms     Cookie Settings', fontSize: 13, fontFamily: 'Plus Jakarta Sans', textColor: L.fgMuted, textAlign: 'right', opacity: 100 },
]

// ─── Dark Mode Mapping ────────────────────────────────────────────────────────

const DARK_OVERRIDES = {
  [L.bg]:        D.bg,
  [L.bgAlt]:     D.bgAlt,
  [L.card]:      D.card,
  [L.cardAlt]:   D.cardAlt,
  [L.fg]:        D.fg,
  [L.fgMuted]:   D.fgMuted,
  [L.accent]:    D.accent,
  [L.accentFg]:  D.accentFg,
  [L.secondary]: D.secondary,
  [L.tertiary]:  D.tertiary,
  [L.quaternary]:D.quaternary,
  [L.border]:    D.border,
  [L.borderLight]:D.borderLight,
  [L.violet10]:  D.violet10,
  [L.pink10]:    D.pink10,
  [L.amber10]:   D.amber10,
  [L.green10]:   D.green10,
  [L.muted]:     D.muted,
  [L.shadow]:    D.shadow,
  // Specific overrides
  '#0a7754':                 D.quaternary,
  '#FFFFFF':                 D.fg,
  'rgba(255,255,255,0.55)':  'rgba(255,255,255,0.40)',
  'rgba(255,255,255,0.75)':  'rgba(255,255,255,0.70)',
  'rgba(255,255,255,0.80)':  'rgba(255,255,255,0.70)',
  'rgba(255,255,255,0.90)':  'rgba(255,255,255,0.85)',
  'rgba(255,255,255,0.60)':  'rgba(255,255,255,0.50)',
  'rgba(255,255,255,0.40)':  'rgba(255,255,255,0.30)',
  'rgba(255,255,255,0.65)':  'rgba(255,255,255,0.55)',
  'transparent':             'transparent',
}

function toDarkTheme(element) {
  const next = { ...element }
  ;['fill', 'textColor', 'borderColor', 'shadowColor'].forEach(key => {
    if (next[key] && DARK_OVERRIDES[next[key]] !== undefined) {
      next[key] = DARK_OVERRIDES[next[key]]
    }
  })
  return next
}

// ─── Responsive elements (light = default) ───────────────────────────────────

export const playfulGeometricElements = withResponsive(playfulGeometricBaseElements)

// ─── Per-ID theme lookup tables ───────────────────────────────────────────────

const playfulGeometricThemeById = {
  light: Object.fromEntries(playfulGeometricBaseElements.map(el => [el.id, el])),
  dark:  Object.fromEntries(playfulGeometricBaseElements.map(toDarkTheme).map(el => [el.id, el])),
}

// ─── Exported helpers — mirror BoldSummit / ArtDeco API surface ──────────────

/**
 * Returns true when the canvas contains PlayfulGeometric elements.
 * Identification: every element ID starts with "pg-".
 */
export function isPlayfulGeometricTemplate(elements = []) {
  return elements.some(el => String(el.id ?? '').startsWith('pg-'))
}

/**
 * Applies light or dark colour tokens to every matching element.
 * Unknown IDs are passed through untouched.
 *
 * @param {Array}  elements - canvas element array
 * @param {'light'|'dark'} theme
 * @returns {Array} updated elements
 */
export function applyPlayfulGeometricTheme(elements = [], theme = 'light') {
  const palette = playfulGeometricThemeById[theme] ?? playfulGeometricThemeById.light
  return elements.map(element => {
    const themed = palette[element.id]
    if (!themed) return element
    return {
      ...element,
      fill:        themed.fill,
      textColor:   themed.textColor,
      borderColor: themed.borderColor,
      shadowColor: themed.shadowColor,
    }
  })
}

/**
 * Returns the appropriate canvas background fill for the given theme.
 */
export function getPlayfulGeometricCanvasFill(theme = 'light') {
  return theme === 'dark' ? D.bg : L.bg
}
