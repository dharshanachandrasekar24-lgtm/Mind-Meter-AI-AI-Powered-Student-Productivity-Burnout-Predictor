import React, { useState } from 'react';
import { StudyRecord, Subject, Assignment } from '../types';
import { computeBurnoutPrediction } from '../utils/mlBurnoutModel';
import {
  BarChart3,
  Download,
  Calendar,
  Clock,
  Moon,
  Flame,
  CheckCircle2,
  TrendingUp,
  FileSpreadsheet,
} from 'lucide-react';

interface AnalyticsViewProps {
  records: StudyRecord[];
  subjects: Subject[];
  assignments: Assignment[];
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  records,
  subjects,
  assignments,
}) => {
  const [timeRange, setTimeRange] = useState<'7' | '14' | 'all'>('14');

  // Filter records by time range
  const filteredRecords =
    timeRange === '7'
      ? records.slice(-7)
      : timeRange === '14'
      ? records.slice(-14)
      : records;

  // High-level aggregates
  const totalStudyHours = filteredRecords
    .reduce((acc, r) => acc + r.studyHours, 0)
    .toFixed(1);
  const avgStudyHours = (
    parseFloat(totalStudyHours) / (filteredRecords.length || 1)
  ).toFixed(1);
  const avgSleep = (
    filteredRecords.reduce((acc, r) => acc + r.sleepDuration, 0) /
    (filteredRecords.length || 1)
  ).toFixed(1);
  const avgProductivity = (
    filteredRecords.reduce((acc, r) => acc + r.productivityLevel, 0) /
    (filteredRecords.length || 1)
  ).toFixed(1);

  // Subject-wise study hours breakdown
  const subjectDistribution: { [sub: string]: number } = {};
  filteredRecords.forEach((r) => {
    r.subjects.forEach((sub) => {
      const portion = r.studyHours / (r.subjects.length || 1);
      subjectDistribution[sub] = (subjectDistribution[sub] || 0) + portion;
    });
  });

  const totalSubjectHours =
    Object.values(subjectDistribution).reduce((a, b) => a + b, 0) || 1;

  // Assignments completion ratio
  const completedAsgs = assignments.filter((a) => a.status === 'Completed').length;
  const pendingAsgs = assignments.filter((a) => a.status !== 'Completed').length;

  // Export report as real CSV file
  const handleExportCSV = () => {
    const headers = [
      'Date',
      'Study_Hours',
      'Sleep_Hours',
      'Breaks_Count',
      'Screen_Time_Hours',
      'Pending_Assignments',
      'Tasks_Completed',
      'Productivity_Rating_1_10',
      'Stress_Rating_1_10',
      'Estimated_Burnout_Score',
      'Burnout_Risk_Category',
      'Subjects_Studied',
    ];

    const rows = filteredRecords.map((r) => {
      const pred = computeBurnoutPrediction({
        studyHours: r.studyHours,
        sleepDuration: r.sleepDuration,
        pendingAssignments: r.assignmentsPending,
        breakFrequency: r.breakFrequency,
        screenTime: r.screenTime,
        productivityLevel: r.productivityLevel,
        stressLevel: r.stressLevel,
      });

      return [
        r.date,
        r.studyHours,
        r.sleepDuration,
        r.breakFrequency,
        r.screenTime,
        r.assignmentsPending,
        r.tasksCompleted,
        r.productivityLevel,
        r.stressLevel,
        pred.riskScore,
        pred.riskCategory,
        `"${r.subjects.join(', ')}"`,
      ].join(',');
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `MindMeter_AI_Analytics_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Analytics & Academic Wellness Reports
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Empirical trends in study load, biological rest, and predicted burnout indices.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Range segmented control */}
          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-semibold">
            <button
              onClick={() => setTimeRange('7')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                timeRange === '7'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              7 Days
            </button>
            <button
              onClick={() => setTimeRange('14')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                timeRange === '14'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              14 Days
            </button>
            <button
              onClick={() => setTimeRange('all')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                timeRange === 'all'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              All Records
            </button>
          </div>

          {/* Export CSV button */}
          <button
            onClick={handleExportCSV}
            className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold shadow-sm flex items-center gap-2 transition-all"
          >
            <Download className="w-4 h-4 text-[#7158E2]" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Aggregate Metrics Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white dark:bg-[#11192e] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="text-xs text-slate-400 mb-1 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#7158E2]" />
            <span>Total Study Hours</span>
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
            {totalStudyHours} hrs
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Avg {avgStudyHours} hrs / day</div>
        </div>

        <div className="p-4 bg-white dark:bg-[#11192e] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="text-xs text-slate-400 mb-1 flex items-center gap-1.5">
            <Moon className="w-3.5 h-3.5 text-[#25B8A5]" />
            <span>Average Sleep</span>
          </div>
          <div className="text-2xl font-bold font-mono text-[#25B8A5] tabular-nums">
            {avgSleep} hrs
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Target is 7.5+ hrs</div>
        </div>

        <div className="p-4 bg-white dark:bg-[#11192e] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="text-xs text-slate-400 mb-1 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-[#F5A623]" />
            <span>Productivity Flow</span>
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
            {avgProductivity} / 10
          </div>
          <div className="text-[11px] text-slate-500 mt-1">High Focus Consistency</div>
        </div>

        <div className="p-4 bg-white dark:bg-[#11192e] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="text-xs text-slate-400 mb-1 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>Assignment Clearance</span>
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
            {completedAsgs} / {assignments.length}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">{pendingAsgs} remaining</div>
        </div>
      </div>

      {/* Chart 1: Daily Study Hours & Sleep Comparison */}
      <div className="bg-white dark:bg-[#11192e] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Daily Study Hours vs Sleep Duration
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Notice how days with &gt;7.5h sleep lead to elevated cognitive productivity
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1 text-[#7158E2]">
              <span className="w-2.5 h-2.5 rounded bg-[#7158E2]" /> Study Hours
            </span>
            <span className="flex items-center gap-1 text-[#25B8A5]">
              <span className="w-2.5 h-2.5 rounded bg-[#25B8A5]" /> Sleep Hours
            </span>
          </div>
        </div>

        <div className="h-52 flex items-end justify-between gap-2 pt-6 pb-2 border-b border-slate-100 dark:border-slate-800">
          {filteredRecords.map((r, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1.5 group">
              <div className="w-full flex items-end justify-center gap-1 h-36">
                {/* Study Bar */}
                <div
                  className="w-1/2 max-w-[16px] bg-[#7158E2] rounded-t-sm transition-all"
                  style={{ height: `${Math.min(100, (r.studyHours / 10) * 100)}%` }}
                  title={`Study: ${r.studyHours}h`}
                />
                {/* Sleep Bar */}
                <div
                  className="w-1/2 max-w-[16px] bg-[#25B8A5] rounded-t-sm transition-all"
                  style={{ height: `${Math.min(100, (r.sleepDuration / 10) * 100)}%` }}
                  title={`Sleep: ${r.sleepDuration}h`}
                />
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                {r.date.split('-').slice(1).join('/')}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Grid: Subject-wise Distribution & Burnout Risk Trajectory */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Subject-wise Time Allocation */}
        <div className="lg:col-span-6 bg-white dark:bg-[#11192e] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
              Subject-wise Study Distribution
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Hours allocated across active semester modules
            </p>

            <div className="space-y-3">
              {Object.entries(subjectDistribution).map(([sub, hrs], idx) => {
                const pct = Math.round((hrs / totalSubjectHours) * 100);
                return (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-800 dark:text-slate-200 truncate pr-2">
                        {sub}
                      </span>
                      <span className="font-mono text-slate-600 dark:text-slate-400 tabular-nums">
                        {hrs.toFixed(1)} hrs ({pct}%)
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-[#7158E2] h-full rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Burnout Risk Trend History */}
        <div className="lg:col-span-6 bg-white dark:bg-[#11192e] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
              Burnout Risk Index History
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Trajectory computed by Random Forest Classifier
            </p>

            <div className="space-y-2.5">
              {filteredRecords.slice(-5).map((r, idx) => {
                const pred = computeBurnoutPrediction({
                  studyHours: r.studyHours,
                  sleepDuration: r.sleepDuration,
                  pendingAssignments: r.assignmentsPending,
                  breakFrequency: r.breakFrequency,
                  screenTime: r.screenTime,
                  productivityLevel: r.productivityLevel,
                  stressLevel: r.stressLevel,
                });

                return (
                  <div
                    key={idx}
                    className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-mono font-bold text-slate-900 dark:text-white">
                        {r.date}
                      </span>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {r.studyHours}h study · {r.sleepDuration}h sleep · {r.breakFrequency} breaks
                      </p>
                    </div>

                    <div className="text-right">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                          pred.riskCategory === 'High Risk'
                            ? 'bg-rose-50 text-[#E76F75] dark:bg-rose-950'
                            : pred.riskCategory === 'Moderate Risk'
                            ? 'bg-amber-50 text-[#F5A623] dark:bg-amber-950'
                            : 'bg-teal-50 text-[#25B8A5] dark:bg-teal-950'
                        }`}
                      >
                        {pred.riskCategory} ({pred.riskScore}/100)
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400">
            Export report CSV above for complete longitudinal statistical records.
          </div>
        </div>
      </div>
    </div>
  );
};
