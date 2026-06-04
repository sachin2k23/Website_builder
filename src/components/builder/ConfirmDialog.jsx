import { useState, useEffect } from 'react'
import { X, AlertTriangle } from 'lucide-react'

/**
 * Generic confirmation dialog for destructive actions
 */
export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm',
  message = 'Are you sure?',
  confirmText = 'Confirm',
  confirmVariant = 'destructive', // 'destructive' | 'primary'
  isDangerous = false,
}) {
  const [isConfirming, setIsConfirming] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return
      if (e.key === 'Enter') {
        e.preventDefault()
        handleConfirm()
      }
      if (e.key === 'Escape') {
        e.preventDefault()
        handleClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  const handleConfirm = () => {
    setIsConfirming(true)
    onConfirm?.()
    setIsConfirming(false)
    handleClose()
  }

  const handleClose = () => {
    setIsConfirming(false)
    onClose()
  }

  if (!isOpen) return null

  const confirmButtonClass =
    confirmVariant === 'destructive'
      ? 'bg-red-600 hover:bg-red-700 text-white'
      : 'bg-blue-600 hover:bg-blue-700 text-white'

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
          <div className="flex items-center gap-3 px-6 py-4 border-b border-[#E5E7EB]">
            {isDangerous && <AlertTriangle size={20} className="text-red-600 flex-shrink-0" />}
            <h2 className="text-lg font-semibold text-gray-900 flex-1">{title}</h2>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-5">
            <p className="text-gray-600">{message}</p>
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
              onClick={handleConfirm}
              disabled={isConfirming}
              className={`px-4 py-2 rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed ${confirmButtonClass}`}
            >
              {isConfirming ? 'Processing...' : confirmText}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
