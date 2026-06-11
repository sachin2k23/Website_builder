// ─────────────────────────────────────────────────────────────────────────────
// TechSummitTemplate.jsx  –  Rebuilt: minimal, responsive, conference-grade
// Default theme: LIGHT  (dark toggle available)
// Changes from v1:
//   • Removed hero visual card (was overflowing / redundant with stats)
//   • Hero layout: full-width single-column, generous breathing room
//   • Eliminated off-canvas elements and hardcoded pixel positions
//   • All Y positions recalculated to remove vertical gaps/overlaps
//   • Stats band, speakers, schedule, tickets, footer — tightened spacing
//   • Responsive via applySmartResponsive
// ─────────────────────────────────────────────────────────────────────────────

import { applySmartResponsive } from '../utils/responsive'

const withResponsive = (elements, width = 1200) =>
  applySmartResponsive(elements, width)

// ─────────────────────────────────────────────────────────────────────────────
// COLOR TOKENS
// ─────────────────────────────────────────────────────────────────────────────

const DARK = {
  bg:          '#080C14',
  bgMuted:     '#0D1525',
  card:        '#111B2E',
  fg:          '#F0F4FF',
  fgMuted:     '#9BAEC8',
  fgSubtle:    '#5F7394',
  accent:      '#3B82F6',
  accentFg:    '#ffffff',
  accentSoft:  '#93C5FD',
  accentDim:   '#60A5FA',
  accentGhost: 'rgba(59,130,246,0.14)',
  accentBorder:'rgba(59,130,246,0.35)',
  border:      'rgba(255,255,255,0.08)',
  borderNav:   'rgba(255,255,255,0.10)',
  borderGhost: 'rgba(255,255,255,0.18)',
}

const LIGHT = {
  bg:          '#F8FAFF',
  bgMuted:     '#FFFFFF',
  card:        '#FFFFFF',
  fg:          '#0F172A',
  fgMuted:     '#475569',
  fgSubtle:    '#64748B',
  accent:      '#2563EB',
  accentFg:    '#ffffff',
  accentSoft:  '#1D4ED8',
  accentDim:   '#2563EB',
  accentGhost: '#DBEAFE',
  accentBorder:'rgba(37,99,235,0.30)',
  border:      '#E2E8F4',
  borderNav:   '#D8E1F0',
  borderGhost: '#C7D2FE',
}

// ─────────────────────────────────────────────────────────────────────────────
// ELEMENT FACTORY HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function mk(o) { return { opacity: 100, radius: 0, ...o } }

function heading(id, name, x, y, w, h, content, fontSize, fontWeight, textColor, extra = {}) {
  return mk({ id, type: 'heading', name, x, y, width: w, height: h, content, fontSize, fontWeight, fontFamily: 'Inter', textColor, lineHeight: 1.08, ...extra })
}
function para(id, name, x, y, w, h, content, fontSize, textColor, extra = {}) {
  return mk({ id, type: 'paragraph', name, x, y, width: w, height: h, content, fontSize, fontWeight: 400, fontFamily: 'Inter', textColor, lineHeight: 1.6, ...extra })
}
function label(id, name, x, y, w, h, content, textColor, fillColor, extra = {}) {
  return mk({ id, type: 'label', name, x, y, width: w, height: h, content, fontSize: 11, fontWeight: 700, fontFamily: 'Inter', textColor, fill: fillColor, ...extra })
}
function box(id, name, x, y, w, h, fill, borderColor, extra = {}) {
  return mk({ id, type: 'container', name, x, y, width: w, height: h, fill, borderColor, ...extra })
}
function btn(id, name, x, y, w, h, content, fill, textColor, borderColor, extra = {}) {
  return mk({ id, type: 'button', name, x, y, width: w, height: h, content, fill, textColor, borderColor, fontSize: 14, fontWeight: 700, fontFamily: 'Inter', radius: 12, ...extra })
}

// ─────────────────────────────────────────────────────────────────────────────
// LAYOUT CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

const PX   = 80   // page horizontal padding
const CW   = 1040 // content width (1200 - 2*80)
const MID  = 600  // canvas centre x

