// ─────────────────────────────────────────────────────────────────────────────
// TechSummitTemplate.jsx  –  "TechSummit" Conference Landing Page
// Default theme: LIGHT  (dark toggle available)
//
// Mirrors BoldSummitTemplate.jsx pattern exactly:
//   • Base array defined in DARK tokens
//   • tsThemeById built from base array (before responsive)
//   • Exported techSummitElements = withResponsive(base.map(toLightThemeTS))
//     so the canvas loads in light mode by default
//   • applyTechSummitTheme swaps colors without touching geometry
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
  cardFeat:    '#0B1628',
  fg:          '#F0F4FF',
  fgMuted:     '#9BAEC8',
  fgSubtle:    '#5F7394',
  accent:      '#3B82F6',
  accentFg:    '#ffffff',
  accentSoft:  '#93C5FD',
  accentDim:   '#60A5FA',
  accentGhost: 'rgba(59,130,246,0.14)',
  accentBorder:'rgba(59,130,246,0.35)',
  accentGlow:  'rgba(59,130,246,0.22)',
  border:      'rgba(255,255,255,0.08)',
  borderNav:   'rgba(255,255,255,0.10)',
  borderGhost: 'rgba(255,255,255,0.18)',
}

const LIGHT = {
  bg:          '#F8FAFF',
  bgMuted:     '#FFFFFF',
  card:        '#FFFFFF',
  cardFeat:    '#EEF3FF',
  fg:          '#0F172A',
  fgMuted:     '#475569',
  fgSubtle:    '#64748B',
  accent:      '#2563EB',
  accentFg:    '#ffffff',
  accentSoft:  '#1D4ED8',
  accentDim:   '#2563EB',
  accentGhost: '#DBEAFE',
  accentBorder:'rgba(37,99,235,0.30)',
  accentGlow:  'rgba(37,99,235,0.14)',
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
// BASE ELEMENTS  — dark-mode reference (DO NOT export directly)
// tsThemeById is built from this before withResponsive runs
// ─────────────────────────────────────────────────────────────────────────────

const techSummitBaseElements = [

  // ── NAVIGATION ────────────────────────────────────────────────────────────
  box('ts-nav-bg',    'Navigation Bar',   0,  0, 1200, 76, DARK.bg,      DARK.borderNav, { borderBottom: 1 }),
  box('ts-logo-box',  'Logo Mark',       48, 20,   36, 36, DARK.accent,  'transparent',  { radius: 8 }),
  heading('ts-logo',  'Logo Text',       94, 21,  200, 32, 'TechSummit', 20, 800, DARK.fg, { letterSpacing: -0.02 }),
  para('ts-nav-links','Navigation Links',400, 27,  420, 22, 'Speakers     Schedule     Tickets     Sponsors', 13, DARK.fgMuted, { textAlign: 'center', fontWeight: 500 }),
  btn('ts-nav-cta',   'Navigation CTA', 1032, 17,  120, 42, 'Get Tickets', DARK.accent, DARK.accentFg, DARK.accent, { fontSize: 13, radius: 10 }),

  // ── HERO ──────────────────────────────────────────────────────────────────
  box('ts-hero-bg',      'Hero Section',      0,  76, 1200, 620, DARK.bg,   'transparent'),
  box('ts-hero-card',    'Hero Visual Card', 734, 156,  370, 380, DARK.card, DARK.accentBorder, { radius: 28, shadowColor: DARK.accentGlow }),

  label('ts-hero-chip',    'Hero Eyebrow',      76, 150, 340,  28, 'JUNE 12–14, 2026  ·  SAN FRANCISCO', DARK.accentSoft, DARK.accentGhost, { radius: 999 }),
  heading('ts-hero-title', 'Hero Title',        72, 196, 620, 200, 'Where builders shape the next decade of technology.', 56, 800, DARK.fg, { letterSpacing: -0.03, lineHeight: 1.08 }),
  para('ts-hero-copy',     'Hero Description',  76, 410, 540,  80, 'Three days of AI, infrastructure, security, design systems, and the people shipping the future.', 18, DARK.fgMuted, { lineHeight: 1.6 }),
  btn('ts-hero-primary',   'Primary CTA',       76, 518, 162,  52, 'Reserve Seat', DARK.accent,      DARK.accentFg,  DARK.accent,      { fontWeight: 800, fontSize: 15 }),
  btn('ts-hero-secondary', 'Secondary CTA',    254, 518, 150,  52, 'View Agenda',  'transparent',    DARK.fg,        DARK.borderGhost, { fontWeight: 700, fontSize: 15 }),

  heading('ts-visual-title',  'Visual Title',      774, 196, 290,  52, 'Main Stage', 34, 800, DARK.fg),
  para('ts-visual-copy',      'Visual Copy',       774, 258, 288,  96, 'Keynotes, workshops, panels, and hands-on demos from industry leaders.', 15, DARK.fgMuted, { lineHeight: 1.65 }),
  box('ts-visual-divider',    'Visual Divider',    774, 368, 290,   1, DARK.border,     'transparent'),
  heading('ts-visual-stat-a', 'Stat Speakers',     774, 388, 120,  46, '50+', 38, 800, DARK.accentDim),
  heading('ts-visual-stat-b', 'Stat Attendees',    922, 388, 130,  46, '5k',  38, 800, DARK.accentDim),
  para('ts-visual-label-a',   'Speakers Label',    774, 438, 120,  22, 'Speakers',  13, DARK.fgMuted),
  para('ts-visual-label-b',   'Attendees Label',   922, 438, 130,  22, 'Attendees', 13, DARK.fgMuted),

  // ── STATS BAND ────────────────────────────────────────────────────────────
  box('ts-stats-bg',      'Stats Band',        0, 696, 1200, 132, DARK.bgMuted, DARK.border, { borderTop: 1, borderBottom: 1 }),
  heading('ts-stat-1',    'Stat 1',          100, 722,  180,  44, '3 Days', 34, 800, DARK.fg, { letterSpacing: -0.03 }),
  para('ts-stat-1-label', 'Stat 1 Label',    100, 770,  180,  22, 'conference program', 13, DARK.fgMuted),
  heading('ts-stat-2',    'Stat 2',          372, 722,  180,  44, '80+',    34, 800, DARK.fg, { letterSpacing: -0.03 }),
  para('ts-stat-2-label', 'Stat 2 Label',    372, 770,  180,  22, 'technical sessions', 13, DARK.fgMuted),
  heading('ts-stat-3',    'Stat 3',          644, 722,  180,  44, '24',     34, 800, DARK.fg, { letterSpacing: -0.03 }),
  para('ts-stat-3-label', 'Stat 3 Label',    644, 770,  180,  22, 'workshops',           13, DARK.fgMuted),
  heading('ts-stat-4',    'Stat 4',          916, 722,  180,  44, '120',    34, 800, DARK.fg, { letterSpacing: -0.03 }),
  para('ts-stat-4-label', 'Stat 4 Label',    916, 770,  180,  22, 'sponsors & demos',    13, DARK.fgMuted),

  // ── SPEAKERS ──────────────────────────────────────────────────────────────
  box('ts-speakers-bg',        'Speakers Section',   0,  828, 1200, 520, DARK.bg,     DARK.border, { borderTop: 1 }),
  label('ts-speakers-kicker',  'Speakers Kicker',  100,  888,  160,  24, 'FEATURED SPEAKERS', DARK.accentDim, 'transparent', { letterSpacing: 0.15 }),
  box('ts-speakers-kicker-bar','Kicker Bar',        100,  916,   48,   2, DARK.accent, 'transparent'),
  heading('ts-speakers-title', 'Speakers Heading', 100,  930,  580,  66, 'Leaders from the front lines.', 44, 800, DARK.fg, { letterSpacing: -0.03, lineHeight: 1.1 }),

  // Card 1
  box('ts-sp-card-1',     'Speaker Card 1',   100, 1040, 238, 240, DARK.card,  DARK.border,       { radius: 18 }),
  box('ts-sp-card-1-top', 'Card 1 Top Bar',   100, 1040, 238,   3, DARK.accent,'transparent'),
  box('ts-sp-1-avatar',   'Speaker 1 Avatar', 124, 1062,  44,  44, DARK.accentGhost, DARK.accentBorder, { radius: 12 }),
  heading('ts-sp-1-name', 'Speaker 1 Name',   124, 1118, 190,  30, 'Sarah Chen',     20, 800, DARK.fg,     { letterSpacing: -0.02 }),
  label('ts-sp-1-role',   'Speaker 1 Role',   124, 1154, 190,  20, 'CEO, NEXUS AI',  DARK.accentDim, 'transparent', { letterSpacing: 0.1 }),
  para('ts-sp-1-topic',   'Speaker 1 Topic',  124, 1182, 190,  56, 'Foundation models and the next platform shift.', 13, DARK.fgMuted, { lineHeight: 1.5 }),
  label('ts-sp-1-tag',    'Speaker 1 Tag',    124, 1250,  90,  22, 'KEYNOTE', DARK.fg, DARK.border, { letterSpacing: 0.1 }),

  // Card 2
  box('ts-sp-card-2',     'Speaker Card 2',   358, 1040, 238, 240, DARK.card,  DARK.border,       { radius: 18 }),
  box('ts-sp-card-2-top', 'Card 2 Top Bar',   358, 1040, 238,   3, DARK.border,'transparent'),
  box('ts-sp-2-avatar',   'Speaker 2 Avatar', 382, 1062,  44,  44, DARK.accentGhost, DARK.accentBorder, { radius: 12 }),
  heading('ts-sp-2-name', 'Speaker 2 Name',   382, 1118, 190,  30, 'Marcus Webb',    20, 800, DARK.fg,     { letterSpacing: -0.02 }),
  label('ts-sp-2-role',   'Speaker 2 Role',   382, 1154, 190,  20, 'CTO, ORBITAL',   DARK.accentDim, 'transparent', { letterSpacing: 0.1 }),
  para('ts-sp-2-topic',   'Speaker 2 Topic',  382, 1182, 190,  56, 'Distributed systems at 100M requests per second.', 13, DARK.fgMuted, { lineHeight: 1.5 }),
  label('ts-sp-2-tag',    'Speaker 2 Tag',    382, 1250,  60,  22, 'TALK', DARK.fg, DARK.border, { letterSpacing: 0.1 }),

  // Card 3
  box('ts-sp-card-3',     'Speaker Card 3',   616, 1040, 238, 240, DARK.card,  DARK.border,       { radius: 18 }),
  box('ts-sp-card-3-top', 'Card 3 Top Bar',   616, 1040, 238,   3, DARK.border,'transparent'),
  box('ts-sp-3-avatar',   'Speaker 3 Avatar', 640, 1062,  44,  44, DARK.accentGhost, DARK.accentBorder, { radius: 12 }),
  heading('ts-sp-3-name', 'Speaker 3 Name',   640, 1118, 190,  30, 'Priya Nair',     20, 800, DARK.fg,     { letterSpacing: -0.02 }),
  label('ts-sp-3-role',   'Speaker 3 Role',   640, 1154, 190,  20, 'RESEARCH LEAD',  DARK.accentDim, 'transparent', { letterSpacing: 0.1 }),
  para('ts-sp-3-topic',   'Speaker 3 Topic',  640, 1182, 190,  56, 'AI safety in the age of autonomous agents.', 13, DARK.fgMuted, { lineHeight: 1.5 }),
  label('ts-sp-3-tag',    'Speaker 3 Tag',    640, 1250,  90,  22, 'WORKSHOP', DARK.fg, DARK.border, { letterSpacing: 0.1 }),

  // Card 4
  box('ts-sp-card-4',     'Speaker Card 4',   874, 1040, 238, 240, DARK.card,  DARK.border,       { radius: 18 }),
  box('ts-sp-card-4-top', 'Card 4 Top Bar',   874, 1040, 238,   3, DARK.border,'transparent'),
  box('ts-sp-4-avatar',   'Speaker 4 Avatar', 898, 1062,  44,  44, DARK.accentGhost, DARK.accentBorder, { radius: 12 }),
  heading('ts-sp-4-name', 'Speaker 4 Name',   898, 1118, 190,  30, 'Elena Vasquez',  20, 800, DARK.fg,     { letterSpacing: -0.02 }),
  label('ts-sp-4-role',   'Speaker 4 Role',   898, 1154, 190,  20, 'VP ENGINEERING', DARK.accentDim, 'transparent', { letterSpacing: 0.1 }),
  para('ts-sp-4-topic',   'Speaker 4 Topic',  898, 1182, 190,  56, 'Scaling payments infrastructure to billions of users.', 13, DARK.fgMuted, { lineHeight: 1.5 }),
  label('ts-sp-4-tag',    'Speaker 4 Tag',    898, 1250,  60,  22, 'TALK', DARK.fg, DARK.border, { letterSpacing: 0.1 }),

  // ── SCHEDULE ──────────────────────────────────────────────────────────────
  box('ts-schedule-bg',      'Schedule Section',   0, 1348, 1200, 560, DARK.bgMuted, DARK.border, { borderTop: 1 }),
  label('ts-sched-kicker',   'Schedule Kicker',  100, 1406,  140,  24, 'THE PROGRAM', DARK.accentDim, 'transparent', { letterSpacing: 0.15 }),
  box('ts-sched-kicker-bar', 'Schedule Kicker Bar', 100, 1434, 48, 2,  DARK.accent, 'transparent'),
  heading('ts-sched-heading','Schedule Heading',  100, 1450,  560,  66, 'A focused agenda for builders.', 44, 800, DARK.fg, { letterSpacing: -0.03, lineHeight: 1.1 }),

  box('ts-sched-row-1',      'Schedule Row 1',   100, 1552, 1000,  72, 'transparent', DARK.border, { borderBottom: 1 }),
  label('ts-sched-1-time',   'Sched 1 Time',     100, 1572,   90,  26, '09:00 AM', DARK.accentSoft, DARK.accentGhost, { letterSpacing: 0.08, radius: 6 }),
  heading('ts-sched-1-title','Sched 1 Title',    228, 1564,  620,  34, 'Opening Keynote: The Next Platform Shift', 21, 700, DARK.fg, { letterSpacing: -0.02 }),
  label('ts-sched-1-tag',    'Sched 1 Tag',      946, 1572,   90,  24, 'KEYNOTE',  DARK.accentDim, 'transparent', { letterSpacing: 0.1 }),

  box('ts-sched-row-2',      'Schedule Row 2',   100, 1624, 1000,  72, 'transparent', DARK.border, { borderBottom: 1 }),
  label('ts-sched-2-time',   'Sched 2 Time',     100, 1644,   90,  26, '11:00 AM', DARK.accentSoft, DARK.accentGhost, { letterSpacing: 0.08, radius: 6 }),
  heading('ts-sched-2-title','Sched 2 Title',    228, 1636,  620,  34, 'Workshop: Building Reliable AI Workflows', 21, 700, DARK.fg, { letterSpacing: -0.02 }),
  label('ts-sched-2-tag',    'Sched 2 Tag',      946, 1644,  100,  24, 'WORKSHOP', DARK.fgMuted,  'transparent', { letterSpacing: 0.1 }),

  box('ts-sched-row-3',      'Schedule Row 3',   100, 1696, 1000,  72, 'transparent', DARK.border, { borderBottom: 1 }),
  label('ts-sched-3-time',   'Sched 3 Time',     100, 1716,   90,  26, '02:00 PM', DARK.accentSoft, DARK.accentGhost, { letterSpacing: 0.08, radius: 6 }),
  heading('ts-sched-3-title','Sched 3 Title',    228, 1708,  620,  34, 'Panel: Security, Scale, and Open Source', 21, 700, DARK.fg, { letterSpacing: -0.02 }),
  label('ts-sched-3-tag',    'Sched 3 Tag',      946, 1716,   80,  24, 'PANEL',    DARK.fgMuted,  'transparent', { letterSpacing: 0.1 }),

  box('ts-sched-row-4',      'Schedule Row 4',   100, 1768, 1000,  72, 'transparent', DARK.border, { borderBottom: 1 }),
  label('ts-sched-4-time',   'Sched 4 Time',     100, 1788,   90,  26, '04:30 PM', DARK.accentSoft, DARK.accentGhost, { letterSpacing: 0.08, radius: 6 }),
  heading('ts-sched-4-title','Sched 4 Title',    228, 1780,  620,  34, 'Closing: What Ships Next', 21, 700, DARK.fg, { letterSpacing: -0.02 }),
  label('ts-sched-4-tag',    'Sched 4 Tag',      946, 1788,   80,  24, 'CLOSING',  DARK.fgMuted,  'transparent', { letterSpacing: 0.1 }),

  btn('ts-sched-full-cta',   'Full Schedule CTA', 100, 1860, 220, 48, 'FULL SCHEDULE →', 'transparent', DARK.accentDim, DARK.accentDim, { fontWeight: 700, fontSize: 13 }),

  // ── TICKETS ───────────────────────────────────────────────────────────────
  box('ts-ticket-bg',         'Tickets Section',    0, 1908, 1200, 580, DARK.bg,     DARK.border, { borderTop: 1 }),
  label('ts-ticket-kicker',   'Tickets Kicker',   100, 1968,  100,  24, 'PASSES',    DARK.accentDim, 'transparent', { letterSpacing: 0.15 }),
  box('ts-ticket-kicker-bar', 'Ticket Kicker Bar',100, 1996,   48,   2, DARK.accent, 'transparent'),
  heading('ts-ticket-title',  'Tickets Heading',  100, 2012,  640,  66, 'Invest in three days that change everything.', 44, 800, DARK.fg, { letterSpacing: -0.03, lineHeight: 1.1 }),

  // Community
  box('ts-ticket-card-1',      'Community Ticket',  100, 2116, 310, 310, 'transparent',  DARK.border),
  heading('ts-ticket-1-name',  'Ticket 1 Name',     124, 2138, 262,  34, 'Community',  28, 800, DARK.fg, { letterSpacing: -0.03 }),
  heading('ts-ticket-1-price', 'Ticket 1 Price',    124, 2184, 262,  58, '$299',        48, 900, DARK.fg, { letterSpacing: -0.04 }),
  box('ts-ticket-1-div',       'Ticket 1 Divider',  124, 2250, 262,   1, DARK.border, 'transparent'),
  para('ts-ticket-1-desc',     'Ticket 1 Desc',     124, 2264, 262,  72, 'All talks, panels, expo access, and recorded sessions.', 14, DARK.fgMuted, { lineHeight: 1.55 }),
  btn('ts-ticket-1-cta',       'Ticket 1 CTA',      124, 2356, 248,  44, 'BUY COMMUNITY',    'transparent', DARK.fg,        DARK.border,  { fontWeight: 700, fontSize: 12, radius: 8 }),

  // Professional (featured)
  box('ts-ticket-card-2',      'Professional Ticket', 452, 2096, 310, 350, DARK.accent,    'transparent'),
  box('ts-ticket-2-badge-bg',  'Pro Badge BG',         452, 2096, 116,  28, DARK.accentFg,  'transparent', { opacity: 20 }),
  label('ts-ticket-2-badge',   'Pro Badge',            468, 2101,  80,  18, 'POPULAR',      DARK.accentFg, 'transparent', { letterSpacing: 0.15 }),
  heading('ts-ticket-2-name',  'Ticket 2 Name',        476, 2146, 262,  34, 'Professional', 28, 800, DARK.accentFg, { letterSpacing: -0.03 }),
  heading('ts-ticket-2-price', 'Ticket 2 Price',       476, 2192, 262,  58, '$599',          48, 900, DARK.accentFg, { letterSpacing: -0.04 }),
  box('ts-ticket-2-div',       'Ticket 2 Divider',     476, 2258, 262,   1, 'rgba(255,255,255,0.25)', 'transparent'),
  para('ts-ticket-2-desc',     'Ticket 2 Desc',        476, 2272, 262,  88, 'Everything in Community + all workshops, VIP networking dinner, and priority seating.', 14, DARK.accentFg, { lineHeight: 1.55, opacity: 90 }),
  btn('ts-ticket-2-cta',       'Ticket 2 CTA',         476, 2378, 248,  44, 'BUY PROFESSIONAL', DARK.accentFg, DARK.accent, DARK.accentFg, { fontWeight: 800, fontSize: 12, radius: 8 }),

  // Executive
  box('ts-ticket-card-3',      'Executive Ticket',  804, 2116, 310, 310, 'transparent',  DARK.border),
  heading('ts-ticket-3-name',  'Ticket 3 Name',     828, 2138, 262,  34, 'Executive',  28, 800, DARK.fg, { letterSpacing: -0.03 }),
  heading('ts-ticket-3-price', 'Ticket 3 Price',    828, 2184, 262,  58, '$1,299',      48, 900, DARK.fg, { letterSpacing: -0.04 }),
  box('ts-ticket-3-div',       'Ticket 3 Divider',  828, 2250, 262,   1, DARK.border, 'transparent'),
  para('ts-ticket-3-desc',     'Ticket 3 Desc',     828, 2264, 262,  72, 'Private roundtables, founder dinner, speaker meet & greet, and concierge access.', 14, DARK.fgMuted, { lineHeight: 1.55 }),
  btn('ts-ticket-3-cta',       'Ticket 3 CTA',      828, 2356, 248,  44, 'BUY EXECUTIVE',    'transparent', DARK.fg,        DARK.border,  { fontWeight: 700, fontSize: 12, radius: 8 }),

  // ── FOOTER ────────────────────────────────────────────────────────────────
  box('ts-footer-bg',         'Footer',              0, 2676, 1200, 300, DARK.bgMuted, DARK.border, { borderTop: 1 }),
  heading('ts-footer-logo',   'Footer Logo',        72, 2726,  260,  36, 'TechSummit', 26, 900, DARK.fg, { letterSpacing: -0.03 }),
  para('ts-footer-tagline',   'Footer Tagline',     72, 2770,  320,  44, 'The annual gathering for builders who ship the future.', 13, DARK.fgMuted, { lineHeight: 1.6 }),

  label('ts-footer-col-1-head','Col 1 Head',       520, 2726, 140, 24, 'CONFERENCE', DARK.fgMuted, 'transparent', { letterSpacing: 0.12 }),
  para('ts-footer-col-1-links','Col 1 Links',      520, 2762, 140, 90, 'Speakers\nSchedule\nWorkshops\nVenue', 13, DARK.fgMuted, { lineHeight: 2 }),

  label('ts-footer-col-2-head','Col 2 Head',       720, 2726, 140, 24, 'ATTEND',     DARK.fgMuted, 'transparent', { letterSpacing: 0.12 }),
  para('ts-footer-col-2-links','Col 2 Links',      720, 2762, 140, 90, 'Get Tickets\nScholarships\nGroup Rates\nFAQ', 13, DARK.fgMuted, { lineHeight: 2 }),

  label('ts-footer-col-3-head','Col 3 Head',       920, 2726, 140, 24, 'CONNECT',    DARK.fgMuted, 'transparent', { letterSpacing: 0.12 }),
  para('ts-footer-col-3-links','Col 3 Links',      920, 2762, 140, 90, 'Twitter / X\nLinkedIn\nInstagram\nNewsletter', 13, DARK.fgMuted, { lineHeight: 2 }),

  box('ts-footer-divider',    'Footer Divider',     72, 2870, 1060,  1, DARK.border, 'transparent'),
  para('ts-footer-copyright', 'Footer Copyright',   72, 2882,  460, 22, '© 2026 TechSummit. All rights reserved.', 12, DARK.fgMuted),
  para('ts-footer-legal',     'Footer Legal',      760, 2882,  360, 22, 'Privacy Policy     Terms of Service', 12, DARK.fgMuted, { textAlign: 'right' }),
]

// ─────────────────────────────────────────────────────────────────────────────
// LIGHT THEME MAPPING  (same DARK_TO_LIGHT pattern as BoldSummit)
// ─────────────────────────────────────────────────────────────────────────────

const DARK_TO_LIGHT = {
  [DARK.bg]:           LIGHT.bg,
  [DARK.bgMuted]:      LIGHT.bgMuted,
  [DARK.card]:         LIGHT.card,
  [DARK.cardFeat]:     LIGHT.cardFeat,
  [DARK.fg]:           LIGHT.fg,
  [DARK.fgMuted]:      LIGHT.fgMuted,
  [DARK.fgSubtle]:     LIGHT.fgSubtle,
  [DARK.accent]:       LIGHT.accent,
  [DARK.accentFg]:     LIGHT.accentFg,
  [DARK.accentSoft]:   LIGHT.accentSoft,
  [DARK.accentDim]:    LIGHT.accentDim,
  [DARK.accentGhost]:  LIGHT.accentGhost,
  [DARK.accentBorder]: LIGHT.accentBorder,
  [DARK.accentGlow]:   LIGHT.accentGlow,
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
// THEME LOOKUP TABLES
// Built from the BASE array (before withResponsive) — this is the critical fix.
// After withResponsive runs, flat color fields are moved into breakpoint buckets
// and the top-level fill/textColor etc. may be undefined, breaking remap.
// Building from base guarantees every id → color mapping is correct.
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

// ─────────────────────────────────────────────────────────────────────────────
// EXPORTED ELEMENTS
// Starts in LIGHT mode (toLightThemeTS applied before withResponsive)
// so the canvas renders correctly on first load without needing a theme call.
// ─────────────────────────────────────────────────────────────────────────────

export const techSummitElements = withResponsive(techSummitBaseElements.map(toLightThemeTS))

export default techSummitBaseElements