'use client';

import React, { useState } from 'react';

const COURSES = [
  { id: 'c1', title: 'National SQL & Enterprise Relational DB Masterclass', provider: 'IIT Madras / NPTEL', duration: '8 Weeks', credits: 3, gapSkill: 'Relational Databases (SQL)' },
  { id: 'c2', title: 'Scalable System Design & Microservices Architecture', provider: 'C-DAC & Skill India', duration: '6 Weeks', credits: 2, gapSkill: 'System Design & Architecture' },
  { id: 'c3', title: 'AWS Cloud Practitioner Certification Readiness', provider: 'AWS Academy India', duration: '4 Weeks', credits: 2, gapSkill: 'Cloud Computing (AWS/GCP)' },
];

export const CoursesTab: React.FC = () => {
  const [enrolled, setEnrolled] = useState<string[]>([]);

  return (
    <div className="bg-white border border-slate-300 rounded-xl p-6 shadow-sm space-y-4">
      <h3 className="font-bold text-base text-slate-900">NPTEL & AICTE Approved Skill Bridge Courses</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {COURSES.map(course => {
          const isEnrolled = enrolled.includes(course.id);
          return (
            <div key={course.id} className="bg-slate-50 p-5 rounded-lg border border-slate-300 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[9px] bg-blue-50 text-blue-900 border border-blue-200 px-2 py-0.5 rounded font-bold uppercase">
                  Target: {course.gapSkill}
                </span>
                <h4 className="font-bold text-sm text-slate-900">{course.title}</h4>
                <p className="text-xs text-slate-600">{course.provider} • {course.duration}</p>
              </div>
              <button 
                onClick={() => setEnrolled(prev => isEnrolled ? prev : [...prev, course.id])}
                className={`w-full py-2 rounded-md text-xs font-bold ${isEnrolled ? 'bg-emerald-50 text-emerald-800 border border-emerald-400' : 'bg-blue-900 text-white'}`}
              >
                {isEnrolled ? '✓ Enrolled' : 'Enroll via NPTEL'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};