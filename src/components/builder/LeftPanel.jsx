import { useEffect, useCallback, useMemo, useRef, useState } from 'react'
import {
  ChevronDown,
  ChevronRight,
  Eye,
  EyeOff,
  Folder,
  Home,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  X,
  FileText,
} from 'lucide-react'

const GROUP_BG = '#EAF6FF'

const TYPE_META = {
  desktop:   { label: 'Desktop',   icon: DesktopIcon,   color: '#35A7F2', bg: '#EFF6FF' },
  content:   { label: 'Content',   icon: StackIcon,     color: '#0EA5E9', bg: GROUP_BG },
  section:   { label: 'Section',   icon: SectionIcon,   color: '#35A7F2', bg: '#EFF6FF' },
  container: { label: 'Container', icon: FrameIcon,     color: '#0EA5E9', bg: '#EFF6FF' },
  card:      { label: 'Card',      icon: FrameIcon,     color: '#0EA5E9', bg: '#EFF6FF' },
  frame:     { label: 'Frame',     icon: FrameIcon,     color: '#0EA5E9', bg: '#EFF6FF' },
  heading:   { label: 'Heading',   icon: TypeIcon,      color: '#7C3AED', bg: '#F3E8FF' },
  paragraph: { label: 'Text',      icon: TypeIcon,      color: '#7C3AED', bg: '#F3E8FF' },
  text:      { label: 'Text',      icon: TypeIcon,      color: '#7C3AED', bg: '#F3E8FF' },
  link:      { label: 'Link',      icon: LinkIcon,      color: '#2563EB', bg: '#EFF6FF' },
  button:    { label: 'Button',    icon: ButtonIcon,    color: '#2563EB', bg: '#EFF6FF' },
  image:     { label: 'Image',     icon: ImageIcon,     color: '#059669', bg: '#ECFDF5' },
  video:     { label: 'Video',     icon: VideoIcon,     color: '#D97706', bg: '#FFFBEB' },
  divider:   { label: 'Divider',   icon: DividerIcon,   color: '#64748B', bg: '#F1F5F9' },
  input:     { label: 'Input',     icon: InputIcon,     color: '#4F46E5', bg: '#EEF2FF' },
  checkbox:  { label: 'Checkbox',  icon: CheckboxIcon,  color: '#4F46E5', bg: '#EEF2FF' },
}

