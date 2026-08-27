'use client';

import React, { useState, useEffect } from 'react';
import { Shield, Plus, Award, CheckCircle2, AlertCircle, FileCheck, Sparkles, Target, ArrowRight } from 'lucide-react';
import { SkillItem, CertificateItem, StudentDomain } from '../../types/student';
import { VerificationQuizModal } from './VerificationQuizModal';

interface Props {
  userDomain?: StudentDomain;
  onNavigateToCourses?: () => void;
}

// Domain-specific defaults
const DOMAIN_DEFAULTS: Record<StudentDomain, {
  role: string;
  company: string;
  requiredSkills: string[];
  defaultSkills: SkillItem[];
  defaultCerts: CertificateItem[];
}> = {
  tech: {
    role: 'Frontend Developer',
    company: 'Google',
    requiredSkills: ['HTML & CSS', 'JavaScript', 'React.js', 'Data Structures & Algorithms'],
    defaultSkills: [
      { id: 's1', name: 'HTML & CSS', category: 'Frontend Basics', domain: 'tech', score: 90, status: 'TEST_VERIFIED', issuer: 'SkillBridge Test' },
    ],
    defaultCerts: [
      { id: 'c1', title: 'Web Development Basics Certificate', issuingOrganization: 'NPTEL / AICTE', issueDate: '2025-10-10', isApaarSynced: true, domain: 'tech' }
    ]
  },
  medical: {
    role: 'Clinical Resident / Physician',
    company: 'AIIMS Hospital',
    requiredSkills: ['Clinical Patient Triage', 'ECG Interpretation', 'ACLS Protocols', 'Pharmacology'],
    defaultSkills: [
      { id: 's2', name: 'Clinical Patient Triage', category: 'Emergency Care', domain: 'medical', score: 85, status: 'TEST_VERIFIED', issuer: 'Medical AI Test' },
    ],
    defaultCerts: [
      { id: 'c2', title: 'Basic Life Support (BLS) Certification', issuingOrganization: 'AIIMS / NBE', issueDate: '2026-01-15', isApaarSynced: true, domain: 'medical' }
    ]
  },
  finance: {
    role: 'Tax Consultant & Auditor',
    company: 'Deloitte',
    requiredSkills: ['GST Compliance', 'Balance Sheet Reconciliation', 'Corporate Tax', 'Audit Sampling'],
    defaultSkills: [
      { id: 's3', name: 'GST Compliance', category: 'Taxation', domain: 'finance', score: 80, status: 'TEST_VERIFIED', issuer: 'ICAI Approved' },
    ],
    defaultCerts: [
      { id: 'c3', title: 'ICAI Articleship Completion', issuingOrganization: 'ICAI', issueDate: '2025-12-01', isApaarSynced: true, domain: 'finance' }
    ]
  },
  law: {
    role: 'Corporate Legal Associate',
    company: 'Khaitan & Co',
    requiredSkills: ['Contract Drafting', 'Statutory Interpretation', 'Moot Court Research', 'Corporate Compliance'],
    defaultSkills: [
      { id: 's4', name: 'Contract Drafting', category: 'Corporate Law', domain: 'law', score: 88, status: 'TEST_VERIFIED', issuer: 'Bar Council Test' },
    ],
    defaultCerts: [
      { id: 'c4', title: 'National Moot Court Winner', issuingOrganization: 'Bar Council of India', issueDate: '2025-11-20', isApaarSynced: true, domain: 'law' }
    ]
  },
  creative: {
    role: 'UI/UX Product Designer',
    company: 'Figma',
    requiredSkills: ['Figma Prototyping', 'User Research', 'Design Systems', 'Micro-animations'],
    defaultSkills: [
      { id: 's5', name: 'Figma Prototyping', category: 'UI Design', domain: 'creative', score: 92, status: 'TEST_VERIFIED', issuer: 'Design Assessment' },
    ],
    defaultCerts: [
      { id: 'c5', title: 'UX Research Fundamentals', issuingOrganization: 'Coursera / Google', issueDate: '2026-02-10', isApaarSynced: true, domain: 'creative' }
    ]
  }
};

