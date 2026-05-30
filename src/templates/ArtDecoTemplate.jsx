// ─────────────────────────────────────────────────────────────────────────────
// ArtDecoTemplate.js  –  "The Gatsby Gala" Event Template
//
// Drop this file next to template.js and wire it into TEMPLATES exactly like
// techSummitTemplate1.  The element schema is identical to the TechSummit
// template so every existing renderer / responsive helper / theme switch works
// without modification.
//
// Sections
//   • Navigation Bar            (y:   0 – 76)
//   • Hero                      (y:  76 – 740)
//   • Stats Band                (y: 740 – 880)
//   • Speakers                  (y: 880 – 1440)
//   • Schedule                  (y:1440 – 1980)
//   • Tickets / Passes          (y:1980 – 2560)
//   • Footer CTA                (y:2560 – 2820)
//
// Total canvas height: 2820 px  (width: 1200 px)
//
// Dark palette  → Art Deco Obsidian + Metallic Gold
// Light palette → Champagne Ivory  + Deep Bronze
// ─────────────────────────────────────────────────────────────────────────────

import { generateResponsiveDefaults } from '../utils/responsive'

// ── Helpers ──────────────────────────────────────────────────────────────────

const withResponsive = (elements, width = 1200) =>
  elements.map(element => generateResponsiveDefaults(element, width))

// ── Design Tokens ─────────────────────────────────────────────────────────────
// Dark (base) values
const D = {
  bg:        '#0A0A0A',   // Obsidian Black
  surface:   '#141414',   // Rich Charcoal
  surface2:  '#1A1A1A',   // Slightly lighter surface (featured cards)
  gold:      '#D4AF37',   // Metallic Gold
  goldSoft:  'rgba(212,175,55,0.35)',
  goldGhost: 'rgba(212,175,55,0.12)',
  cream:     '#F2F0E4',   // Champagne Cream
  muted:     '#888888',   // Pewter
  navy:      '#1E3D59',   // Midnight Blue
  border:    'rgba(212,175,55,0.30)',  // subtle gold border
  borderHi:  '#D4AF37',               // full gold border
  glow:      'rgba(212,175,55,0.18)', // shadow/glow colour
}

// ── Base Element Array ────────────────────────────────────────────────────────

