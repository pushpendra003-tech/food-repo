import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from './Sidebar';
import { useAuthStore } from '../../store/authStore';
import { Menu, X } from 'lucide-react';

interface Props {
  children?: React.ReactNode;
}

export default function OwnerLayout({ children }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const auth = useAuthStore();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50 dark:from-gray-900 dark:to-slate-900 flex">
      {/* Mobile hamburger */}
      <button
        onClick={handleDrawerToggle}
        className="fixed top-4 left-4 z-50 p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 sm:hidden"
      >
        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 transform ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0 sm:static sm:inset-0 w-64 transition-transform duration-300 ease-in-out sm:w-64 bg-white dark:bg-gray-900 shadow-2xl sm:shadow-none border-r border-gray-200 dark:border-gray-800`}>
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
            Owner Panel
          </h2>
Owner
        </div>
        <Sidebar />
        {/* Overlay for mobile */}
        {mobileOpen && (
          <div 
            className="fixed inset-0 bg-black/50 sm:hidden z-30"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col ml-0 sm:ml-64">
        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