// ─────────────────────────────────────────────────────────────────────────────
// BASE ELEMENTS  (dark-mode reference)
// ─────────────────────────────────────────────────────────────────────────────

const techSummitBaseElements = [

  // ── NAVIGATION  ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄  y: 0–72
  box('ts-nav-bg',    'Navigation Bar', 0, 0, 1200, 72, DARK.bg, DARK.borderNav, { borderBottom: 1 }),
  box('ts-logo-box',  'Logo Mark',     PX, 18,  36, 36, DARK.accent, 'transparent', { radius: 8 }),
  heading('ts-logo',  'Logo Text',     PX + 44, 19, 200, 32, 'TechSummit', 20, 800, DARK.fg, { letterSpacing: -0.02 }),
  para('ts-nav-links','Nav Links',     420, 25, 400, 22, 'Speakers     Schedule     Tickets     Sponsors', 13, DARK.fgMuted, { textAlign: 'center', fontWeight: 500 }),
  btn('ts-nav-cta',   'Nav CTA',       1048, 15, 112, 40, 'Get Tickets', DARK.accent, DARK.accentFg, DARK.accent, { fontSize: 13, radius: 8 }),

  // ── HERO  ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄  y: 72–560
  box('ts-hero-bg', 'Hero Section', 0, 72, 1200, 488, DARK.bg, 'transparent'),

  label('ts-hero-chip',    'Hero Eyebrow',   PX, 136, 340, 28, 'JUNE 12–14, 2026  ·  SAN FRANCISCO', DARK.accentSoft, DARK.accentGhost, { radius: 999 }),
  heading('ts-hero-title', 'Hero Title',     PX, 184, 720, 200,
    'Where builders shape the next decade of technology.',
    56, 800, DARK.fg, { letterSpacing: -0.03, lineHeight: 1.08 }),
  para('ts-hero-copy', 'Hero Desc', PX, 400, 560, 60,
    'Three days of AI, infrastructure, security, design systems, and the people shipping the future.',
    18, DARK.fgMuted, { lineHeight: 1.6 }),
  btn('ts-hero-primary',   'Primary CTA',    PX,       484, 162, 52, 'Reserve Seat', DARK.accent, DARK.accentFg, DARK.accent, { fontWeight: 800, fontSize: 15 }),
  btn('ts-hero-secondary', 'Secondary CTA',  PX + 178, 484, 148, 52, 'View Agenda',  'transparent', DARK.fg, DARK.borderGhost, { fontWeight: 700, fontSize: 15 }),

  // ── STATS BAND  ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄  y: 560–672
  box('ts-stats-bg', 'Stats Band', 0, 560, 1200, 112, DARK.bgMuted, DARK.border, { borderTop: 1, borderBottom: 1 }),

  heading('ts-stat-1',       'Stat 1',       PX,           582, 160, 44, '3 Days', 32, 800, DARK.fg, { letterSpacing: -0.03 }),
  para('ts-stat-1-label',    'Stat 1 Label', PX,           630, 160, 22, 'conference program', 13, DARK.fgMuted),
  heading('ts-stat-2',       'Stat 2',       PX + 220,     582, 160, 44, '80+',    32, 800, DARK.fg, { letterSpacing: -0.03 }),
  para('ts-stat-2-label',    'Stat 2 Label', PX + 220,     630, 160, 22, 'technical sessions', 13, DARK.fgMuted),
  heading('ts-stat-3',       'Stat 3',       PX + 440,     582, 160, 44, '24',     32, 800, DARK.fg, { letterSpacing: -0.03 }),
  para('ts-stat-3-label',    'Stat 3 Label', PX + 440,     630, 160, 22, 'workshops', 13, DARK.fgMuted),
  heading('ts-stat-4',       'Stat 4',       PX + 660,     582, 160, 44, '120',    32, 800, DARK.fg, { letterSpacing: -0.03 }),
  para('ts-stat-4-label',    'Stat 4 Label', PX + 660,     630, 160, 22, 'sponsors & demos', 13, DARK.fgMuted),

  // ── SPEAKERS  ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄  y: 672–1180
  box('ts-speakers-bg', 'Speakers Section', 0, 672, 1200, 508, DARK.bg, DARK.border, { borderTop: 1 }),

  label('ts-speakers-kicker',  'Speakers Kicker', PX, 728, 180, 22, 'FEATURED SPEAKERS', DARK.accentDim, 'transparent', { letterSpacing: 0.14 }),
  box('ts-speakers-kicker-bar','Kicker Bar',      PX, 752,  48,  2, DARK.accent, 'transparent'),
  heading('ts-speakers-title', 'Speakers Heading',PX, 764, 560, 60, 'Leaders from the front lines.', 42, 800, DARK.fg, { letterSpacing: -0.03, lineHeight: 1.1 }),

  // ── Card helper positions: 4 cards across CW, gap 20px
  // cardW = (1040 - 3*20) / 4 = 242.5 → 242
  // x positions: 80, 80+242+20=342, 342+242+20=604, 604+242+20=866

  // Card 1
  box('ts-sp-card-1',     'Speaker Card 1',  PX,  856, 242, 248, DARK.card, DARK.border, { radius: 16 }),
  box('ts-sp-card-1-top', 'Card 1 Top Bar',  PX,  856, 242,   3, DARK.accent, 'transparent', { radius: 0 }),
  box('ts-sp-1-avatar',   'S1 Avatar',       PX+16, 875,  40, 40, DARK.accentGhost, DARK.accentBorder, { radius: 10 }),
  heading('ts-sp-1-name', 'S1 Name',         PX+16, 928, 210, 28, 'Sarah Chen',    19, 800, DARK.fg, { letterSpacing: -0.02 }),
  label('ts-sp-1-role',   'S1 Role',         PX+16, 960, 210, 18, 'CEO, NEXUS AI', DARK.accentDim, 'transparent', { letterSpacing: 0.1 }),
  para('ts-sp-1-topic',   'S1 Topic',        PX+16, 984, 210, 64, 'Foundation models and the next platform shift.', 13, DARK.fgMuted, { lineHeight: 1.5 }),
  label('ts-sp-1-tag',    'S1 Tag',          PX+16,1060, 80, 22, 'KEYNOTE', DARK.fg, DARK.border, { letterSpacing: 0.1 }),

  // Card 2
  box('ts-sp-card-2',     'Speaker Card 2',  342, 856, 242, 248, DARK.card, DARK.border, { radius: 16 }),
  box('ts-sp-card-2-top', 'Card 2 Top Bar',  342, 856, 242,   3, DARK.border, 'transparent'),
  box('ts-sp-2-avatar',   'S2 Avatar',       358, 875,  40,  40, DARK.accentGhost, DARK.accentBorder, { radius: 10 }),
  heading('ts-sp-2-name', 'S2 Name',         358, 928, 210, 28, 'Marcus Webb',    19, 800, DARK.fg, { letterSpacing: -0.02 }),
  label('ts-sp-2-role',   'S2 Role',         358, 960, 210, 18, 'CTO, ORBITAL',   DARK.accentDim, 'transparent', { letterSpacing: 0.1 }),
  para('ts-sp-2-topic',   'S2 Topic',        358, 984, 210, 64, 'Distributed systems at 100M requests per second.', 13, DARK.fgMuted, { lineHeight: 1.5 }),
  label('ts-sp-2-tag',    'S2 Tag',          358,1060, 60, 22, 'TALK', DARK.fg, DARK.border, { letterSpacing: 0.1 }),

  // Card 3
  box('ts-sp-card-3',     'Speaker Card 3',  604, 856, 242, 248, DARK.card, DARK.border, { radius: 16 }),
  box('ts-sp-card-3-top', 'Card 3 Top Bar',  604, 856, 242,   3, DARK.border, 'transparent'),
  box('ts-sp-3-avatar',   'S3 Avatar',       620, 875,  40,  40, DARK.accentGhost, DARK.accentBorder, { radius: 10 }),
  heading('ts-sp-3-name', 'S3 Name',         620, 928, 210, 28, 'Priya Nair',     19, 800, DARK.fg, { letterSpacing: -0.02 }),
  label('ts-sp-3-role',   'S3 Role',         620, 960, 210, 18, 'RESEARCH LEAD',  DARK.accentDim, 'transparent', { letterSpacing: 0.1 }),
  para('ts-sp-3-topic',   'S3 Topic',        620, 984, 210, 64, 'AI safety in the age of autonomous agents.', 13, DARK.fgMuted, { lineHeight: 1.5 }),
  label('ts-sp-3-tag',    'S3 Tag',          620,1060, 90, 22, 'WORKSHOP', DARK.fg, DARK.border, { letterSpacing: 0.1 }),

  // Card 4
  box('ts-sp-card-4',     'Speaker Card 4',  866, 856, 242, 248, DARK.card, DARK.border, { radius: 16 }),
  box('ts-sp-card-4-top', 'Card 4 Top Bar',  866, 856, 242,   3, DARK.border, 'transparent'),
  box('ts-sp-4-avatar',   'S4 Avatar',       882, 875,  40,  40, DARK.accentGhost, DARK.accentBorder, { radius: 10 }),
  heading('ts-sp-4-name', 'S4 Name',         882, 928, 210, 28, 'Elena Vasquez',  19, 800, DARK.fg, { letterSpacing: -0.02 }),
  label('ts-sp-4-role',   'S4 Role',         882, 960, 210, 18, 'VP ENGINEERING', DARK.accentDim, 'transparent', { letterSpacing: 0.1 }),
  para('ts-sp-4-topic',   'S4 Topic',        882, 984, 210, 64, 'Scaling payments infrastructure to billions of users.', 13, DARK.fgMuted, { lineHeight: 1.5 }),
  label('ts-sp-4-tag',    'S4 Tag',          882,1060, 60, 22, 'TALK', DARK.fg, DARK.border, { letterSpacing: 0.1 }),

  // ── SCHEDULE  ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄  y: 1180–1700
  box('ts-schedule-bg', 'Schedule Section', 0, 1180, 1200, 520, DARK.bgMuted, DARK.border, { borderTop: 1 }),

  label('ts-sched-kicker',   'Sched Kicker', PX, 1236, 140, 22, 'THE PROGRAM', DARK.accentDim, 'transparent', { letterSpacing: 0.14 }),
  box('ts-sched-kicker-bar', 'Sched Bar',    PX, 1260,  48,  2, DARK.accent, 'transparent'),
  heading('ts-sched-heading','Sched Heading',PX, 1272, 560, 60, 'A focused agenda for builders.', 42, 800, DARK.fg, { letterSpacing: -0.03, lineHeight: 1.1 }),

  // Row height: 64, rows start at 1362
  box('ts-sched-row-1',       'Sched Row 1', PX, 1362, CW, 64, 'transparent', DARK.border, { borderBottom: 1 }),
  label('ts-sched-1-time',    'Time 1',      PX, 1380,  90, 26, '09:00 AM', DARK.accentSoft, DARK.accentGhost, { letterSpacing: 0.06, radius: 6 }),
  heading('ts-sched-1-title', 'Title 1',     PX+120, 1372, 700, 34, 'Opening Keynote: The Next Platform Shift', 20, 700, DARK.fg, { letterSpacing: -0.02 }),
  label('ts-sched-1-tag',     'Tag 1',       PX+CW-90, 1378, 86, 24, 'KEYNOTE', DARK.accentDim, 'transparent', { letterSpacing: 0.1 }),

  box('ts-sched-row-2',       'Sched Row 2', PX, 1426, CW, 64, 'transparent', DARK.border, { borderBottom: 1 }),
  label('ts-sched-2-time',    'Time 2',      PX, 1444,  90, 26, '11:00 AM', DARK.accentSoft, DARK.accentGhost, { letterSpacing: 0.06, radius: 6 }),
  heading('ts-sched-2-title', 'Title 2',     PX+120, 1436, 700, 34, 'Workshop: Building Reliable AI Workflows', 20, 700, DARK.fg, { letterSpacing: -0.02 }),
  label('ts-sched-2-tag',     'Tag 2',       PX+CW-100, 1442, 96, 24, 'WORKSHOP', DARK.fgMuted, 'transparent', { letterSpacing: 0.1 }),

  box('ts-sched-row-3',       'Sched Row 3', PX, 1490, CW, 64, 'transparent', DARK.border, { borderBottom: 1 }),
  label('ts-sched-3-time',    'Time 3',      PX, 1508,  90, 26, '02:00 PM', DARK.accentSoft, DARK.accentGhost, { letterSpacing: 0.06, radius: 6 }),
  heading('ts-sched-3-title', 'Title 3',     PX+120, 1500, 700, 34, 'Panel: Security, Scale, and Open Source', 20, 700, DARK.fg, { letterSpacing: -0.02 }),
  label('ts-sched-3-tag',     'Tag 3',       PX+CW-76, 1506, 72, 24, 'PANEL', DARK.fgMuted, 'transparent', { letterSpacing: 0.1 }),

  box('ts-sched-row-4',       'Sched Row 4', PX, 1554, CW, 64, 'transparent', DARK.border, { borderBottom: 1 }),
  label('ts-sched-4-time',    'Time 4',      PX, 1572,  90, 26, '04:30 PM', DARK.accentSoft, DARK.accentGhost, { letterSpacing: 0.06, radius: 6 }),
  heading('ts-sched-4-title', 'Title 4',     PX+120, 1564, 700, 34, 'Closing: What Ships Next', 20, 700, DARK.fg, { letterSpacing: -0.02 }),
  label('ts-sched-4-tag',     'Tag 4',       PX+CW-80, 1570, 76, 24, 'CLOSING', DARK.fgMuted, 'transparent', { letterSpacing: 0.1 }),

  btn('ts-sched-full-cta', 'Full Schedule CTA', PX, 1642, 200, 44, 'FULL SCHEDULE →', 'transparent', DARK.accentDim, DARK.accentDim, { fontWeight: 700, fontSize: 13, radius: 8 }),

  // ── TICKETS  ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄  y: 1700–2260
  box('ts-ticket-bg', 'Tickets Section', 0, 1700, 1200, 560, DARK.bg, DARK.border, { borderTop: 1 }),

  label('ts-ticket-kicker',   'Tickets Kicker', PX, 1756, 100, 22, 'PASSES', DARK.accentDim, 'transparent', { letterSpacing: 0.14 }),
  box('ts-ticket-kicker-bar', 'Ticket Bar',     PX, 1780,  48,  2, DARK.accent, 'transparent'),
  heading('ts-ticket-title',  'Tickets Heading',PX, 1792, 640, 60, 'Invest in three days that change everything.', 42, 800, DARK.fg, { letterSpacing: -0.03, lineHeight: 1.1 }),

  // 3 ticket cards: cardW = (1040 - 2*24) / 3 = 330.67 → 330, gap = 24
  // x: 80, 80+330+24=434, 434+330+24=788

  // Community
  box('ts-ticket-card-1',     'Community',    PX, 1888, 330, 300, 'transparent', DARK.border, { radius: 14 }),
  heading('ts-ticket-1-name', 'Tier 1 Name',  PX+20, 1908, 290, 34, 'Community',  26, 800, DARK.fg, { letterSpacing: -0.03 }),
  heading('ts-ticket-1-price','Tier 1 Price', PX+20, 1948, 290, 52, '$299', 44, 900, DARK.fg, { letterSpacing: -0.04 }),
  box('ts-ticket-1-div',      'T1 Div',       PX+20, 2008, 290,  1, DARK.border, 'transparent'),
  para('ts-ticket-1-desc',    'T1 Desc',      PX+20, 2020, 290, 72, 'All talks, panels, expo access, and recorded sessions.', 14, DARK.fgMuted, { lineHeight: 1.55 }),
  btn('ts-ticket-1-cta',      'T1 CTA',       PX+20, 2108, 266, 44, 'BUY COMMUNITY', 'transparent', DARK.fg, DARK.border, { fontWeight: 700, fontSize: 12, radius: 8 }),

  // Professional (featured)
  box('ts-ticket-card-2',     'Professional', 434, 1868, 330, 340, DARK.accent, 'transparent', { radius: 14 }),
  label('ts-ticket-2-badge',  'Pro Badge',    450, 1876, 80, 20, 'POPULAR', DARK.accentFg, 'rgba(255,255,255,0.2)', { letterSpacing: 0.14, radius: 4 }),
  heading('ts-ticket-2-name', 'Tier 2 Name',  454, 1910, 290, 34, 'Professional', 26, 800, DARK.accentFg, { letterSpacing: -0.03 }),
  heading('ts-ticket-2-price','Tier 2 Price', 454, 1950, 290, 52, '$599', 44, 900, DARK.accentFg, { letterSpacing: -0.04 }),
  box('ts-ticket-2-div',      'T2 Div',       454, 2010, 290,  1, 'rgba(255,255,255,0.25)', 'transparent'),
  para('ts-ticket-2-desc',    'T2 Desc',      454, 2022, 290, 88, 'Everything in Community + all workshops, VIP networking dinner, and priority seating.', 14, DARK.accentFg, { lineHeight: 1.55, opacity: 90 }),
  btn('ts-ticket-2-cta',      'T2 CTA',       454, 2124, 266, 44, 'BUY PROFESSIONAL', DARK.accentFg, DARK.accent, DARK.accentFg, { fontWeight: 800, fontSize: 12, radius: 8 }),

  // Executive
  box('ts-ticket-card-3',     'Executive',    788, 1888, 330, 300, 'transparent', DARK.border, { radius: 14 }),
  heading('ts-ticket-3-name', 'Tier 3 Name',  808, 1908, 290, 34, 'Executive',  26, 800, DARK.fg, { letterSpacing: -0.03 }),
  heading('ts-ticket-3-price','Tier 3 Price', 808, 1948, 290, 52, '$1,299', 44, 900, DARK.fg, { letterSpacing: -0.04 }),
  box('ts-ticket-3-div',      'T3 Div',       808, 2008, 290,  1, DARK.border, 'transparent'),
  para('ts-ticket-3-desc',    'T3 Desc',      808, 2020, 290, 72, 'Private roundtables, founder dinner, speaker meet & greet, and concierge access.', 14, DARK.fgMuted, { lineHeight: 1.55 }),
  btn('ts-ticket-3-cta',      'T3 CTA',       808, 2108, 266, 44, 'BUY EXECUTIVE', 'transparent', DARK.fg, DARK.border, { fontWeight: 700, fontSize: 12, radius: 8 }),

  // ── FOOTER  ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄  y: 2260–2480
  box('ts-footer-bg', 'Footer', 0, 2260, 1200, 220, DARK.bgMuted, DARK.border, { borderTop: 1 }),

  heading('ts-footer-logo',    'Footer Logo',    PX, 2300, 260, 34, 'TechSummit', 24, 900, DARK.fg, { letterSpacing: -0.03 }),
  para('ts-footer-tagline',    'Footer Tagline', PX, 2340, 320, 44, 'The annual gathering for builders who ship the future.', 13, DARK.fgMuted, { lineHeight: 1.6 }),

  label('ts-footer-col-1-head','Col 1',  500, 2300, 140, 22, 'CONFERENCE', DARK.fgMuted, 'transparent', { letterSpacing: 0.1 }),
  para('ts-footer-col-1-links','Col 1L', 500, 2332, 140, 80, 'Speakers\nSchedule\nWorkshops\nVenue', 13, DARK.fgMuted, { lineHeight: 2 }),

  label('ts-footer-col-2-head','Col 2',  700, 2300, 140, 22, 'ATTEND',     DARK.fgMuted, 'transparent', { letterSpacing: 0.1 }),
  para('ts-footer-col-2-links','Col 2L', 700, 2332, 140, 80, 'Get Tickets\nScholarships\nGroup Rates\nFAQ', 13, DARK.fgMuted, { lineHeight: 2 }),

  label('ts-footer-col-3-head','Col 3',  900, 2300, 140, 22, 'CONNECT',    DARK.fgMuted, 'transparent', { letterSpacing: 0.1 }),
  para('ts-footer-col-3-links','Col 3L', 900, 2332, 140, 80, 'Twitter / X\nLinkedIn\nInstagram\nNewsletter', 13, DARK.fgMuted, { lineHeight: 2 }),

  box('ts-footer-divider',     'Footer Div',     PX, 2430, CW,  1, DARK.border, 'transparent'),
  para('ts-footer-copyright',  'Copyright',      PX, 2446, 460, 22, '© 2026 TechSummit. All rights reserved.', 12, DARK.fgMuted),
  para('ts-footer-legal',      'Legal',          780, 2446, 360, 22, 'Privacy Policy     Terms of Service', 12, DARK.fgMuted, { textAlign: 'right' }),
]

