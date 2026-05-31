// ─────────────────────────────────────────────────────────────────────────────
// VaporWave Neon Fest Template
// Synthwave / Outrun music festival landing page
// Supports: light (pastel-retro) and dark (neon-void) themes
// ─────────────────────────────────────────────────────────────────────────────

// ── Base element definitions (dark theme is canonical) ────────────────────────

export const vaporWaveFestElements = [

  // ── Navigation ──────────────────────────────────────────────────────────────
  { id: 'vw-nav-bg',      type: 'container', name: 'Navigation Bar',       x: 0,    y: 0,    width: 1200, height: 72,  fill: 'rgba(9,0,20,0.92)',        borderColor: '#2D1B4E',              radius: 0,   opacity: 100 },
  { id: 'vw-logo-mark',   type: 'container', name: 'Logo Diamond',         x: 48,   y: 18,   width: 36,   height: 36,  fill: '#FF00FF',                  radius: 0,   opacity: 100 },
  { id: 'vw-logo-text',   type: 'heading',   name: 'Logo Text',            x: 96,   y: 19,   width: 200,  height: 34,  content: 'NEON FEST',             fontSize: 18, fontWeight: 900, fontFamily: 'Orbitron, sans-serif',      textColor: '#00FFFF', opacity: 100 },
  { id: 'vw-nav-links',   type: 'paragraph', name: 'Navigation Links',     x: 390,  y: 26,   width: 440,  height: 22,  content: 'LINEUP     SCHEDULE     TICKETS     VENUE',  fontSize: 12, fontWeight: 400, fontFamily: 'Share Tech Mono, monospace', textColor: '#E0E0E0', textAlign: 'center', opacity: 100 },
  { id: 'vw-nav-cta',     type: 'button',    name: 'Navigation CTA',       x: 1028, y: 14,   width: 124,  height: 44,  content: 'GET PASSES', fill: 'transparent', textColor: '#00FFFF', borderColor: '#00FFFF', fontSize: 11, fontWeight: 400, fontFamily: 'Share Tech Mono, monospace', radius: 0, opacity: 100 },

  // ── Hero Section ─────────────────────────────────────────────────────────────
  { id: 'vw-hero-bg',       type: 'container', name: 'Hero Background',     x: 0,    y: 72,   width: 1200, height: 680, fill: '#090014',                  radius: 0,   opacity: 100 },
  { id: 'vw-hero-sun',      type: 'container', name: 'Hero Sun Orb',        x: 300,  y: 100,  width: 600,  height: 600, fill: 'radial-gradient(circle, rgba(255,153,0,0.18) 0%, rgba(255,0,255,0.10) 50%, transparent 75%)', radius: 9999, opacity: 100 },
  { id: 'vw-hero-grid',     type: 'container', name: 'Hero Grid Floor',     x: 0,    y: 520,  width: 1200, height: 232, fill: 'rgba(255,0,255,0.06)',      borderColor: '#FF00FF',              radius: 0,   opacity: 100 },
  { id: 'vw-hero-eyebrow',  type: 'label',     name: 'Hero Eyebrow',        x: 76,   y: 128,  width: 340,  height: 28,  content: '> AUGUST 15–17, 2026 / LOS ANGELES, CA', fontSize: 11, fontWeight: 400, fontFamily: 'Share Tech Mono, monospace', textColor: '#FF9900', fill: 'rgba(255,153,0,0.10)', radius: 0, opacity: 100 },
  { id: 'vw-hero-title-1',  type: 'heading',   name: 'Hero Title Line 1',   x: 68,   y: 178,  width: 900,  height: 120, content: 'RIDE THE',              fontSize: 96, fontWeight: 900, fontFamily: 'Orbitron, sans-serif',      textColor: '#FF00FF',  opacity: 100 },
  { id: 'vw-hero-title-2',  type: 'heading',   name: 'Hero Title Line 2',   x: 68,   y: 290,  width: 900,  height: 120, content: 'NEON WAVE',             fontSize: 96, fontWeight: 900, fontFamily: 'Orbitron, sans-serif',      textColor: '#00FFFF',  opacity: 100 },
  { id: 'vw-hero-sub',      type: 'paragraph', name: 'Hero Subtitle',       x: 76,   y: 426,  width: 560,  height: 64,  content: 'Three days of synthwave, retrowave & cyberpunk artists from across the multiverse. Prepare for full sensory overload.',  fontSize: 16, fontWeight: 400, fontFamily: 'Share Tech Mono, monospace', textColor: 'rgba(224,224,224,0.75)', lineHeight: 1.7, opacity: 100 },
  { id: 'vw-hero-btn-pri',  type: 'button',    name: 'Hero Primary CTA',    x: 76,   y: 522,  width: 180,  height: 52,  content: 'BUY TICKETS', fill: '#FF00FF', textColor: '#ffffff', fontSize: 12, fontWeight: 400, fontFamily: 'Share Tech Mono, monospace', radius: 0, opacity: 100 },
  { id: 'vw-hero-btn-sec',  type: 'button',    name: 'Hero Secondary CTA',  x: 272,  y: 522,  width: 180,  height: 52,  content: 'VIEW LINEUP', fill: 'transparent', textColor: '#00FFFF', borderColor: '#00FFFF', fontSize: 12, fontWeight: 400, fontFamily: 'Share Tech Mono, monospace', radius: 0, opacity: 100 },
  { id: 'vw-hero-stat-a',   type: 'heading',   name: 'Hero Stat Artists',   x: 780,  y: 200,  width: 150,  height: 52,  content: '80+',                   fontSize: 48, fontWeight: 900, fontFamily: 'Orbitron, sans-serif',      textColor: '#FF9900',  opacity: 100 },
  { id: 'vw-hero-stat-al',  type: 'paragraph', name: 'Hero Stat Artists Label', x: 780, y: 258, width: 150, height: 20, content: 'ARTISTS',              fontSize: 11, fontFamily: 'Share Tech Mono, monospace', textColor: '#E0E0E0', opacity: 100 },
  { id: 'vw-hero-stat-b',   type: 'heading',   name: 'Hero Stat Stages',    x: 960,  y: 200,  width: 150,  height: 52,  content: '5',                     fontSize: 48, fontWeight: 900, fontFamily: 'Orbitron, sans-serif',      textColor: '#FF9900',  opacity: 100 },
  { id: 'vw-hero-stat-bl',  type: 'paragraph', name: 'Hero Stat Stages Label',  x: 960, y: 258, width: 150, height: 20, content: 'STAGES',              fontSize: 11, fontFamily: 'Share Tech Mono, monospace', textColor: '#E0E0E0', opacity: 100 },
  { id: 'vw-hero-stat-c',   type: 'heading',   name: 'Hero Stat Capacity',  x: 780,  y: 316,  width: 150,  height: 52,  content: '40K',                   fontSize: 48, fontWeight: 900, fontFamily: 'Orbitron, sans-serif',      textColor: '#FF9900',  opacity: 100 },
  { id: 'vw-hero-stat-cl',  type: 'paragraph', name: 'Hero Stat Capacity Label', x: 780, y: 374, width: 150, height: 20, content: 'CAPACITY',            fontSize: 11, fontFamily: 'Share Tech Mono, monospace', textColor: '#E0E0E0', opacity: 100 },
  { id: 'vw-hero-stat-d',   type: 'heading',   name: 'Hero Stat Days',      x: 960,  y: 316,  width: 150,  height: 52,  content: '3',                     fontSize: 48, fontWeight: 900, fontFamily: 'Orbitron, sans-serif',      textColor: '#FF9900',  opacity: 100 },
  { id: 'vw-hero-stat-dl',  type: 'paragraph', name: 'Hero Stat Days Label',    x: 960, y: 374, width: 150, height: 20, content: 'DAYS',                fontSize: 11, fontFamily: 'Share Tech Mono, monospace', textColor: '#E0E0E0', opacity: 100 },

  // ── About / Overview ─────────────────────────────────────────────────────────
  { id: 'vw-about-bg',     type: 'container', name: 'About Section',        x: 0,    y: 752,  width: 1200, height: 360, fill: '#0D0022',                  borderColor: '#2D1B4E',              radius: 0,   opacity: 100 },
  { id: 'vw-about-kicker', type: 'label',     name: 'About Kicker',         x: 100,  y: 820,  width: 220,  height: 26,  content: '> ABOUT THE FESTIVAL',  fontSize: 11, fontWeight: 400, fontFamily: 'Share Tech Mono, monospace', textColor: '#FF00FF', fill: 'transparent', radius: 0, opacity: 100 },
  { id: 'vw-about-title',  type: 'heading',   name: 'About Heading',        x: 100,  y: 858,  width: 520,  height: 72,  content: 'THREE NIGHTS.\nINFINITE GRID.',fontSize: 44, fontWeight: 900, fontFamily: 'Orbitron, sans-serif', textColor: '#E0E0E0', lineHeight: 1.2, opacity: 100 },
  { id: 'vw-about-body',   type: 'paragraph', name: 'About Body',           x: 100,  y: 958,  width: 480,  height: 112, content: 'Neon Fest is the premier celebration of synthetic sounds and retro-digital culture. From pounding drum machines to soaring synth leads, experience the artists defining the next era of electronic music — all under a sea of neon light and laser grids.',  fontSize: 15, fontFamily: 'Share Tech Mono, monospace', textColor: 'rgba(224,224,224,0.7)', lineHeight: 1.75, opacity: 100 },
  { id: 'vw-about-card-1', type: 'container', name: 'About Feature 1',      x: 680,  y: 840,  width: 200,  height: 200, fill: 'rgba(26,16,60,0.8)',        borderColor: '#00FFFF',              radius: 0,   opacity: 100 },
  { id: 'vw-about-icon-1', type: 'heading',   name: 'About Icon 1',         x: 730,  y: 870,  width: 100,  height: 56,  content: '◈',                     fontSize: 40, fontFamily: 'Share Tech Mono, monospace', textColor: '#00FFFF', opacity: 100 },
  { id: 'vw-about-feat-1', type: 'heading',   name: 'About Feature 1 Title',x: 700,  y: 936,  width: 160,  height: 32,  content: 'MAIN STAGE',            fontSize: 16, fontWeight: 900, fontFamily: 'Orbitron, sans-serif', textColor: '#00FFFF', opacity: 100 },
  { id: 'vw-about-feat-1b',type: 'paragraph', name: 'About Feature 1 Copy', x: 700,  y: 972,  width: 160,  height: 52,  content: 'Headliners on the 10,000 watt grid stage',  fontSize: 12, fontFamily: 'Share Tech Mono, monospace', textColor: 'rgba(224,224,224,0.65)', lineHeight: 1.55, opacity: 100 },
  { id: 'vw-about-card-2', type: 'container', name: 'About Feature 2',      x: 896,  y: 840,  width: 200,  height: 200, fill: 'rgba(26,16,60,0.8)',        borderColor: '#FF00FF',              radius: 0,   opacity: 100 },
  { id: 'vw-about-icon-2', type: 'heading',   name: 'About Icon 2',         x: 946,  y: 870,  width: 100,  height: 56,  content: '⬡',                     fontSize: 40, fontFamily: 'Share Tech Mono, monospace', textColor: '#FF00FF', opacity: 100 },
  { id: 'vw-about-feat-2', type: 'heading',   name: 'About Feature 2 Title',x: 916,  y: 936,  width: 160,  height: 32,  content: 'ART ZONES',             fontSize: 16, fontWeight: 900, fontFamily: 'Orbitron, sans-serif', textColor: '#FF00FF', opacity: 100 },
  { id: 'vw-about-feat-2b',type: 'paragraph', name: 'About Feature 2 Copy', x: 916,  y: 972,  width: 160,  height: 52,  content: 'Immersive LED and holographic installations',  fontSize: 12, fontFamily: 'Share Tech Mono, monospace', textColor: 'rgba(224,224,224,0.65)', lineHeight: 1.55, opacity: 100 },

  // ── Lineup / Artists ─────────────────────────────────────────────────────────
  { id: 'vw-lineup-bg',      type: 'container', name: 'Lineup Section',     x: 0,    y: 1112, width: 1200, height: 600, fill: '#090014',                  radius: 0,   opacity: 100 },
  { id: 'vw-lineup-kicker',  type: 'label',     name: 'Lineup Kicker',      x: 100,  y: 1180, width: 200,  height: 26,  content: '> 2026 LINEUP',         fontSize: 11, fontWeight: 400, fontFamily: 'Share Tech Mono, monospace', textColor: '#FF00FF', fill: 'transparent', radius: 0, opacity: 100 },
  { id: 'vw-lineup-title',   type: 'heading',   name: 'Lineup Heading',     x: 100,  y: 1218, width: 700,  height: 64,  content: 'HEADLINERS',            fontSize: 52, fontWeight: 900, fontFamily: 'Orbitron, sans-serif', textColor: '#E0E0E0', opacity: 100 },
  // Artist card 1
  { id: 'vw-artist-c1',  type: 'container', name: 'Artist Card 1',         x: 100,  y: 1322, width: 240,  height: 280, fill: 'rgba(26,16,60,0.85)',       borderColor: '#FF00FF',              radius: 0,   opacity: 100 },
  { id: 'vw-artist-img1',type: 'container', name: 'Artist Image 1',        x: 100,  y: 1322, width: 240,  height: 160, fill: 'rgba(255,0,255,0.18)',       radius: 0,   opacity: 100 },
  { id: 'vw-artist-n1',  type: 'heading',   name: 'Artist 1 Name',         x: 120,  y: 1500, width: 200,  height: 38,  content: 'SYNTHEX',               fontSize: 24, fontWeight: 900, fontFamily: 'Orbitron, sans-serif', textColor: '#00FFFF', opacity: 100 },
  { id: 'vw-artist-g1',  type: 'paragraph', name: 'Artist 1 Genre',        x: 120,  y: 1542, width: 200,  height: 20,  content: 'OUTRUN / DARKSYNTH',    fontSize: 11, fontFamily: 'Share Tech Mono, monospace', textColor: '#FF9900', opacity: 100 },
  { id: 'vw-artist-d1',  type: 'paragraph', name: 'Artist 1 Day',          x: 120,  y: 1568, width: 200,  height: 20,  content: 'FRIDAY — MAIN STAGE',   fontSize: 10, fontFamily: 'Share Tech Mono, monospace', textColor: 'rgba(224,224,224,0.55)', opacity: 100 },
  // Artist card 2
  { id: 'vw-artist-c2',  type: 'container', name: 'Artist Card 2',         x: 360,  y: 1322, width: 240,  height: 280, fill: 'rgba(26,16,60,0.85)',       borderColor: '#00FFFF',              radius: 0,   opacity: 100 },
  { id: 'vw-artist-img2',type: 'container', name: 'Artist Image 2',        x: 360,  y: 1322, width: 240,  height: 160, fill: 'rgba(0,255,255,0.14)',       radius: 0,   opacity: 100 },
  { id: 'vw-artist-n2',  type: 'heading',   name: 'Artist 2 Name',         x: 380,  y: 1500, width: 200,  height: 38,  content: 'NOXV',                  fontSize: 24, fontWeight: 900, fontFamily: 'Orbitron, sans-serif', textColor: '#00FFFF', opacity: 100 },
  { id: 'vw-artist-g2',  type: 'paragraph', name: 'Artist 2 Genre',        x: 380,  y: 1542, width: 200,  height: 20,  content: 'RETROWAVE / ELECTRO',   fontSize: 11, fontFamily: 'Share Tech Mono, monospace', textColor: '#FF9900', opacity: 100 },
  { id: 'vw-artist-d2',  type: 'paragraph', name: 'Artist 2 Day',          x: 380,  y: 1568, width: 200,  height: 20,  content: 'SATURDAY — MAIN STAGE', fontSize: 10, fontFamily: 'Share Tech Mono, monospace', textColor: 'rgba(224,224,224,0.55)', opacity: 100 },
  // Artist card 3
  { id: 'vw-artist-c3',  type: 'container', name: 'Artist Card 3',         x: 620,  y: 1322, width: 240,  height: 280, fill: 'rgba(26,16,60,0.85)',       borderColor: '#FF9900',              radius: 0,   opacity: 100 },
  { id: 'vw-artist-img3',type: 'container', name: 'Artist Image 3',        x: 620,  y: 1322, width: 240,  height: 160, fill: 'rgba(255,153,0,0.14)',       radius: 0,   opacity: 100 },
  { id: 'vw-artist-n3',  type: 'heading',   name: 'Artist 3 Name',         x: 640,  y: 1500, width: 200,  height: 38,  content: 'VOIDRUNNER',            fontSize: 24, fontWeight: 900, fontFamily: 'Orbitron, sans-serif', textColor: '#00FFFF', opacity: 100 },
  { id: 'vw-artist-g3',  type: 'paragraph', name: 'Artist 3 Genre',        x: 640,  y: 1542, width: 200,  height: 20,  content: 'CYBERPUNK / INDUSTRIAL', fontSize: 11, fontFamily: 'Share Tech Mono, monospace', textColor: '#FF9900', opacity: 100 },
  { id: 'vw-artist-d3',  type: 'paragraph', name: 'Artist 3 Day',          x: 640,  y: 1568, width: 200,  height: 20,  content: 'SUNDAY — VOID STAGE',   fontSize: 10, fontFamily: 'Share Tech Mono, monospace', textColor: 'rgba(224,224,224,0.55)', opacity: 100 },
  // Artist card 4
  { id: 'vw-artist-c4',  type: 'container', name: 'Artist Card 4',         x: 880,  y: 1322, width: 240,  height: 280, fill: 'rgba(26,16,60,0.85)',       borderColor: '#FF00FF',              radius: 0,   opacity: 100 },
  { id: 'vw-artist-img4',type: 'container', name: 'Artist Image 4',        x: 880,  y: 1322, width: 240,  height: 160, fill: 'rgba(255,0,255,0.14)',       radius: 0,   opacity: 100 },
  { id: 'vw-artist-n4',  type: 'heading',   name: 'Artist 4 Name',         x: 900,  y: 1500, width: 200,  height: 38,  content: 'GRID WITCH',            fontSize: 24, fontWeight: 900, fontFamily: 'Orbitron, sans-serif', textColor: '#00FFFF', opacity: 100 },
  { id: 'vw-artist-g4',  type: 'paragraph', name: 'Artist 4 Genre',        x: 900,  y: 1542, width: 200,  height: 20,  content: 'VAPORWAVE / CHILL',     fontSize: 11, fontFamily: 'Share Tech Mono, monospace', textColor: '#FF9900', opacity: 100 },
  { id: 'vw-artist-d4',  type: 'paragraph', name: 'Artist 4 Day',          x: 900,  y: 1568, width: 200,  height: 20,  content: 'FRIDAY — NEON STAGE',   fontSize: 10, fontFamily: 'Share Tech Mono, monospace', textColor: 'rgba(224,224,224,0.55)', opacity: 100 },

  // ── Schedule / Agenda ────────────────────────────────────────────────────────
  { id: 'vw-sched-bg',     type: 'container', name: 'Schedule Section',     x: 0,    y: 1712, width: 1200, height: 560, fill: '#0D0022',                  borderColor: '#2D1B4E',              radius: 0,   opacity: 100 },
  { id: 'vw-sched-kicker', type: 'label',     name: 'Schedule Kicker',      x: 100,  y: 1780, width: 200,  height: 26,  content: '> PROGRAM',             fontSize: 11, fontWeight: 400, fontFamily: 'Share Tech Mono, monospace', textColor: '#FF00FF', fill: 'transparent', radius: 0, opacity: 100 },
  { id: 'vw-sched-title',  type: 'heading',   name: 'Schedule Heading',     x: 100,  y: 1818, width: 540,  height: 64,  content: 'DAILY SCHEDULE',        fontSize: 48, fontWeight: 900, fontFamily: 'Orbitron, sans-serif', textColor: '#E0E0E0', opacity: 100 },
  // Schedule card
  { id: 'vw-sched-card',   type: 'container', name: 'Schedule Card',        x: 100,  y: 1916, width: 1000, height: 276, fill: 'rgba(26,16,60,0.85)',       borderColor: '#2D1B4E',              radius: 0,   opacity: 100 },
  { id: 'vw-sched-border', type: 'container', name: 'Schedule Accent Bar',  x: 100,  y: 1916, width: 1000, height: 4,   fill: '#FF00FF',                  radius: 0,   opacity: 100 },
  // Row 1
  { id: 'vw-sched-t1',     type: 'label',     name: 'Time 1',               x: 140,  y: 1952, width: 90,   height: 24,  content: '20:00',                 fontSize: 12, fontWeight: 400, fontFamily: 'Share Tech Mono, monospace', textColor: '#00FFFF', fill: 'transparent', radius: 0, opacity: 100 },
  { id: 'vw-sched-s1',     type: 'label',     name: 'Stage 1',              x: 250,  y: 1952, width: 110,  height: 24,  content: 'MAIN STAGE',            fontSize: 11, fontWeight: 400, fontFamily: 'Share Tech Mono, monospace', textColor: '#FF9900', fill: 'rgba(255,153,0,0.08)', radius: 0, opacity: 100 },
  { id: 'vw-sched-a1',     type: 'heading',   name: 'Artist Name 1',        x: 380,  y: 1948, width: 600,  height: 32,  content: 'SYNTHEX — "Outrun Forever" Tour Set', fontSize: 20, fontWeight: 700, fontFamily: 'Orbitron, sans-serif', textColor: '#E0E0E0', opacity: 100 },
  // Row 2
  { id: 'vw-sched-t2',     type: 'label',     name: 'Time 2',               x: 140,  y: 2010, width: 90,   height: 24,  content: '22:30',                 fontSize: 12, fontWeight: 400, fontFamily: 'Share Tech Mono, monospace', textColor: '#00FFFF', fill: 'transparent', radius: 0, opacity: 100 },
  { id: 'vw-sched-s2',     type: 'label',     name: 'Stage 2',              x: 250,  y: 2010, width: 110,  height: 24,  content: 'NEON STAGE',            fontSize: 11, fontWeight: 400, fontFamily: 'Share Tech Mono, monospace', textColor: '#FF00FF', fill: 'rgba(255,0,255,0.08)', radius: 0, opacity: 100 },
  { id: 'vw-sched-a2',     type: 'heading',   name: 'Artist Name 2',        x: 380,  y: 2006, width: 600,  height: 32,  content: 'GRID WITCH — Holographic Live Performance',  fontSize: 20, fontWeight: 700, fontFamily: 'Orbitron, sans-serif', textColor: '#E0E0E0', opacity: 100 },
  // Row 3
  { id: 'vw-sched-t3',     type: 'label',     name: 'Time 3',               x: 140,  y: 2068, width: 90,   height: 24,  content: '01:00',                 fontSize: 12, fontWeight: 400, fontFamily: 'Share Tech Mono, monospace', textColor: '#00FFFF', fill: 'transparent', radius: 0, opacity: 100 },
  { id: 'vw-sched-s3',     type: 'label',     name: 'Stage 3',              x: 250,  y: 2068, width: 110,  height: 24,  content: 'VOID STAGE',            fontSize: 11, fontWeight: 400, fontFamily: 'Share Tech Mono, monospace', textColor: '#E0E0E0', fill: 'rgba(224,224,224,0.06)', radius: 0, opacity: 100 },
  { id: 'vw-sched-a3',     type: 'heading',   name: 'Artist Name 3',        x: 380,  y: 2064, width: 600,  height: 32,  content: 'VOIDRUNNER — Closing Ceremony: 3-Hour Marathon', fontSize: 20, fontWeight: 700, fontFamily: 'Orbitron, sans-serif', textColor: '#E0E0E0', opacity: 100 },
  // Row 4
  { id: 'vw-sched-t4',     type: 'label',     name: 'Time 4',               x: 140,  y: 2126, width: 90,   height: 24,  content: '03:00',                 fontSize: 12, fontWeight: 400, fontFamily: 'Share Tech Mono, monospace', textColor: '#00FFFF', fill: 'transparent', radius: 0, opacity: 100 },
  { id: 'vw-sched-s4',     type: 'label',     name: 'Stage 4',              x: 250,  y: 2126, width: 110,  height: 24,  content: 'GRID STAGE',            fontSize: 11, fontWeight: 400, fontFamily: 'Share Tech Mono, monospace', textColor: '#FF9900', fill: 'rgba(255,153,0,0.08)', radius: 0, opacity: 100 },
  { id: 'vw-sched-a4',     type: 'heading',   name: 'Artist Name 4',        x: 380,  y: 2122, width: 600,  height: 32,  content: 'NOXV — Sunrise Set: Dawn Patrol', fontSize: 20, fontWeight: 700, fontFamily: 'Orbitron, sans-serif', textColor: '#E0E0E0', opacity: 100 },

  // ── Tickets / CTA ────────────────────────────────────────────────────────────
  { id: 'vw-ticket-bg',    type: 'container', name: 'Tickets Section',      x: 0,    y: 2272, width: 1200, height: 580, fill: '#090014',                  radius: 0,   opacity: 100 },
  { id: 'vw-ticket-kicker',type: 'label',     name: 'Ticket Kicker',        x: 100,  y: 2340, width: 200,  height: 26,  content: '> PASSES',              fontSize: 11, fontWeight: 400, fontFamily: 'Share Tech Mono, monospace', textColor: '#FF00FF', fill: 'transparent', radius: 0, opacity: 100 },
  { id: 'vw-ticket-title', type: 'heading',   name: 'Ticket Heading',       x: 100,  y: 2378, width: 600,  height: 64,  content: 'CHOOSE YOUR TIER',     fontSize: 48, fontWeight: 900, fontFamily: 'Orbitron, sans-serif', textColor: '#E0E0E0', opacity: 100 },
  // Tier 1
  { id: 'vw-tier-c1',     type: 'container', name: 'Tier 1 Card',           x: 100,  y: 2480, width: 300,  height: 280, fill: 'rgba(26,16,60,0.85)',       borderColor: '#2D1B4E',              radius: 0,   opacity: 100 },
  { id: 'vw-tier-bar1',   type: 'container', name: 'Tier 1 Top Bar',        x: 100,  y: 2480, width: 300,  height: 4,   fill: '#2D1B4E',                  radius: 0,   opacity: 100 },
  { id: 'vw-tier-t1',     type: 'heading',   name: 'Tier 1 Name',           x: 128,  y: 2514, width: 244,  height: 34,  content: 'DIGITAL',               fontSize: 22, fontWeight: 900, fontFamily: 'Orbitron, sans-serif', textColor: '#E0E0E0', opacity: 100 },
  { id: 'vw-tier-p1',     type: 'heading',   name: 'Tier 1 Price',          x: 128,  y: 2558, width: 200,  height: 58,  content: '$149',                  fontSize: 46, fontWeight: 900, fontFamily: 'Orbitron, sans-serif', textColor: '#00FFFF', opacity: 100 },
  { id: 'vw-tier-b1',     type: 'paragraph', name: 'Tier 1 Desc',           x: 128,  y: 2626, width: 244,  height: 72,  content: 'General access to all outdoor stages + festival grounds.',  fontSize: 12, fontFamily: 'Share Tech Mono, monospace', textColor: 'rgba(224,224,224,0.65)', lineHeight: 1.65, opacity: 100 },
  // Tier 2 — highlighted
  { id: 'vw-tier-c2',     type: 'container', name: 'Tier 2 Card',           x: 450,  y: 2460, width: 300,  height: 320, fill: 'rgba(45,27,78,0.95)',       borderColor: '#FF00FF',              radius: 0,   opacity: 100, shadowColor: 'rgba(255,0,255,0.22)' },
  { id: 'vw-tier-bar2',   type: 'container', name: 'Tier 2 Top Bar',        x: 450,  y: 2460, width: 300,  height: 4,   fill: '#FF00FF',                  radius: 0,   opacity: 100 },
  { id: 'vw-tier-badge2', type: 'label',     name: 'Tier 2 Badge',          x: 596,  y: 2474, width: 100,  height: 22,  content: 'POPULAR',               fontSize: 10, fontFamily: 'Share Tech Mono, monospace', textColor: '#090014', fill: '#FF00FF', radius: 0, opacity: 100 },
  { id: 'vw-tier-t2',     type: 'heading',   name: 'Tier 2 Name',           x: 478,  y: 2506, width: 244,  height: 34,  content: 'NEON',                  fontSize: 22, fontWeight: 900, fontFamily: 'Orbitron, sans-serif', textColor: '#FF00FF', opacity: 100 },
  { id: 'vw-tier-p2',     type: 'heading',   name: 'Tier 2 Price',          x: 478,  y: 2550, width: 200,  height: 58,  content: '$349',                  fontSize: 46, fontWeight: 900, fontFamily: 'Orbitron, sans-serif', textColor: '#FF00FF', opacity: 100 },
  { id: 'vw-tier-b2',     type: 'paragraph', name: 'Tier 2 Desc',           x: 478,  y: 2618, width: 244,  height: 88,  content: 'All stages + priority entry, artist lounge access, VIP viewing areas and exclusive merch.',  fontSize: 12, fontFamily: 'Share Tech Mono, monospace', textColor: 'rgba(224,224,224,0.75)', lineHeight: 1.65, opacity: 100 },
  // Tier 3
  { id: 'vw-tier-c3',     type: 'container', name: 'Tier 3 Card',           x: 800,  y: 2480, width: 300,  height: 280, fill: 'rgba(26,16,60,0.85)',       borderColor: '#FF9900',              radius: 0,   opacity: 100 },
  { id: 'vw-tier-bar3',   type: 'container', name: 'Tier 3 Top Bar',        x: 800,  y: 2480, width: 300,  height: 4,   fill: '#FF9900',                  radius: 0,   opacity: 100 },
  { id: 'vw-tier-t3',     type: 'heading',   name: 'Tier 3 Name',           x: 828,  y: 2514, width: 244,  height: 34,  content: 'VOID',                  fontSize: 22, fontWeight: 900, fontFamily: 'Orbitron, sans-serif', textColor: '#FF9900', opacity: 100 },
  { id: 'vw-tier-p3',     type: 'heading',   name: 'Tier 3 Price',          x: 828,  y: 2558, width: 200,  height: 58,  content: '$699',                  fontSize: 46, fontWeight: 900, fontFamily: 'Orbitron, sans-serif', textColor: '#FF9900', opacity: 100 },
  { id: 'vw-tier-b3',     type: 'paragraph', name: 'Tier 3 Desc',           x: 828,  y: 2626, width: 244,  height: 72,  content: 'Full backstage, artist meet & greet, private suite and all-access festival pass.',  fontSize: 12, fontFamily: 'Share Tech Mono, monospace', textColor: 'rgba(224,224,224,0.65)', lineHeight: 1.65, opacity: 100 },

  // ── Sponsors ──────────────────────────────────────────────────────────────────
  { id: 'vw-sponsors-bg',   type: 'container', name: 'Sponsors Section',    x: 0,    y: 2852, width: 1200, height: 240, fill: '#0D0022',                  borderColor: '#2D1B4E',              radius: 0,   opacity: 100 },
  { id: 'vw-sponsors-label',type: 'paragraph', name: 'Sponsors Label',      x: 100,  y: 2906, width: 1000, height: 22,  content: '— POWERED BY —',        fontSize: 12, fontFamily: 'Share Tech Mono, monospace', textColor: 'rgba(224,224,224,0.35)', textAlign: 'center', opacity: 100 },
  { id: 'vw-sponsor-1',     type: 'heading',   name: 'Sponsor 1',           x: 132,  y: 2944, width: 160,  height: 36,  content: 'CYBERTEK',              fontSize: 20, fontWeight: 900, fontFamily: 'Orbitron, sans-serif', textColor: 'rgba(0,255,255,0.45)', opacity: 100 },
  { id: 'vw-sponsor-2',     type: 'heading',   name: 'Sponsor 2',           x: 332,  y: 2944, width: 160,  height: 36,  content: 'NEONLINE',              fontSize: 20, fontWeight: 900, fontFamily: 'Orbitron, sans-serif', textColor: 'rgba(255,0,255,0.45)', opacity: 100 },
  { id: 'vw-sponsor-3',     type: 'heading',   name: 'Sponsor 3',           x: 532,  y: 2944, width: 160,  height: 36,  content: 'VOXEL',                 fontSize: 20, fontWeight: 900, fontFamily: 'Orbitron, sans-serif', textColor: 'rgba(224,224,224,0.4)', opacity: 100 },
  { id: 'vw-sponsor-4',     type: 'heading',   name: 'Sponsor 4',           x: 732,  y: 2944, width: 160,  height: 36,  content: 'GRIDCORE',              fontSize: 20, fontWeight: 900, fontFamily: 'Orbitron, sans-serif', textColor: 'rgba(255,153,0,0.45)', opacity: 100 },
  { id: 'vw-sponsor-5',     type: 'heading',   name: 'Sponsor 5',           x: 932,  y: 2944, width: 160,  height: 36,  content: 'SYNTHCO',               fontSize: 20, fontWeight: 900, fontFamily: 'Orbitron, sans-serif', textColor: 'rgba(0,255,255,0.45)', opacity: 100 },

  // ── Testimonials ─────────────────────────────────────────────────────────────
  { id: 'vw-testi-bg',      type: 'container', name: 'Testimonials Section', x: 0,   y: 3092, width: 1200, height: 480, fill: '#090014',                  radius: 0,   opacity: 100 },
  { id: 'vw-testi-kicker',  type: 'label',     name: 'Testimonials Kicker', x: 100,  y: 3160, width: 250,  height: 26,  content: '> TRANSMISSIONS',       fontSize: 11, fontWeight: 400, fontFamily: 'Share Tech Mono, monospace', textColor: '#FF00FF', fill: 'transparent', radius: 0, opacity: 100 },
  { id: 'vw-testi-title',   type: 'heading',   name: 'Testimonials Heading',x: 100,  y: 3198, width: 600,  height: 64,  content: 'FROM THE GRID',         fontSize: 48, fontWeight: 900, fontFamily: 'Orbitron, sans-serif', textColor: '#E0E0E0', opacity: 100 },
  // Card 1
  { id: 'vw-testi-c1',  type: 'container', name: 'Testimonial 1',          x: 100,  y: 3302, width: 320,  height: 200, fill: 'rgba(26,16,60,0.85)',       borderColor: '#00FFFF',              radius: 0,   opacity: 100 },
  { id: 'vw-testi-bar1',type: 'container', name: 'Testi 1 Bar',            x: 100,  y: 3302, width: 320,  height: 3,   fill: '#00FFFF',                  radius: 0,   opacity: 100 },
  { id: 'vw-testi-q1',  type: 'paragraph', name: 'Testimonial 1 Quote',   x: 120,  y: 3332, width: 280,  height: 96,  content: '<USER_2099> "Nothing compares to the Neon Fest grid. The basslines hit different when the lasers sync."',  fontSize: 13, fontFamily: 'Share Tech Mono, monospace', textColor: 'rgba(224,224,224,0.8)', lineHeight: 1.65, opacity: 100 },
  { id: 'vw-testi-n1',  type: 'paragraph', name: 'Testimonial 1 Name',    x: 120,  y: 3438, width: 200,  height: 22,  content: '// ALEX R. — 2025 ATTENDEE', fontSize: 11, fontFamily: 'Share Tech Mono, monospace', textColor: '#00FFFF', opacity: 100 },
  // Card 2
  { id: 'vw-testi-c2',  type: 'container', name: 'Testimonial 2',          x: 440,  y: 3302, width: 320,  height: 200, fill: 'rgba(26,16,60,0.85)',       borderColor: '#FF00FF',              radius: 0,   opacity: 100 },
  { id: 'vw-testi-bar2',type: 'container', name: 'Testi 2 Bar',            x: 440,  y: 3302, width: 320,  height: 3,   fill: '#FF00FF',                  radius: 0,   opacity: 100 },
  { id: 'vw-testi-q2',  type: 'paragraph', name: 'Testimonial 2 Quote',   x: 460,  y: 3332, width: 280,  height: 96,  content: '<NEON_RIDER> "I\'ve been to 20 festivals. None have the visual design of Neon Fest. Pure art."',  fontSize: 13, fontFamily: 'Share Tech Mono, monospace', textColor: 'rgba(224,224,224,0.8)', lineHeight: 1.65, opacity: 100 },
  { id: 'vw-testi-n2',  type: 'paragraph', name: 'Testimonial 2 Name',    x: 460,  y: 3438, width: 200,  height: 22,  content: '// MIRA K. — VIP HOLDER', fontSize: 11, fontFamily: 'Share Tech Mono, monospace', textColor: '#FF00FF', opacity: 100 },
  // Card 3
  { id: 'vw-testi-c3',  type: 'container', name: 'Testimonial 3',          x: 780,  y: 3302, width: 320,  height: 200, fill: 'rgba(26,16,60,0.85)',       borderColor: '#FF9900',              radius: 0,   opacity: 100 },
  { id: 'vw-testi-bar3',type: 'container', name: 'Testi 3 Bar',            x: 780,  y: 3302, width: 320,  height: 3,   fill: '#FF9900',                  radius: 0,   opacity: 100 },
  { id: 'vw-testi-q3',  type: 'paragraph', name: 'Testimonial 3 Quote',   x: 800,  y: 3332, width: 280,  height: 96,  content: '<VOID_CHILD> "The closing set by VOIDRUNNER at 3am was transcendental. Already have 2026 tickets."',  fontSize: 13, fontFamily: 'Share Tech Mono, monospace', textColor: 'rgba(224,224,224,0.8)', lineHeight: 1.65, opacity: 100 },
  { id: 'vw-testi-n3',  type: 'paragraph', name: 'Testimonial 3 Name',    x: 800,  y: 3438, width: 200,  height: 22,  content: '// DANTE V. — VOID PASS', fontSize: 11, fontFamily: 'Share Tech Mono, monospace', textColor: '#FF9900', opacity: 100 },

  // ── Footer ───────────────────────────────────────────────────────────────────
  { id: 'vw-footer-bg',    type: 'container', name: 'Footer Section',       x: 0,    y: 3572, width: 1200, height: 300, fill: '#0D0022',                  borderColor: '#2D1B4E',              radius: 0,   opacity: 100 },
  { id: 'vw-footer-accent',type: 'container', name: 'Footer Top Accent',    x: 0,    y: 3572, width: 1200, height: 3,   fill: '#FF00FF',                  radius: 0,   opacity: 100 },
  { id: 'vw-footer-logo',  type: 'heading',   name: 'Footer Logo',          x: 100,  y: 3620, width: 280,  height: 50,  content: 'NEON FEST',             fontSize: 32, fontWeight: 900, fontFamily: 'Orbitron, sans-serif', textColor: '#00FFFF', opacity: 100 },
  { id: 'vw-footer-date',  type: 'paragraph', name: 'Footer Date',          x: 100,  y: 3678, width: 300,  height: 22,  content: '> AUG 15-17, 2026 / LA STATE FAIRGROUNDS', fontSize: 11, fontFamily: 'Share Tech Mono, monospace', textColor: 'rgba(224,224,224,0.5)', opacity: 100 },
  { id: 'vw-footer-cta',   type: 'button',    name: 'Footer CTA Button',    x: 100,  y: 3730, width: 180,  height: 48,  content: 'BUY PASSES NOW', fill: '#FF00FF', textColor: '#ffffff', fontSize: 11, fontWeight: 400, fontFamily: 'Share Tech Mono, monospace', radius: 0, opacity: 100 },
  { id: 'vw-footer-links', type: 'paragraph', name: 'Footer Links',         x: 780,  y: 3640, width: 320,  height: 22,  content: 'LINEUP     SCHEDULE     CONTACT', fontSize: 12, fontFamily: 'Share Tech Mono, monospace', textColor: 'rgba(224,224,224,0.5)', textAlign: 'right', opacity: 100 },
  { id: 'vw-footer-social',type: 'paragraph', name: 'Footer Social',        x: 780,  y: 3680, width: 320,  height: 22,  content: 'INSTAGRAM     TWITTER     SPOTIFY', fontSize: 11, fontFamily: 'Share Tech Mono, monospace', textColor: 'rgba(224,224,224,0.35)', textAlign: 'right', opacity: 100 },
  { id: 'vw-footer-copy',  type: 'paragraph', name: 'Footer Copyright',     x: 100,  y: 3828, width: 500,  height: 20,  content: '© 2026 NEON FEST PRODUCTIONS. ALL RIGHTS RESERVED.', fontSize: 11, fontFamily: 'Share Tech Mono, monospace', textColor: 'rgba(224,224,224,0.25)', opacity: 100 },
]

