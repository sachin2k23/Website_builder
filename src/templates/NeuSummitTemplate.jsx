// ─────────────────────────────────────────────────────────────────────────────
// NeuSummit Template  —  Neumorphism / Soft UI Design Conference
//
// Architecture mirrors BoldSummitTemplate.js / ArtDecoTemplate.js exactly:
//   • Base element array (dark defaults)
//   • LIGHT_THEME_VALUES map  →  toLightTheme()
//   • Snapshot maps (dark + light) for O(1) theme look-up
//   • isNeuSummitTemplate()  / applyNeuSummitTheme()  / getNeuSummitCanvasFill()
//   • Named export  neuSummitElements  (withResponsive applied at end)
// ─────────────────────────────────────────────────────────────────────────────

import { generateResponsiveDefaults } from '../utils/responsive'

const withResponsive = (elements, width = 1200) =>
  elements.map(element => generateResponsiveDefaults(element, width))

// ─────────────────────────────────────────────────────────────────────────────
// Design Tokens (Dark Mode = Deep Charcoal Neumorphic)
// ─────────────────────────────────────────────────────────────────────────────
// Dark palette uses a deep blue-charcoal base (#1E2330) so shadows remain
// physically correct — light shadow lighter than base, dark shadow darker.
//
// Light palette uses the canonical #E0E5EC "cool clay" from the design system.
// ─────────────────────────────────────────────────────────────────────────────

const D = {
  // Surfaces
  base:       '#1E2330',   // root background
  surface:    '#242838',   // card / panel surface
  surfaceAlt: '#1A1E2A',   // slightly deeper panel
  // Shadows (dark mode)
  shadowLight: 'rgba(255,255,255,0.06)',
  shadowDark:  'rgba(0,0,0,0.45)',
  // Text
  textPrimary:   '#E8EDF5',
  textSecondary: '#8A94A8',
  textMuted:     '#5C6478',
  // Accent
  accent:      '#6C63FF',
  accentLight: '#8B84FF',
  accentTeal:  '#38B2AC',
  // Border (neumorphism uses shadow, not border — kept transparent)
  border: 'transparent',
}

// ─────────────────────────────────────────────────────────────────────────────
// Helper: neu shadow shorthand stored in shadowColor field
// (Renderer is expected to use this as box-shadow when the element has it)
// ─────────────────────────────────────────────────────────────────────────────
const NEU_EXTRUDED_DARK  = '6px 6px 12px rgba(0,0,0,0.45),-6px -6px 12px rgba(255,255,255,0.06)'
const NEU_INSET_DARK     = 'inset 6px 6px 12px rgba(0,0,0,0.45),inset -6px -6px 12px rgba(255,255,255,0.06)'
const NEU_EXTRUDED_LIGHT = '9px 9px 16px rgb(163,177,198,0.6),-9px -9px 16px rgba(255,255,255,0.5)'
const NEU_INSET_LIGHT    = 'inset 6px 6px 10px rgb(163,177,198,0.6),inset -6px -6px 10px rgba(255,255,255,0.5)'

// ─────────────────────────────────────────────────────────────────────────────
// Base Elements  (Dark Mode defaults, 1200-wide canvas)
// Total canvas height: ~3 100px  (all sections stacked)
// ─────────────────────────────────────────────────────────────────────────────

