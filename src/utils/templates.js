import { generateResponsiveDefaults } from './responsive'

// ── Art Deco template helpers ────────────────────────────────────────────────
import {
  artDecoElements,
  isArtDecoTemplate,
  applyArtDecoTheme,
  getArtDecoCanvasFill,
} from '../templates/ArtDecoTemplate'

// ── BoldSummit template helpers ──────────────────────────────────────────────
import {
  boldSummitElements,
  isBoldSummitTemplate,
  applyBoldSummitTheme,
  getBoldSummitCanvasFill,
} from '../templates/BoldSummitTemplate'

// ── NeuSummit template helpers ───────────────────────────────────────────────
import {
  neuSummitElements,
  isNeuSummitTemplate,
  applyNeuSummitTheme,
  getNeuSummitCanvasFill,
} from '../templates/NeuSummitTemplate'

// ── PlayfulGeometric template helpers ────────────────────────────────────────
import {
  playfulGeometricElements,
  isPlayfulGeometricTemplate,
  applyPlayfulGeometricTheme,
  getPlayfulGeometricCanvasFill,
} from '../templates/PlayfulGeometricTemplate'

// ── VaporWaveFest template helpers ───────────────────────────────────────────
import {
  vaporWaveFestElements,
  isVaporWaveFestTemplate,
  applyVaporWaveFestTheme,
  getVaporWaveFestCanvasFill,
} from '../templates/VaporWaveFestTemplate'

// ── MinimalistMonochrome template helpers ────────────────────────────────────
import {
  minimalistMonochromeElements,
  isMinimalistMonochromeTemplate,
  applyMinimalistMonochromeTheme,
  getMinimalistMonochromeCanvasFill,
} from '../templates/MinimalistMonochromeTemplate'

// ── FlatDesign template helpers ──────────────────────────────────────────────
import {
  flatDesignElements,
  isFlatDesignTemplate,
  applyFlatDesignTheme,
  getFlatDesignCanvasFill,
} from '../templates/FlatDesignTemplate'

// ── BotanicalOrganic template helpers ────────────────────────────────────────
import {
  botanicalOrganicElements,
  isBotanicalOrganicTemplate,
  applyBotanicalOrganicTheme,
  getBotanicalOrganicCanvasFill,
} from '../templates/BotanicalOrganicTemplate'

// ── Thumbnails — inline SVG data URIs, keyed by TEMPLATES key ────────────────
// Importing here ensures every TEMPLATES entry gets its thumbnail at build time.
// No static file paths, no missing assets, no runtime fetch required.
import { TEMPLATE_THUMBNAILS } from '../templates/thumbnails/index'

const withResponsive = (elements, width = 1200) =>
  elements.map(element => generateResponsiveDefaults(element, width))

// ─────────────────────────────────────────────────────────────────────────────
// TechSummit Template 1  (unchanged)
// ─────────────────────────────────────────────────────────────────────────────

