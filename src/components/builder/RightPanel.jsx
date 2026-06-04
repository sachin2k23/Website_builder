import { useState, useRef, useEffect } from 'react'
import {
  ChevronDown, X,
  BringToFront, SendToBack,
  ArrowUp, ArrowDown,
  Upload, ImageIcon,
  Link, ExternalLink, Hash, FileText, ChevronRight,
} from 'lucide-react'
import { HexColorPicker } from 'react-colorful'
import { BREAKPOINTS, getCanvasWidth } from '../../utils/responsive'
import BoxModelVisual from './box-model/BoxModelVisual'

/**
 * Section component - Clean collapsible panel
 */
function Section({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-[#EEF2FA]">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-[#F8FAFF] transition-colors"
      >
        <span className="text-[#0F2348] text-xs font-semibold uppercase tracking-wide">{title}</span>
        <ChevronDown size={13} className={`text-[#AAB8D4] transition-transform duration-200 ${open ? '' : '-rotate-90'}`} />
      </button>
      {open && <div className="px-4 pb-4 space-y-3">{children}</div>}
    </div>
  )
}

/**
 * NumberInput component - For layout and numeric properties
 */
function NumberInput({ label, value, suffix, onChange }) {
  return (
    <div>
      {label && <p className="text-[#AAB8D4] text-[9px] font-medium mb-1.5">{label}</p>}
      <div className="flex items-center bg-[#F3F6FB] border border-[#E2E8F4] rounded-lg overflow-hidden focus-within:border-[#2348D7] transition-colors">
        <input
          type="text"
          inputMode="numeric"
          value={value ?? ''}
          // FIX: prevent Backspace/Delete from bubbling up to canvas keyboard handler
          onKeyDown={(e) => e.stopPropagation()}
          onChange={e => {
            const val = e.target.value
            if (val === '' || val === '-') { onChange?.(0); return }
            const num = Number(val)
            if (!isNaN(num)) onChange?.(num)
          }}
          className="flex-1 px-3 py-2 text-sm text-[#0F2348] bg-transparent outline-none"
        />
        {suffix && <span className="text-[#AAB8D4] text-xs pr-3">{suffix}</span>}
      </div>
    </div>
  )
}

/**
 * ColorRow component - For color properties with picker
 */
function ColorRow({ label, color, onChange, onRemove }) {
  const [open, setOpen] = useState(false)
  const safeColor = color || '#ffffff'

  return (
    <div className="relative">
      <div className="flex items-center justify-between py-1.5">
        <span className="text-[#5E6F8E] text-xs font-medium">{label}</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setOpen(v => !v)}
            className="flex items-center gap-2 bg-[#F3F6FB] border border-[#E2E8F4] rounded-lg px-2 py-1.5 hover:border-[#2348D7] transition-colors cursor-pointer"
          >
            <div className="w-5 h-5 rounded border border-[#D8E1F0] shrink-0" style={{ backgroundColor: safeColor }} />
            <span className="text-xs text-[#0F2348] font-mono">{safeColor.replace('#', '').toUpperCase()}</span>
          </button>
          {onRemove && (
            <button
              onClick={onRemove}
              className="text-[#AAB8D4] hover:text-red-400 transition-colors p-1"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {open && (
        <div className="absolute right-0 z-[100] bg-white border border-[#D8E1F0] rounded-xl shadow-xl p-3 w-[240px] mt-1">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[#0F2348] text-xs font-semibold">{label}</span>
            <button
              onClick={() => setOpen(false)}
              className="text-[#AAB8D4] hover:text-[#0F2348] transition-colors"
            >
              <X size={14} />
            </button>
          </div>
          <HexColorPicker color={safeColor} onChange={onChange} style={{ width: '100%' }} />
          <div className="mt-3 flex gap-2">
            <div className="flex items-center bg-[#F3F6FB] border border-[#E2E8F4] rounded-lg overflow-hidden flex-1 focus-within:border-[#2348D7]">
              <span className="text-[#AAB8D4] text-xs pl-3">#</span>
              <input
                type="text"
                value={safeColor.replace('#', '').toUpperCase()}
                onKeyDown={(e) => e.stopPropagation()}
                onChange={e => onChange('#' + e.target.value.replace('#', ''))}
                maxLength={6}
                className="flex-1 px-2 py-2 text-xs text-[#0F2348] bg-transparent outline-none font-mono"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * ImageUploadSection - For image elements
 */
function ImageUploadSection({ selected, onUpdate }) {
  const fileRef = useRef(null)
  const [dragging, setDragging] = useState(false)
  const [tab, setTab] = useState('upload')
  const [urlValue, setUrlValue] = useState(selected.src?.startsWith('http') ? selected.src : '')

  const handleFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = e => onUpdate(selected.id, { src: e.target.result })
    reader.readAsDataURL(file)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    handleFile(e.dataTransfer.files?.[0])
  }

  const applyUrl = () => {
    if (urlValue.trim()) onUpdate(selected.id, { src: urlValue.trim() })
  }

  return (
    <Section title="Image" defaultOpen>
      <div className="flex gap-1 p-1 bg-[#F3F6FB] rounded-lg mb-3">
        {['upload', 'url'].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-1.5 rounded text-[10px] font-medium transition-colors ${tab === t ? 'bg-white text-[#0F2348] shadow-sm' : 'text-[#8A9ABB] hover:text-[#0F2348]'}`}
          >
            {t === 'url' ? 'URL' : 'Upload'}
          </button>
        ))}
      </div>

      {selected.src ? (
        <div className="flex flex-col gap-2">
          <div className="w-full rounded-lg overflow-hidden border border-[#E2E8F4] bg-[#F7F9FD]" style={{ aspectRatio: '16/9' }}>
            <img src={selected.src} alt="preview" className="w-full h-full object-cover" />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => { onUpdate(selected.id, { src: null }); setUrlValue('') }}
              className="flex-1 py-2 rounded-lg border border-[#E2E8F4] text-[#5E6F8E] text-xs hover:border-[#2348D7] hover:text-[#2348D7] hover:bg-[#EEF3FF] transition-all font-medium"
            >
              Replace
            </button>
            <button
              onClick={() => { onUpdate(selected.id, { src: null }); setUrlValue('') }}
              className="px-3 py-2 rounded-lg border border-[#FFE4E4] text-red-400 text-xs hover:bg-red-50 transition-all"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      ) : tab === 'upload' ? (
        <div
          onDragOver={e => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileRef.current?.click()}
          className="w-full flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed cursor-pointer transition-all py-6"
          style={{
            borderColor: dragging ? '#2348D7' : '#D8E1F0',
            backgroundColor: dragging ? '#EEF3FF' : '#F7F9FD',
          }}
        >
          <ImageIcon size={20} className={dragging ? 'text-[#2348D7]' : 'text-[#AAB8D4]'} />
          <div className="text-center">
            <p className="text-[#5E6F8E] text-xs font-medium">Drop image here</p>
            <p className="text-[#AAB8D4] text-[10px] mt-1">or click to browse</p>
          </div>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => handleFile(e.target.files?.[0])} />
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <input
            type="url"
            placeholder="https://example.com/image.jpg"
            value={urlValue}
            onKeyDown={e => { e.stopPropagation(); if (e.key === 'Enter') applyUrl() }}
            onChange={e => setUrlValue(e.target.value)}
            className="w-full px-3 py-2 text-xs text-[#0F2348] bg-[#F3F6FB] border border-[#E2E8F4] rounded-lg outline-none focus:border-[#2348D7] placeholder-[#C5D0E4] transition-colors"
          />
          <button
            onClick={applyUrl}
            className="w-full py-2 bg-[#2348D7] text-white text-xs font-semibold rounded-lg hover:bg-[#1B3FC8] transition-colors"
          >
            Apply URL
          </button>
        </div>
      )}

      <div className="pt-2 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[#5E6F8E] text-xs font-medium">Fit</span>
          <div className="flex gap-1">
            {['cover', 'contain', 'fill'].map(fit => (
              <button
                key={fit}
                onClick={() => onUpdate(selected.id, { objectFit: fit })}
                className={`px-2 py-1 rounded text-[10px] border transition-colors capitalize font-medium ${(selected.objectFit || 'cover') === fit ? 'bg-[#EEF3FF] border-[#2348D7] text-[#2348D7]' : 'border-[#E2E8F4] text-[#5E6F8E] hover:border-[#2348D7]'}`}
              >
                {fit}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[#AAB8D4] text-[9px] font-medium mb-1.5">Alt text</p>
          <input
            type="text"
            placeholder="Describe the image…"
            value={selected.alt || ''}
            onKeyDown={(e) => e.stopPropagation()}
            onChange={e => onUpdate(selected.id, { alt: e.target.value })}
            className="w-full px-3 py-2 text-xs text-[#0F2348] bg-[#F3F6FB] border border-[#E2E8F4] rounded-lg outline-none focus:border-[#2348D7] transition-colors placeholder-[#C5D0E4]"
          />
        </div>
      </div>
    </Section>
  )
}

// ─── LINK SECTION ────────────────────────────────────────────────────────────

const LINK_TYPES = [
  { id: 'none',   label: 'None',   icon: X          },
  { id: 'page',   label: 'Page',   icon: FileText   },
  { id: 'url',    label: 'URL',    icon: ExternalLink },
  { id: 'anchor', label: 'Anchor', icon: Hash       },
]

/**
 * LinkSection - Full page/URL/anchor linking panel
 */
function LinkSection({ selected, onUpdate, pages = [] }) {
  const linkType   = selected.linkType || 'none'
  const update     = (patch) => onUpdate(selected.id, patch)

  const resolvedHref = (() => {
    if (linkType === 'url')    return selected.linkHref   || ''
    if (linkType === 'page')   return selected.linkPage   ? `/${selected.linkPage}`   : ''
    if (linkType === 'anchor') return selected.linkAnchor ? `#${selected.linkAnchor}` : ''
    return ''
  })()

  return (
    <Section title="Link" defaultOpen={false}>
      {/* ── Type pills ── */}
      <div>
        <p className="text-[#AAB8D4] text-[8px] font-semibold uppercase tracking-wider mb-2">Link Type</p>
        <div className="grid grid-cols-4 gap-1">
          {LINK_TYPES.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => update({ linkType: id, link: id === 'none' ? '' : selected.link })}
              className={`flex flex-col items-center gap-1 py-2 rounded-lg border text-[9px] font-semibold transition-all ${
                linkType === id
                  ? 'bg-[#EEF3FF] border-[#2348D7] text-[#2348D7]'
                  : 'border-[#E2E8F4] text-[#8A9ABB] hover:border-[#2348D7] hover:text-[#2348D7] hover:bg-[#F8FAFF]'
              }`}
            >
              <Icon size={12} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── None state ── */}
      {linkType === 'none' && (
        <div className="flex items-center gap-2 py-2 px-3 bg-[#F7F9FD] rounded-lg border border-[#EEF2FA]">
          <Link size={12} className="text-[#C5D0E4]" />
          <span className="text-[#C5D0E4] text-[10px]">No link assigned</span>
        </div>
      )}

      {/* ── Page link ── */}
      {linkType === 'page' && (
        <div className="space-y-2">
          <p className="text-[#AAB8D4] text-[8px] font-semibold uppercase tracking-wider">Target Page</p>
          {pages.length === 0 ? (
            <div className="flex items-center gap-2 py-2.5 px-3 bg-[#FFF8F0] rounded-lg border border-[#FFE4B5]">
              <span className="text-[#C8962C] text-[10px] font-medium">No pages found — add pages first</span>
            </div>
          ) : (
            <div className="space-y-1 max-h-[160px] overflow-y-auto pr-0.5">
              {pages.map(page => (
                <button
                  key={page.id}
                  onClick={() => update({ linkPage: page.id, link: `/${page.id}` })}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg border text-xs font-medium transition-all ${
                    selected.linkPage === page.id
                      ? 'bg-[#EEF3FF] border-[#2348D7] text-[#2348D7]'
                      : 'border-[#E2E8F4] text-[#5E6F8E] hover:border-[#2348D7] hover:bg-[#F8FAFF]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <FileText size={11} />
                    <span>{page.name}</span>
                  </div>
                  {selected.linkPage === page.id && (
                    <div className="w-1.5 h-1.5 rounded-full bg-[#2348D7]" />
                  )}
                </button>
              ))}
            </div>
          )}

          <div>
            <p className="text-[#AAB8D4] text-[8px] font-semibold uppercase tracking-wider mb-1.5">
              Scroll to section <span className="text-[#C5D0E4] font-normal normal-case">(optional)</span>
            </p>
            <div className="flex items-center bg-[#F3F6FB] border border-[#E2E8F4] rounded-lg overflow-hidden focus-within:border-[#2348D7] transition-colors">
              <span className="text-[#AAB8D4] text-xs pl-3">#</span>
              <input
                type="text"
                placeholder="section-id"
                value={selected.linkPageAnchor || ''}
                onKeyDown={(e) => e.stopPropagation()}
                onChange={e => update({ linkPageAnchor: e.target.value.replace(/\s/g, '-').toLowerCase() })}
                className="flex-1 px-2 py-2 text-xs text-[#0F2348] bg-transparent outline-none placeholder-[#C5D0E4]"
              />
            </div>
          </div>
        </div>
      )}

      {/* ── External URL ── */}
      {linkType === 'url' && (
        <div className="space-y-2">
          <p className="text-[#AAB8D4] text-[8px] font-semibold uppercase tracking-wider">URL</p>
          <div className="flex items-center bg-[#F3F6FB] border border-[#E2E8F4] rounded-lg overflow-hidden focus-within:border-[#2348D7] transition-colors">
            <ExternalLink size={11} className="text-[#AAB8D4] ml-3 shrink-0" />
            <input
              type="url"
              placeholder="https://example.com"
              value={selected.linkHref || ''}
              onKeyDown={(e) => e.stopPropagation()}
              onChange={e => update({ linkHref: e.target.value, link: e.target.value })}
              className="flex-1 px-2 py-2 text-xs text-[#0F2348] bg-transparent outline-none placeholder-[#C5D0E4]"
            />
          </div>
        </div>
      )}

      {/* ── Anchor / scroll target ── */}
      {linkType === 'anchor' && (
        <div className="space-y-2">
          <p className="text-[#AAB8D4] text-[8px] font-semibold uppercase tracking-wider">Section ID</p>
          <div className="flex items-center bg-[#F3F6FB] border border-[#E2E8F4] rounded-lg overflow-hidden focus-within:border-[#2348D7] transition-colors">
            <span className="text-[#AAB8D4] text-xs pl-3">#</span>
            <input
              type="text"
              placeholder="section-id"
              value={selected.linkAnchor || ''}
              onKeyDown={(e) => e.stopPropagation()}
              onChange={e => {
                const val = e.target.value.replace(/\s/g, '-').toLowerCase()
                update({ linkAnchor: val, link: `#${val}` })
              }}
              className="flex-1 px-2 py-2 text-xs text-[#0F2348] bg-transparent outline-none placeholder-[#C5D0E4]"
            />
          </div>
          <p className="text-[#AAB8D4] text-[9px]">Smooth-scrolls to any element with this ID on the same page.</p>
        </div>
      )}

      {/* ── Open in / Target ── */}
      {linkType !== 'none' && (
        <div>
          <p className="text-[#AAB8D4] text-[8px] font-semibold uppercase tracking-wider mb-2">Open in</p>
          <div className="flex gap-1">
            {[
              { val: '_self',  label: 'Same tab' },
              { val: '_blank', label: 'New tab'  },
            ].map(opt => (
              <button
                key={opt.val}
                onClick={() => update({ linkTarget: opt.val })}
                className={`flex-1 py-1.5 rounded-lg border text-[10px] font-medium transition-all ${
                  (selected.linkTarget || '_self') === opt.val
                    ? 'bg-[#EEF3FF] border-[#2348D7] text-[#2348D7]'
                    : 'border-[#E2E8F4] text-[#8A9ABB] hover:border-[#2348D7]'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Resolved href preview ── */}
      {resolvedHref && (
        <div className="flex items-center gap-2 py-2 px-3 bg-[#F3F6FB] rounded-lg border border-[#E2E8F4]">
          <ChevronRight size={10} className="text-[#2348D7] shrink-0" />
          <span className="text-[#5E6F8E] text-[10px] font-mono truncate">{resolvedHref}</span>
        </div>
      )}
    </Section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────

const TEXT_TYPES = ['heading', 'paragraph', 'text', 'link', 'button', 'label']

/**
 * RightPanel - Main properties panel
 */
export default function RightPanel({
  selected,
  onUpdate,
  canvasSettings,
  elements = [],
  onCanvasUpdate,
  onDelete,
  onDuplicate,
  onReorder,
  activeBreakpoint = 'desktop',
  customWidth = 800,
  pages = [],
}) {
  const [showBorder, setShowBorder] = useState(!!selected?.borderColor)
  const [showShadow, setShowShadow] = useState(!!selected?.shadowColor)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  useEffect(() => {
    setShowBorder(!!selected?.borderColor)
    setShowShadow(!!selected?.shadowColor)
  }, [selected?.id])

  const isText  = selected && TEXT_TYPES.includes(selected.type)
  const isImage = selected?.type === 'image'
  const update  = (key, val) => { if (selected) onUpdate(selected.id, { [key]: val }) }

  const breakpoint  = BREAKPOINTS.find(bp => bp.id === activeBreakpoint)
  const canvasWidth = getCanvasWidth(activeBreakpoint, canvasSettings, customWidth)

  return (
    <div className="w-[280px] h-full bg-white border-l border-[#D8E1F0] flex flex-col shrink-0 overflow-y-auto">
      {selected ? (
        <>
          {/* ── Header ── */}
          <div className="px-4 py-3 border-b border-[#EEF2FA] shrink-0 bg-gradient-to-b from-[#F8FAFF] to-white space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#AAB8D4] text-[9px] font-semibold uppercase tracking-widest">ELEMENT</p>
                <p className="text-[#0F2348] text-sm font-bold mt-1 capitalize">{selected.type}</p>
                <p className="text-[#2348D7] text-[9px] font-semibold mt-1">{breakpoint?.label}</p>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => onDuplicate(selected.id)}
                  title="Duplicate"
                  className="w-8 h-8 rounded-lg flex items-center justify-center border border-[#E2E8F4] text-[#8A9ABB] hover:border-[#2348D7] hover:text-[#2348D7] hover:bg-[#EEF3FF] transition-all text-sm font-semibold"
                >
                  ⧉
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  title="Delete"
                  className="w-8 h-8 rounded-lg flex items-center justify-center border border-[#E2E8F4] text-[#8A9ABB] hover:border-red-300 hover:text-red-400 hover:bg-red-50 transition-all"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* Element name field */}
            <input
              type="text"
              value={selected.label || selected.type}
              onChange={(e) => onUpdate(selected.id, { label: e.target.value })}
              // FIX: prevent Backspace from bubbling to canvas and deleting the element
              onKeyDown={(e) => e.stopPropagation()}
              placeholder="Element name"
              className="w-full px-3 py-2 text-xs text-[#0F2348] bg-[#F3F6FB] border border-[#E2E8F4] rounded outline-none focus:border-[#2348D7] transition-colors"
            />

            {/* Delete Confirmation Dialog */}
            {showDeleteConfirm && (
              <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-[100]">
                <div className="bg-white rounded-lg shadow-xl p-4 w-96 max-w-[calc(100%-2rem)]">
                  <h3 className="text-sm font-bold text-[#0F2348] mb-2">Delete Element?</h3>
                  <p className="text-xs text-[#5E6F8E] mb-4">This action cannot be undone. The element will be permanently deleted.</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        onDelete(selected.id)
                        setShowDeleteConfirm(false)
                      }}
                      className="flex-1 py-2 bg-red-500 text-white text-xs font-medium rounded hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => setShowDeleteConfirm(false)}
                      className="flex-1 py-2 bg-[#F3F6FB] text-[#5E6F8E] text-xs font-medium rounded hover:bg-[#E3ECFF] transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ── Content field for text elements ── */}
          {isText && (
            <Section title="Content" defaultOpen={true}>
              <textarea
                value={selected.content || ''}
                onChange={(e) => onUpdate(selected.id, { content: e.target.value })}
                onKeyDown={(e) => e.stopPropagation()}
                placeholder="Element text..."
                className="w-full h-24 px-3 py-2 text-xs text-[#0F2348] bg-[#F3F6FB] border border-[#E2E8F4] rounded outline-none focus:border-[#2348D7] resize-none"
              />
            </Section>
          )}

          {/* ── Image upload ── */}
          {isImage && <ImageUploadSection selected={selected} onUpdate={onUpdate} />}

          {/* ── LINK — after Content ── */}
          <LinkSection selected={selected} onUpdate={onUpdate} pages={pages} />

          {/* ── LAYOUT ── */}
          <Section title="Layout" defaultOpen={true}>
            <div className="space-y-3">
              <div>
                <p className="text-[#AAB8D4] text-[8px] font-semibold uppercase tracking-wider mb-2">Position</p>
                <div className="grid grid-cols-2 gap-2">
                  <NumberInput label="X" value={Math.round(selected.x || 0)} suffix="px" onChange={val => update('x', val)} />
                  <NumberInput label="Y" value={Math.round(selected.y || 0)} suffix="px" onChange={val => update('y', val)} />
                </div>
              </div>
              <div>
                <p className="text-[#AAB8D4] text-[8px] font-semibold uppercase tracking-wider mb-2">Size</p>
                <div className="grid grid-cols-2 gap-2">
                  <NumberInput label="W" value={Math.round(selected.width  || 200)} suffix="px" onChange={val => update('width',  val)} />
                  <NumberInput label="H" value={Math.round(selected.height || 100)} suffix="px" onChange={val => update('height', val)} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <NumberInput label="Rotation" value={Math.round(selected.rotation || 0)} suffix="°" onChange={val => update('rotation', val)} />
                <NumberInput label="Z-Index"  value={Math.round(selected.zIndex   || 0)}            onChange={val => update('zIndex',    val)} />
              </div>

              {/* Display mode */}
              <div>
                <p className="text-[#AAB8D4] text-[8px] font-semibold uppercase tracking-wider mb-2">Display</p>
                <div className="grid grid-cols-3 gap-1">
                  {['block', 'flex', 'grid'].map(mode => (
                    <button
                      key={mode}
                      onClick={() => {
                        const updateObj = { display: mode }
                        if (mode === 'flex') {
                          updateObj.flexDirection  = 'row'
                          updateObj.alignItems     = 'center'
                          updateObj.justifyContent = 'flex-start'
                          updateObj.gap            = 8
                        } else if (mode === 'grid') {
                          updateObj.gridCols = 2
                          updateObj.gap      = 16
                        }
                        onUpdate(selected.id, updateObj)
                      }}
                      className={`py-1.5 rounded text-[10px] font-semibold capitalize transition-colors border ${
                        (selected.display || 'block') === mode
                          ? 'bg-[#EEF3FF] border-[#2348D7] text-[#2348D7]'
                          : 'border-[#E2E8F4] text-[#8A9ABB] hover:border-[#2348D7]'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              {/* Flex options */}
              {selected.display === 'flex' && (
                <div className="space-y-2 pt-2 border-t border-[#EEF2FA]">
                  <div>
                    <p className="text-[#AAB8D4] text-[8px] font-semibold uppercase tracking-wider mb-2">Direction</p>
                    <div className="grid grid-cols-2 gap-1">
                      {['row', 'column'].map(dir => (
                        <button
                          key={dir}
                          onClick={() => onUpdate(selected.id, { flexDirection: dir })}
                          className={`py-1.5 rounded text-[9px] font-semibold capitalize transition-colors border ${
                            (selected.flexDirection || 'row') === dir
                              ? 'bg-[#EEF3FF] border-[#2348D7] text-[#2348D7]'
                              : 'border-[#E2E8F4] text-[#8A9ABB] hover:border-[#2348D7]'
                          }`}
                        >
                          {dir}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[#AAB8D4] text-[8px] font-semibold uppercase tracking-wider mb-2">Align Items</p>
                    <div className="grid grid-cols-2 gap-1">
                      {['flex-start', 'center', 'flex-end', 'stretch'].map(align => (
                        <button
                          key={align}
                          onClick={() => onUpdate(selected.id, { alignItems: align })}
                          className={`py-1.5 rounded text-[9px] font-semibold transition-colors border ${
                            (selected.alignItems || 'center') === align
                              ? 'bg-[#EEF3FF] border-[#2348D7] text-[#2348D7]'
                              : 'border-[#E2E8F4] text-[#8A9ABB] hover:border-[#2348D7]'
                          }`}
                        >
                          {align.replace('flex-', '')}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[#AAB8D4] text-[8px] font-semibold uppercase tracking-wider mb-2">Justify Content</p>
                    <div className="grid grid-cols-2 gap-1">
                      {['flex-start', 'center', 'flex-end', 'space-between'].map(justify => (
                        <button
                          key={justify}
                          onClick={() => onUpdate(selected.id, { justifyContent: justify })}
                          className={`py-1.5 rounded text-[9px] font-semibold transition-colors border ${
                            (selected.justifyContent || 'flex-start') === justify
                              ? 'bg-[#EEF3FF] border-[#2348D7] text-[#2348D7]'
                              : 'border-[#E2E8F4] text-[#8A9ABB] hover:border-[#2348D7]'
                          }`}
                        >
                          {justify.replace('flex-', '')}
                        </button>
                      ))}
                    </div>
                  </div>
                  <NumberInput label="Gap" value={selected.gap || 8} suffix="px" onChange={val => onUpdate(selected.id, { gap: Math.max(0, val) })} />
                </div>
              )}

              {/* Grid options */}
              {selected.display === 'grid' && (
                <div className="space-y-2 pt-2 border-t border-[#EEF2FA]">
                  <NumberInput label="Columns" value={selected.gridCols || 2}  onChange={val => onUpdate(selected.id, { gridCols: Math.max(1, val) })} />
                  <NumberInput label="Gap"     value={selected.gap      || 16} suffix="px" onChange={val => onUpdate(selected.id, { gap: Math.max(0, val) })} />
                </div>
              )}
            </div>
          </Section>

          {/* ── SPACING / BOX MODEL ── */}
          <BoxModelVisual element={selected} onUpdate={onUpdate} />

          {/* ── APPEARANCE ── */}
          <Section title="Appearance" defaultOpen={true}>
            <div className="space-y-3">
              {!isImage && (
                <ColorRow label="Background" color={selected.fill || '#ffffff'} onChange={val => update('fill', val)} />
              )}
              <NumberInput label="Border Radius" value={Math.round(selected.radius || 0)} suffix="px" onChange={val => update('radius', val)} />

              {/* Overflow */}
              <div>
                <p className="text-[#AAB8D4] text-[8px] font-semibold uppercase tracking-wider mb-2">Overflow</p>
                <div className="grid grid-cols-3 gap-1">
                  {['visible', 'hidden', 'scroll'].map(mode => (
                    <button
                      key={mode}
                      onClick={() => onUpdate(selected.id, { overflow: mode })}
                      className={`py-1.5 rounded text-[9px] font-semibold capitalize transition-colors border ${
                        (selected.overflow || 'visible') === mode
                          ? 'bg-[#EEF3FF] border-[#2348D7] text-[#2348D7]'
                          : 'border-[#E2E8F4] text-[#8A9ABB] hover:border-[#2348D7]'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cursor */}
              <div>
                <p className="text-[#AAB8D4] text-[8px] font-semibold uppercase tracking-wider mb-2">Cursor</p>
                <select
                  value={selected.cursor || 'default'}
                  onChange={(e) => onUpdate(selected.id, { cursor: e.target.value })}
                  className="w-full bg-[#F3F6FB] border border-[#E2E8F4] rounded-lg px-3 py-2 text-xs text-[#0F2348] outline-none focus:border-[#2348D7]"
                >
                  {['default', 'pointer', 'text', 'grab', 'not-allowed'].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Border */}
              {showBorder ? (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[#AAB8D4] text-[8px] font-semibold uppercase tracking-wider">Border</span>
                    <button onClick={() => { setShowBorder(false); update('borderColor', null) }} className="text-[#AAB8D4] hover:text-red-400 transition-colors p-1"><X size={12} /></button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-[#5E6F8E] text-[9px] font-medium mb-1">Width</p>
                      <NumberInput value={selected.borderWidth || 1} suffix="px" onChange={val => update('borderWidth', val)} />
                    </div>
                    <ColorRow label="Color" color={selected.borderColor || '#e2e8f4'} onChange={val => update('borderColor', val)} />
                  </div>
                </div>
              ) : (
                <button onClick={() => { setShowBorder(true); update('borderColor', '#e2e8f4'); update('borderWidth', 1) }} className="w-full py-2 rounded-lg border border-dashed border-[#D8E1F0] text-[#AAB8D4] hover:text-[#2348D7] hover:border-[#2348D7] text-xs font-medium transition-colors">+ Add Border</button>
              )}

              {/* Shadow */}
              {showShadow ? (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[#AAB8D4] text-[8px] font-semibold uppercase tracking-wider">Shadow</span>
                    <button onClick={() => { setShowShadow(false); update('shadowColor', null) }} className="text-[#AAB8D4] hover:text-red-400 transition-colors p-1"><X size={12} /></button>
                  </div>
                  <ColorRow label="Color" color={selected.shadowColor || '#00000033'} onChange={val => update('shadowColor', val)} />
                </div>
              ) : (
                <button onClick={() => { setShowShadow(true); update('shadowColor', '#00000033') }} className="w-full py-2 rounded-lg border border-dashed border-[#D8E1F0] text-[#AAB8D4] hover:text-[#2348D7] hover:border-[#2348D7] text-xs font-medium transition-colors">+ Add Shadow</button>
              )}

              <NumberInput label="Opacity" value={selected.opacity ?? 100} suffix="%" onChange={val => update('opacity', Math.min(100, Math.max(0, val)))} />
            </div>
          </Section>

          {/* ── TYPOGRAPHY ── */}
          {isText && (
            <Section title="Typography" defaultOpen={true}>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <NumberInput label="Size"        value={selected.fontSize   || 16} suffix="px" onChange={val => update('fontSize',   val)} />
                  <NumberInput label="Line Height" value={selected.lineHeight || ''} suffix="px" onChange={val => update('lineHeight', val)} />
                </div>

{/* Breakpoint font sizes — actual stored values */}
<div className="p-2.5 bg-[#F7F9FD] rounded-lg border border-[#EEF2FA]">
  <p className="text-[#5E6F8E] text-[9px] font-semibold mb-2">Font size per breakpoint</p>
  <div className="space-y-1.5">
    {['desktop', 'tablet', 'phone'].map(bp => {
      const bpProps = selected[bp]
      const size = bpProps?.fontSize ?? selected.fontSize ?? 16
      const isActive = activeBreakpoint === bp
      return (
        <div key={bp} className={`flex items-center justify-between text-[10px] px-2 py-1 rounded ${isActive ? 'bg-[#EEF3FF]' : ''}`}>
          <span className={isActive ? 'text-[#2348D7] font-semibold' : 'text-[#AAB8D4] capitalize'}>{bp}</span>
          <span className={`font-mono ${isActive ? 'text-[#2348D7] font-bold' : 'text-[#5E6F8E]'}`}>{size}px</span>
        </div>
      )
    })}
  </div>
  <p className="text-[#AAB8D4] text-[8px] mt-2">Edit each breakpoint independently</p>
</div>

                <div>
                  <p className="text-[#AAB8D4] text-[9px] font-medium mb-1.5">Font Family</p>
                  <select
                    value={selected.fontFamily || 'Inter'}
                    onChange={e => update('fontFamily', e.target.value)}
                    className="w-full bg-[#F3F6FB] border border-[#E2E8F4] rounded-lg px-3 py-2 text-xs text-[#0F2348] outline-none focus:border-[#2348D7] transition-colors"
                  >
                    {['Inter', 'Poppins', 'Playfair Display', 'Roboto', 'Lato', 'Montserrat', 'Georgia', 'Merriweather'].map(f => (
                      <option key={f}>{f}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <p className="text-[#AAB8D4] text-[9px] font-medium mb-1.5">Weight</p>
                  <div className="grid grid-cols-3 gap-2">
                    {[{ label: '400', val: 400 }, { label: '500', val: 500 }, { label: '700', val: 700 }].map(w => (
                      <button key={w.val} onClick={() => update('fontWeight', w.val)} className={`py-2 rounded-lg text-[11px] border font-semibold transition-colors ${(selected.fontWeight || 400) === w.val ? 'bg-[#EEF3FF] border-[#2348D7] text-[#2348D7]' : 'border-[#E2E8F4] text-[#5E6F8E] hover:border-[#2348D7]'}`}>{w.label}</button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-[#AAB8D4] text-[9px] font-medium mb-1.5">Format</p>
                  <div className="flex items-center gap-1 mb-2">
                    {[
                      { ch: 'B', title: 'Bold',      active: (selected.fontWeight || 400) >= 700, click: () => update('fontWeight', (selected.fontWeight || 400) >= 700 ? 400 : 700) },
                      { ch: 'I', title: 'Italic',    active: !!selected.italic,    click: () => update('italic',    !selected.italic)    },
                      { ch: 'U', title: 'Underline', active: !!selected.underline, click: () => update('underline', !selected.underline) },
                    ].map(b => (
                      <button key={b.ch} onClick={b.click} title={b.title} className={`w-8 h-8 rounded-lg flex items-center justify-center border text-xs font-bold transition-colors ${b.active ? 'bg-[#EEF3FF] border-[#2348D7] text-[#2348D7]' : 'border-[#E2E8F4] text-[#5E6F8E] hover:border-[#2348D7]'}`}>{b.ch}</button>
                    ))}
                    <div className="w-px h-6 bg-[#E2E8F4] mx-1" />
                    {[{ a: 'left', i: '◀' }, { a: 'center', i: '●' }, { a: 'right', i: '▶' }].map(({ a, i }) => (
                      <button key={a} onClick={() => update('textAlign', a)} title={`Align ${a}`} className={`w-8 h-8 rounded-lg flex items-center justify-center border text-xs transition-colors ${(selected.textAlign || 'left') === a ? 'bg-[#EEF3FF] border-[#2348D7] text-[#2348D7]' : 'border-[#E2E8F4] text-[#5E6F8E] hover:border-[#2348D7]'}`}>{i}</button>
                    ))}
                  </div>
                </div>

                <ColorRow label="Color" color={selected.textColor || '#111827'} onChange={val => update('textColor', val)} />
              </div>
            </Section>
          )}

          {/* ── ACTIONS ── */}
          <Section title="Actions" defaultOpen={false}>
            <div className="space-y-2">
              <div>
                <p className="text-[#AAB8D4] text-[8px] font-semibold uppercase tracking-wider mb-2">Arrange</p>
                <div className="grid grid-cols-4 gap-1">
                  {[
                    { fn: 'back-all', icon: SendToBack,   label: 'Back All' },
                    { fn: 'back',     icon: ArrowDown,    label: 'Back'     },
                    { fn: 'forward',  icon: ArrowUp,      label: 'Forward'  },
                    { fn: 'front',    icon: BringToFront, label: 'Front'    },
                  ].map(({ fn, icon: Icon, label }) => (
                    <button key={fn} onClick={() => onReorder(selected.id, fn)} title={label} className="flex flex-col items-center gap-1 py-2 rounded-lg border border-[#E2E8F4] hover:border-[#2348D7] hover:bg-[#EEF3FF] text-[#5E6F8E] hover:text-[#2348D7] transition-all">
                      <Icon size={13} />
                      <span className="text-[8px] font-medium">{label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Section>
        </>
      ) : (
        <>
          {/* ── Canvas properties (no element selected) ── */}
          <div className="px-4 py-3 border-b border-[#EEF2FA] shrink-0 bg-gradient-to-b from-[#F8FAFF] to-white">
            <p className="text-[#AAB8D4] text-[9px] font-semibold uppercase tracking-widest">CANVAS</p>
            <p className="text-[#0F2348] text-sm font-bold mt-1">Properties</p>
            <p className="text-[#2348D7] text-[9px] font-semibold mt-1">{breakpoint?.label}</p>
          </div>

          <Section title="Layout" defaultOpen={true}>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <NumberInput label="X" value={canvasSettings.x || 0} suffix="px" onChange={val => onCanvasUpdate({ x: val })} />
                <NumberInput label="Y" value={canvasSettings.y || 0} suffix="px" onChange={val => onCanvasUpdate({ y: val })} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <NumberInput label="Width"  value={canvasWidth}           onChange={val => activeBreakpoint === 'desktop' && val > 0 && onCanvasUpdate({ width: val })} />
                <NumberInput label="Height" value={canvasSettings.height} onChange={val => val > 0 && onCanvasUpdate({ height: val })} />
              </div>
            </div>
          </Section>

          <Section title="Appearance" defaultOpen={true}>
            <ColorRow label="Background" color={canvasSettings.fill} onChange={val => onCanvasUpdate({ fill: val })} />
          </Section>

          <Section title="Typography" defaultOpen={false}>
            <div className="grid grid-cols-2 gap-2">
              <NumberInput label="Base Size"   value={canvasSettings.fontSize   || 16} suffix="px" onChange={val => onCanvasUpdate({ fontSize:   val })} />
              <NumberInput label="Line Height" value={canvasSettings.lineHeight || ''}              onChange={val => onCanvasUpdate({ lineHeight: val })} />
            </div>
          </Section>
        </>
      )}
    </div>
  )
}