const neuSummitBaseElements = [

  // ── 1. NAVIGATION ──────────────────────────────────────────────────────────
  {
    id: 'ns-nav-bg',
    type: 'container', name: 'Navigation Bar',
    x: 0, y: 0, width: 1200, height: 80,
    fill: D.base, borderColor: 'rgba(108,99,255,0.18)', radius: 0, opacity: 100,
    shadowColor: NEU_EXTRUDED_DARK,
  },
  {
    id: 'ns-logo-mark',
    type: 'container', name: 'Logo Mark',
    x: 48, y: 20, width: 40, height: 40,
    fill: D.accent, radius: 12, opacity: 100,
    shadowColor: NEU_EXTRUDED_DARK,
  },
  {
    id: 'ns-logo-text',
    type: 'heading', name: 'Logo Text',
    x: 100, y: 24, width: 200, height: 32,
    content: 'NeuSummit', fontSize: 22, fontWeight: 800,
    fontFamily: 'Plus Jakarta Sans', textColor: D.textPrimary, opacity: 100,
  },
  {
    id: 'ns-nav-links',
    type: 'paragraph', name: 'Navigation Links',
    x: 400, y: 30, width: 400, height: 24,
    content: 'Speakers     Schedule     Workshops     Tickets',
    fontSize: 13, fontWeight: 500, fontFamily: 'DM Sans',
    textColor: D.textSecondary, textAlign: 'center', opacity: 100,
  },
  {
    id: 'ns-nav-cta',
    type: 'button', name: 'Navigation CTA',
    x: 1028, y: 18, width: 130, height: 44,
    content: 'Get Tickets', fill: D.accent,
    textColor: '#ffffff', fontSize: 13, fontWeight: 700,
    fontFamily: 'DM Sans', radius: 16, opacity: 100,
    shadowColor: NEU_EXTRUDED_DARK,
  },

  // ── 2. HERO ─────────────────────────────────────────────────────────────────
  {
    id: 'ns-hero-bg',
    type: 'container', name: 'Hero Section',
    x: 0, y: 80, width: 1200, height: 680,
    fill: D.base, radius: 0, opacity: 100,
  },
  // Hero eyebrow pill
  {
    id: 'ns-hero-chip',
    type: 'label', name: 'Hero Eyebrow',
    x: 80, y: 170, width: 360, height: 30,
    content: 'SEPT 18–20, 2026  ·  AMSTERDAM, NL',
    fontSize: 11, fontWeight: 800, fontFamily: 'DM Sans',
    textColor: D.accentLight, fill: 'rgba(108,99,255,0.18)',
    radius: 999, opacity: 100,
  },
  {
    id: 'ns-hero-title',
    type: 'heading', name: 'Hero Title',
    x: 76, y: 220, width: 660, height: 200,
    content: 'Design systems that feel like the future.',
    fontSize: 64, fontWeight: 800, fontFamily: 'Plus Jakarta Sans',
    textColor: D.textPrimary, lineHeight: 1.06, opacity: 100,
  },
  {
    id: 'ns-hero-copy',
    type: 'paragraph', name: 'Hero Description',
    x: 80, y: 442, width: 540, height: 80,
    content: 'Three days of tactile UI, motion design, accessibility-first engineering, and the next generation of creative tooling.',
    fontSize: 18, fontWeight: 400, fontFamily: 'DM Sans',
    textColor: D.textSecondary, lineHeight: 1.65, opacity: 100,
  },
  {
    id: 'ns-hero-primary',
    type: 'button', name: 'Primary CTA',
    x: 80, y: 556, width: 180, height: 52,
    content: 'Reserve Your Seat', fill: D.accent,
    textColor: '#ffffff', fontSize: 15, fontWeight: 700,
    fontFamily: 'DM Sans', radius: 16, opacity: 100,
    shadowColor: NEU_EXTRUDED_DARK,
  },
  {
    id: 'ns-hero-secondary',
    type: 'button', name: 'Secondary CTA',
    x: 276, y: 556, width: 160, height: 52,
    content: 'View Program', fill: D.surface,
    textColor: D.textPrimary, borderColor: 'transparent',
    fontSize: 15, fontWeight: 600, fontFamily: 'DM Sans',
    radius: 16, opacity: 100,
    shadowColor: NEU_EXTRUDED_DARK,
  },
  // Hero visual card (right side)
  {
    id: 'ns-hero-card',
    type: 'container', name: 'Hero Visual Card',
    x: 756, y: 148, width: 368, height: 400,
    fill: D.surface, radius: 32, opacity: 100,
    shadowColor: NEU_EXTRUDED_DARK,
  },
  // Concentric decoration circles inside hero card
  {
    id: 'ns-hero-circle-outer',
    type: 'container', name: 'Decoration Outer Circle',
    x: 836, y: 228, width: 208, height: 208,
    fill: D.surfaceAlt, radius: 999, opacity: 100,
    shadowColor: NEU_INSET_DARK,
  },
  {
    id: 'ns-hero-circle-inner',
    type: 'container', name: 'Decoration Inner Circle',
    x: 876, y: 268, width: 128, height: 128,
    fill: D.accent, radius: 999, opacity: 100,
    shadowColor: NEU_EXTRUDED_DARK,
  },
  {
    id: 'ns-hero-circle-dot',
    type: 'container', name: 'Decoration Center Dot',
    x: 912, y: 304, width: 56, height: 56,
    fill: '#ffffff', radius: 999, opacity: 100,
  },
  // Stat badges on hero card
  {
    id: 'ns-hero-stat-a-val',
    type: 'heading', name: 'Hero Stat Speakers Val',
    x: 796, y: 476, width: 110, height: 42,
    content: '60+', fontSize: 36, fontWeight: 800,
    fontFamily: 'Plus Jakarta Sans', textColor: D.accentLight, opacity: 100,
  },
  {
    id: 'ns-hero-stat-a-lbl',
    type: 'paragraph', name: 'Hero Stat Speakers Lbl',
    x: 796, y: 520, width: 110, height: 20,
    content: 'Speakers', fontSize: 12, fontFamily: 'DM Sans',
    textColor: D.textSecondary, opacity: 100,
  },
  {
    id: 'ns-hero-stat-b-val',
    type: 'heading', name: 'Hero Stat Attendees Val',
    x: 952, y: 476, width: 130, height: 42,
    content: '2 000+', fontSize: 36, fontWeight: 800,
    fontFamily: 'Plus Jakarta Sans', textColor: D.accentLight, opacity: 100,
  },
  {
    id: 'ns-hero-stat-b-lbl',
    type: 'paragraph', name: 'Hero Stat Attendees Lbl',
    x: 952, y: 520, width: 130, height: 20,
    content: 'Attendees', fontSize: 12, fontFamily: 'DM Sans',
    textColor: D.textSecondary, opacity: 100,
  },

  // ── 3. STATS BAND ──────────────────────────────────────────────────────────
  {
    id: 'ns-stats-bg',
    type: 'container', name: 'Stats Band',
    x: 0, y: 760, width: 1200, height: 140,
    fill: D.surfaceAlt, borderColor: 'rgba(108,99,255,0.14)', radius: 0, opacity: 100,
    shadowColor: NEU_INSET_DARK,
  },
  {
    id: 'ns-stat-1-val',
    type: 'heading', name: 'Stat 1 Value',
    x: 100, y: 792, width: 180, height: 44,
    content: '3 Days', fontSize: 34, fontWeight: 800,
    fontFamily: 'Plus Jakarta Sans', textColor: D.textPrimary, opacity: 100,
  },
  {
    id: 'ns-stat-1-lbl',
    type: 'paragraph', name: 'Stat 1 Label',
    x: 100, y: 840, width: 180, height: 22,
    content: 'immersive program', fontSize: 13, fontFamily: 'DM Sans',
    textColor: D.textSecondary, opacity: 100,
  },
  {
    id: 'ns-stat-2-val',
    type: 'heading', name: 'Stat 2 Value',
    x: 374, y: 792, width: 180, height: 44,
    content: '90+', fontSize: 34, fontWeight: 800,
    fontFamily: 'Plus Jakarta Sans', textColor: D.textPrimary, opacity: 100,
  },
  {
    id: 'ns-stat-2-lbl',
    type: 'paragraph', name: 'Stat 2 Label',
    x: 374, y: 840, width: 180, height: 22,
    content: 'sessions & workshops', fontSize: 13, fontFamily: 'DM Sans',
    textColor: D.textSecondary, opacity: 100,
  },
  {
    id: 'ns-stat-3-val',
    type: 'heading', name: 'Stat 3 Value',
    x: 648, y: 792, width: 180, height: 44,
    content: '40+', fontSize: 34, fontWeight: 800,
    fontFamily: 'Plus Jakarta Sans', textColor: D.textPrimary, opacity: 100,
  },
  {
    id: 'ns-stat-3-lbl',
    type: 'paragraph', name: 'Stat 3 Label',
    x: 648, y: 840, width: 180, height: 22,
    content: 'countries represented', fontSize: 13, fontFamily: 'DM Sans',
    textColor: D.textSecondary, opacity: 100,
  },
  {
    id: 'ns-stat-4-val',
    type: 'heading', name: 'Stat 4 Value',
    x: 922, y: 792, width: 180, height: 44,
    content: '200+', fontSize: 34, fontWeight: 800,
    fontFamily: 'Plus Jakarta Sans', textColor: D.textPrimary, opacity: 100,
  },
  {
    id: 'ns-stat-4-lbl',
    type: 'paragraph', name: 'Stat 4 Label',
    x: 922, y: 840, width: 180, height: 22,
    content: 'exhibitors & partners', fontSize: 13, fontFamily: 'DM Sans',
    textColor: D.textSecondary, opacity: 100,
  },

  // ── 4. ABOUT / OVERVIEW ────────────────────────────────────────────────────
  {
    id: 'ns-about-bg',
    type: 'container', name: 'About Section',
    x: 0, y: 900, width: 1200, height: 500,
    fill: D.base, radius: 0, opacity: 100,
  },
  {
    id: 'ns-about-kicker',
    type: 'label', name: 'About Kicker',
    x: 100, y: 964, width: 120, height: 24,
    content: 'ABOUT', fontSize: 11, fontWeight: 800,
    fontFamily: 'DM Sans', textColor: D.accentLight,
    fill: 'rgba(108,99,255,0.18)', radius: 999, opacity: 100,
  },
  {
    id: 'ns-about-heading',
    type: 'heading', name: 'About Heading',
    x: 100, y: 1004, width: 500, height: 110,
    content: 'The gathering for serious design engineers.',
    fontSize: 44, fontWeight: 800, fontFamily: 'Plus Jakarta Sans',
    textColor: D.textPrimary, lineHeight: 1.12, opacity: 100,
  },
  {
    id: 'ns-about-copy',
    type: 'paragraph', name: 'About Body',
    x: 100, y: 1134, width: 480, height: 120,
    content: 'NeuSummit brings together the world\'s leading product designers, engineers, and creative directors for three days of deep-dive content. We cover design systems at scale, tactile interaction paradigms, accessibility engineering, motion design, and the tools reshaping our craft.',
    fontSize: 15, fontWeight: 400, fontFamily: 'DM Sans',
    textColor: D.textSecondary, lineHeight: 1.7, opacity: 100,
  },
  // About info card (right)
  {
    id: 'ns-about-card',
    type: 'container', name: 'About Info Card',
    x: 700, y: 940, width: 400, height: 350,
    fill: D.surface, radius: 32, opacity: 100,
    shadowColor: NEU_EXTRUDED_DARK,
  },
  {
    id: 'ns-about-card-icon-well',
    type: 'container', name: 'About Card Icon Well',
    x: 740, y: 974, width: 56, height: 56,
    fill: D.surfaceAlt, radius: 16, opacity: 100,
    shadowColor: NEU_INSET_DARK,
  },
  {
    id: 'ns-about-card-tag',
    type: 'label', name: 'About Card Tag',
    x: 816, y: 987, width: 150, height: 28,
    content: 'Premium Experience', fontSize: 12, fontWeight: 700,
    fontFamily: 'DM Sans', textColor: D.accentLight,
    fill: 'rgba(108,99,255,0.18)', radius: 999, opacity: 100,
  },
  {
    id: 'ns-about-card-title',
    type: 'heading', name: 'About Card Title',
    x: 740, y: 1056, width: 320, height: 66,
    content: 'Curated for craft. Built for impact.',
    fontSize: 22, fontWeight: 700, fontFamily: 'Plus Jakarta Sans',
    textColor: D.textPrimary, lineHeight: 1.3, opacity: 100,
  },
  {
    id: 'ns-about-card-body',
    type: 'paragraph', name: 'About Card Body',
    x: 740, y: 1140, width: 320, height: 100,
    content: 'Every session, workshop, and talk is hand-picked by our editorial board of practicing designers and engineers. No vendor pitches. No filler.',
    fontSize: 14, fontFamily: 'DM Sans',
    textColor: D.textSecondary, lineHeight: 1.65, opacity: 100,
  },
  {
    id: 'ns-about-card-divider',
    type: 'container', name: 'About Card Divider',
    x: 740, y: 1258, width: 320, height: 2,
    fill: 'rgba(108,99,255,0.18)', radius: 999, opacity: 100,
  },
  {
    id: 'ns-about-card-footer',
    type: 'paragraph', name: 'About Card Footer',
    x: 740, y: 1272, width: 320, height: 22,
    content: 'Applications close August 15, 2026',
    fontSize: 13, fontWeight: 500, fontFamily: 'DM Sans',
    textColor: D.accentTeal, opacity: 100,
  },

  // ── 5. SPEAKERS ────────────────────────────────────────────────────────────
  {
    id: 'ns-speakers-bg',
    type: 'container', name: 'Speakers Section',
    x: 0, y: 1400, width: 1200, height: 580,
    fill: D.surfaceAlt, radius: 0, opacity: 100,
  },
  {
    id: 'ns-speakers-kicker',
    type: 'label', name: 'Speakers Kicker',
    x: 100, y: 1464, width: 120, height: 24,
    content: 'SPEAKERS', fontSize: 11, fontWeight: 800,
    fontFamily: 'DM Sans', textColor: D.accentLight,
    fill: 'rgba(108,99,255,0.18)', radius: 999, opacity: 100,
  },
  {
    id: 'ns-speakers-heading',
    type: 'heading', name: 'Speakers Heading',
    x: 100, y: 1502, width: 560, height: 60,
    content: 'Voices defining the next decade.',
    fontSize: 44, fontWeight: 800, fontFamily: 'Plus Jakarta Sans',
    textColor: D.textPrimary, lineHeight: 1.12, opacity: 100,
  },
  // Speaker Card 1
  {
    id: 'ns-speaker-card-1',
    type: 'container', name: 'Speaker Card 1',
    x: 100, y: 1608, width: 240, height: 290,
    fill: D.surface, radius: 28, opacity: 100,
    shadowColor: NEU_EXTRUDED_DARK,
  },
  {
    id: 'ns-speaker-1-avatar',
    type: 'container', name: 'Speaker 1 Avatar',
    x: 120, y: 1636, width: 64, height: 64,
    fill: D.accent, radius: 999, opacity: 100,
    shadowColor: NEU_INSET_DARK,
  },
  {
    id: 'ns-speaker-1-name',
    type: 'heading', name: 'Speaker 1 Name',
    x: 120, y: 1716, width: 200, height: 28,
    content: 'Aisha Nakamura', fontSize: 18, fontWeight: 700,
    fontFamily: 'Plus Jakarta Sans', textColor: D.textPrimary, opacity: 100,
  },
  {
    id: 'ns-speaker-1-role',
    type: 'paragraph', name: 'Speaker 1 Role',
    x: 120, y: 1752, width: 200, height: 44,
    content: 'Design Systems Lead\nFigma', fontSize: 13,
    fontFamily: 'DM Sans', textColor: D.textSecondary,
    lineHeight: 1.55, opacity: 100,
  },
  {
    id: 'ns-speaker-1-tag',
    type: 'label', name: 'Speaker 1 Tag',
    x: 120, y: 1860, width: 110, height: 24,
    content: 'Systems', fontSize: 11, fontWeight: 700,
    fontFamily: 'DM Sans', textColor: D.accentTeal,
    fill: 'rgba(56,178,172,0.18)', radius: 999, opacity: 100,
  },
  // Speaker Card 2
  {
    id: 'ns-speaker-card-2',
    type: 'container', name: 'Speaker Card 2',
    x: 360, y: 1608, width: 240, height: 290,
    fill: D.surface, radius: 28, opacity: 100,
    shadowColor: NEU_EXTRUDED_DARK,
  },
  {
    id: 'ns-speaker-2-avatar',
    type: 'container', name: 'Speaker 2 Avatar',
    x: 380, y: 1636, width: 64, height: 64,
    fill: D.accentTeal, radius: 999, opacity: 100,
    shadowColor: NEU_INSET_DARK,
  },
  {
    id: 'ns-speaker-2-name',
    type: 'heading', name: 'Speaker 2 Name',
    x: 380, y: 1716, width: 200, height: 28,
    content: 'Marcus Osei', fontSize: 18, fontWeight: 700,
    fontFamily: 'Plus Jakarta Sans', textColor: D.textPrimary, opacity: 100,
  },
  {
    id: 'ns-speaker-2-role',
    type: 'paragraph', name: 'Speaker 2 Role',
    x: 380, y: 1752, width: 200, height: 44,
    content: 'Principal Engineer\nVercel', fontSize: 13,
    fontFamily: 'DM Sans', textColor: D.textSecondary,
    lineHeight: 1.55, opacity: 100,
  },
  {
    id: 'ns-speaker-2-tag',
    type: 'label', name: 'Speaker 2 Tag',
    x: 380, y: 1860, width: 110, height: 24,
    content: 'Performance', fontSize: 11, fontWeight: 700,
    fontFamily: 'DM Sans', textColor: D.accentTeal,
    fill: 'rgba(56,178,172,0.18)', radius: 999, opacity: 100,
  },
  // Speaker Card 3
  {
    id: 'ns-speaker-card-3',
    type: 'container', name: 'Speaker Card 3',
    x: 620, y: 1608, width: 240, height: 290,
    fill: D.surface, radius: 28, opacity: 100,
    shadowColor: NEU_EXTRUDED_DARK,
  },
  {
    id: 'ns-speaker-3-avatar',
    type: 'container', name: 'Speaker 3 Avatar',
    x: 640, y: 1636, width: 64, height: 64,
    fill: '#A78BFA', radius: 999, opacity: 100,
    shadowColor: NEU_INSET_DARK,
  },
  {
    id: 'ns-speaker-3-name',
    type: 'heading', name: 'Speaker 3 Name',
    x: 640, y: 1716, width: 200, height: 28,
    content: 'Lena Hoffmann', fontSize: 18, fontWeight: 700,
    fontFamily: 'Plus Jakarta Sans', textColor: D.textPrimary, opacity: 100,
  },
  {
    id: 'ns-speaker-3-role',
    type: 'paragraph', name: 'Speaker 3 Role',
    x: 640, y: 1752, width: 200, height: 44,
    content: 'Motion Designer\nLinear', fontSize: 13,
    fontFamily: 'DM Sans', textColor: D.textSecondary,
    lineHeight: 1.55, opacity: 100,
  },
  {
    id: 'ns-speaker-3-tag',
    type: 'label', name: 'Speaker 3 Tag',
    x: 640, y: 1860, width: 90, height: 24,
    content: 'Motion', fontSize: 11, fontWeight: 700,
    fontFamily: 'DM Sans', textColor: D.accentLight,
    fill: 'rgba(108,99,255,0.18)', radius: 999, opacity: 100,
  },
  // Speaker Card 4
  {
    id: 'ns-speaker-card-4',
    type: 'container', name: 'Speaker Card 4',
    x: 880, y: 1608, width: 240, height: 290,
    fill: D.surface, radius: 28, opacity: 100,
    shadowColor: NEU_EXTRUDED_DARK,
  },
  {
    id: 'ns-speaker-4-avatar',
    type: 'container', name: 'Speaker 4 Avatar',
    x: 900, y: 1636, width: 64, height: 64,
    fill: '#F59E0B', radius: 999, opacity: 100,
    shadowColor: NEU_INSET_DARK,
  },
  {
    id: 'ns-speaker-4-name',
    type: 'heading', name: 'Speaker 4 Name',
    x: 900, y: 1716, width: 200, height: 28,
    content: 'Ryo Tanaka', fontSize: 18, fontWeight: 700,
    fontFamily: 'Plus Jakarta Sans', textColor: D.textPrimary, opacity: 100,
  },
  {
    id: 'ns-speaker-4-role',
    type: 'paragraph', name: 'Speaker 4 Role',
    x: 900, y: 1752, width: 200, height: 44,
    content: 'Head of Accessibility\nShopify', fontSize: 13,
    fontFamily: 'DM Sans', textColor: D.textSecondary,
    lineHeight: 1.55, opacity: 100,
  },
  {
    id: 'ns-speaker-4-tag',
    type: 'label', name: 'Speaker 4 Tag',
    x: 900, y: 1860, width: 120, height: 24,
    content: 'Accessibility', fontSize: 11, fontWeight: 700,
    fontFamily: 'DM Sans', textColor: D.accentTeal,
    fill: 'rgba(56,178,172,0.18)', radius: 999, opacity: 100,
  },

  // ── 6. SCHEDULE ────────────────────────────────────────────────────────────
  {
    id: 'ns-schedule-bg',
    type: 'container', name: 'Schedule Section',
    x: 0, y: 1980, width: 1200, height: 580,
    fill: D.base, radius: 0, opacity: 100,
  },
  {
    id: 'ns-schedule-kicker',
    type: 'label', name: 'Schedule Kicker',
    x: 100, y: 2044, width: 120, height: 24,
    content: 'SCHEDULE', fontSize: 11, fontWeight: 800,
    fontFamily: 'DM Sans', textColor: D.accentLight,
    fill: 'rgba(108,99,255,0.18)', radius: 999, opacity: 100,
  },
  {
    id: 'ns-schedule-heading',
    type: 'heading', name: 'Schedule Heading',
    x: 100, y: 2082, width: 560, height: 60,
    content: 'A focused agenda for makers.',
    fontSize: 44, fontWeight: 800, fontFamily: 'Plus Jakarta Sans',
    textColor: D.textPrimary, lineHeight: 1.12, opacity: 100,
  },
  // Agenda card (inset well)
  {
    id: 'ns-agenda-card',
    type: 'container', name: 'Agenda Card',
    x: 100, y: 2182, width: 1000, height: 300,
    fill: D.surfaceAlt, radius: 24, opacity: 100,
    shadowColor: NEU_INSET_DARK,
  },
  {
    id: 'ns-agenda-1-time',
    type: 'label', name: 'Agenda 1 Time',
    x: 148, y: 2216, width: 80, height: 24,
    content: '09:00', fontSize: 12, fontWeight: 800,
    fontFamily: 'DM Sans', textColor: D.accentLight, opacity: 100,
  },
  {
    id: 'ns-agenda-1-title',
    type: 'heading', name: 'Agenda 1 Title',
    x: 270, y: 2210, width: 680, height: 34,
    content: 'Opening: The Soft UI Renaissance', fontSize: 22, fontWeight: 700,
    fontFamily: 'Plus Jakarta Sans', textColor: D.textPrimary, opacity: 100,
  },
  {
    id: 'ns-agenda-2-time',
    type: 'label', name: 'Agenda 2 Time',
    x: 148, y: 2296, width: 80, height: 24,
    content: '11:30', fontSize: 12, fontWeight: 800,
    fontFamily: 'DM Sans', textColor: D.accentLight, opacity: 100,
  },
  {
    id: 'ns-agenda-2-title',
    type: 'heading', name: 'Agenda 2 Title',
    x: 270, y: 2290, width: 680, height: 34,
    content: 'Workshop: Accessible Neumorphic Components', fontSize: 22, fontWeight: 700,
    fontFamily: 'Plus Jakarta Sans', textColor: D.textPrimary, opacity: 100,
  },
  {
    id: 'ns-agenda-3-time',
    type: 'label', name: 'Agenda 3 Time',
    x: 148, y: 2376, width: 80, height: 24,
    content: '14:00', fontSize: 12, fontWeight: 800,
    fontFamily: 'DM Sans', textColor: D.accentLight, opacity: 100,
  },
  {
    id: 'ns-agenda-3-title',
    type: 'heading', name: 'Agenda 3 Title',
    x: 270, y: 2370, width: 680, height: 34,
    content: 'Panel: Design Tokens at 1 000+ Components', fontSize: 22, fontWeight: 700,
    fontFamily: 'Plus Jakarta Sans', textColor: D.textPrimary, opacity: 100,
  },
  {
    id: 'ns-agenda-4-time',
    type: 'label', name: 'Agenda 4 Time',
    x: 148, y: 2456, width: 80, height: 24,
    content: '16:30', fontSize: 12, fontWeight: 800,
    fontFamily: 'DM Sans', textColor: D.accentLight, opacity: 100,
  },
  {
    id: 'ns-agenda-4-title',
    type: 'heading', name: 'Agenda 4 Title',
    x: 270, y: 2450, width: 680, height: 34,
    content: 'Talk: Motion That Feels Physical', fontSize: 22, fontWeight: 700,
    fontFamily: 'Plus Jakarta Sans', textColor: D.textPrimary, opacity: 100,
  },

  // ── 7. TICKETS ─────────────────────────────────────────────────────────────
  {
    id: 'ns-tickets-bg',
    type: 'container', name: 'Tickets Section',
    x: 0, y: 2560, width: 1200, height: 600,
    fill: D.surfaceAlt, radius: 0, opacity: 100,
  },
  {
    id: 'ns-tickets-kicker',
    type: 'label', name: 'Tickets Kicker',
    x: 100, y: 2624, width: 120, height: 24,
    content: 'TICKETS', fontSize: 11, fontWeight: 800,
    fontFamily: 'DM Sans', textColor: D.accentLight,
    fill: 'rgba(108,99,255,0.18)', radius: 999, opacity: 100,
  },
  {
    id: 'ns-tickets-heading',
    type: 'heading', name: 'Tickets Heading',
    x: 100, y: 2662, width: 560, height: 60,
    content: 'Choose your pass.',
    fontSize: 44, fontWeight: 800, fontFamily: 'Plus Jakarta Sans',
    textColor: D.textPrimary, lineHeight: 1.12, opacity: 100,
  },
  // Ticket card 1 — Starter
  {
    id: 'ns-ticket-card-1',
    type: 'container', name: 'Starter Ticket',
    x: 100, y: 2764, width: 300, height: 280,
    fill: D.surface, radius: 28, opacity: 100,
    shadowColor: NEU_EXTRUDED_DARK,
  },
  {
    id: 'ns-ticket-1-title',
    type: 'heading', name: 'Starter Title',
    x: 136, y: 2802, width: 228, height: 32,
    content: 'Starter', fontSize: 22, fontWeight: 700,
    fontFamily: 'Plus Jakarta Sans', textColor: D.textPrimary, opacity: 100,
  },
  {
    id: 'ns-ticket-1-price',
    type: 'heading', name: 'Starter Price',
    x: 136, y: 2848, width: 200, height: 56,
    content: '€249', fontSize: 44, fontWeight: 800,
    fontFamily: 'Plus Jakarta Sans', textColor: D.accentLight, opacity: 100,
  },
  {
    id: 'ns-ticket-1-copy',
    type: 'paragraph', name: 'Starter Copy',
    x: 136, y: 2920, width: 228, height: 66,
    content: 'All talks + expo access. Recordings included.',
    fontSize: 14, fontFamily: 'DM Sans',
    textColor: D.textSecondary, lineHeight: 1.55, opacity: 100,
  },
  // Ticket card 2 — Pro (featured)
  {
    id: 'ns-ticket-card-2',
    type: 'container', name: 'Pro Ticket',
    x: 450, y: 2744, width: 300, height: 320,
    fill: D.accent, radius: 28, opacity: 100,
    shadowColor: NEU_EXTRUDED_DARK,
  },
  {
    id: 'ns-ticket-2-title',
    type: 'heading', name: 'Pro Title',
    x: 486, y: 2782, width: 228, height: 32,
    content: 'Professional', fontSize: 22, fontWeight: 700,
    fontFamily: 'Plus Jakarta Sans', textColor: '#ffffff', opacity: 100,
  },
  {
    id: 'ns-ticket-2-badge',
    type: 'label', name: 'Pro Badge',
    x: 660, y: 2786, width: 72, height: 24,
    content: 'Popular', fontSize: 11, fontWeight: 700,
    fontFamily: 'DM Sans', textColor: D.accent,
    fill: '#ffffff', radius: 999, opacity: 100,
  },
  {
    id: 'ns-ticket-2-price',
    type: 'heading', name: 'Pro Price',
    x: 486, y: 2828, width: 200, height: 56,
    content: '€599', fontSize: 44, fontWeight: 800,
    fontFamily: 'Plus Jakarta Sans', textColor: '#ffffff', opacity: 100,
  },
  {
    id: 'ns-ticket-2-copy',
    type: 'paragraph', name: 'Pro Copy',
    x: 486, y: 2900, width: 228, height: 88,
    content: 'All talks, workshops, priority seating, VIP networking dinner, and 1-year access to recordings.',
    fontSize: 14, fontFamily: 'DM Sans',
    textColor: 'rgba(255,255,255,0.78)', lineHeight: 1.55, opacity: 100,
  },
  // Ticket card 3 — Studio
  {
    id: 'ns-ticket-card-3',
    type: 'container', name: 'Studio Ticket',
    x: 800, y: 2764, width: 300, height: 280,
    fill: D.surface, radius: 28, opacity: 100,
    shadowColor: NEU_EXTRUDED_DARK,
  },
  {
    id: 'ns-ticket-3-title',
    type: 'heading', name: 'Studio Title',
    x: 836, y: 2802, width: 228, height: 32,
    content: 'Studio', fontSize: 22, fontWeight: 700,
    fontFamily: 'Plus Jakarta Sans', textColor: D.textPrimary, opacity: 100,
  },
  {
    id: 'ns-ticket-3-price',
    type: 'heading', name: 'Studio Price',
    x: 836, y: 2848, width: 200, height: 56,
    content: '€1 299', fontSize: 44, fontWeight: 800,
    fontFamily: 'Plus Jakarta Sans', textColor: D.accentLight, opacity: 100,
  },
  {
    id: 'ns-ticket-3-copy',
    type: 'paragraph', name: 'Studio Copy',
    x: 836, y: 2920, width: 228, height: 66,
    content: 'Private roundtables, speaker access, founder dinner, and concierge.',
    fontSize: 14, fontFamily: 'DM Sans',
    textColor: D.textSecondary, lineHeight: 1.55, opacity: 100,
  },

  // ── 8. SPONSORS ────────────────────────────────────────────────────────────
  {
    id: 'ns-sponsors-bg',
    type: 'container', name: 'Sponsors Section',
    x: 0, y: 3160, width: 1200, height: 280,
    fill: D.base, radius: 0, opacity: 100,
  },
  {
    id: 'ns-sponsors-kicker',
    type: 'label', name: 'Sponsors Kicker',
    x: 100, y: 3206, width: 120, height: 24,
    content: 'SPONSORS', fontSize: 11, fontWeight: 800,
    fontFamily: 'DM Sans', textColor: D.textMuted,
    fill: D.surfaceAlt, radius: 999, opacity: 100,
  },
  {
    id: 'ns-sponsors-sub',
    type: 'paragraph', name: 'Sponsors Subtext',
    x: 100, y: 3240, width: 560, height: 24,
    content: 'Proud partners making NeuSummit possible',
    fontSize: 15, fontWeight: 500, fontFamily: 'DM Sans',
    textColor: D.textSecondary, opacity: 100,
  },
  // Sponsor pill-badges
  {
    id: 'ns-sponsor-1',
    type: 'label', name: 'Sponsor Figma',
    x: 100, y: 3296, width: 140, height: 52,
    content: 'Figma', fontSize: 18, fontWeight: 700,
    fontFamily: 'Plus Jakarta Sans', textColor: D.textSecondary,
    fill: D.surface, radius: 16, opacity: 100,
    shadowColor: NEU_EXTRUDED_DARK,
  },
  {
    id: 'ns-sponsor-2',
    type: 'label', name: 'Sponsor Vercel',
    x: 262, y: 3296, width: 140, height: 52,
    content: 'Vercel', fontSize: 18, fontWeight: 700,
    fontFamily: 'Plus Jakarta Sans', textColor: D.textSecondary,
    fill: D.surface, radius: 16, opacity: 100,
    shadowColor: NEU_EXTRUDED_DARK,
  },
  {
    id: 'ns-sponsor-3',
    type: 'label', name: 'Sponsor Linear',
    x: 424, y: 3296, width: 140, height: 52,
    content: 'Linear', fontSize: 18, fontWeight: 700,
    fontFamily: 'Plus Jakarta Sans', textColor: D.textSecondary,
    fill: D.surface, radius: 16, opacity: 100,
    shadowColor: NEU_EXTRUDED_DARK,
  },
  {
    id: 'ns-sponsor-4',
    type: 'label', name: 'Sponsor Radix',
    x: 586, y: 3296, width: 140, height: 52,
    content: 'Radix UI', fontSize: 18, fontWeight: 700,
    fontFamily: 'Plus Jakarta Sans', textColor: D.textSecondary,
    fill: D.surface, radius: 16, opacity: 100,
    shadowColor: NEU_EXTRUDED_DARK,
  },
  {
    id: 'ns-sponsor-5',
    type: 'label', name: 'Sponsor Shopify',
    x: 748, y: 3296, width: 140, height: 52,
    content: 'Shopify', fontSize: 18, fontWeight: 700,
    fontFamily: 'Plus Jakarta Sans', textColor: D.textSecondary,
    fill: D.surface, radius: 16, opacity: 100,
    shadowColor: NEU_EXTRUDED_DARK,
  },
  {
    id: 'ns-sponsor-6',
    type: 'label', name: 'Sponsor Netlify',
    x: 910, y: 3296, width: 140, height: 52,
    content: 'Netlify', fontSize: 18, fontWeight: 700,
    fontFamily: 'Plus Jakarta Sans', textColor: D.textSecondary,
    fill: D.surface, radius: 16, opacity: 100,
    shadowColor: NEU_EXTRUDED_DARK,
  },

  // ── 9. TESTIMONIALS ────────────────────────────────────────────────────────
  {
    id: 'ns-testimonials-bg',
    type: 'container', name: 'Testimonials Section',
    x: 0, y: 3440, width: 1200, height: 460,
    fill: D.surfaceAlt, radius: 0, opacity: 100,
  },
  {
    id: 'ns-testimonials-kicker',
    type: 'label', name: 'Testimonials Kicker',
    x: 100, y: 3502, width: 160, height: 24,
    content: 'HIGHLIGHTS', fontSize: 11, fontWeight: 800,
    fontFamily: 'DM Sans', textColor: D.accentLight,
    fill: 'rgba(108,99,255,0.18)', radius: 999, opacity: 100,
  },
  {
    id: 'ns-testimonials-heading',
    type: 'heading', name: 'Testimonials Heading',
    x: 100, y: 3540, width: 600, height: 60,
    content: 'What attendees say.',
    fontSize: 44, fontWeight: 800, fontFamily: 'Plus Jakarta Sans',
    textColor: D.textPrimary, lineHeight: 1.12, opacity: 100,
  },
  // Testimonial card 1
  {
    id: 'ns-testi-card-1',
    type: 'container', name: 'Testimonial Card 1',
    x: 100, y: 3636, width: 460, height: 200,
    fill: D.surface, radius: 24, opacity: 100,
    shadowColor: NEU_EXTRUDED_DARK,
  },
  {
    id: 'ns-testi-1-quote',
    type: 'paragraph', name: 'Testimonial 1 Quote',
    x: 140, y: 3676, width: 380, height: 100,
    content: '"NeuSummit reshaped how our entire team thinks about component depth. Three days, ten new patterns in production."',
    fontSize: 15, fontFamily: 'DM Sans',
    textColor: D.textPrimary, lineHeight: 1.65, opacity: 100,
  },
  {
    id: 'ns-testi-1-author',
    type: 'paragraph', name: 'Testimonial 1 Author',
    x: 140, y: 3792, width: 300, height: 22,
    content: '— Jess Kim, Staff Designer at Stripe', fontSize: 13, fontWeight: 500,
    fontFamily: 'DM Sans', textColor: D.textSecondary, opacity: 100,
  },
  // Testimonial card 2
  {
    id: 'ns-testi-card-2',
    type: 'container', name: 'Testimonial Card 2',
    x: 600, y: 3636, width: 500, height: 200,
    fill: D.surface, radius: 24, opacity: 100,
    shadowColor: NEU_EXTRUDED_DARK,
  },
  {
    id: 'ns-testi-2-quote',
    type: 'paragraph', name: 'Testimonial 2 Quote',
    x: 644, y: 3676, width: 416, height: 100,
    content: '"The accessibility workshop alone was worth the trip. Ryo\'s content changed our whole review process. Incredible event."',
    fontSize: 15, fontFamily: 'DM Sans',
    textColor: D.textPrimary, lineHeight: 1.65, opacity: 100,
  },
  {
    id: 'ns-testi-2-author',
    type: 'paragraph', name: 'Testimonial 2 Author',
    x: 644, y: 3792, width: 340, height: 22,
    content: '— Ben Adeyemi, Engineering Manager at Atlassian', fontSize: 13, fontWeight: 500,
    fontFamily: 'DM Sans', textColor: D.textSecondary, opacity: 100,
  },

  // ── 10. CTA BAND ───────────────────────────────────────────────────────────
  {
    id: 'ns-cta-bg',
    type: 'container', name: 'CTA Band',
    x: 0, y: 3900, width: 1200, height: 280,
    fill: D.accent, radius: 0, opacity: 100,
  },
  {
    id: 'ns-cta-heading',
    type: 'heading', name: 'CTA Heading',
    x: 100, y: 3974, width: 700, height: 80,
    content: 'Ready to shape the next era of design?',
    fontSize: 44, fontWeight: 800, fontFamily: 'Plus Jakarta Sans',
    textColor: '#ffffff', lineHeight: 1.1, opacity: 100,
  },
  {
    id: 'ns-cta-button',
    type: 'button', name: 'CTA Button',
    x: 900, y: 3998, width: 180, height: 52,
    content: 'Get Your Ticket', fill: '#ffffff',
    textColor: D.accent, fontSize: 15, fontWeight: 700,
    fontFamily: 'DM Sans', radius: 16, opacity: 100,
    shadowColor: '6px 6px 12px rgba(0,0,0,0.2),-6px -6px 12px rgba(255,255,255,0.1)',
  },
  {
    id: 'ns-cta-sub',
    type: 'paragraph', name: 'CTA Subtext',
    x: 100, y: 4066, width: 500, height: 22,
    content: 'Early bird pricing ends July 31, 2026 · Free cancellation until August 14',
    fontSize: 13, fontFamily: 'DM Sans',
    textColor: 'rgba(255,255,255,0.7)', opacity: 100,
  },

  // ── 11. FOOTER ─────────────────────────────────────────────────────────────
  {
    id: 'ns-footer-bg',
    type: 'container', name: 'Footer Section',
    x: 0, y: 4180, width: 1200, height: 300,
    fill: D.surfaceAlt, borderColor: 'rgba(108,99,255,0.14)', radius: 0, opacity: 100,
  },
  {
    id: 'ns-footer-logo',
    type: 'heading', name: 'Footer Logo',
    x: 100, y: 4242, width: 260, height: 38,
    content: 'NeuSummit', fontSize: 28, fontWeight: 800,
    fontFamily: 'Plus Jakarta Sans', textColor: D.textPrimary, opacity: 100,
  },
  {
    id: 'ns-footer-tagline',
    type: 'paragraph', name: 'Footer Tagline',
    x: 100, y: 4288, width: 380, height: 24,
    content: 'Design systems that feel like the future. Amsterdam, 2026.',
    fontSize: 13, fontFamily: 'DM Sans',
    textColor: D.textSecondary, opacity: 100,
  },
  {
    id: 'ns-footer-links',
    type: 'paragraph', name: 'Footer Nav Links',
    x: 600, y: 4258, width: 500, height: 24,
    content: 'Speakers     Schedule     Workshops     Tickets     Contact',
    fontSize: 13, fontWeight: 500, fontFamily: 'DM Sans',
    textColor: D.textSecondary, textAlign: 'right', opacity: 100,
  },
  {
    id: 'ns-footer-divider',
    type: 'container', name: 'Footer Divider',
    x: 100, y: 4360, width: 1000, height: 1,
    fill: 'rgba(108,99,255,0.2)', radius: 0, opacity: 100,
  },
  {
    id: 'ns-footer-copy',
    type: 'paragraph', name: 'Footer Copyright',
    x: 100, y: 4380, width: 460, height: 22,
    content: '© 2026 NeuSummit. All rights reserved.',
    fontSize: 13, fontFamily: 'DM Sans',
    textColor: D.textMuted, opacity: 100,
  },
  {
    id: 'ns-footer-legal',
    type: 'paragraph', name: 'Footer Legal Links',
    x: 740, y: 4380, width: 360, height: 22,
    content: 'Privacy Policy     Terms of Service     Code of Conduct',
    fontSize: 13, fontFamily: 'DM Sans',
    textColor: D.textMuted, textAlign: 'right', opacity: 100,
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// Light Theme  — canonical Neumorphism  #E0E5EC "cool clay"
// Keys: dark-mode values → light-mode replacements
// ─────────────────────────────────────────────────────────────────────────────

const NEU_LIGHT_THEME = {
  // Surfaces
  [D.base]:       '#E0E5EC',
  [D.surface]:    '#E0E5EC',
  [D.surfaceAlt]: '#D6DCE6',
  // Text
  [D.textPrimary]:   '#3D4852',
  [D.textSecondary]: '#6B7280',
  [D.textMuted]:     '#9CA3AF',
  // Accent — stays the same violet
  // Borders
  'rgba(108,99,255,0.18)': 'rgba(108,99,255,0.14)',
  'rgba(108,99,255,0.14)': 'rgba(108,99,255,0.10)',
  'rgba(108,99,255,0.20)': 'rgba(108,99,255,0.16)',
  // Shadow shorthand swap
  [NEU_EXTRUDED_DARK]: NEU_EXTRUDED_LIGHT,
  [NEU_INSET_DARK]:    NEU_INSET_LIGHT,
}

function toLightTheme(el) {
  const next = { ...el }
  ;['fill', 'textColor', 'borderColor', 'shadowColor'].forEach(key => {
    if (NEU_LIGHT_THEME[next[key]] !== undefined) {
      next[key] = NEU_LIGHT_THEME[next[key]]
    }
  })
  // Special case: accent-coloured ticket card text stays white
  return next
}

// ─────────────────────────────────────────────────────────────────────────────
// Snapshot maps for O(1) look-up in applyNeuSummitTheme
// ─────────────────────────────────────────────────────────────────────────────

const neuSummitThemeById = {
  dark:  Object.fromEntries(neuSummitBaseElements.map(el => [el.id, el])),
  light: Object.fromEntries(neuSummitBaseElements.map(toLightTheme).map(el => [el.id, el])),
}

// ─────────────────────────────────────────────────────────────────────────────
// Public Helpers
// ─────────────────────────────────────────────────────────────────────────────

export function isNeuSummitTemplate(elements = []) {
  return elements.some(el => String(el.id || '').startsWith('ns-'))
}

export function applyNeuSummitTheme(elements = [], theme = 'dark') {
  const palette = neuSummitThemeById[theme] || neuSummitThemeById.dark
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

export function getNeuSummitCanvasFill(theme = 'dark') {
  return theme === 'light' ? '#E0E5EC' : D.base
}

// ─────────────────────────────────────────────────────────────────────────────
// Final export (with responsive defaults, light-mode as default display state)
// ─────────────────────────────────────────────────────────────────────────────

export const neuSummitElements = withResponsive(
  neuSummitBaseElements.map(toLightTheme),   // default to light (canonical Neu)
  1200,
)