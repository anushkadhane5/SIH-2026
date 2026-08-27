'use client';

import React, { useState } from 'react';
import { LandingPage } from '../components/LandingPage';
import { AuthModal, UserRole } from '../components/AuthModal';
import { Header } from '../components/Header';
import { IdentityCard } from '../components/IdentityCard';
import { SkillPassportTab } from '../components/student/SkillPassportTab';
import { ResumeOptimizerTab } from '../components/student/ResumeOptimizerTab';
import { AssessmentTab } from '../components/student/AssessmentTab';
import { CoursesTab } from '../components/student/CoursesTab';
import { OpportunitiesTab } from '../components/student/OpportunitiesTab';
import { SchemesTab } from '../components/student/SchemesTab';
import { Shield, FileText, Target, BookOpen, Briefcase, Award, Building2, Users, Search, CheckCircle2 } from 'lucide-react';

const INITIAL_SKILLS = [
  { id: '1', name: 'Data Structures & Algorithms', category: 'Core CS', score: 72, required: 80, status: 'ASSESSMENT_VERIFIED', issuer: 'NPTEL / AICTE' },
  { id: '2', name: 'React.js & Web Frameworks', category: 'Frontend', score: 85, required: 75, status: 'PROJECT_VERIFIED', issuer: 'GitHub Evidence' },
  { id: '3', name: 'Relational Databases (SQL)', category: 'Backend', score: 45, required: 75, status: 'NEEDS_VERIFICATION', issuer: 'Self Declared' },
];

