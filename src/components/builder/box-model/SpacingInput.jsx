import { memo, useCallback, useEffect, useState } from 'react'
import { isCompleteCssLength, normalizeCssLength } from './boxModelUtils'

function SpacingInput({
  label,
  value,
  onChange,
  disabled = false,
  fallback = '0px',
  allowAuto = false,
}) {
  const [draft, setDraft] = useState(value ?? fallback)
  const [focused, setFocused] = useState(false)

  useEffect(() => {
    if (!focused) setDraft(value ?? fallback)
  }, [focused, value, fallback])

  const commit = useCallback((nextValue) => {
    const normalized = normalizeCssLength(nextValue, fallback, { allowAuto })
    setDraft(normalized)
    onChange?.(normalized)
  }, [allowAuto, fallback, onChange])

  return (
    <label className="min-w-0">
      <span className="mb-1 block text-[9px] font-medium uppercase tracking-wide text-[#AAB8D4]">
        {label}
      </span>
      <input
        type="text"
        value={draft}
        disabled={disabled}
        onFocus={() => setFocused(true)}
        onChange={e => {
          const next = e.target.value
          if (!/^-?[\d.a-z%]*$/i.test(next)) return
          setDraft(next)
          if (isCompleteCssLength(next, allowAuto)) {
            onChange?.(normalizeCssLength(next, fallback, { allowAuto }))
          }
        }}
        onBlur={e => {
          setFocused(false)
          commit(e.target.value)
        }}
        onKeyDown={e => {
          if (e.key === 'Enter') e.currentTarget.blur()
          if (e.key === 'Escape') setDraft(value ?? fallback)
        }}
        className="h-8 w-full min-w-0 rounded-lg border border-[#E2E8F4] bg-[#F3F6FB] px-2 text-center text-[11px] font-medium text-[#0F2348] outline-none transition-colors placeholder:text-[#C5D0E4] focus:border-[#2348D7] focus:bg-white disabled:cursor-not-allowed disabled:text-[#AAB8D4] disabled:opacity-60"
      />
    </label>
  )
}

export default memo(SpacingInput)
