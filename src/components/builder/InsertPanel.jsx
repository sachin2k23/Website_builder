import { useState, useRef } from 'react'
import {
  AtSign,
  Box,
  CheckCircle2,
  Columns2,
  Columns3,
  Feather,
  FileText,
  FormInput,
  GitBranch,
  Globe2,
  Image,
  LayoutTemplate,
  Link,
  MousePointerClick,
  Orbit,
  Play,
  Search,
  Shapes,
  Smile,
  Square,
  Star,
  Tag,
  Text,
  Type,
  Zap,
  // New icons
  Monitor,
  Smartphone,
  Tablet,
  ShoppingCart,
  CreditCard,
  BarChart2,
  PieChart,
  LineChart,
  Map,
  Calendar,
  Clock,
  Bell,
  User,
  Users,
  Settings,
  Lock,
  Mail,
  Phone,
  MessageSquare,
  Share2,
  Heart,
  Bookmark,
  Filter,
  SlidersHorizontal,
  ToggleLeft,
  Radio,
  List,
  Grid,
  Table,
  ChevronRight,
  ChevronDown,
  Menu,
  X,
  Plus,
  Minus,
  Upload,
  Download,
  RefreshCw,
  ArrowRight,
  ExternalLink,
  Info,
  AlertCircle,
  CheckCircle,
  XCircle,
  Badge,
  Layers,
  Palette,
  Code2,
  Cpu,
  Database,
  Cloud,
  Wifi,
  Battery,
  Volume2,
  Camera,
  Mic,
  Headphones,
  Navigation,
  Compass,
  Home,
  Package,
  Truck,
  CreditCard as CardIcon,
  BarChart,
  TrendingUp,
  Activity,
  Award,
  Flag,
  Hash,
  Percent,
  DollarSign,
  Globe,
  Building,
  GraduationCap,
  Briefcase,
  Coffee,
  Music,
  Film,
  BookOpen,
  Newspaper,
  Rss,
  Send,
  ThumbsUp,
  MessageCircle,
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Github,
  Slack,
  Figma,
  Dribbble,
} from 'lucide-react'

// ─── Helpers (identical to original) ─────────────────────────────────────────

const common = { children: [], opacity: 100, shadowColor: null, textColor: '#111827' }

const makeElement = (id, label, description, defaults) => ({
  id, label, description, ...common, type: id, name: label, x: 80, y: 80, ...defaults,
})

const child = (type, name, x, y, width, height, extra = {}) => ({
  ...common, id: type, type, name, x, y, width, height,
  content: '', fill: 'transparent', borderColor: null, radius: 0, ...extra, children: [],
})

// ─── Original ITEMS (unchanged) ───────────────────────────────────────────────

const ITEMS = {
  basics: [
    makeElement('section', 'Section', 'Full-width row container', {
      width: 1200, height: 120, fill: '#F8FAFF', borderColor: null, radius: 0,
    }),
    makeElement('container', 'Container', 'Box div wrapper', {
      width: 320, height: 200, fill: '#FFFFFF', borderColor: '#E2E8F4', radius: 8,
    }),
    {
      id: 'navigation', label: 'Navigation', description: 'Logo, links and action', type: 'group',
      children: [
        child('section', 'Navigation Bar', 0, 0, 1200, 68, { fill: '#FFFFFF', borderColor: '#E2E8F4' }),
        child('heading', 'Logo', 48, 20, 120, 28, { content: 'Brand', fontSize: 20, fontWeight: 700, textColor: '#0F2348' }),
        child('link', 'Nav Link', 760, 22, 70, 24, { content: 'Work', fontSize: 15, textColor: '#41506C' }),
        child('link', 'Nav Link', 850, 22, 80, 24, { content: 'About', fontSize: 15, textColor: '#41506C' }),
        child('link', 'Nav Link', 950, 22, 70, 24, { content: 'Blog', fontSize: 15, textColor: '#41506C' }),
        child('button', 'Nav Button', 1050, 12, 110, 44, { content: 'Start', fill: '#2348D7', textColor: '#FFFFFF', radius: 8, fontSize: 14, fontWeight: 700 }),
      ],
    },
    {
      id: 'footer', label: 'Footer', description: 'Dark footer block', type: 'group',
      children: [
        child('section', 'Footer', 0, 0, 1200, 120, { fill: '#0F2348' }),
        child('heading', 'Footer Logo', 48, 34, 140, 34, { content: 'Brand', fontSize: 22, fontWeight: 700, textColor: '#FFFFFF' }),
        child('paragraph', 'Footer Links', 760, 36, 300, 24, { content: 'Home  Work  Contact', fontSize: 14, textColor: '#D8E1F0' }),
        child('paragraph', 'Copyright', 48, 82, 280, 22, { content: 'Copyright 2026. All rights reserved.', fontSize: 12, textColor: '#AAB8D4' }),
      ],
    },
    makeElement('card', 'Card', 'White card with shadow', {
      width: 300, height: 200, fill: '#FFFFFF', borderColor: null,
      shadowColor: 'rgba(15,35,72,0.14)', radius: 16,
    }),
    makeElement('divider', 'Divider', 'Horizontal rule', {
      width: 400, height: 2, fill: '#E2E8F4', borderColor: null, radius: 2,
    }),
  ],
  text: [
    makeElement('heading', 'Heading', 'Large page title', {
      width: 320, height: 50, content: 'Your Heading', fill: 'transparent',
      borderColor: null, fontSize: 32, fontWeight: 700, textColor: '#0F2348',
    }),
    makeElement('paragraph', 'Paragraph', 'Body copy block', {
      width: 300, height: 80, content: 'Your text goes here', fill: 'transparent',
      borderColor: null, fontSize: 16, textColor: '#4B5563',
    }),
    makeElement('link', 'Link', 'Clickable text', {
      width: 120, height: 30, content: 'Click here', fill: 'transparent',
      borderColor: null, fontSize: 16, textColor: '#2348D7',
    }),
    makeElement('label', 'Label', 'Small uppercase label', {
      width: 120, height: 24, content: 'LABEL', fill: 'transparent',
      borderColor: null, fontSize: 11, fontWeight: 700, letterSpacing: 2, textColor: '#5E6F8E',
    }),
  ],
  media: [
    makeElement('image', 'Image', 'Responsive image placeholder', {
      width: 280, height: 180, fill: '#F0F4FF', borderColor: '#D8E1F0', radius: 10,
    }),
    makeElement('video', 'Video', 'Player placeholder', {
      width: 320, height: 200, fill: '#0F1A2E', borderColor: null, radius: 10,
    }),
    makeElement('icon', 'Icon', 'Star SVG placeholder', {
      width: 48, height: 48, fill: 'transparent', borderColor: null, radius: 0, textColor: '#2348D7',
    }),
  ],
  icons: [
    makeElement('iconic-icon',   'Iconic',    'Friendly outline icon',   { type: 'icon', iconSet: 'iconic',    width: 48, height: 48, fill: 'transparent', borderColor: null, radius: 0, textColor: '#0099FF' }),
    makeElement('phosphor-icon', 'Phosphor',  'Geometric icon style',    { type: 'icon', iconSet: 'phosphor',  width: 48, height: 48, fill: 'transparent', borderColor: null, radius: 0, textColor: '#0099FF' }),
    makeElement('hero-icon',     'Hero',      'Heroicons-style symbol',  { type: 'icon', iconSet: 'hero',      width: 48, height: 48, fill: 'transparent', borderColor: null, radius: 0, textColor: '#0099FF' }),
    makeElement('feather-icon',  'Feather',   'Feather-style mark',      { type: 'icon', iconSet: 'feather',   width: 48, height: 48, fill: 'transparent', borderColor: null, radius: 0, textColor: '#0099FF' }),
    makeElement('meteor-icon',   'Meteor',    'Globe icon set',          { type: 'icon', iconSet: 'meteor',    width: 48, height: 48, fill: 'transparent', borderColor: null, radius: 0, textColor: '#0099FF' }),
    makeElement('material-icon', 'Material',  'Material-style bolt',     { type: 'icon', iconSet: 'material',  width: 48, height: 48, fill: 'transparent', borderColor: null, radius: 0, textColor: '#0099FF' }),
    makeElement('basicons-icon', 'Basicons',  'Orbit outline icon',      { type: 'icon', iconSet: 'basicons',  width: 48, height: 48, fill: 'transparent', borderColor: null, radius: 0, textColor: '#0099FF' }),
    makeElement('flowbite-icon', 'Flowbite',  'Connected nodes icon',    { type: 'icon', iconSet: 'flowbite',  width: 48, height: 48, fill: 'transparent', borderColor: null, radius: 0, textColor: '#0099FF' }),
    makeElement('nonicons-icon', 'Nonicons',  'Expressive outline icon', { type: 'icon', iconSet: 'nonicons',  width: 48, height: 48, fill: 'transparent', borderColor: null, radius: 0, textColor: '#0099FF' }),
    makeElement('sargam-icon',   'Sargam',    'Check circle icon',       { type: 'icon', iconSet: 'sargam',    width: 48, height: 48, fill: 'transparent', borderColor: null, radius: 0, textColor: '#0099FF' }),
  ],
  forms: [
    makeElement('button', 'Button', 'Primary action', {
      width: 140, height: 44, content: 'Button', fill: '#2348D7',
      borderColor: null, radius: 8, textColor: '#FFFFFF', fontSize: 14, fontWeight: 700,
    }),
    makeElement('input', 'Input', 'Single-line field', {
      width: 260, height: 44, content: 'Placeholder', fill: '#FFFFFF',
      borderColor: '#D8E1F0', radius: 8, fontSize: 14,
    }),
    makeElement('textarea', 'Textarea', 'Multi-line field', {
      width: 260, height: 100, content: 'Placeholder', fill: '#FFFFFF',
      borderColor: '#D8E1F0', radius: 8, fontSize: 14,
    }),
    makeElement('checkbox', 'Checkbox', 'Toggle option', {
      width: 140, height: 30, content: 'Option', fill: 'transparent',
      borderColor: null, radius: 0, fontSize: 14,
    }),
    makeElement('select', 'Select', 'Dropdown field', {
      width: 200, height: 44, content: 'Choose option', fill: '#FFFFFF',
      borderColor: '#D8E1F0', radius: 8, fontSize: 14,
    }),
  ],
  layout: [
    {
      id: 'two-columns', label: '2 Columns', description: 'Two side-by-side containers', type: 'group',
      children: [
        child('container', 'Column 1', 80, 80, 560, 200, { fill: '#FFFFFF', borderColor: '#E2E8F4', radius: 12 }),
        child('container', 'Column 2', 660, 80, 560, 200, { fill: '#FFFFFF', borderColor: '#E2E8F4', radius: 12 }),
      ],
    },
    {
      id: 'three-columns', label: '3 Columns', description: 'Three equal containers', type: 'group',
      children: [
        child('container', 'Column 1', 80, 80, 360, 200, { fill: '#FFFFFF', borderColor: '#E2E8F4', radius: 12 }),
        child('container', 'Column 2', 460, 80, 360, 200, { fill: '#FFFFFF', borderColor: '#E2E8F4', radius: 12 }),
        child('container', 'Column 3', 840, 80, 360, 200, { fill: '#FFFFFF', borderColor: '#E2E8F4', radius: 12 }),
      ],
    },
    {
      id: 'hero-block', label: 'Hero Block', description: 'Heading, copy and button', type: 'group',
      children: [
        child('section',   'Hero Section',    0, 0,   1200, 360, { fill: '#F8FAFF' }),
        child('heading',   'Hero Heading',    80, 74,  560, 86,  { content: 'Build something brilliant', fontSize: 44, fontWeight: 700, textColor: '#0F2348' }),
        child('paragraph', 'Hero Paragraph',  80, 178, 500, 64,  { content: 'Design, arrange and publish your next website with a canvas that feels direct.', fontSize: 18, textColor: '#5E6F8E' }),
        child('button',    'Hero Button',     80, 268, 150, 48,  { content: 'Get started', fill: '#2348D7', textColor: '#FFFFFF', radius: 8, fontWeight: 700 }),
      ],
    },
    {
      id: 'cta-block', label: 'CTA Block', description: 'Centered conversion block', type: 'group',
      children: [
        child('section',   'CTA Section',  0,   0,   1200, 260, { fill: '#0F2348' }),
        child('heading',   'CTA Heading',  360, 54,  480,  58,  { content: 'Ready to launch?', fontSize: 36, fontWeight: 700, textColor: '#FFFFFF', textAlign: 'center' }),
        child('paragraph', 'CTA Subtext',  390, 126, 420,  36,  { content: 'Turn the page into a polished web experience.', fontSize: 16, textColor: '#D8E1F0', textAlign: 'center' }),
        child('button',    'CTA Button',   525, 184, 150,  46,  { content: 'Publish now', fill: '#FFFFFF', textColor: '#2348D7', radius: 8, fontWeight: 700 }),
      ],
    },
  ],
}

