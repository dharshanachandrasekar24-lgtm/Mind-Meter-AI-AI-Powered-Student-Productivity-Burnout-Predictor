export type RiskCategory = 'Low Risk' | 'Moderate Risk' | 'High Risk';

export interface User {
  id: string;
  fullName: string;
  email: string;
  collegeName: string;
  department: string;
  yearOfStudy: string;
  createdAt: string;
  avatarUrl?: string;
}

export interface StudyRecord {
  id: string;
  userId: string;
  date: string; // YYYY-MM-DD
  studyHours: number;
  subjects: string[];
  sleepDuration: number;
  breakFrequency: number;
  screenTime: number;
  assignmentsPending: number;
  tasksCompleted: number;
  productivityLevel: number; // 1-10
  stressLevel: number; // 1-10
  notes?: string;
}

export interface BurnoutPrediction {
  id: string;
  userId: string;
  calculatedAt: string;
  studyHours: number;
  sleepDuration: number;
  pendingAssignments: number;
  breakFrequency: number;
  screenTime: number;
  productivityLevel: number;
  stressLevel: number;
  riskScore: number; // 0-100
  riskCategory: RiskCategory;
  contributingFactors: {
    factor: string;
    impact: 'High' | 'Medium' | 'Low';
    percentage: number;
    explanation: string;
  }[];
  recommendations: string[];
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  credits: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  color: string;
}

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  estimatedHours: number;
  status: 'Pending' | 'In Progress' | 'Completed';
  priority: 'High' | 'Medium' | 'Low';
}

export interface StudyScheduleBlock {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  subject: string;
  taskTitle: string;
  type: 'Study' | 'Break' | 'Review' | 'Assignment';
  priority: 'High' | 'Medium' | 'Low';
  completed: boolean;
}

export interface HabitItem {
  id: string;
  title: string;
  category: 'sleep' | 'study' | 'breaks' | 'screen' | 'tasks' | 'stress';
  goalDescription: string;
  targetValue: number;
  currentStreak: number;
  bestStreak: number;
  completedToday: boolean;
  weeklyHistory: boolean[]; // Last 7 days
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  isAiGenerated?: boolean;
  contextSummary?: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'warning' | 'info' | 'success' | 'alert';
  timestamp: string;
  read: boolean;
  actionView?: string;
}
