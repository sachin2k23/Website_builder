import { useState } from 'react'
import { Plus, Copy, Trash2, GripVertical, MoreVertical, Edit2, Settings } from 'lucide-react'

export default function PagesPanel({ pages, currentPageId, onPageSelect, onAddPage, onDeletePage, onDuplicatePage, onRenamePage, onUpdatePage }) {
  const [editingId, setEditingId] = useState(null)
  const [editingName, setEditingName] = useState('')
  const [openMenu, setOpenMenu] = useState(null)
  const [settingsPageId, setSettingsPageId] = useState(null)
  const [settingsForm, setSettingsForm] = useState({})

  const handleRename = (page) => {
    setEditingId(page.id)
    setEditingName(page.name)
  }

  const handleSaveRename = (pageId) => {
    if (editingName.trim()) {
      onRenamePage(pageId, editingName.trim())
    }
    setEditingId(null)
    setEditingName('')
  }

  return (
    <div className="p-3 space-y-2">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-[#AAB8D4] text-[8px] font-semibold uppercase tracking-wider">Pages</p>
          <p className="text-[#5E6F8E] text-[11px] mt-0.5">{pages?.length || 0} page{pages?.length !== 1 ? 's' : ''}</p>
        </div>
        <button
          onClick={() => onAddPage?.()}
          className="p-2 rounded-lg bg-[#2348D7] text-white hover:bg-[#1a37b8] transition-colors"
          title="Add new page"
        >
          <Plus size={14} />
        </button>
      </div>

      {/* Pages list */}
      <div className="space-y-1">
        {pages?.map((page) => (
          <div
            key={page.id}
            className={`group relative flex items-center gap-2 p-2.5 rounded-lg transition-all ${
              currentPageId === page.id
                ? 'bg-[#EEF3FF] border border-[#2348D7]'
                : 'hover:bg-[#F3F6FB] border border-transparent'
            }`}
          >
            <GripVertical size={14} className="text-[#C5D0E4] flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />

            {editingId === page.id ? (
              <input
                type="text"
                autoFocus
                value={editingName}
                onChange={(e) => setEditingName(e.target.value)}
                onBlur={() => handleSaveRename(page.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSaveRename(page.id)
                  if (e.key === 'Escape') {
                    setEditingId(null)
                    setEditingName('')
                  }
                }}
                className="flex-1 px-2 py-1 text-xs text-[#0F2348] bg-white border border-[#2348D7] rounded outline-none"
              />
            ) : (
              <div
                onClick={() => onPageSelect?.(page.id)}
                className="flex-1 cursor-pointer min-w-0"
              >
                <p className={`text-xs font-semibold truncate ${
                  currentPageId === page.id ? 'text-[#2348D7]' : 'text-[#5E6F8E]'
                }`}>
                  {page.name}
                </p>
                <p className="text-[10px] text-[#AAB8D4] truncate">{page.slug || `page-${page.id}`}</p>
              </div>
            )}

            {/* Menu button */}
            <div className="relative">
              <button
                onClick={() => setOpenMenu(openMenu === page.id ? null : page.id)}
                className={`p-1 rounded transition-opacity ${
                  currentPageId === page.id || openMenu === page.id
                    ? 'opacity-100 bg-[#D8E1F0]'
                    : 'opacity-0 group-hover:opacity-100'
                }`}
              >
                <MoreVertical size={14} className="text-[#5E6F8E]" />
              </button>

              {/* Dropdown menu */}
              {openMenu === page.id && (
                <div className="absolute right-0 top-full mt-1 bg-white border border-[#E2E8F4] rounded-lg shadow-lg z-50 min-w-max">
                  <button
                    onClick={() => {
                      handleRename(page)
                      setOpenMenu(null)
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs text-[#5E6F8E] hover:text-[#2348D7] hover:bg-[#F3F6FB]"
                  >
                    <Edit2 size={13} />
                    Rename
                  </button>
                  <button
                    onClick={() => {
                      onDuplicatePage?.(page.id)
                      setOpenMenu(null)
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs text-[#5E6F8E] hover:text-[#2348D7] hover:bg-[#F3F6FB]"
                  >
                    <Copy size={13} />
                    Duplicate
                  </button>
                  <button
                    onClick={() => {
                      setSettingsPageId(page.id)
                      setSettingsForm({ title: page.title || '', slug: page.slug || '', metaDescription: page.metaDescription || '' })
                      setOpenMenu(null)
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs text-[#5E6F8E] hover:text-[#2348D7] hover:bg-[#F3F6FB]"
                  >
                    <Settings size={13} />
                    Settings
                  </button>
                  {pages.length > 1 && (
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete "${page.name}"? This cannot be undone.`)) {
                          onDeletePage?.(page.id)
                        }
                        setOpenMenu(null)
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-600 hover:bg-red-50"
                    >
                      <Trash2 size={13} />
                      Delete
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Page Settings Popover */}
      {settingsPageId && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-[100]" onClick={() => setSettingsPageId(null)}>
          <div className="bg-white rounded-lg shadow-xl p-4 w-96 max-w-[calc(100%-2rem)]" onClick={e => e.stopPropagation()}>
            <h3 className="text-sm font-bold text-[#0F2348] mb-3">Page Settings</h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-[#AAB8D4] block mb-1">Page Title</label>
                <input
                  type="text"
                  value={settingsForm.title || ''}
                  onChange={e => setSettingsForm(p => ({ ...p, title: e.target.value }))}
                  placeholder="Page title for <title> tag"
                  className="w-full px-3 py-2 text-xs text-[#0F2348] bg-[#F3F6FB] border border-[#E2E8F4] rounded outline-none focus:border-[#2348D7]"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-[#AAB8D4] block mb-1">URL Slug</label>
                <input
                  type="text"
                  value={settingsForm.slug || ''}
                  onChange={e => setSettingsForm(p => ({ ...p, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') }))}
                  placeholder="/page-slug"
                  className="w-full px-3 py-2 text-xs text-[#0F2348] bg-[#F3F6FB] border border-[#E2E8F4] rounded outline-none focus:border-[#2348D7]"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-[#AAB8D4] block mb-1">Meta Description</label>
                <textarea
                  value={settingsForm.metaDescription || ''}
                  onChange={e => setSettingsForm(p => ({ ...p, metaDescription: e.target.value }))}
                  placeholder="SEO meta description (160 chars)"
                  maxLength="160"
                  className="w-full px-3 py-2 text-xs text-[#0F2348] bg-[#F3F6FB] border border-[#E2E8F4] rounded outline-none focus:border-[#2348D7] resize-none h-20"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    onUpdatePage?.(settingsPageId, settingsForm)
                    setSettingsPageId(null)
                  }}
                  className="flex-1 py-2 bg-[#2348D7] text-white text-xs font-medium rounded hover:bg-[#1B3FC8] transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={() => setSettingsPageId(null)}
                  className="flex-1 py-2 bg-[#F3F6FB] text-[#5E6F8E] text-xs font-medium rounded hover:bg-[#E3ECFF] transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
