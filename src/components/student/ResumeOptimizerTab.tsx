'use client';

import React, { useState } from 'react';
import { FileCheck, Upload, RefreshCw, CheckCircle2, TrendingUp, Wand2, Check } from 'lucide-react';

interface ResumeTabProps {
  onApplyAIFix: (newSkills: any[], newScore: number) => void;
}

export const ResumeOptimizerTab: React.FC<ResumeTabProps> = ({ onApplyAIFix }) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<null | {
    atsScore: number;
    strengths: string[];
    improvements: string[];
    suggestedSkills: string[];
  }>(null);
  const [isAutoFixed, setIsAutoFixed] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFile(file);
    setIsAnalyzing(true);
    setAnalysisResult(null);
    setIsAutoFixed(false);

    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisResult({
        atsScore: 68,
        strengths: [
          'Solid base in React.js and Web Development frameworks',
          'Good structural layout with clear institutional background (AIIT)'
        ],
        improvements: [
          'Missing key enterprise Backend keywords (e.g., PostgreSQL, Docker, Microservices)',
          'Relational Databases & System Design scores fall below target benchmark for SDE-1',
          'Lack of quantified outcome statements in project bullet points'
        ],
        suggestedSkills: ['Docker & Containerization', 'PostgreSQL Optimization', 'REST API Architecture']
      });
    }, 1800);
  };

  const handleFixClick = () => {
    if (!analysisResult) return;
    const formattedSkills = analysisResult.suggestedSkills.map((name, idx) => ({
      id: `ai-${Date.now()}-${idx}`,
      name,
      category: 'AI Auto-Injected',
      score: 75,
      required: 70,
      status: 'PROJECT_VERIFIED',
      issuer: 'AI Resume Enhancer'
    }));

    onApplyAIFix(formattedSkills, 89);
    setAnalysisResult(prev => prev ? { ...prev, atsScore: 89 } : null);
    setIsAutoFixed(true);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-300 rounded-xl p-6 shadow-sm space-y-4">
        <div>
          <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-blue-900" /> Upload Resume for AI Analysis
          </h3>
          <p className="text-xs text-slate-600 mt-1">
            Upload your PDF or DOCX resume. The AI engine will parse your credentials against industry benchmarks.
          </p>
        </div>

        <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center bg-slate-50 hover:bg-slate-100 transition relative">
          <input 
            type="file" 
            accept=".pdf,.docx,.doc" 
            onChange={handleFileUpload}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          />
          <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-xs font-bold text-slate-700">
            {uploadedFile ? `Selected File: ${uploadedFile.name}` : 'Drag and drop your resume file here, or click to browse'}
          </p>
          <p className="text-[10px] text-slate-500 mt-1">Supports PDF, DOCX (Max size: 5MB)</p>
        </div>
      </div>

      {isAnalyzing && (
        <div className="bg-white border border-slate-300 p-8 rounded-xl text-center space-y-3 shadow-sm">
          <RefreshCw className="w-8 h-8 text-blue-900 animate-spin mx-auto" />
          <p className="text-xs font-bold text-slate-800">Parsing document, mapping skill tags, and scoring ATS compatibility...</p>
        </div>
      )}

      {analysisResult && (
        <div className="bg-white border border-slate-300 rounded-xl p-6 shadow-sm space-y-6">
          <div className="flex flex-wrap justify-between items-center gap-4 border-b border-slate-200 pb-4">
            <div>
              <span className="text-[10px] font-bold text-blue-900 uppercase">AI Evaluation Report</span>
              <h4 className="font-bold text-lg text-slate-900">ATS Match Score & Gap Breakdown</h4>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-600">ATS Compatibility Score:</span>
              <span className={`text-2xl font-black px-4 py-1 rounded-lg ${analysisResult.atsScore >= 80 ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-amber-100 text-amber-800 border border-amber-300'}`}>
                {analysisResult.atsScore} / 100
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-emerald-50/50 border border-emerald-200 p-4 rounded-lg space-y-3">
              <h5 className="font-bold text-xs text-emerald-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" /> Key Profile Strengths
              </h5>
              <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-4">
                {analysisResult.strengths.map((str, idx) => (
                  <li key={idx}>{str}</li>
                ))}
              </ul>
            </div>

            <div className="bg-amber-50/50 border border-amber-200 p-4 rounded-lg space-y-3">
              <h5 className="font-bold text-xs text-amber-900 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-amber-700" /> Recommended Improvements
              </h5>
              <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-4">
                {analysisResult.improvements.map((imp, idx) => (
                  <li key={idx}>{imp}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 p-5 rounded-lg flex flex-wrap justify-between items-center gap-4">
            <div>
              <h5 className="font-bold text-xs text-blue-950 flex items-center gap-1.5">
                <Wand2 className="w-4 h-4 text-blue-900" /> Auto-Fix Resume & Inject Missing Skills
              </h5>
              <p className="text-[11px] text-slate-600 mt-0.5">
                Let AI automatically append missing skills into your official Skill Passport and optimize your ATS score.
              </p>
            </div>

            <button 
              onClick={handleFixClick}
              disabled={isAutoFixed}
              className={`px-5 py-2.5 rounded-md text-xs font-bold flex items-center gap-2 transition ${
                isAutoFixed ? 'bg-emerald-700 text-white' : 'bg-blue-900 hover:bg-blue-800 text-white shadow-sm'
              }`}
            >
              {isAutoFixed ? (
                <>
                  <Check className="w-4 h-4" /> Applied to Profile! (Score: 89)
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4" /> Auto-Fix with AI →
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};