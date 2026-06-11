// ─────────────────────────────────────────────────────────────────────────────
// BoldSummit Template  — "Bold Typography" Design System
// A editorial, poster-inspired tech conference landing page.
// Dark-mode default with full light-mode toggle support.
// ─────────────────────────────────────────────────────────────────────────────

import { applySmartResponsive } from '../utils/responsive'

const withResponsive = (elements, width = 1200) =>
  applySmartResponsive(elements, width)

// ---------------------------------------------------------------------------
// COLOR TOKENS
// ---------------------------------------------------------------------------
const DARK = {
  bg:              '#0A0A0A',
  bgMuted:         '#111111',
  card:            '#0F0F0F',
  fg:              '#FAFAFA',
  fgMuted:         '#737373',
  accent:          '#FF3D00',
  accentFg:        '#0A0A0A',
  border:          '#262626',
  borderHover:     '#404040',
  input:           '#1A1A1A',
}

const LIGHT = {
  bg:              '#FAFAFA',
  bgMuted:         '#F0F0F0',
  card:            '#FFFFFF',
  fg:              '#0A0A0A',
  fgMuted:         '#525252',
  accent:          '#FF3D00',
  accentFg:        '#FAFAFA',
  border:          '#D4D4D4',
  borderHover:     '#A3A3A3',
  input:           '#E5E5E5',
}

// ---------------------------------------------------------------------------
// ELEMENT FACTORY HELPERS
// ---------------------------------------------------------------------------
function mk(overrides) {
  return {
    opacity: 100,
    radius: 0,
    ...overrides,
  }
}

function heading(id, name, x, y, w, h, content, fontSize, fontWeight, textColor, extra = {}) {
  return mk({ id, type: 'heading', name, x, y, width: w, height: h, content, fontSize, fontWeight, fontFamily: 'Inter Tight', textColor, lineHeight: 1.05, ...extra })
}

function para(id, name, x, y, w, h, content, fontSize, textColor, extra = {}) {
  return mk({ id, type: 'paragraph', name, x, y, width: w, height: h, content, fontSize, fontWeight: 400, fontFamily: 'Inter', textColor, lineHeight: 1.6, ...extra })
}

function label(id, name, x, y, w, h, content, textColor, fillColor, extra = {}) {
  return mk({ id, type: 'label', name, x, y, width: w, height: h, content, fontSize: 11, fontWeight: 700, fontFamily: 'JetBrains Mono', textColor, fill: fillColor, letterSpacing: 0.15, ...extra })
}

function box(id, name, x, y, w, h, fill, borderColor, extra = {}) {
  return mk({ id, type: 'container', name, x, y, width: w, height: h, fill, borderColor, ...extra })
}

function btn(id, name, x, y, w, h, content, fill, textColor, borderColor, extra = {}) {
  return mk({ id, type: 'button', name, x, y, width: w, height: h, content, fill, textColor, borderColor, fontSize: 12, fontWeight: 700, fontFamily: 'Inter', letterSpacing: 0.1, ...extra })
}

