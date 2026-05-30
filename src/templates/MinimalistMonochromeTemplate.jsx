// ─────────────────────────────────────────────────────────────────────────────
// MinimalistMonochrome Template
// High-end editorial / luxury brand conference landing page
// Supports: light (white canvas) and dark (inverted black canvas) themes
// ID prefix: mm-
// ─────────────────────────────────────────────────────────────────────────────

// ── Base element definitions (light theme is canonical) ───────────────────────

export const minimalistMonochromeElements = [

  // ── Navigation ──────────────────────────────────────────────────────────────
  { id: 'mm-nav-bg',       type: 'container', name: 'Navigation Bar',        x: 0,    y: 0,    width: 1200, height: 72,  fill: '#FFFFFF',         borderColor: '#000000',  radius: 0, opacity: 100 },
  { id: 'mm-nav-border',   type: 'container', name: 'Nav Bottom Rule',       x: 0,    y: 71,   width: 1200, height: 2,   fill: '#000000',         radius: 0, opacity: 100 },
  { id: 'mm-logo',         type: 'heading',   name: 'Logo Text',             x: 48,   y: 16,   width: 220,  height: 40,  content: 'FORMA',        fontSize: 28, fontWeight: 700, fontFamily: 'Playfair Display, Georgia, serif', textColor: '#000000', opacity: 100 },
  { id: 'mm-nav-links',    type: 'paragraph', name: 'Navigation Links',      x: 408,  y: 26,   width: 420,  height: 22,  content: 'Program     Speakers     Tickets     Venue', fontSize: 12, fontWeight: 400, fontFamily: 'JetBrains Mono, monospace', textColor: '#000000', textAlign: 'center', opacity: 100 },
  { id: 'mm-nav-cta',      type: 'button',    name: 'Navigation CTA',        x: 1024, y: 16,   width: 130,  height: 40,  content: 'REGISTER', fill: '#000000', textColor: '#FFFFFF', fontSize: 11, fontWeight: 500, fontFamily: 'JetBrains Mono, monospace', radius: 0, opacity: 100 },

  // ── Hero Section ─────────────────────────────────────────────────────────────
  { id: 'mm-hero-bg',       type: 'container', name: 'Hero Background',      x: 0,    y: 73,   width: 1200, height: 700, fill: '#FFFFFF',         radius: 0, opacity: 100 },
  { id: 'mm-hero-rule-top', type: 'container', name: 'Hero Rule Top',        x: 48,   y: 140,  width: 4,    height: 56,  fill: '#000000',         radius: 0, opacity: 100 },
  { id: 'mm-hero-eyebrow',  type: 'label',     name: 'Hero Eyebrow',         x: 68,   y: 140,  width: 480,  height: 22,  content: 'SEPTEMBER 18–20, 2026  /  NEW YORK CITY', fontSize: 11, fontWeight: 400, fontFamily: 'JetBrains Mono, monospace', textColor: '#525252', fill: 'transparent', radius: 0, opacity: 100 },
  { id: 'mm-hero-title-1',  type: 'heading',   name: 'Hero Title Word 1',    x: 44,   y: 172,  width: 1100, height: 160, content: 'DESIGN',       fontSize: 148, fontWeight: 700, fontFamily: 'Playfair Display, Georgia, serif', textColor: '#000000', lineHeight: 1, opacity: 100 },
  { id: 'mm-hero-title-2',  type: 'heading',   name: 'Hero Title Word 2',    x: 44,   y: 322,  width: 1100, height: 160, content: 'MATTERS.',     fontSize: 148, fontWeight: 700, fontFamily: 'Playfair Display, Georgia, serif', textColor: '#000000', lineHeight: 1, opacity: 100 },
  { id: 'mm-hero-rule-h',   type: 'container', name: 'Hero Horizontal Rule', x: 0,    y: 500,  width: 1200, height: 4,   fill: '#000000',         radius: 0, opacity: 100 },
  { id: 'mm-hero-sub',      type: 'paragraph', name: 'Hero Subtitle',        x: 48,   y: 524,  width: 580,  height: 68,  content: 'Three days exploring the intersections of craft, culture, and commercial design — with the practitioners who refuse to compromise either.',  fontSize: 18, fontWeight: 400, fontFamily: 'Source Serif 4, Georgia, serif', textColor: '#000000', lineHeight: 1.625, opacity: 100 },
  { id: 'mm-hero-btn-pri',  type: 'button',    name: 'Hero Primary CTA',     x: 48,   y: 622,  width: 200,  height: 52,  content: 'GET TICKETS →', fill: '#000000', textColor: '#FFFFFF', fontSize: 12, fontWeight: 500, fontFamily: 'JetBrains Mono, monospace', radius: 0, opacity: 100 },
  { id: 'mm-hero-btn-sec',  type: 'button',    name: 'Hero Secondary CTA',   x: 264,  y: 622,  width: 200,  height: 52,  content: 'VIEW PROGRAM', fill: 'transparent', textColor: '#000000', borderColor: '#000000', fontSize: 12, fontWeight: 500, fontFamily: 'JetBrains Mono, monospace', radius: 0, opacity: 100 },
  { id: 'mm-hero-stat-a',   type: 'heading',   name: 'Hero Stat 1 Value',    x: 760,  y: 540,  width: 140,  height: 56,  content: '64',           fontSize: 52, fontWeight: 700, fontFamily: 'Playfair Display, Georgia, serif', textColor: '#000000', opacity: 100 },
  { id: 'mm-hero-stat-al',  type: 'paragraph', name: 'Hero Stat 1 Label',    x: 760,  y: 600,  width: 140,  height: 18,  content: 'SPEAKERS',     fontSize: 10, fontFamily: 'JetBrains Mono, monospace', textColor: '#525252', opacity: 100 },
  { id: 'mm-hero-divv-1',   type: 'container', name: 'Hero Stat Divider 1',  x: 920,  y: 540,  width: 1,    height: 72,  fill: '#000000',         radius: 0, opacity: 100 },
  { id: 'mm-hero-stat-b',   type: 'heading',   name: 'Hero Stat 2 Value',    x: 940,  y: 540,  width: 120,  height: 56,  content: '3',            fontSize: 52, fontWeight: 700, fontFamily: 'Playfair Display, Georgia, serif', textColor: '#000000', opacity: 100 },
  { id: 'mm-hero-stat-bl',  type: 'paragraph', name: 'Hero Stat 2 Label',    x: 940,  y: 600,  width: 120,  height: 18,  content: 'DAYS',         fontSize: 10, fontFamily: 'JetBrains Mono, monospace', textColor: '#525252', opacity: 100 },
  { id: 'mm-hero-divv-2',   type: 'container', name: 'Hero Stat Divider 2',  x: 1076, y: 540,  width: 1,    height: 72,  fill: '#000000',         radius: 0, opacity: 100 },
  { id: 'mm-hero-stat-c',   type: 'heading',   name: 'Hero Stat 3 Value',    x: 1096, y: 540,  width: 100,  height: 56,  content: '12',           fontSize: 52, fontWeight: 700, fontFamily: 'Playfair Display, Georgia, serif', textColor: '#000000', opacity: 100 },
  { id: 'mm-hero-stat-cl',  type: 'paragraph', name: 'Hero Stat 3 Label',    x: 1096, y: 600,  width: 100,  height: 18,  content: 'TRACKS',       fontSize: 10, fontFamily: 'JetBrains Mono, monospace', textColor: '#525252', opacity: 100 },
  { id: 'mm-hero-rule-bot', type: 'container', name: 'Hero Rule Bottom',     x: 0,    y: 772,  width: 1200, height: 2,   fill: '#000000',         radius: 0, opacity: 100 },

  // ── About / Overview ─────────────────────────────────────────────────────────
  { id: 'mm-about-bg',      type: 'container', name: 'About Background',     x: 0,    y: 774,  width: 1200, height: 380, fill: '#F5F5F5',         radius: 0, opacity: 100 },
  { id: 'mm-about-kicker',  type: 'label',     name: 'About Kicker',         x: 48,   y: 840,  width: 200,  height: 20,  content: '01  /  ABOUT', fontSize: 10, fontWeight: 400, fontFamily: 'JetBrains Mono, monospace', textColor: '#525252', fill: 'transparent', radius: 0, opacity: 100 },
  { id: 'mm-about-title',   type: 'heading',   name: 'About Heading',        x: 48,   y: 874,  width: 560,  height: 110, content: 'The conference\nfor serious designers.', fontSize: 44, fontWeight: 700, fontFamily: 'Playfair Display, Georgia, serif', textColor: '#000000', lineHeight: 1.2, opacity: 100 },
  { id: 'mm-about-body',    type: 'paragraph', name: 'About Body',           x: 48,   y: 1006, width: 480,  height: 108, content: 'FORMA is not a networking event. It is not a trade show. It is three days of rigorous conversation about what design is, who it serves, and what it demands of those who practice it. No sponsored sessions. No vendor booths. Just ideas.', fontSize: 16, fontFamily: 'Source Serif 4, Georgia, serif', textColor: '#000000', lineHeight: 1.625, opacity: 100 },
  { id: 'mm-about-pull',    type: 'heading',   name: 'About Pull Quote',     x: 680,  y: 854,  width: 460,  height: 200, content: '"Design is not what it looks like. Design is how it works — and whether that work is worth doing."', fontSize: 22, fontWeight: 400, fontFamily: 'Playfair Display, Georgia, serif', textColor: '#000000', lineHeight: 1.5, opacity: 100 },
  { id: 'mm-about-attr',    type: 'paragraph', name: 'About Attribution',    x: 680,  y: 1062, width: 300,  height: 20,  content: '— FORMA Editorial Board, 2026', fontSize: 11, fontFamily: 'JetBrains Mono, monospace', textColor: '#525252', opacity: 100 },
  { id: 'mm-about-rule',    type: 'container', name: 'About Bottom Rule',    x: 0,    y: 1153, width: 1200, height: 4,   fill: '#000000',         radius: 0, opacity: 100 },

  // ── Speakers Section ─────────────────────────────────────────────────────────
  { id: 'mm-speak-bg',      type: 'container', name: 'Speakers Background',  x: 0,    y: 1157, width: 1200, height: 600, fill: '#FFFFFF',         radius: 0, opacity: 100 },
  { id: 'mm-speak-kicker',  type: 'label',     name: 'Speakers Kicker',      x: 48,   y: 1220, width: 200,  height: 20,  content: '02  /  SPEAKERS', fontSize: 10, fontWeight: 400, fontFamily: 'JetBrains Mono, monospace', textColor: '#525252', fill: 'transparent', radius: 0, opacity: 100 },
  { id: 'mm-speak-title',   type: 'heading',   name: 'Speakers Heading',     x: 48,   y: 1254, width: 700,  height: 80,  content: 'Practitioners,\nnot pundits.',  fontSize: 56, fontWeight: 700, fontFamily: 'Playfair Display, Georgia, serif', textColor: '#000000', lineHeight: 1.1, opacity: 100 },
  // Speaker card 1
  { id: 'mm-sp-c1',   type: 'container', name: 'Speaker Card 1',            x: 48,   y: 1382, width: 258,  height: 290, fill: '#FFFFFF',  borderColor: '#000000', radius: 0, opacity: 100 },
  { id: 'mm-sp-img1', type: 'container', name: 'Speaker Image 1',           x: 48,   y: 1382, width: 258,  height: 172, fill: '#F5F5F5',  radius: 0, opacity: 100 },
  { id: 'mm-sp-n1',   type: 'heading',   name: 'Speaker 1 Name',            x: 64,   y: 1568, width: 226,  height: 34,  content: 'Mara Osei',   fontSize: 20, fontWeight: 700, fontFamily: 'Playfair Display, Georgia, serif', textColor: '#000000', opacity: 100 },
  { id: 'mm-sp-r1',   type: 'paragraph', name: 'Speaker 1 Role',            x: 64,   y: 1606, width: 226,  height: 40,  content: 'Creative Director\nPentagram',  fontSize: 12, fontFamily: 'JetBrains Mono, monospace', textColor: '#525252', lineHeight: 1.5, opacity: 100 },
  { id: 'mm-sp-div1', type: 'container', name: 'Speaker Divider 1',         x: 64,   y: 1554, width: 226,  height: 1,   fill: '#000000', radius: 0, opacity: 100 },
  // Speaker card 2
  { id: 'mm-sp-c2',   type: 'container', name: 'Speaker Card 2',            x: 326,  y: 1382, width: 258,  height: 290, fill: '#000000',  borderColor: '#000000', radius: 0, opacity: 100 },
  { id: 'mm-sp-img2', type: 'container', name: 'Speaker Image 2',           x: 326,  y: 1382, width: 258,  height: 172, fill: '#1A1A1A',  radius: 0, opacity: 100 },
  { id: 'mm-sp-n2',   type: 'heading',   name: 'Speaker 2 Name',            x: 342,  y: 1568, width: 226,  height: 34,  content: 'Lars Henriksen', fontSize: 20, fontWeight: 700, fontFamily: 'Playfair Display, Georgia, serif', textColor: '#FFFFFF', opacity: 100 },
  { id: 'mm-sp-r2',   type: 'paragraph', name: 'Speaker 2 Role',            x: 342,  y: 1606, width: 226,  height: 40,  content: 'Typographer\nFreelance, Oslo',  fontSize: 12, fontFamily: 'JetBrains Mono, monospace', textColor: '#E5E5E5', lineHeight: 1.5, opacity: 100 },
  { id: 'mm-sp-div2', type: 'container', name: 'Speaker Divider 2',         x: 342,  y: 1554, width: 226,  height: 1,   fill: '#FFFFFF', radius: 0, opacity: 100 },
  // Speaker card 3
  { id: 'mm-sp-c3',   type: 'container', name: 'Speaker Card 3',            x: 604,  y: 1382, width: 258,  height: 290, fill: '#FFFFFF',  borderColor: '#000000', radius: 0, opacity: 100 },
  { id: 'mm-sp-img3', type: 'container', name: 'Speaker Image 3',           x: 604,  y: 1382, width: 258,  height: 172, fill: '#F5F5F5',  radius: 0, opacity: 100 },
  { id: 'mm-sp-n3',   type: 'heading',   name: 'Speaker 3 Name',            x: 620,  y: 1568, width: 226,  height: 34,  content: 'Priya Anand',  fontSize: 20, fontWeight: 700, fontFamily: 'Playfair Display, Georgia, serif', textColor: '#000000', opacity: 100 },
  { id: 'mm-sp-r3',   type: 'paragraph', name: 'Speaker 3 Role',            x: 620,  y: 1606, width: 226,  height: 40,  content: 'Principal Designer\nApple',  fontSize: 12, fontFamily: 'JetBrains Mono, monospace', textColor: '#525252', lineHeight: 1.5, opacity: 100 },
  { id: 'mm-sp-div3', type: 'container', name: 'Speaker Divider 3',         x: 620,  y: 1554, width: 226,  height: 1,   fill: '#000000', radius: 0, opacity: 100 },
  // Speaker card 4
  { id: 'mm-sp-c4',   type: 'container', name: 'Speaker Card 4',            x: 882,  y: 1382, width: 258,  height: 290, fill: '#FFFFFF',  borderColor: '#000000', radius: 0, opacity: 100 },
  { id: 'mm-sp-img4', type: 'container', name: 'Speaker Image 4',           x: 882,  y: 1382, width: 258,  height: 172, fill: '#F5F5F5',  radius: 0, opacity: 100 },
  { id: 'mm-sp-n4',   type: 'heading',   name: 'Speaker 4 Name',            x: 898,  y: 1568, width: 226,  height: 34,  content: 'Tom Elliot',   fontSize: 20, fontWeight: 700, fontFamily: 'Playfair Display, Georgia, serif', textColor: '#000000', opacity: 100 },
  { id: 'mm-sp-r4',   type: 'paragraph', name: 'Speaker 4 Role',            x: 898,  y: 1606, width: 226,  height: 40,  content: 'Partner\nOko Design Studio',  fontSize: 12, fontFamily: 'JetBrains Mono, monospace', textColor: '#525252', lineHeight: 1.5, opacity: 100 },
  { id: 'mm-sp-div4', type: 'container', name: 'Speaker Divider 4',         x: 898,  y: 1554, width: 226,  height: 1,   fill: '#000000', radius: 0, opacity: 100 },
  { id: 'mm-speak-rule', type: 'container', name: 'Speakers Bottom Rule',   x: 0,    y: 1756, width: 1200, height: 4,   fill: '#000000',         radius: 0, opacity: 100 },

  // ── Stats Band (Inverted) ────────────────────────────────────────────────────
  { id: 'mm-stats-bg',      type: 'container', name: 'Stats Background',     x: 0,    y: 1760, width: 1200, height: 200, fill: '#000000',         radius: 0, opacity: 100 },
  { id: 'mm-stat-1v',       type: 'heading',   name: 'Stat 1 Value',         x: 80,   y: 1808, width: 200,  height: 64,  content: '64',           fontSize: 60, fontWeight: 700, fontFamily: 'Playfair Display, Georgia, serif', textColor: '#FFFFFF', opacity: 100 },
  { id: 'mm-stat-1l',       type: 'paragraph', name: 'Stat 1 Label',         x: 80,   y: 1876, width: 200,  height: 18,  content: 'SPEAKERS',     fontSize: 10, fontFamily: 'JetBrains Mono, monospace', textColor: '#E5E5E5', opacity: 100 },
  { id: 'mm-stat-div1',     type: 'container', name: 'Stats Divider 1',      x: 354,  y: 1808, width: 1,    height: 88,  fill: '#FFFFFF',         radius: 0, opacity: 25 },
  { id: 'mm-stat-2v',       type: 'heading',   name: 'Stat 2 Value',         x: 390,  y: 1808, width: 200,  height: 64,  content: '3',            fontSize: 60, fontWeight: 700, fontFamily: 'Playfair Display, Georgia, serif', textColor: '#FFFFFF', opacity: 100 },
  { id: 'mm-stat-2l',       type: 'paragraph', name: 'Stat 2 Label',         x: 390,  y: 1876, width: 200,  height: 18,  content: 'DAYS',         fontSize: 10, fontFamily: 'JetBrains Mono, monospace', textColor: '#E5E5E5', opacity: 100 },
  { id: 'mm-stat-div2',     type: 'container', name: 'Stats Divider 2',      x: 662,  y: 1808, width: 1,    height: 88,  fill: '#FFFFFF',         radius: 0, opacity: 25 },
  { id: 'mm-stat-3v',       type: 'heading',   name: 'Stat 3 Value',         x: 698,  y: 1808, width: 200,  height: 64,  content: '12',           fontSize: 60, fontWeight: 700, fontFamily: 'Playfair Display, Georgia, serif', textColor: '#FFFFFF', opacity: 100 },
  { id: 'mm-stat-3l',       type: 'paragraph', name: 'Stat 3 Label',         x: 698,  y: 1876, width: 200,  height: 18,  content: 'TRACKS',       fontSize: 10, fontFamily: 'JetBrains Mono, monospace', textColor: '#E5E5E5', opacity: 100 },
  { id: 'mm-stat-div3',     type: 'container', name: 'Stats Divider 3',      x: 970,  y: 1808, width: 1,    height: 88,  fill: '#FFFFFF',         radius: 0, opacity: 25 },
  { id: 'mm-stat-4v',       type: 'heading',   name: 'Stat 4 Value',         x: 1006, y: 1808, width: 160,  height: 64,  content: '2,400',        fontSize: 60, fontWeight: 700, fontFamily: 'Playfair Display, Georgia, serif', textColor: '#FFFFFF', opacity: 100 },
  { id: 'mm-stat-4l',       type: 'paragraph', name: 'Stat 4 Label',         x: 1006, y: 1876, width: 160,  height: 18,  content: 'ATTENDEES',    fontSize: 10, fontFamily: 'JetBrains Mono, monospace', textColor: '#E5E5E5', opacity: 100 },
  { id: 'mm-stats-rule',    type: 'container', name: 'Stats Bottom Rule',    x: 0,    y: 1959, width: 1200, height: 4,   fill: '#000000',         radius: 0, opacity: 100 },

  // ── Schedule / Agenda ────────────────────────────────────────────────────────
  { id: 'mm-sched-bg',      type: 'container', name: 'Schedule Background',  x: 0,    y: 1963, width: 1200, height: 560, fill: '#FFFFFF',         radius: 0, opacity: 100 },
  { id: 'mm-sched-kicker',  type: 'label',     name: 'Schedule Kicker',      x: 48,   y: 2024, width: 200,  height: 20,  content: '03  /  PROGRAM', fontSize: 10, fontWeight: 400, fontFamily: 'JetBrains Mono, monospace', textColor: '#525252', fill: 'transparent', radius: 0, opacity: 100 },
  { id: 'mm-sched-title',   type: 'heading',   name: 'Schedule Heading',     x: 48,   y: 2058, width: 620,  height: 96,  content: 'Three days.\nEvery minute counts.',  fontSize: 44, fontWeight: 700, fontFamily: 'Playfair Display, Georgia, serif', textColor: '#000000', lineHeight: 1.15, opacity: 100 },
  // Schedule rows
  { id: 'mm-sched-row-div0',type: 'container', name: 'Schedule Row Rule 0',  x: 48,   y: 2194, width: 1104, height: 1,   fill: '#000000',  radius: 0, opacity: 100 },
  { id: 'mm-sched-t1',      type: 'label',     name: 'Row 1 Time',           x: 48,   y: 2210, width: 100,  height: 22,  content: '09:00',        fontSize: 12, fontFamily: 'JetBrains Mono, monospace', textColor: '#525252', fill: 'transparent', radius: 0, opacity: 100 },
  { id: 'mm-sched-d1',      type: 'label',     name: 'Row 1 Day',            x: 166,  y: 2210, width: 90,   height: 22,  content: 'DAY ONE',      fontSize: 11, fontFamily: 'JetBrains Mono, monospace', textColor: '#525252', fill: 'transparent', radius: 0, opacity: 100 },
  { id: 'mm-sched-a1',      type: 'heading',   name: 'Row 1 Session',        x: 320,  y: 2206, width: 700,  height: 30,  content: 'Opening Address: The State of Design', fontSize: 20, fontWeight: 700, fontFamily: 'Playfair Display, Georgia, serif', textColor: '#000000', opacity: 100 },
  { id: 'mm-sched-row-div1',type: 'container', name: 'Schedule Row Rule 1',  x: 48,   y: 2254, width: 1104, height: 1,   fill: '#E5E5E5', radius: 0, opacity: 100 },
  { id: 'mm-sched-t2',      type: 'label',     name: 'Row 2 Time',           x: 48,   y: 2270, width: 100,  height: 22,  content: '11:30',        fontSize: 12, fontFamily: 'JetBrains Mono, monospace', textColor: '#525252', fill: 'transparent', radius: 0, opacity: 100 },
  { id: 'mm-sched-d2',      type: 'label',     name: 'Row 2 Day',            x: 166,  y: 2270, width: 90,   height: 22,  content: 'DAY ONE',      fontSize: 11, fontFamily: 'JetBrains Mono, monospace', textColor: '#525252', fill: 'transparent', radius: 0, opacity: 100 },
  { id: 'mm-sched-a2',      type: 'heading',   name: 'Row 2 Session',        x: 320,  y: 2266, width: 700,  height: 30,  content: 'Workshop: Systems Thinking in Brand Identity', fontSize: 20, fontWeight: 700, fontFamily: 'Playfair Display, Georgia, serif', textColor: '#000000', opacity: 100 },
  { id: 'mm-sched-row-div2',type: 'container', name: 'Schedule Row Rule 2',  x: 48,   y: 2314, width: 1104, height: 1,   fill: '#E5E5E5', radius: 0, opacity: 100 },
  { id: 'mm-sched-t3',      type: 'label',     name: 'Row 3 Time',           x: 48,   y: 2330, width: 100,  height: 22,  content: '14:00',        fontSize: 12, fontFamily: 'JetBrains Mono, monospace', textColor: '#525252', fill: 'transparent', radius: 0, opacity: 100 },
  { id: 'mm-sched-d3',      type: 'label',     name: 'Row 3 Day',            x: 166,  y: 2330, width: 90,   height: 22,  content: 'DAY TWO',      fontSize: 11, fontFamily: 'JetBrains Mono, monospace', textColor: '#525252', fill: 'transparent', radius: 0, opacity: 100 },
  { id: 'mm-sched-a3',      type: 'heading',   name: 'Row 3 Session',        x: 320,  y: 2326, width: 700,  height: 30,  content: 'Panel: Typography in the Age of Variable Fonts', fontSize: 20, fontWeight: 700, fontFamily: 'Playfair Display, Georgia, serif', textColor: '#000000', opacity: 100 },
  { id: 'mm-sched-row-div3',type: 'container', name: 'Schedule Row Rule 3',  x: 48,   y: 2374, width: 1104, height: 1,   fill: '#E5E5E5', radius: 0, opacity: 100 },
  { id: 'mm-sched-t4',      type: 'label',     name: 'Row 4 Time',           x: 48,   y: 2390, width: 100,  height: 22,  content: '17:00',        fontSize: 12, fontFamily: 'JetBrains Mono, monospace', textColor: '#525252', fill: 'transparent', radius: 0, opacity: 100 },
  { id: 'mm-sched-d4',      type: 'label',     name: 'Row 4 Day',            x: 166,  y: 2390, width: 90,   height: 22,  content: 'DAY THREE',    fontSize: 11, fontFamily: 'JetBrains Mono, monospace', textColor: '#525252', fill: 'transparent', radius: 0, opacity: 100 },
  { id: 'mm-sched-a4',      type: 'heading',   name: 'Row 4 Session',        x: 320,  y: 2386, width: 700,  height: 30,  content: 'Closing Keynote: What We Build Next', fontSize: 20, fontWeight: 700, fontFamily: 'Playfair Display, Georgia, serif', textColor: '#000000', opacity: 100 },
  { id: 'mm-sched-row-div4',type: 'container', name: 'Schedule Row Rule 4',  x: 48,   y: 2434, width: 1104, height: 2,   fill: '#000000', radius: 0, opacity: 100 },
  { id: 'mm-sched-rule',    type: 'container', name: 'Schedule Bottom Rule', x: 0,    y: 2522, width: 1200, height: 4,   fill: '#000000',         radius: 0, opacity: 100 },

  // ── Tickets Section ──────────────────────────────────────────────────────────
  { id: 'mm-ticket-bg',     type: 'container', name: 'Tickets Background',   x: 0,    y: 2526, width: 1200, height: 580, fill: '#F5F5F5',         radius: 0, opacity: 100 },
  { id: 'mm-ticket-kicker', type: 'label',     name: 'Ticket Kicker',        x: 48,   y: 2592, width: 200,  height: 20,  content: '04  /  TICKETS', fontSize: 10, fontWeight: 400, fontFamily: 'JetBrains Mono, monospace', textColor: '#525252', fill: 'transparent', radius: 0, opacity: 100 },
  { id: 'mm-ticket-title',  type: 'heading',   name: 'Ticket Heading',       x: 48,   y: 2626, width: 560,  height: 72,  content: 'Invest in\nyour practice.', fontSize: 44, fontWeight: 700, fontFamily: 'Playfair Display, Georgia, serif', textColor: '#000000', lineHeight: 1.15, opacity: 100 },
  // Tier 1
  { id: 'mm-tier-c1',      type: 'container', name: 'Tier 1 Card',           x: 48,   y: 2740, width: 340,  height: 280, fill: '#FFFFFF',  borderColor: '#000000', radius: 0, opacity: 100 },
  { id: 'mm-tier-t1',      type: 'heading',   name: 'Tier 1 Name',           x: 72,   y: 2772, width: 292,  height: 34,  content: 'Studio',        fontSize: 22, fontWeight: 700, fontFamily: 'Playfair Display, Georgia, serif', textColor: '#000000', opacity: 100 },
  { id: 'mm-tier-p1',      type: 'heading',   name: 'Tier 1 Price',          x: 72,   y: 2818, width: 200,  height: 64,  content: '$495',          fontSize: 56, fontWeight: 700, fontFamily: 'Playfair Display, Georgia, serif', textColor: '#000000', opacity: 100 },
  { id: 'mm-tier-div1',    type: 'container', name: 'Tier 1 Divider',        x: 72,   y: 2892, width: 292,  height: 1,   fill: '#000000',  radius: 0, opacity: 100 },
  { id: 'mm-tier-b1',      type: 'paragraph', name: 'Tier 1 Desc',           x: 72,   y: 2906, width: 292,  height: 80,  content: 'Full three-day access. All talks, workshops, and program materials included.',  fontSize: 13, fontFamily: 'Source Serif 4, Georgia, serif', textColor: '#525252', lineHeight: 1.6, opacity: 100 },
  // Tier 2 — inverted/highlighted
  { id: 'mm-tier-c2',      type: 'container', name: 'Tier 2 Card',           x: 430,  y: 2720, width: 340,  height: 320, fill: '#000000',  borderColor: '#000000', radius: 0, opacity: 100 },
  { id: 'mm-tier-t2',      type: 'heading',   name: 'Tier 2 Name',           x: 454,  y: 2752, width: 292,  height: 34,  content: 'Fellow',        fontSize: 22, fontWeight: 700, fontFamily: 'Playfair Display, Georgia, serif', textColor: '#FFFFFF', opacity: 100 },
  { id: 'mm-tier-badge2',  type: 'label',     name: 'Tier 2 Badge',          x: 636,  y: 2756, width: 106,  height: 22,  content: 'MOST POPULAR', fontSize: 9, fontFamily: 'JetBrains Mono, monospace', textColor: '#000000', fill: '#FFFFFF', radius: 0, opacity: 100 },
  { id: 'mm-tier-p2',      type: 'heading',   name: 'Tier 2 Price',          x: 454,  y: 2798, width: 200,  height: 64,  content: '$895',          fontSize: 56, fontWeight: 700, fontFamily: 'Playfair Display, Georgia, serif', textColor: '#FFFFFF', opacity: 100 },
  { id: 'mm-tier-div2',    type: 'container', name: 'Tier 2 Divider',        x: 454,  y: 2872, width: 292,  height: 1,   fill: '#FFFFFF',  radius: 0, opacity: 100 },
  { id: 'mm-tier-b2',      type: 'paragraph', name: 'Tier 2 Desc',           x: 454,  y: 2886, width: 292,  height: 96,  content: 'Everything in Studio, plus speaker dinners, critique sessions, mentorship hours, and the FORMA annual.',  fontSize: 13, fontFamily: 'Source Serif 4, Georgia, serif', textColor: '#E5E5E5', lineHeight: 1.6, opacity: 100 },
  // Tier 3
  { id: 'mm-tier-c3',      type: 'container', name: 'Tier 3 Card',           x: 812,  y: 2740, width: 340,  height: 280, fill: '#FFFFFF',  borderColor: '#000000', radius: 0, opacity: 100 },
  { id: 'mm-tier-t3',      type: 'heading',   name: 'Tier 3 Name',           x: 836,  y: 2772, width: 292,  height: 34,  content: 'Institution',   fontSize: 22, fontWeight: 700, fontFamily: 'Playfair Display, Georgia, serif', textColor: '#000000', opacity: 100 },
  { id: 'mm-tier-p3',      type: 'heading',   name: 'Tier 3 Price',          x: 836,  y: 2818, width: 200,  height: 64,  content: '$2,400',        fontSize: 56, fontWeight: 700, fontFamily: 'Playfair Display, Georgia, serif', textColor: '#000000', opacity: 100 },
  { id: 'mm-tier-div3',    type: 'container', name: 'Tier 3 Divider',        x: 836,  y: 2892, width: 292,  height: 1,   fill: '#000000',  radius: 0, opacity: 100 },
  { id: 'mm-tier-b3',      type: 'paragraph', name: 'Tier 3 Desc',           x: 836,  y: 2906, width: 292,  height: 80,  content: 'Ten passes for studios and schools. Table at the closing dinner. Recognition in program.',  fontSize: 13, fontFamily: 'Source Serif 4, Georgia, serif', textColor: '#525252', lineHeight: 1.6, opacity: 100 },
  { id: 'mm-ticket-rule',  type: 'container', name: 'Ticket Bottom Rule',    x: 0,    y: 3105, width: 1200, height: 4,   fill: '#000000',         radius: 0, opacity: 100 },

  // ── Testimonials ─────────────────────────────────────────────────────────────
  { id: 'mm-testi-bg',      type: 'container', name: 'Testimonials Background', x: 0,  y: 3109, width: 1200, height: 460, fill: '#FFFFFF',         radius: 0, opacity: 100 },
  { id: 'mm-testi-kicker',  type: 'label',     name: 'Testimonials Kicker',  x: 48,   y: 3172, width: 220,  height: 20,  content: '05  /  VOICES', fontSize: 10, fontWeight: 400, fontFamily: 'JetBrains Mono, monospace', textColor: '#525252', fill: 'transparent', radius: 0, opacity: 100 },
  // Quote 1
  { id: 'mm-testi-q1-mark', type: 'heading',   name: 'Quote 1 Mark',         x: 48,   y: 3200, width: 80,   height: 96,  content: '"',            fontSize: 100, fontWeight: 700, fontFamily: 'Playfair Display, Georgia, serif', textColor: '#000000', lineHeight: 1, opacity: 100 },
  { id: 'mm-testi-q1',      type: 'paragraph', name: 'Quote 1 Text',         x: 48,   y: 3268, width: 520,  height: 96,  content: 'The only design conference where the questions asked from the floor are as good as the ones posed on stage. Came back to my practice rethinking everything.',  fontSize: 16, fontWeight: 400, fontFamily: 'Playfair Display, Georgia, serif', textColor: '#000000', lineHeight: 1.625, opacity: 100 },
  { id: 'mm-testi-q1-attr', type: 'paragraph', name: 'Quote 1 Attribution', x: 48,   y: 3372, width: 360,  height: 18,  content: 'Camille Renard — Design Director, Maison Oui', fontSize: 11, fontFamily: 'JetBrains Mono, monospace', textColor: '#525252', opacity: 100 },
  { id: 'mm-testi-vdiv',    type: 'container', name: 'Testi Vertical Divider',x: 660, y: 3206, width: 1,    height: 210, fill: '#000000',         radius: 0, opacity: 100 },
  // Quote 2
  { id: 'mm-testi-q2-mark', type: 'heading',   name: 'Quote 2 Mark',         x: 700,  y: 3200, width: 80,   height: 96,  content: '"',            fontSize: 100, fontWeight: 700, fontFamily: 'Playfair Display, Georgia, serif', textColor: '#000000', lineHeight: 1, opacity: 100 },
  { id: 'mm-testi-q2',      type: 'paragraph', name: 'Quote 2 Text',         x: 700,  y: 3268, width: 440,  height: 96,  content: 'Unsponsored. Uncurated. Uncompromising. FORMA treats its audience as adults. That alone makes it exceptional.',  fontSize: 16, fontWeight: 400, fontFamily: 'Playfair Display, Georgia, serif', textColor: '#000000', lineHeight: 1.625, opacity: 100 },
  { id: 'mm-testi-q2-attr', type: 'paragraph', name: 'Quote 2 Attribution', x: 700,  y: 3372, width: 360,  height: 18,  content: 'Soren Mikkelsen — Partner, Form Studio Copenhagen', fontSize: 11, fontFamily: 'JetBrains Mono, monospace', textColor: '#525252', opacity: 100 },
  { id: 'mm-testi-rule',    type: 'container', name: 'Testi Bottom Rule',    x: 0,    y: 3568, width: 1200, height: 4,   fill: '#000000',         radius: 0, opacity: 100 },

  // ── Sponsors / Partners ──────────────────────────────────────────────────────
  { id: 'mm-sponsor-bg',    type: 'container', name: 'Sponsors Background',  x: 0,    y: 3572, width: 1200, height: 200, fill: '#F5F5F5',         radius: 0, opacity: 100 },
  { id: 'mm-sponsor-label', type: 'label',     name: 'Sponsors Label',       x: 48,   y: 3624, width: 200,  height: 20,  content: 'SUPPORTED BY', fontSize: 10, fontWeight: 400, fontFamily: 'JetBrains Mono, monospace', textColor: '#525252', fill: 'transparent', radius: 0, opacity: 100 },
  { id: 'mm-sponsor-1',     type: 'heading',   name: 'Sponsor 1',            x: 48,   y: 3660, width: 160,  height: 36,  content: 'MUUTO',        fontSize: 22, fontWeight: 700, fontFamily: 'Playfair Display, Georgia, serif', textColor: '#000000', opacity: 100 },
  { id: 'mm-sponsor-div1',  type: 'container', name: 'Sponsor Div 1',        x: 224,  y: 3664, width: 1,    height: 28,  fill: '#000000', radius: 0, opacity: 100 },
  { id: 'mm-sponsor-2',     type: 'heading',   name: 'Sponsor 2',            x: 252,  y: 3660, width: 160,  height: 36,  content: 'STANDARD',     fontSize: 22, fontWeight: 700, fontFamily: 'Playfair Display, Georgia, serif', textColor: '#000000', opacity: 100 },
  { id: 'mm-sponsor-div2',  type: 'container', name: 'Sponsor Div 2',        x: 432,  y: 3664, width: 1,    height: 28,  fill: '#000000', radius: 0, opacity: 100 },
  { id: 'mm-sponsor-3',     type: 'heading',   name: 'Sponsor 3',            x: 460,  y: 3660, width: 160,  height: 36,  content: 'MONOTYPE',     fontSize: 22, fontWeight: 700, fontFamily: 'Playfair Display, Georgia, serif', textColor: '#000000', opacity: 100 },
  { id: 'mm-sponsor-div3',  type: 'container', name: 'Sponsor Div 3',        x: 642,  y: 3664, width: 1,    height: 28,  fill: '#000000', radius: 0, opacity: 100 },
  { id: 'mm-sponsor-4',     type: 'heading',   name: 'Sponsor 4',            x: 670,  y: 3660, width: 160,  height: 36,  content: 'EMIGRE',       fontSize: 22, fontWeight: 700, fontFamily: 'Playfair Display, Georgia, serif', textColor: '#000000', opacity: 100 },
  { id: 'mm-sponsor-div4',  type: 'container', name: 'Sponsor Div 4',        x: 852,  y: 3664, width: 1,    height: 28,  fill: '#000000', radius: 0, opacity: 100 },
  { id: 'mm-sponsor-5',     type: 'heading',   name: 'Sponsor 5',            x: 880,  y: 3660, width: 180,  height: 36,  content: 'HELVETICA',    fontSize: 22, fontWeight: 700, fontFamily: 'Playfair Display, Georgia, serif', textColor: '#000000', opacity: 100 },
  { id: 'mm-sponsor-rule',  type: 'container', name: 'Sponsors Bottom Rule', x: 0,    y: 3771, width: 1200, height: 4,   fill: '#000000',         radius: 0, opacity: 100 },

  // ── Footer / Final CTA ───────────────────────────────────────────────────────
  { id: 'mm-footer-bg',     type: 'container', name: 'Footer Background',    x: 0,    y: 3775, width: 1200, height: 340, fill: '#000000',         radius: 0, opacity: 100 },
  { id: 'mm-footer-title',  type: 'heading',   name: 'Footer CTA Heading',   x: 48,   y: 3832, width: 840,  height: 110, content: 'Join us in New York\nthis September.', fontSize: 72, fontWeight: 700, fontFamily: 'Playfair Display, Georgia, serif', textColor: '#FFFFFF', lineHeight: 1.1, opacity: 100 },
  { id: 'mm-footer-btn',    type: 'button',    name: 'Footer CTA Button',    x: 48,   y: 3972, width: 220,  height: 52,  content: 'SECURE YOUR PLACE →', fill: '#FFFFFF', textColor: '#000000', fontSize: 11, fontWeight: 500, fontFamily: 'JetBrains Mono, monospace', radius: 0, opacity: 100 },
  { id: 'mm-footer-vdiv',   type: 'container', name: 'Footer Vertical Rule', x: 960,  y: 3832, width: 1,    height: 200, fill: '#FFFFFF',         radius: 0, opacity: 25 },
  { id: 'mm-footer-links',  type: 'paragraph', name: 'Footer Links',         x: 986,  y: 3840, width: 166,  height: 108, content: 'Program\nSpeakers\nTickets\nVenue\nContact', fontSize: 12, fontFamily: 'JetBrains Mono, monospace', textColor: '#E5E5E5', lineHeight: 2, opacity: 100 },
  { id: 'mm-footer-rule',   type: 'container', name: 'Footer Divider Rule',  x: 48,   y: 4060, width: 1104, height: 1,   fill: '#FFFFFF',         radius: 0, opacity: 25 },
  { id: 'mm-footer-copy',   type: 'paragraph', name: 'Footer Copyright',     x: 48,   y: 4078, width: 600,  height: 18,  content: '© 2026 FORMA. All rights reserved.', fontSize: 10, fontFamily: 'JetBrains Mono, monospace', textColor: '#525252', opacity: 100 },
  { id: 'mm-footer-legal',  type: 'paragraph', name: 'Footer Legal',         x: 860,  y: 4078, width: 292,  height: 18,  content: 'Privacy  /  Terms  /  Press', fontSize: 10, fontFamily: 'JetBrains Mono, monospace', textColor: '#525252', textAlign: 'right', opacity: 100 },
]

