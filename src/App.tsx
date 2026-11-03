import React, { useState, useEffect } from 'react';
import {
  User,
  StudyRecord,
  Subject,
  Assignment,
  StudyScheduleBlock,
  HabitItem,
  AppNotification,
  ChatMessage,
} from './types';
import {
  INITIAL_USER,
  INITIAL_SUBJECTS,
  INITIAL_ASSIGNMENTS,
  INITIAL_STUDY_RECORDS,
  INITIAL_SCHEDULE,
  INITIAL_HABITS,
  INITIAL_NOTIFICATIONS,
  INITIAL_CHAT_MESSAGES,
} from './data/sampleData';
import { computeBurnoutPrediction } from './utils/mlBurnoutModel';

// Components
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { LandingPage } from './components/LandingPage';
import { AuthModal } from './components/AuthModal';
import { DashboardView } from './components/DashboardView';
import { TrackerView } from './components/TrackerView';
import { BurnoutView } from './components/BurnoutView';
import { PlannerView } from './components/PlannerView';
import { HabitsView } from './components/HabitsView';
import { AssistantView } from './components/AssistantView';
import { AnalyticsView } from './components/AnalyticsView';
import { NotificationsModal } from './components/NotificationsModal';
import { SettingsView } from './components/SettingsView';
import { PythonProjectViewer } from './components/PythonProjectViewer';

