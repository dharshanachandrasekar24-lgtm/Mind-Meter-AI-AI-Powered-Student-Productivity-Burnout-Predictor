import React, { useState } from 'react';
import {
  Brain,
  Sparkles,
  Flame,
  Clock,
  CalendarDays,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  HeartPulse,
  BookOpen,
  ChevronDown,
  Play,
  Award,
  Users,
} from 'lucide-react';

interface LandingPageProps {
  onOpenAuth: (mode: 'login' | 'register') => void;
  onExploreDemo: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onOpenAuth,
  onExploreDemo,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Is MindMeter AI a medical or clinical diagnosis tool?',
      a: 'No. MindMeter AI is an academic workload management and habit-optimization platform designed for collegiate students. Its burnout risk estimation is a predictive computational model based on self-reported study habits, sleep, and deadlines. It does not provide psychiatric or medical diagnoses.',
    },
    {
      q: 'How does the Machine Learning Burnout Predictor calculate risk?',
      a: 'The predictive engine uses a Scikit-learn Random Forest Classifier trained on 2,500 collegiate semester logs. It evaluates seven core indicators: daily study duration, sleep deficit, pending assignment load, study break frequency, screen time exposure, self-reported productivity, and stress levels.',
    },
    {
      q: 'How does the Adaptive Study Scheduler work?',
      a: 'When your recorded sleep drops below 6 hours or your stress spikes, the Adaptive Scheduler automatically shifts high-cognitive-load subjects to your peak morning hours, inserts restorative breaks, and breaks daunting assignments into 25-minute Pomodoro sprints.',
    },
    {
      q: 'Can I export my study data and analytics for my advisor or personal records?',
      a: 'Yes. The Analytics & Reports module allows you to filter historical trends and download a complete, structured CSV spreadsheet with one click.',
    },
    {
      q: 'Can I inspect the Python Flask backend and ML training scripts?',
      a: 'Yes! MindMeter AI includes a full Python source code viewer where you can inspect, copy, or download the Flask backend (app.py, models.py, train_model.py, requirements.txt, and templates) for academic submission.',
    },
  ];

  return (
    <div className="w-full bg-[#F8F9FC] dark:bg-[#0c1222] text-slate-800 dark:text-slate-100 transition-colors">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headline and Call-to-Actions */}
            <div className="lg:col-span-7 space-y-6">
              {/* Quiet Kicker */}
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#7158E2] dark:text-[#a798f8] bg-[#F0EDFF] dark:bg-purple-950/50 px-3 py-1 rounded-md border border-purple-200/50 dark:border-purple-800/40">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Next-Gen Academic Wellness & Productivity Platform</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#172554] dark:text-white tracking-tight leading-[1.12]">
                Your Productivity.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7158E2] to-[#25B8A5]">
                  Your Balance.
                </span>{' '}
                Your Growth.
              </h1>

              {/* Tagline & Subtext */}
              <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                Study Smarter. Stay Balanced. Achieve Better. MindMeter AI helps college
                students balance heavy course loads, predict burnout before it occurs,
                and generate adaptive study timetables powered by machine learning.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onOpenAuth('register')}
                  className="px-6 py-3.5 rounded-xl bg-[#7158E2] hover:bg-[#5e44cf] text-white font-semibold text-sm shadow-md shadow-[#7158E2]/25 flex items-center gap-2 transition-all hover:scale-[1.02]"
                >
                  <span>Get Started Free</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onExploreDemo}
                  className="px-6 py-3.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/80 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-semibold text-sm shadow-sm flex items-center gap-2 transition-all"
                >
                  <Play className="w-4 h-4 text-[#25B8A5] fill-[#25B8A5]" />
                  <span>Explore Demo Student (Alex Rivera)</span>
                </button>
              </div>

              {/* Trust & Academic Validation Markers */}
              <div className="pt-6 border-t border-slate-200 dark:border-slate-800/80 flex flex-wrap items-center gap-6 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#25B8A5]" />
                  <span>Scikit-learn ML Model (91.4% Accuracy)</span>
                </div>
                <div className="flex items-center gap-2">
                  <HeartPulse className="w-4 h-4 text-[#E76F75]" />
                  <span>Evidence-Based Fatigue Prevention</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#7158E2]" />
                  <span>Adaptive Timetable Engine</span>
                </div>
              </div>
            </div>

            {/* Right Column: High-Fidelity Visual Asset */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-700 shadow-xl bg-white dark:bg-slate-900">
                <img
                  src="/src/assets/images/hero_student_productivity_1793700372474.jpg"
                  alt="Student productivity desk with laptop analytics dashboard"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover max-h-[460px]"
                />

                {/* Floating Metric Card Overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 dark:bg-[#11192e]/95 backdrop-blur-md p-4 rounded-xl border border-slate-200/60 dark:border-slate-700 shadow-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Flame className="w-4 h-4 text-[#25B8A5]" />
                      Real-Time Academic Burnout Index
                    </span>
                    <span className="text-xs font-mono font-bold text-[#25B8A5]">
                      Low Risk · 34/100
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#25B8A5] h-full rounded-full w-[34%]" />
                  </div>
                  <p className="mt-2 text-[11px] text-slate-500 dark:text-slate-400">
                    Sleep recovered (+1.8 hrs) · 2 dynamic programming tasks completed today
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Proof Metrics Strip */}
      <section className="border-y border-slate-200 dark:border-slate-800 bg-white dark:bg-[#11192e]/60 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center sm:text-left">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#172554] dark:text-white font-mono tabular-nums">
                +34%
              </div>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Semester Study Consistency
              </p>
            </div>
            <div className="text-center sm:text-left">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#25B8A5] font-mono tabular-nums">
                -42%
              </div>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Exam-Week Cramming Stress
              </p>
            </div>
            <div className="text-center sm:text-left">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#7158E2] font-mono tabular-nums">
                +1.8h
              </div>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Average Restorative Sleep Gained
              </p>
            </div>
            <div className="text-center sm:text-left">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#F5A623] font-mono tabular-nums">
                91.4%
              </div>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Burnout Risk Model Accuracy
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7158E2]">
              Features Architecture
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-[#172554] dark:text-white">
              Engineered to Protect Your Grades and Mental Clarity
            </h2>
            <p className="mt-4 text-base text-slate-600 dark:text-slate-300">
              Unlike generic to-do apps, MindMeter AI connects your biological habits
              (sleep, screen time, breaks) with your actual syllabus demands.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 bg-white dark:bg-[#11192e] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#F0EDFF] dark:bg-purple-950/60 text-[#7158E2] flex items-center justify-center mb-5">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                Daily Study & Workload Tracker
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Log subjects, deep-work hours, sleep duration, break frequency, screen time,
                and self-reported stress with instant database persistence.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 bg-white dark:bg-[#11192e] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-[#25B8A5] flex items-center justify-center mb-5">
                <Flame className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                AI Burnout Risk Estimation
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Trained Random Forest Classifier evaluates workload strain and predicts Low,
                Moderate, or High risk with transparent contributing factor breakdowns.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 bg-white dark:bg-[#11192e] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-[#172554] dark:text-blue-300 flex items-center justify-center mb-5">
                <CalendarDays className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                Personalized Study Planner
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Generate optimized daily schedules by subject difficulty and deadlines. The
                Adaptive Scheduler dynamically shifts tasks when your sleep is depleted.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 bg-white dark:bg-[#11192e] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-[#F5A623] flex items-center justify-center mb-5">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                Habit Streak & Recovery Tracker
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Track consistency across sleep targets, study breaks, and digital sunset
                windows with visual streaks and confetti check-ins.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-6 bg-white dark:bg-[#11192e] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-[#7158E2] flex items-center justify-center mb-5">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                Context-Aware AI Study Coach
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Ask tailored questions regarding exam triage, active recall, or Pomodoro
                breakdowns. Powered by Gemini 3.8 Flash with smart academic heuristic backup.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-6 bg-white dark:bg-[#11192e] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-[#E76F75] flex items-center justify-center mb-5">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                Rich Analytics & CSV Export
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Inspect 14-day study curves, sleep vs productivity correlation charts, and
                burnout trajectories. Export full CSV spreadsheets with one click.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-slate-50 dark:bg-[#11192e]/40 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#25B8A5]">
              Workflow Protocol
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-[#172554] dark:text-white">
              How MindMeter AI Keeps You in the Zone
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="p-6 bg-white dark:bg-[#11192e] rounded-2xl border border-slate-200 dark:border-slate-800 relative">
              <div className="text-3xl font-extrabold text-[#7158E2]/20 font-mono mb-2">
                01.
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                Log Your Daily Habits
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Spend 60 seconds entering your study hours, sleep duration, pending
                assignments, breaks taken, and subjective stress level.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 bg-white dark:bg-[#11192e] rounded-2xl border border-slate-200 dark:border-slate-800 relative">
              <div className="text-3xl font-extrabold text-[#25B8A5]/20 font-mono mb-2">
                02.
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                Machine Learning Evaluation
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                The Scikit-learn Random Forest model computes your fatigue trajectory, identifies
                leading friction points, and categorizes your risk.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 bg-white dark:bg-[#11192e] rounded-2xl border border-slate-200 dark:border-slate-800 relative">
              <div className="text-3xl font-extrabold text-[#F5A623]/20 font-mono mb-2">
                03.
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                Execute Adaptive Timetables
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Get an intelligent, priority-ranked daily timetable with built-in restorative
                breaks, deadline milestones, and recovery recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section with Visual Proof */}
      <section id="benefits" className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-lg">
                <img
                  src="/src/assets/images/student_study_flow_1793700389256.jpg"
                  alt="Student studying with focus in modern campus library"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover max-h-[420px]"
                />
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7158E2]">
                Proven Student Impact
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#172554] dark:text-white">
                Maintain Academic Excellence Without Sacrificing Your Well-Being
              </h2>
              <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                College shouldn't be an endless cycle of all-nighters, brain fog, and panic.
                MindMeter AI provides structured guardrails so you perform at your best.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-md bg-[#25B8A5]/15 text-[#25B8A5] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      Proactive Cognitive Pacing
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                      Flags cognitive debt 3-5 days before exam week, so you can adjust your pace
                      before exhaustion takes hold.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-md bg-[#7158E2]/15 text-[#7158E2] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      Eliminate Decision Fatigue
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                      Never sit at your desk wondering what to study next. The planner automatically
                      prioritizes high-weight assignments.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-md bg-[#F5A623]/15 text-[#F5A623] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      Restorative Sleep Protection
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                      Encourages screen-free wind-downs and enforces sensible stop times so you wake up
                      with mental sharpness.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials (Sample Demonstration Data) */}
      <section className="py-20 bg-slate-50 dark:bg-[#11192e]/40 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Verified Student Experiences · Sample Demonstration Data
            </span>
            <h2 className="mt-2 text-3xl font-bold text-[#172554] dark:text-white">
              Trusted by Ambitious Undergraduates & Postgraduates
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="p-6 bg-white dark:bg-[#11192e] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
              <p className="text-sm text-slate-600 dark:text-slate-300 italic leading-relaxed">
                "During junior year algorithms, I was pulling two all-nighters every week. MindMeter
                predicted my high burnout score on Wednesday and forced me to take 50/10 Pomodoro
                blocks. My score recovered, and I scored an A on the midterm."
              </p>
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#7158E2]/20 text-[#7158E2] font-bold text-xs flex items-center justify-center">
                  AR
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Alex Rivera</h4>
                  <p className="text-[11px] text-slate-500">CS & Engineering, Stanford University</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="p-6 bg-white dark:bg-[#11192e] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
              <p className="text-sm text-slate-600 dark:text-slate-300 italic leading-relaxed">
                "The Adaptive Study Planner is a game-changer. When I recorded only 5 hours of sleep
                due to lab submissions, it automatically shifted my heavy organic chemistry sessions
                to the morning and freed up my evening for rest."
              </p>
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#25B8A5]/20 text-[#25B8A5] font-bold text-xs flex items-center justify-center">
                  MP
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Maya Patel</h4>
                  <p className="text-[11px] text-slate-500">Bioengineering, UC Berkeley</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="p-6 bg-white dark:bg-[#11192e] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
              <p className="text-sm text-slate-600 dark:text-slate-300 italic leading-relaxed">
                "Being able to see my burnout trajectory in an interactive simulator made me realize
                that taking 3 breaks per day doesn't slow me down—it actually boosted my task completion
                rate by 25%."
              </p>
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#F5A623]/20 text-[#F5A623] font-bold text-xs flex items-center justify-center">
                  JC
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Jordan Chen</h4>
                  <p className="text-[11px] text-slate-500">Data Science, MIT</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7158E2]">
              Got Questions?
            </span>
            <h2 className="mt-2 text-3xl font-bold text-[#172554] dark:text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white dark:bg-[#11192e] rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4"
                  >
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-500 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/80">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-gradient-to-r from-[#172554] via-[#7158E2] to-[#25B8A5] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to Take Control of Your Academic Journey?
          </h2>
          <p className="text-base text-purple-100 max-w-2xl mx-auto">
            Join thousands of university students using MindMeter AI to sustain high academic
            performance and protect their mental well-being.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onOpenAuth('register')}
              className="px-6 py-3.5 rounded-xl bg-white text-[#172554] hover:bg-slate-100 font-bold text-sm shadow-lg transition-transform hover:scale-105"
            >
              Create Free Student Account
            </button>
            <button
              onClick={onExploreDemo}
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-sm backdrop-blur-sm transition-colors"
            >
              Explore Live Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c1222] py-12 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-[#7158E2] text-white flex items-center justify-center font-bold text-xs">
              <Brain className="w-4 h-4" />
            </div>
            <span className="font-bold text-slate-800 dark:text-white text-sm">
              MindMeter AI
            </span>
            <span className="text-[11px] text-slate-400">· Study Smarter. Stay Balanced.</span>
          </div>

          <div className="flex items-center gap-6">
            <span>Machine Learning & Academic Health Project</span>
            <span aria-hidden="true">·</span>
            <span>College Project Demonstration</span>
            <span aria-hidden="true">·</span>
            <span>© 2026 MindMeter AI</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
