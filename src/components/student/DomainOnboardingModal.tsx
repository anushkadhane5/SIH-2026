'use client';

import React from 'react';
import { Code2, Stethoscope, FileSpreadsheet, Scale, Check, Sparkles } from 'lucide-react';
import { StudentDomain } from '../../types/student';

interface Props {
  isOpen: boolean;
  currentDomain: StudentDomain;
  onSelectDomain: (domain: StudentDomain) => void;
  onClose: () => void;
}

export const DomainOnboardingModal: React.FC<Props> = ({ isOpen, currentDomain, onSelectDomain, onClose }) => {
  if (!isOpen) return null;

  const domains = [
    {
      id: 'tech' as StudentDomain,
      title: 'Tech & Computer Science',
      description: 'Software Engineering, Web Dev, Data Science, DevOps',
      icon: Code2,
      color: 'bg-blue-50 text-blue-900 border-blue-200',
      activeColor: 'bg-blue-900 text-white border-blue-900',
    },
    {
      id: 'medical' as StudentDomain,
      title: 'Medical & Healthcare',
      description: 'MBBS, Clinical Triage, Nursing, Pharmacology, Diagnostics',
      icon: Stethoscope,
      color: 'bg-emerald-50 text-emerald-900 border-emerald-200',
      activeColor: 'bg-emerald-800 text-white border-emerald-800',
    },
    {
      id: 'finance' as StudentDomain,
      title: 'Finance, CA & Commerce',
      description: 'Chartered Accountancy, GST Compliance, Tax Audit, Banking',
      icon: FileSpreadsheet,
      color: 'bg-amber-50 text-amber-900 border-amber-200',
      activeColor: 'bg-amber-800 text-white border-amber-800',
    },
    {
      id: 'law' as StudentDomain,
      title: 'Law & Legal Studies',
      description: 'Corporate Law, Contract Clause Drafting, Statutory Compliance',
      icon: Scale,
      color: 'bg-purple-50 text-purple-900 border-purple-200',
      activeColor: 'bg-purple-900 text-white border-purple-900',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xl max-w-2xl w-full space-y-6">
        {/* Modal Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-900 text-xs font-bold rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Choose Your Career Domain
          </div>
          <h2 className="text-2xl font-black text-slate-900">Select Your Profession / Stream</h2>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            SkillBridge will automatically customize your Skill Passport, AI verification tests, courses, and job matching for your selected stream.
          </p>
        </div>

        {/* Domain Cards Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {domains.map((item) => {
            const Icon = item.icon;
            const isSelected = currentDomain === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectDomain(item.id);
                  onClose();
                }}
                className={`p-5 rounded-xl border-2 text-left transition-all relative flex flex-col justify-between space-y-3 ${
                  isSelected ? item.activeColor : `${item.color} hover:shadow-md`
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className={`p-2.5 rounded-lg ${isSelected ? 'bg-white/20' : 'bg-white'}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  {isSelected && (
                    <span className="p-1 bg-white text-slate-900 rounded-full">
                      <Check className="w-4 h-4 font-bold" />
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="font-bold text-base">{item.title}</h3>
                  <p className={`text-xs mt-1 leading-relaxed ${isSelected ? 'text-slate-100' : 'text-slate-600'}`}>
                    {item.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl"
          >
            Continue with Selected Domain
          </button>
        </div>
      </div>
    </div>
  );
};