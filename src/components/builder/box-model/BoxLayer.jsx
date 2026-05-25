import { memo } from 'react'

function BoxLayer({
  label,
  tone = 'neutral',
  children,
  top,
  right,
  bottom,
  left,
  disabled = false,
}) {
  const tones = {
    margin: 'border-[#F3C98B] bg-[#FFF8EA]',
    border: 'border-[#9DB7F5] bg-[#F5F8FF]',
    padding: 'border-[#87D8B4] bg-[#F1FCF7]',
    content: 'border-[#D8E1F0] bg-white',
    neutral: 'border-[#E2E8F4] bg-[#F8FAFF]',
  }

  return (
    <div className={`relative rounded-lg border ${tones[tone] || tones.neutral} p-3 ${disabled ? 'opacity-60' : ''}`}>
      <span className="absolute left-2 top-1 text-[9px] font-semibold uppercase tracking-wide text-[#8A9ABB]">
        {label}
      </span>
      {top && <div className="mb-2 flex justify-center pt-2">{top}</div>}
      <div className="grid grid-cols-[42px_minmax(0,1fr)_42px] items-center gap-2">
        <div>{left}</div>
        <div className="min-w-0">{children}</div>
        <div>{right}</div>
      </div>
      {bottom && <div className="mt-2 flex justify-center">{bottom}</div>}
    </div>
  )
}

export default memo(BoxLayer)