const artDecoBaseElements = [

  // ── NAVIGATION ──────────────────────────────────────────────────────────────
  {
    id: 'ad-nav-bg', type: 'container', name: 'Navigation Bar',
    x: 0, y: 0, width: 1200, height: 76,
    fill: D.bg, borderColor: D.goldSoft, radius: 0, opacity: 100,
  },
  {
    id: 'ad-logo-box', type: 'container', name: 'Logo Diamond',
    x: 48, y: 22, width: 32, height: 32,
    fill: D.gold, borderColor: D.gold, radius: 0, opacity: 100,
    // rotated 45° via renderer transform – stored as data hint
    transform: 'rotate(45deg)',
  },
  {
    id: 'ad-logo', type: 'heading', name: 'Logo Text',
    x: 94, y: 22, width: 210, height: 32,
    content: 'GATSBY GALA', fontSize: 18, fontWeight: 700, fontFamily: 'Marcellus',
    textColor: D.gold, opacity: 100,
  },
  {
    id: 'ad-nav-links', type: 'paragraph', name: 'Navigation Links',
    x: 390, y: 28, width: 440, height: 22,
    content: 'Performers     Programme     Tickets     Venue',
    fontSize: 12, fontWeight: 500, fontFamily: 'Josefin Sans',
    textColor: D.muted, textAlign: 'center', opacity: 100,
  },
  {
    id: 'ad-nav-cta', type: 'button', name: 'Navigation CTA',
    x: 1028, y: 18, width: 132, height: 40,
    content: 'RESERVE', fill: 'transparent', textColor: D.gold,
    borderColor: D.gold, fontSize: 11, fontWeight: 700, fontFamily: 'Josefin Sans',
    radius: 0, opacity: 100,
  },

  // ── HERO ────────────────────────────────────────────────────────────────────
  {
    id: 'ad-hero-bg', type: 'container', name: 'Hero Section',
    x: 0, y: 76, width: 1200, height: 664,
    fill: D.bg, radius: 0, opacity: 100,
  },
  // Sunburst radial glow behind headline (decorative container)
  {
    id: 'ad-hero-sunburst', type: 'container', name: 'Hero Sunburst Glow',
    x: 300, y: 76, width: 600, height: 600,
    fill: D.goldGhost, borderColor: 'transparent', radius: 0, opacity: 60,
  },
  // Hero visual card (right side)
  {
    id: 'ad-hero-card', type: 'container', name: 'Hero Visual Card',
    x: 726, y: 136, width: 396, height: 440,
    fill: D.surface, borderColor: D.borderHi, radius: 0,
    shadowColor: D.glow, opacity: 100,
  },
  // Decorative inner frame on hero card
  {
    id: 'ad-hero-card-inner', type: 'container', name: 'Hero Card Inner Frame',
    x: 742, y: 152, width: 364, height: 408,
    fill: 'transparent', borderColor: D.goldSoft, radius: 0, opacity: 100,
  },
  // Eyebrow label
  {
    id: 'ad-hero-chip', type: 'label', name: 'Hero Eyebrow',
    x: 76, y: 148, width: 380, height: 26,
    content: 'NEW YORK CITY  ·  31 DECEMBER 2026', fontSize: 11, fontWeight: 700,
    fontFamily: 'Josefin Sans', textColor: D.gold,
    fill: D.goldGhost, radius: 0, opacity: 100,
  },
  // Main headline
  {
    id: 'ad-hero-title', type: 'heading', name: 'Hero Title',
    x: 72, y: 196, width: 590, height: 210,
    content: 'An Evening of Jazz, Art & Revelry.', fontSize: 56, fontWeight: 400,
    fontFamily: 'Marcellus', textColor: D.cream, lineHeight: 1.1, opacity: 100,
  },
  // Gold rule divider under title
  {
    id: 'ad-hero-rule', type: 'container', name: 'Hero Gold Rule',
    x: 72, y: 418, width: 96, height: 2,
    fill: D.gold, borderColor: 'transparent', radius: 0, opacity: 100,
  },
  {
    id: 'ad-hero-copy', type: 'paragraph', name: 'Hero Description',
    x: 76, y: 434, width: 550, height: 80,
    content: 'The most anticipated black-tie event of the season — live orchestras, curated art installations, and an open bar beneath gilded ceilings.',
    fontSize: 16, fontWeight: 400, fontFamily: 'Josefin Sans',
    textColor: D.muted, lineHeight: 1.7, opacity: 100,
  },
  {
    id: 'ad-hero-primary', type: 'button', name: 'Primary CTA',
    x: 76, y: 550, width: 168, height: 50,
    content: 'SECURE YOUR TABLE', fill: D.gold, textColor: '#0A0A0A',
    fontSize: 11, fontWeight: 700, fontFamily: 'Josefin Sans', radius: 0, opacity: 100,
  },
  {
    id: 'ad-hero-secondary', type: 'button', name: 'Secondary CTA',
    x: 260, y: 550, width: 144, height: 50,
    content: 'VIEW PROGRAMME', fill: 'transparent', textColor: D.cream,
    borderColor: D.border, fontSize: 11, fontWeight: 700, fontFamily: 'Josefin Sans',
    radius: 0, opacity: 100,
  },
  // Visual card content
  {
    id: 'ad-visual-label', type: 'label', name: 'Visual Card Label',
    x: 762, y: 172, width: 140, height: 22,
    content: 'EVENING PROGRAMME', fontSize: 10, fontWeight: 700,
    fontFamily: 'Josefin Sans', textColor: D.gold,
    fill: 'transparent', radius: 0, opacity: 100,
  },
  {
    id: 'ad-visual-title', type: 'heading', name: 'Visual Title',
    x: 762, y: 204, width: 320, height: 72,
    content: 'Grand Ballroom', fontSize: 36, fontWeight: 400,
    fontFamily: 'Marcellus', textColor: D.cream, opacity: 100,
  },
  {
    id: 'ad-visual-rule', type: 'container', name: 'Visual Gold Rule',
    x: 762, y: 286, width: 64, height: 1,
    fill: D.gold, borderColor: 'transparent', radius: 0, opacity: 100,
  },
  {
    id: 'ad-visual-copy', type: 'paragraph', name: 'Visual Copy',
    x: 762, y: 302, width: 308, height: 88,
    content: 'Cocktail hour, five-course dinner, live big band, and a midnight countdown beneath a cascade of gold confetti.',
    fontSize: 14, fontFamily: 'Josefin Sans', textColor: D.muted,
    lineHeight: 1.65, opacity: 100,
  },
  {
    id: 'ad-visual-stat-a', type: 'heading', name: 'Stat Guests',
    x: 762, y: 422, width: 130, height: 42,
    content: '300', fontSize: 36, fontWeight: 400, fontFamily: 'Marcellus',
    textColor: D.gold, opacity: 100,
  },
  {
    id: 'ad-visual-stat-b', type: 'heading', name: 'Stat Artists',
    x: 922, y: 422, width: 130, height: 42,
    content: '18', fontSize: 36, fontWeight: 400, fontFamily: 'Marcellus',
    textColor: D.gold, opacity: 100,
  },
  {
    id: 'ad-visual-label-a', type: 'paragraph', name: 'Guests Label',
    x: 762, y: 468, width: 130, height: 22,
    content: 'Guests', fontSize: 12, fontFamily: 'Josefin Sans',
    textColor: D.muted, opacity: 100,
  },
  {
    id: 'ad-visual-label-b', type: 'paragraph', name: 'Artists Label',
    x: 922, y: 468, width: 130, height: 22,
    content: 'Performing Artists', fontSize: 12, fontFamily: 'Josefin Sans',
    textColor: D.muted, opacity: 100,
  },

  // ── STATS BAND ───────────────────────────────────────────────────────────────
  {
    id: 'ad-stats-bg', type: 'container', name: 'Stats Band',
    x: 0, y: 740, width: 1200, height: 140,
    fill: D.surface, borderColor: D.goldSoft, radius: 0, opacity: 100,
  },
  {
    id: 'ad-stat-1', type: 'heading', name: 'Stat 1',
    x: 100, y: 768, width: 180, height: 44,
    content: '1 Night', fontSize: 34, fontWeight: 400, fontFamily: 'Marcellus',
    textColor: D.cream, opacity: 100,
  },
  {
    id: 'ad-stat-1-label', type: 'paragraph', name: 'Stat 1 Label',
    x: 100, y: 816, width: 180, height: 22,
    content: 'unforgettable evening', fontSize: 12, fontFamily: 'Josefin Sans',
    textColor: D.muted, opacity: 100,
  },
  {
    id: 'ad-stat-2', type: 'heading', name: 'Stat 2',
    x: 380, y: 768, width: 180, height: 44,
    content: '5 Acts', fontSize: 34, fontWeight: 400, fontFamily: 'Marcellus',
    textColor: D.cream, opacity: 100,
  },
  {
    id: 'ad-stat-2-label', type: 'paragraph', name: 'Stat 2 Label',
    x: 380, y: 816, width: 180, height: 22,
    content: 'live performances', fontSize: 12, fontFamily: 'Josefin Sans',
    textColor: D.muted, opacity: 100,
  },
  {
    id: 'ad-stat-3', type: 'heading', name: 'Stat 3',
    x: 660, y: 768, width: 180, height: 44,
    content: '12', fontSize: 34, fontWeight: 400, fontFamily: 'Marcellus',
    textColor: D.cream, opacity: 100,
  },
  {
    id: 'ad-stat-3-label', type: 'paragraph', name: 'Stat 3 Label',
    x: 660, y: 816, width: 180, height: 22,
    content: 'art installations', fontSize: 12, fontFamily: 'Josefin Sans',
    textColor: D.muted, opacity: 100,
  },
  {
    id: 'ad-stat-4', type: 'heading', name: 'Stat 4',
    x: 940, y: 768, width: 180, height: 44,
    content: '300+', fontSize: 34, fontWeight: 400, fontFamily: 'Marcellus',
    textColor: D.cream, opacity: 100,
  },
  {
    id: 'ad-stat-4-label', type: 'paragraph', name: 'Stat 4 Label',
    x: 940, y: 816, width: 180, height: 22,
    content: 'guests in attendance', fontSize: 12, fontFamily: 'Josefin Sans',
    textColor: D.muted, opacity: 100,
  },

  // ── PERFORMERS ───────────────────────────────────────────────────────────────
  {
    id: 'ad-speakers-bg', type: 'container', name: 'Performers Section',
    x: 0, y: 880, width: 1200, height: 560,
    fill: D.bg, radius: 0, opacity: 100,
  },
  {
    id: 'ad-speakers-kicker', type: 'label', name: 'Performers Kicker',
    x: 100, y: 940, width: 200, height: 24,
    content: 'FEATURED PERFORMERS', fontSize: 11, fontWeight: 700,
    fontFamily: 'Josefin Sans', textColor: D.gold,
    fill: 'transparent', radius: 0, opacity: 100,
  },
  // Decorative line beside kicker
  {
    id: 'ad-speakers-kicker-rule', type: 'container', name: 'Kicker Rule',
    x: 100, y: 972, width: 48, height: 1,
    fill: D.gold, borderColor: 'transparent', radius: 0, opacity: 100,
  },
  {
    id: 'ad-speakers-title', type: 'heading', name: 'Performers Heading',
    x: 100, y: 988, width: 560, height: 68,
    content: 'The finest voices of our generation.', fontSize: 44, fontWeight: 400,
    fontFamily: 'Marcellus', textColor: D.cream, lineHeight: 1.12, opacity: 100,
  },
  // Performer Card 1
  {
    id: 'ad-speaker-card-1', type: 'container', name: 'Performer Card 1',
    x: 100, y: 1096, width: 238, height: 250,
    fill: D.surface, borderColor: D.border, radius: 0, opacity: 100,
  },
  {
    id: 'ad-speaker-1-name', type: 'heading', name: 'Performer 1 Name',
    x: 124, y: 1128, width: 190, height: 36,
    content: 'Isabelle Morel', fontSize: 22, fontWeight: 400, fontFamily: 'Marcellus',
    textColor: D.gold, opacity: 100,
  },
  {
    id: 'ad-speaker-1-role', type: 'paragraph', name: 'Performer 1 Role',
    x: 124, y: 1172, width: 190, height: 56,
    content: 'Jazz Vocalist\nOpening Act · 8:00 PM', fontSize: 13,
    fontFamily: 'Josefin Sans', textColor: D.muted, lineHeight: 1.6, opacity: 100,
  },
  // Corner embellishment (top-right bracket simulation via thin container)
  {
    id: 'ad-card-1-corner', type: 'container', name: 'Card 1 Corner Bracket',
    x: 312, y: 1096, width: 16, height: 16,
    fill: 'transparent', borderColor: D.gold, radius: 0, opacity: 80,
  },
  // Performer Card 2
  {
    id: 'ad-speaker-card-2', type: 'container', name: 'Performer Card 2',
    x: 358, y: 1096, width: 238, height: 250,
    fill: D.surface, borderColor: D.border, radius: 0, opacity: 100,
  },
  {
    id: 'ad-speaker-2-name', type: 'heading', name: 'Performer 2 Name',
    x: 382, y: 1128, width: 190, height: 36,
    content: 'Victor Layne', fontSize: 22, fontWeight: 400, fontFamily: 'Marcellus',
    textColor: D.gold, opacity: 100,
  },
  {
    id: 'ad-speaker-2-role', type: 'paragraph', name: 'Performer 2 Role',
    x: 382, y: 1172, width: 190, height: 56,
    content: 'Big Band Orchestra\nMain Stage · 9:30 PM', fontSize: 13,
    fontFamily: 'Josefin Sans', textColor: D.muted, lineHeight: 1.6, opacity: 100,
  },
  {
    id: 'ad-card-2-corner', type: 'container', name: 'Card 2 Corner Bracket',
    x: 570, y: 1096, width: 16, height: 16,
    fill: 'transparent', borderColor: D.gold, radius: 0, opacity: 80,
  },
  // Performer Card 3
  {
    id: 'ad-speaker-card-3', type: 'container', name: 'Performer Card 3',
    x: 616, y: 1096, width: 238, height: 250,
    fill: D.surface, borderColor: D.border, radius: 0, opacity: 100,
  },
  {
    id: 'ad-speaker-3-name', type: 'heading', name: 'Performer 3 Name',
    x: 640, y: 1128, width: 190, height: 36,
    content: 'Celeste Vaux', fontSize: 22, fontWeight: 400, fontFamily: 'Marcellus',
    textColor: D.gold, opacity: 100,
  },
  {
    id: 'ad-speaker-3-role', type: 'paragraph', name: 'Performer 3 Role',
    x: 640, y: 1172, width: 190, height: 56,
    content: 'Classical Piano\nInterlude · 11:00 PM', fontSize: 13,
    fontFamily: 'Josefin Sans', textColor: D.muted, lineHeight: 1.6, opacity: 100,
  },
  {
    id: 'ad-card-3-corner', type: 'container', name: 'Card 3 Corner Bracket',
    x: 828, y: 1096, width: 16, height: 16,
    fill: 'transparent', borderColor: D.gold, radius: 0, opacity: 80,
  },
  // Performer Card 4
  {
    id: 'ad-speaker-card-4', type: 'container', name: 'Performer Card 4',
    x: 874, y: 1096, width: 238, height: 250,
    fill: D.surface, borderColor: D.border, radius: 0, opacity: 100,
  },
  {
    id: 'ad-speaker-4-name', type: 'heading', name: 'Performer 4 Name',
    x: 898, y: 1128, width: 190, height: 36,
    content: 'Remy Fontaine', fontSize: 22, fontWeight: 400, fontFamily: 'Marcellus',
    textColor: D.gold, opacity: 100,
  },
  {
    id: 'ad-speaker-4-role', type: 'paragraph', name: 'Performer 4 Role',
    x: 898, y: 1172, width: 190, height: 56,
    content: 'Swing Dance Revue\nFinale · 11:45 PM', fontSize: 13,
    fontFamily: 'Josefin Sans', textColor: D.muted, lineHeight: 1.6, opacity: 100,
  },
  {
    id: 'ad-card-4-corner', type: 'container', name: 'Card 4 Corner Bracket',
    x: 1086, y: 1096, width: 16, height: 16,
    fill: 'transparent', borderColor: D.gold, radius: 0, opacity: 80,
  },

  // ── SCHEDULE / PROGRAMME ─────────────────────────────────────────────────────
  {
    id: 'ad-schedule-bg', type: 'container', name: 'Programme Section',
    x: 0, y: 1440, width: 1200, height: 540,
    fill: D.surface, radius: 0, opacity: 100,
  },
  // Vertical gold accent line (architectural column)
  {
    id: 'ad-schedule-vline', type: 'container', name: 'Schedule Vertical Line',
    x: 76, y: 1500, width: 2, height: 420,
    fill: D.goldSoft, borderColor: 'transparent', radius: 0, opacity: 100,
  },
  {
    id: 'ad-schedule-kicker', type: 'label', name: 'Programme Kicker',
    x: 100, y: 1500, width: 200, height: 24,
    content: 'EVENING PROGRAMME', fontSize: 11, fontWeight: 700,
    fontFamily: 'Josefin Sans', textColor: D.gold,
    fill: 'transparent', radius: 0, opacity: 100,
  },
  {
    id: 'ad-schedule-title', type: 'heading', name: 'Programme Heading',
    x: 100, y: 1536, width: 560, height: 68,
    content: 'An orchestrated night of wonder.', fontSize: 44, fontWeight: 400,
    fontFamily: 'Marcellus', textColor: D.cream, lineHeight: 1.12, opacity: 100,
  },
  // Agenda card (single unified card with rows)
  {
    id: 'ad-agenda-card', type: 'container', name: 'Agenda Card',
    x: 100, y: 1640, width: 1000, height: 248,
    fill: D.bg, borderColor: D.border, radius: 0,
    shadowColor: D.glow, opacity: 100,
  },
  // Inner frame
  {
    id: 'ad-agenda-inner', type: 'container', name: 'Agenda Inner Frame',
    x: 108, y: 1648, width: 984, height: 232,
    fill: 'transparent', borderColor: D.goldSoft, radius: 0, opacity: 100,
  },
  // Row I
  {
    id: 'ad-agenda-1-time', type: 'label', name: 'Agenda I Time',
    x: 136, y: 1676, width: 80, height: 24,
    content: '08:00 PM', fontSize: 11, fontWeight: 700, fontFamily: 'Josefin Sans',
    textColor: D.gold, fill: 'transparent', radius: 0, opacity: 100,
  },
  {
    id: 'ad-agenda-1-numeral', type: 'heading', name: 'Agenda I Numeral',
    x: 240, y: 1670, width: 40, height: 30,
    content: 'I', fontSize: 20, fontWeight: 400, fontFamily: 'Marcellus',
    textColor: D.goldSoft, opacity: 100,
  },
  {
    id: 'ad-agenda-1-title', type: 'heading', name: 'Agenda I Title',
    x: 290, y: 1668, width: 680, height: 34,
    content: 'Arrival & Champagne Reception', fontSize: 22, fontWeight: 400,
    fontFamily: 'Marcellus', textColor: D.cream, opacity: 100,
  },
  // Row II
  {
    id: 'ad-agenda-2-time', type: 'label', name: 'Agenda II Time',
    x: 136, y: 1738, width: 80, height: 24,
    content: '09:00 PM', fontSize: 11, fontWeight: 700, fontFamily: 'Josefin Sans',
    textColor: D.gold, fill: 'transparent', radius: 0, opacity: 100,
  },
  {
    id: 'ad-agenda-2-numeral', type: 'heading', name: 'Agenda II Numeral',
    x: 240, y: 1732, width: 40, height: 30,
    content: 'II', fontSize: 20, fontWeight: 400, fontFamily: 'Marcellus',
    textColor: D.goldSoft, opacity: 100,
  },
  {
    id: 'ad-agenda-2-title', type: 'heading', name: 'Agenda II Title',
    x: 290, y: 1730, width: 680, height: 34,
    content: 'Five-Course Dinner with Live Big Band', fontSize: 22, fontWeight: 400,
    fontFamily: 'Marcellus', textColor: D.cream, opacity: 100,
  },
  // Row III
  {
    id: 'ad-agenda-3-time', type: 'label', name: 'Agenda III Time',
    x: 136, y: 1800, width: 80, height: 24,
    content: '11:00 PM', fontSize: 11, fontWeight: 700, fontFamily: 'Josefin Sans',
    textColor: D.gold, fill: 'transparent', radius: 0, opacity: 100,
  },
  {
    id: 'ad-agenda-3-numeral', type: 'heading', name: 'Agenda III Numeral',
    x: 240, y: 1794, width: 40, height: 30,
    content: 'III', fontSize: 20, fontWeight: 400, fontFamily: 'Marcellus',
    textColor: D.goldSoft, opacity: 100,
  },
  {
    id: 'ad-agenda-3-title', type: 'heading', name: 'Agenda III Title',
    x: 290, y: 1792, width: 680, height: 34,
    content: 'Midnight Countdown & Confetti Cascade', fontSize: 22, fontWeight: 400,
    fontFamily: 'Marcellus', textColor: D.cream, opacity: 100,
  },

  // ── TICKETS / PASSES ─────────────────────────────────────────────────────────
  {
    id: 'ad-ticket-bg', type: 'container', name: 'Tickets Section',
    x: 0, y: 1980, width: 1200, height: 580,
    fill: D.bg, radius: 0, opacity: 100,
  },
  {
    id: 'ad-ticket-kicker', type: 'label', name: 'Tickets Kicker',
    x: 100, y: 2040, width: 200, height: 24,
    content: 'SELECT YOUR PASS', fontSize: 11, fontWeight: 700,
    fontFamily: 'Josefin Sans', textColor: D.gold,
    fill: 'transparent', radius: 0, opacity: 100,
  },
  {
    id: 'ad-ticket-title', type: 'heading', name: 'Tickets Heading',
    x: 100, y: 2076, width: 600, height: 68,
    content: 'Choose your level of indulgence.', fontSize: 44, fontWeight: 400,
    fontFamily: 'Marcellus', textColor: D.cream, lineHeight: 1.12, opacity: 100,
  },
  // Pass I – Social
  {
    id: 'ad-ticket-card-1', type: 'container', name: 'Social Pass',
    x: 100, y: 2180, width: 310, height: 280,
    fill: D.surface, borderColor: D.border, radius: 0, opacity: 100,
  },
  {
    id: 'ad-ticket-1-title', type: 'heading', name: 'Social Pass Title',
    x: 130, y: 2212, width: 250, height: 36,
    content: 'Social Pass', fontSize: 24, fontWeight: 400, fontFamily: 'Marcellus',
    textColor: D.cream, opacity: 100,
  },
  {
    id: 'ad-ticket-1-price', type: 'heading', name: 'Social Pass Price',
    x: 130, y: 2258, width: 220, height: 56,
    content: '$195', fontSize: 44, fontWeight: 400, fontFamily: 'Marcellus',
    textColor: D.gold, opacity: 100,
  },
  {
    id: 'ad-ticket-1-copy', type: 'paragraph', name: 'Social Pass Copy',
    x: 130, y: 2322, width: 250, height: 76,
    content: 'Evening reception, dinner, and access to all art installations and dance floors.',
    fontSize: 13, fontFamily: 'Josefin Sans', textColor: D.muted,
    lineHeight: 1.6, opacity: 100,
  },
  // Pass II – Grand (featured)
  {
    id: 'ad-ticket-card-2', type: 'container', name: 'Grand Pass (Featured)',
    x: 445, y: 2160, width: 310, height: 320,
    fill: D.surface2, borderColor: D.borderHi, radius: 0,
    shadowColor: D.glow, opacity: 100,
  },
  // Inner frame on featured card
  {
    id: 'ad-ticket-card-2-inner', type: 'container', name: 'Grand Pass Inner Frame',
    x: 453, y: 2168, width: 294, height: 304,
    fill: 'transparent', borderColor: D.goldSoft, radius: 0, opacity: 100,
  },
  {
    id: 'ad-ticket-2-title', type: 'heading', name: 'Grand Pass Title',
    x: 475, y: 2192, width: 250, height: 36,
    content: 'Grand Pass', fontSize: 24, fontWeight: 400, fontFamily: 'Marcellus',
    textColor: D.gold, opacity: 100,
  },
  {
    id: 'ad-ticket-2-price', type: 'heading', name: 'Grand Pass Price',
    x: 475, y: 2238, width: 220, height: 56,
    content: '$425', fontSize: 44, fontWeight: 400, fontFamily: 'Marcellus',
    textColor: D.gold, opacity: 100,
  },
  {
    id: 'ad-ticket-2-copy', type: 'paragraph', name: 'Grand Pass Copy',
    x: 475, y: 2302, width: 250, height: 92,
    content: 'Everything in Social plus front-row seating, exclusive performer meet & greet, and a keepsake programme.',
    fontSize: 13, fontFamily: 'Josefin Sans', textColor: D.muted,
    lineHeight: 1.6, opacity: 100,
  },
  // Pass III – Patron
  {
    id: 'ad-ticket-card-3', type: 'container', name: 'Patron Pass',
    x: 790, y: 2180, width: 310, height: 280,
    fill: D.surface, borderColor: D.border, radius: 0, opacity: 100,
  },
  {
    id: 'ad-ticket-3-title', type: 'heading', name: 'Patron Pass Title',
    x: 820, y: 2212, width: 250, height: 36,
    content: 'Patron Pass', fontSize: 24, fontWeight: 400, fontFamily: 'Marcellus',
    textColor: D.cream, opacity: 100,
  },
  {
    id: 'ad-ticket-3-price', type: 'heading', name: 'Patron Pass Price',
    x: 820, y: 2258, width: 220, height: 56,
    content: '$890', fontSize: 44, fontWeight: 400, fontFamily: 'Marcellus',
    textColor: D.gold, opacity: 100,
  },
  {
    id: 'ad-ticket-3-copy', type: 'paragraph', name: 'Patron Pass Copy',
    x: 820, y: 2322, width: 250, height: 76,
    content: 'Private pre-show lounge, hosted table for two, and a bespoke gift from our atelier.',
    fontSize: 13, fontFamily: 'Josefin Sans', textColor: D.muted,
    lineHeight: 1.6, opacity: 100,
  },

  // ── FOOTER ───────────────────────────────────────────────────────────────────
  {
    id: 'ad-footer-bg', type: 'container', name: 'Footer Section',
    x: 0, y: 2560, width: 1200, height: 260,
    fill: D.surface, borderColor: D.goldSoft, radius: 0, opacity: 100,
  },
  // Double-rule above footer CTA
  {
    id: 'ad-footer-rule-outer', type: 'container', name: 'Footer Rule Outer',
    x: 100, y: 2565, width: 1000, height: 1,
    fill: D.goldSoft, borderColor: 'transparent', radius: 0, opacity: 100,
  },
  {
    id: 'ad-footer-rule-inner', type: 'container', name: 'Footer Rule Inner',
    x: 100, y: 2570, width: 1000, height: 1,
    fill: D.gold, borderColor: 'transparent', radius: 0, opacity: 100,
  },
  {
    id: 'ad-footer-title', type: 'heading', name: 'Footer CTA',
    x: 100, y: 2610, width: 720, height: 72,
    content: 'The evening begins at the stroke of midnight.', fontSize: 40,
    fontWeight: 400, fontFamily: 'Marcellus', textColor: D.cream,
    lineHeight: 1.15, opacity: 100,
  },
  {
    id: 'ad-footer-button', type: 'button', name: 'Footer Button',
    x: 876, y: 2626, width: 168, height: 48,
    content: 'RESERVE NOW', fill: D.gold, textColor: '#0A0A0A',
    fontSize: 11, fontWeight: 700, fontFamily: 'Josefin Sans',
    radius: 0, opacity: 100,
  },
  {
    id: 'ad-footer-copy', type: 'paragraph', name: 'Footer Copyright',
    x: 100, y: 2754, width: 460, height: 22,
    content: '© 2026 Gatsby Gala. All rights reserved.',
    fontSize: 12, fontFamily: 'Josefin Sans', textColor: D.muted, opacity: 100,
  },
  {
    id: 'ad-footer-links', type: 'paragraph', name: 'Footer Links',
    x: 744, y: 2754, width: 356, height: 22,
    content: 'Privacy     Terms     Venue     Contact',
    fontSize: 12, fontFamily: 'Josefin Sans', textColor: D.muted,
    textAlign: 'right', opacity: 100,
  },
]