// ─── Slug helper ─────────────────────────────────────────────────────────────
function toSlug(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

// ─── Add Page Modal ───────────────────────────────────────────────────────────
function AddPageModal({ onConfirm, onClose }) {
  const [name, setName]         = useState('')
  const [slug, setSlug]         = useState('')
  const [slugEdited, setSlugEdited] = useState(false)
  const [nameError, setNameError]   = useState('')
  const nameRef = useRef(null)

  // Auto-focus the name field when the modal opens
  useEffect(() => {
    nameRef.current?.focus()
  }, [])

  // Auto-generate slug from name unless the user has manually edited it
  useEffect(() => {
    if (!slugEdited) setSlug(toSlug(name))
  }, [name, slugEdited])

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const handleNameChange = (e) => {
    setName(e.target.value)
    if (nameError) setNameError('')
  }

  const handleSlugChange = (e) => {
    setSlugEdited(true)
    setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-'))
  }

  const handleSubmit = () => {
    const trimmed = name.trim()
    if (!trimmed) {
      setNameError('Page name is required')
      nameRef.current?.focus()
      return
    }
    const id = `page-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
    onConfirm({ id, name: trimmed, slug: slug || toSlug(trimmed) })
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit()
  }

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ backgroundColor: 'rgba(10, 20, 45, 0.45)', backdropFilter: 'blur(2px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      {/* Modal card */}
      <div
        className="relative w-[400px] rounded-2xl bg-white shadow-2xl"
        style={{ boxShadow: '0 24px 64px rgba(10,30,80,0.18), 0 2px 8px rgba(10,30,80,0.08)' }}
        onKeyDown={handleKeyDown}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#EDF0F7] px-6 py-5">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EEF5FF]">
              <FileText size={15} className="text-[#2348D7]" />
            </span>
            <div>
              <h2 className="text-[14px] font-semibold text-[#0F2348]">New Page</h2>
              <p className="text-[11px] text-[#8A9AB8]">Add a page to your project</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-[#94A3BD] transition-colors hover:bg-[#F3F7FF] hover:text-[#0F2348]"
          >
            <X size={15} />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-4 px-6 py-5">
          {/* Page Name */}
          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-[#4A5870]">
              Page Name <span className="text-red-400">*</span>
            </label>
            <input
              ref={nameRef}
              type="text"
              value={name}
              onChange={handleNameChange}
              placeholder="e.g. About Us"
              className="w-full rounded-lg border px-3 py-2.5 text-[13px] text-[#0F2348] outline-none transition-colors placeholder:text-[#B0BAC9]"
              style={{
                borderColor: nameError ? '#F87171' : '#D8E1F0',
                backgroundColor: nameError ? '#FFF5F5' : '#FAFBFF',
                boxShadow: nameError
                  ? '0 0 0 3px rgba(248,113,113,0.15)'
                  : 'none',
              }}
              onFocus={(e) => {
                if (!nameError)
                  e.target.style.boxShadow = '0 0 0 3px rgba(35,72,215,0.12)'
                e.target.style.borderColor = nameError ? '#F87171' : '#2348D7'
              }}
              onBlur={(e) => {
                e.target.style.boxShadow = 'none'
                e.target.style.borderColor = nameError ? '#F87171' : '#D8E1F0'
              }}
            />
            {nameError && (
              <p className="mt-1 text-[11px] text-red-400">{nameError}</p>
            )}
          </div>

          {/* Page Slug */}
          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-[#4A5870]">
              URL Slug
            </label>
            <div className="flex items-center rounded-lg border border-[#D8E1F0] bg-[#FAFBFF] transition-colors focus-within:border-[#2348D7]"
              style={{ '--tw-ring-color': 'rgba(35,72,215,0.12)' }}
            >
              <span className="select-none border-r border-[#E8EDF6] px-3 py-2.5 text-[12px] text-[#94A3BD]">
                /
              </span>
              <input
                type="text"
                value={slug}
                onChange={handleSlugChange}
                placeholder="page-slug"
                className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-[13px] text-[#0F2348] outline-none placeholder:text-[#B0BAC9]"
              />
            </div>
            <p className="mt-1 text-[11px] text-[#94A3BD]">
              Auto-generated from page name · editable
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-2.5 border-t border-[#EDF0F7] px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 flex-1 items-center justify-center rounded-lg border border-[#D8E1F0] bg-white text-[13px] font-medium text-[#5E6F8E] transition-colors hover:border-[#B8C8E0] hover:bg-[#F4F8FD]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="flex h-9 flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#2348D7] text-[13px] font-semibold text-white transition-colors hover:bg-[#1A3BB8] active:bg-[#1530A0]"
            style={{ boxShadow: '0 2px 8px rgba(35,72,215,0.25)' }}
          >
            <Plus size={14} />
            Create Page
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── LayerRow (unchanged) ─────────────────────────────────────────────────────
function LayerRow({ node, depth = 0, selectedId, onSelect, hiddenIds, onToggleHide }) {
  const hasChildren = Array.isArray(node.children) && node.children.length > 0
  const defaultCollapsed = !node.virtual
  const [collapsed, setCollapsed] = useState(defaultCollapsed)
  const [hovered, setHovered] = useState(false)
  const rowRef = useRef(null)

  const isVirtual = node.virtual
  const isSelected = !isVirtual && selectedId === node.id
  const hasSelectedChild = hasChildren && containsNode(node.children, selectedId)
  const isExpanded = !collapsed || hasSelectedChild
  const isHidden = hiddenIds?.has(node.id)
  const meta = TYPE_META[node.type] || { label: node.type || 'Layer', icon: UnknownIcon, color: '#64748B', bg: '#F1F5F9' }
  const Icon = meta.icon
  const label = getLayerLabel(node, meta)
  const indent = node.type === 'desktop' ? 4 : 6 + depth * 24
  const isTopVirtual = node.type === 'desktop' || node.type === 'content'

  useEffect(() => {
    if (isSelected && rowRef.current) {
      rowRef.current.scrollIntoView({ block: 'nearest' })
    }
  }, [isSelected])

  return (
    <>
      <div
        ref={rowRef}
        className="relative"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <button
          type="button"
          onClick={() => {
            if (isVirtual) {
              if (hasChildren) setCollapsed(value => !value)
              return
            }
            onSelect(node.id)
          }}
          className="group flex h-9 w-full items-center rounded-lg text-left transition-colors"
          style={{
            paddingLeft: indent,
            paddingRight: 10,
            backgroundColor: isSelected ? '#EAF4FF' : hovered && !isTopVirtual ? '#F7F7F8' : 'transparent',
            color: isSelected ? '#FFFFFF' : '#26364D',
          }}
        >
          <span
            className="mr-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-md transition-colors"
            onClick={event => {
              event.stopPropagation()
              if (hasChildren) setCollapsed(value => !value)
            }}
          >
            {hasChildren ? (
              isExpanded
                ? <ChevronDown size={13} className="text-[#9A9AA0]" />
                : <ChevronRight size={13} className="text-[#9A9AA0]" />
            ) : (
              <span className="h-1.5 w-1.5 rounded-full bg-[#D1D5DB]" />
            )}
          </span>

          <span
            className="mr-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-md"
            style={{ backgroundColor: 'transparent', color: meta.color }}
          >
            <Icon size={12} />
          </span>

          <span
            className="min-w-0 flex-1 truncate text-[12px]"
            style={{
              fontWeight: isSelected || isTopVirtual ? 650 : 500,
              color: isSelected ? '#243B67' : isHidden ? '#A8B4C7' : '#5F6368',
              textDecoration: isHidden ? 'line-through' : 'none',
            }}
          >
            {label}
          </span>

          {node.badge && (
            <span className={`ml-2 shrink-0 text-[10px] ${node.type === 'desktop' ? 'text-[#0B84FF]' : isSelected ? 'text-[#2563EB]' : 'text-[#A5A5AA]'}`}>
              {node.badge}
            </span>
          )}

          {!isVirtual && (hovered || isHidden) && (
            <span
              className={`ml-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-md ${
                isSelected ? 'hover:bg-[#DBEAFE]' : 'hover:bg-[#EAEAEA]'
              }`}
              onClick={event => {
                event.stopPropagation()
                onToggleHide?.(node.id)
              }}
              title={isHidden ? 'Show' : 'Hide'}
            >
              {isHidden ? <EyeOff size={12} /> : <Eye size={12} />}
            </span>
          )}
        </button>

        {isSelected && <span className="absolute left-0 top-1 bottom-1 w-[3px] rounded-full bg-[#0EA5E9]" />}
      </div>

      {hasChildren && isExpanded && node.children.map(child => (
        <LayerRow
          key={child.id}
          node={child}
          depth={depth + 1}
          selectedId={selectedId}
          onSelect={onSelect}
          hiddenIds={hiddenIds}
          onToggleHide={onToggleHide}
        />
      ))}
    </>
  )
}

// ─── PageRow (unchanged) ──────────────────────────────────────────────────────
function PageRow({ page, isActive, onSelect, onRename, onDelete, onUpdate, canDelete }) {
  const [showMenu, setShowMenu] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [settingsForm, setSettingsForm] = useState({
    title: page.title || '',
    slug: page.slug || '',
    metaDescription: page.metaDescription || '',
  })

  return (
    <div className="relative">
      <button
        type="button"
        onClick={onSelect}
        className={`mb-1 flex h-9 w-full items-center gap-2 rounded-lg px-3 text-left text-xs transition-colors ${
          isActive ? 'bg-[#EEF6FF] text-[#0B74DE] font-semibold' : 'text-[#30425F] hover:bg-[#F4F8FD]'
        }`}
      >
        <Home size={13} className="shrink-0" />
        <div className="flex-1 truncate">
          <div className="truncate">{page.name}</div>
          {page.slug && <div className="text-[10px] opacity-75">{page.slug}</div>}
        </div>
        <span
          onClick={event => { event.stopPropagation(); setShowMenu(value => !value) }}
          className="rounded p-0.5 opacity-0 transition-opacity hover:bg-[#DBEAFE] group-hover:opacity-100"
        >
          <MoreHorizontal size={12} />
        </span>
      </button>

      {showMenu && (
        <div className="absolute left-full top-0 z-50 ml-1 w-40 overflow-hidden rounded-xl border border-[#D8E1F0] bg-white shadow-lg">
          <button
            type="button"
            onClick={() => { setShowSettings(true); setShowMenu(false) }}
            className="flex w-full items-center gap-2 px-3 py-2 text-xs text-[#243754] transition-colors hover:bg-[#F3F7FF]"
          >
            <Settings size={12} />
            Settings
          </button>
          <button
            type="button"
            onClick={() => { onRename(); setShowMenu(false) }}
            className="flex w-full items-center gap-2 px-3 py-2 text-xs text-[#243754] transition-colors hover:bg-[#F3F7FF]"
          >
            Rename
          </button>
          {canDelete && (
            <button
              type="button"
              onClick={() => { onDelete(); setShowMenu(false) }}
              className="flex w-full items-center gap-2 px-3 py-2 text-xs text-red-500 transition-colors hover:bg-red-50"
            >
              Delete
            </button>
          )}
        </div>
      )}

      {showSettings && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-[100]">
          <div className="bg-white rounded-lg shadow-xl p-5 w-96">
            <h3 className="text-sm font-semibold text-[#0F2348] mb-4">Page Settings</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-[#5E6F8E] mb-1">Page Title (for &lt;title&gt; tag)</label>
                <input
                  type="text"
                  placeholder="Page title"
                  value={settingsForm.title}
                  onChange={e => setSettingsForm(p => ({ ...p, title: e.target.value }))}
                  className="w-full px-3 py-2 text-sm border border-[#D8E1F0] rounded-lg bg-white text-[#0F2348] placeholder:text-[#8A8A8F] outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#5E6F8E] mb-1">Page Slug (URL path)</label>
                <input
                  type="text"
                  placeholder="/page-slug"
                  value={settingsForm.slug}
                  onChange={e => setSettingsForm(p => ({
                    ...p,
                    slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
                  }))}
                  className="w-full px-3 py-2 text-sm border border-[#D8E1F0] rounded-lg bg-white text-[#0F2348] placeholder:text-[#8A8A8F] outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#5E6F8E] mb-1">
                  Meta Description ({settingsForm.metaDescription.length}/160)
                </label>
                <textarea
                  placeholder="SEO meta description (160 chars max)"
                  value={settingsForm.metaDescription}
                  onChange={e => setSettingsForm(p => ({ ...p, metaDescription: e.target.value.slice(0, 160) }))}
                  maxLength="160"
                  className="w-full px-3 py-2 text-sm border border-[#D8E1F0] rounded-lg bg-white text-[#0F2348] placeholder:text-[#8A8A8F] outline-none resize-none h-20"
                />
              </div>
            </div>
            <div className="flex gap-2 mt-5">
              <button
                type="button"
                onClick={() => setShowSettings(false)}
                className="flex-1 px-3 py-2 text-sm font-medium text-[#5E6F8E] bg-[#F3F7FF] rounded-lg hover:bg-[#E3EFFF] transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => { onUpdate?.(page.id, settingsForm); setShowSettings(false) }}
                className="flex-1 px-3 py-2 text-sm font-medium text-white bg-[#2348D7] rounded-lg hover:bg-[#1A3BA0] transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── LeftPanel ────────────────────────────────────────────────────────────────
export default function LeftPanel({
  elements = [],
  selectedId,
  onSelect,
  activeTab,
  onTabChange,
  pages,
  activePageId,
  onSwitchPage,
  onAddPage,       // now receives { id, name, slug } — no more prompt() needed
  onRenamePage,
  onDeletePage,
  onUpdatePage,
}) {
  const tabs = ['Pages', 'Layers']
  const [search, setSearch]           = useState('')
  const [hiddenIds, setHiddenIds]     = useState(new Set())
  const [showAddModal, setShowAddModal] = useState(false)   // ← new

  const layerTree   = useMemo(() => buildLayerTree(elements), [elements])
  const flatLayers  = useMemo(() => flattenTree(layerTree).filter(node => !node.virtual), [layerTree])
  const searchTrimmed = search.trim().toLowerCase()
  const filtered = searchTrimmed
    ? flatLayers.filter(node =>
        getLayerLabel(node, TYPE_META[node.type]).toLowerCase().includes(searchTrimmed) ||
        (node.content || '').toLowerCase().includes(searchTrimmed) ||
        (node.type || '').toLowerCase().includes(searchTrimmed)
      )
    : null

  const toggleHide = useCallback(id => {
    setHiddenIds(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }, [])

  // Called by AddPageModal with { id, name, slug }
  const handleConfirmAddPage = useCallback(pageData => {
    onAddPage(pageData)       // hand structured data up to the parent — no prompt()
    setShowAddModal(false)
  }, [onAddPage])

  return (
    <div className="flex h-full w-[316px] shrink-0 select-none flex-col border-r border-[#E6E6E8] bg-white">
      {/* ── Tab bar ── */}
      <div className="px-4 pb-4 pt-5">
        <div className="flex rounded-lg bg-[#F3F3F4] p-1">
          {tabs.map(tab => (
            <button
              key={tab}
              type="button"
              onClick={() => onTabChange(tab)}
              className={`h-8 flex-1 rounded-md text-[13px] font-semibold transition-all ${
                activeTab === tab
                  ? 'bg-white text-[#111827] shadow-sm'
                  : 'text-[#8A8A8F] hover:text-[#5F6368]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-5 h-px bg-[#E8E8EA]" />

        <button
          type="button"
          className="mt-5 flex h-10 w-full items-center gap-2 rounded-lg bg-[#F1F1F2] px-3 text-left text-[13px] font-semibold text-[#5F6368] transition-colors hover:bg-[#EAEAEC]"
        >
          <Folder size={15} className="text-[#8A8A8F]" />
          <span className="min-w-0 flex-1 truncate">/{activePageId || 'home'}</span>
          <ChevronDown size={14} className="text-[#8A8A8F]" />
        </button>

        <div className="mt-3 flex h-10 items-center gap-2 rounded-lg bg-[#F1F1F2] px-3">
          <Search size={15} className="shrink-0 text-[#8A8A8F]" />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={event => setSearch(event.target.value)}
            className="w-full bg-transparent text-[13px] text-[#3F3F46] outline-none placeholder:text-[#8A8A8F]"
          />
        </div>

        <div className="mt-5 h-px bg-[#E8E8EA]" />
      </div>

      {/* ── Content area ── */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {activeTab === 'Pages' && (
          <div>
            <div className="mb-1 flex items-center justify-between px-2 py-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#94A3BD]">Pages</span>
              {/* ↓ Now opens the modal instead of calling onAddPage directly */}
              <button
                type="button"
                onClick={() => setShowAddModal(true)}
                className="rounded-lg p-1 text-[#94A3BD] transition-colors hover:bg-[#EEF6FF] hover:text-[#0B74DE]"
                title="Add page"
              >
                <Plus size={14} />
              </button>
            </div>
            {pages.map(page => (
              <PageRow
                key={page.id}
                page={page}
                isActive={activePageId === page.id}
                onSelect={() => onSwitchPage(page.id)}
                onRename={() => onRenamePage(page.id)}
                onDelete={() => onDeletePage(page.id)}
                onUpdate={onUpdatePage}
                canDelete={pages.length > 1}
              />
            ))}
          </div>
        )}

        {activeTab === 'Layers' && (
          <div>
            {elements.length === 0 ? (
              <p className="py-8 text-center text-xs text-[#C5D0E4]">No layers yet</p>
            ) : filtered ? (
              filtered.length === 0 ? (
                <p className="py-8 text-center text-xs text-[#C5D0E4]">No results</p>
              ) : filtered.map(node => (
                <LayerRow
                  key={node.id}
                  node={{ ...node, children: [] }}
                  selectedId={selectedId}
                  onSelect={onSelect}
                  hiddenIds={hiddenIds}
                  onToggleHide={toggleHide}
                />
              ))
            ) : (
              layerTree.map(node => (
                <LayerRow
                  key={node.id}
                  node={node}
                  selectedId={selectedId}
                  onSelect={onSelect}
                  hiddenIds={hiddenIds}
                  onToggleHide={toggleHide}
                />
              ))
            )}
          </div>
        )}
      </div>

      {/* ── Add Page Modal (portal-free, renders above everything via z-index) ── */}
      {showAddModal && (
        <AddPageModal
          onConfirm={handleConfirmAddPage}
          onClose={() => setShowAddModal(false)}
        />
      )}
    </div>
  )
}

// ─── Tree helpers (unchanged) ─────────────────────────────────────────────────
function buildLayerTree(elements) {
  const displayRoots = inferContainerHierarchy(elements)
  const count = flattenTree(displayRoots).filter(node => !node.virtual).length
  return [{
    id: '__desktop-root',
    type: 'desktop',
    virtual: true,
    badge: `${count}`,
    children: [{
      id: '__content-root',
      type: 'content',
      virtual: true,
      badge: `${displayRoots.length}`,
      children: displayRoots,
    }],
  }]
}

function inferContainerHierarchy(elements) {
  const nodes = elements.map(element => ({
    ...element,
    children: Array.isArray(element.children) ? element.children.map(child => ({ ...child })) : [],
  }))
  const byId = new Map(nodes.map(node => [node.id, node]))
  const assigned = new Set()

  nodes.forEach(child => {
    if (assigned.has(child.id)) return
    if (child.children?.length) child.children.forEach(grandchild => assigned.add(grandchild.id))
    const parent = findBestVisualParent(child, nodes)
    if (!parent) return
    parent.children = [...(parent.children || []), child]
    assigned.add(child.id)
  })

  return nodes
    .filter(node => !assigned.has(node.id) && byId.has(node.id))
    .sort(compareLayers)
    .map(sortChildren)
}

function findBestVisualParent(child, candidates) {
  const childBox = getBox(child)
  if (!childBox) return null
  return candidates
    .filter(candidate =>
      candidate.id !== child.id &&
      isContainerType(candidate.type) &&
      !isContainedBy(child, candidate) &&
      containsBox(getBox(candidate), childBox)
    )
    .sort((a, b) => area(getBox(a)) - area(getBox(b)))[0] || null
}

function isContainedBy(child, candidate) {
  return candidate.children?.some(node => node.id === child.id)
}

function containsBox(parent, child) {
  if (!parent || !child) return false
  if (area(parent) <= area(child)) return false
  const tolerance = 2
  return (
    child.x >= parent.x - tolerance &&
    child.y >= parent.y - tolerance &&
    child.x + child.width <= parent.x + parent.width + tolerance &&
    child.y + child.height <= parent.y + parent.height + tolerance
  )
}

function getBox(node) {
  return { x: node.x ?? 0, y: node.y ?? 0, width: node.width ?? 0, height: node.height ?? 0 }
}

function area(box) {
  return Math.max(0, box?.width || 0) * Math.max(0, box?.height || 0)
}

function isContainerType(type) {
  return type === 'container' || type === 'section' || type === 'frame' || type === 'card'
}

function compareLayers(a, b) {
  const ay = a.y ?? 0; const by = b.y ?? 0
  if (ay !== by) return ay - by
  return (a.x ?? 0) - (b.x ?? 0)
}

function sortChildren(node) {
  return { ...node, children: (node.children || []).sort(compareLayers).map(sortChildren) }
}

function flattenTree(nodes, result = []) {
  nodes.forEach(node => { result.push(node); if (node.children?.length) flattenTree(node.children, result) })
  return result
}

function containsNode(nodes, id) {
  if (!id) return false
  return nodes.some(node => node.id === id || (node.children?.length && containsNode(node.children, id)))
}

function getLayerLabel(node, meta) {
  if (node.virtual) return meta?.label || node.type
  if (node.name && node.name !== node.type) return node.name
  if (node.content?.trim()) return node.content.trim().replace(/\s+/g, ' ').slice(0, 34)
  return meta?.label || node.type || 'Layer'
}

// ─── Icons (unchanged) ───────────────────────────────────────────────────────
function DesktopIcon({ size = 12 }) {
  return <svg width={size} height={size} viewBox="0 0 14 14" fill="none"><rect x="1.5" y="2" width="11" height="7.5" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><path d="M5 12h4M7 9.5V12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
}
function StackIcon({ size = 12 }) {
  return <svg width={size} height={size} viewBox="0 0 14 14" fill="none"><rect x="2" y="2.5" width="10" height="2.5" rx="1" fill="currentColor"/><rect x="2" y="6" width="10" height="2.5" rx="1" fill="currentColor"/><rect x="2" y="9.5" width="10" height="2.5" rx="1" fill="currentColor"/></svg>
}
function SectionIcon({ size = 12 }) {
  return <svg width={size} height={size} viewBox="0 0 14 14" fill="none"><rect x="1.5" y="2" width="11" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><path d="M2 5h10" stroke="currentColor" strokeWidth="1.3"/></svg>
}
function FrameIcon({ size = 12 }) {
  return <svg width={size} height={size} viewBox="0 0 14 14" fill="none"><rect x="2" y="2" width="10" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><rect x="4" y="4" width="6" height="6" rx="1" fill="currentColor" opacity="0.18"/></svg>
}
function TypeIcon({ size = 12 }) {
  return <span style={{ fontSize: size, fontWeight: 800, lineHeight: 1 }}>T</span>
}
function ImageIcon({ size = 12 }) {
  return <svg width={size} height={size} viewBox="0 0 14 14" fill="none"><rect x="2" y="2" width="10" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><circle cx="5" cy="5" r="1" fill="currentColor"/><path d="M3 10l3-3 2 2 1.5-2 1.5 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
}
function LinkIcon({ size = 12 }) {
  return <svg width={size} height={size} viewBox="0 0 14 14" fill="none"><path d="M5.8 8.2l2.4-2.4M6 4.2l.4-.4a2.3 2.3 0 013.2 3.2l-.4.4M8 9.8l-.4.4a2.3 2.3 0 01-3.2-3.2l.4-.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
}
function ButtonIcon({ size = 12 }) {
  return <svg width={size} height={size} viewBox="0 0 14 14" fill="none"><rect x="2" y="4" width="10" height="6" rx="3" stroke="currentColor" strokeWidth="1.4"/><path d="M5 7h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
}
function VideoIcon({ size = 12 }) {
  return <svg width={size} height={size} viewBox="0 0 14 14" fill="none"><rect x="2" y="3" width="10" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><path d="M6 5.5l3 1.5-3 1.5v-3z" fill="currentColor"/></svg>
}
function DividerIcon({ size = 12 }) {
  return <svg width={size} height={size} viewBox="0 0 14 14" fill="none"><path d="M2 7h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
}
function InputIcon({ size = 12 }) {
  return <svg width={size} height={size} viewBox="0 0 14 14" fill="none"><rect x="2" y="4" width="10" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><path d="M5 6v2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
}
function CheckboxIcon({ size = 12 }) {
  return <svg width={size} height={size} viewBox="0 0 14 14" fill="none"><rect x="2.5" y="2.5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><path d="M4.5 7l1.7 1.7 3.3-3.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
}
function UnknownIcon({ size = 12 }) {
  return <span style={{ fontSize: size, fontWeight: 800, lineHeight: 1 }}>?</span>
}