// ---------------------------------------------------------------------------
// BASE ELEMENTS  (dark-mode reference)
// ---------------------------------------------------------------------------
export const boldSummitElements = [

  // ── NAVIGATION ────────────────────────────────────────────────────────────
  box('bs-nav-bg', 'Navigation Bar', 0, 0, 1200, 72, DARK.bg, DARK.border, { borderBottom: 1 }),
  // Accent left stripe
  box('bs-nav-accent-bar', 'Nav Accent Bar', 0, 0, 3, 72, DARK.accent, 'transparent'),
  heading('bs-logo', 'Logo', 40, 20, 220, 32, 'DESIGNCONF', 22, 900, DARK.fg, { letterSpacing: -0.04 }),
  label('bs-logo-year', 'Logo Year', 258, 26, 50, 20, "'26", DARK.accent, 'transparent'),
  para('bs-nav-links', 'Nav Links', 400, 26, 420, 22, 'Program   Speakers   Workshops   Venue', 13, DARK.fgMuted, { textAlign: 'center', letterSpacing: 0.05 }),
  btn('bs-nav-cta', 'Register Now', 1060, 16, 120, 40, 'REGISTER', 'transparent', DARK.accent, DARK.accent),

  // ── HERO ──────────────────────────────────────────────────────────────────
  box('bs-hero-bg', 'Hero Section', 0, 72, 1200, 680, DARK.bg, 'transparent'),

  // Eyebrow label
  label('bs-hero-eyebrow', 'Hero Eyebrow', 72, 160, 380, 26, 'MARCH 14–16, 2026  /  BERLIN, GERMANY', DARK.fgMuted, 'transparent', { letterSpacing: 0.15 }),

  // Hero headline — multi-line massive type
  heading('bs-hero-h1-line1', 'Hero H1 Line 1', 72, 198, 900, 130, 'THE FUTURE', 128, 900, DARK.fg, { letterSpacing: -0.06, lineHeight: 1 }),
  heading('bs-hero-h1-line2', 'Hero H1 Line 2', 72, 318, 700, 130, 'OF DESIGN', 128, 900, DARK.accent, { letterSpacing: -0.06, lineHeight: 1 }),
  heading('bs-hero-h1-line3', 'Hero H1 Line 3', 72, 436, 800, 100, 'STARTS HERE.', 96, 900, DARK.fg, { letterSpacing: -0.06, lineHeight: 1 }),

  // Subhead + CTA column (right side)
  para('bs-hero-subhead', 'Hero Subhead', 820, 200, 340, 100, 'Three days of provocative talks, hands-on workshops, and radical ideas from the world\'s most forward-thinking design leaders.', 16, DARK.fgMuted, { lineHeight: 1.65 }),
  btn('bs-hero-primary-cta', 'Primary CTA', 820, 326, 200, 52, 'GET YOUR PASS', DARK.accent, DARK.accentFg, DARK.accent, { fontWeight: 800, fontSize: 13, letterSpacing: 0.1 }),
  btn('bs-hero-secondary-cta', 'Secondary CTA', 1036, 326, 140, 52, 'PROGRAM ↓', 'transparent', DARK.fg, DARK.border, { fontSize: 12, letterSpacing: 0.1 }),

  // Stat bar within hero
  box('bs-hero-stat-divider', 'Stat Divider', 72, 560, 1060, 1, DARK.border, 'transparent'),
  heading('bs-hero-stat-1', 'Stat Attendees', 72, 578, 180, 52, '4,200+', 42, 800, DARK.fg, { letterSpacing: -0.04 }),
  para('bs-hero-stat-1-label', 'Stat Label 1', 72, 634, 180, 20, 'Attendees', 12, DARK.fgMuted, { letterSpacing: 0.1 }),
  heading('bs-hero-stat-2', 'Stat Speakers', 308, 578, 180, 52, '80', 42, 800, DARK.fg, { letterSpacing: -0.04 }),
  para('bs-hero-stat-2-label', 'Stat Label 2', 308, 634, 180, 20, 'World-Class Speakers', 12, DARK.fgMuted, { letterSpacing: 0.1 }),
  heading('bs-hero-stat-3', 'Stat Workshops', 544, 578, 180, 52, '32', 42, 800, DARK.fg, { letterSpacing: -0.04 }),
  para('bs-hero-stat-3-label', 'Stat Label 3', 544, 634, 180, 20, 'Deep Dive Workshops', 12, DARK.fgMuted, { letterSpacing: 0.1 }),
  heading('bs-hero-stat-4', 'Stat Years', 780, 578, 180, 52, '12th', 42, 800, DARK.accent, { letterSpacing: -0.04 }),
  para('bs-hero-stat-4-label', 'Stat Label 4', 780, 634, 180, 20, 'Annual Edition', 12, DARK.fgMuted, { letterSpacing: 0.1 }),

  // ── MARQUEE / TOPIC STRIP ─────────────────────────────────────────────────
  box('bs-marquee-bg', 'Marquee Strip', 0, 752, 1200, 60, DARK.accent, 'transparent'),
  para('bs-marquee-text', 'Marquee Text', 0, 770, 1200, 28, 'TYPOGRAPHY  ✦  MOTION  ✦  SYSTEMS  ✦  AI + DESIGN  ✦  ACCESSIBILITY  ✦  BRAND  ✦  PRODUCT  ✦  TYPE  ✦  MOTION  ✦  SYSTEMS  ✦', 13, DARK.accentFg, { fontFamily: 'JetBrains Mono', fontWeight: 700, letterSpacing: 0.1, textAlign: 'center' }),

  // ── FEATURED SPEAKERS ─────────────────────────────────────────────────────
  box('bs-speakers-bg', 'Speakers Section', 0, 812, 1200, 620, DARK.bgMuted, DARK.border, { borderTop: 1 }),

  // Section header
  label('bs-speakers-kicker', 'Speakers Kicker', 72, 872, 200, 24, 'FEATURED SPEAKERS', DARK.accent, 'transparent', { letterSpacing: 0.2 }),
  box('bs-speakers-kicker-bar', 'Kicker Bar', 72, 900, 48, 2, DARK.accent, 'transparent'),
  heading('bs-speakers-heading', 'Speakers Heading', 72, 916, 580, 72, 'The Minds Shaping Tomorrow', 56, 900, DARK.fg, { letterSpacing: -0.04, lineHeight: 1.1 }),
  para('bs-speakers-desc', 'Speakers Desc', 820, 928, 320, 60, 'Pioneers, practitioners, and provocateurs across design, tech, and culture.', 15, DARK.fgMuted, { lineHeight: 1.65 }),

  // Speaker card 1
  box('bs-sp-card-1', 'Speaker Card 1', 72, 1028, 250, 300, DARK.card, DARK.border),
  box('bs-sp-card-1-accent', 'Card 1 Accent', 72, 1028, 250, 3, DARK.accent, 'transparent'),
  heading('bs-sp-1-name', 'Speaker 1 Name', 96, 1068, 202, 36, 'Mia Hoffmann', 26, 800, DARK.fg, { letterSpacing: -0.03 }),
  label('bs-sp-1-role', 'Speaker 1 Role', 96, 1112, 202, 20, 'CREATIVE DIRECTOR', DARK.accent, 'transparent', { letterSpacing: 0.12 }),
  para('bs-sp-1-company', 'Speaker 1 Company', 96, 1140, 202, 20, 'Studio Minimal, Berlin', 13, DARK.fgMuted),
  para('bs-sp-1-topic', 'Speaker 1 Topic', 96, 1174, 202, 60, 'On designing for ambiguity: when clarity is the wrong goal.', 14, DARK.fgMuted, { lineHeight: 1.55 }),
  label('bs-sp-1-type', 'Speaker 1 Type', 96, 1280, 80, 22, 'KEYNOTE', DARK.fg, DARK.border, { letterSpacing: 0.12 }),

  // Speaker card 2
  box('bs-sp-card-2', 'Speaker Card 2', 342, 1028, 250, 300, DARK.card, DARK.border),
  box('bs-sp-card-2-accent', 'Card 2 Accent', 342, 1028, 250, 3, DARK.border, 'transparent'),
  heading('bs-sp-2-name', 'Speaker 2 Name', 366, 1068, 202, 36, 'Raj Pillai', 26, 800, DARK.fg, { letterSpacing: -0.03 }),
  label('bs-sp-2-role', 'Speaker 2 Role', 366, 1112, 202, 20, 'HEAD OF DESIGN', DARK.accent, 'transparent', { letterSpacing: 0.12 }),
  para('bs-sp-2-company', 'Speaker 2 Company', 366, 1140, 202, 20, 'Figma, San Francisco', 13, DARK.fgMuted),
  para('bs-sp-2-topic', 'Speaker 2 Topic', 366, 1174, 202, 60, 'Design systems at scale: when your component library has 200 contributors.', 14, DARK.fgMuted, { lineHeight: 1.55 }),
  label('bs-sp-2-type', 'Speaker 2 Type', 366, 1280, 80, 22, 'TALK', DARK.fg, DARK.border, { letterSpacing: 0.12 }),

  // Speaker card 3
  box('bs-sp-card-3', 'Speaker Card 3', 612, 1028, 250, 300, DARK.card, DARK.border),
  box('bs-sp-card-3-accent', 'Card 3 Accent', 612, 1028, 250, 3, DARK.border, 'transparent'),
  heading('bs-sp-3-name', 'Speaker 3 Name', 636, 1068, 202, 36, 'Yuki Tanaka', 26, 800, DARK.fg, { letterSpacing: -0.03 }),
  label('bs-sp-3-role', 'Speaker 3 Role', 636, 1112, 202, 20, 'INTERACTION LEAD', DARK.accent, 'transparent', { letterSpacing: 0.12 }),
  para('bs-sp-3-company', 'Speaker 3 Company', 636, 1140, 202, 20, 'Apple, Cupertino', 13, DARK.fgMuted),
  para('bs-sp-3-topic', 'Speaker 3 Topic', 636, 1174, 202, 60, 'Invisible design: crafting interactions that disappear into the experience.', 14, DARK.fgMuted, { lineHeight: 1.55 }),
  label('bs-sp-3-type', 'Speaker 3 Type', 636, 1280, 80, 22, 'WORKSHOP', DARK.fg, DARK.border, { letterSpacing: 0.12 }),

  // Speaker card 4
  box('bs-sp-card-4', 'Speaker Card 4', 882, 1028, 250, 300, DARK.card, DARK.border),
  box('bs-sp-card-4-accent', 'Card 4 Accent', 882, 1028, 250, 3, DARK.border, 'transparent'),
  heading('bs-sp-4-name', 'Speaker 4 Name', 906, 1068, 202, 36, 'Camille Noir', 26, 800, DARK.fg, { letterSpacing: -0.03 }),
  label('bs-sp-4-role', 'Speaker 4 Role', 906, 1112, 202, 20, 'TYPOGRAPHER', DARK.accent, 'transparent', { letterSpacing: 0.12 }),
  para('bs-sp-4-company', 'Speaker 4 Company', 906, 1140, 202, 20, 'Klim Type, Wellington', 13, DARK.fgMuted),
  para('bs-sp-4-topic', 'Speaker 4 Topic', 906, 1174, 202, 60, 'Variable fonts, optical sizing, and the next decade of web type.', 14, DARK.fgMuted, { lineHeight: 1.55 }),
  label('bs-sp-4-type', 'Speaker 4 Type', 906, 1280, 80, 22, 'TALK', DARK.fg, DARK.border, { letterSpacing: 0.12 }),

  // ── PROGRAM / SCHEDULE ────────────────────────────────────────────────────
  box('bs-program-bg', 'Program Section', 0, 1432, 1200, 560, DARK.bg, DARK.border, { borderTop: 1 }),

  label('bs-prog-kicker', 'Program Kicker', 72, 1490, 160, 24, 'THE PROGRAM', DARK.accent, 'transparent', { letterSpacing: 0.2 }),
  box('bs-prog-kicker-bar', 'Program Kicker Bar', 72, 1518, 48, 2, DARK.accent, 'transparent'),
  heading('bs-prog-heading', 'Program Heading', 72, 1534, 500, 66, 'Three Days. Zero Filler.', 52, 900, DARK.fg, { letterSpacing: -0.04, lineHeight: 1.1 }),

  // Schedule rows
  box('bs-sched-row-1', 'Schedule Row 1', 72, 1640, 1060, 72, 'transparent', DARK.border, { borderBottom: 1 }),
  label('bs-sched-1-time', 'Schedule 1 Time', 72, 1658, 110, 24, '09:00 AM', DARK.fgMuted, 'transparent', { letterSpacing: 0.1 }),
  heading('bs-sched-1-title', 'Schedule 1 Title', 220, 1652, 580, 34, 'Opening Ceremony & Keynote Address', 22, 700, DARK.fg, { letterSpacing: -0.02 }),
  label('bs-sched-1-tag', 'Schedule 1 Tag', 880, 1662, 100, 24, 'KEYNOTE', DARK.accent, 'transparent', { letterSpacing: 0.12 }),

  box('bs-sched-row-2', 'Schedule Row 2', 72, 1712, 1060, 72, 'transparent', DARK.border, { borderBottom: 1 }),
  label('bs-sched-2-time', 'Schedule 2 Time', 72, 1730, 110, 24, '11:30 AM', DARK.fgMuted, 'transparent', { letterSpacing: 0.1 }),
  heading('bs-sched-2-title', 'Schedule 2 Title', 220, 1724, 580, 34, 'Workshop Block A: Type, Motion & Systems', 22, 700, DARK.fg, { letterSpacing: -0.02 }),
  label('bs-sched-2-tag', 'Schedule 2 Tag', 880, 1734, 110, 24, 'WORKSHOP', DARK.fgMuted, 'transparent', { letterSpacing: 0.12 }),

  box('bs-sched-row-3', 'Schedule Row 3', 72, 1784, 1060, 72, 'transparent', DARK.border, { borderBottom: 1 }),
  label('bs-sched-3-time', 'Schedule 3 Time', 72, 1802, 110, 24, '02:00 PM', DARK.fgMuted, 'transparent', { letterSpacing: 0.1 }),
  heading('bs-sched-3-title', 'Schedule 3 Title', 220, 1796, 580, 34, 'Panel: AI as Creative Collaborator', 22, 700, DARK.fg, { letterSpacing: -0.02 }),
  label('bs-sched-3-tag', 'Schedule 3 Tag', 880, 1806, 80, 24, 'PANEL', DARK.fgMuted, 'transparent', { letterSpacing: 0.12 }),

  box('bs-sched-row-4', 'Schedule Row 4', 72, 1856, 1060, 72, 'transparent', DARK.border, { borderBottom: 1 }),
  label('bs-sched-4-time', 'Schedule 4 Time', 72, 1874, 110, 24, '04:30 PM', DARK.fgMuted, 'transparent', { letterSpacing: 0.1 }),
  heading('bs-sched-4-title', 'Schedule 4 Title', 220, 1868, 580, 34, 'Closing Drinks & Critic\'s Showcase', 22, 700, DARK.fg, { letterSpacing: -0.02 }),
  label('bs-sched-4-tag', 'Schedule 4 Tag', 880, 1878, 80, 24, 'SOCIAL', DARK.fgMuted, 'transparent', { letterSpacing: 0.12 }),

  btn('bs-prog-full-cta', 'Full Program CTA', 72, 1952, 220, 48, 'FULL PROGRAM →', 'transparent', DARK.accent, DARK.accent, { fontWeight: 700, fontSize: 13, letterSpacing: 0.1 }),

  // ── WORKSHOP TRACKS ───────────────────────────────────────────────────────
  box('bs-tracks-bg', 'Tracks Section', 0, 1992, 1200, 480, DARK.bgMuted, DARK.border, { borderTop: 1 }),

  label('bs-tracks-kicker', 'Tracks Kicker', 72, 2052, 160, 24, 'WORKSHOPS', DARK.accent, 'transparent', { letterSpacing: 0.2 }),
  box('bs-tracks-kicker-bar', 'Tracks Kicker Bar', 72, 2080, 48, 2, DARK.accent, 'transparent'),
  heading('bs-tracks-heading', 'Tracks Heading', 72, 2096, 560, 66, 'Go Deep. Come Out Changed.', 52, 900, DARK.fg, { letterSpacing: -0.04, lineHeight: 1.1 }),

  // Track cards
  box('bs-track-1', 'Track Card 1', 72, 2210, 330, 200, 'transparent', DARK.border),
  box('bs-track-1-bar', 'Track 1 Accent Bar', 72, 2210, 330, 2, DARK.accent, 'transparent'),
  heading('bs-track-1-num', 'Track 1 Number', 92, 2224, 60, 52, '01', 44, 800, DARK.border, { letterSpacing: -0.04 }),
  heading('bs-track-1-title', 'Track 1 Title', 92, 2280, 280, 40, 'Type & Editorial Systems', 22, 800, DARK.fg, { letterSpacing: -0.03, lineHeight: 1.2 }),
  para('bs-track-1-desc', 'Track 1 Desc', 92, 2328, 280, 54, 'From optical sizing to variable fonts—master the full spectrum of modern typographic control.', 13, DARK.fgMuted, { lineHeight: 1.55 }),

  box('bs-track-2', 'Track Card 2', 432, 2210, 330, 200, 'transparent', DARK.border),
  box('bs-track-2-bar', 'Track 2 Accent Bar', 432, 2210, 330, 2, DARK.border, 'transparent'),
  heading('bs-track-2-num', 'Track 2 Number', 452, 2224, 60, 52, '02', 44, 800, DARK.border, { letterSpacing: -0.04 }),
  heading('bs-track-2-title', 'Track 2 Title', 452, 2280, 280, 40, 'Motion & Interaction Design', 22, 800, DARK.fg, { letterSpacing: -0.03, lineHeight: 1.2 }),
  para('bs-track-2-desc', 'Track 2 Desc', 452, 2328, 280, 54, 'Principles, tools, and production techniques for animation that communicates, not decorates.', 13, DARK.fgMuted, { lineHeight: 1.55 }),

  box('bs-track-3', 'Track Card 3', 792, 2210, 330, 200, 'transparent', DARK.border),
  box('bs-track-3-bar', 'Track 3 Accent Bar', 792, 2210, 330, 2, DARK.border, 'transparent'),
  heading('bs-track-3-num', 'Track 3 Number', 812, 2224, 60, 52, '03', 44, 800, DARK.border, { letterSpacing: -0.04 }),
  heading('bs-track-3-title', 'Track 3 Title', 812, 2280, 280, 40, 'AI-Augmented Creative Practice', 22, 800, DARK.fg, { letterSpacing: -0.03, lineHeight: 1.2 }),
  para('bs-track-3-desc', 'Track 3 Desc', 812, 2328, 280, 54, 'Practical workflows for integrating generative AI without losing your creative voice.', 13, DARK.fgMuted, { lineHeight: 1.55 }),

  // ── TESTIMONIAL / PULL QUOTE ──────────────────────────────────────────────
  box('bs-quote-bg', 'Quote Section', 0, 2472, 1200, 320, DARK.accent, 'transparent'),
  heading('bs-quote-text', 'Pull Quote', 72, 2520, 880, 130, 'DesignConf changed the way I see every pixel I place.', 44, 700, DARK.accentFg, { letterSpacing: -0.04, lineHeight: 1.15, fontFamily: 'Playfair Display' }),
  para('bs-quote-attr', 'Quote Attribution', 72, 2670, 400, 22, '— Aaron Draplin, Graphic Designer & Author', 14, DARK.accentFg, { opacity: 70, letterSpacing: 0.05 }),

  // ── TICKETS / PRICING ─────────────────────────────────────────────────────
  box('bs-pricing-bg', 'Pricing Section', 0, 2792, 1200, 560, DARK.bg, DARK.border, { borderTop: 1 }),

  label('bs-pricing-kicker', 'Pricing Kicker', 72, 2852, 120, 24, 'PASSES', DARK.accent, 'transparent', { letterSpacing: 0.2 }),
  box('bs-pricing-kicker-bar', 'Pricing Kicker Bar', 72, 2880, 48, 2, DARK.accent, 'transparent'),
  heading('bs-pricing-heading', 'Pricing Heading', 72, 2896, 680, 72, 'Invest in Three Days That Change Everything', 52, 900, DARK.fg, { letterSpacing: -0.04, lineHeight: 1.1 }),

  // Ticket: Standard
  box('bs-ticket-1', 'Ticket Standard', 72, 3018, 310, 270, 'transparent', DARK.border),
  heading('bs-ticket-1-name', 'Ticket 1 Name', 96, 3040, 260, 36, 'Standard', 28, 800, DARK.fg, { letterSpacing: -0.03 }),
  heading('bs-ticket-1-price', 'Ticket 1 Price', 96, 3090, 260, 56, '€349', 48, 900, DARK.fg, { letterSpacing: -0.04 }),
  para('bs-ticket-1-desc', 'Ticket 1 Desc', 96, 3158, 260, 70, 'All talks and panels. Digital access to recordings. Conf bag.', 14, DARK.fgMuted, { lineHeight: 1.55 }),
  btn('bs-ticket-1-cta', 'Ticket 1 CTA', 96, 3240, 200, 40, 'BUY STANDARD', 'transparent', DARK.fg, DARK.border, { fontWeight: 700, fontSize: 12, letterSpacing: 0.1 }),

  // Ticket: Pro (featured)
  box('bs-ticket-2-bg', 'Ticket Pro BG', 422, 2998, 310, 310, DARK.accent, 'transparent'),
  box('bs-ticket-2-badge', 'Ticket Pro Badge BG', 422, 2998, 100, 28, DARK.accentFg, 'transparent', { opacity: 20 }),
  label('bs-ticket-2-badge-text', 'Ticket Pro Badge Text', 440, 3003, 80, 18, 'POPULAR', DARK.accentFg, 'transparent', { letterSpacing: 0.15 }),
  heading('bs-ticket-2-name', 'Ticket 2 Name', 446, 3048, 260, 36, 'Pro', 28, 800, DARK.accentFg, { letterSpacing: -0.03 }),
  heading('bs-ticket-2-price', 'Ticket 2 Price', 446, 3096, 260, 56, '€699', 48, 900, DARK.accentFg, { letterSpacing: -0.04 }),
  para('bs-ticket-2-desc', 'Ticket 2 Desc', 446, 3162, 262, 70, 'Everything in Standard + all workshops, VIP networking dinner, and mentor sessions.', 14, DARK.accentFg, { lineHeight: 1.55, opacity: 90 }),
  btn('bs-ticket-2-cta', 'Ticket 2 CTA', 446, 3250, 200, 40, 'BUY PRO', DARK.accentFg, DARK.accent, DARK.accentFg, { fontWeight: 800, fontSize: 12, letterSpacing: 0.1 }),

  // Ticket: Studio
  box('bs-ticket-3', 'Ticket Studio', 772, 3018, 310, 270, 'transparent', DARK.border),
  heading('bs-ticket-3-name', 'Ticket 3 Name', 796, 3040, 260, 36, 'Studio', 28, 800, DARK.fg, { letterSpacing: -0.03 }),
  heading('bs-ticket-3-price', 'Ticket 3 Price', 796, 3090, 260, 56, '€1,499', 48, 900, DARK.fg, { letterSpacing: -0.04 }),
  para('bs-ticket-3-desc', 'Ticket 3 Desc', 796, 3158, 260, 70, 'Team of 5. Dedicated table. Private speaker meet & greet. Studio credit.', 14, DARK.fgMuted, { lineHeight: 1.55 }),
  btn('bs-ticket-3-cta', 'Ticket 3 CTA', 796, 3240, 200, 40, 'BUY STUDIO', 'transparent', DARK.fg, DARK.border, { fontWeight: 700, fontSize: 12, letterSpacing: 0.1 }),

  // ── FINAL CTA BANNER ─────────────────────────────────────────────────────
  box('bs-cta-bg', 'Final CTA Section', 0, 3352, 1200, 360, DARK.bg, DARK.border, { borderTop: 1 }),
  label('bs-cta-eyebrow', 'CTA Eyebrow', 72, 3400, 340, 24, 'BERLIN — MARCH 14–16, 2026', DARK.fgMuted, 'transparent', { letterSpacing: 0.15 }),
  heading('bs-cta-headline', 'CTA Headline', 72, 3434, 700, 100, 'Be Here When It Happens.', 72, 900, DARK.fg, { letterSpacing: -0.05, lineHeight: 1.05 }),
  btn('bs-cta-primary', 'CTA Primary', 72, 3556, 240, 56, 'REGISTER NOW →', DARK.accent, DARK.accentFg, DARK.accent, { fontWeight: 800, fontSize: 14, letterSpacing: 0.1 }),
  para('bs-cta-subtext', 'CTA Subtext', 340, 3570, 320, 28, 'Early bird pricing ends Feb 1, 2026', 13, DARK.fgMuted, { letterSpacing: 0.05 }),

  // ── FOOTER ────────────────────────────────────────────────────────────────
  box('bs-footer-bg', 'Footer', 0, 3712, 1200, 240, DARK.bgMuted, DARK.border, { borderTop: 1 }),

  // Footer logo
  heading('bs-footer-logo', 'Footer Logo', 72, 3762, 260, 38, 'DESIGNCONF', 28, 900, DARK.fg, { letterSpacing: -0.04 }),
  label('bs-footer-logo-year', 'Footer Logo Year', 330, 3770, 50, 22, "'26", DARK.accent, 'transparent'),
  para('bs-footer-tagline', 'Footer Tagline', 72, 3808, 300, 40, 'The annual gathering for designers who care about craft.', 13, DARK.fgMuted, { lineHeight: 1.6 }),

  // Footer columns
  label('bs-footer-col-1-head', 'Footer Col 1 Head', 520, 3762, 140, 24, 'CONFERENCE', DARK.fgMuted, 'transparent', { letterSpacing: 0.15 }),
  para('bs-footer-col-1-links', 'Footer Col 1 Links', 520, 3798, 140, 90, 'Program\nSpeakers\nWorkshops\nVenue', 13, DARK.fgMuted, { lineHeight: 2 }),

  label('bs-footer-col-2-head', 'Footer Col 2 Head', 720, 3762, 140, 24, 'ATTEND', DARK.fgMuted, 'transparent', { letterSpacing: 0.15 }),
  para('bs-footer-col-2-links', 'Footer Col 2 Links', 720, 3798, 140, 90, 'Get Tickets\nScholarships\nGroup Rates\nFAQ', 13, DARK.fgMuted, { lineHeight: 2 }),

  label('bs-footer-col-3-head', 'Footer Col 3 Head', 920, 3762, 140, 24, 'CONNECT', DARK.fgMuted, 'transparent', { letterSpacing: 0.15 }),
  para('bs-footer-col-3-links', 'Footer Col 3 Links', 920, 3798, 140, 90, 'Twitter / X\nInstagram\nLinkedIn\nNewsletter', 13, DARK.fgMuted, { lineHeight: 2 }),

  // Footer bottom bar
  box('bs-footer-divider', 'Footer Divider', 72, 3900, 1060, 1, DARK.border, 'transparent'),
  para('bs-footer-copyright', 'Footer Copyright', 72, 3912, 460, 22, '© 2026 DesignConf. All rights reserved.', 12, DARK.fgMuted, { letterSpacing: 0.05 }),
  para('bs-footer-legal', 'Footer Legal', 760, 3912, 360, 22, 'Privacy Policy     Terms of Service', 12, DARK.fgMuted, { textAlign: 'right', letterSpacing: 0.05 }),
]

