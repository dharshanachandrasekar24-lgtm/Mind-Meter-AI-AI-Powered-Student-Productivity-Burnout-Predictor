import React, { useState } from 'react';
import { StudyRecord, Subject } from '../types';
import {
  Clock,
  Moon,
  Coffee,
  Monitor,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  Edit2,
  Filter,
  Search,
  Calendar,
  Save,
  X,
} from 'lucide-react';

interface TrackerViewProps {
  records: StudyRecord[];
  subjects: Subject[];
  onAddRecord: (record: Omit<StudyRecord, 'id' | 'userId'>) => void;
  onUpdateRecord: (record: StudyRecord) => void;
  onDeleteRecord: (id: string) => void;
}

export const TrackerView: React.FC<TrackerViewProps> = ({
  records,
  subjects,
  onAddRecord,
  onUpdateRecord,
  onDeleteRecord,
}) => {
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState('All');

  // Form states
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [studyHours, setStudyHours] = useState<number>(5.0);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([subjects[0]?.name || 'Computer Science']);
  const [sleepDuration, setSleepDuration] = useState<number>(7.0);
  const [breakFrequency, setBreakFrequency] = useState<number>(3);
  const [screenTime, setScreenTime] = useState<number>(7.5);
  const [assignmentsPending, setAssignmentsPending] = useState<number>(3);
  const [tasksCompleted, setTasksCompleted] = useState<number>(2);
  const [productivityLevel, setProductivityLevel] = useState<number>(7);
  const [stressLevel, setStressLevel] = useState<number>(5);
  const [notes, setNotes] = useState('');

  const toggleSubjectSelection = (subName: string) => {
    if (selectedSubjects.includes(subName)) {
      if (selectedSubjects.length > 1) {
        setSelectedSubjects(selectedSubjects.filter((s) => s !== subName));
      }
    } else {
      setSelectedSubjects([...selectedSubjects, subName]);
    }
  };

  const handleStartEdit = (rec: StudyRecord) => {
    setIsEditing(rec.id);
    setDate(rec.date);
    setStudyHours(rec.studyHours);
    setSelectedSubjects(rec.subjects);
    setSleepDuration(rec.sleepDuration);
    setBreakFrequency(rec.breakFrequency);
    setScreenTime(rec.screenTime);
    setAssignmentsPending(rec.assignmentsPending);
    setTasksCompleted(rec.tasksCompleted);
    setProductivityLevel(rec.productivityLevel);
    setStressLevel(rec.stressLevel);
    setNotes(rec.notes || '');
    setShowAddForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setIsEditing(null);
    setShowAddForm(false);
    setDate(new Date().toISOString().split('T')[0]);
    setStudyHours(5.0);
    setSelectedSubjects([subjects[0]?.name || 'Machine Learning']);
    setSleepDuration(7.0);
    setBreakFrequency(3);
    setScreenTime(7.5);
    setAssignmentsPending(3);
    setTasksCompleted(2);
    setProductivityLevel(7);
    setStressLevel(5);
    setNotes('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditing) {
      const existing = records.find((r) => r.id === isEditing);
      if (existing) {
        onUpdateRecord({
          ...existing,
          date,
          studyHours: Number(studyHours),
          subjects: selectedSubjects,
          sleepDuration: Number(sleepDuration),
          breakFrequency: Number(breakFrequency),
          screenTime: Number(screenTime),
          assignmentsPending: Number(assignmentsPending),
          tasksCompleted: Number(tasksCompleted),
          productivityLevel: Number(productivityLevel),
          stressLevel: Number(stressLevel),
          notes,
        });
      }
    } else {
      onAddRecord({
        date,
        studyHours: Number(studyHours),
        subjects: selectedSubjects,
        sleepDuration: Number(sleepDuration),
        breakFrequency: Number(breakFrequency),
        screenTime: Number(screenTime),
        assignmentsPending: Number(assignmentsPending),
        tasksCompleted: Number(tasksCompleted),
        productivityLevel: Number(productivityLevel),
        stressLevel: Number(stressLevel),
        notes,
      });
    }

    resetForm();
  };

  // Filter records
  const filteredRecords = records
    .filter((r) => {
      const matchesSearch =
        r.date.includes(searchQuery) ||
        r.subjects.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (r.notes && r.notes.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesSubject =
        selectedSubjectFilter === 'All' || r.subjects.includes(selectedSubjectFilter);
      return matchesSearch && matchesSubject;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Quick summary averages
  const avgStudy = (records.reduce((acc, r) => acc + r.studyHours, 0) / (records.length || 1)).toFixed(1);
  const avgSleep = (records.reduce((acc, r) => acc + r.sleepDuration, 0) / (records.length || 1)).toFixed(1);
  const avgStress = (records.reduce((acc, r) => acc + r.stressLevel, 0) / (records.length || 1)).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Top Header & Summary Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Daily Study & Habit Log
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Record study hours, sleep metrics, and workload parameters to calibrate your burnout model.
          </p>
        </div>

        <button
          onClick={() => {
            if (showAddForm) resetForm();
            else setShowAddForm(true);
          }}
          className="px-4 py-2.5 rounded-xl bg-[#7158E2] hover:bg-[#5e44cf] text-white text-xs font-semibold shadow-sm flex items-center gap-2 self-start sm:self-auto"
        >
          {showAddForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          <span>{showAddForm ? 'Close Form' : 'Log New Daily Session'}</span>
        </button>
      </div>

      {/* Averages Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-white dark:bg-[#11192e] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-[#F0EDFF] dark:bg-purple-950/60 text-[#7158E2] flex items-center justify-center font-bold">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400">14-Day Average Study</div>
            <div className="text-lg font-bold font-mono text-slate-900 dark:text-white tabular-nums">
              {avgStudy} hrs / day
            </div>
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-[#11192e] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-[#25B8A5] flex items-center justify-center font-bold">
            <Moon className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400">14-Day Average Sleep</div>
            <div className="text-lg font-bold font-mono text-slate-900 dark:text-white tabular-nums">
              {avgSleep} hrs / night
            </div>
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-[#11192e] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-[#F5A623] flex items-center justify-center font-bold">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400">Subjective Stress Index</div>
            <div className="text-lg font-bold font-mono text-slate-900 dark:text-white tabular-nums">
              {avgStress} / 10
            </div>
          </div>
        </div>
      </div>

      {/* FORM: Add or Edit Record */}
      {showAddForm && (
        <div className="p-6 bg-white dark:bg-[#11192e] rounded-2xl border border-[#7158E2]/40 shadow-md">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {isEditing ? 'Edit Study Record' : 'Record Today’s Academic & Habit Session'}
            </h3>
            <button
              onClick={resetForm}
              className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Row 1: Date & Study Hours */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7158E2]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Study Hours (0 - 16)
                </label>
                <input
                  type="number"
                  step="0.5"
                  min="0"
                  max="16"
                  required
                  value={studyHours}
                  onChange={(e) => setStudyHours(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-[#7158E2]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Sleep Duration (hrs)
                </label>
                <input
                  type="number"
                  step="0.5"
                  min="0"
                  max="14"
                  required
                  value={sleepDuration}
                  onChange={(e) => setSleepDuration(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-[#7158E2]"
                />
              </div>
            </div>

            {/* Row 2: Subjects Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Subjects Studied (Select all that apply)
              </label>
              <div className="flex flex-wrap gap-2">
                {subjects.map((sub) => {
                  const isSelected = selectedSubjects.includes(sub.name);
                  return (
                    <button
                      type="button"
                      key={sub.id}
                      onClick={() => toggleSubjectSelection(sub.name)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        isSelected
                          ? 'bg-[#7158E2] text-white shadow-sm'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      {sub.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Row 3: Breaks, Screen Time, Pending, Completed */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Study Breaks Taken
                </label>
                <input
                  type="number"
                  min="0"
                  max="15"
                  required
                  value={breakFrequency}
                  onChange={(e) => setBreakFrequency(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-[#7158E2]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Total Screen Time (hrs)
                </label>
                <input
                  type="number"
                  step="0.5"
                  min="0"
                  max="20"
                  required
                  value={screenTime}
                  onChange={(e) => setScreenTime(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-[#7158E2]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Pending Assignments
                </label>
                <input
                  type="number"
                  min="0"
                  max="20"
                  required
                  value={assignmentsPending}
                  onChange={(e) => setAssignmentsPending(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-[#7158E2]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Tasks Completed
                </label>
                <input
                  type="number"
                  min="0"
                  max="20"
                  required
                  value={tasksCompleted}
                  onChange={(e) => setTasksCompleted(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-[#7158E2]"
                />
              </div>
            </div>

            {/* Row 4: Self-Reported Sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Productivity Rating (1 - 10)
                  </label>
                  <span className="font-mono font-bold text-xs text-[#25B8A5]">
                    {productivityLevel} / 10
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={productivityLevel}
                  onChange={(e) => setProductivityLevel(parseInt(e.target.value))}
                  className="w-full accent-[#25B8A5] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                  <span>1 (Distracted)</span>
                  <span>10 (High Flow)</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Subjective Stress Level (1 - 10)
                  </label>
                  <span className="font-mono font-bold text-xs text-[#E76F75]">
                    {stressLevel} / 10
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={stressLevel}
                  onChange={(e) => setStressLevel(parseInt(e.target.value))}
                  className="w-full accent-[#E76F75] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                  <span>1 (Calm & Relaxed)</span>
                  <span>10 (Overwhelmed)</span>
                </div>
              </div>
            </div>

            {/* Row 5: Notes */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Reflections or Context Notes
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Cleared problem set 4; felt good after taking a walk."
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7158E2]"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold text-white bg-[#7158E2] hover:bg-[#5e44cf] rounded-lg shadow-sm flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>{isEditing ? 'Update Study Entry' : 'Save Session to Database'}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Historical Records Table & Filters */}
      <div className="bg-white dark:bg-[#11192e] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Study Records History
            </h3>
            <span className="text-xs font-mono text-slate-400">
              ({filteredRecords.length} entries)
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search notes or dates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7158E2] w-48"
              />
            </div>

            {/* Subject filter */}
            <select
              value={selectedSubjectFilter}
              onChange={(e) => setSelectedSubjectFilter(e.target.value)}
              className="px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7158E2]"
            >
              <option value="All">All Subjects</option>
              {subjects.map((s) => (
                <option key={s.id} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                <th className="py-3 px-3">Date</th>
                <th className="py-3 px-3">Study Hours</th>
                <th className="py-3 px-3">Subjects</th>
                <th className="py-3 px-3">Sleep</th>
                <th className="py-3 px-3">Breaks</th>
                <th className="py-3 px-3">Screen Time</th>
                <th className="py-3 px-3">Tasks</th>
                <th className="py-3 px-3">Stress</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-slate-400">
                    No matching study records found.
                  </td>
                </tr>
              ) : (
                filteredRecords.map((r) => (
                  <tr
                    key={r.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="py-3 px-3 font-mono font-medium text-slate-900 dark:text-slate-100 whitespace-nowrap">
                      {r.date}
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-[#7158E2] whitespace-nowrap">
                      {r.studyHours}h
                    </td>
                    <td className="py-3 px-3 max-w-[200px]">
                      <div className="flex flex-wrap gap-1">
                        {r.subjects.map((sub, i) => (
                          <span
                            key={i}
                            className="text-[10px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-700 dark:text-slate-300 truncate"
                          >
                            {sub}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-3 font-mono whitespace-nowrap">
                      <span className={r.sleepDuration < 6 ? 'text-[#E76F75] font-bold' : 'text-slate-700 dark:text-slate-300'}>
                        {r.sleepDuration}h
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-600 dark:text-slate-400">
                      {r.breakFrequency}
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-600 dark:text-slate-400">
                      {r.screenTime}h
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-600 dark:text-slate-400">
                      {r.tasksCompleted} / {r.assignmentsPending} pend
                    </td>
                    <td className="py-3 px-3 font-mono whitespace-nowrap">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          r.stressLevel >= 7
                            ? 'bg-rose-50 text-[#E76F75] dark:bg-rose-950/50'
                            : r.stressLevel >= 5
                            ? 'bg-amber-50 text-[#F5A623] dark:bg-amber-950/50'
                            : 'bg-teal-50 text-[#25B8A5] dark:bg-teal-950/50'
                        }`}
                      >
                        {r.stressLevel}/10
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleStartEdit(r)}
                          className="p-1.5 text-slate-400 hover:text-[#7158E2] rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          title="Edit Record"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDeleteRecord(r.id)}
                          className="p-1.5 text-slate-400 hover:text-[#E76F75] rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          title="Delete Record"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