const techSummitBaseElements = [
  { id: 'ts-nav-bg', type: 'container', name: 'Navigation Bar', x: 0, y: 0, width: 1200, height: 76, fill: '#080C14', borderColor: 'rgba(255,255,255,0.10)', radius: 0, opacity: 100 },
  { id: 'ts-logo-box', type: 'container', name: 'Logo Mark', x: 48, y: 20, width: 36, height: 36, fill: '#3B82F6', radius: 8, opacity: 100 },
  { id: 'ts-logo', type: 'heading', name: 'Logo Text', x: 94, y: 21, width: 180, height: 32, content: 'TechSummit', fontSize: 20, fontWeight: 800, fontFamily: 'Inter', textColor: '#F0F4FF', opacity: 100 },
  { id: 'ts-nav-links', type: 'paragraph', name: 'Navigation Links', x: 432, y: 27, width: 390, height: 24, content: 'Speakers     Schedule     Tickets     Sponsors', fontSize: 13, fontWeight: 500, fontFamily: 'Inter', textColor: '#9BAEC8', textAlign: 'center', opacity: 100 },
  { id: 'ts-nav-cta', type: 'button', name: 'Navigation CTA', x: 1032, y: 17, width: 120, height: 42, content: 'Get Tickets', fill: '#3B82F6', textColor: '#ffffff', fontSize: 13, fontWeight: 700, fontFamily: 'Inter', radius: 10, opacity: 100 },

  { id: 'ts-hero-bg', type: 'container', name: 'Hero Section', x: 0, y: 76, width: 1200, height: 620, fill: '#080C14', radius: 0, opacity: 100 },
  { id: 'ts-hero-card', type: 'container', name: 'Hero Visual Card', x: 734, y: 156, width: 370, height: 380, fill: '#111B2E', borderColor: 'rgba(59,130,246,0.35)', radius: 28, shadowColor: 'rgba(59,130,246,0.24)', opacity: 100 },
  { id: 'ts-hero-chip', type: 'label', name: 'Hero Eyebrow', x: 76, y: 150, width: 330, height: 28, content: 'JUNE 12-14, 2026 / SAN FRANCISCO', fontSize: 12, fontWeight: 800, fontFamily: 'Inter', textColor: '#93C5FD', fill: 'rgba(59,130,246,0.14)', radius: 999, opacity: 100 },
  { id: 'ts-hero-title', type: 'heading', name: 'Hero Title', x: 72, y: 198, width: 620, height: 188, content: 'Where builders shape the next decade of technology.', fontSize: 58, fontWeight: 800, fontFamily: 'Inter', textColor: '#F0F4FF', lineHeight: 1.08, opacity: 100 },
  { id: 'ts-hero-copy', type: 'paragraph', name: 'Hero Description', x: 76, y: 410, width: 540, height: 72, content: 'Three days of AI, infrastructure, security, design systems, and the people shipping the future.', fontSize: 18, fontWeight: 400, fontFamily: 'Inter', textColor: '#9BAEC8', lineHeight: 1.6, opacity: 100 },
  { id: 'ts-hero-primary', type: 'button', name: 'Primary CTA', x: 76, y: 518, width: 162, height: 52, content: 'Reserve Seat', fill: '#3B82F6', textColor: '#ffffff', fontSize: 15, fontWeight: 800, fontFamily: 'Inter', radius: 12, opacity: 100 },
  { id: 'ts-hero-secondary', type: 'button', name: 'Secondary CTA', x: 254, y: 518, width: 150, height: 52, content: 'View Agenda', fill: 'transparent', textColor: '#DDE7FF', borderColor: 'rgba(255,255,255,0.18)', fontSize: 15, fontWeight: 700, fontFamily: 'Inter', radius: 12, opacity: 100 },
  { id: 'ts-visual-title', type: 'heading', name: 'Visual Title', x: 774, y: 198, width: 290, height: 72, content: 'Main Stage', fontSize: 34, fontWeight: 800, fontFamily: 'Inter', textColor: '#F0F4FF', opacity: 100 },
  { id: 'ts-visual-copy', type: 'paragraph', name: 'Visual Copy', x: 774, y: 282, width: 280, height: 96, content: 'Keynotes, workshops, panels, and hands-on demos from industry leaders.', fontSize: 15, fontFamily: 'Inter', textColor: '#9BAEC8', lineHeight: 1.65, opacity: 100 },
  { id: 'ts-visual-stat-a', type: 'heading', name: 'Visual Stat Speakers', x: 774, y: 416, width: 120, height: 44, content: '50+', fontSize: 38, fontWeight: 800, fontFamily: 'Inter', textColor: '#60A5FA', opacity: 100 },
  { id: 'ts-visual-stat-b', type: 'heading', name: 'Visual Stat Attendees', x: 936, y: 416, width: 130, height: 44, content: '5k', fontSize: 38, fontWeight: 800, fontFamily: 'Inter', textColor: '#60A5FA', opacity: 100 },
  { id: 'ts-visual-label-a', type: 'paragraph', name: 'Speakers Label', x: 774, y: 464, width: 120, height: 22, content: 'Speakers', fontSize: 13, fontFamily: 'Inter', textColor: '#9BAEC8', opacity: 100 },
  { id: 'ts-visual-label-b', type: 'paragraph', name: 'Attendees Label', x: 936, y: 464, width: 130, height: 22, content: 'Attendees', fontSize: 13, fontFamily: 'Inter', textColor: '#9BAEC8', opacity: 100 },

  { id: 'ts-stats-bg', type: 'container', name: 'Stats Band', x: 0, y: 696, width: 1200, height: 132, fill: '#0D1525', borderColor: 'rgba(255,255,255,0.08)', radius: 0, opacity: 100 },
  { id: 'ts-stat-1', type: 'heading', name: 'Stat 1', x: 100, y: 724, width: 180, height: 42, content: '3 Days', fontSize: 34, fontWeight: 800, fontFamily: 'Inter', textColor: '#F0F4FF', opacity: 100 },
  { id: 'ts-stat-1-label', type: 'paragraph', name: 'Stat 1 Label', x: 100, y: 770, width: 180, height: 22, content: 'conference program', fontSize: 13, fontFamily: 'Inter', textColor: '#9BAEC8', opacity: 100 },
  { id: 'ts-stat-2', type: 'heading', name: 'Stat 2', x: 372, y: 724, width: 180, height: 42, content: '80+', fontSize: 34, fontWeight: 800, fontFamily: 'Inter', textColor: '#F0F4FF', opacity: 100 },
  { id: 'ts-stat-2-label', type: 'paragraph', name: 'Stat 2 Label', x: 372, y: 770, width: 180, height: 22, content: 'technical sessions', fontSize: 13, fontFamily: 'Inter', textColor: '#9BAEC8', opacity: 100 },
  { id: 'ts-stat-3', type: 'heading', name: 'Stat 3', x: 644, y: 724, width: 180, height: 42, content: '24', fontSize: 34, fontWeight: 800, fontFamily: 'Inter', textColor: '#F0F4FF', opacity: 100 },
  { id: 'ts-stat-3-label', type: 'paragraph', name: 'Stat 3 Label', x: 644, y: 770, width: 180, height: 22, content: 'workshops', fontSize: 13, fontFamily: 'Inter', textColor: '#9BAEC8', opacity: 100 },
  { id: 'ts-stat-4', type: 'heading', name: 'Stat 4', x: 916, y: 724, width: 180, height: 42, content: '120', fontSize: 34, fontWeight: 800, fontFamily: 'Inter', textColor: '#F0F4FF', opacity: 100 },
  { id: 'ts-stat-4-label', type: 'paragraph', name: 'Stat 4 Label', x: 916, y: 770, width: 180, height: 22, content: 'sponsors & demos', fontSize: 13, fontFamily: 'Inter', textColor: '#9BAEC8', opacity: 100 },

  { id: 'ts-speakers-bg', type: 'container', name: 'Speakers Section', x: 0, y: 828, width: 1200, height: 520, fill: '#080C14', radius: 0, opacity: 100 },
  { id: 'ts-speakers-kicker', type: 'label', name: 'Speakers Kicker', x: 100, y: 890, width: 170, height: 24, content: 'SPEAKERS', fontSize: 11, fontWeight: 800, fontFamily: 'Inter', textColor: '#60A5FA', opacity: 100 },
  { id: 'ts-speakers-title', type: 'heading', name: 'Speakers Heading', x: 100, y: 926, width: 520, height: 58, content: 'Leaders from the front lines.', fontSize: 42, fontWeight: 800, fontFamily: 'Inter', textColor: '#F0F4FF', lineHeight: 1.12, opacity: 100 },
  { id: 'ts-speaker-card-1', type: 'container', name: 'Speaker Card 1', x: 100, y: 1032, width: 235, height: 220, fill: '#111B2E', borderColor: 'rgba(255,255,255,0.08)', radius: 18, opacity: 100 },
  { id: 'ts-speaker-1-name', type: 'heading', name: 'Speaker 1 Name', x: 124, y: 1064, width: 187, height: 32, content: 'Sarah Chen', fontSize: 20, fontWeight: 800, fontFamily: 'Inter', textColor: '#F0F4FF', opacity: 100 },
  { id: 'ts-speaker-1-role', type: 'paragraph', name: 'Speaker 1 Role', x: 124, y: 1104, width: 187, height: 52, content: 'CEO, Nexus AI\nFoundation Models', fontSize: 13, fontFamily: 'Inter', textColor: '#9BAEC8', lineHeight: 1.55, opacity: 100 },
  { id: 'ts-speaker-card-2', type: 'container', name: 'Speaker Card 2', x: 355, y: 1032, width: 235, height: 220, fill: '#111B2E', borderColor: 'rgba(255,255,255,0.08)', radius: 18, opacity: 100 },
  { id: 'ts-speaker-2-name', type: 'heading', name: 'Speaker 2 Name', x: 379, y: 1064, width: 187, height: 32, content: 'Marcus Webb', fontSize: 20, fontWeight: 800, fontFamily: 'Inter', textColor: '#F0F4FF', opacity: 100 },
  { id: 'ts-speaker-2-role', type: 'paragraph', name: 'Speaker 2 Role', x: 379, y: 1104, width: 187, height: 52, content: 'CTO, Orbital\nDistributed Systems', fontSize: 13, fontFamily: 'Inter', textColor: '#9BAEC8', lineHeight: 1.55, opacity: 100 },
  { id: 'ts-speaker-card-3', type: 'container', name: 'Speaker Card 3', x: 610, y: 1032, width: 235, height: 220, fill: '#111B2E', borderColor: 'rgba(255,255,255,0.08)', radius: 18, opacity: 100 },
  { id: 'ts-speaker-3-name', type: 'heading', name: 'Speaker 3 Name', x: 634, y: 1064, width: 187, height: 32, content: 'Priya Nair', fontSize: 20, fontWeight: 800, fontFamily: 'Inter', textColor: '#F0F4FF', opacity: 100 },
  { id: 'ts-speaker-3-role', type: 'paragraph', name: 'Speaker 3 Role', x: 634, y: 1104, width: 187, height: 52, content: 'Research Lead\nAI Safety', fontSize: 13, fontFamily: 'Inter', textColor: '#9BAEC8', lineHeight: 1.55, opacity: 100 },
  { id: 'ts-speaker-card-4', type: 'container', name: 'Speaker Card 4', x: 865, y: 1032, width: 235, height: 220, fill: '#111B2E', borderColor: 'rgba(255,255,255,0.08)', radius: 18, opacity: 100 },
  { id: 'ts-speaker-4-name', type: 'heading', name: 'Speaker 4 Name', x: 889, y: 1064, width: 187, height: 32, content: 'Elena Vasquez', fontSize: 20, fontWeight: 800, fontFamily: 'Inter', textColor: '#F0F4FF', opacity: 100 },
  { id: 'ts-speaker-4-role', type: 'paragraph', name: 'Speaker 4 Role', x: 889, y: 1104, width: 187, height: 52, content: 'VP Engineering\nPayments at Scale', fontSize: 13, fontFamily: 'Inter', textColor: '#9BAEC8', lineHeight: 1.55, opacity: 100 },

  { id: 'ts-schedule-bg', type: 'container', name: 'Schedule Section', x: 0, y: 1348, width: 1200, height: 520, fill: '#0D1525', radius: 0, opacity: 100 },
  { id: 'ts-schedule-kicker', type: 'label', name: 'Schedule Kicker', x: 100, y: 1410, width: 170, height: 24, content: 'SCHEDULE', fontSize: 11, fontWeight: 800, fontFamily: 'Inter', textColor: '#60A5FA', opacity: 100 },
  { id: 'ts-schedule-title', type: 'heading', name: 'Schedule Heading', x: 100, y: 1446, width: 520, height: 58, content: 'A focused agenda for builders.', fontSize: 42, fontWeight: 800, fontFamily: 'Inter', textColor: '#F0F4FF', lineHeight: 1.12, opacity: 100 },
  { id: 'ts-agenda-card', type: 'container', name: 'Agenda Card', x: 100, y: 1540, width: 1000, height: 220, fill: '#111B2E', borderColor: 'rgba(255,255,255,0.08)', radius: 20, opacity: 100 },
  { id: 'ts-agenda-1-time', type: 'label', name: 'Agenda 1 Time', x: 140, y: 1576, width: 100, height: 24, content: '09:00', fontSize: 12, fontWeight: 800, fontFamily: 'Inter', textColor: '#93C5FD', opacity: 100 },
  { id: 'ts-agenda-1-title', type: 'heading', name: 'Agenda 1 Title', x: 260, y: 1570, width: 660, height: 34, content: 'Opening Keynote: The Next Platform Shift', fontSize: 22, fontWeight: 800, fontFamily: 'Inter', textColor: '#F0F4FF', opacity: 100 },
  { id: 'ts-agenda-2-time', type: 'label', name: 'Agenda 2 Time', x: 140, y: 1642, width: 100, height: 24, content: '11:00', fontSize: 12, fontWeight: 800, fontFamily: 'Inter', textColor: '#93C5FD', opacity: 100 },
  { id: 'ts-agenda-2-title', type: 'heading', name: 'Agenda 2 Title', x: 260, y: 1636, width: 660, height: 34, content: 'Workshop: Building Reliable AI Workflows', fontSize: 22, fontWeight: 800, fontFamily: 'Inter', textColor: '#F0F4FF', opacity: 100 },
  { id: 'ts-agenda-3-time', type: 'label', name: 'Agenda 3 Time', x: 140, y: 1708, width: 100, height: 24, content: '15:30', fontSize: 12, fontWeight: 800, fontFamily: 'Inter', textColor: '#93C5FD', opacity: 100 },
  { id: 'ts-agenda-3-title', type: 'heading', name: 'Agenda 3 Title', x: 260, y: 1702, width: 660, height: 34, content: 'Panel: Security, Scale, and Open Source', fontSize: 22, fontWeight: 800, fontFamily: 'Inter', textColor: '#F0F4FF', opacity: 100 },

  { id: 'ts-ticket-bg', type: 'container', name: 'Tickets Section', x: 0, y: 1868, width: 1200, height: 560, fill: '#080C14', radius: 0, opacity: 100 },
  { id: 'ts-ticket-title', type: 'heading', name: 'Tickets Heading', x: 100, y: 1940, width: 520, height: 58, content: 'Choose your conference pass.', fontSize: 42, fontWeight: 800, fontFamily: 'Inter', textColor: '#F0F4FF', lineHeight: 1.12, opacity: 100 },
  { id: 'ts-ticket-card-1', type: 'container', name: 'Community Ticket', x: 100, y: 2040, width: 300, height: 250, fill: '#111B2E', borderColor: 'rgba(255,255,255,0.08)', radius: 20, opacity: 100 },
  { id: 'ts-ticket-1-title', type: 'heading', name: 'Community Title', x: 130, y: 2076, width: 240, height: 32, content: 'Community', fontSize: 22, fontWeight: 800, fontFamily: 'Inter', textColor: '#F0F4FF', opacity: 100 },
  { id: 'ts-ticket-1-price', type: 'heading', name: 'Community Price', x: 130, y: 2124, width: 220, height: 56, content: '$299', fontSize: 42, fontWeight: 800, fontFamily: 'Inter', textColor: '#60A5FA', opacity: 100 },
  { id: 'ts-ticket-1-copy', type: 'paragraph', name: 'Community Copy', x: 130, y: 2190, width: 230, height: 58, content: 'General admission, expo access, and recorded sessions.', fontSize: 14, fontFamily: 'Inter', textColor: '#9BAEC8', lineHeight: 1.55, opacity: 100 },
  { id: 'ts-ticket-card-2', type: 'container', name: 'Professional Ticket', x: 450, y: 2020, width: 300, height: 290, fill: '#141F34', borderColor: '#3B82F6', radius: 20, shadowColor: 'rgba(59,130,246,0.22)', opacity: 100 },
  { id: 'ts-ticket-2-title', type: 'heading', name: 'Professional Title', x: 480, y: 2056, width: 240, height: 32, content: 'Professional', fontSize: 22, fontWeight: 800, fontFamily: 'Inter', textColor: '#F0F4FF', opacity: 100 },
  { id: 'ts-ticket-2-price', type: 'heading', name: 'Professional Price', x: 480, y: 2104, width: 220, height: 56, content: '$599', fontSize: 42, fontWeight: 800, fontFamily: 'Inter', textColor: '#60A5FA', opacity: 100 },
  { id: 'ts-ticket-2-copy', type: 'paragraph', name: 'Professional Copy', x: 480, y: 2170, width: 230, height: 76, content: 'Everything in Community plus workshops, priority seating, and VIP networking.', fontSize: 14, fontFamily: 'Inter', textColor: '#9BAEC8', lineHeight: 1.55, opacity: 100 },
  { id: 'ts-ticket-card-3', type: 'container', name: 'Executive Ticket', x: 800, y: 2040, width: 300, height: 250, fill: '#111B2E', borderColor: 'rgba(255,255,255,0.08)', radius: 20, opacity: 100 },
  { id: 'ts-ticket-3-title', type: 'heading', name: 'Executive Title', x: 830, y: 2076, width: 240, height: 32, content: 'Executive', fontSize: 22, fontWeight: 800, fontFamily: 'Inter', textColor: '#F0F4FF', opacity: 100 },
  { id: 'ts-ticket-3-price', type: 'heading', name: 'Executive Price', x: 830, y: 2124, width: 220, height: 56, content: '$1299', fontSize: 42, fontWeight: 800, fontFamily: 'Inter', textColor: '#60A5FA', opacity: 100 },
  { id: 'ts-ticket-3-copy', type: 'paragraph', name: 'Executive Copy', x: 830, y: 2190, width: 230, height: 58, content: 'Private roundtables, founder dinner, and concierge access.', fontSize: 14, fontFamily: 'Inter', textColor: '#9BAEC8', lineHeight: 1.55, opacity: 100 },

  { id: 'ts-footer-bg', type: 'container', name: 'Footer Section', x: 0, y: 2428, width: 1200, height: 260, fill: '#0D1525', borderColor: 'rgba(255,255,255,0.08)', radius: 0, opacity: 100 },
  { id: 'ts-footer-title', type: 'heading', name: 'Footer CTA', x: 100, y: 2488, width: 680, height: 62, content: 'Ready for three days of serious building?', fontSize: 42, fontWeight: 800, fontFamily: 'Inter', textColor: '#F0F4FF', lineHeight: 1.15, opacity: 100 },
  { id: 'ts-footer-button', type: 'button', name: 'Footer Button', x: 850, y: 2500, width: 170, height: 52, content: 'Get Tickets', fill: '#3B82F6', textColor: '#ffffff', fontSize: 15, fontWeight: 800, fontFamily: 'Inter', radius: 12, opacity: 100 },
  { id: 'ts-footer-copy', type: 'paragraph', name: 'Footer Copyright', x: 100, y: 2622, width: 460, height: 22, content: '© 2026 TechSummit. All rights reserved.', fontSize: 13, fontFamily: 'Inter', textColor: '#9BAEC8', opacity: 100 },
  { id: 'ts-footer-links', type: 'paragraph', name: 'Footer Links', x: 760, y: 2622, width: 340, height: 22, content: 'Privacy     Terms     Contact', fontSize: 13, fontFamily: 'Inter', textColor: '#9BAEC8', textAlign: 'right', opacity: 100 },
]

