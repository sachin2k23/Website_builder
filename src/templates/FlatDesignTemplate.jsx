
import { applySmartResponsive } from '../utils/responsive'

const withResponsive = (elements, width = 1200) =>
  applySmartResponsive(elements, width)

// ─── Design Token Constants ───────────────────────────────────────────────────

// Light palette (default)
const L = {
  bg:          '#FFFFFF',
  bgMuted:     '#F3F4F6',
  bgDark:      '#111827',
  bgDarkAlt:   '#1F2937',
  card:        '#FFFFFF',
  cardMuted:   '#F3F4F6',
  cardBlue:    '#EFF6FF',
  cardGreen:   '#ECFDF5',
  cardAmber:   '#FFFBEB',
  fg:          '#111827',
  fgMuted:     '#6B7280',
  fgInverse:   '#FFFFFF',
  primary:     '#3B82F6',
  primaryDark: '#2563EB',
  secondary:   '#10B981',
  secondaryDk: '#059669',
  accent:      '#F59E0B',
  accentDark:  '#D97706',
  border:      '#E5E7EB',
  blue10:      'rgba(59,130,246,0.10)',
  green10:     'rgba(16,185,129,0.10)',
  amber10:     'rgba(245,158,11,0.12)',
  white10:     'rgba(255,255,255,0.08)',
  white20:     'rgba(255,255,255,0.15)',
}

// Dark palette overrides
const D = {
  bg:          '#0F172A',
  bgMuted:     '#1E293B',
  bgDark:      '#020617',
  bgDarkAlt:   '#0F172A',
  card:        '#1E293B',
  cardMuted:   '#1E293B',
  cardBlue:    '#1E3A5F',
  cardGreen:   '#064E3B',
  cardAmber:   '#451A03',
  fg:          '#F1F5F9',
  fgMuted:     '#94A3B8',
  fgInverse:   '#F1F5F9',
  primary:     '#60A5FA',
  primaryDark: '#3B82F6',
  secondary:   '#34D399',
  secondaryDk: '#10B981',
  accent:      '#FCD34D',
  accentDark:  '#F59E0B',
  border:      '#334155',
  blue10:      'rgba(96,165,250,0.15)',
  green10:     'rgba(52,211,153,0.12)',
  amber10:     'rgba(252,211,77,0.12)',
  white10:     'rgba(255,255,255,0.06)',
  white20:     'rgba(255,255,255,0.12)',
}

// ─── Base Elements (Light Mode) ───────────────────────────────────────────────

