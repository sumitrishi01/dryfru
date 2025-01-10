import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FiPieChart, FiPackage, FiUsers, FiShoppingCart, FiBarChart2, FiHelpCircle, FiLogOut, FiImage, FiPlus } from 'react-icons/fi'

export default function Sidebar({ isSidebarOpen, onLogout }) {
  const [showProductDropdown, setShowProductDropdown] = useState(false)

  return (
    <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 bg-white dark:bg-gray-800 min-h-screen border-r border-gray-200 dark:border-gray-700`}>
      <nav className="mt-5 px-2 space-y-1">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${isActive
              ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/50'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`
          }
        >
          <FiPieChart className="h-6 w-6 mr-4" />
          {isSidebarOpen && <span>Dashboard</span>}
        </NavLink>

        <div className="relative">
          <button
            onClick={() => setShowProductDropdown(!showProductDropdown)}
            className="w-full group flex items-center px-2 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <FiPackage className="h-6 w-6 mr-4" />
            {isSidebarOpen && (
              <>
                <span>Products</span>
                <span className="ml-auto">▼</span>
              </>
            )}
          </button>
          {showProductDropdown && isSidebarOpen && (
            <div className="pl-11 space-y-1">
              <NavLink
                to="/products/create"
                className={({ isActive }) =>
                  `block px-2 py-2 text-sm ${isActive
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/50'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  } rounded-md`
                }
              >
                <FiPlus className="inline-block mr-2" /> Create Product
              </NavLink>
              <NavLink
                to="/products/manage"
                className={({ isActive }) =>
                  `block px-2 py-2 text-sm ${isActive
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/50'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  } rounded-md`
                }
              >
                Manage Products
              </NavLink>
            </div>
          )}
        </div>

        <NavLink
          to="/banners"
          className={({ isActive }) =>
            `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${isActive
              ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/50'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`
          }
        >
          <FiImage className="h-6 w-6 mr-4" />
          {isSidebarOpen && <span>Banners</span>}
        </NavLink>

        <NavLink
          to="/users"
          className={({ isActive }) =>
            `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${isActive
              ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/50'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`
          }
        >
          <FiUsers className="h-6 w-6 mr-4" />
          {isSidebarOpen && <span>Users</span>}
        </NavLink>

        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${isActive
              ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/50'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`
          }
        >
          <FiShoppingCart className="h-6 w-6 mr-4" />
          {isSidebarOpen && <span>Orders</span>}
        </NavLink>

        <NavLink
          to="/reports"
          className={({ isActive }) =>
            `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${isActive
              ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/50'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`
          }
        >
          <FiBarChart2 className="h-6 w-6 mr-4" />
          {isSidebarOpen && <span>Reports</span>}
        </NavLink>

        <NavLink
          to="/support"
          className={({ isActive }) =>
            `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${isActive
              ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/50'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`
          }
        >
          <FiHelpCircle className="h-6 w-6 mr-4" />
          {isSidebarOpen && <span>Support</span>}
        </NavLink>

        <button
          onClick={onLogout}
          className="w-full group flex items-center px-2 py-2 text-sm font-medium text-red-600 dark:text-red-400 rounded-md hover:bg-red-50 dark:hover:bg-red-900/50"
        >
          <FiLogOut className="h-6 w-6 mr-4" />
          {isSidebarOpen && <span>Logout</span>}
        </button>
      </nav>
    </aside>
  )
}