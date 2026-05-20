import { LayoutGrid, Archive, Plus, Users, Search } from 'lucide-react'

export default function Sidebar({ currentPage, onNavigate }) {
  const isDashboard = currentPage === 'dashboard'
  const isArchive = currentPage === 'archive'

  return (
    <div className="h-auto w-full shrink-0 border-b border-[#D7E1F5] bg-white px-3 py-3 md:h-full md:w-[240px] md:border-b-0 md:border-r md:py-4 flex flex-col">
      {/* Workspace */}
      <div className="mb-3 flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 hover:bg-[#F3F7FF] md:mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#2F6BFF] to-[#1637B8] text-xl font-extrabold tracking-tight text-white shadow-[0_8px_18px_rgba(47,107,255,0.35)] md:h-12 md:w-12 md:rounded-2xl md:text-2xl">
          PT
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-[#0F2348] text-[22px] leading-none font-bold tracking-tight">Planyt</span>
        </div>
      </div>

      {/* Search */}
      <div className="mb-3 flex items-center gap-2 rounded-xl border border-[#DFE6F2] bg-[#F7F9FD] px-3 py-2 md:mb-5">
        <Search size={14} className="text-[#94A3BD]" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent text-sm text-[#21395F] placeholder-[#94A3BD] outline-none w-full"
        />
      </div>

      {/* Projects Section */}
      <p className="hidden px-3 mb-2 text-xs font-medium uppercase tracking-widest text-[#6F7E99] md:block">Projects</p>
      <nav className="flex gap-1 overflow-x-auto md:flex-col md:gap-0.5 md:overflow-visible">
        <button
          type="button"
          onClick={() => onNavigate('dashboard')}
          className={`flex shrink-0 items-center gap-3 rounded-xl px-3 py-2 text-sm text-left transition-colors md:w-full ${
            isDashboard
              ? 'bg-[#2348D7] text-white shadow-[0_8px_18px_rgba(35,72,215,0.22)]'
              : 'text-[#243754] hover:text-[#1637B8] hover:bg-[#F3F7FF]'
          }`}
        >
          <LayoutGrid size={14} />
          All
        </button>
        <button
          type="button"
          onClick={() => onNavigate('archive')}
          className={`flex shrink-0 items-center gap-3 rounded-xl px-3 py-2 text-sm text-left transition-colors md:w-full ${
            isArchive
              ? 'bg-[#2348D7] text-white shadow-[0_8px_18px_rgba(35,72,215,0.22)]'
              : 'text-[#243754] hover:text-[#1637B8] hover:bg-[#F3F7FF]'
          }`}
        >
          <Archive size={14} />
          Archive
        </button>
        <button className="flex shrink-0 items-center gap-3 rounded-xl px-3 py-2 text-sm text-[#243754] hover:text-[#1637B8] hover:bg-[#F3F7FF] md:w-full text-left">
          <Plus size={14} />
          New Folder...
        </button>
      </nav>

      {/* Bottom */}
      <div className="mt-3 hidden items-center justify-between gap-2 px-3 py-2 md:mt-auto md:flex">
        <button className="flex items-center gap-2 text-[#5E6F8E] hover:text-[#1637B8] text-sm transition-colors">
          <Users size={14} />
          <span className="hidden xl:inline">Invite your team</span>
          <span className="xl:hidden">Invite</span>
        </button>
        <button className="text-xs bg-[#EEF3FF] hover:bg-[#E3ECFF] text-[#3154DB] px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap">
          Copy Link
        </button>
      </div>
    </div>
  )
}
