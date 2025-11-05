// src/components/Navbar.tsx
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import api from '../services/api';
import { LogOut, Menu as MenuIcon, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface NavbarProps {
  setAuth: (auth: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ setAuth }) => {
  const [mobileOpen, setMobileOpen] = useState(false); // ← WAS TRUE → NOW FALSE

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
      setAuth(false);
      window.location.href = '/login';
    } catch (error) {
      console.error('Error logging out', error);
    }
  };

  const links = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/menu', label: 'Menu Management' },
    { to: '/reservations', label: 'Reservations' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/5 backdrop-blur-2xl border-b border-white/10 shadow-2xl">
      <div className="px-6 py-4 flex justify-between items-center">
        <NavLink to="/dashboard" className="flex items-center">
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent tracking-tight">
            Restaurant Management
          </h1>
        </NavLink>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `relative text-sm font-medium transition-all duration-300 ${
                  isActive ? 'text-cyan-300' : 'text-zinc-300 hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}

          <button
            onClick={handleLogout}
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-500/30 text-red-300 font-medium text-sm rounded-xl transition-all duration-300 hover:from-red-500/30 hover:to-pink-500/30 hover:border-red-400 hover:text-red-200 hover:shadow-lg hover:shadow-red-500/20 hover:-translate-y-0.5"
          >
            <LogOut className="w-4 h-4 transition-transform group-hover:rotate-12" />
            <span>Logout</span>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-400 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </button>
        </div>

        {/* MOBILE TOGGLE */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-zinc-300 hover:text-white"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
        </button>
      </div>

      {/* MOBILE MENU — ONLY SHOWS WHEN TOGGLED */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="md:hidden bg-white/5 backdrop-blur-xl border-t border-white/10"
        >
          <div className="px-6 py-4 space-y-3">
            {links.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `block py-2 text-sm font-medium ${isActive ? 'text-cyan-300' : 'text-zinc-300 hover:text-white'}`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <button
              onClick={handleLogout}
              className="w-full text-left py-2 text-sm font-medium text-red-300 hover:text-red-200"
            >
              Logout
            </button>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;