// ─────────────────────────────────────────────────────────────────────────────
// Theme Maps
// Light = canonical white-editorial palette (defined above)
// Dark  = full canvas inversion — black ground, white elements
// ─────────────────────────────────────────────────────────────────────────────

const MM_DARK_MAP = {
  // Backgrounds
  '#FFFFFF':  '#000000',
  '#F5F5F5':  '#0A0A0A',
  // Text
  '#000000':  '#FFFFFF',
  '#525252':  '#A3A3A3',
  '#E5E5E5':  '#262626',
  '#1A1A1A':  '#2A2A2A',
  // Borders / rules
  // (borderColor handled per-element below)
  // Inverted cards — flip back in dark mode
  // Card 2 (already inverted in light = black bg) should stay inverted:
  // it maps black→white, so on dark canvas it becomes white bg with black text
  // We handle the special case in the transform function.
}

const MM_DARK_BORDER_MAP = {
  '#000000': '#FFFFFF',
  '#E5E5E5': '#2A2A2A',
}

function toMmDarkTheme(element) {
  const next = { ...element }

  // Fill
  if (next.fill && MM_DARK_MAP[next.fill]) {
    next.fill = MM_DARK_MAP[next.fill]
  }

  // TextColor
  if (next.textColor && MM_DARK_MAP[next.textColor]) {
    next.textColor = MM_DARK_MAP[next.textColor]
  }

  // BorderColor
  if (next.borderColor && MM_DARK_BORDER_MAP[next.borderColor]) {
    next.borderColor = MM_DARK_BORDER_MAP[next.borderColor]
  }

  return next
}

