import React, { useState } from 'react';
import { BurnoutPrediction, StudyRecord } from '../types';
import {
  MODEL_METRICS,
  computeBurnoutPrediction,
} from '../utils/mlBurnoutModel';
import {
  Flame,
  ShieldAlert,
  Sparkles,
  TrendingDown,
  Info,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Cpu,
  BarChart2,
  RefreshCw,
  HelpCircle,
} from 'lucide-react';

interface BurnoutViewProps {
  currentPrediction: BurnoutPrediction;
  historyRecords: StudyRecord[];
  onSaveSimulatedRecord?: (pred: BurnoutPrediction) => void;
}

export const BurnoutView: React.FC<BurnoutViewProps> = ({
  currentPrediction,
  historyRecords,
}) => {
  // Interactive "What-If" Simulator state
  const [simStudyHours, setSimStudyHours] = useState(currentPrediction.studyHours);
  const [simSleep, setSimSleep] = useState(currentPrediction.sleepDuration);
  const [simPending, setSimPending] = useState(currentPrediction.pendingAssignments);
  const [simBreaks, setSimBreaks] = useState(currentPrediction.breakFrequency);
  const [simScreen, setSimScreen] = useState(currentPrediction.screenTime);
  const [simProd, setSimProd] = useState(currentPrediction.productivityLevel);
  const [simStress, setSimStress] = useState(currentPrediction.stressLevel);

  // Compute simulated prediction live
  const simulatedPrediction = computeBurnoutPrediction({
    studyHours: simStudyHours,
    sleepDuration: simSleep,
    pendingAssignments: simPending,
    breakFrequency: simBreaks,
    screenTime: simScreen,
    productivityLevel: simProd,
    stressLevel: simStress,
  });

  const getRiskBadge = (cat: string) => {
    if (cat === 'High Risk') {
      return {
        bg: 'bg-rose-50 text-[#E76F75] border-rose-200 dark:bg-rose-950/40 dark:border-rose-900',
        stroke: '#E76F75',
        label: 'High Academic Burnout Risk',
      };
    }
    if (cat === 'Moderate Risk') {
      return {
        bg: 'bg-amber-50 text-[#F5A623] border-amber-200 dark:bg-amber-950/40 dark:border-amber-900',
        stroke: '#F5A623',
        label: 'Moderate Fatigue Risk',
      };
    }
    return {
      bg: 'bg-teal-50 text-[#25B8A5] border-teal-200 dark:bg-teal-950/40 dark:border-teal-900',
      stroke: '#25B8A5',
      label: 'Low / Balanced Risk',
    };
  };

  const currentBadge = getRiskBadge(currentPrediction.riskCategory);
  const simBadge = getRiskBadge(simulatedPrediction.riskCategory);

  // Historical trend points (last 10 records)
  const recentRecords = historyRecords.slice(-10);
  const historicalScores = recentRecords.map((r) => {
    const pred = computeBurnoutPrediction({
      studyHours: r.studyHours,
      sleepDuration: r.sleepDuration,
      pendingAssignments: r.assignmentsPending,
      breakFrequency: r.breakFrequency,
      screenTime: r.screenTime,
      productivityLevel: r.productivityLevel,
      stressLevel: r.stressLevel,
    });
    return { date: r.date, score: pred.riskScore, cat: pred.riskCategory };
  });

  return (
    <div className="space-y-6">
      {/* Page Title & Medical Boundary Disclaimer */}
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            AI Burnout Risk Estimation
          </h2>
          <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-purple-50 dark:bg-purple-950/60 text-[#7158E2] border border-purple-200 dark:border-purple-800">
            Random Forest Ensemble
          </span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Evidence-based machine learning model analyzing study cadence, sleep debt, and assignment volume.
        </p>
      </div>

      {/* Mandatory Prototype & Non-Clinical Disclaimer Banner */}
      <div className="p-4 bg-amber-50/80 dark:bg-amber-950/30 rounded-xl border border-amber-200/80 dark:border-amber-900/50 flex items-start gap-3">
        <Info className="w-4 h-4 text-[#F5A623] shrink-0 mt-0.5" />
        <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
          <strong className="text-slate-900 dark:text-white">Academic Fatigue Model Notice:</strong>{' '}
          This algorithm estimates cognitive strain and study pacing from self-reported student inputs.
          It is an academic planning utility, <span className="underline font-semibold">not</span> a clinical or medical diagnosis of psychological disorders. If you experience severe distress, please consult your university counseling center.
        </div>
      </div>

      {/* PRIMARY GAUGE & CONTRIBUTING FACTORS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Risk Gauge & Score Card */}
        <div className="lg:col-span-5 bg-white dark:bg-[#11192e] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Current Risk Status
              </span>
              <span className="text-xs font-mono text-slate-400">
                Calibrated Nov 03, 2026
              </span>
            </div>

            {/* Circular Gauge Visualization */}
            <div className="relative flex flex-col items-center justify-center my-4">
              <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
                {/* Background Ring */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-slate-100 dark:text-slate-800"
                />
                {/* Colored Progress Ring */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke={currentBadge.stroke}
                  strokeWidth="8"
                  strokeDasharray={251.2}
                  strokeDashoffset={251.2 - (251.2 * currentPrediction.riskScore) / 100}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>

              {/* Inner Metric */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-4xl font-extrabold font-mono text-slate-900 dark:text-white tabular-nums">
                  {currentPrediction.riskScore}
                </span>
                <span className="text-[11px] font-semibold text-slate-400">out of 100</span>
              </div>
            </div>

            {/* Risk Category Pill */}
            <div className="text-center mt-2">
              <span
                className={`inline-block px-3 py-1 rounded-lg text-xs font-bold border ${currentBadge.bg}`}
              >
                {currentPrediction.riskCategory}
              </span>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                {currentPrediction.riskCategory === 'Low Risk'
                  ? 'Your study-rest rhythm is well-balanced. Minimal risk of cognitive fatigue.'
                  : currentPrediction.riskCategory === 'Moderate Risk'
                  ? 'Pacing strain detected. Consider increasing breaks and capping evening screen hours.'
                  : 'Critical cognitive fatigue indicators detected. High risk of academic burnout.'}
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Model: Random Forest (120 Trees)</span>
            <span className="font-mono">F1-Score: 90.9%</span>
          </div>
        </div>

        {/* Right Column: Contributing Factors Breakdown */}
        <div className="lg:col-span-7 bg-white dark:bg-[#11192e] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Contributing Workload Factors
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Proportional weights driving your current risk calculation
                </p>
              </div>
              <span className="text-xs font-mono text-slate-400">Total: 100%</span>
            </div>

            {/* Factor Bars */}
            <div className="space-y-4">
              {currentPrediction.contributingFactors.map((factor, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {factor.factor}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">
                        {factor.explanation}
                      </span>
                      <span className="font-mono font-bold text-slate-900 dark:text-white tabular-nums">
                        {factor.percentage}%
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        factor.impact === 'High'
                          ? 'bg-[#E76F75]'
                          : factor.impact === 'Medium'
                          ? 'bg-[#F5A623]'
                          : 'bg-[#25B8A5]'
                      }`}
                      style={{ width: `${factor.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Recommendations Section */}
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-[#F5A623]" />
                Personalized Mitigations
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {currentPrediction.recommendations.map((rec, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-100 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed"
                  >
                    • {rec}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* HISTORICAL TREND GRAPH (Past 10 Days) */}
      <div className="bg-white dark:bg-[#11192e] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              10-Day Burnout Risk Trajectory
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Historical movement between Low, Moderate, and High zones based on logged records
            </p>
          </div>
          <div className="flex items-center gap-3 text-[11px]">
            <span className="flex items-center gap-1 text-[#25B8A5]">
              <span className="w-2 h-2 rounded-full bg-[#25B8A5]" /> Low (&lt;40)
            </span>
            <span className="flex items-center gap-1 text-[#F5A623]">
              <span className="w-2 h-2 rounded-full bg-[#F5A623]" /> Mod (40-69)
            </span>
            <span className="flex items-center gap-1 text-[#E76F75]">
              <span className="w-2 h-2 rounded-full bg-[#E76F75]" /> High (&ge;70)
            </span>
          </div>
        </div>

        {/* Chart representation */}
        <div className="h-44 flex items-end justify-between gap-2 pt-6 pb-2 border-b border-slate-100 dark:border-slate-800">
          {historicalScores.map((pt, i) => {
            const heightPct = Math.max(10, Math.min(100, pt.score));
            const isLatest = i === historicalScores.length - 1;
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5 group">
                <span className="text-[10px] font-mono font-bold text-slate-600 dark:text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity">
                  {pt.score}
                </span>
                <div className="w-full max-w-[36px] bg-slate-100 dark:bg-slate-800 rounded-t-md h-32 flex items-end overflow-hidden">
                  <div
                    className={`w-full rounded-t-md transition-all ${
                      pt.cat === 'High Risk'
                        ? 'bg-[#E76F75]'
                        : pt.cat === 'Moderate Risk'
                        ? 'bg-[#F5A623]'
                        : 'bg-[#25B8A5]'
                    } ${isLatest ? 'ring-2 ring-purple-400' : ''}`}
                    style={{ height: `${heightPct}%` }}
                  />
                </div>
                <span className="text-[10px] font-mono text-slate-400">
                  {pt.date.split('-').slice(1).join('/')}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* INTERACTIVE "WHAT-IF" WORKLOAD SIMULATOR */}
      <div className="bg-white dark:bg-[#11192e] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#F0EDFF] dark:bg-purple-950/60 text-[#7158E2] flex items-center justify-center">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Interactive "What-If" Workload Simulator
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Adjust prospective sleep or study parameters to see how changing habits shifts your predicted burnout risk.
              </p>
            </div>
          </div>

          {/* Simulated Score Outcome Pill */}
          <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/80 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="text-right">
              <div className="text-[10px] uppercase font-bold text-slate-400">
                Simulated Outcome
              </div>
              <div className="text-xs font-bold text-slate-800 dark:text-slate-100">
                {simulatedPrediction.riskCategory}
              </div>
            </div>
            <div
              className={`px-3 py-1.5 rounded-lg font-mono font-bold text-sm border ${simBadge.bg}`}
            >
              {simulatedPrediction.riskScore} / 100
            </div>
          </div>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Slider 1: Sleep */}
          <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-700 dark:text-slate-300">Sleep Duration</span>
              <span className="font-mono text-[#7158E2]">{simSleep} hrs</span>
            </div>
            <input
              type="range"
              min="4"
              max="10"
              step="0.5"
              value={simSleep}
              onChange={(e) => setSimSleep(parseFloat(e.target.value))}
              className="w-full accent-[#7158E2] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>4.0h (Severe Deficit)</span>
              <span>10.0h</span>
            </div>
          </div>

          {/* Slider 2: Study Hours */}
          <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-700 dark:text-slate-300">Daily Study Hours</span>
              <span className="font-mono text-[#7158E2]">{simStudyHours} hrs</span>
            </div>
            <input
              type="range"
              min="1"
              max="12"
              step="0.5"
              value={simStudyHours}
              onChange={(e) => setSimStudyHours(parseFloat(e.target.value))}
              className="w-full accent-[#7158E2] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>1.0h</span>
              <span>12.0h</span>
            </div>
          </div>

          {/* Slider 3: Break Frequency */}
          <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-700 dark:text-slate-300">Restorative Breaks</span>
              <span className="font-mono text-[#25B8A5]">{simBreaks} breaks</span>
            </div>
            <input
              type="range"
              min="0"
              max="8"
              value={simBreaks}
              onChange={(e) => setSimBreaks(parseInt(e.target.value))}
              className="w-full accent-[#25B8A5] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>0 (Continuous)</span>
              <span>8 breaks</span>
            </div>
          </div>

          {/* Slider 4: Pending Assignments */}
          <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-700 dark:text-slate-300">Pending Assignments</span>
              <span className="font-mono text-[#F5A623]">{simPending} items</span>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              value={simPending}
              onChange={(e) => setSimPending(parseInt(e.target.value))}
              className="w-full accent-[#F5A623] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>0 (All Cleared)</span>
              <span>10 tasks</span>
            </div>
          </div>

          {/* Slider 5: Screen Time */}
          <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-700 dark:text-slate-300">Total Screen Time</span>
              <span className="font-mono text-[#7158E2]">{simScreen} hrs</span>
            </div>
            <input
              type="range"
              min="2"
              max="16"
              step="0.5"
              value={simScreen}
              onChange={(e) => setSimScreen(parseFloat(e.target.value))}
              className="w-full accent-[#7158E2] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>2.0h</span>
              <span>16.0h</span>
            </div>
          </div>

          {/* Slider 6: Subjective Stress */}
          <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-700 dark:text-slate-300">Self-Reported Stress</span>
              <span className="font-mono text-[#E76F75]">{simStress} / 10</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={simStress}
              onChange={(e) => setSimStress(parseInt(e.target.value))}
              className="w-full accent-[#E76F75] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>1 (Calm)</span>
              <span>10 (Overwhelmed)</span>
            </div>
          </div>
        </div>

        {/* Simulator Insight */}
        <div className="mt-6 p-4 rounded-xl bg-[#F0EDFF] dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/40 flex items-center justify-between gap-4">
          <div className="text-xs text-slate-700 dark:text-slate-300">
            <strong>Simulation Insight:</strong>{' '}
            {simSleep >= 7.5 && simBreaks >= 3
              ? 'Increasing sleep to 7.5+ hours and adding 3 breaks keeps your predicted risk well within the safe zone.'
              : simSleep < 6
              ? 'Sleep deficit is the single strongest driver pushing your score toward High Risk.'
              : 'Maintaining regular breaks and clearing assignments one by one keeps workload manageable.'}
          </div>
          <button
            onClick={() => {
              setSimStudyHours(currentPrediction.studyHours);
              setSimSleep(currentPrediction.sleepDuration);
              setSimPending(currentPrediction.pendingAssignments);
              setSimBreaks(currentPrediction.breakFrequency);
              setSimScreen(currentPrediction.screenTime);
              setSimProd(currentPrediction.productivityLevel);
              setSimStress(currentPrediction.stressLevel);
            }}
            className="px-3 py-1.5 text-xs font-semibold text-[#7158E2] dark:text-purple-300 hover:underline shrink-0 flex items-center gap-1"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Sliders</span>
          </button>
        </div>
      </div>

      {/* MACHINE LEARNING ARCHITECTURE & TRANSPARENCY CARD */}
      <div className="bg-white dark:bg-[#11192e] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Cpu className="w-5 h-5 text-[#7158E2]" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Model Specifications & Validation Metrics (Scikit-learn Parity)
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 text-center">
            <span className="text-xs text-slate-400">Validation Accuracy</span>
            <div className="text-xl font-bold font-mono text-[#25B8A5] mt-0.5">
              {MODEL_METRICS.validationAccuracy}%
            </div>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 text-center">
            <span className="text-xs text-slate-400">Precision</span>
            <div className="text-xl font-bold font-mono text-[#7158E2] mt-0.5">
              {MODEL_METRICS.precision}%
            </div>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 text-center">
            <span className="text-xs text-slate-400">Recall</span>
            <div className="text-xl font-bold font-mono text-[#172554] dark:text-blue-300 mt-0.5">
              {MODEL_METRICS.recall}%
            </div>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 text-center">
            <span className="text-xs text-slate-400">F1-Score</span>
            <div className="text-xl font-bold font-mono text-[#F5A623] mt-0.5">
              {MODEL_METRICS.f1Score}%
            </div>
          </div>
        </div>

        {/* Feature Weights */}
        <div className="text-xs">
          <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-2">
            Relative Feature Importances (Random Forest Gini Impurity):
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {MODEL_METRICS.featureImportance.map((fi, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex justify-between items-center"
              >
                <span className="text-slate-600 dark:text-slate-400">{fi.feature}</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">
                  {(fi.weight * 100).toFixed(0)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
