import { generateResponsiveDefaults } from '../utils/responsive'

const withResponsive = (elements, width = 1200) =>
  elements.map(element => generateResponsiveDefaults(element, width))

// ─── Design Token Constants ───────────────────────────────────────────────────

// Light palette (default) — earthy, muted, nature-derived
const L = {
  bg:           '#F9F8F4',   // Warm Alabaster / Rice Paper
  bgAlt:        '#F2F0EB',   // Soft Clay surface
  bgDark:       '#2D3A31',   // Deep Forest Green (dark sections)
  bgDarkAlt:    '#384840',   // Slightly lighter forest
  card:         '#FFFFFF',
  cardClay:     '#F2F0EB',   // Soft Clay card
  cardSage:     '#EEF1EC',   // Sage-tinted card
  fg:           '#2D3A31',   // Deep Forest Green text
  fgMuted:      '#7A8B7F',   // Muted sage green
  fgLight:      '#A5B5AA',   // Even lighter muted
  fgInverse:    '#F9F8F4',   // Inverse for dark sections
  primary:      '#8C9A84',   // Sage Green
  primaryDark:  '#6B7C65',   // Darker sage
  terracotta:   '#C27B66',   // Terracotta accent
  terracottaDk: '#A8634F',   // Darker terracotta
  border:       '#E6E2DA',   // Stone
  borderDark:   'rgba(249,248,244,0.15)', // Subtle on dark bg
  sage10:       'rgba(140,154,132,0.12)',
  terra10:      'rgba(194,123,102,0.12)',
  forest10:     'rgba(45,58,49,0.07)',
  white15:      'rgba(255,255,255,0.15)',
  white25:      'rgba(255,255,255,0.25)',
  white08:      'rgba(255,255,255,0.08)',
}

// Dark palette overrides
const D = {
  bg:           '#1C2420',   // Very deep forest
  bgAlt:        '#232E28',   // Dark clay
  bgDark:       '#111A13',   // Even deeper
  bgDarkAlt:    '#1C2420',
  card:         '#232E28',
  cardClay:     '#2A3530',
  cardSage:     '#263028',
  fg:           '#E8E4DC',   // Warm off-white
  fgMuted:      '#8FA898',   // Lighter sage
  fgLight:      '#6B8076',
  fgInverse:    '#E8E4DC',
  primary:      '#A5B89C',   // Lighter sage for dark
  primaryDark:  '#8C9A84',
  terracotta:   '#D4937E',   // Lighter terracotta
  terracottaDk: '#C27B66',
  border:       '#3D4E45',
  borderDark:   'rgba(232,228,220,0.12)',
  sage10:       'rgba(165,184,156,0.15)',
  terra10:      'rgba(212,147,126,0.12)',
  forest10:     'rgba(232,228,220,0.05)',
  white15:      'rgba(255,255,255,0.12)',
  white25:      'rgba(255,255,255,0.20)',
  white08:      'rgba(255,255,255,0.06)',
}

// ─── Base Elements (Light Mode) ───────────────────────────────────────────────

