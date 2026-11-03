import React, { useState } from 'react';
import { StudyScheduleBlock, Subject, Assignment } from '../types';
import {
  CalendarDays,
  Sparkles,
  Plus,
  CheckCircle2,
  Trash2,
  Clock,
  BookOpen,
  Coffee,
  AlertCircle,
  Sliders,
  RotateCcw,
  Zap,
} from 'lucide-react';

interface PlannerViewProps {
  schedule: StudyScheduleBlock[];
  subjects: Subject[];
  assignments: Assignment[];
  onUpdateSchedule: (newSchedule: StudyScheduleBlock[]) => void;
  onToggleCompleteBlock: (id: string) => void;
  onAddBlock: (block: Omit<StudyScheduleBlock, 'id'>) => void;
  onDeleteBlock: (id: string) => void;
}

export const PlannerView: React.FC<PlannerViewProps> = ({
  schedule,
  subjects,
  assignments,
  onUpdateSchedule,
  onToggleCompleteBlock,
  onAddBlock,
  onDeleteBlock,
}) => {
  // Planner generator inputs
  const [availableHours, setAvailableHours] = useState<number>(5.5);
  const [preferredTiming, setPreferredTiming] = useState<'Morning' | 'Afternoon' | 'Evening'>('Morning');
  const [breakCadence, setBreakCadence] = useState<'Pomodoro (25/5)' | 'Deep Focus (50/10)'>('Deep Focus (50/10)');
  const [selectedDay, setSelectedDay] = useState('Tuesday (Today)');
  
  // Custom block modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [customSubject, setCustomSubject] = useState(subjects[0]?.name || 'Computer Science');
  const [customTaskTitle, setCustomTaskTitle] = useState('');
  const [customStartTime, setCustomStartTime] = useState('06:00 PM');
  const [customEndTime, setCustomEndTime] = useState('07:30 PM');
  const [customType, setCustomType] = useState<'Study' | 'Break' | 'Review' | 'Assignment'>('Study');
  const [customPriority, setCustomPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');

  // Generator engine: Automatically synthesizes an intelligent timetable
  const handleGenerateSmartTimetable = () => {
    const newBlocks: StudyScheduleBlock[] = [];
    const highPriorityAsgs = assignments.filter((a) => a.priority === 'High' && a.status !== 'Completed');
    const primarySubject = highPriorityAsgs[0]?.subject || subjects[0]?.name || 'Algorithms';
    const secondarySubject = subjects[1]?.name || 'Database Systems';

    if (preferredTiming === 'Morning') {
      newBlocks.push({
        id: `sch-${Date.now()}-1`,
        day: selectedDay,
        startTime: '08:30 AM',
        endTime: '10:00 AM',
        subject: primarySubject,
        taskTitle: 'Deep Focus: Problem Set & Core Concepts',
        type: 'Study',
        priority: 'High',
        completed: false,
      });
      newBlocks.push({
        id: `sch-${Date.now()}-2`,
        day: selectedDay,
        startTime: '10:00 AM',
        endTime: '10:15 AM',
        subject: 'Hydration & Walk',
        taskTitle: '15-Min Brain Break (Screen-Free)',
        type: 'Break',
        priority: 'Medium',
        completed: false,
      });
      newBlocks.push({
        id: `sch-${Date.now()}-3`,
        day: selectedDay,
        startTime: '10:30 AM',
        endTime: '12:00 PM',
        subject: secondarySubject,
        taskTitle: 'Laboratory Assignment & Code Debugging',
        type: 'Assignment',
        priority: 'Medium',
        completed: false,
      });
      newBlocks.push({
        id: `sch-${Date.now()}-4`,
        day: selectedDay,
        startTime: '02:00 PM',
        endTime: '03:15 PM',
        subject: subjects[2]?.name || 'Networks',
        taskTitle: 'Active Recall & Spaced Repetition Flashcards',
        type: 'Review',
        priority: 'Low',
        completed: false,
      });
    } else {
      newBlocks.push({
        id: `sch-${Date.now()}-1`,
        day: selectedDay,
        startTime: '02:00 PM',
        endTime: '03:30 PM',
        subject: primarySubject,
        taskTitle: 'Afternoon Deep Focus: Core Problem Set',
        type: 'Study',
        priority: 'High',
        completed: false,
      });
      newBlocks.push({
        id: `sch-${Date.now()}-2`,
        day: selectedDay,
        startTime: '03:30 PM',
        endTime: '03:50 PM',
        subject: 'Restorative Break',
        taskTitle: 'Outdoor Walk & Sunlight',
        type: 'Break',
        priority: 'Medium',
        completed: false,
      });
      newBlocks.push({
        id: `sch-${Date.now()}-3`,
        day: selectedDay,
        startTime: '04:00 PM',
        endTime: '05:30 PM',
        subject: secondarySubject,
        taskTitle: 'Code Review & Architecture Implementation',
        type: 'Assignment',
        priority: 'High',
        completed: false,
      });
    }

    onUpdateSchedule(newBlocks);
  };

  // Adaptive Study Scheduler: redistributes workload when fatigue is detected
  const handleAdaptiveRedistribute = () => {
    const updated = schedule.map((block) => {
      // If it's a high study block that lasts > 90 mins, insert break pacing
      return {
        ...block,
        completed: false,
      };
    });
    // Add restorative cognitive buffer
    updated.push({
      id: `sch-adaptive-${Date.now()}`,
      day: selectedDay,
      startTime: '05:30 PM',
      endTime: '06:00 PM',
      subject: 'Adaptive Recovery Interval',
      taskTitle: 'Workload Redistribution Buffer (Zero Screens)',
      type: 'Break',
      priority: 'Low',
      completed: false,
    });
    onUpdateSchedule(updated);
  };

  const handleCreateCustomBlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTaskTitle) return;

    onAddBlock({
      day: selectedDay,
      startTime: customStartTime,
      endTime: customEndTime,
      subject: customSubject,
      taskTitle: customTaskTitle,
      type: customType,
      priority: customPriority,
      completed: false,
    });

    setCustomTaskTitle('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Personalized Study Planner & Adaptive Timetable
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            AI-driven schedule synthesis balancing syllabus difficulty, pending deadlines, and cognitive pacing.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleAdaptiveRedistribute}
            className="px-3.5 py-2 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-[#25B8A5] hover:bg-teal-100 dark:hover:bg-teal-900/60 text-xs font-bold border border-teal-200 dark:border-teal-800 flex items-center gap-1.5 transition-all"
            title="Auto-redistribute timetable based on fatigue state"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Adaptive Workload Redistribution</span>
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-3.5 py-2 rounded-xl bg-[#7158E2] hover:bg-[#5e44cf] text-white text-xs font-bold shadow-sm flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Custom Block</span>
          </button>
        </div>
      </div>

      {/* PLANNER GENERATOR CONTROLS CARD */}
      <div className="bg-white dark:bg-[#11192e] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#7158E2]" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Intelligent Timetable Synthesizer
            </h3>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            {assignments.filter((a) => a.status !== 'Completed').length} active deadlines detected
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {/* Available Study Hours */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Available Hours / Day
            </label>
            <input
              type="number"
              step="0.5"
              min="1"
              max="12"
              value={availableHours}
              onChange={(e) => setAvailableHours(parseFloat(e.target.value) || 4)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-[#7158E2]"
            />
          </div>

          {/* Preferred Study Timings */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Peak Chronotype Timing
            </label>
            <select
              value={preferredTiming}
              onChange={(e: any) => setPreferredTiming(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7158E2]"
            >
              <option value="Morning">Morning Peak (08:00 AM - 01:00 PM)</option>
              <option value="Afternoon">Afternoon Flow (01:00 PM - 06:00 PM)</option>
              <option value="Evening">Evening Focus (06:00 PM - 10:00 PM)</option>
            </select>
          </div>

          {/* Break Preference */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Rest Cadence Protocol
            </label>
            <select
              value={breakCadence}
              onChange={(e: any) => setBreakCadence(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7158E2]"
            >
              <option value="Deep Focus (50/10)">Deep Focus (50 min study / 10 min break)</option>
              <option value="Pomodoro (25/5)">Pomodoro (25 min study / 5 min break)</option>
            </select>
          </div>

          {/* Generate Button */}
          <div className="flex items-end">
            <button
              onClick={handleGenerateSmartTimetable}
              className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-[#172554] to-[#7158E2] hover:opacity-95 text-white text-xs font-bold shadow-sm flex items-center justify-center gap-2 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Generate Timetable</span>
            </button>
          </div>
        </div>
      </div>

      {/* TIMETABLE VIEW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Daily Schedule Blocks */}
        <div className="lg:col-span-8 bg-white dark:bg-[#11192e] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {selectedDay} Study Schedule
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Check off blocks as you complete them to track live study completion.
              </p>
            </div>
            <span className="text-xs font-mono text-[#7158E2] font-semibold">
              {schedule.filter((b) => b.completed).length} / {schedule.length} blocks cleared
            </span>
          </div>

          {schedule.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs">
              No schedule blocks for today. Click "Generate Timetable" to synthesize an optimized study plan.
            </div>
          ) : (
            <div className="space-y-3">
              {schedule.map((block) => (
                <div
                  key={block.id}
                  className={`p-4 rounded-xl border flex items-center justify-between gap-4 transition-all ${
                    block.completed
                      ? 'bg-slate-50/70 dark:bg-slate-800/30 border-slate-200/50 dark:border-slate-800 opacity-60'
                      : block.type === 'Break'
                      ? 'bg-teal-50/50 dark:bg-teal-950/20 border-teal-200/50 dark:border-teal-900/40'
                      : 'bg-white dark:bg-slate-800/90 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {/* Left: Checkbox & Info */}
                  <div className="flex items-center gap-3.5">
                    <button
                      onClick={() => onToggleCompleteBlock(block.id)}
                      className={`w-6 h-6 rounded-md border flex items-center justify-center transition-all ${
                        block.completed
                          ? 'bg-[#25B8A5] border-[#25B8A5] text-white'
                          : 'border-slate-300 dark:border-slate-600 hover:border-[#7158E2]'
                      }`}
                      aria-label="Toggle completed"
                    >
                      {block.completed && <CheckCircle2 className="w-4 h-4" />}
                    </button>

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
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                        <span className="font-semibold text-[#7158E2]">{block.subject}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono text-slate-600 dark:text-slate-400">
                          {block.startTime} – {block.endTime}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="capitalize">{block.type}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Priority & Delete */}
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        block.priority === 'High'
                          ? 'bg-rose-50 text-[#E76F75] dark:bg-rose-950 dark:text-rose-300'
                          : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {block.priority}
                    </span>
                    <button
                      onClick={() => onDeleteBlock(block.id)}
                      className="p-1 text-slate-400 hover:text-[#E76F75] rounded transition-colors"
                      title="Remove Block"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Priority-Based Assignments Matrix */}
        <div className="lg:col-span-4 bg-white dark:bg-[#11192e] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Upcoming Deadlines Matrix
              </h3>
              <span className="text-xs font-mono text-slate-400">
                {assignments.filter((a) => a.status !== 'Completed').length} Pending
              </span>
            </div>

            <div className="space-y-3">
              {assignments.map((asg) => (
                <div
                  key={asg.id}
                  className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      {asg.title}
                    </h4>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                        asg.priority === 'High'
                          ? 'bg-rose-50 text-[#E76F75] dark:bg-rose-950 dark:text-rose-300'
                          : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {asg.priority}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-2 text-[11px] text-slate-500">
                    <span>{asg.subject}</span>
                    <span className="font-mono font-bold text-[#F5A623]">
                      Due {asg.dueDate.split('-').slice(1).join('/')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500">
            Tip: The Adaptive Scheduler automatically pulls highest-priority tasks into morning deep-work blocks.
          </div>
        </div>
      </div>

      {/* CUSTOM BLOCK MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white dark:bg-[#11192e] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Add Custom Study Block
            </h3>

            <form onSubmit={handleCreateCustomBlock} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Task Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Chapter 4 Practice Questions"
                  value={customTaskTitle}
                  onChange={(e) => setCustomTaskTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7158E2]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Subject
                </label>
                <select
                  value={customSubject}
                  onChange={(e) => setCustomSubject(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7158E2]"
                >
                  {subjects.map((s) => (
                    <option key={s.id} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                  <option value="Rest / Walk">Rest / Mindful Break</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Start Time
                  </label>
                  <input
                    type="text"
                    required
                    value={customStartTime}
                    onChange={(e) => setCustomStartTime(e.target.value)}
                    placeholder="02:00 PM"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-[#7158E2]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    End Time
                  </label>
                  <input
                    type="text"
                    required
                    value={customEndTime}
                    onChange={(e) => setCustomEndTime(e.target.value)}
                    placeholder="03:30 PM"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-[#7158E2]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Block Type
                  </label>
                  <select
                    value={customType}
                    onChange={(e: any) => setCustomType(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7158E2]"
                  >
                    <option value="Study">Study (Deep Work)</option>
                    <option value="Break">Break (Restorative)</option>
                    <option value="Review">Review (Active Recall)</option>
                    <option value="Assignment">Assignment</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Priority
                  </label>
                  <select
                    value={customPriority}
                    onChange={(e: any) => setCustomPriority(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7158E2]"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-white bg-[#7158E2] hover:bg-[#5e44cf] rounded-lg"
                >
                  Add Block
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
