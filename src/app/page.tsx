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
import { GithubVerificationModal } from '../components/GithubVerificationModal';
import { DomainOnboardingModal } from '../components/student/DomainOnboardingModal';
import { Shield, FileText, Target, BookOpen, Briefcase, Award, Search, FolderGit2, RefreshCw } from 'lucide-react';
import { StudentDomain } from '../types/student';

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

  // Profession Domain state (default: tech)
  const [userDomain, setUserDomain] = useState<StudentDomain>('tech');
  const [isDomainModalOpen, setIsDomainModalOpen] = useState(false);

  // Navigation state inside student dashboard
  const [studentNav, setStudentNav] = useState<'passport' | 'resume' | 'test' | 'courses' | 'opportunities' | 'schemes'>('passport');
  const [skills, setSkills] = useState(INITIAL_SKILLS);

  // GitHub Project Verification Modal state
  const [isGithubModalOpen, setIsGithubModalOpen] = useState(false);

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
            // Open domain modal on first login for student
            if (userData.role === 'student') {
              setIsDomainModalOpen(true);
            }
          }}
        />
      </>
    );
  }

  const overallReadiness = Math.round(skills.reduce((acc, s) => acc + s.score, 0) / (skills.length || 1));

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
            <div className="flex items-center justify-between bg-white px-6 py-3 rounded-xl border border-slate-200">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <span>Active Profession/Stream:</span>
                <span className="px-3 py-1 bg-blue-900 text-white rounded-lg font-bold uppercase tracking-wider text-[11px]">
                  {userDomain}
                </span>
              </div>
              <button
                onClick={() => setIsDomainModalOpen(true)}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-all"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Switch Profession Profile
              </button>
            </div>

            <IdentityCard
              student={{
                name: user.name,
                apaarId: 'APAAR-9876-5432-1012',
                institution: userDomain === 'medical' ? 'AIIMS New Delhi' : userDomain === 'finance' ? 'ICAI Institute' : 'AIIT Delhi',
                degree: userDomain === 'medical' ? 'MBBS' : userDomain === 'finance' ? 'CA Intermediate' : 'B.Tech CSE',
                targetRole: userDomain === 'medical' ? 'Clinical Resident' : userDomain === 'finance' ? 'Tax Consultant' : 'SDE-1',
                streak: 12,
                dailyGoalMins: 45,
                completedMins: 30,
              }}
              overallReadiness={overallReadiness}
            />

            <div className="flex justify-between items-center border-b border-slate-300 bg-white px-4 rounded-t-xl overflow-x-auto">
              <div className="flex text-xs font-bold gap-6">
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

              {userDomain === 'tech' && (
                <button
                  onClick={() => setIsGithubModalOpen(true)}
                  className="my-2 px-3 py-1.5 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 shrink-0 shadow-xs"
                >
                  <FolderGit2 className="w-4 h-4 text-blue-400" />
                  <span>Verify GitHub Project</span>
                </button>
              )}
            </div>

            {studentNav === 'passport' && (
              <SkillPassportTab
                userDomain={userDomain}
                onNavigateToCourses={() => setStudentNav('courses')}
              />
            )}
            {studentNav === 'resume' && (
              <ResumeOptimizerTab
                onApplyAIFix={(newSkills) => setSkills(p => [...p, ...newSkills])}
              />
            )}
            {studentNav === 'test' && (
              <AssessmentTab
                onQuizComplete={(score) => setSkills(p => p.map(s => s.name.includes('SQL') ? {...s, score, status: 'ASSESSMENT_VERIFIED'} : s))}
                onNavigateToPassport={() => setStudentNav('passport')}
              />
            )}
            {studentNav === 'courses' && <CoursesTab userDomain={userDomain} />}
            {studentNav === 'opportunities' && <OpportunitiesTab />}
            {studentNav === 'schemes' && <SchemesTab />}
          </>
        )}

      </main>

      {/* Domain Selection Modal */}
      <DomainOnboardingModal
        isOpen={isDomainModalOpen}
        currentDomain={userDomain}
        onSelectDomain={(d) => setUserDomain(d)}
        onClose={() => setIsDomainModalOpen(false)}
      />

      {/* GitHub Project Verification Overlay Modal */}
      {isGithubModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <GithubVerificationModal
            onClose={() => setIsGithubModalOpen(false)}
            onSuccess={() => {
              setSkills(prev => [
                ...prev,
                {
                  id: Date.now().toString(),
                  name: 'Verified Project Ownership',
                  category: 'Fullstack / Git',
                  score: 95,
                  required: 75,
                  status: 'PROJECT_VERIFIED',
                  issuer: 'SkillBridge AI Github Scan',
                }
              ]);
            }}
          />
        </div>
      )}
    </div>
  );
}