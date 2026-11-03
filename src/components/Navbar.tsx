import React from 'react';
import { User, AppNotification } from '../types';
import {
  Brain,
  Bell,
  Sun,
  Moon,
  LogOut,
  User as UserIcon,
  Menu,
  Sparkles,
} from 'lucide-react';

interface NavbarProps {
  user: User | null;
  darkMode: boolean;
  onToggleTheme: () => void;
  onOpenAuth: (mode: 'login' | 'register') => void;
  onLogout: () => void;
  onNavigate: (view: string) => void;
  activeView: string;
  notifications: AppNotification[];
  onOpenNotifications: () => void;
  onToggleMobileMenu?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  darkMode,
  onToggleTheme,
  onOpenAuth,
  onLogout,
  onNavigate,
  activeView,
  notifications,
  onOpenNotifications,
  onToggleMobileMenu,
}) => {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#11192e]/95 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element with icon) */}
        <div className="flex items-center gap-3 shrink-0">
          {user && (
            <button
              onClick={onToggleMobileMenu}
              className="lg:hidden p-2 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 rounded-lg"
              aria-label="Toggle navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={() => onNavigate(user ? 'dashboard' : 'landing')}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#172554] via-[#7158E2] to-[#25B8A5] flex items-center justify-center text-white shadow-sm shadow-[#7158E2]/25 group-hover:scale-105 transition-transform">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap">
                MindMeter<span className="text-[#7158E2]">.ai</span>
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: 4-5 Clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          {!user ? (
            <>
              <button
                onClick={() => onNavigate('landing')}
                className={`whitespace-nowrap shrink-0 transition-colors hover:text-[#7158E2] dark:hover:text-[#7158E2] ${
                  activeView === 'landing' ? 'text-[#7158E2] dark:text-[#7158E2] font-semibold' : ''
                }`}
              >
                Overview
              </button>
              <a
                href="#features"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('landing');
                  setTimeout(() => {
                    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="whitespace-nowrap shrink-0 transition-colors hover:text-[#7158E2] dark:hover:text-[#7158E2]"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('landing');
                  setTimeout(() => {
                    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="whitespace-nowrap shrink-0 transition-colors hover:text-[#7158E2] dark:hover:text-[#7158E2]"
              >
                How It Works
              </a>
              <a
                href="#benefits"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('landing');
                  setTimeout(() => {
                    document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="whitespace-nowrap shrink-0 transition-colors hover:text-[#7158E2] dark:hover:text-[#7158E2]"
              >
                Benefits
              </a>
              <a
                href="#faq"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('landing');
                  setTimeout(() => {
                    document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="whitespace-nowrap shrink-0 transition-colors hover:text-[#7158E2] dark:hover:text-[#7158E2]"
              >
                FAQ
              </a>
            </>
          ) : (
            <>
              <button
                onClick={() => onNavigate('dashboard')}
                className={`whitespace-nowrap shrink-0 hover:text-[#7158E2] dark:hover:text-[#7158E2] transition-colors ${
                  activeView === 'dashboard' ? 'text-[#7158E2] dark:text-[#7158E2] font-semibold' : ''
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => onNavigate('tracker')}
                className={`whitespace-nowrap shrink-0 hover:text-[#7158E2] dark:hover:text-[#7158E2] transition-colors ${
                  activeView === 'tracker' ? 'text-[#7158E2] dark:text-[#7158E2] font-semibold' : ''
                }`}
              >
                Study Tracker
              </button>
              <button
                onClick={() => onNavigate('burnout')}
                className={`whitespace-nowrap shrink-0 hover:text-[#7158E2] dark:hover:text-[#7158E2] transition-colors ${
                  activeView === 'burnout' ? 'text-[#7158E2] dark:text-[#7158E2] font-semibold' : ''
                }`}
              >
                Burnout Predictor
              </button>
              <button
                onClick={() => onNavigate('planner')}
                className={`whitespace-nowrap shrink-0 hover:text-[#7158E2] dark:hover:text-[#7158E2] transition-colors ${
                  activeView === 'planner' ? 'text-[#7158E2] dark:text-[#7158E2] font-semibold' : ''
                }`}
              >
                Study Planner
              </button>
              <button
                onClick={() => onNavigate('assistant')}
                className={`whitespace-nowrap shrink-0 hover:text-[#7158E2] dark:hover:text-[#7158E2] transition-colors flex items-center gap-1.5 ${
                  activeView === 'assistant' ? 'text-[#7158E2] dark:text-[#7158E2] font-semibold' : ''
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#7158E2]" />
                AI Assistant
              </button>
            </>
          )}
        </nav>

        {/* Zone 3: Actions & Auth */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Light / Dark Mode Toggle */}
          <button
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Notifications Button */}
          {user && (
            <button
              onClick={onOpenNotifications}
              className="relative p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#E76F75] text-white text-[10px] font-bold flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
          )}

          {/* Primary Action Button */}
          {!user ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenAuth('login')}
                className="px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                Sign In
              </button>
              <button
                onClick={() => onOpenAuth('register')}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#7158E2] hover:bg-[#5e44cf] rounded-lg shadow-sm shadow-[#7158E2]/30 transition-all hover:scale-[1.02] whitespace-nowrap shrink-0"
              >
                Get Started Free
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate('settings')}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left"
              >
                <div className="w-7 h-7 rounded-full bg-[#7158E2]/15 text-[#7158E2] flex items-center justify-center font-bold text-xs">
                  {user.fullName.charAt(0)}
                </div>
                <div className="hidden sm:block text-xs">
                  <div className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[110px]">
                    {user.fullName.split(' ')[0]}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate max-w-[110px]">
                    {user.collegeName.split(' ')[0]}
                  </div>
                </div>
              </button>

              <button
                onClick={onLogout}
                title="Sign out"
                className="p-2 text-slate-400 hover:text-[#E76F75] rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