// ─────────────────────────────────────────────────────────────────────────────
// Theme Maps
// Dark = canonical neon-void palette (defined above)
// Light = pastel-retro palette (bright backgrounds, muted neons)
// ─────────────────────────────────────────────────────────────────────────────

const VW_LIGHT_MAP = {
  // Backgrounds
  // FIX: '#090014' was duplicated — once here, and again at the bottom of the
  // map. The bottom entry was silently overwriting this one. Removed the
  // duplicate at the bottom; keeping only this single canonical mapping.
  '#090014':              '#F5F0FF',
  '#0D0022':              '#EDE5FF',
  'rgba(9,0,20,0.92)':   'rgba(237,229,255,0.96)',
  // Cards / glass
  'rgba(26,16,60,0.8)':  'rgba(255,255,255,0.9)',
  'rgba(26,16,60,0.85)': 'rgba(255,255,255,0.92)',
  'rgba(45,27,78,0.95)': 'rgba(245,240,255,0.98)',
  // Text
  '#E0E0E0':             '#1A0040',
  'rgba(224,224,224,0.7)':  'rgba(26,0,64,0.65)',
  'rgba(224,224,224,0.75)': 'rgba(26,0,64,0.65)',
  'rgba(224,224,224,0.8)':  'rgba(26,0,64,0.75)',
  'rgba(224,224,224,0.65)': 'rgba(26,0,64,0.55)',
  'rgba(224,224,224,0.55)': 'rgba(26,0,64,0.45)',
  'rgba(224,224,224,0.5)':  'rgba(26,0,64,0.45)',
  'rgba(224,224,224,0.4)':  'rgba(26,0,64,0.35)',
  'rgba(224,224,224,0.35)': 'rgba(26,0,64,0.30)',
  'rgba(224,224,224,0.25)': 'rgba(26,0,64,0.25)',
  'rgba(224,224,224,0.06)': 'rgba(26,0,64,0.05)',
  // Accent — keep neons but slightly softened
  '#FF00FF':             '#CC00CC',
  '#00FFFF':             '#0099BB',
  '#FF9900':             '#DD7700',
  // Borders
  '#2D1B4E':             '#D4C0F0',
  // Translucent fills
  'rgba(255,0,255,0.18)':  'rgba(180,0,180,0.12)',
  'rgba(255,0,255,0.14)':  'rgba(180,0,180,0.10)',
  'rgba(0,255,255,0.14)':  'rgba(0,140,160,0.10)',
  'rgba(255,153,0,0.14)':  'rgba(180,100,0,0.10)',
  'rgba(255,0,255,0.08)':  'rgba(180,0,180,0.06)',
  'rgba(255,153,0,0.08)':  'rgba(180,100,0,0.06)',
  'rgba(255,153,0,0.10)':  'rgba(180,100,0,0.07)',
  'rgba(255,0,255,0.06)':  'rgba(180,0,180,0.05)',
  'rgba(255,0,255,0.22)':  'rgba(180,0,180,0.14)',
  'rgba(0,255,255,0.45)':  'rgba(0,140,160,0.55)',
  'rgba(255,0,255,0.45)':  'rgba(180,0,180,0.55)',
  'rgba(255,153,0,0.45)':  'rgba(180,100,0,0.55)',
  // REMOVED: duplicate '#090014': '#F5F0FF' that was here — now only defined once above
}

