/**
 * MobileNav.jsx
 *
 * Hamburger + slide-in drawer for phone breakpoint preview.
 * Uses position:absolute (not fixed) so it works inside the
 * scaled canvas container without escaping to the viewport.
 */

import { useState, useEffect, useRef, useCallback } from 'react'

const STYLE_ID = '__mnav_styles__'

function injectStyles() {
  if (typeof document === 'undefined') return
  if (document.getElementById(STYLE_ID)) return
  const el = document.createElement('style')
  el.id = STYLE_ID
  el.textContent = `
    @keyframes mnav-slide-in  { from { transform: translateX(-100%); } to { transform: translateX(0); } }
    @keyframes mnav-slide-out { from { transform: translateX(0); }     to { transform: translateX(-100%); } }
    @keyframes mnav-fade-in   { from { opacity: 0; } to { opacity: 1; } }
    @keyframes mnav-fade-out  { from { opacity: 1; } to { opacity: 0; } }
    @keyframes mnav-item-in   { from { opacity: 0; transform: translateX(-12px); } to { opacity: 1; transform: translateX(0); } }
  `
  document.head.appendChild(el)
}

function HamburgerIcon({ open, color }) {
  const bar = {
    display: 'block',
    width: '20px',
    height: '2px',
    background: color,
    borderRadius: '2px',
    transition: 'transform 0.28s cubic-bezier(0.4,0,0.2,1), opacity 0.2s ease',
    transformOrigin: 'center',
  }
  return (
    <span style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
      <span style={{ ...bar, transform: open ? 'translateY(7px) rotate(45deg)' : 'none' }} />
      <span style={{ ...bar, opacity: open ? 0 : 1, transform: open ? 'scaleX(0)' : 'none' }} />
      <span style={{ ...bar, transform: open ? 'translateY(-7px) rotate(-45deg)' : 'none' }} />
    </span>
  )
}