export const SkillPassportTab: React.FC<Props> = ({ userDomain = 'tech', onNavigateToCourses }) => {
  const currentConfig = DOMAIN_DEFAULTS[userDomain] || DOMAIN_DEFAULTS.tech;

  // Domain state syncing
  const [skills, setSkills] = useState<SkillItem[]>(currentConfig.defaultSkills);
  const [certificates, setCertificates] = useState<CertificateItem[]>(currentConfig.defaultCerts);
  const [newSkillName, setNewSkillName] = useState('');
  const [showAddSkillForm, setShowAddSkillForm] = useState(false);
  const [selectedSkillForTest, setSelectedSkillForTest] = useState<SkillItem | null>(null);

  // Sync state whenever userDomain changes
  useEffect(() => {
    const config = DOMAIN_DEFAULTS[userDomain] || DOMAIN_DEFAULTS.tech;
    setSkills(config.defaultSkills);
    setCertificates(config.defaultCerts);
  }, [userDomain]);

  const requiredSkills = currentConfig.requiredSkills;
  const acquiredSkillNames = skills.map(s => s.name.toLowerCase());
  const missingSkills = requiredSkills.filter(req => !acquiredSkillNames.includes(req.toLowerCase()));

  // Dynamic score calculation
  const readinessScore = Math.round(((requiredSkills.length - missingSkills.length) / requiredSkills.length) * 100);

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    const newSkill: SkillItem = {
      id: Date.now().toString(),
      name: newSkillName.trim(),
      category: userDomain.toUpperCase(),
      domain: userDomain,
      score: 0,
      status: 'SELF_DECLARED',
    };

    setSkills(prev => [...prev, newSkill]);
    setNewSkillName('');
    setShowAddSkillForm(false);
  };

  return (
    <div className="space-y-6">

      {/* Target Goal & AI Matcher Card */}
      <div className="bg-gradient-to-r from-slate-900 to-blue-950 text-white rounded-2xl p-6 shadow-md space-y-4">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="space-y-1">
            <span className="px-2.5 py-1 bg-blue-500/20 text-blue-300 text-[10px] font-bold rounded-md border border-blue-400/30 uppercase tracking-wider">
              TARGET GOAL AI MATCHER ({userDomain.toUpperCase()})
            </span>
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Target className="w-5 h-5 text-amber-400" /> Target: {currentConfig.role} at {currentConfig.company}
            </h2>
            <p className="text-xs text-slate-300">Matching your active skills against required profile standards.</p>
          </div>

          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10">
            <div className="text-right">
              <span className="text-2xl font-black text-amber-300">{readinessScore}%</span>
              <p className="text-[10px] text-slate-300 uppercase tracking-wider font-bold">Role Match</p>
            </div>
          </div>
        </div>

        {/* Missing Skills Warning */}
        {missingSkills.length > 0 ? (
          <div className="bg-white/10 border border-white/15 p-4 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" /> Recommended Skills to Reach 100% Match:
              </h4>
              {onNavigateToCourses && (
                <button
                  onClick={onNavigateToCourses}
                  className="text-xs font-bold text-white hover:text-amber-300 flex items-center gap-1 transition-all"
                >
                  View Recommended Courses <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {missingSkills.map((missing, idx) => (
                <span key={idx} className="px-3 py-1 bg-amber-400/20 text-amber-200 border border-amber-400/30 text-xs font-semibold rounded-lg flex items-center gap-1">
                  + {missing}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-emerald-500/20 border border-emerald-400/30 p-3 rounded-xl text-xs font-bold text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> Exceptional Match! Your profile meets all target requirements for {currentConfig.role}.
          </div>
        )}
      </div>

      {/* Active Skills List */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-900" /> Active Profile Skills
            </h3>
            <p className="text-xs text-slate-500">Skills added under your {userDomain.toUpperCase()} domain profile.</p>
          </div>
          <button
            onClick={() => setShowAddSkillForm(!showAddSkillForm)}
            className="px-3 py-1.5 bg-blue-900 hover:bg-blue-950 text-white text-xs font-bold rounded-lg flex items-center gap-1"
          >
            <Plus className="w-4 h-4" /> Add Skill
          </button>
        </div>

        {showAddSkillForm && (
          <form onSubmit={handleAddSkill} className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex gap-2">
            <input
              type="text"
              required
              placeholder={`e.g. ${requiredSkills[0]}`}
              value={newSkillName}
              onChange={(e) => setNewSkillName(e.target.value)}
              className="flex-1 px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg outline-none text-slate-900"
            />
            <button type="submit" className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg">Save Skill</button>
          </form>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {skills.map(skill => (
            <div key={skill.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{skill.name}</h4>
                  <span className="text-[10px] text-slate-500 uppercase">{skill.category}</span>
                </div>
                {skill.status === 'TEST_VERIFIED' ? (
                  <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> AI Verified ({skill.score}%)
                  </span>
                ) : (
                  <span className="px-2.5 py-1 bg-amber-100 text-amber-800 text-[10px] font-semibold rounded-full flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> Unverified
                  </span>
                )}
              </div>

              {skill.status !== 'TEST_VERIFIED' && (
                <div className="flex justify-end pt-1">
                  <button
                    onClick={() => setSelectedSkillForTest(skill)}
                    className="px-3 py-1.5 bg-blue-900 hover:bg-blue-950 text-white text-xs font-bold rounded-lg flex items-center gap-1"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Verify Skill with AI Test
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Lifetime Certificate Vault */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
        <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
          <Award className="w-5 h-5 text-emerald-700" /> Academic & Career Certificates
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {certificates.map(cert => (
            <div key={cert.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-100 text-emerald-800 rounded-xl">
                  <FileCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900">{cert.title}</h4>
                  <p className="text-[11px] text-slate-500">{cert.issuingOrganization} • Issued {cert.issueDate}</p>
                </div>
              </div>
              <span className="px-2 py-0.5 bg-blue-50 text-blue-800 text-[10px] font-bold rounded border border-blue-200">
                APAAR Synced
              </span>
            </div>
          ))}
        </div>
      </div>

      {selectedSkillForTest && (
        <VerificationQuizModal
          skill={selectedSkillForTest}
          onClose={() => setSelectedSkillForTest(null)}
          onSuccess={(score) => {
            setSkills(prev => prev.map(s => s.id === selectedSkillForTest.id ? { ...s, score, status: 'TEST_VERIFIED' } : s));
            setSelectedSkillForTest(null);
          }}
        />
      )}
    </div>
  );
};