// ── Light Theme Palette Map ───────────────────────────────────────────────────
// Maps every dark value → its light counterpart.
const LIGHT_THEME_VALUES = {
  // backgrounds
  '#0A0A0A':                    '#FAF7EF',   // warm ivory
  '#141414':                    '#F0EAD6',   // pale champagne
  '#1A1A1A':                    '#E8E0C8',   // deeper ivory (featured card)

  // text
  '#F2F0E4':                    '#1C1208',   // near-black warm
  '#888888':                    '#6B5E45',   // warm brown muted

  // gold stays gold on light (it's the brand accent)
  '#D4AF37':                    '#B8860B',   // darker gold for light contrast

  // borders & translucents
  'rgba(212,175,55,0.35)':      'rgba(184,134,11,0.40)',
  'rgba(212,175,55,0.12)':      'rgba(184,134,11,0.12)',
  'rgba(212,175,55,0.30)':      'rgba(184,134,11,0.35)',
  'rgba(212,175,55,0.18)':      'rgba(184,134,11,0.15)',

  // navy (unused in Art Deco template but kept for safety)
  '#1E3D59':                    '#2A5298',
}

function toLightTheme(element) {
  const next = { ...element }
  ;['fill', 'textColor', 'borderColor', 'shadowColor'].forEach(key => {
    if (next[key] && LIGHT_THEME_VALUES[next[key]]) {
      next[key] = LIGHT_THEME_VALUES[next[key]]
    }
  })
  return next
}

