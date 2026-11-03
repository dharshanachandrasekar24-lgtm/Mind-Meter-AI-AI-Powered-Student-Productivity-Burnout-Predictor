import React from 'react';
import {
  LayoutDashboard,
  Clock,
  Flame,
  CalendarDays,
  CheckCircle2,
  Sparkles,
  BarChart3,
  Bell,
  Settings,
  LogOut,
  FolderGit2,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { User } from '../types';

interface SidebarProps {
  activeView: string;
  onNavigate: (view: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  unreadNotifications: number;
  onLogout: () => void;
  user: User;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  onNavigate,
  collapsed,
  onToggleCollapse,
  unreadNotifications,
  onLogout,
  user,
}) => {
  const menuItems = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'tracker', label: 'Study Tracker', icon: Clock },
    { id: 'burnout', label: 'Burnout Predictor', icon: Flame, badge: 'ML' },
    { id: 'planner', label: 'Study Planner', icon: CalendarDays },
    { id: 'habits', label: 'Habit Tracker', icon: CheckCircle2 },
    { id: 'assistant', label: 'AI Study Assistant', icon: Sparkles, badge: 'AI' },
    { id: 'analytics', label: 'Analytics & Reports', icon: BarChart3 },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: Bell,
      count: unreadNotifications,
    },
    { id: 'python-code', label: 'Python Source Code', icon: FolderGit2, badge: 'Flask' },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside
      className={`fixed lg:sticky top-16 left-0 h-[calc(100vh-4rem)] bg-white dark:bg-[#11192e] border-r border-slate-200 dark:border-slate-800 z-30 transition-all duration-300 flex flex-col justify-between ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Navigation Links */}
      <div className="p-3 space-y-1.5 overflow-y-auto max-h-[calc(100vh-9rem)]">
        {/* Student Mini Card */}
        {!collapsed && (
          <div className="p-3 mb-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#7158E2] to-[#25B8A5] text-white flex items-center justify-center font-bold text-sm shadow-sm">
                {user.fullName.charAt(0)}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">
                  {user.fullName}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                  {user.department}
                </p>
              </div>
            </div>
            <div className="mt-2.5 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1 text-[#25B8A5]">
                <ShieldCheck className="w-3.5 h-3.5" />
                Active Student
              </span>
              <span className="font-mono">{user.yearOfStudy.split(' ')[0]}</span>
            </div>
          </div>
        )}

        {/* Links */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                title={collapsed ? item.label : undefined}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[#7158E2] text-white shadow-sm shadow-[#7158E2]/25 font-semibold'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/70 hover:text-slate-900 dark:hover:text-white'
                } ${collapsed ? 'justify-center px-0' : ''}`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                {!collapsed && (
                  <span className="truncate flex-1 text-left">{item.label}</span>
                )}
                {!collapsed && item.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-mono uppercase tracking-wider ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-[#F0EDFF] text-[#7158E2] dark:bg-purple-950/60 dark:text-purple-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
                {!collapsed && typeof item.count === 'number' && item.count > 0 && (
                  <span className="w-5 h-5 rounded-full bg-[#E76F75] text-white text-[10px] font-bold flex items-center justify-center">
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Controls: Collapse Toggle & Logout */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-800 space-y-1">
        <button
          onClick={onToggleCollapse}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors ${
            collapsed ? 'justify-center' : ''
          }`}
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4" />
              <span>Collapse Sidebar</span>
            </>
          )}
        </button>

        <button
          onClick={onLogout}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-slate-500 hover:text-[#E76F75] dark:hover:text-[#E76F75] hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors ${
            collapsed ? 'justify-center' : ''
          }`}
        >
          <LogOut className="w-4 h-4 text-slate-400 group-hover:text-[#E76F75]" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
};
