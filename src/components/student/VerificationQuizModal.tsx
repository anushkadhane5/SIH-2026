'use client';

import React, { useState } from 'react';
import { CheckCircle2, HelpCircle, Sparkles, AlertCircle, X, ShieldCheck, Stethoscope, FileSpreadsheet, Scale, Code2 } from 'lucide-react';
import { SkillItem, StudentDomain } from '../../types/student';

interface Props {
  skill: SkillItem;
  onClose: () => void;
  onSuccess: (score: number) => void;
}

export const VerificationQuizModal: React.FC<Props> = ({ skill, onClose, onSuccess }) => {
  const [answer, setAnswer] = useState('');
  const [repoUrl, setRepoUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dynamic question generation based on domain and skill
  const getDomainQuestion = () => {
    switch (skill.domain) {
      case 'medical':
        return {
          icon: Stethoscope,
          title: "Clinical Scenario Assessment",
          question: `Patient presents with acute chest pain, elevated Troponin-I, and ST-segment elevation. Regarding '${skill.name}', what is your immediate triage protocol and first-line clinical management?`
        };
      case 'finance':
        return {
          icon: FileSpreadsheet,
          title: "Audit & Tax Compliance Case",
          question: `Regarding '${skill.name}': A company has unadjusted ITC discrepancies under GST Schedule III during end-of-year audit. How do you reconcile this in the financial statement?`
        };
      case 'law':
        return {
          icon: Scale,
          title: "Legal Clause Analysis",
          question: `Regarding '${skill.name}': Evaluate a vendor NDA containing an unrestricted indemnification clause. What specific statutory revisions would you draft to limit liability?`
        };
      case 'tech':
      default:
        return {
          icon: Code2,
          title: "Technical Architecture & Code Verification",
          question: `In your repository implementation for '${skill.name}', explain how you managed state immutability and asynchronous data flow without side-effects.`
        };
    }
  };

  const domainData = getDomainQuestion();
  const IconComponent = domainData.icon;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess(88); // Simulating passing score
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xl max-w-xl w-full space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-900 text-white rounded-xl">
              <IconComponent className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">{domainData.title}</h3>
              <p className="text-xs text-slate-500">Verifying skill: <strong className="text-blue-900">{skill.name}</strong></p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tech domain option: GitHub Repo Link */}
        {skill.domain === 'tech' && (
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">Optional: Repository URL for Automated Scan</label>
            <input
              type="url"
              placeholder="https://github.com/username/project-repo"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg outline-none focus:border-blue-700 text-slate-900"
            />
          </div>
        )}

        {/* AI Case Study Question */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-blue-50/70 p-4 rounded-xl border border-blue-200 space-y-2">
            <div className="flex items-start gap-2">
              <HelpCircle className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
              <p className="text-xs font-semibold text-slate-800 leading-relaxed">
                {domainData.question}
              </p>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">Your Structured Answer / Clinical Rationale</label>
            <textarea
              rows={4}
              required
              placeholder="Provide a detailed explanation to prove your conceptual knowledge..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full p-3 text-xs bg-white border border-slate-300 rounded-xl outline-none focus:border-blue-700 text-slate-900 leading-relaxed"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs text-slate-600 font-semibold hover:bg-slate-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 bg-blue-900 hover:bg-blue-950 text-white text-xs font-bold rounded-lg transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              {isSubmitting ? "Evaluating with AI..." : "Submit for Verification"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};