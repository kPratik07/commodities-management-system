import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useTheme } from '../contexts/ThemeContext.jsx';

const navLinkClass = ({ isActive }) =>
  `px-3 py-2 rounded-md text-sm font-medium ${
    isActive
      ? 'bg-sky-600 text-white'
      : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
  }`;

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isManager = user?.role === 'MANAGER';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur">
        <div className="max-w-6xl mx-auto px-3 md:px-8 py-2.5 md:py-3 flex items-center justify-between gap-2 md:gap-4">
          <div className="flex items-center gap-1 md:gap-3 min-w-0">
            <span className="text-sm md:text-lg font-semibold text-slate-900 dark:text-slate-100">
              Commodities Management
            </span>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <button
              onClick={toggleTheme}
              className="px-2.5 md:px-3 py-1 rounded-full text-[10px] md:text-xs border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 bg-white/60 dark:bg-slate-900/60"
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              <span className="text-sm md:text-lg">
                {theme === 'light' ? '☀️' : '🌙'}
              </span>
            </button>
            {user && (
              <div className="flex items-center gap-1.5 md:gap-3">
                <div className="text-right text-[10px] md:text-xs leading-tight">
                  <div className="font-medium text-slate-900 dark:text-slate-100">{user.name}</div>
                  <div className="text-slate-500 dark:text-slate-400">{user.role}</div>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-[10px] md:text-sm px-2.5 md:px-3 py-1 rounded-md bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
      <div className="flex flex-1 flex-col md:flex-row max-w-6xl mx-auto w-full px-4 md:px-6 py-4 gap-4">
        <aside className="w-full md:w-52 shrink-0 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 pb-3 md:pb-0 md:pr-4">
          <nav className="flex flex-col gap-1 text-sm">
            {isManager && (
              <NavLink to="/dashboard" className={navLinkClass}>
                Dashboard
              </NavLink>
            )}
            <NavLink to="/products" className={navLinkClass}>
              View Products
            </NavLink>
            <NavLink to="/products/new" className={navLinkClass}>
              Add Product
            </NavLink>
          </nav>
        </aside>
        <main className="flex-1 mt-3 md:mt-0">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
