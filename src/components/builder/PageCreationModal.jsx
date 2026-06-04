import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

/**
 * Modal for creating a new page
 * 
 * Features:
 * - Page name input (required)
 * - Page slug auto-generation (editable)
 * - Enter to submit, Escape to close
 * - Click outside to close
 * - Matches editor UI design
 */
export default function PageCreationModal({ isOpen, onClose, onCreate }) {
  const [pageName, setPageName] = useState('')
  const [pageSlug, setPageSlug] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  // Auto-generate slug from page name
  const generateSlug = (name) => {
    if (!name) return ''
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .slice(0, 50)
  }

  useEffect(() => {
    if (!isEditing) {
      setPageSlug(generateSlug(pageName))
    }
  }, [pageName, isEditing])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return
      if (e.key === 'Enter') {
        e.preventDefault()
        handleCreate()
      }
      if (e.key === 'Escape') {
        e.preventDefault()
        handleClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, pageName, pageSlug])

  const handleCreate = () => {
    if (!pageName.trim()) {
      alert('Page name is required')
      return
    }
    onCreate({
      name: pageName.trim(),
      slug: pageSlug || generateSlug(pageName),
    })
    handleClose()
  }

  const handleClose = () => {
    setPageName('')
    setPageSlug('')
    setIsEditing(false)
    onClose()
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/40 transition-opacity duration-200"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="w-full max-w-md bg-white rounded-xl shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB]">
            <h2 className="text-lg font-semibold text-gray-900">Create New Page</h2>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-5 space-y-4">
            {/* Page Name Field */}
            <div>
              <label htmlFor="pageName" className="block text-sm font-medium text-gray-700 mb-2">
                Page Name <span className="text-red-500">*</span>
              </label>
              <input
                id="pageName"
                type="text"
                placeholder="e.g., About Us, Contact"
                value={pageName}
                onChange={(e) => setPageName(e.target.value)}
                autoFocus
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              />
            </div>

            {/* Page Slug Field */}
            <div>
              <label htmlFor="pageSlug" className="block text-sm font-medium text-gray-700 mb-2">
                Page Slug <span className="text-xs text-gray-500">(auto-generated)</span>
              </label>
              <input
                id="pageSlug"
                type="text"
                placeholder="page-slug"
                value={pageSlug}
                onChange={(e) => {
                  setPageSlug(e.target.value)
                  setIsEditing(true)
                }}
                onFocus={() => setIsEditing(true)}
                onBlur={() => {
                  if (!pageSlug) setIsEditing(false)
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              />
              <p className="mt-1 text-xs text-gray-500">
                Used for page URLs. Auto-generated from page name if left empty.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex gap-3 px-6 py-4 border-t border-[#E5E7EB] justify-end">
            <button
              onClick={handleClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleCreate}
              className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!pageName.trim()}
            >
              Create Page
            </button>
          </div>

          {/* Helper text for additional fields */}
          <div className="px-6 py-3 bg-gray-50 rounded-b-xl text-xs text-gray-600 border-t border-[#E5E7EB]">
            💡 Tip: You can add SEO title, meta description, and other settings later.
          </div>
        </div>
      </div>
    </>
  )
}
