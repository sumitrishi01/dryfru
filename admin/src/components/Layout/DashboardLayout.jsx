import { useState, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

export default function DashboardLayout() {
  const [darkMode, setDarkMode] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const handleLogout = () => {
    // Add logout logic here
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode(!darkMode)}
      />
      <div className="flex">
        <Sidebar isSidebarOpen={isSidebarOpen} onLogout={handleLogout} />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}