// ─────────────────────────────────────────────────────────────────────────────
// LIGHT THEME MAPPING
// ─────────────────────────────────────────────────────────────────────────────

const DARK_TO_LIGHT = {
  [DARK.bg]:           LIGHT.bg,
  [DARK.bgMuted]:      LIGHT.bgMuted,
  [DARK.card]:         LIGHT.card,
  [DARK.fg]:           LIGHT.fg,
  [DARK.fgMuted]:      LIGHT.fgMuted,
  [DARK.fgSubtle]:     LIGHT.fgSubtle,
  [DARK.accent]:       LIGHT.accent,
  [DARK.accentFg]:     LIGHT.accentFg,
  [DARK.accentSoft]:   LIGHT.accentSoft,
  [DARK.accentDim]:    LIGHT.accentDim,
  [DARK.accentGhost]:  LIGHT.accentGhost,
  [DARK.accentBorder]: LIGHT.accentBorder,
  [DARK.border]:       LIGHT.border,
  [DARK.borderNav]:    LIGHT.borderNav,
  [DARK.borderGhost]:  LIGHT.borderGhost,
}

function remapColor(val) {
  if (!val || val === 'transparent') return val
  return DARK_TO_LIGHT[val] ?? val
}

function toLightThemeTS(el) {
  return {
    ...el,
    fill:        remapColor(el.fill),
    textColor:   remapColor(el.textColor),
    borderColor: remapColor(el.borderColor),
    shadowColor: remapColor(el.shadowColor),
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// THEME LOOKUP TABLES  (built from base, before withResponsive)
// ─────────────────────────────────────────────────────────────────────────────

const tsThemeById = {
  dark:  Object.fromEntries(techSummitBaseElements.map(el => [el.id, el])),
  light: Object.fromEntries(techSummitBaseElements.map(toLightThemeTS).map(el => [el.id, el])),
}

// ─────────────────────────────────────────────────────────────────────────────
// PUBLIC API
// ─────────────────────────────────────────────────────────────────────────────

export function isTechSummitTemplate(elements = []) {
  return elements.some(el => String(el.id || '').startsWith('ts-'))
}

export function applyTechSummitTheme(elements = [], theme = 'dark') {
  const palette = tsThemeById[theme] || tsThemeById.dark
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

export function getTechSummitCanvasFill(theme = 'dark') {
  return theme === 'light' ? LIGHT.bg : DARK.bg
}

// Compute exact canvas height from element bounding boxes — zero trailing space
function computeCanvasHeight(elements) {
  return Math.max(...elements.map(el => (el.y ?? 0) + (el.height ?? 0)))
}

export const TECH_SUMMIT_CANVAS_HEIGHT = computeCanvasHeight(techSummitBaseElements)

// Exported elements start in LIGHT mode
// canvasHeight + canvasWidth attached directly so any renderer reading off the array works
const _lightElements = withResponsive(techSummitBaseElements.map(toLightThemeTS))
export const techSummitElements = Object.assign(_lightElements, {
  canvasHeight: TECH_SUMMIT_CANVAS_HEIGHT,
  canvasWidth:  1200,
})

export default techSummitBaseElements