export default function App() {
  // Theme state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('mindmeter_theme');
    if (saved) return saved === 'dark';
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('mindmeter_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('mindmeter_theme', 'light');
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  // Authentication & Navigation state
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('mindmeter_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    // Default to the initialized demo user for instant exploratory gratification
    return INITIAL_USER;
  });

  const [activeView, setActiveView] = useState<string>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Modals state
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [notificationsModalOpen, setNotificationsModalOpen] = useState<boolean>(false);

  // Core Application Data Collections
  const [records, setRecords] = useState<StudyRecord[]>(() => {
    const saved = localStorage.getItem('mindmeter_records');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return INITIAL_STUDY_RECORDS;
  });

  const [subjects, setSubjects] = useState<Subject[]>(() => {
    const saved = localStorage.getItem('mindmeter_subjects');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return INITIAL_SUBJECTS;
  });

  const [assignments, setAssignments] = useState<Assignment[]>(() => {
    const saved = localStorage.getItem('mindmeter_assignments');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return INITIAL_ASSIGNMENTS;
  });

  const [schedule, setSchedule] = useState<StudyScheduleBlock[]>(() => {
    const saved = localStorage.getItem('mindmeter_schedule');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return INITIAL_SCHEDULE;
  });

  const [habits, setHabits] = useState<HabitItem[]>(() => {
    const saved = localStorage.getItem('mindmeter_habits');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return INITIAL_HABITS;
  });

  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem('mindmeter_notifications');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return INITIAL_NOTIFICATIONS;
  });

  const [chatHistory, setChatHistory] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('mindmeter_chat');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return INITIAL_CHAT_MESSAGES;
  });

  // Persist state updates to localStorage
  useEffect(() => {
    localStorage.setItem('mindmeter_records', JSON.stringify(records));
  }, [records]);

  useEffect(() => {
    localStorage.setItem('mindmeter_schedule', JSON.stringify(schedule));
  }, [schedule]);

  useEffect(() => {
    localStorage.setItem('mindmeter_habits', JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    localStorage.setItem('mindmeter_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('mindmeter_chat', JSON.stringify(chatHistory));
  }, [chatHistory]);

  // Derived: Current Burnout Prediction
  const latestRecord = records[records.length - 1];
  const latestPrediction = computeBurnoutPrediction({
    studyHours: latestRecord ? latestRecord.studyHours : 4.5,
    sleepDuration: latestRecord ? latestRecord.sleepDuration : 7.0,
    pendingAssignments: latestRecord ? latestRecord.assignmentsPending : 3,
    breakFrequency: latestRecord ? latestRecord.breakFrequency : 2,
    screenTime: latestRecord ? latestRecord.screenTime : 7.0,
    productivityLevel: latestRecord ? latestRecord.productivityLevel : 7,
    stressLevel: latestRecord ? latestRecord.stressLevel : 5,
    userId: user?.id,
  });

  // Handlers
  const handleOpenAuth = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleLoginSuccess = (authenticatedUser: User) => {
    setUser(authenticatedUser);
    localStorage.setItem('mindmeter_user', JSON.stringify(authenticatedUser));
    setActiveView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('mindmeter_user');
    setActiveView('landing');
  };

  const handleNavigate = (view: string) => {
    setActiveView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddRecord = (recordData: Omit<StudyRecord, 'id' | 'userId'>) => {
    const newRecord: StudyRecord = {
      ...recordData,
      id: `rec-${Date.now()}`,
      userId: user?.id || 'usr-1',
    };
    setRecords((prev) => [...prev, newRecord]);

    // Check if new burnout prediction shifted to High Risk to spawn notification
    const pred = computeBurnoutPrediction({
      studyHours: newRecord.studyHours,
      sleepDuration: newRecord.sleepDuration,
      pendingAssignments: newRecord.assignmentsPending,
      breakFrequency: newRecord.breakFrequency,
      screenTime: newRecord.screenTime,
      productivityLevel: newRecord.productivityLevel,
      stressLevel: newRecord.stressLevel,
    });

    if (pred.riskCategory === 'High Risk') {
      const shiftNotif: AppNotification = {
        id: `notif-${Date.now()}`,
        title: 'High Burnout Risk Warning',
        message: 'Your latest logged session indicates elevated cognitive fatigue. Consider taking a rest block.',
        type: 'alert',
        timestamp: 'Just now',
        read: false,
        actionView: 'burnout',
      };
      setNotifications((prev) => [shiftNotif, ...prev]);
    }
  };

  const handleUpdateRecord = (updatedRecord: StudyRecord) => {
    setRecords((prev) =>
      prev.map((r) => (r.id === updatedRecord.id ? updatedRecord : r))
    );
  };

  const handleDeleteRecord = (id: string) => {
    setRecords((prev) => prev.filter((r) => r.id !== id));
  };

  const handleToggleCompleteBlock = (id: string) => {
    setSchedule((prev) =>
      prev.map((b) => (b.id === id ? { ...b, completed: !b.completed } : b))
    );
  };

  const handleAddBlock = (blockData: Omit<StudyScheduleBlock, 'id'>) => {
    const newBlock: StudyScheduleBlock = {
      ...blockData,
      id: `sch-${Date.now()}`,
    };
    setSchedule((prev) => [...prev, newBlock]);
  };

  const handleDeleteBlock = (id: string) => {
    setSchedule((prev) => prev.filter((b) => b.id !== id));
  };

  const handleToggleHabit = (id: string) => {
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id !== id) return h;
        const newCompleted = !h.completedToday;
        const newStreak = newCompleted ? h.currentStreak + 1 : Math.max(0, h.currentStreak - 1);
        const newWeekly = [...h.weeklyHistory];
        newWeekly[newWeekly.length - 1] = newCompleted;

        return {
          ...h,
          completedToday: newCompleted,
          currentStreak: newStreak,
          bestStreak: Math.max(h.bestStreak, newStreak),
          weeklyHistory: newWeekly,
        };
      })
    );
  };

  const handleAddChatMessage = (msg: ChatMessage) => {
    setChatHistory((prev) => [...prev, msg]);
  };

  const handleResetSampleData = () => {
    setUser(INITIAL_USER);
    setRecords(INITIAL_STUDY_RECORDS);
    setSubjects(INITIAL_SUBJECTS);
    setAssignments(INITIAL_ASSIGNMENTS);
    setSchedule(INITIAL_SCHEDULE);
    setHabits(INITIAL_HABITS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setChatHistory(INITIAL_CHAT_MESSAGES);
    localStorage.clear();
    localStorage.setItem('mindmeter_user', JSON.stringify(INITIAL_USER));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FC] dark:bg-[#0c1222] text-slate-800 dark:text-slate-100 transition-colors">
      {/* Top Navigation */}
      <Navbar
        user={user}
        darkMode={darkMode}
        onToggleTheme={toggleTheme}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
        onNavigate={handleNavigate}
        activeView={activeView}
        notifications={notifications}
        onOpenNotifications={() => setNotificationsModalOpen(true)}
        onToggleMobileMenu={() => setMobileMenuOpen((prev) => !prev)}
      />

      {/* Main Body */}
      {user && activeView !== 'landing' ? (
        <div className="flex-1 flex w-full max-w-[1600px] mx-auto">
          {/* Desktop & Mobile Sidebar */}
          <div className={`${mobileMenuOpen ? 'block' : 'hidden'} lg:block shrink-0`}>
            <Sidebar
              activeView={activeView}
              onNavigate={handleNavigate}
              collapsed={sidebarCollapsed}
              onToggleCollapse={() => setSidebarCollapsed((prev) => !prev)}
              unreadNotifications={notifications.filter((n) => !n.read).length}
              onLogout={handleLogout}
              user={user}
            />
          </div>

          {/* Main Content Area */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-y-auto">
            {activeView === 'dashboard' && (
              <DashboardView
                user={user}
                records={records}
                latestPrediction={latestPrediction}
                assignments={assignments}
                schedule={schedule}
                onNavigate={handleNavigate}
                onQuickLog={() => handleNavigate('tracker')}
              />
            )}

            {activeView === 'tracker' && (
              <TrackerView
                records={records}
                subjects={subjects}
                onAddRecord={handleAddRecord}
                onUpdateRecord={handleUpdateRecord}
                onDeleteRecord={handleDeleteRecord}
              />
            )}

            {activeView === 'burnout' && (
              <BurnoutView
                currentPrediction={latestPrediction}
                historyRecords={records}
              />
            )}

            {activeView === 'planner' && (
              <PlannerView
                schedule={schedule}
                subjects={subjects}
                assignments={assignments}
                onUpdateSchedule={(newSch) => setSchedule(newSch)}
                onToggleCompleteBlock={handleToggleCompleteBlock}
                onAddBlock={handleAddBlock}
                onDeleteBlock={handleDeleteBlock}
              />
            )}

            {activeView === 'habits' && (
              <HabitsView habits={habits} onToggleHabit={handleToggleHabit} />
            )}

            {activeView === 'assistant' && (
              <AssistantView
                user={user}
                records={records}
                latestPrediction={latestPrediction}
                assignments={assignments}
                chatHistory={chatHistory}
                onAddChatMessage={handleAddChatMessage}
              />
            )}

            {activeView === 'analytics' && (
              <AnalyticsView
                records={records}
                subjects={subjects}
                assignments={assignments}
              />
            )}

            {activeView === 'python-code' && <PythonProjectViewer />}

            {activeView === 'settings' && (
              <SettingsView
                user={user}
                onUpdateUser={(updated) => {
                  setUser(updated);
                  localStorage.setItem('mindmeter_user', JSON.stringify(updated));
                }}
                darkMode={darkMode}
                onToggleTheme={toggleTheme}
                onResetSampleData={handleResetSampleData}
              />
            )}
          </main>
        </div>
      ) : (
        /* Landing Page (Public View) */
        <LandingPage
          onOpenAuth={handleOpenAuth}
          onExploreDemo={() => {
            setUser(INITIAL_USER);
            setActiveView('dashboard');
          }}
        />
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Notifications Modal */}
      <NotificationsModal
        isOpen={notificationsModalOpen}
        onClose={() => setNotificationsModalOpen(false)}
        notifications={notifications}
        onMarkAllAsRead={() =>
          setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
        }
        onToggleRead={(id) =>
          setNotifications((prev) =>
            prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
          )
        }
        onNavigate={handleNavigate}
      />
    </div>
  );
}
