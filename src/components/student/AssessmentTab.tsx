'use client';

import React, { useState } from 'react';
import { Target, CheckCircle2 } from 'lucide-react';

interface AssessmentTabProps {
  onQuizComplete: (newScore: number) => void;
  onNavigateToPassport: () => void;
}

export const AssessmentTab: React.FC<AssessmentTabProps> = ({ onQuizComplete, onNavigateToPassport }) => {
  const [quizState, setQuizState] = useState<'idle' | 'taking' | 'submitted'>('idle');
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);

  const handleQuizSubmit = () => {
    if (selectedOpt === null) return;
    const score = selectedOpt === 1 ? 88 : 52;
    onQuizComplete(score);
    setQuizState('submitted');
  };

  return (
    <div className="bg-white border border-slate-300 rounded-xl p-6 shadow-sm max-w-2xl mx-auto space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <span className="text-[10px] uppercase font-bold text-blue-900 tracking-wider">Official Assessment Protocol</span>
        <h3 className="font-bold text-lg text-slate-900">Relational Database & Enterprise SQL Certification Test</h3>
      </div>

      {quizState === 'idle' && (
        <div className="space-y-4">
          <p className="text-xs text-slate-600 leading-relaxed">
            This automated assessment is proctored by SkillBridge NCVET engine. Scoring &gt;70% will instantly upgrade your status to 'ASSESSMENT_VERIFIED' on your National Skill Record.
          </p>
          <button onClick={() => setQuizState('taking')} className="bg-blue-900 text-white font-bold text-xs px-6 py-3 rounded-md">
            Begin Proctored Assessment →
          </button>
        </div>
      )}

      {quizState === 'taking' && (
        <div className="bg-slate-50 p-5 rounded-lg border border-slate-300 space-y-4">
          <span className="text-[10px] text-blue-900 font-bold uppercase">Question 1 of 1</span>
          <p className="text-sm font-semibold text-slate-900">Which SQL clause is strictly used to filter records calculated by the GROUP BY aggregation?</p>
          <div className="space-y-2 text-xs">
            {['WHERE', 'HAVING', 'ORDER BY', 'FILTER'].map((opt, idx) => (
              <label key={opt} onClick={() => setSelectedOpt(idx)} className={`flex items-center gap-3 p-3 rounded-md border cursor-pointer ${selectedOpt === idx ? 'bg-blue-50 border-blue-900 font-bold text-blue-900' : 'bg-white border-slate-300'}`}>
                <input type="radio" checked={selectedOpt === idx} onChange={() => {}} />
                <span>{opt}</span>
              </label>
            ))}
          </div>
          <button onClick={handleQuizSubmit} disabled={selectedOpt === null} className="w-full bg-blue-900 disabled:bg-slate-400 text-white font-bold text-xs py-3 rounded-md">
            Submit Test & Authenticate Badge
          </button>
        </div>
      )}

      {quizState === 'submitted' && (
        <div className="bg-emerald-50 border border-emerald-300 p-6 rounded-lg text-center space-y-3">
          <CheckCircle2 className="w-10 h-10 text-emerald-700 mx-auto" />
          <h4 className="font-bold text-base text-emerald-900">Assessment Successfully Verified!</h4>
          <button onClick={onNavigateToPassport} className="bg-blue-900 text-white text-xs font-bold px-4 py-2 rounded-md">
            View Updated Skill Passport →
          </button>
        </div>
      )}
    </div>
  );
};