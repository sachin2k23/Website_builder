/**
 * BoxModelVisual.jsx - Visual box model editor with spacing controls
 * Shows interactive margin/padding diagram
 */

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

function SpacingPill({ label, value, onChange }) {
  const [editing, setEditing] = useState(false)
  const [input, setInput] = useState(String(value || 0))

  const handleSave = () => {
    const num = Math.max(0, parseInt(input) || 0)
    onChange(num)
    setInput(String(num))
    setEditing(false)
  }

  return (
    <div
      onClick={() => setEditing(true)}
      className="px-2.5 py-1 rounded-md bg-[var(--vc-accent-light)] border border-[var(--vc-accent)] text-[var(--vc-accent)] text-xs font-semibold cursor-pointer hover:bg-[var(--vc-accent)] hover:text-white transition-all"
    >
      {editing ? (
        <input
          autoFocus
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSave()
            if (e.key === 'Escape') { setInput(String(value || 0)); setEditing(false) }
          }}
          className="w-12 bg-transparent outline-none text-center"
        />
      ) : (
        `${value || 0}px`
      )}
    </div>
  )
}

export default function BoxModelVisual({ element, onUpdate }) {
  const [showDetails, setShowDetails] = useState(true)
  
  // Extract spacing values
  const marginTop = element.marginTop || 0
  const marginRight = element.marginRight || 0
  const marginBottom = element.marginBottom || 0
  const marginLeft = element.marginLeft || 0
  
  const paddingTop = element.paddingTop || 0
  const paddingRight = element.paddingRight || 0
  const paddingBottom = element.paddingBottom || 0
  const paddingLeft = element.paddingLeft || 0
  
  const width = element.width || 200
  const height = element.height || 100
  
  // Shorthand handlers
  const setAllMargin = (value) => {
    onUpdate(element.id, {
      marginTop: value,
      marginRight: value,
      marginBottom: value,
      marginLeft: value,
    })
  }

  const setAllPadding = (value) => {
    onUpdate(element.id, {
      paddingTop: value,
      paddingRight: value,
      paddingBottom: value,
      paddingLeft: value,
    })
  }

  return (
    <div className="space-y-3 border-t border-[var(--vc-border-section)] pt-3">
      <button
        onClick={() => setShowDetails(v => !v)}
        className="flex items-center justify-between w-full px-3 py-2 hover:bg-[var(--vc-bg-panel-2)] rounded transition-colors"
      >
        <span className="text-[var(--vc-text-primary)] text-xs font-semibold uppercase tracking-wide">Spacing</span>
        <ChevronDown
          size={13}
          className={`text-[var(--vc-text-label)] transition-transform ${showDetails ? '' : '-rotate-90'}`}
        />
      </button>

      {showDetails && (
        <div className="space-y-3">
          {/* Shorthand inputs */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[var(--vc-text-label)] text-[9px] font-medium mb-1.5 uppercase">All Margin</label>
              <input
                type="number"
                value={marginTop === marginRight && marginRight === marginBottom && marginBottom === marginLeft ? marginTop : ''}
                onChange={(e) => setAllMargin(Math.max(0, parseInt(e.target.value) || 0))}
                placeholder="Set all"
                className="w-full px-2 py-2 text-xs text-[var(--vc-text-primary)] bg-[var(--vc-bg-input)] border border-[var(--vc-border)] rounded outline-none focus:border-[var(--vc-accent)] transition-colors"
              />
            </div>
            <div>
              <label className="block text-[var(--vc-text-label)] text-[9px] font-medium mb-1.5 uppercase">All Padding</label>
              <input
                type="number"
                value={paddingTop === paddingRight && paddingRight === paddingBottom && paddingBottom === paddingLeft ? paddingTop : ''}
                onChange={(e) => setAllPadding(Math.max(0, parseInt(e.target.value) || 0))}
                placeholder="Set all"
                className="w-full px-2 py-2 text-xs text-[var(--vc-text-primary)] bg-[var(--vc-bg-input)] border border-[var(--vc-border)] rounded outline-none focus:border-[var(--vc-accent)] transition-colors"
              />
            </div>
          </div>

          {/* Visual box model diagram */}
          <div className="bg-[var(--vc-bg-panel-2)] p-4 rounded-lg border border-[var(--vc-border)]">
            <div className="flex flex-col items-center gap-2">
              {/* Top margin */}
              <div className="flex justify-center">
                <SpacingPill
                  label="M-Top"
                  value={marginTop}
                  onChange={(v) => onUpdate(element.id, { marginTop: v })}
                />
              </div>

              {/* Margin row (left, center, right) */}
              <div className="flex items-start gap-2 w-full">
                <SpacingPill
                  label="M-L"
                  value={marginLeft}
                  onChange={(v) => onUpdate(element.id, { marginLeft: v })}
                />
                
                {/* Content area */}
                <div className="flex-1 flex flex-col items-center gap-1">
                  {/* Padding top */}
                  <SpacingPill
                    label="P-T"
                    value={paddingTop}
                    onChange={(v) => onUpdate(element.id, { paddingTop: v })}
                  />
                  
                  {/* Main content box */}
                  <div className="flex items-center justify-center gap-2 px-3 py-2 bg-white border border-[var(--vc-border)] rounded text-[var(--vc-text-muted)] text-xs font-medium">
                    <span>{width}×{height}</span>
                  </div>
                  
                  {/* Padding bottom */}
                  <SpacingPill
                    label="P-B"
                    value={paddingBottom}
                    onChange={(v) => onUpdate(element.id, { paddingBottom: v })}
                  />
                </div>

                <SpacingPill
                  label="M-R"
                  value={marginRight}
                  onChange={(v) => onUpdate(element.id, { marginRight: v })}
                />
              </div>

              {/* Padding left/right on sides of content */}
              <div className="flex items-center justify-between w-full px-1">
                <SpacingPill
                  label="P-L"
                  value={paddingLeft}
                  onChange={(v) => onUpdate(element.id, { paddingLeft: v })}
                />
                <SpacingPill
                  label="P-R"
                  value={paddingRight}
                  onChange={(v) => onUpdate(element.id, { paddingRight: v })}
                />
              </div>

              {/* Bottom margin */}
              <div className="flex justify-center">
                <SpacingPill
                  label="M-Bot"
                  value={marginBottom}
                  onChange={(v) => onUpdate(element.id, { marginBottom: v })}
                />
              </div>
            </div>
          </div>

          {/* Detailed grid */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <div>
              <label className="block text-[var(--vc-text-label)] text-[9px] font-medium mb-1.5">Margin Top</label>
              <input
                type="number"
                value={marginTop}
                onChange={(e) => onUpdate(element.id, { marginTop: Math.max(0, parseInt(e.target.value) || 0) })}
                className="w-full px-2 py-2 text-xs text-[var(--vc-text-primary)] bg-[var(--vc-bg-input)] border border-[var(--vc-border)] rounded outline-none focus:border-[var(--vc-accent)]"
              />
            </div>
            <div>
              <label className="block text-[var(--vc-text-label)] text-[9px] font-medium mb-1.5">Margin Right</label>
              <input
                type="number"
                value={marginRight}
                onChange={(e) => onUpdate(element.id, { marginRight: Math.max(0, parseInt(e.target.value) || 0) })}
                className="w-full px-2 py-2 text-xs text-[var(--vc-text-primary)] bg-[var(--vc-bg-input)] border border-[var(--vc-border)] rounded outline-none focus:border-[var(--vc-accent)]"
              />
            </div>
            <div>
              <label className="block text-[var(--vc-text-label)] text-[9px] font-medium mb-1.5">Margin Bottom</label>
              <input
                type="number"
                value={marginBottom}
                onChange={(e) => onUpdate(element.id, { marginBottom: Math.max(0, parseInt(e.target.value) || 0) })}
                className="w-full px-2 py-2 text-xs text-[var(--vc-text-primary)] bg-[var(--vc-bg-input)] border border-[var(--vc-border)] rounded outline-none focus:border-[var(--vc-accent)]"
              />
            </div>
            <div>
              <label className="block text-[var(--vc-text-label)] text-[9px] font-medium mb-1.5">Margin Left</label>
              <input
                type="number"
                value={marginLeft}
                onChange={(e) => onUpdate(element.id, { marginLeft: Math.max(0, parseInt(e.target.value) || 0) })}
                className="w-full px-2 py-2 text-xs text-[var(--vc-text-primary)] bg-[var(--vc-bg-input)] border border-[var(--vc-border)] rounded outline-none focus:border-[var(--vc-accent)]"
              />
            </div>
            
            <div>
              <label className="block text-[var(--vc-text-label)] text-[9px] font-medium mb-1.5">Padding Top</label>
              <input
                type="number"
                value={paddingTop}
                onChange={(e) => onUpdate(element.id, { paddingTop: Math.max(0, parseInt(e.target.value) || 0) })}
                className="w-full px-2 py-2 text-xs text-[var(--vc-text-primary)] bg-[var(--vc-bg-input)] border border-[var(--vc-border)] rounded outline-none focus:border-[var(--vc-accent)]"
              />
            </div>
            <div>
              <label className="block text-[var(--vc-text-label)] text-[9px] font-medium mb-1.5">Padding Right</label>
              <input
                type="number"
                value={paddingRight}
                onChange={(e) => onUpdate(element.id, { paddingRight: Math.max(0, parseInt(e.target.value) || 0) })}
                className="w-full px-2 py-2 text-xs text-[var(--vc-text-primary)] bg-[var(--vc-bg-input)] border border-[var(--vc-border)] rounded outline-none focus:border-[var(--vc-accent)]"
              />
            </div>
            <div>
              <label className="block text-[var(--vc-text-label)] text-[9px] font-medium mb-1.5">Padding Bottom</label>
              <input
                type="number"
                value={paddingBottom}
                onChange={(e) => onUpdate(element.id, { paddingBottom: Math.max(0, parseInt(e.target.value) || 0) })}
                className="w-full px-2 py-2 text-xs text-[var(--vc-text-primary)] bg-[var(--vc-bg-input)] border border-[var(--vc-border)] rounded outline-none focus:border-[var(--vc-accent)]"
              />
            </div>
            <div>
              <label className="block text-[var(--vc-text-label)] text-[9px] font-medium mb-1.5">Padding Left</label>
              <input
                type="number"
                value={paddingLeft}
                onChange={(e) => onUpdate(element.id, { paddingLeft: Math.max(0, parseInt(e.target.value) || 0) })}
                className="w-full px-2 py-2 text-xs text-[var(--vc-text-primary)] bg-[var(--vc-bg-input)] border border-[var(--vc-border)] rounded outline-none focus:border-[var(--vc-accent)]"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
