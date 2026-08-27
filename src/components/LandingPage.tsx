'use client';

import React, { useState } from 'react';
import { 
  Shield, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Users, 
  Award, 
  ChevronRight, 
  Zap, 
  Lock, 
  TrendingUp,
  Building2,
  GraduationCap,
  Check
} from 'lucide-react';

interface LandingPageProps {
  onOpenAuth: (role?: 'student' | 'recruiter' | 'faculty') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onOpenAuth }) => {
  const [activeTab, setActiveTab] = useState<'student' | 'recruiter' | 'faculty'>('student');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden scroll-smooth">
      {/* Light Institutional Background Accent Grid */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-b from-blue-100/60 via-indigo-50/40 to-transparent blur-3xl" />
        <div className="absolute top-1/3 -right-20 w-96 h-96 bg-slate-200/40 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* Official Top Navigation Header */}
      <nav className="border-b border-slate-200 bg-white/85 backdrop-blur-md sticky top-0 z-50 px-6 py-3.5 shadow-sm transition-all">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => onOpenAuth()}>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-700 to-indigo-900 rounded-lg flex items-center justify-center font-black text-white shadow-md group-hover:bg-blue-800 transition-colors">
              SB
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight text-slate-900 block leading-none">
                SkillBridge
              </span>
              <span className="text-[10px] font-semibold text-blue-700 tracking-wider block mt-1 uppercase">
                National Skill Verification Portal
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-xs font-medium text-slate-600">
            <a href="#overview" className="hover:text-blue-700 transition-colors">Portal Overview</a>
            <a href="#ecosystem" className="hover:text-blue-700 transition-colors">Ecosystem Solutions</a>
            <a href="#verification" className="hover:text-blue-700 transition-colors">Verification Framework</a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenAuth()}
              className="text-xs font-semibold text-slate-700 hover:text-blue-700 px-3.5 py-2 transition-colors"
            >
              Portal Login
            </button>
            <button
              onClick={() => onOpenAuth('student')}
              className="text-xs font-bold bg-blue-700 hover:bg-blue-800 text-white px-4 py-2.5 rounded-lg transition-all shadow-md flex items-center gap-1.5 active:scale-95"
            >
              Access Passport <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="overview" className="relative z-10 max-w-5xl w-full mx-auto px-6 pt-16 pb-16 flex flex-col items-center text-center justify-center space-y-7">
        
        {/* Official Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-medium shadow-xs">
          <Shield className="w-3.5 h-3.5 text-blue-700" />
          <span>APAAR & NCVET Compliant National Framework</span>
        </div>

        {/* Title Heading */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 max-w-4xl leading-[1.15]">
          Unified Skill Validation & <br />
          <span className="bg-gradient-to-r from-blue-800 via-indigo-800 to-slate-800 bg-clip-text text-transparent">
            Academic Gap Intelligence Platform
          </span>
        </h1>

        <p className="text-slate-600 max-w-2xl text-sm sm:text-base leading-relaxed font-normal">
          Connecting Students, Enterprises, and Educational Institutions with real-time AI skill mapping, NPTEL course credit transfer, and official qualification records.
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto pt-2">
          <button
            onClick={() => onOpenAuth('student')}
            className="w-full sm:w-auto px-7 py-3.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 group active:scale-95"
          >
            Create Skill Passport
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => onOpenAuth('recruiter')}
            className="w-full sm:w-auto px-7 py-3.5 rounded-lg bg-white border border-slate-300 hover:border-slate-400 hover:bg-slate-50 text-slate-700 font-semibold text-sm transition-all shadow-xs flex items-center justify-center gap-2"
          >
            Enterprise Recruiting Portal
          </button>
        </div>

        {/* Institutional Metrics Bar */}
        <div className="pt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-slate-600 text-xs font-medium w-full max-w-3xl border-t border-slate-200">
          <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs">
            <h4 className="font-bold text-lg text-blue-800 font-mono">100%</h4>
            <p className="text-[11px] text-slate-500 font-sans">APAAR Integrated</p>
          </div>
          <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs">
            <h4 className="font-bold text-lg text-slate-800 font-mono">AICTE</h4>
            <p className="text-[11px] text-slate-500 font-sans">Credit Compliant</p>
          </div>
          <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs">
            <h4 className="font-bold text-lg text-indigo-800 font-mono">NAPS 2.0</h4>
            <p className="text-[11px] text-slate-500 font-sans">Stipend Eligible</p>
          </div>
          <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs">
            <h4 className="font-bold text-lg text-emerald-700 font-mono">NCVET</h4>
            <p className="text-[11px] text-slate-500 font-sans">Verified Qualification</p>
          </div>
        </div>
      </section>

      {/* Interactive Ecosystem Solutions Section */}
      <section id="ecosystem" className="relative z-10 max-w-5xl w-full mx-auto px-6 py-16 border-t border-slate-200">
        <div className="text-center space-y-2 mb-10">
          <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">ECOSYSTEM SOLUTIONS</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Designed for Key Stakeholders</h2>
        </div>

        {/* Tab Selector */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-slate-200/70 p-1 rounded-xl border border-slate-300">
            {[
              { id: 'student', label: 'Students', icon: GraduationCap },
              { id: 'recruiter', label: 'Recruiters & Industry', icon: Building2 },
              { id: 'faculty', label: 'Universities', icon: Award },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === tab.id
                    ? 'bg-white text-blue-900 shadow-sm border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <tab.icon className="w-4 h-4 text-blue-700" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Card Showcase Based on Active Tab */}
        <div className="bg-white border border-slate-200 rounded-2xl p-7 shadow-md relative overflow-hidden">
          {activeTab === 'student' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">For Students</span>
                <h3 className="text-xl font-bold text-slate-900">National Verified Skill Passport</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Automated aggregation of credits from NPTEL, GitHub, and proctored NCVET tests into a single official transcript.
                </p>
                <div className="space-y-2.5 pt-1 text-xs text-slate-700">
                  <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-amber-600" /> AI Resume Gap Analysis against job profiles</div>
                  <div className="flex items-center gap-2"><Lock className="w-4 h-4 text-blue-700" /> Tamper-proof DigiLocker Sync</div>
                  <div className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-emerald-700" /> Direct NAPS Internship Subsidies</div>
                </div>
                <button
                  onClick={() => onOpenAuth('student')}
                  className="mt-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs px-5 py-2.5 rounded-lg transition-all shadow-xs"
                >
                  Get Verified Student Passport →
                </button>
              </div>

              {/* Official Preview UI Card */}
              <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl space-y-3 shadow-inner">
                <div className="flex justify-between items-center border-b border-slate-200 pb-2.5">
                  <span className="text-xs font-bold text-slate-800">Passport Record Preview</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-mono font-bold px-2.5 py-0.5 rounded border border-emerald-300">
                    VERIFIED
                  </span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="bg-white p-3 rounded-lg border border-slate-200 flex justify-between items-center">
                    <span className="text-slate-700 font-medium">Data Structures & Algorithms</span>
                    <span className="text-emerald-700 font-mono font-bold">88% (NPTEL)</span>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-slate-200 flex justify-between items-center">
                    <span className="text-slate-700 font-medium">Full Stack Web Architecture</span>
                    <span className="text-blue-700 font-mono font-bold">Verified GitHub</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'recruiter' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider">For Recruiters & Enterprise</span>
                <h3 className="text-xl font-bold text-slate-900">Data-Driven Candidate Assessment</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Bypass unverified resumes. Filter applicants directly using proctored test results and accredited academic records.
                </p>
                <button
                  onClick={() => onOpenAuth('recruiter')}
                  className="mt-2 bg-indigo-700 hover:bg-indigo-800 text-white font-bold text-xs px-5 py-2.5 rounded-lg transition-all shadow-xs"
                >
                  Access Recruiter Suite →
                </button>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl space-y-3 font-mono text-xs">
                <div className="text-slate-600 font-sans font-bold">Verified Candidate Search Filter:</div>
                <div className="bg-white p-3 rounded-lg border border-slate-200 text-slate-800">
                  Query: SQL &gt; 80% | NAPS Eligible | Batch 2026
                </div>
                <div className="text-emerald-700 text-[11px] font-sans flex items-center gap-1.5 pt-1">
                  <Check className="w-4 h-4 text-emerald-700" /> 184 Matched Profiles Verified
                </div>
              </div>
            </div>
          )}

          {activeTab === 'faculty' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">For Educational Institutions</span>
                <h3 className="text-xl font-bold text-slate-900">Cohort Skill Intelligence</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Monitor batch-wide readiness scores, bridge curriculum deficits, and automate NPTEL credit transfer processing.
                </p>
                <button
                  onClick={() => onOpenAuth('faculty')}
                  className="mt-2 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs px-5 py-2.5 rounded-lg transition-all shadow-xs"
                >
                  University Management Portal →
                </button>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl space-y-3">
                <div className="flex justify-between text-xs font-bold text-slate-800">
                  <span>Batch 2026 Industry Readiness Rate</span>
                  <span className="text-blue-800 font-mono">82%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden border border-slate-300">
                  <div className="bg-blue-700 h-full w-[82%]" />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Verification Steps Section */}
      <section id="verification" className="relative z-10 max-w-5xl w-full mx-auto px-6 py-16 border-t border-slate-200">
        <div className="text-center space-y-2 mb-12">
          <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">WORKFLOW PROCESS</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Verification Steps</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { step: '01', title: 'APAAR & DigiLocker Sync', desc: 'Authenticate via single sign-on to fetch verified academic records directly.' },
            { step: '02', title: 'AI Resume Audit', desc: 'Analyze target industry job specifications to pinpoint missing skills and course gaps.' },
            { step: '03', title: 'Direct Enterprise Match', desc: 'Recruiters evaluate verified scores for immediate employment and NAPS internships.' },
          ].map((item) => (
            <div key={item.step} className="bg-white border border-slate-200 p-5 rounded-xl space-y-2.5 shadow-xs hover:border-slate-300 transition-all">
              <span className="text-xl font-black font-mono text-blue-800">{item.step}</span>
              <h4 className="font-bold text-sm text-slate-900">{item.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 px-6 text-center text-xs text-slate-500 relative z-10">
        <p>© 2026 SkillBridge National Portal. Designed in alignment with APAAR, NCVET & AICTE Frameworks.</p>
      </footer>
    </div>
  );
};