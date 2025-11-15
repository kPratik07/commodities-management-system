import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext.jsx';

const LandingPage = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 via-sky-50/60 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Nav */}
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
              <span className="text-sm md:text-lg">{theme === 'light' ? '☀️' : '🌙'}</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="hidden sm:inline-flex text-[11px] md:text-xs px-2.5 md:px-3 py-1 rounded-md border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200"
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => navigate('/signup')}
              className="text-[11px] md:text-xs px-3 md:px-4 py-1.5 md:py-2 rounded-md bg-sky-600 text-white hover:bg-sky-700"
            >
              Get started
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-14">
          <section className="max-w-3xl mx-auto text-center mb-10">
            <p className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-200 mb-3">
              Simple dashboard for managers and store keepers
            </p>
            <h1 className="text-2xl md:text-3xl lg:text-[2.6rem] font-semibold tracking-tight text-slate-900 dark:text-slate-50 mb-3">
              Stay on top of your store inventory.
            </h1>
            <p className="text-sm md:text-[1.02rem] text-slate-600 dark:text-slate-400 mb-6">
              Track products, stock levels, and inventory value with role-based access, OTP-secured login, and a
              responsive light/dark interface.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              <button
                type="button"
                onClick={() => navigate('/signup')}
                className="px-4 py-2 rounded-md bg-sky-600 text-white text-sm md:text-base font-medium hover:bg-sky-700"
              >
                Create an account
              </button>
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="px-4 py-2 rounded-md border border-slate-300 dark:border-slate-700 text-sm md:text-base text-slate-700 dark:text-slate-200 bg-white/60 dark:bg-slate-950/60"
              >
                Login instead
              </button>
            </div>
          </section>

          <section className="max-w-5xl mx-auto mb-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs md:text-sm text-slate-600 dark:text-slate-400">
              <div className="px-4 py-3 md:py-4 rounded-xl border border-sky-100/70 dark:border-sky-900/40 bg-white/80 dark:bg-slate-950/80 shadow-sm flex flex-col gap-1.5 md:gap-2 min-h-[90px] md:min-h-[110px]">
                <div className="inline-flex items-center gap-1 text-sky-600 dark:text-sky-300 text-[11px] font-medium">
                  <span className="text-base">📊</span> Manager view
                </div>
                <p className="text-[11px] md:text-sm">
                  See total products, stock units, inventory value, and low stock items at a glance.
                </p>
              </div>
              <div className="px-4 py-3 md:py-4 rounded-xl border border-emerald-100/80 dark:border-emerald-900/40 bg-white/80 dark:bg-slate-950/80 shadow-sm flex flex-col gap-1.5 md:gap-2 min-h-[90px] md:min-h-[110px]">
                <div className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-300 text-[11px] font-medium">
                  <span className="text-base">📦</span> Store Keeper view
                </div>
                <p className="text-[11px] md:text-[13px]">
                  Quickly add or update products and keep stock levels accurate.
                </p>
              </div>
              <div className="px-4 py-3 md:py-4 rounded-xl border border-amber-100/80 dark:border-amber-900/40 bg-white/80 dark:bg-slate-950/80 shadow-sm flex flex-col gap-1.5 md:gap-2 min-h-[90px] md:min-h-[110px]">
                <div className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-300 text-[11px] font-medium">
                  <span className="text-base">🔐</span> Secure access
                </div>
                <p className="text-[11px] md:text-[13px]">
                  OTP-based password reset using your email, secured with JWT authentication.
                </p>
              </div>
              <div className="px-4 py-3 md:py-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 shadow-sm flex flex-col gap-1.5 md:gap-2 min-h-[90px] md:min-h-[110px]">
                <div className="inline-flex items-center gap-1 text-slate-700 dark:text-slate-200 text-[11px] font-medium">
                  <span className="text-base">📱</span> Responsive UI
                </div>
                <p className="text-[11px] md:text-sm">
                  Works smoothly on desktops, tablets, and mobile screens with light/dark themes.
                </p>
              </div>
            </div>
          </section>

          <section className="max-w-3xl mx-auto mt-6 text-center text-xs md:text-sm text-slate-500 dark:text-slate-400">
            <p>
              You can sign up with your own email or use the seeded accounts described in the README when running the
              app locally.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
