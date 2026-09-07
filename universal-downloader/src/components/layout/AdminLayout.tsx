import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X, Sun, Moon, Download, LayoutDashboard, Users, Package, Settings, BarChart3, FileText } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
    { icon: Download, label: 'Downloads', href: '/admin/downloads' },
    { icon: Package, label: 'Jobs', href: '/admin/jobs' },
    { icon: Users, label: 'Users', href: '/admin/users' },
    { icon: FileText, label: 'Platforms', href: '/admin/platforms' },
    { icon: BarChart3, label: 'Analytics', href: '/admin/analytics' },
    { icon: Settings, label: 'Settings', href: '/admin/system' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar - Desktop */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-20'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
          <Link to="/admin" className="flex items-center space-x-2">
            <Download className="h-6 w-6 text-blue-600" />
            {isSidebarOpen && (
              <span className="text-lg font-bold text-gray-900 dark:text-white">Admin</span>
            )}
          </Link>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="hidden lg:block p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                isActive(item.href)
                  ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <item.icon className="h-5 w-5" />
              {isSidebarOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
        {/* Top bar */}
        <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between h-16 px-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="flex items-center space-x-4 ml-auto">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5 text-yellow-500" />
                ) : (
                  <Moon className="h-5 w-5 text-gray-700" />
                )}
              </button>
              <Link
                to="/"
                className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600"
              >
                <Download className="h-4 w-4" />
                <span>View Site</span>
              </Link>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>

      {/* Mobile sidebar overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Mobile sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 transform transition-transform duration-300 lg:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
          <Link to="/admin" className="flex items-center space-x-2" onClick={() => setIsMobileMenuOpen(false)}>
            <Download className="h-6 w-6 text-blue-600" />
            <span className="text-lg font-bold text-gray-900 dark:text-white">Admin</span>
          </Link>
          <button onClick={() => setIsMobileMenuOpen(false)} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                isActive(item.href)
                  ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
