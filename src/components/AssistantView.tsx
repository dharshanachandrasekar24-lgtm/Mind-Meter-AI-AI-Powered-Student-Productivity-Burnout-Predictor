import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, User, StudyRecord, BurnoutPrediction, Assignment } from '../types';
import {
  Sparkles,
  Send,
  Bot,
  User as UserIcon,
  BookOpen,
  Clock,
  Flame,
  Lightbulb,
  CheckCircle2,
  Cpu,
} from 'lucide-react';

interface AssistantViewProps {
  user: User;
  records: StudyRecord[];
  latestPrediction: BurnoutPrediction;
  assignments: Assignment[];
  chatHistory: ChatMessage[];
  onAddChatMessage: (msg: ChatMessage) => void;
}

export const AssistantView: React.FC<AssistantViewProps> = ({
  user,
  records,
  latestPrediction,
  assignments,
  chatHistory,
  onAddChatMessage,
}) => {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, isLoading]);

  const quickPrompts = [
    'How can I balance my two upcoming assignments without burnout?',
    'Create a 2-hour Pomodoro plan for Computer Science',
    'I only slept 5.5 hours. How should I pace my study today?',
    'What is the Feynman Technique and how do I apply it?',
    'How do I avoid afternoon brain fog during deep study?',
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    onAddChatMessage(userMessage);
    if (!textToSend) setInputText('');
    setIsLoading(true);

    // Build context to pass to backend
    const pendingTitles = assignments
      .filter((a) => a.status !== 'Completed')
      .map((a) => `${a.title} (${a.subject}, due ${a.dueDate})`)
      .join('; ');

    const studentContext = `Student: ${user.fullName}, ${user.department}, ${user.yearOfStudy}.
Today's Study Hours: ${records[records.length - 1]?.studyHours || 0} hrs.
Last Night Sleep: ${records[records.length - 1]?.sleepDuration || 7} hrs.
Estimated Burnout Score: ${latestPrediction.riskScore}/100 (${latestPrediction.riskCategory}).
Pending Assignments: ${pendingTitles || 'None'}.`;

    try {
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: text,
          studentContext,
        }),
      });

      if (!res.ok) {
        throw new Error('API server returned error');
      }

      const data = await res.json();
      const assistantMessage: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        text: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isAiGenerated: true,
        contextSummary: data.source || 'MindMeter Academic Engine',
      };
      onAddChatMessage(assistantMessage);
    } catch (err: any) {
      // Graceful fallback if network drops
      const fallbackMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        text: `### Academic Recommendation\n\nBased on your current status (${latestPrediction.riskCategory}, ${latestPrediction.riskScore}/100 score):\n\n* **Primary Focus**: Dedicate your next 60 minutes strictly to ${assignments[0]?.title || 'your highest-priority assignment'}.\n* **Recovery Interval**: Step away for 10 minutes afterwards.\n* **Rest Protection**: Maintain at least 7.5 hours of sleep to ensure cognitive retention.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isAiGenerated: false,
        contextSummary: 'MindMeter Offline Academic Heuristic',
      };
      onAddChatMessage(fallbackMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-8.5rem)] flex flex-col bg-white dark:bg-[#11192e] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      {/* Assistant Header & Context Pill */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 bg-slate-50/50 dark:bg-slate-800/40 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#172554] via-[#7158E2] to-[#25B8A5] text-white flex items-center justify-center shadow-sm">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                MindMeter AI Study Assistant
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-50 dark:bg-purple-950/60 text-[#7158E2] border border-purple-200 dark:border-purple-800">
                Gemini 3.8 Flash
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Context-aware academic workload advisor & cognitive pacing coach
            </p>
          </div>
        </div>

        {/* Live Student Context Badge */}
        <div className="hidden md:flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800">
          <span className="w-2 h-2 rounded-full bg-[#25B8A5]" />
          <span>Active Context:</span>
          <span className="font-semibold text-slate-700 dark:text-slate-300">
            {latestPrediction.riskCategory} ({latestPrediction.riskScore}/100)
          </span>
          <span aria-hidden="true">·</span>
          <span>{assignments.filter((a) => a.status !== 'Completed').length} Pending</span>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
        {chatHistory.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-2xl ${isUser ? 'ml-auto flex-row-reverse' : ''}`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                  isUser
                    ? 'bg-[#172554] text-white'
                    : 'bg-[#F0EDFF] text-[#7158E2] dark:bg-purple-950 dark:text-purple-300'
                }`}
              >
                {isUser ? user.fullName.charAt(0) : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Content */}
              <div
                className={`p-4 rounded-2xl text-xs leading-relaxed space-y-2 shadow-sm ${
                  isUser
                    ? 'bg-[#7158E2] text-white rounded-tr-none'
                    : 'bg-slate-50 dark:bg-slate-800/80 text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-slate-700/80 rounded-tl-none'
                }`}
              >
                <div className="whitespace-pre-wrap font-sans">{msg.text}</div>
                <div
                  className={`text-[10px] flex items-center justify-between gap-3 pt-1 border-t ${
                    isUser
                      ? 'border-white/20 text-purple-200'
                      : 'border-slate-200/60 dark:border-slate-700/60 text-slate-400'
                  }`}
                >
                  <span>{msg.timestamp}</span>
                  {msg.contextSummary && (
                    <span className="font-mono text-[9px]">{msg.contextSummary}</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex gap-3 max-w-2xl">
            <div className="w-8 h-8 rounded-xl bg-[#F0EDFF] text-[#7158E2] dark:bg-purple-950 dark:text-purple-300 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 text-xs text-slate-500 rounded-tl-none flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7158E2] animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#7158E2] animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#7158E2] animate-bounce [animation-delay:0.4s]" />
              <span className="ml-1 text-[11px]">Synthesizing academic schedule advice...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompt Chips */}
      <div className="p-2 sm:px-4 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-200 dark:border-slate-800 overflow-x-auto shrink-0 flex items-center gap-2 no-scrollbar">
        <span className="text-[10px] uppercase font-bold text-slate-400 whitespace-nowrap pl-1">
          Suggestions:
        </span>
        {quickPrompts.map((prompt, i) => (
          <button
            key={i}
            onClick={() => handleSendMessage(prompt)}
            disabled={isLoading}
            className="text-[11px] whitespace-nowrap shrink-0 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-[#7158E2] hover:border-[#7158E2]/50 transition-colors"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <div className="p-3 sm:p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#11192e] shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask about study schedules, exam triage, or Pomodoro pacing..."
            className="flex-1 px-4 py-2.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7158E2]"
            disabled={isLoading}
          />

          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="px-4 py-2.5 rounded-xl bg-[#7158E2] hover:bg-[#5e44cf] disabled:opacity-50 text-white font-bold text-xs shadow-sm shadow-[#7158E2]/25 flex items-center gap-1.5 transition-all"
          >
            <span>Send</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
