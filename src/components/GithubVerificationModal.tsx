'use client';

import React, { useState } from 'react';
import { CheckCircle2, HelpCircle, Sparkles, AlertCircle, X, Code2, FolderGit2 } from 'lucide-react';

interface GithubVerificationProps {
  onClose?: () => void;
  onSuccess?: () => void;
}

export const GithubVerificationModal: React.FC<GithubVerificationProps> = ({ onClose, onSuccess }) => {
  const [repoUrl, setRepoUrl] = useState('');
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  // Simulated AI dynamic question based on repo architecture
  const aiQuestion = "In your repository code, how did you handle state updates for real-time data flow in your components?";

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (repoUrl.trim()) {
      setIsAnalyzed(true);
    }
  };

  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userAnswer.trim().length > 10) {
      setIsVerified(true);
      setIsVerifying(false);
      if (onSuccess) onSuccess();
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-md max-w-xl w-full space-y-5">
      {/* Modal Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-slate-900 text-white rounded-lg">
            <FolderGit2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-900">GitHub Project AI Analyzer</h3>
            <p className="text-[11px] text-slate-500">Scan code structure & verify authorship</p>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-100 text-slate-400">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Step 1: Input GitHub URL */}
      {!isAnalyzed ? (
        <form onSubmit={handleAnalyze} className="space-y-3">
          <label className="block text-xs font-semibold text-slate-700">Enter Repository URL</label>
          <div className="flex gap-2">
            <input
              type="url"
              required
              placeholder="https://github.com/username/project-repo"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              className="flex-1 px-3.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg outline-none focus:border-blue-700 text-slate-900"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-lg transition-all"
            >
              Analyze Repo
            </button>
          </div>
        </form>
      ) : (
        /* Step 2: Display Analysis & Trigger Quiz */
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <div>
              <h4 className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                <Code2 className="w-4 h-4 text-blue-700" /> Repository Analyzed
              </h4>
              <p className="text-[11px] text-slate-500 truncate max-w-xs">{repoUrl}</p>
            </div>
            {isVerified ? (
              <span className="flex items-center gap-1 px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[11px] font-bold rounded-full border border-emerald-300">
                <CheckCircle2 className="w-3.5 h-3.5" /> AI Verified
              </span>
            ) : (
              <span className="flex items-center gap-1 px-2.5 py-1 bg-amber-100 text-amber-800 text-[11px] font-semibold rounded-full border border-amber-300">
                <AlertCircle className="w-3.5 h-3.5" /> Pending Verification
              </span>
            )}
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
              <span className="block text-slate-500 text-[10px]">Code Score</span>
              <strong className="text-slate-900 font-mono font-bold">92/100</strong>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
              <span className="block text-slate-500 text-[10px]">Tech Stack</span>
              <strong className="text-blue-700 font-bold">React / TS</strong>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
              <span className="block text-slate-500 text-[10px]">APAAR Match</span>
              <strong className="text-emerald-700 font-bold">Verified</strong>
            </div>
          </div>

          {!isVerified && !isVerifying && (
            <button
              onClick={() => setIsVerifying(true)}
              className="w-full py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-lg transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" /> Start AI Ownership Verification Quiz
            </button>
          )}

          {/* Step 3: Interactive Quiz Form */}
          {isVerifying && (
            <form onSubmit={handleVerifySubmit} className="bg-blue-50/70 p-4 rounded-xl border border-blue-200 space-y-3">
              <div className="flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                <p className="text-xs font-semibold text-slate-800 leading-snug">{aiQuestion}</p>
              </div>

              <textarea
                rows={3}
                required
                placeholder="Type your technical explanation to confirm code authorship..."
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                className="w-full p-2.5 text-xs bg-white border border-slate-300 rounded-lg outline-none focus:border-blue-700 text-slate-900"
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsVerifying(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-lg"
                >
                  Submit & Verify
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
};