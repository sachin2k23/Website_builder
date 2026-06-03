import { ArrowLeft } from 'lucide-react'
import ThumbnailPreview from '../components/ThumbnailPreview'
import { TEMPLATES } from '../utils/templates'

export default function SelectTemplate({ onSelect, onBack }) {
  const cards = Object.entries(TEMPLATES).map(([key, template]) => ({
    key,
    name: template.name,
    description: template.description || 'Template',
    elements: template.elements || [],
    canvasSettings: template.canvasSettings,
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
            >
              <ThumbnailPreview
                elements={card.elements}
                canvasSettings={card.canvasSettings}
                emptyLabel="Blank Template"
              />
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