const botanicalOrganicBaseElements = [

  // ══ NAVIGATION ══════════════════════════════════════════════════════════════
  { id: 'bo-nav-bg', type: 'container', name: 'Navigation Bar', x: 0, y: 0, width: 1200, height: 80, fill: L.bg, borderColor: L.border, radius: 0, opacity: 100 },
  { id: 'bo-nav-logo-leaf', type: 'container', name: 'Logo Leaf Shape', x: 48, y: 20, width: 40, height: 40, fill: L.primary, borderColor: 'transparent', radius: 9999, opacity: 100 },
  { id: 'bo-nav-logo', type: 'heading', name: 'Logo Text', x: 100, y: 23, width: 180, height: 34, content: 'Verdana', fontSize: 22, fontWeight: 700, fontFamily: 'Playfair Display', textColor: L.fg, opacity: 100 },
  { id: 'bo-nav-links', type: 'paragraph', name: 'Nav Links', x: 380, y: 29, width: 440, height: 22, content: 'Our Story     Treatments     Wellness     Pricing', fontSize: 14, fontWeight: 400, fontFamily: 'Source Sans 3', textColor: L.fgMuted, textAlign: 'center', opacity: 100 },
  { id: 'bo-nav-cta', type: 'button', name: 'Nav CTA', x: 1020, y: 18, width: 130, height: 44, content: 'Book a Visit', fill: L.fg, textColor: L.fgInverse, fontSize: 13, fontWeight: 600, fontFamily: 'Source Sans 3', borderColor: 'transparent', radius: 9999, opacity: 100 },

  // ══ HERO SECTION ════════════════════════════════════════════════════════════
  { id: 'bo-hero-bg', type: 'container', name: 'Hero Section', x: 0, y: 80, width: 1200, height: 680, fill: L.bg, radius: 0, opacity: 100 },
  // Organic decorative shapes (flat, nature-inspired)
  { id: 'bo-hero-deco-arch', type: 'container', name: 'Hero Arch Decoration', x: 660, y: 110, width: 400, height: 480, fill: L.cardClay, borderColor: L.border, radius: 200, opacity: 100 },
  { id: 'bo-hero-deco-circle', type: 'container', name: 'Hero Deco Circle', x: 40, y: 400, width: 160, height: 160, fill: L.sage10, borderColor: 'transparent', radius: 9999, opacity: 100 },
  { id: 'bo-hero-deco-small', type: 'container', name: 'Hero Deco Small Blob', x: 1080, y: 560, width: 80, height: 80, fill: L.terra10, borderColor: 'transparent', radius: 9999, opacity: 100 },
  // Hero content
  { id: 'bo-hero-eyebrow', type: 'paragraph', name: 'Hero Eyebrow', x: 76, y: 158, width: 300, height: 22, content: 'BOTANICAL WELLNESS SPA', fontSize: 11, fontWeight: 600, fontFamily: 'Source Sans 3', textColor: L.primary, opacity: 100 },
  { id: 'bo-hero-title', type: 'heading', name: 'Hero Title', x: 72, y: 192, width: 560, height: 220, content: 'Reconnect with\nyour natural\nself.', fontSize: 66, fontWeight: 700, fontFamily: 'Playfair Display', textColor: L.fg, lineHeight: 1.1, opacity: 100 },
  { id: 'bo-hero-desc', type: 'paragraph', name: 'Hero Description', x: 76, y: 432, width: 440, height: 80, content: 'A sanctuary of plant-based treatments, mindful rituals, and healing botanicals. Your wellness journey begins here, in the heart of nature.', fontSize: 17, fontWeight: 400, fontFamily: 'Source Sans 3', textColor: L.fgMuted, lineHeight: 1.75, opacity: 100 },
  { id: 'bo-hero-cta-primary', type: 'button', name: 'Hero Primary CTA', x: 76, y: 540, width: 180, height: 52, content: 'Explore Treatments', fill: L.fg, textColor: L.fgInverse, fontSize: 13, fontWeight: 600, fontFamily: 'Source Sans 3', radius: 9999, opacity: 100 },
  { id: 'bo-hero-cta-secondary', type: 'button', name: 'Hero Secondary CTA', x: 272, y: 540, width: 160, height: 52, content: 'Our Philosophy', fill: 'transparent', textColor: L.primary, fontSize: 13, fontWeight: 600, fontFamily: 'Source Sans 3', borderColor: L.primary, radius: 9999, opacity: 100 },
  // Hero decorative quote card
  { id: 'bo-hero-quote-card', type: 'container', name: 'Hero Quote Card', x: 700, y: 200, width: 310, height: 180, fill: L.bg, borderColor: L.border, radius: 24, opacity: 95 },
  { id: 'bo-hero-quote-mark', type: 'heading', name: 'Hero Quote Mark', x: 728, y: 215, width: 40, height: 44, content: '"', fontSize: 48, fontWeight: 700, fontFamily: 'Playfair Display', textColor: L.primary, opacity: 100 },
  { id: 'bo-hero-quote-text', type: 'paragraph', name: 'Hero Quote Text', x: 728, y: 258, width: 258, height: 72, content: 'Nature is the greatest healer of all — we simply create the space to listen.', fontSize: 15, fontWeight: 400, fontFamily: 'Playfair Display', textColor: L.fg, lineHeight: 1.65, opacity: 100 },
  { id: 'bo-hero-quote-attr', type: 'paragraph', name: 'Hero Quote Attribution', x: 728, y: 348, width: 258, height: 20, content: '— Founder, Dr. Elise Harmon', fontSize: 11, fontFamily: 'Source Sans 3', textColor: L.fgMuted, opacity: 100 },

  // ══ ABOUT / OVERVIEW ════════════════════════════════════════════════════════
  { id: 'bo-about-bg', type: 'container', name: 'About Section', x: 0, y: 760, width: 1200, height: 480, fill: L.bgDark, radius: 0, opacity: 100 },
  // Background organic deco on dark
  { id: 'bo-about-deco-1', type: 'container', name: 'About Deco 1', x: 1000, y: 790, width: 220, height: 220, fill: L.white08, radius: 9999, opacity: 100 },
  { id: 'bo-about-deco-2', type: 'container', name: 'About Deco 2', x: 30, y: 960, width: 100, height: 100, fill: L.white08, radius: 9999, opacity: 100 },
  { id: 'bo-about-eyebrow', type: 'paragraph', name: 'About Eyebrow', x: 100, y: 830, width: 200, height: 22, content: 'OUR PHILOSOPHY', fontSize: 11, fontWeight: 600, fontFamily: 'Source Sans 3', textColor: L.primary, opacity: 100 },
  { id: 'bo-about-title', type: 'heading', name: 'About Title', x: 100, y: 866, width: 520, height: 100, content: 'Rooted in ancient\nwisdom, guided by science.', fontSize: 44, fontWeight: 700, fontFamily: 'Playfair Display', textColor: L.fgInverse, lineHeight: 1.15, opacity: 100 },
  { id: 'bo-about-copy', type: 'paragraph', name: 'About Copy', x: 100, y: 984, width: 460, height: 96, content: 'We combine the healing traditions of botanical medicine with contemporary wellness science. Every treatment, every ritual, every ingredient is chosen with intention—to restore balance, renew vitality, and honour the body as a living ecosystem.', fontSize: 16, fontFamily: 'Source Sans 3', textColor: 'rgba(249,248,244,0.65)', lineHeight: 1.75, opacity: 100 },
  { id: 'bo-about-link', type: 'button', name: 'About Link', x: 100, y: 1104, width: 160, height: 44, content: 'Our Story →', fill: 'transparent', textColor: L.fgInverse, fontSize: 13, fontWeight: 600, fontFamily: 'Source Sans 3', borderColor: 'rgba(249,248,244,0.30)', radius: 9999, opacity: 100 },
  // Right side: 2 stat/highlight boxes
  { id: 'bo-about-box-1', type: 'container', name: 'About Highlight 1', x: 700, y: 840, width: 220, height: 160, fill: L.primary, borderColor: 'transparent', radius: 20, opacity: 100 },
  { id: 'bo-about-box-1-num', type: 'heading', name: 'Highlight 1 Number', x: 724, y: 870, width: 172, height: 52, content: '12+', fontSize: 46, fontWeight: 700, fontFamily: 'Playfair Display', textColor: L.fgInverse, opacity: 100 },
  { id: 'bo-about-box-1-label', type: 'paragraph', name: 'Highlight 1 Label', x: 724, y: 930, width: 172, height: 40, content: 'Years of holistic wellness practice', fontSize: 13, fontFamily: 'Source Sans 3', textColor: 'rgba(249,248,244,0.80)', lineHeight: 1.5, opacity: 100 },
  { id: 'bo-about-box-2', type: 'container', name: 'About Highlight 2', x: 940, y: 840, width: 220, height: 160, fill: L.terracotta, borderColor: 'transparent', radius: 20, opacity: 100 },
  { id: 'bo-about-box-2-num', type: 'heading', name: 'Highlight 2 Number', x: 964, y: 870, width: 172, height: 52, content: '98%', fontSize: 46, fontWeight: 700, fontFamily: 'Playfair Display', textColor: L.fgInverse, opacity: 100 },
  { id: 'bo-about-box-2-label', type: 'paragraph', name: 'Highlight 2 Label', x: 964, y: 930, width: 172, height: 40, content: 'Client satisfaction rate across all services', fontSize: 13, fontFamily: 'Source Sans 3', textColor: 'rgba(249,248,244,0.80)', lineHeight: 1.5, opacity: 100 },
  { id: 'bo-about-box-3', type: 'container', name: 'About Highlight 3', x: 700, y: 1020, width: 460, height: 140, fill: L.bgDarkAlt, borderColor: L.borderDark, radius: 20, opacity: 100 },
  { id: 'bo-about-box-3-text', type: 'paragraph', name: 'Highlight 3 Text', x: 728, y: 1052, width: 406, height: 76, content: '"Our approach is whole-person. We do not treat symptoms — we tend to roots. Every plant, every mineral, every moment of stillness is medicine."', fontSize: 15, fontFamily: 'Playfair Display', textColor: 'rgba(249,248,244,0.75)', lineHeight: 1.65, opacity: 100 },

  // ══ FEATURES / TREATMENTS ════════════════════════════════════════════════
  { id: 'bo-feat-bg', type: 'container', name: 'Features Section', x: 0, y: 1240, width: 1200, height: 620, fill: L.bg, radius: 0, opacity: 100 },
  { id: 'bo-feat-eyebrow', type: 'paragraph', name: 'Features Eyebrow', x: 100, y: 1300, width: 200, height: 22, content: 'OUR TREATMENTS', fontSize: 11, fontWeight: 600, fontFamily: 'Source Sans 3', textColor: L.terracotta, opacity: 100 },
  { id: 'bo-feat-title', type: 'heading', name: 'Features Title', x: 100, y: 1336, width: 560, height: 96, content: 'Rituals crafted\nfor every season.', fontSize: 48, fontWeight: 700, fontFamily: 'Playfair Display', textColor: L.fg, lineHeight: 1.15, opacity: 100 },
  { id: 'bo-feat-sub', type: 'paragraph', name: 'Features Sub', x: 100, y: 1446, width: 440, height: 52, content: 'Each treatment is a carefully curated ritual, combining botanical extracts, therapeutic touch, and mindful intention.', fontSize: 16, fontFamily: 'Source Sans 3', textColor: L.fgMuted, lineHeight: 1.65, opacity: 100 },
  // Feature Card 1
  { id: 'bo-feat-card-1', type: 'container', name: 'Feature Card 1', x: 100, y: 1524, width: 300, height: 280, fill: L.cardClay, borderColor: L.border, radius: 24, opacity: 100 },
  { id: 'bo-feat-1-icon-bg', type: 'container', name: 'Feature 1 Icon Circle', x: 130, y: 1554, width: 54, height: 54, fill: L.primary, borderColor: 'transparent', radius: 9999, opacity: 100 },
  { id: 'bo-feat-1-title', type: 'heading', name: 'Feature 1 Title', x: 130, y: 1626, width: 240, height: 40, content: 'Forest Bathing\nRitual', fontSize: 22, fontWeight: 700, fontFamily: 'Playfair Display', textColor: L.fg, lineHeight: 1.2, opacity: 100 },
  { id: 'bo-feat-1-copy', type: 'paragraph', name: 'Feature 1 Copy', x: 130, y: 1680, width: 240, height: 72, content: 'Immerse yourself in the therapeutic scents of cedar, pine, and eucalyptus. Stress dissolves, clarity returns.', fontSize: 13, fontFamily: 'Source Sans 3', textColor: L.fgMuted, lineHeight: 1.65, opacity: 100 },
  { id: 'bo-feat-1-duration', type: 'label', name: 'Feature 1 Duration', x: 130, y: 1764, width: 90, height: 24, content: '90 minutes', fontSize: 11, fontWeight: 600, fontFamily: 'Source Sans 3', textColor: L.primary, fill: L.sage10, radius: 9999, opacity: 100 },
  // Feature Card 2
  { id: 'bo-feat-card-2', type: 'container', name: 'Feature Card 2', x: 420, y: 1524, width: 300, height: 280, fill: L.card, borderColor: L.border, radius: 24, opacity: 100 },
  { id: 'bo-feat-2-icon-bg', type: 'container', name: 'Feature 2 Icon Circle', x: 450, y: 1554, width: 54, height: 54, fill: L.terracotta, borderColor: 'transparent', radius: 9999, opacity: 100 },
  { id: 'bo-feat-2-title', type: 'heading', name: 'Feature 2 Title', x: 450, y: 1626, width: 240, height: 40, content: 'Clay & Herb\nBody Wrap', fontSize: 22, fontWeight: 700, fontFamily: 'Playfair Display', textColor: L.fg, lineHeight: 1.2, opacity: 100 },
  { id: 'bo-feat-2-copy', type: 'paragraph', name: 'Feature 2 Copy', x: 450, y: 1680, width: 240, height: 72, content: 'Rich volcanic clay blended with wild rosemary and calendula. Detoxifies, nourishes, and deeply revives the skin.', fontSize: 13, fontFamily: 'Source Sans 3', textColor: L.fgMuted, lineHeight: 1.65, opacity: 100 },
  { id: 'bo-feat-2-duration', type: 'label', name: 'Feature 2 Duration', x: 450, y: 1764, width: 90, height: 24, content: '75 minutes', fontSize: 11, fontWeight: 600, fontFamily: 'Source Sans 3', textColor: L.terracotta, fill: L.terra10, radius: 9999, opacity: 100 },
  // Feature Card 3
  { id: 'bo-feat-card-3', type: 'container', name: 'Feature Card 3', x: 740, y: 1524, width: 300, height: 280, fill: L.cardSage, borderColor: L.border, radius: 24, opacity: 100 },
  { id: 'bo-feat-3-icon-bg', type: 'container', name: 'Feature 3 Icon Circle', x: 770, y: 1554, width: 54, height: 54, fill: L.fg, borderColor: 'transparent', radius: 9999, opacity: 100 },
  { id: 'bo-feat-3-title', type: 'heading', name: 'Feature 3 Title', x: 770, y: 1626, width: 240, height: 40, content: 'Sound Bath\nMeditation', fontSize: 22, fontWeight: 700, fontFamily: 'Playfair Display', textColor: L.fg, lineHeight: 1.2, opacity: 100 },
  { id: 'bo-feat-3-copy', type: 'paragraph', name: 'Feature 3 Copy', x: 770, y: 1680, width: 240, height: 72, content: 'Himalayan singing bowls and binaural frequencies guide you into deep restorative stillness and nervous system reset.', fontSize: 13, fontFamily: 'Source Sans 3', textColor: L.fgMuted, lineHeight: 1.65, opacity: 100 },
  { id: 'bo-feat-3-duration', type: 'label', name: 'Feature 3 Duration', x: 770, y: 1764, width: 90, height: 24, content: '60 minutes', fontSize: 11, fontWeight: 600, fontFamily: 'Source Sans 3', textColor: L.fg, fill: L.forest10, radius: 9999, opacity: 100 },

  // ══ STATS SECTION (clay bg) ════════════════════════════════════════════════
  { id: 'bo-stats-bg', type: 'container', name: 'Stats Section', x: 0, y: 1860, width: 1200, height: 260, fill: L.bgAlt, radius: 0, opacity: 100 },
  { id: 'bo-stat-1', type: 'heading', name: 'Stat 1', x: 100, y: 1920, width: 220, height: 56, content: '4,200+', fontSize: 44, fontWeight: 700, fontFamily: 'Playfair Display', textColor: L.primary, opacity: 100 },
  { id: 'bo-stat-1-label', type: 'paragraph', name: 'Stat 1 Label', x: 100, y: 980, width: 220, height: 40, content: 'guests welcomed\neach year', fontSize: 14, fontFamily: 'Source Sans 3', textColor: L.fgMuted, lineHeight: 1.55, opacity: 100 },
  { id: 'bo-stat-2', type: 'heading', name: 'Stat 2', x: 380, y: 1920, width: 220, height: 56, content: '60+', fontSize: 44, fontWeight: 700, fontFamily: 'Playfair Display', textColor: L.terracotta, opacity: 100 },
  { id: 'bo-stat-2-label', type: 'paragraph', name: 'Stat 2 Label', x: 380, y: 1980, width: 220, height: 40, content: 'botanical ingredients\nfrom certified farms', fontSize: 14, fontFamily: 'Source Sans 3', textColor: L.fgMuted, lineHeight: 1.55, opacity: 100 },
  { id: 'bo-stat-3', type: 'heading', name: 'Stat 3', x: 660, y: 1920, width: 220, height: 56, content: '18', fontSize: 44, fontWeight: 700, fontFamily: 'Playfair Display', textColor: L.fg, opacity: 100 },
  { id: 'bo-stat-3-label', type: 'paragraph', name: 'Stat 3 Label', x: 660, y: 1980, width: 220, height: 40, content: 'signature rituals\nacross four collections', fontSize: 14, fontFamily: 'Source Sans 3', textColor: L.fgMuted, lineHeight: 1.55, opacity: 100 },
  { id: 'bo-stat-4', type: 'heading', name: 'Stat 4', x: 940, y: 1920, width: 220, height: 56, content: '★ 4.9', fontSize: 44, fontWeight: 700, fontFamily: 'Playfair Display', textColor: L.primary, opacity: 100 },
  { id: 'bo-stat-4-label', type: 'paragraph', name: 'Stat 4 Label', x: 940, y: 1980, width: 220, height: 40, content: 'average guest\nsatisfaction score', fontSize: 14, fontFamily: 'Source Sans 3', textColor: L.fgMuted, lineHeight: 1.55, opacity: 100 },

  // ══ TESTIMONIALS ══════════════════════════════════════════════════════════
  { id: 'bo-testi-bg', type: 'container', name: 'Testimonials Section', x: 0, y: 2120, width: 1200, height: 540, fill: L.bg, radius: 0, opacity: 100 },
  { id: 'bo-testi-eyebrow', type: 'paragraph', name: 'Testimonials Eyebrow', x: 100, y: 2178, width: 200, height: 22, content: 'GUEST VOICES', fontSize: 11, fontWeight: 600, fontFamily: 'Source Sans 3', textColor: L.primary, opacity: 100 },
  { id: 'bo-testi-title', type: 'heading', name: 'Testimonials Title', x: 100, y: 2214, width: 560, height: 80, content: 'Words from those who\nhave returned to nature.', fontSize: 42, fontWeight: 700, fontFamily: 'Playfair Display', textColor: L.fg, lineHeight: 1.2, opacity: 100 },
  // Testimonial 1
  { id: 'bo-testi-card-1', type: 'container', name: 'Testimonial Card 1', x: 100, y: 2330, width: 320, height: 280, fill: L.cardClay, borderColor: L.border, radius: 24, opacity: 100 },
  { id: 'bo-testi-1-mark', type: 'heading', name: 'Testi 1 Quote Mark', x: 130, y: 2355, width: 30, height: 40, content: '"', fontSize: 44, fontWeight: 700, fontFamily: 'Playfair Display', textColor: L.primary, opacity: 100 },
  { id: 'bo-testi-1-text', type: 'paragraph', name: 'Testi 1 Text', x: 130, y: 2396, width: 260, height: 112, content: 'I have visited many wellness retreats, but Verdana is something else entirely. The Forest Bathing ritual left me feeling renewed in a way I haven\'t experienced in years.', fontSize: 14, fontFamily: 'Source Sans 3', textColor: L.fg, lineHeight: 1.7, opacity: 100 },
  { id: 'bo-testi-1-name', type: 'heading', name: 'Testi 1 Name', x: 130, y: 2528, width: 260, height: 28, content: 'Amelia Thornton', fontSize: 16, fontWeight: 700, fontFamily: 'Playfair Display', textColor: L.fg, opacity: 100 },
  { id: 'bo-testi-1-role', type: 'paragraph', name: 'Testi 1 Role', x: 130, y: 2558, width: 260, height: 20, content: 'Wellness Coach, London', fontSize: 12, fontFamily: 'Source Sans 3', textColor: L.fgMuted, opacity: 100 },
  // Testimonial 2 (terracotta bg — visual pop)
  { id: 'bo-testi-card-2', type: 'container', name: 'Testimonial Card 2', x: 440, y: 2330, width: 320, height: 280, fill: L.terracotta, borderColor: 'transparent', radius: 24, opacity: 100 },
  { id: 'bo-testi-2-mark', type: 'heading', name: 'Testi 2 Quote Mark', x: 470, y: 2355, width: 30, height: 40, content: '"', fontSize: 44, fontWeight: 700, fontFamily: 'Playfair Display', textColor: 'rgba(249,248,244,0.60)', opacity: 100 },
  { id: 'bo-testi-2-text', type: 'paragraph', name: 'Testi 2 Text', x: 470, y: 2396, width: 260, height: 112, content: 'The Sound Bath was transformative. I arrived with a tension headache and left in a state of profound peace. The practitioners here truly understand the body\'s innate wisdom.', fontSize: 14, fontFamily: 'Source Sans 3', textColor: 'rgba(249,248,244,0.90)', lineHeight: 1.7, opacity: 100 },
  { id: 'bo-testi-2-name', type: 'heading', name: 'Testi 2 Name', x: 470, y: 2528, width: 260, height: 28, content: 'Marcus Okafor', fontSize: 16, fontWeight: 700, fontFamily: 'Playfair Display', textColor: L.fgInverse, opacity: 100 },
  { id: 'bo-testi-2-role', type: 'paragraph', name: 'Testi 2 Role', x: 470, y: 2558, width: 260, height: 20, content: 'Founder, The Still Collective', fontSize: 12, fontFamily: 'Source Sans 3', textColor: 'rgba(249,248,244,0.65)', opacity: 100 },
  // Testimonial 3
  { id: 'bo-testi-card-3', type: 'container', name: 'Testimonial Card 3', x: 780, y: 2330, width: 320, height: 280, fill: L.card, borderColor: L.border, radius: 24, opacity: 100 },
  { id: 'bo-testi-3-mark', type: 'heading', name: 'Testi 3 Quote Mark', x: 810, y: 2355, width: 30, height: 40, content: '"', fontSize: 44, fontWeight: 700, fontFamily: 'Playfair Display', textColor: L.terracotta, opacity: 100 },
  { id: 'bo-testi-3-text', type: 'paragraph', name: 'Testi 3 Text', x: 810, y: 2396, width: 260, height: 112, content: 'Every ingredient, every detail is considered with such care. The Clay & Herb Body Wrap became my monthly ritual — my skin has never felt better, and neither have I.', fontSize: 14, fontFamily: 'Source Sans 3', textColor: L.fg, lineHeight: 1.7, opacity: 100 },
  { id: 'bo-testi-3-name', type: 'heading', name: 'Testi 3 Name', x: 810, y: 2528, width: 260, height: 28, content: 'Sophie Leclair', fontSize: 16, fontWeight: 700, fontFamily: 'Playfair Display', textColor: L.fg, opacity: 100 },
  { id: 'bo-testi-3-role', type: 'paragraph', name: 'Testi 3 Role', x: 810, y: 2558, width: 260, height: 20, content: 'Interior Designer, Paris', fontSize: 12, fontFamily: 'Source Sans 3', textColor: L.fgMuted, opacity: 100 },

  // ══ PRICING SECTION (bgAlt) ════════════════════════════════════════════════
  { id: 'bo-pricing-bg', type: 'container', name: 'Pricing Section', x: 0, y: 2660, width: 1200, height: 620, fill: L.bgAlt, radius: 0, opacity: 100 },
  { id: 'bo-pricing-eyebrow', type: 'paragraph', name: 'Pricing Eyebrow', x: 100, y: 2718, width: 200, height: 22, content: 'MEMBERSHIPS', fontSize: 11, fontWeight: 600, fontFamily: 'Source Sans 3', textColor: L.primary, opacity: 100 },
  { id: 'bo-pricing-title', type: 'heading', name: 'Pricing Title', x: 100, y: 2754, width: 560, height: 80, content: 'Tend to yourself,\nevery season.', fontSize: 46, fontWeight: 700, fontFamily: 'Playfair Display', textColor: L.fg, lineHeight: 1.15, opacity: 100 },
  { id: 'bo-pricing-sub', type: 'paragraph', name: 'Pricing Sub', x: 100, y: 2848, width: 460, height: 44, content: 'Flexible memberships that grow with your wellness practice. Pause or cancel with ease.', fontSize: 15, fontFamily: 'Source Sans 3', textColor: L.fgMuted, lineHeight: 1.65, opacity: 100 },
  // Seed plan
  { id: 'bo-plan-card-1', type: 'container', name: 'Seed Plan Card', x: 100, y: 2916, width: 300, height: 300, fill: L.card, borderColor: L.border, radius: 24, opacity: 100 },
  { id: 'bo-plan-1-name', type: 'heading', name: 'Seed Plan Name', x: 132, y: 2950, width: 240, height: 34, content: 'Seed', fontSize: 26, fontWeight: 700, fontFamily: 'Playfair Display', textColor: L.fg, opacity: 100 },
  { id: 'bo-plan-1-price', type: 'heading', name: 'Seed Plan Price', x: 132, y: 2996, width: 240, height: 56, content: '€89', fontSize: 48, fontWeight: 700, fontFamily: 'Playfair Display', textColor: L.primary, opacity: 100 },
  { id: 'bo-plan-1-period', type: 'paragraph', name: 'Seed Period', x: 132, y: 3056, width: 240, height: 20, content: 'per month', fontSize: 13, fontFamily: 'Source Sans 3', textColor: L.fgMuted, opacity: 100 },
  { id: 'bo-plan-1-features', type: 'paragraph', name: 'Seed Features', x: 132, y: 3088, width: 240, height: 78, content: '2 treatments / month\nAccess to wellness library\nMember events\nPlant care kits', fontSize: 13, fontFamily: 'Source Sans 3', textColor: L.fgMuted, lineHeight: 1.75, opacity: 100 },
  { id: 'bo-plan-1-btn', type: 'button', name: 'Seed Button', x: 132, y: 3176, width: 220, height: 44, content: 'Begin Your Journey', fill: 'transparent', textColor: L.fg, fontSize: 13, fontWeight: 600, fontFamily: 'Source Sans 3', borderColor: L.fg, radius: 9999, opacity: 100 },
  // Bloom plan (featured)
  { id: 'bo-plan-card-2', type: 'container', name: 'Bloom Plan Card', x: 450, y: 2896, width: 300, height: 340, fill: L.fg, borderColor: 'transparent', radius: 24, opacity: 100 },
  { id: 'bo-plan-2-badge', type: 'label', name: 'Bloom Badge', x: 490, y: 2920, width: 120, height: 24, content: 'MOST LOVED', fontSize: 10, fontWeight: 600, fontFamily: 'Source Sans 3', textColor: L.fg, fill: L.bgAlt, radius: 9999, opacity: 100 },
  { id: 'bo-plan-2-name', type: 'heading', name: 'Bloom Plan Name', x: 482, y: 2956, width: 240, height: 34, content: 'Bloom', fontSize: 26, fontWeight: 700, fontFamily: 'Playfair Display', textColor: L.fgInverse, opacity: 100 },
  { id: 'bo-plan-2-price', type: 'heading', name: 'Bloom Plan Price', x: 482, y: 3002, width: 240, height: 56, content: '€189', fontSize: 48, fontWeight: 700, fontFamily: 'Playfair Display', textColor: L.primary, opacity: 100 },
  { id: 'bo-plan-2-period', type: 'paragraph', name: 'Bloom Period', x: 482, y: 3062, width: 240, height: 20, content: 'per month', fontSize: 13, fontFamily: 'Source Sans 3', textColor: 'rgba(249,248,244,0.55)', opacity: 100 },
  { id: 'bo-plan-2-features', type: 'paragraph', name: 'Bloom Features', x: 482, y: 3094, width: 240, height: 96, content: 'Unlimited treatments\nPrivate garden suite access\nMonthly botanical box\nPersonal wellness curator\nPriority bookings', fontSize: 13, fontFamily: 'Source Sans 3', textColor: 'rgba(249,248,244,0.75)', lineHeight: 1.75, opacity: 100 },
  { id: 'bo-plan-2-btn', type: 'button', name: 'Bloom Button', x: 482, y: 3196, width: 220, height: 44, content: 'Begin Your Journey', fill: L.primary, textColor: L.fgInverse, fontSize: 13, fontWeight: 600, fontFamily: 'Source Sans 3', borderColor: 'transparent', radius: 9999, opacity: 100 },
  // Forest plan
  { id: 'bo-plan-card-3', type: 'container', name: 'Forest Plan Card', x: 800, y: 2916, width: 300, height: 300, fill: L.card, borderColor: L.border, radius: 24, opacity: 100 },
  { id: 'bo-plan-3-name', type: 'heading', name: 'Forest Plan Name', x: 832, y: 2950, width: 240, height: 34, content: 'Forest', fontSize: 26, fontWeight: 700, fontFamily: 'Playfair Display', textColor: L.fg, opacity: 100 },
  { id: 'bo-plan-3-price', type: 'heading', name: 'Forest Plan Price', x: 832, y: 2996, width: 240, height: 56, content: 'Bespoke', fontSize: 36, fontWeight: 700, fontFamily: 'Playfair Display', textColor: L.terracotta, opacity: 100 },
  { id: 'bo-plan-3-period', type: 'paragraph', name: 'Forest Period', x: 832, y: 3056, width: 240, height: 20, content: 'fully tailored to you', fontSize: 13, fontFamily: 'Source Sans 3', textColor: L.fgMuted, opacity: 100 },
  { id: 'bo-plan-3-features', type: 'paragraph', name: 'Forest Features', x: 832, y: 3088, width: 240, height: 78, content: 'Everything in Bloom\nCorporate & group retreats\nIn-home wellness visits\nNamed ingredient sourcing', fontSize: 13, fontFamily: 'Source Sans 3', textColor: L.fgMuted, lineHeight: 1.75, opacity: 100 },
  { id: 'bo-plan-3-btn', type: 'button', name: 'Forest Button', x: 832, y: 3176, width: 220, height: 44, content: 'Enquire Now', fill: 'transparent', textColor: L.terracotta, fontSize: 13, fontWeight: 600, fontFamily: 'Source Sans 3', borderColor: L.terracotta, radius: 9999, opacity: 100 },

  // ══ CTA SECTION (deep forest) ══════════════════════════════════════════════
  { id: 'bo-cta-bg', type: 'container', name: 'CTA Section', x: 0, y: 3280, width: 1200, height: 400, fill: L.bgDark, radius: 0, opacity: 100 },
  { id: 'bo-cta-deco-1', type: 'container', name: 'CTA Deco 1', x: 960, y: 3310, width: 260, height: 260, fill: L.white08, radius: 9999, opacity: 100 },
  { id: 'bo-cta-deco-2', type: 'container', name: 'CTA Deco 2', x: 30, y: 3520, width: 120, height: 120, fill: L.white08, radius: 9999, opacity: 100 },
  { id: 'bo-cta-eyebrow', type: 'paragraph', name: 'CTA Eyebrow', x: 100, y: 3354, width: 200, height: 22, content: 'FIND YOUR STILLNESS', fontSize: 11, fontWeight: 600, fontFamily: 'Source Sans 3', textColor: L.primary, opacity: 100 },
  { id: 'bo-cta-title', type: 'heading', name: 'CTA Title', x: 100, y: 3390, width: 720, height: 120, content: 'Your most nourished\nself is waiting.', fontSize: 54, fontWeight: 700, fontFamily: 'Playfair Display', textColor: L.fgInverse, lineHeight: 1.1, opacity: 100 },
  { id: 'bo-cta-sub', type: 'paragraph', name: 'CTA Sub', x: 100, y: 3526, width: 480, height: 44, content: 'Reserve your first botanical ritual today. New guests enjoy a complimentary welcome consultation.', fontSize: 16, fontFamily: 'Source Sans 3', textColor: 'rgba(249,248,244,0.60)', lineHeight: 1.65, opacity: 100 },
  { id: 'bo-cta-btn-primary', type: 'button', name: 'CTA Primary', x: 100, y: 3600, width: 190, height: 52, content: 'Book Your Ritual', fill: L.primary, textColor: L.fgInverse, fontSize: 14, fontWeight: 600, fontFamily: 'Source Sans 3', radius: 9999, opacity: 100 },
  { id: 'bo-cta-btn-secondary', type: 'button', name: 'CTA Secondary', x: 306, y: 3600, width: 160, height: 52, content: 'View Treatments', fill: 'transparent', textColor: L.fgInverse, fontSize: 14, fontWeight: 600, fontFamily: 'Source Sans 3', borderColor: 'rgba(249,248,244,0.30)', radius: 9999, opacity: 100 },

  // ══ FOOTER ══════════════════════════════════════════════════════════════════
  { id: 'bo-footer-bg', type: 'container', name: 'Footer Section', x: 0, y: 3680, width: 1200, height: 300, fill: L.bgAlt, borderColor: L.border, radius: 0, opacity: 100 },
  { id: 'bo-footer-leaf', type: 'container', name: 'Footer Logo Leaf', x: 100, y: 3730, width: 36, height: 36, fill: L.primary, borderColor: 'transparent', radius: 9999, opacity: 100 },
  { id: 'bo-footer-logo', type: 'heading', name: 'Footer Logo', x: 148, y: 3733, width: 180, height: 34, content: 'Verdana', fontSize: 22, fontWeight: 700, fontFamily: 'Playfair Display', textColor: L.fg, opacity: 100 },
  { id: 'bo-footer-tagline', type: 'paragraph', name: 'Footer Tagline', x: 100, y: 3778, width: 320, height: 44, content: 'A sanctuary of botanical wellness.\nAmsterdam · London · Porto', fontSize: 14, fontFamily: 'Source Sans 3', textColor: L.fgMuted, lineHeight: 1.65, opacity: 100 },
  { id: 'bo-footer-col-1', type: 'paragraph', name: 'Footer Col 1', x: 560, y: 3730, width: 150, height: 110, content: 'Wellness\n\nTreatments\nMemberships\nRetreats\nGift Cards', fontSize: 13, fontFamily: 'Source Sans 3', textColor: L.fgMuted, lineHeight: 2.0, opacity: 100 },
  { id: 'bo-footer-col-2', type: 'paragraph', name: 'Footer Col 2', x: 740, y: 3730, width: 150, height: 110, content: 'Studio\n\nAbout Us\nOur Plants\nJournal\nPress', fontSize: 13, fontFamily: 'Source Sans 3', textColor: L.fgMuted, lineHeight: 2.0, opacity: 100 },
  { id: 'bo-footer-col-3', type: 'paragraph', name: 'Footer Col 3', x: 920, y: 3730, width: 180, height: 110, content: 'Connect\n\nInstagram\nNewsletter\nCommunity\nContact', fontSize: 13, fontFamily: 'Source Sans 3', textColor: L.fgMuted, lineHeight: 2.0, opacity: 100 },
  { id: 'bo-footer-divider', type: 'container', name: 'Footer Divider', x: 100, y: 3858, width: 1000, height: 1, fill: L.border, radius: 0, opacity: 100 },
  { id: 'bo-footer-copy', type: 'paragraph', name: 'Footer Copyright', x: 100, y: 3876, width: 500, height: 22, content: '© 2026 Verdana Wellness. Crafted with care and botanical intention.', fontSize: 12, fontFamily: 'Source Sans 3', textColor: L.fgLight, opacity: 100 },
  { id: 'bo-footer-legal', type: 'paragraph', name: 'Footer Legal', x: 760, y: 3876, width: 340, height: 22, content: 'Privacy     Terms     Sustainability', fontSize: 12, fontFamily: 'Source Sans 3', textColor: L.fgLight, textAlign: 'right', opacity: 100 },
]