// ── TechSummit 1 light/dark theme helpers ─────────────────────────────────────

const LIGHT_THEME_VALUES = {
  '#080C14': '#F8FAFF',
  '#0D1525': '#FFFFFF',
  '#111B2E': '#FFFFFF',
  '#141F34': '#EEF3FF',
  '#F0F4FF': '#0F172A',
  '#9BAEC8': '#475569',
  '#5F7394': '#64748B',
  '#DDE7FF': '#1D4ED8',
  '#93C5FD': '#2563EB',
  '#60A5FA': '#2563EB',
  'rgba(255,255,255,0.10)': '#D8E1F0',
  'rgba(255,255,255,0.08)': '#E2E8F4',
  'rgba(255,255,255,0.18)': '#C7D2FE',
  'rgba(59,130,246,0.14)': '#DBEAFE',
  'rgba(59,130,246,0.24)': 'rgba(37,99,235,0.16)',
  'rgba(59,130,246,0.22)': 'rgba(37,99,235,0.14)',
}

function toLightTheme(element) {
  const next = { ...element }
  ;['fill', 'textColor', 'borderColor', 'shadowColor'].forEach(key => {
    if (LIGHT_THEME_VALUES[next[key]]) next[key] = LIGHT_THEME_VALUES[next[key]]
  })
  if (next.fill === 'transparent' && next.textColor === '#DDE7FF') {
    next.textColor = '#1D4ED8'
  }
  return next
}

