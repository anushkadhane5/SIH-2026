'use client';

import React from 'react';
import { ShieldCheck, Download, TrendingUp } from 'lucide-react';

interface Skill {
  id: string;
  name: string;
  category: string;
  score: number;
  required: number;
  status: string;
  issuer: string;
}

interface SkillPassportProps {
  skills: Skill[];
  onNavigateToTest: () => void;
}

export const SkillPassportTab: React.FC<SkillPassportProps> = ({ skills, onNavigateToTest }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-300 rounded-b-xl p-6 shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-900" /> Authenticated Skill Competency Matrix
          </h3>
          <button className="text-xs bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 px-3 py-1.5 rounded-md font-semibold flex items-center gap-1">
            <Download className="w-3.5 h-3.5" /> Download Official Transcript
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map(s => (
            <div key={s.id} className="bg-slate-50 p-4 rounded-lg border border-slate-300 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{s.name}</h4>
                  <span className="text-[10px] text-slate-500">{s.issuer}</span>
                </div>
                <span className={`text-[9px] px-2 py-0.5 rounded font-bold border ${
                  s.status.includes('VERIFIED') ? 'bg-emerald-50 text-emerald-700 border-emerald-300' : 'bg-amber-50 text-amber-700 border-amber-300'
                }`}>
                  {s.status.replace('_', ' ')}
                </span>
              </div>

              <div className="flex justify-between items-baseline">
                <span className="text-2xl font-black text-slate-900">{s.score}%</span>
                <span className="text-xs text-slate-500">Benchmark: {s.required}%</span>
              </div>

              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${s.score >= s.required ? 'bg-emerald-600' : 'bg-amber-500'}`} 
                  style={{ width: `${s.score}%` }} 
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-slate-300 rounded-xl p-6 shadow-sm space-y-3">
        <h3 className="font-bold text-base text-amber-700 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" /> Critical Skill Deficits for SDE-1 Role
        </h3>
        {skills.filter(s => s.score < s.required).map(gap => (
          <div key={gap.id} className="bg-amber-50/50 border border-amber-200 p-4 rounded-lg flex justify-between items-center">
            <div>
              <h4 className="font-bold text-sm text-slate-900">{gap.name} (Deficit: {gap.required - gap.score}%)</h4>
              <p className="text-xs text-slate-600">Current Score: {gap.score}% • Required Benchmark: {gap.required}%</p>
            </div>
            <button 
              onClick={onNavigateToTest}
              className="bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold px-4 py-2 rounded-md"
            >
              Take Verification Assessment →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};