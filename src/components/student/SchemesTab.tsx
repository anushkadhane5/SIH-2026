'use client';

import React from 'react';

const SCHEMES = [
  { id: 's1', title: 'PM National Apprenticeship Promotion Scheme (NAPS 2.0)', subsidy: 'Up to ₹1,500/month stipend subsidy', category: 'Government Subsidy' },
  { id: 's2', title: 'FutureSkills PRIME - Cloud & AI Certification', subsidy: '100% Fee Reimbursed on Verification', category: 'Ministry of Electronics & IT' },
];

export const SchemesTab: React.FC = () => {
  return (
    <div className="bg-white border border-slate-300 rounded-xl p-6 shadow-sm space-y-4">
      <h3 className="font-bold text-base text-slate-900">National Skill Subsidies & Schemes</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SCHEMES.map(s => (
          <div key={s.id} className="bg-slate-50 p-5 rounded-lg border border-slate-300 space-y-2">
            <span className="text-[10px] font-bold text-blue-900 uppercase">{s.category}</span>
            <h4 className="font-bold text-sm text-slate-900">{s.title}</h4>
            <p className="text-xs text-slate-600">Benefit: <span className="font-bold text-emerald-700">{s.subsidy}</span></p>
          </div>
        ))}
      </div>
    </div>
  );
};