import React from 'react';
import { AppNotification } from '../types';
import { Bell, Check, X, Flame, AlertCircle, Clock, Calendar, ArrowRight } from 'lucide-react';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: AppNotification[];
  onMarkAllAsRead: () => void;
  onToggleRead: (id: string) => void;
  onNavigate: (view: string) => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
  onToggleRead,
  onNavigate,
}) => {
  if (!isOpen) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-[#F5A623]" />;
      case 'alert':
        return <Flame className="w-4 h-4 text-[#E76F75]" />;
      case 'success':
        return <Check className="w-4 h-4 text-[#25B8A5]" />;
      default:
        return <Clock className="w-4 h-4 text-[#7158E2]" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-white dark:bg-[#11192e] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 overflow-hidden flex flex-col max-h-[80vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#F0EDFF] dark:bg-purple-950/60 text-[#7158E2] flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Academic Alerts & Notifications
              </h3>
              <p className="text-[11px] text-slate-400">
                Automated workload, break, and burnout shift reminders
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onMarkAllAsRead}
              className="text-xs text-[#7158E2] hover:underline font-semibold"
            >
              Mark all read
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {notifications.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-400">
              No active notifications. You are all caught up!
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                className={`p-3.5 rounded-xl border transition-all ${
                  notif.read
                    ? 'bg-white dark:bg-slate-800/40 border-slate-200/60 dark:border-slate-800 text-slate-500'
                    : 'bg-purple-50/40 dark:bg-purple-950/20 border-purple-200/80 dark:border-purple-800/60 text-slate-900 dark:text-white'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    <div className="mt-0.5 shrink-0">{getIcon(notif.type)}</div>
                    <div>
                      <h4 className="text-xs font-bold">{notif.title}</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                        {notif.message}
                      </p>
                      <span className="text-[10px] text-slate-400 font-mono mt-1 block">
                        {notif.timestamp}
                      </span>
                    </div>
                  </div>

                  {notif.actionView && (
                    <button
                      onClick={() => {
                        onClose();
                        onNavigate(notif.actionView!);
                      }}
                      className="px-2.5 py-1 text-[11px] font-bold text-[#7158E2] hover:bg-[#F0EDFF] dark:hover:bg-purple-950/60 rounded-md shrink-0 flex items-center gap-1"
                    >
                      <span>View</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