const techSummitElements = withResponsive(techSummitBaseElements.map(toLightTheme))

const techSummitThemeById = {
  dark:  Object.fromEntries(techSummitBaseElements.map(el => [el.id, el])),
  light: Object.fromEntries(techSummitBaseElements.map(toLightTheme).map(el => [el.id, el])),
}

export function isTechSummitTemplate(elements = []) {
  return elements.some(element => String(element.id || '').startsWith('ts-'))
}

export function isAnyTechSummitTemplate(elements = []) {
  return isTechSummitTemplate(elements) || isTechSummit2Template(elements)
}

// ─────────────────────────────────────────────────────────────────────────────
// isAnyTemplate — convenience helper covering all registered templates
// ─────────────────────────────────────────────────────────────────────────────
export function isAnyTemplate(elements = []) {
  return (
    isTechSummitTemplate(elements)           ||
    isBoldSummitTemplate(elements)           ||
    isArtDecoTemplate(elements)              ||
    isNeuSummitTemplate(elements)            ||
    isPlayfulGeometricTemplate(elements)     ||
    isVaporWaveFestTemplate(elements)        ||
    isMinimalistMonochromeTemplate(elements) ||
    isFlatDesignTemplate(elements)           ||
    isBotanicalOrganicTemplate(elements)
  )
}