const flatDesignBaseElements = [

  // ══ NAVIGATION ══════════════════════════════════════════════════════════════
  { id: 'fd-nav-bg', type: 'container', name: 'Navigation Bar', x: 0, y: 0, width: 1200, height: 72, fill: L.bg, borderColor: L.border, radius: 0, opacity: 100 },
  { id: 'fd-nav-logo-block', type: 'container', name: 'Logo Block', x: 48, y: 18, width: 36, height: 36, fill: L.primary, radius: 8, opacity: 100 },
  { id: 'fd-nav-logo', type: 'heading', name: 'Logo Text', x: 94, y: 20, width: 160, height: 32, content: 'LaunchPad', fontSize: 20, fontWeight: 800, fontFamily: 'Outfit', textColor: L.fg, opacity: 100 },
  { id: 'fd-nav-links', type: 'paragraph', name: 'Nav Links', x: 380, y: 25, width: 420, height: 22, content: 'Features     Pricing     How It Works     Blog', fontSize: 14, fontWeight: 500, fontFamily: 'Outfit', textColor: L.fgMuted, textAlign: 'center', opacity: 100 },
  { id: 'fd-nav-signin', type: 'button', name: 'Nav Sign In', x: 980, y: 16, width: 90, height: 40, content: 'Sign In', fill: 'transparent', textColor: L.fg, fontSize: 14, fontWeight: 600, fontFamily: 'Outfit', borderColor: L.border, radius: 6, opacity: 100 },
  { id: 'fd-nav-cta', type: 'button', name: 'Nav CTA', x: 1082, y: 16, width: 70, height: 40, content: 'Start Free', fill: L.primary, textColor: L.fgInverse, fontSize: 14, fontWeight: 600, fontFamily: 'Outfit', radius: 6, opacity: 100 },

  // ══ HERO SECTION (Blue bg) ════════════════════════════════════════════════
  { id: 'fd-hero-bg', type: 'container', name: 'Hero Section', x: 0, y: 72, width: 1200, height: 580, fill: L.primary, radius: 0, opacity: 100 },
  // Geometric background decorations (flat, no depth)
  { id: 'fd-hero-deco-circle-lg', type: 'container', name: 'Hero Deco Circle Large', x: 860, y: 40, width: 340, height: 340, fill: L.white10, radius: 9999, opacity: 100 },
  { id: 'fd-hero-deco-circle-sm', type: 'container', name: 'Hero Deco Circle Small', x: 980, y: 300, width: 160, height: 160, fill: L.white20, radius: 9999, opacity: 100 },
  { id: 'fd-hero-deco-square', type: 'container', name: 'Hero Deco Square', x: 720, y: 420, width: 80, height: 80, fill: L.white10, radius: 8, opacity: 100 },
  // Hero content
  { id: 'fd-hero-badge', type: 'label', name: 'Hero Badge', x: 76, y: 140, width: 180, height: 28, content: '🚀 NOW IN PUBLIC BETA', fontSize: 11, fontWeight: 700, fontFamily: 'Outfit', textColor: L.primary, fill: L.bg, radius: 6, opacity: 100 },
  { id: 'fd-hero-title', type: 'heading', name: 'Hero Title', x: 72, y: 186, width: 680, height: 200, content: 'Ship faster.\nScale smarter.\nGrow without limits.', fontSize: 62, fontWeight: 800, fontFamily: 'Outfit', textColor: L.fgInverse, lineHeight: 1.08, opacity: 100 },
  { id: 'fd-hero-desc', type: 'paragraph', name: 'Hero Description', x: 76, y: 406, width: 500, height: 68, content: 'The all-in-one platform that takes your product from idea to production. Powerful tools, zero friction, unlimited scale.', fontSize: 18, fontWeight: 400, fontFamily: 'Outfit', textColor: 'rgba(255,255,255,0.80)', lineHeight: 1.6, opacity: 100 },
  { id: 'fd-hero-cta-primary', type: 'button', name: 'Hero Primary CTA', x: 76, y: 498, width: 190, height: 56, content: 'Start for Free', fill: L.bg, textColor: L.primary, fontSize: 16, fontWeight: 700, fontFamily: 'Outfit', radius: 6, opacity: 100 },
  { id: 'fd-hero-cta-secondary', type: 'button', name: 'Hero Secondary CTA', x: 282, y: 498, width: 160, height: 56, content: 'Watch Demo', fill: 'transparent', textColor: L.fgInverse, fontSize: 16, fontWeight: 600, fontFamily: 'Outfit', borderColor: 'rgba(255,255,255,0.50)', radius: 6, opacity: 100 },
  // Hero visual panel (right)
  { id: 'fd-hero-panel', type: 'container', name: 'Hero Visual Panel', x: 720, y: 100, width: 400, height: 360, fill: L.bg, radius: 8, opacity: 100 },
  { id: 'fd-hero-panel-topbar', type: 'container', name: 'Panel Top Bar', x: 720, y: 100, width: 400, height: 36, fill: L.bgMuted, radius: 0, opacity: 100 },
  { id: 'fd-hero-panel-dot-r', type: 'container', name: 'Panel Dot Red', x: 742, y: 112, width: 12, height: 12, fill: '#EF4444', radius: 9999, opacity: 100 },
  { id: 'fd-hero-panel-dot-y', type: 'container', name: 'Panel Dot Yellow', x: 762, y: 112, width: 12, height: 12, fill: L.accent, radius: 9999, opacity: 100 },
  { id: 'fd-hero-panel-dot-g', type: 'container', name: 'Panel Dot Green', x: 782, y: 112, width: 12, height: 12, fill: L.secondary, radius: 9999, opacity: 100 },
  { id: 'fd-hero-panel-metric-1', type: 'heading', name: 'Panel Metric 1', x: 744, y: 158, width: 160, height: 52, content: '98.9%', fontSize: 42, fontWeight: 800, fontFamily: 'Outfit', textColor: L.primary, opacity: 100 },
  { id: 'fd-hero-panel-label-1', type: 'paragraph', name: 'Panel Label 1', x: 744, y: 214, width: 160, height: 22, content: 'Uptime guarantee', fontSize: 13, fontFamily: 'Outfit', textColor: L.fgMuted, opacity: 100 },
  { id: 'fd-hero-panel-metric-2', type: 'heading', name: 'Panel Metric 2', x: 744, y: 258, width: 160, height: 52, content: '< 80ms', fontSize: 34, fontWeight: 800, fontFamily: 'Outfit', textColor: L.secondary, opacity: 100 },
  { id: 'fd-hero-panel-label-2', type: 'paragraph', name: 'Panel Label 2', x: 744, y: 314, width: 160, height: 22, content: 'Global response time', fontSize: 13, fontFamily: 'Outfit', textColor: L.fgMuted, opacity: 100 },
  { id: 'fd-hero-panel-metric-3', type: 'heading', name: 'Panel Metric 3', x: 940, y: 158, width: 160, height: 52, content: '50k+', fontSize: 42, fontWeight: 800, fontFamily: 'Outfit', textColor: L.accent, opacity: 100 },
  { id: 'fd-hero-panel-label-3', type: 'paragraph', name: 'Panel Label 3', x: 940, y: 214, width: 160, height: 22, content: 'Active teams', fontSize: 13, fontFamily: 'Outfit', textColor: L.fgMuted, opacity: 100 },
  { id: 'fd-hero-panel-metric-4', type: 'heading', name: 'Panel Metric 4', x: 940, y: 258, width: 160, height: 52, content: '4.9 ★', fontSize: 34, fontWeight: 800, fontFamily: 'Outfit', textColor: '#8B5CF6', opacity: 100 },
  { id: 'fd-hero-panel-label-4', type: 'paragraph', name: 'Panel Label 4', x: 940, y: 314, width: 160, height: 22, content: 'Average rating', fontSize: 13, fontFamily: 'Outfit', textColor: L.fgMuted, opacity: 100 },
  { id: 'fd-hero-panel-bar-bg', type: 'container', name: 'Panel Progress Bg', x: 744, y: 360, width: 350, height: 12, fill: L.bgMuted, radius: 6, opacity: 100 },
  { id: 'fd-hero-panel-bar-fill', type: 'container', name: 'Panel Progress Fill', x: 744, y: 360, width: 280, height: 12, fill: L.primary, radius: 6, opacity: 100 },
  { id: 'fd-hero-panel-bar-label', type: 'paragraph', name: 'Panel Progress Label', x: 744, y: 380, width: 350, height: 18, content: 'Deployment pipeline — 80% complete', fontSize: 11, fontFamily: 'Outfit', textColor: L.fgMuted, opacity: 100 },

  // ══ STATS BAND (Gray bg) ═════════════════════════════════════════════════
  { id: 'fd-stats-bg', type: 'container', name: 'Stats Band', x: 0, y: 652, width: 1200, height: 130, fill: L.bgMuted, radius: 0, opacity: 100 },
  { id: 'fd-stat-1', type: 'heading', name: 'Stat 1', x: 100, y: 678, width: 200, height: 48, content: '50,000+', fontSize: 36, fontWeight: 800, fontFamily: 'Outfit', textColor: L.primary, opacity: 100 },
  { id: 'fd-stat-1-label', type: 'paragraph', name: 'Stat 1 Label', x: 100, y: 730, width: 200, height: 20, content: 'teams worldwide', fontSize: 13, fontFamily: 'Outfit', textColor: L.fgMuted, opacity: 100 },
  { id: 'fd-stat-2', type: 'heading', name: 'Stat 2', x: 380, y: 678, width: 200, height: 48, content: '$2.4B', fontSize: 36, fontWeight: 800, fontFamily: 'Outfit', textColor: L.secondary, opacity: 100 },
  { id: 'fd-stat-2-label', type: 'paragraph', name: 'Stat 2 Label', x: 380, y: 730, width: 200, height: 20, content: 'revenue processed', fontSize: 13, fontFamily: 'Outfit', textColor: L.fgMuted, opacity: 100 },
  { id: 'fd-stat-3', type: 'heading', name: 'Stat 3', x: 660, y: 678, width: 200, height: 48, content: '99.9%', fontSize: 36, fontWeight: 800, fontFamily: 'Outfit', textColor: L.accent, opacity: 100 },
  { id: 'fd-stat-3-label', type: 'paragraph', name: 'Stat 3 Label', x: 660, y: 730, width: 200, height: 20, content: 'uptime SLA', fontSize: 13, fontFamily: 'Outfit', textColor: L.fgMuted, opacity: 100 },
  { id: 'fd-stat-4', type: 'heading', name: 'Stat 4', x: 940, y: 678, width: 200, height: 48, content: '< 24hr', fontSize: 36, fontWeight: 800, fontFamily: 'Outfit', textColor: '#8B5CF6', opacity: 100 },
  { id: 'fd-stat-4-label', type: 'paragraph', name: 'Stat 4 Label', x: 940, y: 730, width: 200, height: 20, content: 'onboarding time', fontSize: 13, fontFamily: 'Outfit', textColor: L.fgMuted, opacity: 100 },

  // ══ FEATURES SECTION (White bg) ══════════════════════════════════════════
  { id: 'fd-features-bg', type: 'container', name: 'Features Section', x: 0, y: 782, width: 1200, height: 580, fill: L.bg, radius: 0, opacity: 100 },
  { id: 'fd-features-kicker', type: 'label', name: 'Features Kicker', x: 100, y: 844, width: 130, height: 24, content: 'FEATURES', fontSize: 11, fontWeight: 700, fontFamily: 'Outfit', textColor: L.primary, fill: L.blue10, radius: 4, opacity: 100 },
  { id: 'fd-features-title', type: 'heading', name: 'Features Heading', x: 100, y: 880, width: 560, height: 60, content: 'Everything you need to ship.', fontSize: 44, fontWeight: 800, fontFamily: 'Outfit', textColor: L.fg, lineHeight: 1.1, opacity: 100 },
  { id: 'fd-features-sub', type: 'paragraph', name: 'Features Subheading', x: 100, y: 952, width: 500, height: 44, content: 'A full suite of developer tools built for speed, scale, and reliability—without the complexity.', fontSize: 16, fontFamily: 'Outfit', textColor: L.fgMuted, lineHeight: 1.6, opacity: 100 },
  // Feature Card 1 (Blue)
  { id: 'fd-feat-card-1', type: 'container', name: 'Feature Card 1', x: 100, y: 1022, width: 300, height: 260, fill: L.cardBlue, radius: 8, opacity: 100 },
  { id: 'fd-feat-1-icon-bg', type: 'container', name: 'Feature 1 Icon Bg', x: 124, y: 1050, width: 52, height: 52, fill: L.primary, radius: 8, opacity: 100 },
  { id: 'fd-feat-1-title', type: 'heading', name: 'Feature 1 Title', x: 124, y: 1120, width: 252, height: 36, content: 'One-Click Deploy', fontSize: 22, fontWeight: 800, fontFamily: 'Outfit', textColor: L.fg, opacity: 100 },
  { id: 'fd-feat-1-copy', type: 'paragraph', name: 'Feature 1 Copy', x: 124, y: 1162, width: 252, height: 72, content: 'Push to main and watch your code go live in seconds. Automatic rollbacks, zero downtime.', fontSize: 14, fontFamily: 'Outfit', textColor: L.fgMuted, lineHeight: 1.6, opacity: 100 },
  // Feature Card 2 (Green)
  { id: 'fd-feat-card-2', type: 'container', name: 'Feature Card 2', x: 420, y: 1022, width: 300, height: 260, fill: L.cardGreen, radius: 8, opacity: 100 },
  { id: 'fd-feat-2-icon-bg', type: 'container', name: 'Feature 2 Icon Bg', x: 444, y: 1050, width: 52, height: 52, fill: L.secondary, radius: 8, opacity: 100 },
  { id: 'fd-feat-2-title', type: 'heading', name: 'Feature 2 Title', x: 444, y: 1120, width: 252, height: 36, content: 'Auto-Scaling', fontSize: 22, fontWeight: 800, fontFamily: 'Outfit', textColor: L.fg, opacity: 100 },
  { id: 'fd-feat-2-copy', type: 'paragraph', name: 'Feature 2 Copy', x: 444, y: 1162, width: 252, height: 72, content: 'Handle traffic spikes without lifting a finger. Our infrastructure scales up and down instantly.', fontSize: 14, fontFamily: 'Outfit', textColor: L.fgMuted, lineHeight: 1.6, opacity: 100 },
  // Feature Card 3 (Amber)
  { id: 'fd-feat-card-3', type: 'container', name: 'Feature Card 3', x: 740, y: 1022, width: 300, height: 260, fill: L.cardAmber, radius: 8, opacity: 100 },
  { id: 'fd-feat-3-icon-bg', type: 'container', name: 'Feature 3 Icon Bg', x: 764, y: 1050, width: 52, height: 52, fill: L.accent, radius: 8, opacity: 100 },
  { id: 'fd-feat-3-title', type: 'heading', name: 'Feature 3 Title', x: 764, y: 1120, width: 252, height: 36, content: 'Real-Time Analytics', fontSize: 22, fontWeight: 800, fontFamily: 'Outfit', textColor: L.fg, opacity: 100 },
  { id: 'fd-feat-3-copy', type: 'paragraph', name: 'Feature 3 Copy', x: 764, y: 1162, width: 252, height: 72, content: 'Deep insights into performance, user behavior, and errors—streamed live to your dashboard.', fontSize: 14, fontFamily: 'Outfit', textColor: L.fgMuted, lineHeight: 1.6, opacity: 100 },

  // ══ HOW IT WORKS (Dark bg) ════════════════════════════════════════════════
  { id: 'fd-hiw-bg', type: 'container', name: 'How It Works Section', x: 0, y: 1362, width: 1200, height: 520, fill: L.bgDark, radius: 0, opacity: 100 },
  // Decorative shapes
  { id: 'fd-hiw-deco-1', type: 'container', name: 'HIW Deco 1', x: 1040, y: 1400, width: 200, height: 200, fill: L.white10, radius: 9999, opacity: 100 },
  { id: 'fd-hiw-deco-2', type: 'container', name: 'HIW Deco 2', x: 20, y: 1700, width: 120, height: 120, fill: L.white10, radius: 8, opacity: 100 },
  { id: 'fd-hiw-kicker', type: 'label', name: 'HIW Kicker', x: 100, y: 1424, width: 160, height: 24, content: 'HOW IT WORKS', fontSize: 11, fontWeight: 700, fontFamily: 'Outfit', textColor: L.accent, fill: L.amber10, radius: 4, opacity: 100 },
  { id: 'fd-hiw-title', type: 'heading', name: 'HIW Heading', x: 100, y: 1462, width: 580, height: 58, content: 'From zero to production in three steps.', fontSize: 42, fontWeight: 800, fontFamily: 'Outfit', textColor: L.fgInverse, lineHeight: 1.1, opacity: 100 },
  // Step 1
  { id: 'fd-hiw-step-1-num', type: 'heading', name: 'Step 1 Number', x: 100, y: 1564, width: 60, height: 64, content: '01', fontSize: 52, fontWeight: 800, fontFamily: 'Outfit', textColor: L.primary, opacity: 100 },
  { id: 'fd-hiw-step-1-title', type: 'heading', name: 'Step 1 Title', x: 170, y: 1572, width: 240, height: 36, content: 'Connect your repo', fontSize: 22, fontWeight: 700, fontFamily: 'Outfit', textColor: L.fgInverse, opacity: 100 },
  { id: 'fd-hiw-step-1-copy', type: 'paragraph', name: 'Step 1 Copy', x: 170, y: 1614, width: 240, height: 52, content: 'Link GitHub, GitLab, or Bitbucket in one click. We detect your framework automatically.', fontSize: 14, fontFamily: 'Outfit', textColor: 'rgba(255,255,255,0.55)', lineHeight: 1.6, opacity: 100 },
  // Step 2
  { id: 'fd-hiw-step-2-num', type: 'heading', name: 'Step 2 Number', x: 460, y: 1564, width: 60, height: 64, content: '02', fontSize: 52, fontWeight: 800, fontFamily: 'Outfit', textColor: L.secondary, opacity: 100 },
  { id: 'fd-hiw-step-2-title', type: 'heading', name: 'Step 2 Title', x: 530, y: 1572, width: 240, height: 36, content: 'Configure & preview', fontSize: 22, fontWeight: 700, fontFamily: 'Outfit', textColor: L.fgInverse, opacity: 100 },
  { id: 'fd-hiw-step-2-copy', type: 'paragraph', name: 'Step 2 Copy', x: 530, y: 1614, width: 240, height: 52, content: 'Set environment variables, review your build, and spin up a preview URL instantly.', fontSize: 14, fontFamily: 'Outfit', textColor: 'rgba(255,255,255,0.55)', lineHeight: 1.6, opacity: 100 },
  // Step 3
  { id: 'fd-hiw-step-3-num', type: 'heading', name: 'Step 3 Number', x: 820, y: 1564, width: 60, height: 64, content: '03', fontSize: 52, fontWeight: 800, fontFamily: 'Outfit', textColor: L.accent, opacity: 100 },
  { id: 'fd-hiw-step-3-title', type: 'heading', name: 'Step 3 Title', x: 890, y: 1572, width: 240, height: 36, content: 'Deploy everywhere', fontSize: 22, fontWeight: 700, fontFamily: 'Outfit', textColor: L.fgInverse, opacity: 100 },
  { id: 'fd-hiw-step-3-copy', type: 'paragraph', name: 'Step 3 Copy', x: 890, y: 1614, width: 240, height: 52, content: 'Push to production across 30+ global regions with a single command.', fontSize: 14, fontFamily: 'Outfit', textColor: 'rgba(255,255,255,0.55)', lineHeight: 1.6, opacity: 100 },
  // Divider line (flat: thick border strip, no box-shadow)
  { id: 'fd-hiw-divider', type: 'container', name: 'HIW Divider', x: 100, y: 1700, width: 1000, height: 4, fill: 'rgba(255,255,255,0.08)', radius: 2, opacity: 100 },
  { id: 'fd-hiw-cta-text', type: 'paragraph', name: 'HIW CTA Text', x: 100, y: 1724, width: 500, height: 28, content: 'No credit card required. Cancel anytime.', fontSize: 15, fontFamily: 'Outfit', textColor: 'rgba(255,255,255,0.45)', opacity: 100 },
  { id: 'fd-hiw-cta-btn', type: 'button', name: 'HIW CTA Button', x: 860, y: 1716, width: 180, height: 48, content: 'Get Started Free', fill: L.primary, textColor: L.fgInverse, fontSize: 15, fontWeight: 700, fontFamily: 'Outfit', radius: 6, opacity: 100 },

  // ══ PRICING SECTION (Gray bg) ═════════════════════════════════════════════
  { id: 'fd-pricing-bg', type: 'container', name: 'Pricing Section', x: 0, y: 1882, width: 1200, height: 640, fill: L.bgMuted, radius: 0, opacity: 100 },
  { id: 'fd-pricing-kicker', type: 'label', name: 'Pricing Kicker', x: 100, y: 1942, width: 100, height: 24, content: 'PRICING', fontSize: 11, fontWeight: 700, fontFamily: 'Outfit', textColor: L.secondary, fill: L.green10, radius: 4, opacity: 100 },
  { id: 'fd-pricing-title', type: 'heading', name: 'Pricing Heading', x: 100, y: 1978, width: 560, height: 58, content: 'Simple, transparent pricing.', fontSize: 44, fontWeight: 800, fontFamily: 'Outfit', textColor: L.fg, lineHeight: 1.1, opacity: 100 },
  { id: 'fd-pricing-sub', type: 'paragraph', name: 'Pricing Subheading', x: 100, y: 2050, width: 500, height: 36, content: 'No hidden fees. No surprise bills. Upgrade or downgrade at any time.', fontSize: 15, fontFamily: 'Outfit', textColor: L.fgMuted, lineHeight: 1.6, opacity: 100 },
  // Starter card
  { id: 'fd-plan-card-1', type: 'container', name: 'Starter Plan Card', x: 100, y: 2116, width: 300, height: 320, fill: L.card, borderColor: L.border, radius: 8, opacity: 100 },
  { id: 'fd-plan-1-name', type: 'heading', name: 'Starter Name', x: 130, y: 2148, width: 240, height: 32, content: 'Starter', fontSize: 22, fontWeight: 800, fontFamily: 'Outfit', textColor: L.fg, opacity: 100 },
  { id: 'fd-plan-1-price', type: 'heading', name: 'Starter Price', x: 130, y: 2192, width: 240, height: 56, content: '$0', fontSize: 48, fontWeight: 800, fontFamily: 'Outfit', textColor: L.primary, opacity: 100 },
  { id: 'fd-plan-1-period', type: 'paragraph', name: 'Starter Period', x: 130, y: 2252, width: 240, height: 20, content: 'Free forever', fontSize: 13, fontFamily: 'Outfit', textColor: L.fgMuted, opacity: 100 },
  { id: 'fd-plan-1-features', type: 'paragraph', name: 'Starter Features', x: 130, y: 2286, width: 240, height: 84, content: '3 projects\n50GB bandwidth / mo\nCommunity support\nBasic analytics', fontSize: 13, fontFamily: 'Outfit', textColor: L.fgMuted, lineHeight: 1.75, opacity: 100 },
  { id: 'fd-plan-1-btn', type: 'button', name: 'Starter Button', x: 130, y: 2390, width: 240, height: 42, content: 'Start for Free', fill: 'transparent', textColor: L.primary, fontSize: 14, fontWeight: 700, fontFamily: 'Outfit', borderColor: L.primary, radius: 6, opacity: 100 },
  // Pro card (featured)
  { id: 'fd-plan-card-2', type: 'container', name: 'Pro Plan Card', x: 450, y: 2096, width: 300, height: 360, fill: L.primary, radius: 8, opacity: 100 },
  { id: 'fd-plan-2-badge', type: 'label', name: 'Pro Badge', x: 490, y: 2118, width: 120, height: 24, content: 'MOST POPULAR', fontSize: 10, fontWeight: 700, fontFamily: 'Outfit', textColor: L.primary, fill: L.bg, radius: 4, opacity: 100 },
  { id: 'fd-plan-2-name', type: 'heading', name: 'Pro Name', x: 480, y: 2152, width: 240, height: 32, content: 'Pro', fontSize: 22, fontWeight: 800, fontFamily: 'Outfit', textColor: L.fgInverse, opacity: 100 },
  { id: 'fd-plan-2-price', type: 'heading', name: 'Pro Price', x: 480, y: 2196, width: 240, height: 56, content: '$49', fontSize: 48, fontWeight: 800, fontFamily: 'Outfit', textColor: L.fgInverse, opacity: 100 },
  { id: 'fd-plan-2-period', type: 'paragraph', name: 'Pro Period', x: 480, y: 2256, width: 240, height: 20, content: 'per month, billed annually', fontSize: 13, fontFamily: 'Outfit', textColor: 'rgba(255,255,255,0.70)', opacity: 100 },
  { id: 'fd-plan-2-features', type: 'paragraph', name: 'Pro Features', x: 480, y: 2292, width: 240, height: 100, content: 'Unlimited projects\n500GB bandwidth / mo\nPriority support\nAdvanced analytics\nCustom domains', fontSize: 13, fontFamily: 'Outfit', textColor: 'rgba(255,255,255,0.85)', lineHeight: 1.75, opacity: 100 },
  { id: 'fd-plan-2-btn', type: 'button', name: 'Pro Button', x: 480, y: 2406, width: 240, height: 42, content: 'Start Pro Trial', fill: L.bg, textColor: L.primary, fontSize: 14, fontWeight: 700, fontFamily: 'Outfit', radius: 6, opacity: 100 },
  // Enterprise card
  { id: 'fd-plan-card-3', type: 'container', name: 'Enterprise Plan Card', x: 800, y: 2116, width: 300, height: 320, fill: L.card, borderColor: L.border, radius: 8, opacity: 100 },
  { id: 'fd-plan-3-name', type: 'heading', name: 'Enterprise Name', x: 830, y: 2148, width: 240, height: 32, content: 'Enterprise', fontSize: 22, fontWeight: 800, fontFamily: 'Outfit', textColor: L.fg, opacity: 100 },
  { id: 'fd-plan-3-price', type: 'heading', name: 'Enterprise Price', x: 830, y: 2192, width: 240, height: 56, content: 'Custom', fontSize: 38, fontWeight: 800, fontFamily: 'Outfit', textColor: L.secondary, opacity: 100 },
  { id: 'fd-plan-3-period', type: 'paragraph', name: 'Enterprise Period', x: 830, y: 2252, width: 240, height: 20, content: 'Volume pricing available', fontSize: 13, fontFamily: 'Outfit', textColor: L.fgMuted, opacity: 100 },
  { id: 'fd-plan-3-features', type: 'paragraph', name: 'Enterprise Features', x: 830, y: 2286, width: 240, height: 84, content: 'Everything in Pro\nUnlimited bandwidth\nDedicated support\nSLA & compliance\nSSO / SAML', fontSize: 13, fontFamily: 'Outfit', textColor: L.fgMuted, lineHeight: 1.75, opacity: 100 },
  { id: 'fd-plan-3-btn', type: 'button', name: 'Enterprise Button', x: 830, y: 2390, width: 240, height: 42, content: 'Contact Sales', fill: 'transparent', textColor: L.secondary, fontSize: 14, fontWeight: 700, fontFamily: 'Outfit', borderColor: L.secondary, radius: 6, opacity: 100 },

  // ══ FAQ SECTION (White bg) ════════════════════════════════════════════════
  { id: 'fd-faq-bg', type: 'container', name: 'FAQ Section', x: 0, y: 2522, width: 1200, height: 480, fill: L.bg, radius: 0, opacity: 100 },
  { id: 'fd-faq-kicker', type: 'label', name: 'FAQ Kicker', x: 100, y: 2582, width: 60, height: 24, content: 'FAQ', fontSize: 11, fontWeight: 700, fontFamily: 'Outfit', textColor: L.accent, fill: L.amber10, radius: 4, opacity: 100 },
  { id: 'fd-faq-title', type: 'heading', name: 'FAQ Heading', x: 100, y: 2618, width: 460, height: 56, content: 'Common questions, honest answers.', fontSize: 40, fontWeight: 800, fontFamily: 'Outfit', textColor: L.fg, lineHeight: 1.1, opacity: 100 },
  { id: 'fd-faq-divider-1', type: 'container', name: 'FAQ Divider 1', x: 100, y: 2716, width: 1000, height: 2, fill: L.border, radius: 0, opacity: 100 },
  { id: 'fd-faq-q1', type: 'heading', name: 'FAQ Q1', x: 100, y: 2730, width: 760, height: 28, content: 'Is there a free plan available?', fontSize: 18, fontWeight: 700, fontFamily: 'Outfit', textColor: L.fg, opacity: 100 },
  { id: 'fd-faq-a1', type: 'paragraph', name: 'FAQ A1', x: 100, y: 2762, width: 760, height: 36, content: 'Yes—our Starter plan is free forever, with no credit card required. Great for personal projects.', fontSize: 14, fontFamily: 'Outfit', textColor: L.fgMuted, lineHeight: 1.6, opacity: 100 },
  { id: 'fd-faq-divider-2', type: 'container', name: 'FAQ Divider 2', x: 100, y: 2816, width: 1000, height: 2, fill: L.border, radius: 0, opacity: 100 },
  { id: 'fd-faq-q2', type: 'heading', name: 'FAQ Q2', x: 100, y: 2830, width: 760, height: 28, content: 'Can I migrate my existing project?', fontSize: 18, fontWeight: 700, fontFamily: 'Outfit', textColor: L.fg, opacity: 100 },
  { id: 'fd-faq-a2', type: 'paragraph', name: 'FAQ A2', x: 100, y: 2862, width: 760, height: 36, content: 'Absolutely. We support one-click migrations from Vercel, Netlify, Heroku, and all major cloud providers.', fontSize: 14, fontFamily: 'Outfit', textColor: L.fgMuted, lineHeight: 1.6, opacity: 100 },
  { id: 'fd-faq-divider-3', type: 'container', name: 'FAQ Divider 3', x: 100, y: 2916, width: 1000, height: 2, fill: L.border, radius: 0, opacity: 100 },
  { id: 'fd-faq-q3', type: 'heading', name: 'FAQ Q3', x: 100, y: 2930, width: 760, height: 28, content: 'What happens if I exceed my bandwidth limit?', fontSize: 18, fontWeight: 700, fontFamily: 'Outfit', textColor: L.fg, opacity: 100 },
  { id: 'fd-faq-a3', type: 'paragraph', name: 'FAQ A3', x: 100, y: 2962, width: 760, height: 36, content: 'We never throttle your site. You\'ll receive an email alert, and overage is billed at $0.02 per GB.', fontSize: 14, fontFamily: 'Outfit', textColor: L.fgMuted, lineHeight: 1.6, opacity: 100 },

  // ══ CTA SECTION (Emerald bg) ══════════════════════════════════════════════
  { id: 'fd-cta-bg', type: 'container', name: 'CTA Section', x: 0, y: 3002, width: 1200, height: 340, fill: L.secondary, radius: 0, opacity: 100 },
  { id: 'fd-cta-deco-1', type: 'container', name: 'CTA Deco 1', x: 1000, y: 3020, width: 240, height: 240, fill: 'rgba(255,255,255,0.08)', radius: 9999, opacity: 100 },
  { id: 'fd-cta-deco-2', type: 'container', name: 'CTA Deco 2', x: 20, y: 3200, width: 130, height: 130, fill: 'rgba(255,255,255,0.06)', radius: 8, opacity: 100 },
  { id: 'fd-cta-title', type: 'heading', name: 'CTA Title', x: 100, y: 3068, width: 760, height: 110, content: 'Ready to launch your\nbest product yet?', fontSize: 52, fontWeight: 800, fontFamily: 'Outfit', textColor: L.fgInverse, lineHeight: 1.1, opacity: 100 },
  { id: 'fd-cta-sub', type: 'paragraph', name: 'CTA Subtext', x: 100, y: 3194, width: 500, height: 36, content: 'Join 50,000+ teams already building with LaunchPad. Free to start.', fontSize: 16, fontFamily: 'Outfit', textColor: 'rgba(255,255,255,0.75)', lineHeight: 1.6, opacity: 100 },
  { id: 'fd-cta-btn-primary', type: 'button', name: 'CTA Primary', x: 100, y: 3262, width: 190, height: 52, content: 'Get Started Free', fill: L.bg, textColor: L.secondary, fontSize: 15, fontWeight: 700, fontFamily: 'Outfit', radius: 6, opacity: 100 },
  { id: 'fd-cta-btn-secondary', type: 'button', name: 'CTA Secondary', x: 306, y: 3262, width: 150, height: 52, content: 'Talk to Sales', fill: 'transparent', textColor: L.fgInverse, fontSize: 15, fontWeight: 600, fontFamily: 'Outfit', borderColor: 'rgba(255,255,255,0.50)', radius: 6, opacity: 100 },

  // ══ FOOTER ══════════════════════════════════════════════════════════════════
  { id: 'fd-footer-bg', type: 'container', name: 'Footer Section', x: 0, y: 3342, width: 1200, height: 280, fill: L.bgDark, radius: 0, opacity: 100 },
  { id: 'fd-footer-logo-block', type: 'container', name: 'Footer Logo Block', x: 100, y: 3390, width: 32, height: 32, fill: L.primary, radius: 6, opacity: 100 },
  { id: 'fd-footer-logo', type: 'heading', name: 'Footer Logo', x: 144, y: 3392, width: 200, height: 30, content: 'LaunchPad', fontSize: 20, fontWeight: 800, fontFamily: 'Outfit', textColor: L.fgInverse, opacity: 100 },
  { id: 'fd-footer-tagline', type: 'paragraph', name: 'Footer Tagline', x: 100, y: 3432, width: 320, height: 40, content: 'The modern deployment platform\nfor ambitious teams.', fontSize: 13, fontFamily: 'Outfit', textColor: 'rgba(255,255,255,0.45)', lineHeight: 1.65, opacity: 100 },
  { id: 'fd-footer-col-1', type: 'paragraph', name: 'Footer Col 1', x: 560, y: 3390, width: 140, height: 110, content: 'Product\n─\nFeatures\nPricing\nChangelog\nRoadmap', fontSize: 13, fontFamily: 'Outfit', textColor: 'rgba(255,255,255,0.50)', lineHeight: 1.85, opacity: 100 },
  { id: 'fd-footer-col-2', type: 'paragraph', name: 'Footer Col 2', x: 740, y: 3390, width: 140, height: 110, content: 'Company\n─\nAbout\nBlog\nCareers\nPress', fontSize: 13, fontFamily: 'Outfit', textColor: 'rgba(255,255,255,0.50)', lineHeight: 1.85, opacity: 100 },
  { id: 'fd-footer-col-3', type: 'paragraph', name: 'Footer Col 3', x: 920, y: 3390, width: 160, height: 110, content: 'Legal\n─\nPrivacy\nTerms\nCookies\nSecurity', fontSize: 13, fontFamily: 'Outfit', textColor: 'rgba(255,255,255,0.50)', lineHeight: 1.85, opacity: 100 },
  { id: 'fd-footer-divider', type: 'container', name: 'Footer Divider', x: 100, y: 3530, width: 1000, height: 1, fill: 'rgba(255,255,255,0.10)', radius: 0, opacity: 100 },
  { id: 'fd-footer-copy', type: 'paragraph', name: 'Footer Copyright', x: 100, y: 3548, width: 500, height: 22, content: '© 2026 LaunchPad Technologies, Inc. All rights reserved.', fontSize: 12, fontFamily: 'Outfit', textColor: 'rgba(255,255,255,0.30)', opacity: 100 },
  { id: 'fd-footer-social', type: 'paragraph', name: 'Footer Social', x: 800, y: 3548, width: 300, height: 22, content: 'Twitter     GitHub     LinkedIn     Discord', fontSize: 12, fontFamily: 'Outfit', textColor: 'rgba(255,255,255,0.40)', textAlign: 'right', opacity: 100 },
]

