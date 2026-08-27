'use client';

import React from 'react';
import { ShieldCheck, Flame } from 'lucide-react';

interface StudentProps {
  name: string;
  apaarId: string;
  institution: string;
  degree: string;
  targetRole: string;
  streak: number;
  dailyGoalMins: number;
  completedMins: number;
}

export const IdentityCard: React.FC<{ student: StudentProps; overallReadiness: number }> = ({ student, overallReadiness }) => {
  return (
    <div className="bg-white border border-slate-300 rounded-xl p-6 shadow-sm flex flex-wrap justify-between items-center gap-6">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-black text-slate-900">{student.name}</h2>
          <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-300 px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> DigiLocker Verified
          </span>
        </div>
        <p className="text-xs text-slate-600 font-medium">
          {student.degree} • <span className="text-slate-900 font-semibold">{student.institution}</span>
        </p>
        <div className="text-[11px] text-slate-500 font-mono pt-1">
          APAAR ID: <span className="font-bold text-slate-800">{student.apaarId}</span> • Target: <span className="text-blue-900 font-bold">{student.targetRole}</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="bg-slate-50 border border-slate-300 px-4 py-2.5 rounded-lg text-center min-w-[100px]">
          <span className="text-[10px] font-bold uppercase text-slate-500 block">Learning Streak</span>
          <span className="text-amber-600 font-black text-sm flex items-center justify-center gap-1">
            <Flame className="w-4 h-4 fill-amber-500" /> {student.streak} Days
          </span>
        </div>

        <div className="bg-slate-50 border border-slate-300 px-4 py-2.5 rounded-lg text-center min-w-[110px]">
          <span className="text-[10px] font-bold uppercase text-slate-500 block">Daily Goal</span>
          <span className="text-blue-900 font-black text-sm">
            {student.completedMins} / {student.dailyGoalMins} Mins
          </span>
        </div>

        <div className="bg-blue-900 text-white px-5 py-2.5 rounded-lg text-center">
          <span className="text-[10px] font-bold uppercase opacity-80 block">Employability Score</span>
          <span className="font-black text-base text-emerald-400">{overallReadiness}%</span>
        </div>
      </div>
    </div>
  );
};