export default function App() {
  // Auth state
  const [user, setUser] = useState<{ name: string; role: UserRole; email: string } | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authRoleHint, setAuthRoleHint] = useState<UserRole>('student');

  // Navigation state inside student dashboard
  const [studentNav, setStudentNav] = useState<'passport' | 'resume' | 'test' | 'courses' | 'opportunities' | 'schemes'>('passport');
  const [skills, setSkills] = useState(INITIAL_SKILLS);

  const handleOpenAuth = (role: UserRole = 'student') => {
    setAuthRoleHint(role);
    setIsAuthOpen(true);
  };

  // If user not authenticated, render landing page
  if (!user) {
    return (
      <>
        <LandingPage onOpenAuth={handleOpenAuth} />
        <AuthModal
          isOpen={isAuthOpen}
          initialRole={authRoleHint}
          onClose={() => setIsAuthOpen(false)}
          onSuccess={(userData) => {
            setUser(userData);
            setIsAuthOpen(false);
          }}
        />
      </>
    );
  }

  const overallReadiness = Math.round(skills.reduce((acc, s) => acc + s.score, 0) / skills.length);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      {/* Dynamic Top Bar */}
      <Header
        activeRole={user.role}
        setActiveRole={(newRole) => setUser({ ...user, role: newRole })}
      />

      {/* Role-Based Dynamic Dashboard Views */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-6">

        {/* 1. STUDENT DASHBOARD */}
        {user.role === 'student' && (
          <>
            <IdentityCard
              student={{
                name: user.name,
                apaarId: 'APAAR-9876-5432-1012',
                institution: 'AIIT Delhi',
                degree: 'B.Tech CSE',
                targetRole: 'SDE-1',
                streak: 12,
                dailyGoalMins: 45,
                completedMins: 30,
              }}
              overallReadiness={overallReadiness}
            />

            <div className="flex border-b border-slate-300 text-xs font-bold gap-6 bg-white px-4 rounded-t-xl overflow-x-auto">
              {[
                { id: 'passport', label: `Skill Passport (${skills.length})`, icon: Shield },
                { id: 'resume', label: 'AI Resume Upload', icon: FileText },
                { id: 'test', label: 'Assessment', icon: Target },
                { id: 'courses', label: 'Courses', icon: BookOpen },
                { id: 'opportunities', label: 'Opportunities', icon: Briefcase },
                { id: 'schemes', label: 'Schemes', icon: Award },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setStudentNav(tab.id as any)}
                  className={`py-3.5 flex items-center gap-2 border-b-2 whitespace-nowrap ${
                    studentNav === tab.id ? 'border-blue-900 text-blue-900' : 'border-transparent text-slate-600'
                  }`}
                >
                  <tab.icon className="w-4 h-4" /> {tab.label}
                </button>
              ))}
            </div>

            {studentNav === 'passport' && <SkillPassportTab skills={skills} onNavigateToTest={() => setStudentNav('test')} />}
            {studentNav === 'resume' && <ResumeOptimizerTab onApplyAIFix={(newSkills) => setSkills(p => [...p, ...newSkills])} />}
            {studentNav === 'test' && <AssessmentTab onQuizComplete={(score) => setSkills(p => p.map(s => s.name.includes('SQL') ? {...s, score, status: 'ASSESSMENT_VERIFIED'} : s))} onNavigateToPassport={() => setStudentNav('passport')} />}
            {studentNav === 'courses' && <CoursesTab />}
            {studentNav === 'opportunities' && <OpportunitiesTab />}
            {studentNav === 'schemes' && <SchemesTab />}
          </>
        )}

        {/* 2. RECRUITER / INDUSTRY DASHBOARD */}
        {user.role === 'recruiter' && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-300 p-6 rounded-xl space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-[10px] font-bold text-indigo-900 uppercase tracking-wider">Enterprise Access</span>
                  <h2 className="text-xl font-bold text-slate-900">Industry Candidate Talent Pool</h2>
                </div>
                <button className="bg-indigo-900 text-white text-xs font-bold px-4 py-2 rounded-lg">
                  + Post NAPS Apprenticeship Job
                </button>
              </div>

              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Search by verified skills (e.g. React.js, Python, SQL)..."
                    className="w-full pl-9 pr-4 py-2 text-xs border border-slate-300 rounded-lg"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-300 rounded-xl p-6 space-y-4">
              <h3 className="font-bold text-sm text-slate-900">Verified Candidates (APAAR Synchronized)</h3>
              <div className="space-y-3">
                {[
                  { name: 'Aarav Sharma', college: 'AIIT Delhi', readiness: 67, skills: ['React.js', 'Algorithms', 'SQL'] },
                  { name: 'Priya Patel', college: 'IIT Bombay', readiness: 92, skills: ['System Design', 'AWS', 'Python'] },
                  { name: 'Rohan Gupta', college: 'NIT Surathkal', readiness: 84, skills: ['Node.js', 'Docker', 'PostgreSQL'] },
                ].map((c, i) => (
                  <div key={i} className="bg-slate-50 border border-slate-200 p-4 rounded-lg flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">{c.name}</h4>
                      <p className="text-xs text-slate-500">{c.college} • Skills: {c.skills.join(', ')}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <span className="text-xs font-bold text-emerald-700">{c.readiness}% Match</span>
                        <p className="text-[10px] text-slate-400">NCVET Score</p>
                      </div>
                      <button className="bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-md">
                        View Passport
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 3. FACULTY / UNIVERSITY DASHBOARD */}
        {user.role === 'faculty' && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-300 p-6 rounded-xl space-y-2">
              <span className="text-[10px] font-bold text-emerald-900 uppercase">Institutional Dashboard</span>
              <h2 className="text-xl font-bold text-slate-900">Academic Cohort Skill Readiness</h2>
              <p className="text-xs text-slate-500">Monitor NPTEL credit synchronization and curriculum skill gaps across batches.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-5 border border-slate-300 rounded-xl">
                <span className="text-xs font-semibold text-slate-500">Total Enrolled Students</span>
                <p className="text-2xl font-bold text-slate-900 mt-1">1,240</p>
              </div>
              <div className="bg-white p-5 border border-slate-300 rounded-xl">
                <span className="text-xs font-semibold text-slate-500">Avg Job Readiness Score</span>
                <p className="text-2xl font-bold text-blue-900 mt-1">74%</p>
              </div>
              <div className="bg-white p-5 border border-slate-300 rounded-xl">
                <span className="text-xs font-semibold text-slate-500">NPTEL Certifications Active</span>
                <p className="text-2xl font-bold text-emerald-700 mt-1">890</p>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}