// ── Theme Lookup Maps ─────────────────────────────────────────────────────────

const artDecoThemeById = {
  dark:  Object.fromEntries(artDecoBaseElements.map(el => [el.id, el])),
  light: Object.fromEntries(artDecoBaseElements.map(toLightTheme).map(el => [el.id, el])),
}

// ── Public Helpers ────────────────────────────────────────────────────────────

export function isArtDecoTemplate(elements = []) {
  return elements.some(el => String(el.id || '').startsWith('ad-'))
}

export function applyArtDecoTheme(elements = [], theme = 'dark') {
  const palette = artDecoThemeById[theme] || artDecoThemeById.dark

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

export function getArtDecoCanvasFill(theme = 'dark') {
  return theme === 'light' ? '#FAF7EF' : '#0A0A0A'
}

// ── Responsive Element Array (default export for TEMPLATES) ──────────────────

const artDecoElements = withResponsive(artDecoBaseElements.map(toLightTheme))
// ↑ We run toLightTheme here so the initial render (which uses the elements
//   array directly) starts in light mode — identical pattern to template 1.

// ── TEMPLATES Export Patch ───────────────────────────────────────────────────
// Add the following entry to your existing TEMPLATES object in template.js:
//
//   artDecoTemplate: {
//     name: 'Gatsby Gala – Art Deco',
//     description: 'Luxury New Year's Eve gala landing page',
//     elements: artDecoElements,
//     canvasSettings: {
//       width:  1200,
//       height: 2820,
//       x: 0,
//       y: 0,
//       fill: '#FAF7EF',
//     },
//   },

export { artDecoElements }
export default artDecoBaseElements