// ─── Dark Mode Mapping ────────────────────────────────────────────────────────

const DARK_OVERRIDES = {
  [L.bg]:             D.bg,
  [L.bgAlt]:          D.bgAlt,
  [L.bgDark]:         D.bgDark,
  [L.bgDarkAlt]:      D.bgDarkAlt,
  [L.card]:           D.card,
  [L.cardClay]:       D.cardClay,
  [L.cardSage]:       D.cardSage,
  [L.fg]:             D.fg,
  [L.fgMuted]:        D.fgMuted,
  [L.fgLight]:        D.fgLight,
  [L.fgInverse]:      D.fgInverse,
  [L.primary]:        D.primary,
  [L.primaryDark]:    D.primaryDark,
  [L.terracotta]:     D.terracotta,
  [L.terracottaDk]:   D.terracottaDk,
  [L.border]:         D.border,
  [L.borderDark]:     D.borderDark,
  [L.sage10]:         D.sage10,
  [L.terra10]:        D.terra10,
  [L.forest10]:       D.forest10,
  [L.white15]:        D.white15,
  [L.white25]:        D.white25,
  [L.white08]:        D.white08,
  // Per-element overrides
  'rgba(249,248,244,0.60)':  'rgba(232,228,220,0.50)',
  'rgba(249,248,244,0.65)':  'rgba(232,228,220,0.55)',
  'rgba(249,248,244,0.55)':  'rgba(232,228,220,0.45)',
  'rgba(249,248,244,0.75)':  'rgba(232,228,220,0.68)',
  'rgba(249,248,244,0.80)':  'rgba(232,228,220,0.72)',
  'rgba(249,248,244,0.90)':  'rgba(232,228,220,0.85)',
  'rgba(249,248,244,0.30)':  'rgba(232,228,220,0.22)',
  'rgba(249,248,244,0.45)':  'rgba(232,228,220,0.35)',
  'rgba(255,255,255,0.08)':  'rgba(255,255,255,0.05)',
  'transparent':              'transparent',
}

