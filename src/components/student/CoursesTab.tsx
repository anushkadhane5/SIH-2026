'use client';

import React, { useState } from 'react';
import { BookOpen, Clock, Star, PlayCircle, CheckCircle2, Award, Sparkles, Filter } from 'lucide-react';
import { RecommendedCourse, DomainRole } from '../../types/domain';

const COURSES_DATA: RecommendedCourse[] = [
  {
    id: 'c1',
    title: 'Full-Stack Modern React & Next.js Architecture',
    provider: 'SkillBridge Tech Academy',
    domain: 'tech',
    duration: '18 hours • 42 lessons',
    rating: 4.9,
    studentsEnrolled: '14,250',
    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop',
    skillsTaught: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    progressPercent: 65,
    isEnrolled: true,
  },
  {
    id: 'c2',
    title: 'Data Structures & System Design for Tier-1 Product Companies',
    provider: 'NPTEL / AICTE Partner',
    domain: 'tech',
    duration: '24 hours • 56 lessons',
    rating: 4.8,
    studentsEnrolled: '28,100',
    imageUrl: 'https://images.unsplash.com/photo-1516116211223-4c7141872810?q=80&w=800&auto=format&fit=crop',
    skillsTaught: ['Algorithms', 'System Design', 'Graph Theory'],
    progressPercent: 0,
    isEnrolled: false,
  },
  {
    id: 'c3',
    title: 'Emergency Medical Triage & Clinical Protocols',
    provider: 'AIIMS Faculty Series',
    domain: 'medical',
    duration: '15 hours • 30 lessons',
    rating: 4.9,
    studentsEnrolled: '8,400',
    imageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=800&auto=format&fit=crop',
    skillsTaught: ['ECG Analysis', 'Clinical Triage', 'ACLS Protocols'],
    progressPercent: 40,
    isEnrolled: true,
  },
  {
    id: 'c4',
    title: 'GST Compliance, Schedule III & Audit Reconciliation',
    provider: 'ICAI Approved Learning Module',
    domain: 'finance',
    duration: '12 hours • 28 lessons',
    rating: 4.7,
    studentsEnrolled: '11,900',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800&auto=format&fit=crop',
    skillsTaught: ['GST Audit', 'IndAS', 'Financial Statements'],
    progressPercent: 0,
    isEnrolled: false,
  },
];

interface Props {
  userDomain?: DomainRole;
}

export const CoursesTab: React.FC<Props> = ({ userDomain = 'tech' }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'enrolled'>('all');

  const filteredCourses = COURSES_DATA.filter(course => {
    const matchesDomain = course.domain === userDomain;
    if (activeFilter === 'enrolled') return matchesDomain && course.isEnrolled;
    return matchesDomain;
  });

  return (
    <div className="space-y-6">
      {/* Header & Filter */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <span className="text-[10px] font-bold text-blue-900 uppercase tracking-wider">Curated Learning Paths</span>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-900" /> SkillBridge Course Hub
          </h2>
          <p className="text-xs text-slate-500">Courses tailored specifically to fill your target role skill gaps.</p>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-xl gap-1">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeFilter === 'all' ? 'bg-white text-blue-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Recommended Courses
          </button>
          <button
            onClick={() => setActiveFilter('enrolled')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeFilter === 'enrolled' ? 'bg-white text-blue-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            My In-Progress Courses
          </button>
        </div>
      </div>

      {/* Udemy / Coursera Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {filteredCourses.map(course => (
          <div key={course.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col">
            {/* Course Image Header */}
            <div className="relative h-44 w-full bg-slate-800">
              <img
                src={course.imageUrl}
                alt={course.title}
                className="w-full h-full object-cover opacity-90"
              />
              <span className="absolute top-3 left-3 px-2.5 py-1 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold rounded-lg">
                {course.provider}
              </span>
              {course.isEnrolled && (
                <span className="absolute top-3 right-3 px-2.5 py-1 bg-emerald-600 text-white text-[10px] font-bold rounded-lg flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Enrolled
                </span>
              )}
            </div>

            {/* Course Body */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h3 className="font-bold text-base text-slate-900 leading-snug hover:text-blue-900 cursor-pointer">
                  {course.title}
                </h3>

                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1 font-semibold text-amber-600">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {course.rating}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" /> {course.duration}
                  </span>
                  <span>{course.studentsEnrolled} students</span>
                </div>

                {/* Skills Badges */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {course.skillsTaught.map((skill, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-blue-50 text-blue-900 text-[10px] font-semibold rounded border border-blue-100">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Progress Bar (If Enrolled) */}
              {course.isEnrolled && course.progressPercent !== undefined && (
                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  <div className="flex justify-between text-xs font-semibold text-slate-700">
                    <span>Course Progress</span>
                    <span className="text-blue-900 font-bold">{course.progressPercent}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-900 h-full rounded-full transition-all duration-500"
                      style={{ width: `${course.progressPercent}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Action Button */}
              <div className="pt-2">
                {course.isEnrolled ? (
                  <button className="w-full py-2.5 bg-blue-900 hover:bg-blue-950 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all">
                    <PlayCircle className="w-4 h-4" /> Continue Learning
                  </button>
                ) : (
                  <button className="w-full py-2.5 bg-slate-900 hover:bg-black text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all">
                    <Sparkles className="w-4 h-4 text-amber-300" /> Enroll to Fill Skill Gap
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};