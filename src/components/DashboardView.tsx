import React from 'react';
import {
  User,
  StudyRecord,
  BurnoutPrediction,
  Assignment,
  StudyScheduleBlock,
} from '../types';
import {
  Clock,
  CheckCircle2,
  FileText,
  Flame,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Calendar,
  AlertTriangle,
  Lightbulb,
  PlusCircle,
  Play,
} from 'lucide-react';

interface DashboardViewProps {
  user: User;
  records: StudyRecord[];
  latestPrediction: BurnoutPrediction;
  assignments: Assignment[];
  schedule: StudyScheduleBlock[];
  onNavigate: (view: string) => void;
  onQuickLog: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  records,
  latestPrediction,
  assignments,
  schedule,
  onNavigate,
  onQuickLog,
}) => {
  // Compute key stats for today
  const todayRecord = records[records.length - 1];
  const todayStudyHours = todayRecord ? todayRecord.studyHours : 0;
  const todayTasksCompleted = todayRecord ? todayRecord.tasksCompleted : 0;
  
  // Pending assignments count
  const pendingAssignments = assignments.filter((a) => a.status !== 'Completed').length;
  
  // Productivity score (out of 100)
  const productivityScore = todayRecord
    ? Math.round(todayRecord.productivityLevel * 10)
    : 80;

  // Past 7 days for the weekly study activity chart
  const past7Days = records.slice(-7);
  const maxStudyHour = Math.max(...past7Days.map((d) => d.studyHours), 8);

  const getRiskColor = (cat: string) => {
    if (cat === 'High Risk') return 'text-[#E76F75] bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900';
    if (cat === 'Moderate Risk') return 'text-[#F5A623] bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900';
    return 'text-[#25B8A5] bg-teal-50 dark:bg-teal-950/40 border-teal-200 dark:border-teal-900';
  };

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#172554] via-[#1e306e] to-[#7158E2] rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-purple-200 mb-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>Tuesday, November 3, 2026</span>
              <span aria-hidden="true">·</span>
              <span>Semester Week 9</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {user.fullName}!
            </h2>
            <p className="text-xs sm:text-sm text-purple-100 mt-1 max-w-xl">
              {user.department} · {user.collegeName}. You have completed{' '}
              <span className="font-bold text-[#25B8A5]">{todayTasksCompleted} tasks</span> and logged{' '}
              <span className="font-bold text-white">{todayStudyHours} hours</span> so far today.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onQuickLog}
              className="px-4 py-2.5 rounded-xl bg-white text-[#172554] hover:bg-slate-100 font-bold text-xs shadow-sm flex items-center gap-2 transition-all hover:scale-105"
            >
              <PlusCircle className="w-4 h-4 text-[#7158E2]" />
              <span>Log Study Session</span>
            </button>
            <button
              onClick={() => onNavigate('planner')}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs backdrop-blur-sm transition-colors flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>View Planner</span>
            </button>
          </div>
        </div>
      </div>

      {/* Primary KPI Metric Cards (5 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Metric 1: Today's Study Hours */}
        <div className="p-4 bg-white dark:bg-[#11192e] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold">Today's Study</span>
            <Clock className="w-4 h-4 text-[#7158E2]" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
              {todayStudyHours}
            </span>
            <span className="text-xs text-slate-400">/ 5.0 hrs target</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-[#7158E2] h-full rounded-full transition-all"
              style={{ width: `${Math.min(100, (todayStudyHours / 5.0) * 100)}%` }}
            />
          </div>
        </div>

        {/* Metric 2: Completed Tasks */}
        <div className="p-4 bg-white dark:bg-[#11192e] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold">Tasks Completed</span>
            <CheckCircle2 className="w-4 h-4 text-[#25B8A5]" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
              {todayTasksCompleted}
            </span>
            <span className="text-xs text-slate-400">tasks today</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-3 flex items-center gap-1">
            <span className="text-[#25B8A5] font-semibold">+1 ahead</span> of daily target
          </p>
        </div>

        {/* Metric 3: Pending Assignments */}
        <div className="p-4 bg-white dark:bg-[#11192e] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold">Pending Deadlines</span>
            <FileText className="w-4 h-4 text-[#F5A623]" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
              {pendingAssignments}
            </span>
            <span className="text-xs text-slate-400">assignments</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-3 truncate">
            Nearest: <span className="font-semibold text-[#F5A623]">Algorithms (in 48h)</span>
          </p>
        </div>

        {/* Metric 4: Productivity Score */}
        <div className="p-4 bg-white dark:bg-[#11192e] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold">Productivity Score</span>
            <TrendingUp className="w-4 h-4 text-[#25B8A5]" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
              {productivityScore}%
            </span>
            <span className="text-xs text-[#25B8A5] font-semibold">High Focus</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-[#25B8A5] h-full rounded-full transition-all"
              style={{ width: `${productivityScore}%` }}
            />
          </div>
        </div>

        {/* Metric 5: Burnout Risk Indicator */}
        <div
          onClick={() => onNavigate('burnout')}
          className="p-4 bg-white dark:bg-[#11192e] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer hover:border-[#7158E2]/50 transition-all group"
        >
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold flex items-center gap-1">
              Burnout Risk
              <span className="text-[10px] text-[#7158E2] font-mono">ML</span>
            </span>
            <Flame className="w-4 h-4 text-[#25B8A5] group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
              {latestPrediction.riskScore}
              <span className="text-xs font-normal text-slate-400">/100</span>
            </span>
            <span
              className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${getRiskColor(
                latestPrediction.riskCategory
              )}`}
            >
              {latestPrediction.riskCategory}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-3 flex items-center justify-between">
            <span>Fatigue index: safe</span>
            <ArrowRight className="w-3 h-3 text-[#7158E2]" />
          </p>
        </div>
      </div>

      {/* Main Grid: Weekly Activity Chart + Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Weekly Study Activity Visualization */}
        <div className="lg:col-span-7 bg-white dark:bg-[#11192e] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Weekly Study Pacing
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Daily recorded study hours vs 5.0h baseline target
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                <span className="w-2.5 h-2.5 rounded bg-[#7158E2]" />
                <span>Actual Hours</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-400">
                <span className="w-2.5 h-0.5 bg-dashed bg-slate-400" />
                <span>5.0h Target</span>
              </div>
            </div>
          </div>

          {/* SVG Bar Chart */}
          <div className="h-56 flex items-end justify-between gap-3 pt-6 pb-2 border-b border-slate-100 dark:border-slate-800">
            {past7Days.map((rec) => {
              const heightPct = Math.round((rec.studyHours / maxStudyHour) * 100);
              const dayLabel = new Date(rec.date).toLocaleDateString('en-US', {
                weekday: 'short',
              });
              const isToday = rec.date === todayRecord?.date;

              return (
                <div key={rec.id} className="flex-1 flex flex-col items-center gap-2 group">
                  {/* Tooltip value */}
                  <span className="text-[11px] font-mono font-bold text-slate-700 dark:text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity">
                    {rec.studyHours}h
                  </span>

                  {/* Bar */}
                  <div className="w-full max-w-[42px] bg-slate-100 dark:bg-slate-800 rounded-t-lg h-44 flex items-end overflow-hidden">
                    <div
                      className={`w-full rounded-t-lg transition-all duration-500 ${
                        isToday
                          ? 'bg-gradient-to-t from-[#7158E2] to-[#25B8A5]'
                          : rec.studyHours >= 7
                          ? 'bg-[#F5A623]'
                          : 'bg-[#7158E2]'
                      }`}
                      style={{ height: `${heightPct}%` }}
                    />
                  </div>

                  {/* Day Label */}
                  <span
                    className={`text-[11px] font-medium ${
                      isToday
                        ? 'font-bold text-[#7158E2]'
                        : 'text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {dayLabel}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
            <span>Average: 5.4 hrs/day</span>
            <button
              onClick={() => onNavigate('analytics')}
              className="text-[#7158E2] hover:underline font-semibold flex items-center gap-1"
            >
              <span>Detailed Analytics</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Right: Today's Personalized AI Recommendations */}
        <div className="lg:col-span-5 bg-white dark:bg-[#11192e] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#F0EDFF] dark:bg-purple-950/60 text-[#7158E2] flex items-center justify-center">
                  <Lightbulb className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  AI Burnout Shield Directives
                </h3>
              </div>
              <span className="text-[10px] font-mono text-[#25B8A5] bg-teal-50 dark:bg-teal-950/50 px-2 py-0.5 rounded border border-teal-200 dark:border-teal-900">
                Pacing Active
              </span>
            </div>

            <div className="space-y-3">
              {latestPrediction.recommendations.map((rec, i) => (
                <div
                  key={i}
                  className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800/80 text-xs text-slate-700 dark:text-slate-300 leading-relaxed flex items-start gap-2.5"
                >
                  <span className="font-mono font-bold text-[#7158E2] shrink-0 mt-0.5">
                    0{i + 1}.
                  </span>
                  <span>{rec}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <button
              onClick={() => onNavigate('assistant')}
              className="text-xs font-bold text-[#7158E2] hover:underline flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask AI Coach for Schedule Breakdown</span>
            </button>
            <span className="text-[11px] text-slate-400">Updated today</span>
          </div>
        </div>
      </div>

      {/* Bottom Grid: Today's Schedule Timeline + Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Today's Schedule Blocks */}
        <div className="lg:col-span-7 bg-white dark:bg-[#11192e] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Today's Adaptive Schedule
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Prioritized study blocks and mandatory cognitive rest intervals
              </p>
            </div>
            <button
              onClick={() => onNavigate('planner')}
              className="text-xs font-bold text-[#7158E2] hover:underline flex items-center gap-1"
            >
              <span>Manage Planner</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {schedule.slice(0, 4).map((block) => (
              <div
                key={block.id}
                className={`p-3 rounded-xl border flex items-center justify-between gap-4 transition-colors ${
                  block.completed
                    ? 'bg-slate-50/70 dark:bg-slate-800/30 border-slate-200/50 dark:border-slate-800 opacity-75'
                    : block.type === 'Break'
                    ? 'bg-teal-50/50 dark:bg-teal-950/20 border-teal-200/50 dark:border-teal-900/40'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                      block.completed
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                        : block.type === 'Break'
                        ? 'bg-teal-100 text-[#25B8A5] dark:bg-teal-950 dark:text-teal-300'
                        : 'bg-[#F0EDFF] text-[#7158E2] dark:bg-purple-950 dark:text-purple-300'
                    }`}
                  >
                    {block.completed ? '✓' : block.type === 'Break' ? '☕' : '📖'}
                  </div>
                  <div>
                    <h4
                      className={`text-xs font-bold ${
                        block.completed
                          ? 'line-through text-slate-400'
                          : 'text-slate-900 dark:text-white'
                      }`}
                    >
                      {block.taskTitle}
                    </h4>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                      <span>{block.subject}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono">{block.startTime} – {block.endTime}</span>
                    </div>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                    block.priority === 'High'
                      ? 'bg-rose-50 text-[#E76F75] dark:bg-rose-950 dark:text-rose-300'
                      : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                  }`}
                >
                  {block.priority} Priority
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Assignments List */}
        <div className="lg:col-span-5 bg-white dark:bg-[#11192e] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Upcoming Academic Deadlines
              </h3>
              <span className="text-xs text-slate-400 font-mono">
                {assignments.filter((a) => a.status !== 'Completed').length} active
              </span>
            </div>

            <div className="space-y-3">
              {assignments
                .filter((a) => a.status !== 'Completed')
                .slice(0, 3)
                .map((asg) => (
                  <div
                    key={asg.id}
                    className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                        {asg.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {asg.subject} · Est: {asg.estimatedHours} hrs
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-xs font-bold text-[#F5A623] font-mono">
                        Due {asg.dueDate.split('-').slice(1).join('/')}
                      </div>
                      <span className="text-[10px] text-slate-400 capitalize">
                        {asg.status}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <button
            onClick={() => onNavigate('planner')}
            className="w-full mt-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            Open Assignment Matrix
          </button>
        </div>
      </div>
    </div>
  );
};