// ─── Dark Mode Mapping ────────────────────────────────────────────────────────

const DARK_OVERRIDES = {
  [L.bg]:          D.bg,
  [L.bgMuted]:     D.bgMuted,
  [L.bgDark]:      D.bgDark,
  [L.bgDarkAlt]:   D.bgDarkAlt,
  [L.card]:        D.card,
  [L.cardMuted]:   D.cardMuted,
  [L.cardBlue]:    D.cardBlue,
  [L.cardGreen]:   D.cardGreen,
  [L.cardAmber]:   D.cardAmber,
  [L.fg]:          D.fg,
  [L.fgMuted]:     D.fgMuted,
  [L.fgInverse]:   D.fgInverse,
  [L.primary]:     D.primary,
  [L.primaryDark]: D.primaryDark,
  [L.secondary]:   D.secondary,
  [L.secondaryDk]: D.secondaryDk,
  [L.accent]:      D.accent,
  [L.accentDark]:  D.accentDark,
  [L.border]:      D.border,
  [L.blue10]:      D.blue10,
  [L.green10]:     D.green10,
  [L.amber10]:     D.amber10,
  [L.white10]:     D.white10,
  [L.white20]:     D.white20,
  // Per-element colour overrides
  '#EF4444':                      '#F87171',
  '#8B5CF6':                      '#A78BFA',
  'rgba(255,255,255,0.80)':       'rgba(255,255,255,0.75)',
  'rgba(255,255,255,0.55)':       'rgba(255,255,255,0.45)',
  'rgba(255,255,255,0.45)':       'rgba(255,255,255,0.35)',
  'rgba(255,255,255,0.30)':       'rgba(255,255,255,0.25)',
  'rgba(255,255,255,0.50)':       'rgba(255,255,255,0.40)',
  'rgba(255,255,255,0.70)':       'rgba(255,255,255,0.60)',
  'rgba(255,255,255,0.85)':       'rgba(255,255,255,0.80)',
  'rgba(255,255,255,0.75)':       'rgba(255,255,255,0.65)',
  'rgba(255,255,255,0.08)':       'rgba(255,255,255,0.06)',
  'rgba(255,255,255,0.06)':       'rgba(255,255,255,0.04)',
  'rgba(255,255,255,0.10)':       'rgba(255,255,255,0.08)',
  'transparent':                   'transparent',
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

export const flatDesignElements = withResponsive(flatDesignBaseElements)

// ─── Per-ID theme lookup tables ───────────────────────────────────────────────

const flatDesignThemeById = {
  light: Object.fromEntries(flatDesignBaseElements.map(el => [el.id, el])),
  dark:  Object.fromEntries(flatDesignBaseElements.map(toDarkTheme).map(el => [el.id, el])),
}

// ─── Exported helpers — mirror BoldSummit / ArtDeco API surface ──────────────

/**
 * Returns true when the canvas contains FlatDesign elements.
 * Identification: every element ID starts with "fd-".
 */
export function isFlatDesignTemplate(elements = []) {
  return elements.some(el => String(el.id ?? '').startsWith('fd-'))
}

/**
 * Applies light or dark colour tokens to every matching element.
 * Unknown IDs are passed through untouched.
 */
export function applyFlatDesignTheme(elements = [], theme = 'light') {
  const palette = flatDesignThemeById[theme] ?? flatDesignThemeById.light
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
export function getFlatDesignCanvasFill(theme = 'light') {
  return theme === 'dark' ? D.bg : L.bg
}