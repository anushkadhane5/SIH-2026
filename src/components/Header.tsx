'use client';

import React from 'react';
import { Landmark, Users, Building2, School } from 'lucide-react';

interface HeaderProps {
  activeRole: 'student' | 'recruiter' | 'faculty';
  setActiveRole: (role: 'student' | 'recruiter' | 'faculty') => void;
}

export const Header: React.FC<HeaderProps> = ({ activeRole, setActiveRole }) => {
  return (
    <header className="bg-white border-b border-slate-300 px-6 py-3">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="border-r border-slate-300 pr-3">
            <Landmark className="w-8 h-8 text-slate-800" />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider font-bold text-slate-500">
              Ministry of Skill Development & Entrepreneurship
            </div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              SkillBridge Digital Ecosystem{' '}
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-300 font-bold">
                Government Verified
              </span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg border border-slate-300 text-xs font-semibold">
          <button 
            onClick={() => setActiveRole('student')}
            className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition ${activeRole === 'student' ? 'bg-blue-900 text-white shadow-sm' : 'text-slate-700 hover:bg-slate-200'}`}
          >
            <Users className="w-3.5 h-3.5" /> Student / Apprentice
          </button>
          <button 
            onClick={() => setActiveRole('recruiter')}
            className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition ${activeRole === 'recruiter' ? 'bg-blue-900 text-white shadow-sm' : 'text-slate-700 hover:bg-slate-200'}`}
          >
            <Building2 className="w-3.5 h-3.5" /> Industry / Employer
          </button>
          <button 
            onClick={() => setActiveRole('faculty')}
            className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition ${activeRole === 'faculty' ? 'bg-blue-900 text-white shadow-sm' : 'text-slate-700 hover:bg-slate-200'}`}
          >
            <School className="w-3.5 h-3.5" /> Academic Institution
          </button>
        </div>
      </div>
    </header>
  );
};