function toVwLightTheme(element) {
  const next = { ...element }
  ;['fill', 'textColor', 'borderColor', 'shadowColor'].forEach(key => {
    if (next[key] && VW_LIGHT_MAP[next[key]]) {
      next[key] = VW_LIGHT_MAP[next[key]]
    }
  })
  return next
}

// ─────────────────────────────────────────────────────────────────────────────
// Lookup tables by id for fast O(1) theme swapping
// ─────────────────────────────────────────────────────────────────────────────

const vwThemeById = {
  dark:  Object.fromEntries(vaporWaveFestElements.map(el => [el.id, el])),
  light: Object.fromEntries(vaporWaveFestElements.map(toVwLightTheme).map(el => [el.id, el])),
}

// ─────────────────────────────────────────────────────────────────────────────
// Public helpers  (mirror the pattern from TechSummit / BoldSummit)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Returns true when the element array belongs to this template.
 * Keyed on the 'vw-' id prefix.
 */
export function isVaporWaveFestTemplate(elements = []) {
  return elements.some(el => String(el.id || '').startsWith('vw-'))
}

/**
 * Swap all theme-sensitive colour tokens in the element list.
 * @param {Array}  elements – current canvas elements
 * @param {string} theme    – 'dark' | 'light'
 */
export function applyVaporWaveFestTheme(elements = [], theme = 'dark') {
  const palette = vwThemeById[theme] || vwThemeById.dark
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
export function getVaporWaveFestCanvasFill(theme = 'dark') {
  return theme === 'light' ? '#F5F0FF' : '#090014'
}