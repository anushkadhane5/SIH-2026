'use client';

import React from 'react';
import { Award, Zap, CheckCircle2 } from 'lucide-react';

interface Props {
  student: {
    name: string;
    apaarId: string;
    institution: string;
    degree: string;
    targetRole: string;
    streak: number;
    dailyGoalMins: number;
    completedMins: number;
  };
  overallReadiness: number;
}

export const IdentityCard: React.FC<Props> = ({ student, overallReadiness }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-wrap items-center justify-between gap-6">
      {/* Student Details */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-black text-slate-900">{student.name}</h1>
          <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold rounded-full flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> DigiLocker Verified
          </span>
        </div>

        <p className="text-xs font-bold text-slate-600">
          {student.degree} • <span className="text-slate-900">{student.institution}</span>
        </p>

        <p className="text-[11px] text-slate-400 font-mono">
          APAAR ID: <span className="font-bold text-slate-600">{student.apaarId}</span> • Target: <span className="font-bold text-blue-900">{student.targetRole}</span>
        </p>
      </div>

      {/* Streak and Employability Score */}
      <div className="flex items-center gap-4">
        <div className="bg-amber-50 border border-amber-200 px-4 py-2.5 rounded-xl text-center">
          <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">Learning Streak</span>
          <p className="text-lg font-black text-amber-600 flex items-center justify-center gap-1">
            <Zap className="w-4 h-4 fill-amber-500" /> {student.streak} Days
          </p>
        </div>

        <div className="bg-blue-900 text-white px-5 py-2.5 rounded-xl text-center">
          <span className="text-[10px] font-bold text-blue-200 uppercase tracking-wider block">Employability Score</span>
          <p className="text-2xl font-black text-emerald-400">{overallReadiness}%</p>
        </div>
      </div>
    </div>
  );
};