// ─── NEW EXTENDED ITEMS ───────────────────────────────────────────────────────

const NEW_ITEMS = {
  // ── Navigation Patterns ────────────────────────────────────────────────────
  navigation: [
    {
      id: 'nav-centered', label: 'Nav Centered', description: 'Logo centered, links both sides', type: 'group',
      children: [
        child('section', 'Nav Bar', 0, 0, 1200, 72, { fill: '#FFFFFF', borderColor: '#E2E8F4' }),
        child('link', 'Nav Link', 200, 24, 70, 24, { content: 'Product', fontSize: 14, textColor: '#41506C' }),
        child('link', 'Nav Link', 290, 24, 80, 24, { content: 'Pricing', fontSize: 14, textColor: '#41506C' }),
        child('heading', 'Logo', 545, 16, 110, 40, { content: 'Brand', fontSize: 22, fontWeight: 800, textColor: '#0F2348' }),
        child('link', 'Nav Link', 820, 24, 70, 24, { content: 'Docs', fontSize: 14, textColor: '#41506C' }),
        child('button', 'CTA', 1020, 14, 110, 44, { content: 'Sign up', fill: '#2348D7', textColor: '#FFFFFF', radius: 22, fontSize: 13, fontWeight: 700 }),
      ],
    },
    {
      id: 'nav-dark', label: 'Nav Dark', description: 'Dark background navigation', type: 'group',
      children: [
        child('section', 'Dark Nav', 0, 0, 1200, 68, { fill: '#0A0F1E' }),
        child('heading', 'Logo', 48, 18, 130, 32, { content: 'Brand', fontSize: 20, fontWeight: 800, textColor: '#FFFFFF' }),
        child('link', 'Nav Link', 680, 22, 80, 24, { content: 'Features', fontSize: 14, textColor: '#8899BB' }),
        child('link', 'Nav Link', 780, 22, 70, 24, { content: 'Blog', fontSize: 14, textColor: '#8899BB' }),
        child('link', 'Nav Link', 870, 22, 80, 24, { content: 'Pricing', fontSize: 14, textColor: '#8899BB' }),
        child('button', 'CTA', 1040, 12, 110, 44, { content: 'Get started', fill: '#FFFFFF', textColor: '#0A0F1E', radius: 8, fontSize: 13, fontWeight: 700 }),
      ],
    },
    {
      id: 'nav-transparent', label: 'Nav Float', description: 'Floating transparent overlay nav', type: 'group',
      children: [
        child('section', 'Nav Bg', 0, 0, 1200, 72, { fill: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.12)' }),
        child('heading', 'Logo', 48, 18, 130, 36, { content: 'Brand', fontSize: 21, fontWeight: 800, textColor: '#FFFFFF' }),
        child('link', 'Nav Link', 680, 24, 80, 24, { content: 'Work', fontSize: 14, textColor: 'rgba(255,255,255,0.7)' }),
        child('link', 'Nav Link', 780, 24, 80, 24, { content: 'About', fontSize: 14, textColor: 'rgba(255,255,255,0.7)' }),
        child('button', 'CTA', 1044, 14, 108, 44, { content: 'Contact', fill: 'rgba(255,255,255,0.15)', textColor: '#FFFFFF', radius: 8, fontSize: 13, fontWeight: 600 }),
      ],
    },
    {
      id: 'sidebar-nav', label: 'Sidebar Nav', description: 'Vertical side navigation menu', type: 'group',
      children: [
        child('section', 'Sidebar', 0, 0, 240, 800, { fill: '#F7F9FD', borderColor: '#E2E8F4' }),
        child('heading', 'App Logo', 20, 24, 140, 32, { content: 'Dashboard', fontSize: 16, fontWeight: 800, textColor: '#0F2348' }),
        child('button', 'Nav Item 1', 12, 80, 216, 40, { content: 'Overview', fill: '#EEF3FF', textColor: '#2348D7', radius: 8, fontSize: 13, fontWeight: 600 }),
        child('button', 'Nav Item 2', 12, 128, 216, 40, { content: 'Analytics', fill: 'transparent', textColor: '#5E6F8E', radius: 8, fontSize: 13 }),
        child('button', 'Nav Item 3', 12, 176, 216, 40, { content: 'Projects', fill: 'transparent', textColor: '#5E6F8E', radius: 8, fontSize: 13 }),
        child('button', 'Nav Item 4', 12, 224, 216, 40, { content: 'Team', fill: 'transparent', textColor: '#5E6F8E', radius: 8, fontSize: 13 }),
        child('button', 'Nav Item 5', 12, 272, 216, 40, { content: 'Settings', fill: 'transparent', textColor: '#5E6F8E', radius: 8, fontSize: 13 }),
      ],
    },
    {
      id: 'breadcrumb', label: 'Breadcrumb', description: 'Path-based breadcrumb trail', type: 'group',
      children: [
        child('link', 'Crumb 1', 0, 0, 60, 24, { content: 'Home', fontSize: 13, textColor: '#6B7B9A' }),
        child('label', 'Sep 1', 64, 2, 12, 20, { content: '/', fontSize: 13, textColor: '#C5D0E4' }),
        child('link', 'Crumb 2', 80, 0, 80, 24, { content: 'Products', fontSize: 13, textColor: '#6B7B9A' }),
        child('label', 'Sep 2', 164, 2, 12, 20, { content: '/', fontSize: 13, textColor: '#C5D0E4' }),
        child('paragraph', 'Current', 180, 0, 100, 24, { content: 'Current page', fontSize: 13, textColor: '#0F2348', fontWeight: 600 }),
      ],
    },
    {
      id: 'tabs-nav', label: 'Tab Bar', description: 'Horizontal tab navigation', type: 'group',
      children: [
        child('section', 'Tab Strip', 0, 0, 700, 48, { fill: '#FFFFFF', borderColor: '#E2E8F4' }),
        child('button', 'Tab 1', 0, 4, 110, 40, { content: 'Overview', fill: '#EEF3FF', textColor: '#2348D7', radius: 8, fontSize: 13, fontWeight: 600 }),
        child('button', 'Tab 2', 116, 4, 110, 40, { content: 'Activity', fill: 'transparent', textColor: '#5E6F8E', radius: 8, fontSize: 13 }),
        child('button', 'Tab 3', 232, 4, 110, 40, { content: 'Settings', fill: 'transparent', textColor: '#5E6F8E', radius: 8, fontSize: 13 }),
        child('button', 'Tab 4', 348, 4, 110, 40, { content: 'Billing', fill: 'transparent', textColor: '#5E6F8E', radius: 8, fontSize: 13 }),
      ],
    },
    {
      id: 'pagination', label: 'Pagination', description: 'Page number controls', type: 'group',
      children: [
        child('button', 'Prev', 0, 0, 80, 36, { content: '← Prev', fill: '#FFFFFF', borderColor: '#D8E1F0', textColor: '#41506C', radius: 8, fontSize: 13 }),
        child('button', 'Page 1', 88, 0, 36, 36, { content: '1', fill: '#2348D7', textColor: '#FFFFFF', radius: 8, fontSize: 13, fontWeight: 700 }),
        child('button', 'Page 2', 132, 0, 36, 36, { content: '2', fill: '#FFFFFF', borderColor: '#D8E1F0', textColor: '#41506C', radius: 8, fontSize: 13 }),
        child('button', 'Page 3', 176, 0, 36, 36, { content: '3', fill: '#FFFFFF', borderColor: '#D8E1F0', textColor: '#41506C', radius: 8, fontSize: 13 }),
        child('button', 'Next', 220, 0, 80, 36, { content: 'Next →', fill: '#FFFFFF', borderColor: '#D8E1F0', textColor: '#41506C', radius: 8, fontSize: 13 }),
      ],
    },
  ],

  // ── UI Components ──────────────────────────────────────────────────────────
  components: [
    {
      id: 'badge', label: 'Badge', description: 'Status or count label', type: 'group',
      children: [
        child('button', 'Badge', 0, 0, 70, 24, { content: 'New', fill: '#EEF3FF', textColor: '#2348D7', radius: 12, fontSize: 11, fontWeight: 700 }),
      ],
    },
    {
      id: 'tag-chip', label: 'Tag Chip', description: 'Removable tag element', type: 'group',
      children: [
        child('button', 'Chip', 0, 0, 90, 28, { content: 'Design ×', fill: '#F0F4FF', textColor: '#2348D7', radius: 14, fontSize: 12, fontWeight: 500 }),
      ],
    },
    {
      id: 'avatar', label: 'Avatar', description: 'User profile photo', type: 'group',
      children: [
        child('container', 'Avatar Circle', 0, 0, 48, 48, { fill: '#C7D8FF', borderColor: null, radius: 24 }),
        child('label', 'Initials', 12, 14, 24, 20, { content: 'JD', fontSize: 14, fontWeight: 700, textColor: '#2348D7' }),
      ],
    },
    {
      id: 'avatar-group', label: 'Avatar Stack', description: 'Overlapping avatar group', type: 'group',
      children: [
        child('container', 'Avatar 1', 0, 0, 40, 40, { fill: '#D8C7FF', borderColor: '#FFFFFF', radius: 20 }),
        child('container', 'Avatar 2', 28, 0, 40, 40, { fill: '#C7D8FF', borderColor: '#FFFFFF', radius: 20 }),
        child('container', 'Avatar 3', 56, 0, 40, 40, { fill: '#C7FFE0', borderColor: '#FFFFFF', radius: 20 }),
        child('button', 'Count', 84, 0, 40, 40, { content: '+4', fill: '#F0F4FF', textColor: '#5E6F8E', radius: 20, fontSize: 12, fontWeight: 700 }),
      ],
    },
    {
      id: 'tooltip', label: 'Tooltip', description: 'Hover info popup', type: 'group',
      children: [
        child('container', 'Tooltip Box', 0, 0, 160, 36, { fill: '#0F2348', borderColor: null, radius: 8, shadowColor: 'rgba(0,0,0,0.2)' }),
        child('paragraph', 'Tooltip Text', 12, 8, 136, 20, { content: 'Helpful context here', fontSize: 12, textColor: '#FFFFFF' }),
      ],
    },
    {
      id: 'progress-bar', label: 'Progress', description: 'Task completion indicator', type: 'group',
      children: [
        child('container', 'Track', 0, 8, 260, 8, { fill: '#E8EDF6', borderColor: null, radius: 4 }),
        child('container', 'Fill', 0, 8, 160, 8, { fill: '#2348D7', borderColor: null, radius: 4 }),
        child('label', 'Percent', 270, 0, 40, 24, { content: '62%', fontSize: 12, fontWeight: 600, textColor: '#41506C' }),
      ],
    },
    {
      id: 'rating', label: 'Rating', description: 'Star rating display', type: 'group',
      children: [
        child('icon', 'Star 1', 0, 0, 20, 20, { fill: '#FCD34D', textColor: '#F59E0B' }),
        child('icon', 'Star 2', 24, 0, 20, 20, { fill: '#FCD34D', textColor: '#F59E0B' }),
        child('icon', 'Star 3', 48, 0, 20, 20, { fill: '#FCD34D', textColor: '#F59E0B' }),
        child('icon', 'Star 4', 72, 0, 20, 20, { fill: '#FCD34D', textColor: '#F59E0B' }),
        child('icon', 'Star 5', 96, 0, 20, 20, { fill: '#E8EDF6', textColor: '#C5D0E4' }),
        child('paragraph', 'Score', 122, 2, 60, 16, { content: '4.0 (98)', fontSize: 12, textColor: '#6B7B9A' }),
      ],
    },
    {
      id: 'toggle-switch', label: 'Toggle', description: 'On/off switch control', type: 'group',
      children: [
        child('container', 'Track', 0, 4, 48, 24, { fill: '#2348D7', borderColor: null, radius: 12 }),
        child('container', 'Thumb', 26, 8, 16, 16, { fill: '#FFFFFF', borderColor: null, radius: 8, shadowColor: 'rgba(0,0,0,0.12)' }),
        child('paragraph', 'Label', 58, 4, 80, 24, { content: 'Enabled', fontSize: 13, textColor: '#21395F' }),
      ],
    },
    {
      id: 'alert-box', label: 'Alert', description: 'Info / warning callout', type: 'group',
      children: [
        child('container', 'Alert BG', 0, 0, 400, 56, { fill: '#EEF3FF', borderColor: '#B8C8FF', radius: 10 }),
        child('paragraph', 'Alert Text', 48, 16, 336, 24, { content: 'This action cannot be undone.', fontSize: 14, textColor: '#21395F' }),
      ],
    },
    {
      id: 'modal', label: 'Modal', description: 'Dialog overlay panel', type: 'group',
      children: [
        child('section', 'Overlay', 0, 0, 1200, 700, { fill: 'rgba(10,15,30,0.5)' }),
        child('container', 'Modal Panel', 380, 160, 440, 380, { fill: '#FFFFFF', borderColor: null, radius: 20, shadowColor: 'rgba(0,0,0,0.24)' }),
        child('heading', 'Modal Title', 420, 202, 280, 36, { content: 'Confirm action', fontSize: 22, fontWeight: 700, textColor: '#0F2348' }),
        child('paragraph', 'Modal Body', 420, 252, 360, 64, { content: 'This will permanently delete the item. Are you sure you want to continue?', fontSize: 14, textColor: '#5E6F8E' }),
        child('button', 'Cancel', 420, 468, 120, 42, { content: 'Cancel', fill: '#F0F4FF', textColor: '#41506C', radius: 8, fontSize: 14, fontWeight: 600 }),
        child('button', 'Confirm', 556, 468, 120, 42, { content: 'Delete', fill: '#DC2626', textColor: '#FFFFFF', radius: 8, fontSize: 14, fontWeight: 700 }),
      ],
    },
    {
      id: 'dropdown-menu', label: 'Dropdown', description: 'Context menu panel', type: 'group',
      children: [
        child('container', 'Menu Panel', 0, 0, 180, 180, { fill: '#FFFFFF', borderColor: '#E2E8F4', radius: 10, shadowColor: 'rgba(15,35,72,0.12)' }),
        child('button', 'Item 1', 4, 4, 172, 36, { content: 'Edit', fill: 'transparent', textColor: '#21395F', radius: 6, fontSize: 13 }),
        child('button', 'Item 2', 4, 44, 172, 36, { content: 'Duplicate', fill: 'transparent', textColor: '#21395F', radius: 6, fontSize: 13 }),
        child('button', 'Item 3', 4, 84, 172, 36, { content: 'Archive', fill: 'transparent', textColor: '#21395F', radius: 6, fontSize: 13 }),
        child('divider', 'Sep', 8, 128, 164, 1, { fill: '#EEF2FA' }),
        child('button', 'Delete', 4, 136, 172, 36, { content: 'Delete', fill: 'transparent', textColor: '#DC2626', radius: 6, fontSize: 13, fontWeight: 600 }),
      ],
    },
    {
      id: 'notification', label: 'Notification', description: 'Toast alert message', type: 'group',
      children: [
        child('container', 'Toast', 0, 0, 320, 64, { fill: '#0F2348', borderColor: null, radius: 14, shadowColor: 'rgba(15,35,72,0.3)' }),
        child('heading', 'Title', 20, 12, 200, 20, { content: 'Successfully saved!', fontSize: 14, fontWeight: 700, textColor: '#FFFFFF' }),
        child('paragraph', 'Subtitle', 20, 36, 220, 16, { content: 'Your changes have been saved.', fontSize: 12, textColor: '#8899BB' }),
      ],
    },
  ],

  // ── Sections / Page Blocks ─────────────────────────────────────────────────
  sections: [
    {
      id: 'features-grid', label: 'Features Grid', description: '3-column feature cards', type: 'group',
      children: [
        child('section', 'Features BG', 0, 0, 1200, 480, { fill: '#FFFFFF' }),
        child('heading', 'Section Title', 360, 56, 480, 52, { content: 'Everything you need', fontSize: 36, fontWeight: 700, textColor: '#0F2348', textAlign: 'center' }),
        child('container', 'Card 1', 80, 148, 320, 220, { fill: '#F8FAFF', borderColor: '#E8EDF6', radius: 16 }),
        child('container', 'Card 2', 440, 148, 320, 220, { fill: '#F8FAFF', borderColor: '#E8EDF6', radius: 16 }),
        child('container', 'Card 3', 800, 148, 320, 220, { fill: '#F8FAFF', borderColor: '#E8EDF6', radius: 16 }),
      ],
    },
    {
      id: 'pricing-cards', label: 'Pricing Cards', description: 'Three-tier pricing layout', type: 'group',
      children: [
        child('section', 'Pricing BG', 0, 0, 1200, 560, { fill: '#F8FAFF' }),
        child('heading', 'Pricing Title', 400, 40, 400, 52, { content: 'Simple pricing', fontSize: 36, fontWeight: 700, textColor: '#0F2348', textAlign: 'center' }),
        child('container', 'Starter Card', 80, 140, 300, 320, { fill: '#FFFFFF', borderColor: '#E2E8F4', radius: 20, shadowColor: 'rgba(15,35,72,0.06)' }),
        child('container', 'Pro Card', 440, 120, 320, 360, { fill: '#0F2348', borderColor: null, radius: 20, shadowColor: 'rgba(15,35,72,0.2)' }),
        child('container', 'Enterprise Card', 800, 140, 300, 320, { fill: '#FFFFFF', borderColor: '#E2E8F4', radius: 20, shadowColor: 'rgba(15,35,72,0.06)' }),
      ],
    },
    {
      id: 'testimonial', label: 'Testimonial', description: 'Quote block with attribution', type: 'group',
      children: [
        child('section', 'Quote BG', 0, 0, 1200, 280, { fill: '#F8FAFF' }),
        child('paragraph', 'Quote Mark', 150, 40, 60, 80, { content: '"', fontSize: 96, fontWeight: 800, textColor: '#D8E1F0' }),
        child('heading', 'Quote Text', 200, 60, 800, 100, { content: 'This tool completely changed how we build websites. Nothing else comes close.', fontSize: 22, fontWeight: 500, textColor: '#0F2348' }),
        child('container', 'Avatar', 200, 180, 44, 44, { fill: '#C7D8FF', borderColor: null, radius: 22 }),
        child('heading', 'Author Name', 256, 188, 160, 24, { content: 'Sarah K.', fontSize: 14, fontWeight: 700, textColor: '#0F2348' }),
        child('paragraph', 'Author Role', 256, 210, 200, 20, { content: 'Head of Design, Acme Co.', fontSize: 12, textColor: '#6B7B9A' }),
      ],
    },
    {
      id: 'stats-row', label: 'Stats Row', description: 'Key metrics in a row', type: 'group',
      children: [
        child('section', 'Stats BG', 0, 0, 1200, 180, { fill: '#0F2348' }),
        child('heading', 'Stat 1', 120, 50, 200, 60, { content: '10M+', fontSize: 42, fontWeight: 800, textColor: '#FFFFFF', textAlign: 'center' }),
        child('paragraph', 'Stat 1 Label', 120, 118, 200, 24, { content: 'Active Users', fontSize: 14, textColor: '#8899BB', textAlign: 'center' }),
        child('heading', 'Stat 2', 440, 50, 200, 60, { content: '99.9%', fontSize: 42, fontWeight: 800, textColor: '#FFFFFF', textAlign: 'center' }),
        child('paragraph', 'Stat 2 Label', 440, 118, 200, 24, { content: 'Uptime SLA', fontSize: 14, textColor: '#8899BB', textAlign: 'center' }),
        child('heading', 'Stat 3', 760, 50, 200, 60, { content: '4.9★', fontSize: 42, fontWeight: 800, textColor: '#FFFFFF', textAlign: 'center' }),
        child('paragraph', 'Stat 3 Label', 760, 118, 200, 24, { content: 'App Rating', fontSize: 14, textColor: '#8899BB', textAlign: 'center' }),
      ],
    },
    {
      id: 'team-grid', label: 'Team Grid', description: 'Team member cards', type: 'group',
      children: [
        child('section', 'Team BG', 0, 0, 1200, 400, { fill: '#FFFFFF' }),
        child('heading', 'Team Title', 400, 40, 400, 48, { content: 'Meet the team', fontSize: 34, fontWeight: 700, textColor: '#0F2348', textAlign: 'center' }),
        child('container', 'Member 1', 80, 128, 240, 210, { fill: '#F8FAFF', borderColor: '#E8EDF6', radius: 18 }),
        child('container', 'Member 2', 360, 128, 240, 210, { fill: '#F8FAFF', borderColor: '#E8EDF6', radius: 18 }),
        child('container', 'Member 3', 640, 128, 240, 210, { fill: '#F8FAFF', borderColor: '#E8EDF6', radius: 18 }),
        child('container', 'Member 4', 920, 128, 240, 210, { fill: '#F8FAFF', borderColor: '#E8EDF6', radius: 18 }),
      ],
    },
    {
      id: 'faq-list', label: 'FAQ List', description: 'Accordion Q&A section', type: 'group',
      children: [
        child('section', 'FAQ BG', 0, 0, 1200, 500, { fill: '#FFFFFF' }),
        child('heading', 'FAQ Title', 200, 50, 400, 48, { content: 'Frequently asked questions', fontSize: 32, fontWeight: 700, textColor: '#0F2348' }),
        child('container', 'FAQ 1', 200, 136, 760, 60, { fill: '#F8FAFF', borderColor: '#E8EDF6', radius: 12 }),
        child('container', 'FAQ 2', 200, 208, 760, 60, { fill: '#F8FAFF', borderColor: '#E8EDF6', radius: 12 }),
        child('container', 'FAQ 3', 200, 280, 760, 60, { fill: '#F8FAFF', borderColor: '#E8EDF6', radius: 12 }),
        child('container', 'FAQ 4', 200, 352, 760, 60, { fill: '#F8FAFF', borderColor: '#E8EDF6', radius: 12 }),
      ],
    },
    {
      id: 'logo-strip', label: 'Logo Strip', description: 'Brand/partner logos row', type: 'group',
      children: [
        child('section', 'Strip BG', 0, 0, 1200, 120, { fill: '#F8FAFF', borderColor: '#EEF2FA' }),
        child('paragraph', 'Trusted Label', 80, 48, 200, 24, { content: 'Trusted by teams at', fontSize: 13, textColor: '#9AA8C0' }),
        child('container', 'Logo 1', 320, 34, 120, 52, { fill: '#FFFFFF', borderColor: '#E8EDF6', radius: 8 }),
        child('container', 'Logo 2', 468, 34, 120, 52, { fill: '#FFFFFF', borderColor: '#E8EDF6', radius: 8 }),
        child('container', 'Logo 3', 616, 34, 120, 52, { fill: '#FFFFFF', borderColor: '#E8EDF6', radius: 8 }),
        child('container', 'Logo 4', 764, 34, 120, 52, { fill: '#FFFFFF', borderColor: '#E8EDF6', radius: 8 }),
        child('container', 'Logo 5', 912, 34, 120, 52, { fill: '#FFFFFF', borderColor: '#E8EDF6', radius: 8 }),
      ],
    },
    {
      id: 'split-image', label: 'Split Image', description: 'Content and image side-by-side', type: 'group',
      children: [
        child('section', 'Split BG', 0, 0, 1200, 480, { fill: '#FFFFFF' }),
        child('heading', 'Split Heading', 80, 100, 440, 80, { content: 'A new way to build', fontSize: 38, fontWeight: 700, textColor: '#0F2348' }),
        child('paragraph', 'Split Body', 80, 200, 440, 80, { content: 'Our canvas gives you the freedom to design without limits, while keeping your code clean and production-ready.', fontSize: 16, textColor: '#5E6F8E' }),
        child('button', 'Split CTA', 80, 310, 150, 48, { content: 'Learn more', fill: '#2348D7', textColor: '#FFFFFF', radius: 8, fontWeight: 700 }),
        child('container', 'Image Block', 640, 40, 480, 400, { fill: '#F0F4FF', borderColor: '#D8E1F0', radius: 20 }),
      ],
    },
    {
      id: 'newsletter', label: 'Newsletter', description: 'Email capture section', type: 'group',
      children: [
        child('section', 'NL BG', 0, 0, 1200, 200, { fill: '#F8FAFF', borderColor: '#EEF2FA' }),
        child('heading', 'NL Title', 280, 44, 640, 40, { content: 'Stay in the loop', fontSize: 28, fontWeight: 700, textColor: '#0F2348', textAlign: 'center' }),
        child('paragraph', 'NL Sub', 280, 90, 640, 24, { content: 'Get design tips, updates and inspiration every week.', fontSize: 15, textColor: '#6B7B9A', textAlign: 'center' }),
        child('input', 'Email Input', 280, 130, 320, 44, { content: 'Enter your email', fill: '#FFFFFF', borderColor: '#D8E1F0', radius: 8 }),
        child('button', 'Subscribe', 612, 130, 130, 44, { content: 'Subscribe', fill: '#2348D7', textColor: '#FFFFFF', radius: 8, fontWeight: 700 }),
      ],
    },
  ],

  // ── E-Commerce ─────────────────────────────────────────────────────────────
  ecommerce: [
    {
      id: 'product-card', label: 'Product Card', description: 'Shop item with image + price', type: 'group',
      children: [
        child('container', 'Card', 0, 0, 260, 340, { fill: '#FFFFFF', borderColor: '#E2E8F4', radius: 16, shadowColor: 'rgba(15,35,72,0.07)' }),
        child('container', 'Product Image', 16, 16, 228, 160, { fill: '#F0F4FF', borderColor: null, radius: 10 }),
        child('label', 'Category', 20, 188, 80, 20, { content: 'FOOTWEAR', fontSize: 10, fontWeight: 700, letterSpacing: 1, textColor: '#6B7B9A' }),
        child('heading', 'Product Name', 20, 212, 220, 32, { content: 'Runner Pro X', fontSize: 18, fontWeight: 700, textColor: '#0F2348' }),
        child('heading', 'Price', 20, 252, 120, 28, { content: '$149.00', fontSize: 20, fontWeight: 800, textColor: '#0F2348' }),
        child('button', 'Add to Cart', 16, 292, 228, 40, { content: 'Add to Cart', fill: '#2348D7', textColor: '#FFFFFF', radius: 10, fontSize: 13, fontWeight: 700 }),
      ],
    },
    {
      id: 'cart-item', label: 'Cart Item', description: 'Shopping cart list row', type: 'group',
      children: [
        child('container', 'Row', 0, 0, 600, 80, { fill: '#FFFFFF', borderColor: '#E8EDF6', radius: 12 }),
        child('container', 'Thumb', 16, 16, 48, 48, { fill: '#F0F4FF', borderColor: null, radius: 8 }),
        child('heading', 'Item Name', 80, 16, 240, 24, { content: 'Runner Pro X', fontSize: 14, fontWeight: 700, textColor: '#0F2348' }),
        child('paragraph', 'Item Variant', 80, 44, 180, 20, { content: 'Size 42 · Black', fontSize: 12, textColor: '#8899BB' }),
        child('heading', 'Item Price', 480, 28, 100, 24, { content: '$149.00', fontSize: 15, fontWeight: 700, textColor: '#0F2348' }),
      ],
    },
    {
      id: 'checkout-summary', label: 'Order Summary', description: 'Checkout total breakdown', type: 'group',
      children: [
        child('container', 'Summary', 0, 0, 360, 280, { fill: '#F8FAFF', borderColor: '#E2E8F4', radius: 16 }),
        child('heading', 'Summary Title', 20, 20, 200, 28, { content: 'Order Summary', fontSize: 16, fontWeight: 700, textColor: '#0F2348' }),
        child('paragraph', 'Subtotal Label', 20, 68, 120, 24, { content: 'Subtotal', fontSize: 14, textColor: '#6B7B9A' }),
        child('paragraph', 'Subtotal Value', 240, 68, 100, 24, { content: '$298.00', fontSize: 14, textColor: '#21395F', fontWeight: 600 }),
        child('paragraph', 'Shipping Label', 20, 100, 120, 24, { content: 'Shipping', fontSize: 14, textColor: '#6B7B9A' }),
        child('paragraph', 'Shipping Value', 240, 100, 100, 24, { content: 'Free', fontSize: 14, textColor: '#16A34A', fontWeight: 600 }),
        child('divider', 'Sep', 20, 136, 320, 1, { fill: '#E2E8F4' }),
        child('heading', 'Total Label', 20, 148, 120, 28, { content: 'Total', fontSize: 16, fontWeight: 700, textColor: '#0F2348' }),
        child('heading', 'Total Value', 220, 148, 120, 28, { content: '$298.00', fontSize: 16, fontWeight: 800, textColor: '#0F2348' }),
        child('button', 'Checkout Btn', 20, 212, 320, 48, { content: 'Proceed to Checkout', fill: '#2348D7', textColor: '#FFFFFF', radius: 10, fontWeight: 700 }),
      ],
    },
    {
      id: 'product-gallery', label: 'Product Gallery', description: 'Main image + thumbnails', type: 'group',
      children: [
        child('container', 'Main Image', 0, 0, 480, 400, { fill: '#F0F4FF', borderColor: '#D8E1F0', radius: 16 }),
        child('container', 'Thumb 1', 0, 416, 106, 80, { fill: '#EEF3FF', borderColor: '#D8E1F0', radius: 10 }),
        child('container', 'Thumb 2', 118, 416, 106, 80, { fill: '#F0F4FF', borderColor: '#D8E1F0', radius: 10 }),
        child('container', 'Thumb 3', 236, 416, 106, 80, { fill: '#F0F4FF', borderColor: '#D8E1F0', radius: 10 }),
        child('container', 'Thumb 4', 354, 416, 106, 80, { fill: '#F0F4FF', borderColor: '#D8E1F0', radius: 10 }),
      ],
    },
  ],

  // ── Dashboard & Data ───────────────────────────────────────────────────────
  dashboard: [
    {
      id: 'stat-card', label: 'Stat Card', description: 'Single KPI metric card', type: 'group',
      children: [
        child('container', 'Card BG', 0, 0, 220, 120, { fill: '#FFFFFF', borderColor: '#E2E8F4', radius: 16, shadowColor: 'rgba(15,35,72,0.06)' }),
        child('label', 'Metric Label', 20, 20, 160, 18, { content: 'TOTAL REVENUE', fontSize: 10, fontWeight: 700, letterSpacing: 1, textColor: '#8899BB' }),
        child('heading', 'Metric Value', 20, 46, 160, 44, { content: '$84,231', fontSize: 28, fontWeight: 800, textColor: '#0F2348' }),
        child('paragraph', 'Delta', 20, 96, 160, 16, { content: '↑ 12.4% from last month', fontSize: 11, textColor: '#16A34A' }),
      ],
    },
    {
      id: 'chart-card', label: 'Chart Card', description: 'Data visualization container', type: 'group',
      children: [
        child('container', 'Chart BG', 0, 0, 480, 280, { fill: '#FFFFFF', borderColor: '#E2E8F4', radius: 16, shadowColor: 'rgba(15,35,72,0.06)' }),
        child('heading', 'Chart Title', 20, 20, 280, 28, { content: 'Monthly Revenue', fontSize: 16, fontWeight: 700, textColor: '#0F2348' }),
        child('paragraph', 'Chart Sub', 20, 52, 200, 20, { content: 'Jan – Jun 2026', fontSize: 12, textColor: '#8899BB' }),
        child('container', 'Chart Area', 20, 82, 440, 172, { fill: '#F8FAFF', borderColor: '#EEF2FA', radius: 10 }),
      ],
    },
    {
      id: 'data-table', label: 'Data Table', description: 'Spreadsheet-style table', type: 'group',
      children: [
        child('container', 'Table BG', 0, 0, 720, 320, { fill: '#FFFFFF', borderColor: '#E2E8F4', radius: 16 }),
        child('container', 'Header Row', 0, 0, 720, 48, { fill: '#F8FAFF', borderColor: '#E8EDF6', radius: 0 }),
        child('label', 'Col 1', 20, 14, 140, 20, { content: 'NAME', fontSize: 11, fontWeight: 700, letterSpacing: 0.5, textColor: '#6B7B9A' }),
        child('label', 'Col 2', 200, 14, 120, 20, { content: 'STATUS', fontSize: 11, fontWeight: 700, letterSpacing: 0.5, textColor: '#6B7B9A' }),
        child('label', 'Col 3', 360, 14, 120, 20, { content: 'AMOUNT', fontSize: 11, fontWeight: 700, letterSpacing: 0.5, textColor: '#6B7B9A' }),
        child('label', 'Col 4', 520, 14, 120, 20, { content: 'DATE', fontSize: 11, fontWeight: 700, letterSpacing: 0.5, textColor: '#6B7B9A' }),
        child('container', 'Row 1', 0, 48, 720, 44, { fill: '#FFFFFF', borderColor: '#F0F4FF', radius: 0 }),
        child('container', 'Row 2', 0, 92, 720, 44, { fill: '#FAFBFE', borderColor: '#F0F4FF', radius: 0 }),
        child('container', 'Row 3', 0, 136, 720, 44, { fill: '#FFFFFF', borderColor: '#F0F4FF', radius: 0 }),
        child('container', 'Row 4', 0, 180, 720, 44, { fill: '#FAFBFE', borderColor: '#F0F4FF', radius: 0 }),
      ],
    },
    {
      id: 'activity-feed', label: 'Activity Feed', description: 'Timeline event list', type: 'group',
      children: [
        child('container', 'Feed BG', 0, 0, 360, 300, { fill: '#FFFFFF', borderColor: '#E2E8F4', radius: 16 }),
        child('heading', 'Feed Title', 16, 16, 200, 24, { content: 'Recent Activity', fontSize: 15, fontWeight: 700, textColor: '#0F2348' }),
        child('container', 'Event 1', 16, 52, 328, 52, { fill: '#F8FAFF', borderColor: null, radius: 10 }),
        child('container', 'Event 2', 16, 112, 328, 52, { fill: '#F8FAFF', borderColor: null, radius: 10 }),
        child('container', 'Event 3', 16, 172, 328, 52, { fill: '#F8FAFF', borderColor: null, radius: 10 }),
        child('container', 'Event 4', 16, 232, 328, 52, { fill: '#F8FAFF', borderColor: null, radius: 10 }),
      ],
    },
  ],

  // ── Social / Content ───────────────────────────────────────────────────────
  social: [
    {
      id: 'social-post', label: 'Post Card', description: 'Social media post block', type: 'group',
      children: [
        child('container', 'Post BG', 0, 0, 440, 280, { fill: '#FFFFFF', borderColor: '#E2E8F4', radius: 16 }),
        child('container', 'Author Ava', 16, 16, 44, 44, { fill: '#C7D8FF', borderColor: null, radius: 22 }),
        child('heading', 'Author Name', 68, 16, 180, 22, { content: 'Jordan Park', fontSize: 14, fontWeight: 700, textColor: '#0F2348' }),
        child('paragraph', 'Author Handle', 68, 40, 160, 18, { content: '@jordanpark · 2h', fontSize: 12, textColor: '#8899BB' }),
        child('paragraph', 'Post Text', 16, 76, 408, 80, { content: 'Just shipped a new feature I\'ve been working on for weeks. The drag-and-drop canvas finally feels right. 🎉', fontSize: 14, textColor: '#21395F' }),
        child('container', 'Post Image', 16, 164, 408, 80, { fill: '#F0F4FF', borderColor: '#D8E1F0', radius: 10 }),
        child('paragraph', 'Reactions', 16, 252, 300, 20, { content: '❤️ 42  💬 8  🔁 5', fontSize: 13, textColor: '#6B7B9A' }),
      ],
    },
    {
      id: 'blog-card', label: 'Blog Card', description: 'Article preview card', type: 'group',
      children: [
        child('container', 'Blog BG', 0, 0, 360, 380, { fill: '#FFFFFF', borderColor: '#E2E8F4', radius: 18, shadowColor: 'rgba(15,35,72,0.07)' }),
        child('container', 'Blog Image', 0, 0, 360, 200, { fill: '#EEF3FF', borderColor: null, radius: 18 }),
        child('label', 'Blog Tag', 20, 212, 80, 22, { content: 'DESIGN', fontSize: 10, fontWeight: 700, letterSpacing: 1, textColor: '#2348D7' }),
        child('heading', 'Blog Title', 20, 238, 320, 56, { content: 'Designing for scale: lessons from the trenches', fontSize: 18, fontWeight: 700, textColor: '#0F2348' }),
        child('paragraph', 'Blog Meta', 20, 302, 280, 20, { content: 'May 2026 · 6 min read', fontSize: 12, textColor: '#8899BB' }),
        child('container', 'Author Row', 16, 336, 328, 36, { fill: 'transparent' }),
      ],
    },
    {
      id: 'comment', label: 'Comment', description: 'User comment thread item', type: 'group',
      children: [
        child('container', 'Comment Ava', 0, 0, 40, 40, { fill: '#C7E8FF', borderColor: null, radius: 20 }),
        child('container', 'Comment Body', 52, 0, 380, 84, { fill: '#F8FAFF', borderColor: '#E8EDF6', radius: 12 }),
        child('heading', 'Commenter', 68, 8, 180, 22, { content: 'Alex Kim', fontSize: 13, fontWeight: 700, textColor: '#0F2348' }),
        child('paragraph', 'Comment Text', 68, 32, 348, 44, { content: 'Really love the approach here. The breadcrumb flow is especially clean.', fontSize: 13, textColor: '#41506C' }),
        child('paragraph', 'Comment Time', 68, 88, 120, 18, { content: '3 hours ago · Reply', fontSize: 11, textColor: '#9AA8C0' }),
      ],
    },
    {
      id: 'social-links', label: 'Social Links', description: 'Row of social icon buttons', type: 'group',
      children: [
        child('button', 'Twitter', 0, 0, 44, 44, { content: '𝕏', fill: '#000000', textColor: '#FFFFFF', radius: 10, fontSize: 16, fontWeight: 800 }),
        child('button', 'LinkedIn', 52, 0, 44, 44, { content: 'in', fill: '#0077B5', textColor: '#FFFFFF', radius: 10, fontSize: 15, fontWeight: 800 }),
        child('button', 'GitHub', 104, 0, 44, 44, { content: 'gh', fill: '#24292E', textColor: '#FFFFFF', radius: 10, fontSize: 13, fontWeight: 700 }),
        child('button', 'Dribbble', 156, 0, 44, 44, { content: '⚽', fill: '#EA4C89', textColor: '#FFFFFF', radius: 10, fontSize: 14 }),
      ],
    },
  ],

  // ── Mobile / Responsive ────────────────────────────────────────────────────
  mobile: [
    {
      id: 'mobile-nav', label: 'Mobile Nav', description: 'Bottom tab bar for mobile', type: 'group',
      children: [
        child('section', 'Tab Bar', 0, 680, 390, 84, { fill: '#FFFFFF', borderColor: '#E2E8F4' }),
        child('button', 'Tab Home', 8, 688, 72, 68, { content: '⌂', fill: 'transparent', textColor: '#2348D7', radius: 8, fontSize: 24 }),
        child('button', 'Tab Search', 104, 688, 72, 68, { content: '⌕', fill: 'transparent', textColor: '#9AA8C0', radius: 8, fontSize: 24 }),
        child('button', 'Tab Add', 160, 692, 70, 60, { content: '+', fill: '#2348D7', textColor: '#FFFFFF', radius: 30, fontSize: 28, fontWeight: 700 }),
        child('button', 'Tab Notify', 226, 688, 72, 68, { content: '🔔', fill: 'transparent', textColor: '#9AA8C0', radius: 8, fontSize: 22 }),
        child('button', 'Tab Profile', 310, 688, 72, 68, { content: '👤', fill: 'transparent', textColor: '#9AA8C0', radius: 8, fontSize: 22 }),
      ],
    },
    {
      id: 'mobile-card', label: 'Mobile Card', description: 'Compact card for mobile width', type: 'group',
      children: [
        child('container', 'M Card', 0, 0, 340, 160, { fill: '#FFFFFF', borderColor: '#E2E8F4', radius: 18, shadowColor: 'rgba(15,35,72,0.08)' }),
        child('container', 'M Image', 16, 16, 80, 80, { fill: '#EEF3FF', borderColor: null, radius: 12 }),
        child('heading', 'M Title', 112, 20, 200, 28, { content: 'Item Title', fontSize: 16, fontWeight: 700, textColor: '#0F2348' }),
        child('paragraph', 'M Sub', 112, 54, 200, 36, { content: 'Short description text goes here.', fontSize: 13, textColor: '#6B7B9A' }),
        child('button', 'M CTA', 112, 104, 100, 36, { content: 'View', fill: '#EEF3FF', textColor: '#2348D7', radius: 8, fontSize: 13, fontWeight: 700 }),
      ],
    },
    {
      id: 'app-header', label: 'App Header', description: 'Mobile top header bar', type: 'group',
      children: [
        child('section', 'App Bar', 0, 0, 390, 60, { fill: '#FFFFFF', borderColor: '#E2E8F4' }),
        child('button', 'Back', 12, 14, 32, 32, { content: '←', fill: 'transparent', textColor: '#0F2348', radius: 8, fontSize: 18, fontWeight: 700 }),
        child('heading', 'Page Title', 80, 14, 230, 32, { content: 'Dashboard', fontSize: 17, fontWeight: 700, textColor: '#0F2348', textAlign: 'center' }),
        child('button', 'Menu Btn', 346, 14, 32, 32, { content: '⋯', fill: 'transparent', textColor: '#0F2348', radius: 8, fontSize: 18 }),
      ],
    },
  ],
}

// ─── Merged categories list ───────────────────────────────────────────────────

const CATEGORIES = [
  { id: 'basics',     label: 'Basics',     icon: Square,        items: ITEMS.basics },
  { id: 'text',       label: 'Text',       icon: Type,          items: ITEMS.text },
  { id: 'media',      label: 'Media',      icon: Image,         items: ITEMS.media },
  { id: 'icons',      label: 'Icons',      icon: Smile,         items: ITEMS.icons },
  { id: 'forms',      label: 'Forms',      icon: FormInput,     items: ITEMS.forms },
  { id: 'layout',     label: 'Layout',     icon: LayoutTemplate, items: ITEMS.layout },
  // New categories
  { id: 'navigation', label: 'Nav',        icon: Navigation,    items: NEW_ITEMS.navigation },
  { id: 'components', label: 'UI',         icon: Layers,        items: NEW_ITEMS.components },
  { id: 'sections',   label: 'Sections',   icon: Columns2,      items: NEW_ITEMS.sections },
  { id: 'ecommerce',  label: 'Shop',       icon: ShoppingCart,  items: NEW_ITEMS.ecommerce },
  { id: 'dashboard',  label: 'Data',       icon: BarChart2,     items: NEW_ITEMS.dashboard },
  { id: 'social',     label: 'Social',     icon: MessageCircle, items: NEW_ITEMS.social },
  { id: 'mobile',     label: 'Mobile',     icon: Smartphone,    items: NEW_ITEMS.mobile },
]

// ─── Icon preview map (original + new) ───────────────────────────────────────

const ICON_PREVIEWS = {
  'iconic-icon':   Smile,
  'phosphor-icon': Shapes,
  'hero-icon':     AtSign,
  'feather-icon':  Feather,
  'meteor-icon':   Globe2,
  'material-icon': Zap,
  'basicons-icon': Orbit,
  'flowbite-icon': GitBranch,
  'nonicons-icon': Feather,
  'sargam-icon':   CheckCircle2,
}

// ─── Preview thumbnails (original + new) ─────────────────────────────────────

function Preview({ id }) {
  const IconPreview = ICON_PREVIEWS[id]

  if (IconPreview) {
    return (
      <div className="h-[60px] w-full rounded-lg bg-[#EEF8FF] flex items-center justify-center overflow-hidden">
        <IconPreview size={28} strokeWidth={2.4} color="#0099FF" />
      </div>
    )
  }

  const shell = (children) => (
    <div className="h-[60px] w-full rounded-lg bg-[#F7F9FD] border border-[#E8EDF6] flex items-center justify-center overflow-hidden">
      {children}
    </div>
  )

  const previews = {
    // ── Original previews (unchanged) ─────────────────────────────────────
    section:              shell(<div className="w-14 h-4 rounded-sm bg-[#F8FAFF] border border-[#D8E1F0]" />),
    container:            shell(<div className="w-12 h-8 rounded border border-[#C7D2E5] bg-white" />),
    navigation:           shell(<div className="w-16 h-8 bg-white border-b border-[#C7D2E5] px-1.5 flex items-center justify-between"><span className="w-3 h-2 rounded-sm bg-[#0F2348]" /><span className="w-7 h-1 rounded bg-[#AAB8D4]" /><span className="w-3 h-2 rounded bg-[#2348D7]" /></div>),
    footer:               shell(<div className="w-16 h-8 bg-[#0F2348] px-2 py-1.5 flex flex-col justify-between"><span className="w-5 h-1.5 rounded bg-white" /><span className="w-10 h-1 rounded bg-[#AAB8D4]" /></div>),
    card:                 shell(<div className="w-12 h-8 rounded-lg bg-white shadow-md border border-[#EEF2FA]" />),
    divider:              shell(<div className="w-14 h-0.5 rounded bg-[#D8E1F0]" />),
    heading:              shell(<Text size={30} strokeWidth={2.6} color="#0F2348" />),
    paragraph:            shell(<FileText size={28} color="#7D8CA8" />),
    link:                 shell(<Link size={26} color="#2348D7" />),
    label:                shell(<Tag size={26} color="#5E6F8E" />),
    image:                shell(<Image size={30} color="#7D8CA8" />),
    video:                shell(<div className="w-14 h-9 rounded bg-[#0F1A2E] flex items-center justify-center"><Play size={18} fill="white" color="white" /></div>),
    icon:                 shell(<Star size={30} color="#2348D7" fill="#EAF0FF" />),
    button:               shell(<div className="px-4 py-2 rounded-md bg-[#2348D7] text-white text-[9px] font-bold">Button</div>),
    input:                shell(<div className="w-14 h-5 rounded border border-[#C7D2E5] bg-white" />),
    textarea:             shell(<div className="w-14 h-8 rounded border border-[#C7D2E5] bg-white" />),
    checkbox:             shell(<div className="flex items-center gap-1.5"><span className="w-3.5 h-3.5 rounded border border-[#2348D7]" /><span className="w-8 h-1.5 rounded bg-[#AAB8D4]" /></div>),
    select:               shell(<div className="w-14 h-5 rounded border border-[#C7D2E5] bg-white flex items-center justify-end pr-1"><span className="text-[9px] text-[#7D8CA8]">v</span></div>),
    'two-columns':        shell(<Columns2 size={30} color="#2348D7" />),
    'three-columns':      shell(<Columns3 size={30} color="#2348D7" />),
    'hero-block':         shell(<div className="w-16 h-10 bg-[#F8FAFF] px-2 py-1.5 flex flex-col gap-1"><span className="w-9 h-1.5 rounded bg-[#0F2348]" /><span className="w-12 h-1 rounded bg-[#AAB8D4]" /><span className="w-5 h-2 rounded bg-[#2348D7]" /></div>),
    'cta-block':          shell(<div className="w-16 h-10 bg-[#0F2348] px-2 py-2 flex flex-col items-center gap-1"><span className="w-10 h-1.5 rounded bg-white" /><span className="w-12 h-1 rounded bg-[#AAB8D4]" /><span className="w-5 h-2 rounded bg-white" /></div>),

    // ── Navigation previews ────────────────────────────────────────────────
    'nav-centered':     shell(<div className="w-16 h-8 bg-white border-b border-[#E2E8F4] flex items-center justify-between px-1"><span className="w-3.5 h-1.5 rounded bg-[#AAB8D4]" /><span className="w-4 h-2 rounded-sm bg-[#0F2348]" /><span className="w-3.5 h-1.5 rounded bg-[#AAB8D4]" /></div>),
    'nav-dark':         shell(<div className="w-16 h-8 bg-[#0A0F1E] flex items-center justify-between px-1.5"><span className="w-4 h-1.5 rounded bg-white" /><span className="w-6 h-1 rounded bg-[#4A5A7A]" /><span className="w-4 h-2 rounded bg-white" /></div>),
    'nav-transparent':  shell(<div className="w-16 h-8 bg-gradient-to-r from-[#1E3A8A]/40 to-[#1E40AF]/40 flex items-center justify-between px-1.5"><span className="w-4 h-1.5 rounded bg-white/80" /><span className="w-6 h-1 rounded bg-white/40" /></div>),
    'sidebar-nav':      shell(<div className="w-16 h-10 flex gap-1"><span className="w-4 h-full rounded-sm bg-[#F7F9FD] border border-[#E2E8F4] flex flex-col gap-0.5 p-0.5"><span className="w-full h-1.5 rounded-sm bg-[#EEF3FF]" />{[0,1,2].map(i=><span key={i} className="w-full h-1.5 rounded-sm bg-[#D8E1F0]"/>)}</span><span className="flex-1 bg-white border border-[#E2E8F4] rounded-sm" /></div>),
    'breadcrumb':       shell(<div className="flex items-center gap-0.5"><span className="text-[8px] text-[#8899BB]">Home</span><span className="text-[8px] text-[#C5D0E4]">/</span><span className="text-[8px] text-[#8899BB]">Products</span><span className="text-[8px] text-[#C5D0E4]">/</span><span className="text-[8px] font-bold text-[#0F2348]">Page</span></div>),
    'tabs-nav':         shell(<div className="flex gap-0.5"><span className="px-1.5 py-0.5 text-[8px] font-bold text-[#2348D7] bg-[#EEF3FF] rounded">Tab</span>{[0,1,2].map(i=><span key={i} className="px-1.5 py-0.5 text-[8px] text-[#9AA8C0] rounded">Tab</span>)}</div>),
    'pagination':       shell(<div className="flex gap-0.5 items-center"><span className="px-1 py-0.5 text-[8px] border border-[#D8E1F0] rounded text-[#6B7B9A]">‹</span>{[1,2,3].map(i=><span key={i} className={`w-5 h-5 text-[8px] flex items-center justify-center rounded ${i===1?'bg-[#2348D7] text-white':'border border-[#D8E1F0] text-[#6B7B9A]'}`}>{i}</span>)}<span className="px-1 py-0.5 text-[8px] border border-[#D8E1F0] rounded text-[#6B7B9A]">›</span></div>),

    // ── Component previews ─────────────────────────────────────────────────
    'badge':            shell(<span className="px-2 py-0.5 text-[9px] font-bold text-[#2348D7] bg-[#EEF3FF] rounded-full">New</span>),
    'tag-chip':         shell(<span className="px-2 py-0.5 text-[9px] font-medium text-[#2348D7] bg-[#F0F4FF] rounded-full border border-[#D8E1F0]">Design ×</span>),
    'avatar':           shell(<div className="w-9 h-9 rounded-full bg-[#C7D8FF] flex items-center justify-center text-[11px] font-bold text-[#2348D7]">JD</div>),
    'avatar-group':     shell(<div className="flex -space-x-2">{['#D8C7FF','#C7D8FF','#C7FFE0'].map((c,i)=><span key={i} className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center" style={{background:c}} />)}<span className="w-8 h-8 rounded-full bg-[#F0F4FF] border-2 border-white text-[9px] flex items-center justify-center font-bold text-[#5E6F8E]">+4</span></div>),
    'tooltip':          shell(<div className="px-2 py-1 bg-[#0F2348] rounded text-[9px] text-white whitespace-nowrap">Helpful tip</div>),
    'progress-bar':     shell(<div className="w-14 flex flex-col gap-1"><div className="w-full h-1.5 rounded-full bg-[#E8EDF6]"><div className="w-[62%] h-full rounded-full bg-[#2348D7]" /></div><span className="text-[9px] text-[#6B7B9A]">62%</span></div>),
    'rating':           shell(<div className="flex gap-0.5">{'★★★★'.split('').map((s,i)=><span key={i} className="text-[14px] text-[#F59E0B]">{s}</span>)}<span className="text-[14px] text-[#E8EDF6]">★</span></div>),
    'toggle-switch':    shell(<div className="flex items-center gap-1.5"><span className="w-8 h-4 rounded-full bg-[#2348D7] flex items-center justify-end pr-0.5"><span className="w-3 h-3 rounded-full bg-white" /></span><span className="text-[9px] text-[#21395F]">On</span></div>),
    'alert-box':        shell(<div className="w-15 px-2 py-1 bg-[#EEF3FF] border border-[#B8C8FF] rounded text-[9px] text-[#21395F]">⚠ Alert message</div>),
    'modal':            shell(<div className="relative w-16 h-10 bg-black/30 rounded flex items-center justify-center"><div className="w-10 h-7 bg-white rounded shadow text-[7px] font-bold text-[#0F2348] flex items-center justify-center">Dialog</div></div>),
    'dropdown-menu':    shell(<div className="w-12 bg-white border border-[#E2E8F4] rounded-lg shadow-sm p-1 flex flex-col gap-0.5">{['Edit','Copy','Delete'].map((t,i)=><span key={i} className={`text-[8px] px-1 py-0.5 rounded ${i===2?'text-red-500':'text-[#21395F]'}`}>{t}</span>)}</div>),
    'notification':     shell(<div className="w-14 h-8 bg-[#0F2348] rounded-xl px-2 py-1 flex flex-col justify-center"><span className="text-[8px] text-white font-bold">Saved!</span><span className="text-[7px] text-[#8899BB]">Changes saved</span></div>),

    // ── Sections previews ──────────────────────────────────────────────────
    'features-grid':    shell(<div className="flex gap-1 items-center"><div className="flex flex-col gap-1">{[0,1].map(i=><span key={i} className="w-3 h-1.5 rounded bg-[#E8EDF6]"/>)}</div>{[0,1,2].map(i=><span key={i} className="w-4 h-7 bg-[#F0F4FF] rounded border border-[#E8EDF6]" />)}</div>),
    'pricing-cards':    shell(<div className="flex items-end gap-0.5">{[{h:'h-7',c:'#F0F4FF'},{h:'h-9',c:'#0F2348'},{h:'h-7',c:'#F0F4FF'}].map((s,i)=><div key={i} className={`w-3 ${s.h} rounded border border-[#E8EDF6]`} style={{background:s.c}}/>)}</div>),
    'testimonial':      shell(<div className="flex flex-col gap-0.5 items-center"><span className="text-[24px] text-[#D8E1F0] leading-none">"</span><span className="w-12 h-1 rounded bg-[#D8E1F0]" /><span className="w-8 h-1 rounded bg-[#EEF2FA]" /></div>),
    'stats-row':        shell(<div className="w-16 h-7 bg-[#0F2348] flex items-center justify-around px-1">{[0,1,2].map(i=><div key={i} className="flex flex-col items-center gap-0.5"><span className="text-[8px] font-bold text-white">10M</span><span className="text-[6px] text-[#8899BB]">Users</span></div>)}</div>),
    'team-grid':        shell(<div className="flex gap-1">{[0,1,2,3].map(i=><div key={i} className="flex flex-col items-center gap-0.5"><div className="w-4 h-4 rounded-full bg-[#C7D8FF]" /><div className="w-4 h-1 rounded bg-[#E8EDF6]"/></div>)}</div>),
    'faq-list':         shell(<div className="flex flex-col gap-0.5">{[0,1,2].map(i=><div key={i} className="w-14 h-3 bg-[#F8FAFF] border border-[#E8EDF6] rounded flex items-center justify-between px-1"><span className="w-8 h-1 bg-[#D8E1F0] rounded"/><span className="text-[8px] text-[#C5D0E4]">+</span></div>)}</div>),
    'logo-strip':       shell(<div className="flex gap-1 items-center">{[0,1,2,3].map(i=><div key={i} className="w-5 h-3.5 rounded bg-white border border-[#E8EDF6]"/>)}</div>),
    'split-image':      shell(<div className="w-16 h-10 flex gap-1"><div className="flex-1 flex flex-col gap-1 justify-center"><span className="w-full h-1.5 bg-[#0F2348] rounded"/><span className="w-8 h-1 bg-[#D8E1F0] rounded"/><span className="w-4 h-2 bg-[#2348D7] rounded"/></div><div className="w-6 h-full bg-[#EEF3FF] rounded border border-[#D8E1F0]"/></div>),
    'newsletter':       shell(<div className="flex flex-col gap-1 items-center"><span className="text-[8px] font-bold text-[#0F2348]">Newsletter</span><div className="flex gap-0.5"><div className="w-8 h-3 bg-white border border-[#D8E1F0] rounded"/><div className="w-4 h-3 bg-[#2348D7] rounded text-[6px] text-white flex items-center justify-center">→</div></div></div>),

    // ── E-Commerce previews ────────────────────────────────────────────────
    'product-card':     shell(<div className="flex flex-col gap-1 w-12"><div className="w-full h-6 bg-[#EEF3FF] rounded"/><span className="w-full h-1.5 bg-[#0F2348] rounded"/><div className="w-full h-2.5 bg-[#2348D7] rounded text-[7px] text-white flex items-center justify-center font-bold">Add</div></div>),
    'cart-item':        shell(<div className="w-16 h-8 bg-white border border-[#E8EDF6] rounded flex items-center gap-1 px-1"><div className="w-5 h-5 bg-[#F0F4FF] rounded"/><div className="flex-1 flex flex-col gap-0.5"><span className="w-full h-1.5 bg-[#D8E1F0] rounded"/><span className="w-8 h-1 bg-[#EEF2FA] rounded"/></div><span className="text-[8px] font-bold text-[#0F2348]">$49</span></div>),
    'checkout-summary': shell(<div className="w-12 h-9 bg-[#F8FAFF] border border-[#E2E8F4] rounded flex flex-col justify-between p-1"><div className="flex justify-between"><span className="text-[7px] text-[#6B7B9A]">Sub</span><span className="text-[7px] text-[#21395F]">$99</span></div><div className="w-full h-0.5 bg-[#E2E8F4]"/><div className="w-full h-2 bg-[#2348D7] rounded text-[7px] text-white flex items-center justify-center">Pay</div></div>),
    'product-gallery':  shell(<div className="flex gap-1"><div className="w-8 h-9 bg-[#EEF3FF] rounded border border-[#D8E1F0]"/><div className="flex flex-col gap-0.5 justify-center">{[0,1,2].map(i=><div key={i} className="w-4 h-2.5 bg-[#F0F4FF] rounded border border-[#E8EDF6]"/>)}</div></div>),

    // ── Dashboard previews ─────────────────────────────────────────────────
    'stat-card':        shell(<div className="w-12 h-9 bg-white border border-[#E2E8F4] rounded-xl p-1.5"><span className="text-[6px] text-[#8899BB] block">REVENUE</span><span className="text-[10px] font-bold text-[#0F2348]">$84k</span><span className="text-[6px] text-[#16A34A]">↑ 12%</span></div>),
    'chart-card':       shell(<div className="w-14 h-9 bg-white border border-[#E2E8F4] rounded p-1 flex flex-col gap-0.5"><span className="text-[7px] font-bold text-[#0F2348]">Revenue</span><div className="flex-1 bg-[#F8FAFF] rounded flex items-end gap-0.5 px-0.5">{[3,5,4,6,5,7].map((h,i)=><div key={i} className="flex-1 rounded-t" style={{height:`${h*4}px`,background:'#2348D7',opacity:i===5?1:0.4}}/>)}</div></div>),
    'data-table':       shell(<div className="w-14 h-9 bg-white border border-[#E2E8F4] rounded overflow-hidden"><div className="w-full h-3 bg-[#F8FAFF] border-b border-[#E8EDF6] flex gap-1 px-1 items-center">{[0,1,2].map(i=><span key={i} className="flex-1 h-1 bg-[#C5D0E4] rounded"/>)}</div>{[0,1,2].map(i=><div key={i} className="w-full h-2 flex gap-1 px-1 items-center border-b border-[#F0F4FF]">{[0,1,2].map(j=><span key={j} className="flex-1 h-1 bg-[#E8EDF6] rounded"/>)}</div>)}</div>),
    'activity-feed':    shell(<div className="flex flex-col gap-0.5">{[0,1,2].map(i=><div key={i} className="w-14 h-3 bg-[#F8FAFF] rounded flex gap-1 items-center px-1"><span className="w-2 h-2 rounded-full bg-[#2348D7]"/><span className="flex-1 h-1 bg-[#D8E1F0] rounded"/></div>)}</div>),

    // ── Social previews ────────────────────────────────────────────────────
    'social-post':      shell(<div className="w-14 h-9 bg-white border border-[#E2E8F4] rounded p-1"><div className="flex gap-0.5 mb-0.5"><span className="w-2.5 h-2.5 rounded-full bg-[#C7D8FF]"/><span className="w-8 h-1 rounded bg-[#D8E1F0]"/></div><div className="w-full h-1 bg-[#E8EDF6] rounded mb-0.5"/><div className="w-full h-4 bg-[#F0F4FF] rounded"/></div>),
    'blog-card':        shell(<div className="flex flex-col gap-0.5 w-12"><div className="w-full h-5 bg-[#EEF3FF] rounded"/><span className="text-[7px] text-[#2348D7] font-bold">DESIGN</span><span className="w-full h-1 bg-[#D8E1F0] rounded"/><span className="w-9 h-1 bg-[#E8EDF6] rounded"/></div>),
    'comment':          shell(<div className="flex gap-0.5 w-full px-1"><span className="w-4 h-4 rounded-full bg-[#C7E8FF] flex-shrink-0"/><div className="flex-1 bg-[#F8FAFF] border border-[#E8EDF6] rounded p-0.5"><span className="text-[7px] font-bold text-[#0F2348]">Alex</span><div className="w-full h-2 bg-[#E8EDF6] rounded mt-0.5"/></div></div>),
    'social-links':     shell(<div className="flex gap-1">{['#000','#0077B5','#24292E','#EA4C89'].map((c,i)=><span key={i} className="w-5 h-5 rounded-lg flex items-center justify-center text-[8px] text-white font-bold" style={{background:c}}>{['𝕏','in','gh','●'][i]}</span>)}</div>),

    // ── Mobile previews ────────────────────────────────────────────────────
    'mobile-nav':       shell(<div className="w-14 h-6 bg-white border-t border-[#E2E8F4] flex items-center justify-around px-1">{['⌂','⌕','+','🔔','👤'].map((ic,i)=><span key={i} className={`text-[${i===2?'14':'10'}px] ${i===0?'text-[#2348D7]':'text-[#9AA8C0]'}`}>{ic}</span>)}</div>),
    'mobile-card':      shell(<div className="w-14 h-9 bg-white border border-[#E2E8F4] rounded-xl flex gap-1 p-1"><div className="w-5 h-full bg-[#EEF3FF] rounded-lg"/><div className="flex flex-col gap-0.5 justify-center"><span className="w-7 h-1.5 bg-[#0F2348] rounded"/><span className="w-6 h-1 bg-[#D8E1F0] rounded"/><span className="w-3 h-1.5 bg-[#EEF3FF] rounded"/></div></div>),
    'app-header':       shell(<div className="w-14 h-5 bg-white border-b border-[#E2E8F4] flex items-center justify-between px-1"><span className="text-[9px] text-[#0F2348]">←</span><span className="text-[8px] font-bold text-[#0F2348]">Dashboard</span><span className="text-[9px] text-[#0F2348]">⋯</span></div>),
  }

  return previews[id] || shell(<Box size={28} color="#7D8CA8" />)
}

// ─── Drag ghost helper (identical to original) ────────────────────────────────

function createDragGhost(label) {
  const ghost = document.createElement('div')
  ghost.style.cssText = `
    position: fixed; top: -1000px; left: -1000px;
    background: #2348D7; color: white;
    padding: 6px 14px; border-radius: 8px;
    font-size: 12px; font-weight: 600;
    font-family: inherit;
    pointer-events: none; white-space: nowrap;
    z-index: 9999;
  `
  ghost.textContent = `+ ${label}`
  document.body.appendChild(ghost)
  return ghost
}

// ─── Category sub-groups for the new "More" overflow section ─────────────────

const CATEGORY_GROUPS = [
  { groupLabel: 'Core',    ids: ['basics', 'text', 'media', 'icons', 'forms', 'layout'] },
  { groupLabel: 'Builder', ids: ['navigation', 'components', 'sections'] },
  { groupLabel: 'Product', ids: ['ecommerce', 'dashboard', 'social', 'mobile'] },
]

// ─── Main component ───────────────────────────────────────────────────────────

export default function InsertPanel({ onInsert, onDragStart, onDragEnd }) {
  const [activeId, setActiveId]         = useState('basics')
  const [search, setSearch]             = useState('')
  const [groupOpen, setGroupOpen]       = useState({ Core: true, Builder: false, Product: false })
  const ghostRef = useRef(null)

  const activeCategory = CATEGORIES.find(c => c.id === activeId) || CATEGORIES[0]
  const allItems = CATEGORIES.flatMap(c => c.items)
  const query = search.trim().toLowerCase()
  const displayItems = query
    ? allItems.filter(item => `${item.label} ${item.description}`.toLowerCase().includes(query))
    : activeCategory.items

  // ── Drag handlers (identical to original) ──────────────────────────────────

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData('application/x-builder-element', JSON.stringify(item))
    e.dataTransfer.effectAllowed = 'copy'
    const ghost = createDragGhost(item.label)
    ghostRef.current = ghost
    e.dataTransfer.setDragImage(ghost, 40, 18)
    onDragStart?.(item)
  }

  const handleDragEnd = () => {
    if (ghostRef.current) {
      document.body.removeChild(ghostRef.current)
      ghostRef.current = null
    }
    onDragEnd?.()
  }

  const toggleGroup = (label) =>
    setGroupOpen(prev => ({ ...prev, [label]: !prev[label] }))

  return (
    <div className="flex h-full w-[min(324px,100vw)] bg-white border-r border-[#E2E8F4]">

      {/* ── Category sidebar (enhanced with groups) ─────────────────────── */}
      <aside className="w-[80px] border-r border-[#EEF2FA] flex flex-col overflow-y-auto">
        {CATEGORY_GROUPS.map(group => {
          const groupCats = group.ids.map(id => CATEGORIES.find(c => c.id === id)).filter(Boolean)
          const isOpen = groupOpen[group.groupLabel]

          return (
            <div key={group.groupLabel}>
              {/* Group header button */}
              <button
                onClick={() => toggleGroup(group.groupLabel)}
                className="w-full flex items-center justify-between px-2 py-1.5 text-[9px] font-bold uppercase tracking-widest text-[#B0BDD4] hover:text-[#6F7E99] transition-colors"
                title={`${isOpen ? 'Collapse' : 'Expand'} ${group.groupLabel}`}
              >
                <span className="truncate">{group.groupLabel}</span>
                <span className={`transition-transform duration-150 ${isOpen ? '' : '-rotate-90'}`}>
                  <ChevronDown size={10} />
                </span>
              </button>

              {/* Category buttons in this group */}
              {isOpen && groupCats.map(cat => {
                const Icon = cat.icon
                const isActive = activeId === cat.id && !query
                return (
                  <button
                    key={cat.id}
                    onClick={() => { setActiveId(cat.id); setSearch('') }}
                    className={`w-full h-14 rounded-xl mx-auto flex flex-col items-center justify-center gap-1 text-[11px] font-semibold transition-all ${
                      isActive
                        ? 'bg-[#EEF3FF] text-[#2348D7]'
                        : 'text-[#6F7E99] hover:bg-[#F7F9FD] hover:text-[#0F2348]'
                    }`}
                    title={cat.label}
                  >
                    <Icon size={17} />
                    {cat.label}
                  </button>
                )
              })}
            </div>
          )
        })}
      </aside>

      {/* ── Items panel (identical structure to original) ─────────────────── */}
      <section className="flex-1 min-w-0 flex flex-col">

        {/* Header + search */}
        <div className="px-3 py-3 border-b border-[#EEF2FA]">
          <div className="flex items-center gap-2 mb-3">
            <MousePointerClick size={15} color="#2348D7" />
            <h2 className="text-sm font-bold text-[#0F2348]">
              {query ? 'Search' : activeCategory.label}
            </h2>
            {/* Item count badge */}
            <span className="ml-auto text-[9px] font-bold text-[#AAB8D4] bg-[#F0F4FF] px-1.5 py-0.5 rounded-full">
              {displayItems.length}
            </span>
          </div>
          <div className="h-9 rounded-xl bg-[#F7F9FD] border border-[#DFE6F2] flex items-center gap-2 px-3">
            <Search size={13} color="#94A3BD" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search elements…"
              className="w-full bg-transparent outline-none text-xs text-[#21395F] placeholder:text-[#9AA8C0]"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="text-[#94A3BD] hover:text-[#41506C] transition-colors"
              >
                <X size={11} />
              </button>
            )}
          </div>
          <p className="mt-2 text-[9px] text-[#C5D0E4] text-center">
            Drag onto canvas · click to insert
          </p>
        </div>

        {/* Scrollable grid */}
        <div className="flex-1 overflow-y-auto p-3">
          {displayItems.length === 0 ? (
            <div className="mt-10 flex flex-col items-center gap-2">
              <Search size={28} color="#C5D0E4" />
              <p className="text-center text-xs text-[#AAB8D4]">No elements found</p>
              <button
                onClick={() => setSearch('')}
                className="text-[10px] text-[#2348D7] font-semibold hover:underline"
              >
                Clear search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {displayItems.map(item => (
                <button
                  key={item.id}
                  draggable
                  onDragStart={e => handleDragStart(e, item)}
                  onDragEnd={handleDragEnd}
                  onClick={() => onInsert(item)}
                  className="group text-left rounded-xl border border-[#E2E8F4] bg-white p-2 transition-all hover:border-[#2348D7] hover:bg-[#EEF3FF] focus:outline-none focus:border-[#2348D7] focus:bg-[#EEF3FF]"
                  style={{ cursor: 'grab' }}
                >
                  <Preview id={item.id} />
                  <span className="mt-2 block text-[11px] font-bold text-[#0F2348] leading-tight">
                    {item.label}
                  </span>
                  <span className="mt-0.5 block text-[9px] text-[#8A9ABB] leading-snug">
                    {item.description}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

      </section>
    </div>
  )
}