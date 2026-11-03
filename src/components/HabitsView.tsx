import React from 'react';
import { HabitItem } from '../types';
import {
  CheckCircle2,
  Flame,
  Award,
  Moon,
  Clock,
  Coffee,
  Monitor,
  HeartPulse,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface HabitsViewProps {
  habits: HabitItem[];
  onToggleHabit: (id: string) => void;
}

export const HabitsView: React.FC<HabitsViewProps> = ({
  habits,
  onToggleHabit,
}) => {
  const handleCheckIn = (id: string, alreadyCompleted: boolean) => {
    onToggleHabit(id);
    if (!alreadyCompleted) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#7158E2', '#25B8A5', '#F5A623'],
        });
      } catch (e) {}
    }
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'sleep':
        return <Moon className="w-5 h-5 text-teal-500" />;
      case 'study':
        return <Clock className="w-5 h-5 text-[#7158E2]" />;
      case 'breaks':
        return <Coffee className="w-5 h-5 text-amber-500" />;
      case 'screen':
        return <Monitor className="w-5 h-5 text-indigo-500" />;
      case 'tasks':
        return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
      case 'stress':
        return <HeartPulse className="w-5 h-5 text-[#E76F75]" />;
      default:
        return <Sparkles className="w-5 h-5 text-purple-500" />;
    }
  };

  const totalStreaks = habits.reduce((acc, h) => acc + h.currentStreak, 0);
  const completedTodayCount = habits.filter((h) => h.completedToday).length;

  return (
    <div className="space-y-6">
      {/* Title & Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Student Habit & Recovery Tracker
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Consistent micro-habits insulate college students against chronic fatigue and burnout.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-white dark:bg-[#11192e] border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-2">
            <Flame className="w-4 h-4 text-[#F5A623]" />
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
              {totalStreaks} Total Active Days
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-xs font-bold text-[#25B8A5]">
            {completedTodayCount} / {habits.length} Cleared Today
          </div>
        </div>
      </div>

      {/* Habits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {habits.map((habit) => (
          <div
            key={habit.id}
            className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
              habit.completedToday
                ? 'bg-white dark:bg-[#11192e] border-[#25B8A5]/40 shadow-sm'
                : 'bg-white dark:bg-[#11192e] border-slate-200 dark:border-slate-800 shadow-sm hover:border-[#7158E2]/40'
            }`}
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800/80 flex items-center justify-center">
                  {getCategoryIcon(habit.category)}
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-900/50 text-[#F5A623] text-xs font-bold">
                  <Flame className="w-3.5 h-3.5" />
                  <span className="font-mono tabular-nums">{habit.currentStreak} day streak</span>
                </div>
              </div>

              {/* Title & Goal */}
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {habit.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                {habit.goalDescription}
              </p>

              {/* 7-Day History Mini Heatmap */}
              <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Last 7 Days Consistency
                </span>
                <div className="flex items-center justify-between gap-1.5">
                  {habit.weeklyHistory.map((done, idx) => {
                    const daysAgo = 6 - idx;
                    const label = daysAgo === 0 ? 'Today' : `${daysAgo}d ago`;
                    return (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                        <div
                          title={label}
                          className={`w-full h-2 rounded-full transition-all ${
                            done
                              ? 'bg-[#25B8A5]'
                              : 'bg-slate-200 dark:bg-slate-800'
                          }`}
                        />
                        <span className="text-[9px] font-mono text-slate-400">
                          {idx === 6 ? 'T' : `D${idx + 1}`}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Check-In Action Button */}
            <div className="mt-6 pt-3 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-mono">
                Best: {habit.bestStreak} days
              </span>

              <button
                onClick={() => handleCheckIn(habit.id, habit.completedToday)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  habit.completedToday
                    ? 'bg-teal-50 dark:bg-teal-950/60 text-[#25B8A5] border border-teal-200 dark:border-teal-800'
                    : 'bg-[#7158E2] hover:bg-[#5e44cf] text-white shadow-sm shadow-[#7158E2]/25 hover:scale-105'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{habit.completedToday ? 'Completed' : 'Check In Today'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Habit Discipline Insights */}
      <div className="p-6 bg-gradient-to-r from-purple-50 via-teal-50 to-indigo-50 dark:from-purple-950/20 dark:via-teal-950/20 dark:to-indigo-950/20 rounded-2xl border border-purple-200/60 dark:border-purple-800/40">
        <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
          <Award className="w-4 h-4 text-[#7158E2]" />
          Pedagogical Habit Science: The 21-Day Cognitive Habit Loop
        </h4>
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          Stanford academic behavioral research demonstrates that automating small routines—such as a 10-minute non-screen break every 50 minutes and an 8-hour digital sunset—decreases perceived workload friction by up to 38% without cutting into required study hours.
        </p>
      </div>
    </div>
  );
};