function toDarkTheme(element) {
  const next = { ...element }
  ;['fill', 'textColor', 'borderColor', 'shadowColor'].forEach(key => {
    if (next[key] !== undefined && DARK_OVERRIDES[next[key]] !== undefined) {
      next[key] = DARK_OVERRIDES[next[key]]
    }
  })
  return next
}

// ─── Responsive elements (light = default) ───────────────────────────────────

export const botanicalOrganicElements = withResponsive(botanicalOrganicBaseElements)

// ─── Per-ID theme lookup tables ───────────────────────────────────────────────

const botanicalOrganicThemeById = {
  light: Object.fromEntries(botanicalOrganicBaseElements.map(el => [el.id, el])),
  dark:  Object.fromEntries(botanicalOrganicBaseElements.map(toDarkTheme).map(el => [el.id, el])),
}

// ─── Exported helpers — mirror BoldSummit / ArtDeco API surface ──────────────

/**
 * Returns true when the canvas contains BotanicalOrganic elements.
 * Identification: every element ID starts with "bo-".
 */
export function isBotanicalOrganicTemplate(elements = []) {
  return elements.some(el => String(el.id ?? '').startsWith('bo-'))
}

/**
 * Applies light or dark colour tokens to every matching element.
 * Unknown IDs are passed through untouched.
 */
export function applyBotanicalOrganicTheme(elements = [], theme = 'light') {
  const palette = botanicalOrganicThemeById[theme] ?? botanicalOrganicThemeById.light
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
export function getBotanicalOrganicCanvasFill(theme = 'light') {
  return theme === 'dark' ? D.bg : L.bg
}