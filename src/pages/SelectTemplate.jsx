import { ArrowLeft } from 'lucide-react'
import { TEMPLATES } from '../utils/templates'

const PREVIEWS = {
  blank: (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-10 h-10 rounded-full border-2 border-dashed border-[#C5D0E4] flex items-center justify-center">
        <span className="text-[#C5D0E4] text-2xl leading-none mb-0.5">+</span>
      </div>
    </div>
  ),
  techSummitTemplate1: (
    <div className="h-full w-full bg-[#F8FAFF] p-4 text-[#0F172A]">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#3B82F6] text-[10px] font-black text-white">TS</div>
          <div className="h-2.5 w-20 rounded-full bg-[#0F172A]" />
        </div>
        <div className="h-6 w-16 rounded-lg bg-[#3B82F6]" />
      </div>
      <div className="mt-5 h-3 w-24 rounded-full border border-[#BFDBFE] bg-[#DBEAFE]" />
      <div className="mt-4 h-5 w-4/5 rounded-full bg-[#0F172A]" />
      <div className="mt-2 h-5 w-3/5 rounded-full bg-[#0F172A]" />
      <div className="mt-4 h-2 w-5/6 rounded-full bg-[#64748B]" />
      <div className="mt-2 h-2 w-2/3 rounded-full bg-[#94A3B8]" />
      <div className="mt-6 grid grid-cols-3 gap-2">
        <div className="h-14 rounded-xl border border-[#E2E8F4] bg-white" />
        <div className="h-14 rounded-xl border border-[#BFDBFE] bg-[#DBEAFE]" />
        <div className="h-14 rounded-xl border border-[#E2E8F4] bg-white" />
      </div>
    </div>
  ),
}

const BG = {
  blank: '#F7F9FD',
  techSummitTemplate1: '#F8FAFF',
}

export default function SelectTemplate({ onSelect, onBack }) {
  const cards = Object.entries(TEMPLATES).map(([key, template]) => ({
    key,
    name: template.name,
    description: template.description || 'Template',
    preview: PREVIEWS[key] || PREVIEWS.blank,
    bg: BG[key] || '#ffffff',
  }))

  return (
    <div className="min-h-screen bg-[#F7F9FD] px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-[#8A9ABB] hover:text-[#2348D7] text-sm mb-6 transition-colors"
      >
        <ArrowLeft size={14} />
        Back
      </button>

      <h1 className="text-[#0F2348] text-2xl font-bold mb-1 sm:text-3xl">New Project</h1>
      <p className="text-[#8A9ABB] text-sm mb-8">Choose a template to get started</p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {cards.map((card) => (
          <div
            key={card.key}
            onClick={() => onSelect(card.key)}
            className="cursor-pointer group"
          >
            <div
              className="w-full aspect-[4/3] rounded-2xl border-2 border-[#E2E8F4] group-hover:border-[#2348D7] overflow-hidden transition-all duration-200 group-hover:shadow-lg group-hover:shadow-[#2348D7]/10 mb-3"
              style={{ backgroundColor: card.bg }}
            >
              {card.preview}
            </div>

            <p className="text-[#0F2348] text-sm font-semibold group-hover:text-[#2348D7] transition-colors">
              {card.name}
            </p>
            <p className="text-[#AAB8D4] text-xs mt-0.5">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
