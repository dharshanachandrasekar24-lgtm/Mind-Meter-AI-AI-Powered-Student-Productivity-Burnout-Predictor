import React, { useState } from 'react';
import { User } from '../types';
import {
  User as UserIcon,
  Lock,
  Moon,
  Sun,
  Bell,
  Save,
  RotateCcw,
  CheckCircle2,
  Shield,
  Building,
} from 'lucide-react';

interface SettingsViewProps {
  user: User;
  onUpdateUser: (user: User) => void;
  darkMode: boolean;
  onToggleTheme: () => void;
  onResetSampleData: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  user,
  onUpdateUser,
  darkMode,
  onToggleTheme,
  onResetSampleData,
}) => {
  const [fullName, setFullName] = useState(user.fullName);
  const [collegeName, setCollegeName] = useState(user.collegeName);
  const [department, setDepartment] = useState(user.department);
  const [yearOfStudy, setYearOfStudy] = useState(user.yearOfStudy);
  
  // Notification preferences
  const [deadlineAlerts, setDeadlineAlerts] = useState(true);
  const [breakReminders, setBreakReminders] = useState(true);
  const [burnoutShiftAlerts, setBurnoutShiftAlerts] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);

  // Password change states
  const [currPassword, setCurrPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      ...user,
      fullName,
      collegeName,
      department,
      yearOfStudy,
    });
    setStatusMessage('Profile updated successfully.');
    setTimeout(() => setStatusMessage(''), 3000);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword !== confirmPassword) {
      setStatusMessage('New passwords do not match.');
      return;
    }
    setCurrPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setStatusMessage('Password updated successfully.');
    setTimeout(() => setStatusMessage(''), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Title */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Account & Application Settings
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Manage your academic profile, credentials, UI theme preferences, and notification rules.
        </p>
      </div>

      {statusMessage && (
        <div className="p-3 bg-teal-50 dark:bg-teal-950/40 rounded-xl border border-teal-200 dark:border-teal-800 text-xs text-[#25B8A5] flex items-center gap-2 font-semibold">
          <CheckCircle2 className="w-4 h-4" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Profile Form */}
      <div className="bg-white dark:bg-[#11192e] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 pb-2 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
          <UserIcon className="w-4 h-4 text-[#7158E2]" />
          Academic Profile Information
        </h3>

        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7158E2]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                University Email (Read-Only)
              </label>
              <input
                type="email"
                disabled
                value={user.email}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-slate-400 cursor-not-allowed font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                College / University Name
              </label>
              <input
                type="text"
                required
                value={collegeName}
                onChange={(e) => setCollegeName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7158E2]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Academic Department
              </label>
              <input
                type="text"
                required
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7158E2]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Year of Study
              </label>
              <select
                value={yearOfStudy}
                onChange={(e) => setYearOfStudy(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7158E2]"
              >
                <option value="1st Year (Freshman)">1st Year (Freshman)</option>
                <option value="2nd Year (Sophomore)">2nd Year (Sophomore)</option>
                <option value="3rd Year (Junior)">3rd Year (Junior)</option>
                <option value="4th Year (Senior)">4th Year (Senior)</option>
                <option value="Graduate / Masters">Graduate / Masters</option>
                <option value="PhD Candidate">PhD Candidate</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-4 py-2 text-xs font-bold text-white bg-[#7158E2] hover:bg-[#5e44cf] rounded-lg shadow-sm flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Academic Profile</span>
            </button>
          </div>
        </form>
      </div>

      {/* Appearance / Theme */}
      <div className="bg-white dark:bg-[#11192e] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 pb-2 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
          {darkMode ? <Moon className="w-4 h-4 text-purple-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
          Interface Theme & Display Preferences
        </h3>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">
              Color Theme Mode
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Currently using {darkMode ? 'Dark Mode (Low-Glance Contrast)' : 'Light Mode (Clean Crisp Daylight)'}
            </p>
          </div>

          <button
            type="button"
            onClick={onToggleTheme}
            className="px-4 py-2 text-xs font-bold text-slate-800 dark:text-slate-100 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center gap-2"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            <span>Switch to {darkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="bg-white dark:bg-[#11192e] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 pb-2 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
          <Bell className="w-4 h-4 text-[#F5A623]" />
          Smart Notification Rules
        </h3>

        <div className="space-y-4">
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">
                Upcoming Assignment Deadline Alerts
              </div>
              <div className="text-[11px] text-slate-500">
                Notify when an assignment is due in less than 48 hours
              </div>
            </div>
            <input
              type="checkbox"
              checked={deadlineAlerts}
              onChange={(e) => setDeadlineAlerts(e.target.checked)}
              className="w-4 h-4 accent-[#7158E2]"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">
                Continuous Study Session Break Warnings
              </div>
              <div className="text-[11px] text-slate-500">
                Suggest a 15-minute rest after 90+ minutes of unbroken deep study
              </div>
            </div>
            <input
              type="checkbox"
              checked={breakReminders}
              onChange={(e) => setBreakReminders(e.target.checked)}
              className="w-4 h-4 accent-[#7158E2]"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">
                Burnout Risk Category Shift Notices
              </div>
              <div className="text-[11px] text-slate-500">
                Alert immediately if estimated fatigue transitions into Moderate or High Risk
              </div>
            </div>
            <input
              type="checkbox"
              checked={burnoutShiftAlerts}
              onChange={(e) => setBurnoutShiftAlerts(e.target.checked)}
              className="w-4 h-4 accent-[#7158E2]"
            />
          </label>
        </div>
      </div>

      {/* Change Password Form */}
      <div className="bg-white dark:bg-[#11192e] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 pb-2 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
          <Lock className="w-4 h-4 text-emerald-500" />
          Update Password
        </h3>

        <form onSubmit={handleChangePassword} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Current Password
              </label>
              <input
                type="password"
                required
                value={currPassword}
                onChange={(e) => setCurrPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7158E2]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                New Password
              </label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7158E2]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7158E2]"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-4 py-2 text-xs font-bold text-white bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 rounded-lg shadow-sm"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>

      {/* Demonstration Reset Action */}
      <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-xs font-bold text-slate-900 dark:text-white">
            Demo Student Environment Reset
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Reset all study records, predictions, habits, and schedules to the original Stanford student demonstration dataset.
          </p>
        </div>

        <button
          onClick={onResetSampleData}
          className="px-4 py-2 text-xs font-bold text-[#E76F75] hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 rounded-xl transition-colors shrink-0 flex items-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Sample Demo Data</span>
        </button>
      </div>
    </div>
  );
};