// ---------------------------------------------------------------------------
// LIGHT THEME MAPPING
// ---------------------------------------------------------------------------
const DARK_TO_LIGHT = {
  [DARK.bg]:          LIGHT.bg,
  [DARK.bgMuted]:     LIGHT.bgMuted,
  [DARK.card]:        LIGHT.card,
  [DARK.fg]:          LIGHT.fg,
  [DARK.fgMuted]:     LIGHT.fgMuted,
  [DARK.border]:      LIGHT.border,
  [DARK.borderHover]: LIGHT.borderHover,
  [DARK.input]:       LIGHT.input,
  [DARK.accentFg]:    LIGHT.accentFg,
  // accent stays the same in both themes
  // transparent stays transparent
}

function remapColor(val) {
  if (!val || val === 'transparent') return val
  return DARK_TO_LIGHT[val] ?? val
}

function toLightThemeBS(el) {
  return {
    ...el,
    fill:        remapColor(el.fill),
    textColor:   remapColor(el.textColor),
    borderColor: remapColor(el.borderColor),
    shadowColor: remapColor(el.shadowColor),
  }
}

// Pre-bake both lookup tables (id → element)
const bsThemeById = {
  dark:  Object.fromEntries(boldSummitElements.map(el => [el.id, el])),
  light: Object.fromEntries(boldSummitElements.map(toLightThemeBS).map(el => [el.id, el])),
}

// ---------------------------------------------------------------------------
// PUBLIC API  (mirrors TechSummit convention)
// ---------------------------------------------------------------------------
export function isBoldSummitTemplate(elements = []) {
  return elements.some(el => String(el.id || '').startsWith('bs-'))
}

export function applyBoldSummitTheme(elements = [], theme = 'dark') {
  const palette = bsThemeById[theme] || bsThemeById.dark
  return elements.map(el => {
    const themed = palette[el.id]
    if (!themed) return el
    return {
      ...el,
      fill:        themed.fill,
      textColor:   themed.textColor,
      borderColor: themed.borderColor,
      shadowColor: themed.shadowColor,
    }
  })
}

export function getBoldSummitCanvasFill(theme = 'dark') {
  return theme === 'light' ? LIGHT.bg : DARK.bg
}