// ─────────────────────────────────────────────────────────────────────────────
// Lookup tables by id for fast O(1) theme swapping
// ─────────────────────────────────────────────────────────────────────────────

const mmThemeById = {
  light: Object.fromEntries(minimalistMonochromeElements.map(el => [el.id, el])),
  dark:  Object.fromEntries(minimalistMonochromeElements.map(toMmDarkTheme).map(el => [el.id, el])),
}

// ─────────────────────────────────────────────────────────────────────────────
// Public helpers  (mirror the pattern from all other templates)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Returns true when the element array belongs to this template.
 * Keyed on the 'mm-' id prefix.
 */
export function isMinimalistMonochromeTemplate(elements = []) {
  return elements.some(el => String(el.id || '').startsWith('mm-'))
}

/**
 * Swap all theme-sensitive colour tokens in the element list.
 * @param {Array}  elements – current canvas elements
 * @param {string} theme    – 'light' | 'dark'
 */
export function applyMinimalistMonochromeTheme(elements = [], theme = 'light') {
  const palette = mmThemeById[theme] || mmThemeById.light
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
 * Returns the correct canvas background for the chosen theme.
 */
export function getMinimalistMonochromeCanvasFill(theme = 'light') {
  return theme === 'dark' ? '#000000' : '#FFFFFF'
}