export default function MobileNav({
  links       = [],
  logoText    = 'Brand',
  logoSrc     = null,
  accentColor = '#2348D7',
  backgroundColor = null,
  textColor = null,
  ctaText = 'Get started',
  theme       = 'light',
}) {
  const [open, setOpen]       = useState(false)
  const [closing, setClosing] = useState(false)

  const isDark  = theme === 'dark'
  const bg      = backgroundColor || (isDark ? '#0F172A' : '#FFFFFF')
  const surface = isDark ? '#1E293B' : '#F8FAFC'
  const text    = textColor || (isDark ? '#F1F5F9' : '#0F172A')
  const sub     = isDark ? '#94A3B8' : '#64748B'
  const border  = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'
  const overlay = isDark ? 'rgba(0,0,0,0.65)' : 'rgba(15,23,42,0.40)'

  useEffect(() => { injectStyles() }, [])

  const closeDrawer = useCallback(() => {
    setClosing(true)
    setTimeout(() => { setOpen(false); setClosing(false) }, 280)
  }, [])

  const toggle = () => open ? closeDrawer() : setOpen(true)

  return (
    <>
      {/* ── Sticky header ── */}
      <div style={{
        position:           'absolute',
        top:                0,
        left:               0,
        right:              0,
        height:             52,
        display:            'flex',
        alignItems:         'center',
        justifyContent:     'space-between',
        padding:            '0 16px',
        background:         bg,
        borderBottom:       `1px solid ${border}`,
        zIndex:             100,
        boxSizing:          'border-box',
      }}>
        {/* Hamburger — top-left */}
        <button
          onClick={toggle}
          aria-label={open ? 'Close menu' : 'Open menu'}
          style={{
            display:        'flex',
            flexDirection:  'column',
            alignItems:     'center',
            justifyContent: 'center',
            width:          36,
            height:         36,
            border:         'none',
            background:     'transparent',
            borderRadius:   8,
            cursor:         'pointer',
            padding:        0,
            flexShrink:     0,
          }}
        >
          <HamburgerIcon open={open} color={accentColor} />
        </button>

        {/* Logo — center */}
        <div style={{
          position:       'absolute',
          left:           '50%',
          transform:      'translateX(-50%)',
          fontWeight:     700,
          fontSize:       15,
          color:          text,
          letterSpacing:  '-0.02em',
          whiteSpace:     'nowrap',
          pointerEvents:  'none',
        }}>
          {logoSrc
            ? <img src={logoSrc} alt={logoText} style={{ height: 24, width: 'auto' }} />
            : logoText
          }
        </div>

        {/* CTA — right */}
        <div style={{
          padding:        '6px 12px',
          background:     accentColor,
          color:          '#fff',
          borderRadius:   8,
          fontSize:       12,
          fontWeight:     600,
          letterSpacing:  '0.01em',
          flexShrink:     0,
          cursor:         'pointer',
        }}>
          {ctaText}
        </div>
      </div>

      {/* ── Spacer so content starts below the header ── */}
      <div style={{ height: 52 }} />

      {/* ── Overlay + Drawer ── */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            onClick={closeDrawer}
            style={{
              position:  'absolute',
              top:       0,
              left:      0,
              right:     0,
              bottom:    0,
              background: overlay,
              zIndex:    110,
              animation: `${closing ? 'mnav-fade-out' : 'mnav-fade-in'} 0.28s ease forwards`,
            }}
          />

          {/* Drawer panel */}
          <div style={{
            position:       'absolute',
            top:            0,
            left:           0,
            bottom:         0,
            width:          260,
            background:     bg,
            zIndex:         120,
            display:        'flex',
            flexDirection:  'column',
            boxShadow:      '4px 0 24px rgba(0,0,0,0.15)',
            animation:      `${closing ? 'mnav-slide-out' : 'mnav-slide-in'} 0.28s cubic-bezier(0.4,0,0.2,1) forwards`,
            overflowY:      'auto',
            overscrollBehavior: 'contain',
          }}>

            {/* Drawer header */}
            <div style={{
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'space-between',
              padding:        '0 16px',
              height:         52,
              borderBottom:   `1px solid ${border}`,
              flexShrink:     0,
            }}>
              <span style={{ fontWeight: 700, fontSize: 14, color: text, letterSpacing: '-0.02em' }}>
                {logoText}
              </span>
              <button
                onClick={closeDrawer}
                style={{
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'center',
                  width:          30,
                  height:         30,
                  border:         `1px solid ${border}`,
                  background:     'transparent',
                  borderRadius:   7,
                  cursor:         'pointer',
                  color:          sub,
                  fontSize:       16,
                  lineHeight:     1,
                }}
              >
                ✕
              </button>
            </div>

            {/* Nav items */}
            <div style={{ flex: 1, padding: '8px 0' }}>
              {links.length === 0 ? (
                <div style={{ padding: '20px 16px', color: sub, fontSize: 13, textAlign: 'center' }}>
                  No nav links detected
                </div>
              ) : (
                links.map((link, i) => (
                  <div key={i}>
                    <div
                      style={{
                        display:        'flex',
                        alignItems:     'center',
                        justifyContent: 'space-between',
                        padding:        '13px 16px',
                        color:          text,
                        fontSize:       15,
                        fontWeight:     500,
                        letterSpacing:  '-0.01em',
                        cursor:         'pointer',
                        animation:      `mnav-item-in 0.25s ease ${i * 35}ms both`,
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = surface}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <span>{link.label}</span>
                      <span style={{ color: sub, fontSize: 13 }}>›</span>
                    </div>
                    {i < links.length - 1 && (
                      <div style={{ height: 1, background: border, margin: '0 16px' }} />
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Section label */}
            <div style={{
              borderTop:      `1px solid ${border}`,
              padding:        '6px 16px 4px',
              fontSize:       10,
              fontWeight:     600,
              color:          sub,
              letterSpacing:  '0.08em',
              textTransform:  'uppercase',
            }}>
              Quick links
            </div>

            {/* Footer CTA */}
            <div style={{ padding: '12px 16px 24px', borderTop: `1px solid ${border}` }}>
              <div style={{
                display:       'block',
                width:         '100%',
                padding:       '12px',
                background:    accentColor,
                color:         '#fff',
                borderRadius:  10,
                fontSize:      14,
                fontWeight:    600,
                textAlign:     'center',
                cursor:        'pointer',
                boxSizing:     'border-box',
                boxShadow:     `0 2px 10px ${accentColor}44`,
                letterSpacing: '0.01em',
              }}>
                {ctaText}
              </div>
              <div style={{ marginTop: 10, fontSize: 11, color: sub, textAlign: 'center' }}>
                Need help?{' '}
                <span style={{ color: accentColor, fontWeight: 500, cursor: 'pointer' }}>
                  Contact support
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
