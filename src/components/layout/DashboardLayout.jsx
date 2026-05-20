import Sidebar from './Sidebar'

export default function DashboardLayout({ children, currentPage, onNavigate }) {
  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-[#F5F8FF] md:flex-row">
      <Sidebar currentPage={currentPage} onNavigate={onNavigate} />
      <main className="flex-1 overflow-y-auto bg-[#F5F8FF]">
        {children}
      </main>
    </div>
  )
}