export function applyTechSummitTheme(elements = [], theme = 'dark') {
  const palette = techSummitThemeById[theme] || techSummitThemeById.dark
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

// ─────────────────────────────────────────────────────────────────────────────
// applyThemeToTemplate — dispatches to the correct per-template apply fn
// ─────────────────────────────────────────────────────────────────────────────
export function applyThemeToTemplate(elements = [], theme = 'dark') {
  if (isTechSummitTemplate(elements))           return applyTechSummitTheme(elements, theme)
  if (isBoldSummitTemplate(elements))           return applyBoldSummitTheme(elements, theme)
  if (isArtDecoTemplate(elements))              return applyArtDecoTheme(elements, theme)
  if (isNeuSummitTemplate(elements))            return applyNeuSummitTheme(elements, theme)
  if (isPlayfulGeometricTemplate(elements))     return applyPlayfulGeometricTheme(elements, theme)
  if (isVaporWaveFestTemplate(elements))        return applyVaporWaveFestTheme(elements, theme)
  if (isMinimalistMonochromeTemplate(elements)) return applyMinimalistMonochromeTheme(elements, theme)
  if (isFlatDesignTemplate(elements))           return applyFlatDesignTheme(elements, theme)
  if (isBotanicalOrganicTemplate(elements))     return applyBotanicalOrganicTheme(elements, theme)
  return elements
}

export function getTechSummitCanvasFill(theme = 'dark') {
  return theme === 'light' ? '#F8FAFF' : '#080C14'
}

// ─────────────────────────────────────────────────────────────────────────────
// getCanvasFillByTemplate — returns the correct root background per template
// ─────────────────────────────────────────────────────────────────────────────
export function getCanvasFillByTemplate(elements = [], theme = 'dark') {
  if (isTechSummitTemplate(elements))           return getTechSummitCanvasFill(theme)
  if (isBoldSummitTemplate(elements))           return getBoldSummitCanvasFill(theme)
  if (isArtDecoTemplate(elements))              return getArtDecoCanvasFill(theme)
  if (isNeuSummitTemplate(elements))            return getNeuSummitCanvasFill(theme)
  if (isPlayfulGeometricTemplate(elements))     return getPlayfulGeometricCanvasFill(theme)
  if (isVaporWaveFestTemplate(elements))        return getVaporWaveFestCanvasFill(theme)
  if (isMinimalistMonochromeTemplate(elements)) return getMinimalistMonochromeCanvasFill(theme)
  if (isFlatDesignTemplate(elements))           return getFlatDesignCanvasFill(theme)
  if (isBotanicalOrganicTemplate(elements))     return getBotanicalOrganicCanvasFill(theme)
  return theme === 'dark' ? '#000000' : '#ffffff'
}

// ─────────────────────────────────────────────────────────────────────────────
// Re-exports — so callers can import helpers directly from template.js
// ─────────────────────────────────────────────────────────────────────────────
export { isArtDecoTemplate, applyArtDecoTheme, getArtDecoCanvasFill }
export { isBoldSummitTemplate, applyBoldSummitTheme, getBoldSummitCanvasFill }
export { isNeuSummitTemplate, applyNeuSummitTheme, getNeuSummitCanvasFill }
export { isPlayfulGeometricTemplate, applyPlayfulGeometricTheme, getPlayfulGeometricCanvasFill }
export { isVaporWaveFestTemplate, applyVaporWaveFestTheme, getVaporWaveFestCanvasFill }
export { isMinimalistMonochromeTemplate, applyMinimalistMonochromeTheme, getMinimalistMonochromeCanvasFill }
export { isFlatDesignTemplate, applyFlatDesignTheme, getFlatDesignCanvasFill }
export { isBotanicalOrganicTemplate, applyBotanicalOrganicTheme, getBotanicalOrganicCanvasFill }

// ─────────────────────────────────────────────────────────────────────────────
// TEMPLATES — single source of truth
//
// Every entry carries a `thumbnail` field sourced directly from
// TEMPLATE_THUMBNAILS (inline SVG data URIs). This is the only place
// thumbnails need to be wired — the gallery component reads template.thumbnail
// and can use it as <img src> or CSS background-image without any extra logic.
// ─────────────────────────────────────────────────────────────────────────────
export const TEMPLATES = {
  blank: {
    name: 'Blank',
    description: 'Start from scratch',
    elements: [],
    thumbnail: null,
    canvasSettings: {
      width:  1200,
      height: 900,
      x: 0,
      y: 0,
      fill: '#ffffff',
    },
  },

  techSummitTemplate1: {
    name: 'TechSummit Template 1',
    description: 'Editable tech conference landing page',
    elements: techSummitElements,
    thumbnail: TEMPLATE_THUMBNAILS.techSummitTemplate1,
    canvasSettings: {
      width:  1200,
      height: 2768,
      x: 0,
      y: 0,
      fill: '#F8FAFF',
    },
  },

  artDecoGala: {
    name: 'Gatsby Gala – Art Deco',
    description: "Luxury New Year's Eve gala event landing page",
    elements: artDecoElements,
    thumbnail: TEMPLATE_THUMBNAILS.artDecoGala,
    canvasSettings: {
      width:  1200,
      height: 2820,
      x: 0,
      y: 0,
      fill: '#FAF7EF',
    },
  },

  boldSummitTemplate: {
    name: 'DesignConf – Bold Typography',
    description: 'Editorial design conference landing page',
    elements: withResponsive(boldSummitElements),
    thumbnail: TEMPLATE_THUMBNAILS.boldSummitTemplate,
    canvasSettings: {
      width:  1200,
      height: 3952,
      x: 0,
      y: 0,
      fill: '#FAFAFA',
    },
    supportsTheme: true,
    defaultTheme:  'light',
    themeApplyFn:  applyBoldSummitTheme,
    canvasFillFn:  getBoldSummitCanvasFill,
  },

  neuSummitTemplate: {
    name: 'NeuSummit – Soft UI Design Conference',
    description: 'Premium neumorphic design-systems conference landing page',
    elements: withResponsive(neuSummitElements),
    thumbnail: TEMPLATE_THUMBNAILS.neuSummitTemplate,
    canvasSettings: {
      width:  1200,
      height: 4480,
      x: 0,
      y: 0,
      fill: '#E0E5EC',
    },
    supportsTheme: true,
    defaultTheme:  'light',
    themeApplyFn:  applyNeuSummitTheme,
    canvasFillFn:  getNeuSummitCanvasFill,
  },

  playfulGeometricTemplate: {
    name: 'PixelFest – Playful Geometric',
    description: 'Design & creative tech festival landing page',
    elements: withResponsive(playfulGeometricElements),
    thumbnail: TEMPLATE_THUMBNAILS.playfulGeometricTemplate,
    canvasSettings: {
      width:  1200,
      height: 4660,
      x: 0,
      y: 0,
      fill: '#FFFDF5',
    },
    supportsTheme: true,
    defaultTheme:  'light',
    themeApplyFn:  applyPlayfulGeometricTheme,
    canvasFillFn:  getPlayfulGeometricCanvasFill,
  },

  vaporWaveFestTemplate: {
    name: 'Neon Fest – Vaporwave',
    description: 'Synthwave & retrowave music festival landing page',
    elements: withResponsive(vaporWaveFestElements),
    thumbnail: TEMPLATE_THUMBNAILS.vaporWaveFestTemplate,
    canvasSettings: {
      width:  1200,
      height: 3872,
      x: 0,
      y: 0,
      fill: '#090014',
    },
    supportsTheme: true,
    defaultTheme:  'dark',
    themeApplyFn:  applyVaporWaveFestTheme,
    canvasFillFn:  getVaporWaveFestCanvasFill,
  },

  minimalistMonochromeTemplate: {
    name: 'FORMA – Minimalist Monochrome',
    description: 'High-end editorial design conference landing page',
    elements: withResponsive(minimalistMonochromeElements),
    thumbnail: TEMPLATE_THUMBNAILS.minimalistMonochromeTemplate,
    canvasSettings: {
      width:  1200,
      height: 4114,
      x: 0,
      y: 0,
      fill: '#FFFFFF',
    },
    supportsTheme: true,
    defaultTheme:  'light',
    themeApplyFn:  applyMinimalistMonochromeTheme,
    canvasFillFn:  getMinimalistMonochromeCanvasFill,
  },

  flatDesignTemplate: {
    name: 'LaunchPad – Flat Design',
    description: 'Bold SaaS product landing page — zero shadows, pure colour',
    elements: withResponsive(flatDesignElements),
    thumbnail: TEMPLATE_THUMBNAILS.flatDesignTemplate,
    canvasSettings: {
      width:  1200,
      height: 3622,
      x: 0,
      y: 0,
      fill: '#FFFFFF',
    },
    supportsTheme: true,
    defaultTheme:  'light',
    themeApplyFn:  applyFlatDesignTheme,
    canvasFillFn:  getFlatDesignCanvasFill,
  },

  botanicalOrganicTemplate: {
    name: 'Verdana – Botanical Organic',
    description: 'Earthy wellness & spa brand — serif type, organic shapes',
    elements: withResponsive(botanicalOrganicElements),
    thumbnail: TEMPLATE_THUMBNAILS.botanicalOrganicTemplate,
    canvasSettings: {
      width:  1200,
      height: 3980,
      x: 0,
      y: 0,
      fill: '#F9F8F4',
    },
    supportsTheme: true,
    defaultTheme:  'light',
    themeApplyFn:  applyBotanicalOrganicTheme,
    canvasFillFn:  getBotanicalOrganicCanvasFill,
  },
}