import React, { useState } from 'react';
import { User } from '../types';
import { INITIAL_USER } from '../data/sampleData';
import { X, Lock, Mail, User as UserIcon, Building, GraduationCap, Calendar, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode: 'login' | 'register';
  onLoginSuccess: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode,
  onLoginSuccess,
}) => {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>(initialMode);
  
  // Registration fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [department, setDepartment] = useState('Computer Science & Engineering');
  const [yearOfStudy, setYearOfStudy] = useState('3rd Year (Junior)');
  
  // Status states
  const [errorMessage, setErrorMessage] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage('Please fill in both your student email and password.');
      return;
    }

    // Authenticate (matches sample user or accepts registered user)
    const existingUser = localStorage.getItem('mindmeter_user');
    let loggedUser = INITIAL_USER;
    if (existingUser) {
      try {
        const parsed = JSON.parse(existingUser);
        if (parsed.email.toLowerCase() === email.toLowerCase()) {
          loggedUser = parsed;
        }
      } catch (err) {}
    } else {
      loggedUser = {
        ...INITIAL_USER,
        email,
      };
    }

    onLoginSuccess(loggedUser);
    onClose();
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !password || !collegeName) {
      setErrorMessage('All registration fields are required.');
      return;
    }

    const newUser: User = {
      id: `usr-${Date.now()}`,
      fullName,
      email,
      collegeName,
      department,
      yearOfStudy,
      createdAt: new Date().toISOString(),
      avatarUrl: '/src/assets/images/student_study_flow_1793700389256.jpg',
    };

    localStorage.setItem('mindmeter_user', JSON.stringify(newUser));
    onLoginSuccess(newUser);
    onClose();
  };

  const handleDemoLogin = () => {
    onLoginSuccess(INITIAL_USER);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white dark:bg-[#11192e] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7158E2] dark:text-[#a798f8] bg-[#F0EDFF] dark:bg-purple-950/60 px-2.5 py-1 rounded-md mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>MindMeter AI Authentication</span>
          </div>
          <h3 className="text-xl font-bold text-[#172554] dark:text-white">
            {mode === 'login'
              ? 'Welcome Back, Student'
              : mode === 'register'
              ? 'Create Student Account'
              : 'Reset Your Password'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {mode === 'login'
              ? 'Enter your credentials to access your productivity dashboard.'
              : mode === 'register'
              ? 'Register to monitor workload and predict academic burnout.'
              : 'Enter your registered email to receive a secure recovery link.'}
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-lg bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900/60 text-xs text-[#E76F75] flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Quick Demo Student Button */}
        {mode === 'login' && (
          <div className="mb-5 p-3 rounded-xl bg-gradient-to-r from-[#F0EDFF] to-teal-50 dark:from-purple-950/30 dark:to-teal-950/30 border border-purple-200/60 dark:border-purple-800/40">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200">
                Evaluation & Demonstration
              </span>
              <span className="text-[10px] font-mono text-[#7158E2] bg-white dark:bg-slate-900 px-1.5 py-0.5 rounded border border-purple-200 dark:border-purple-800">
                1-Click Access
              </span>
            </div>
            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full py-2 bg-white dark:bg-slate-800 hover:bg-purple-50 dark:hover:bg-slate-700/80 text-xs font-bold text-[#7158E2] dark:text-purple-300 rounded-lg border border-purple-300 dark:border-purple-700/60 transition-all flex items-center justify-center gap-2"
            >
              <span>Sign In as Demo Student (Alex Rivera)</span>
            </button>
          </div>
        )}

        {/* LOGIN FORM */}
        {mode === 'login' && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Student Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex.rivera@university.edu"
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7158E2]"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setMode('forgot')}
                  className="text-[11px] text-[#7158E2] hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7158E2]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 text-xs font-bold text-white bg-[#7158E2] hover:bg-[#5e44cf] rounded-lg shadow-sm shadow-[#7158E2]/30 transition-all mt-2"
            >
              Sign In to Dashboard
            </button>

            <div className="text-center pt-2 text-xs text-slate-500">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => setMode('register')}
                className="font-bold text-[#7158E2] hover:underline"
              >
                Register here
              </button>
            </div>
          </form>
        )}

        {/* REGISTRATION FORM */}
        {mode === 'register' && (
          <form onSubmit={handleRegister} className="space-y-3 max-h-[65vh] overflow-y-auto pr-1">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Full Name
              </label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Alex Rivera"
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7158E2]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                University Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@university.edu"
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7158E2]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                College / Institution Name
              </label>
              <div className="relative">
                <Building className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  value={collegeName}
                  onChange={(e) => setCollegeName(e.target.value)}
                  placeholder="e.g. Stanford University"
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7158E2]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Department
                </label>
                <input
                  type="text"
                  required
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  placeholder="e.g. CS & Eng"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7158E2]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Year of Study
                </label>
                <select
                  value={yearOfStudy}
                  onChange={(e) => setYearOfStudy(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7158E2]"
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

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create secure password"
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7158E2]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 text-xs font-bold text-white bg-[#7158E2] hover:bg-[#5e44cf] rounded-lg shadow-sm shadow-[#7158E2]/30 transition-all mt-3"
            >
              Complete Registration & Access Dashboard
            </button>

            <div className="text-center pt-2 text-xs text-slate-500">
              Already registered?{' '}
              <button
                type="button"
                onClick={() => setMode('login')}
                className="font-bold text-[#7158E2] hover:underline"
              >
                Sign In
              </button>
            </div>
          </form>
        )}

        {/* FORGOT PASSWORD FORM */}
        {mode === 'forgot' && (
          <div className="space-y-4">
            {forgotSent ? (
              <div className="p-4 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-900 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-[#25B8A5] mx-auto" />
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Reset Token Dispatched
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  A password reset link with a 15-minute token was generated for{' '}
                  <span className="font-mono font-bold text-[#25B8A5]">{email || 'your email'}</span>.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setForgotSent(false);
                    setMode('login');
                  }}
                  className="mt-3 px-4 py-1.5 text-xs font-bold text-white bg-[#25B8A5] hover:bg-[#1fa08f] rounded-lg"
                >
                  Return to Login
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!email) {
                    setErrorMessage('Please enter your student email address.');
                    return;
                  }
                  setForgotSent(true);
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Registered University Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@university.edu"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7158E2]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 text-xs font-bold text-white bg-[#7158E2] hover:bg-[#5e44cf] rounded-lg"
                >
                  Send Password Reset Instructions
                </button>

                <div className="text-center pt-2 text-xs text-slate-500">
                  Remembered your password?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className="font-bold text-[#7158E2] hover:underline"
                  >
                    Back to Sign In
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
