'use client';

import React, { useState } from 'react';
import {
  Search,
  SlidersHorizontal,
  Bookmark,
  PlusCircle,
  CheckCircle2,
  X,
  Sparkles,
  ExternalLink,
  FileText,
  Building2,
  Briefcase,
  TrendingUp,
  ShieldCheck,
  Award
} from 'lucide-react';

export interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  postedAgo: string;
  verified: boolean;
  promoted?: boolean;
  stipend?: string;
  applicantCount?: string;
  aboutCompany: string;
  matchScore: number;
  matchDetails: string[];
}

const SAMPLE_JOBS: JobListing[] = [
  {
    id: '1',
    title: 'Contractor',
    company: 'Veradigm®',
    location: 'Pune Division',
    type: 'Contract',
    postedAgo: '1 day ago',
    verified: true,
    promoted: true,
    applicantCount: 'Over 50 applicants',
    aboutCompany: 'Veradigm is a healthcare technology company driving transformation through integrated data, analytics, and software solutions.',
    matchScore: 92,
    matchDetails: ['Matches NCVET Data Analyst track', 'Verified Spring Boot & SQL credits', 'Pune location match'],
  },
  {
    id: '2',
    title: 'Software Engineering Intern (Flutter | Java Spring Boot | Angular)',
    company: 'Rebind',
    location: 'Pune/Pimpri-Chinchwad Area',
    type: 'Internship',
    postedAgo: '3 weeks ago',
    verified: false,
    stipend: '₹18,000 / month',
    applicantCount: 'Over 100 people clicked apply',
    aboutCompany: 'Rebind is a technology startup building solutions in the consumer trust, product authentication, and brand engagement space.',
    matchScore: 88,
    matchDetails: ['Matches your Java Spring Boot coursework', 'Flutter framework match', 'NAPS stipend eligible'],
  },
  {
    id: '3',
    title: 'AI Agent Development Internship in Pune',
    company: 'Smart Suburbs Hyperlocal Suburban Biz Directories Network',
    location: 'Pune Division (On-site)',
    type: 'Internship',
    postedAgo: '3 weeks ago',
    verified: false,
    stipend: '₹15,000 / month',
    applicantCount: '45 applicants',
    aboutCompany: 'Smart Suburbs connects local businesses and suburban communities through smart AI-driven directory services in Pune and Mumbai.',
    matchScore: 85,
    matchDetails: ['AI/Python skill match', 'On-site Pune requirement matched'],
  },
  {
    id: '4',
    title: 'Java Backend Developer Intern',
    company: 'SkilloVilla',
    location: 'Greater Bengaluru Area (On-site)',
    type: 'Internship',
    postedAgo: '2 weeks ago',
    verified: true,
    promoted: true,
    stipend: '₹20,000 / month',
    applicantCount: 'Over 80 applicants',
    aboutCompany: 'SkilloVilla is an upskilling platform empowering students with industry-ready tech and data skills.',
    matchScore: 90,
    matchDetails: ['High match for OOP & Java Foundations', 'NPTEL Verified candidate priority'],
  },
  {
    id: '5',
    title: 'Software Engineer Intern',
    company: 'Retrack Automation',
    location: 'Bengaluru (On-site)',
    type: 'Internship',
    postedAgo: '1 day ago',
    verified: true,
    promoted: true,
    applicantCount: 'Actively reviewing applicants',
    aboutCompany: 'Retrack Automation delivers modern robotics and automation workflows for next-gen manufacturing enterprises.',
    matchScore: 81,
    matchDetails: ['Systems programming match', 'APAAR verification linked'],
  },
  {
    id: '6',
    title: 'Software Engineer Intern',
    company: 'Crossing Infotech',
    location: 'India (Remote)',
    type: 'Internship',
    postedAgo: '14 minutes ago',
    verified: false,
    stipend: '16.5K INR/month',
    applicantCount: 'Be an early applicant',
    aboutCompany: 'Crossing Infotech specializes in enterprise web solutions and cloud application engineering.',
    matchScore: 94,
    matchDetails: ['100% Remote match', 'Full Stack JS/React match', 'Newly posted listing'],
  },
  {
    id: '7',
    title: 'Java Developer Intern | Java | OOP | Spring Basics | APIs | Databases',
    company: 'MediNex Workforce',
    location: 'India (Remote)',
    type: 'Internship',
    postedAgo: '6 hours ago',
    verified: false,
    stipend: '₹15,000 / month',
    applicantCount: '32 applicants',
    aboutCompany: 'MediNex connects healthcare engineering talent with global digital health systems.',
    matchScore: 89,
    matchDetails: ['Java, Spring, & Database course match', 'Remote flexible hours'],
  },
  {
    id: '8',
    title: 'Software Engineer Intern',
    company: 'Branch International',
    location: 'India (Remote)',
    type: 'Internship',
    postedAgo: '3 weeks ago',
    verified: true,
    applicantCount: 'Over 200 applicants',
    aboutCompany: 'Branch is a global fintech providing instant mobile financial services across emerging markets.',
    matchScore: 78,
    matchDetails: ['Backend systems match', 'Fintech domain preference'],
  }
];

export const OpportunitiesTab: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [jobAlerts, setJobAlerts] = useState<Record<string, boolean>>({});
  const [showSavedOnly, setShowSavedOnly] = useState(false);

  const toggleSaveJob = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSavedJobs((prev) =>
      prev.includes(id) ? prev.filter((jId) => jId !== id) : [...prev, id]
    );
  };

  const toggleAlert = (title: string) => {
    setJobAlerts((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const filteredJobs = SAMPLE_JOBS.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSaved = showSavedOnly ? savedJobs.includes(job.id) : true;
    return matchesSearch && matchesSaved;
  });

  return (
    <div className="w-full space-y-6">
      {/* Top Banner Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="p-2.5 bg-blue-50 text-blue-700 rounded-lg">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-500">APAAR Verified Jobs</div>
            <div className="text-lg font-bold text-slate-900">142 Openings</div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-lg">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-500">Average AI Match</div>
            <div className="text-lg font-bold text-slate-900">88% Index</div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="p-2.5 bg-amber-50 text-amber-700 rounded-lg">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-500">NAPS Subsidy Eligible</div>
            <div className="text-lg font-bold text-slate-900">38 Companies</div>
          </div>
        </div>
      </div>

      {/* Main Jobs Section Container */}
      <div className="w-full bg-slate-50 text-slate-900 rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        
        {/* Header Search & Preferences Bar */}
        <div className="p-4 bg-white border-b border-slate-200 space-y-3">
          <div className="relative w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Describe the job or skill you want (e.g. Flutter, Java Spring Boot)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-100/80 border border-slate-200 rounded-full outline-none focus:border-blue-700 focus:bg-white transition-all text-slate-900 placeholder-slate-400"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs font-medium text-slate-700">
            <button 
              onClick={() => setShowSavedOnly(false)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all shrink-0 ${
                !showSavedOnly ? 'bg-blue-700 text-white border-blue-700' : 'bg-white border-slate-300 hover:bg-slate-50'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              All Opportunities
            </button>
            <button 
              onClick={() => setShowSavedOnly(!showSavedOnly)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all shrink-0 ${
                showSavedOnly ? 'bg-blue-700 text-white border-blue-700' : 'bg-white border-slate-300 hover:bg-slate-50'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              Saved ({savedJobs.length})
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-300 bg-white hover:bg-slate-50 transition-all shrink-0">
              <PlusCircle className="w-3.5 h-3.5 text-slate-600" />
              Post a free job
            </button>
          </div>
        </div>

        {/* Listings Section Sub-header */}
        <div className="px-5 pt-4 pb-2 bg-white flex justify-between items-center">
          <div>
            <h3 className="font-extrabold text-base text-slate-900">More jobs for you</h3>
            <p className="text-xs text-slate-500">
              Based on your profile, NCVET credits, and activity like applies & saves
            </p>
          </div>
          <span className="text-xs font-bold text-blue-700">{filteredJobs.length} listings</span>
        </div>

        {/* Job Listings Feed */}
        <div className="divide-y divide-slate-100 bg-white">
          {filteredJobs.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500">
              No matching jobs found. Try adjusting your search query.
            </div>
          ) : (
            filteredJobs.map((job) => (
              <div
                key={job.id}
                onClick={() => setSelectedJob(job)}
                className="p-4 hover:bg-slate-50/80 cursor-pointer transition-colors flex items-start justify-between gap-3 group"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-700 shrink-0 text-sm shadow-xs group-hover:border-blue-300 transition-colors">
                    <Building2 className="w-5 h-5 text-blue-800" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-blue-700 transition-colors leading-tight">
                        {job.title}
                      </h4>
                      {job.verified && (
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 fill-blue-50" />
                      )}
                    </div>
                    <div className="text-xs text-slate-600 font-medium">
                      {job.company}
                    </div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-2">
                      <span>{job.location}</span>
                      <span>•</span>
                      <span>{job.postedAgo}</span>
                    </div>
                    {job.promoted && (
                      <span className="inline-block text-[10px] font-semibold text-slate-400">
                        Promoted
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={(e) => toggleSaveJob(job.id, e)}
                  className="p-1.5 rounded-full hover:bg-slate-200/60 text-slate-400 hover:text-slate-700 transition-colors"
                >
                  <Bookmark className={`w-4 h-4 ${savedJobs.includes(job.id) ? 'fill-blue-700 text-blue-700' : ''}`} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Centered Modal Structure */}
        {selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto">
            <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
              
              {/* Modal Header */}
              <div className="p-4 sm:px-6 border-b border-slate-200 flex items-center justify-between bg-white sticky top-0 z-10">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                  <Briefcase className="w-4 h-4 text-blue-700" />
                  <span>Job Details</span>
                </div>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Modal Body */}
              <div className="p-6 overflow-y-auto space-y-5">
                <div>
                  <div className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-1">
                    {selectedJob.company}
                  </div>
                  <h2 className="text-xl font-extrabold text-slate-900 leading-snug">
                    {selectedJob.title}
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    {selectedJob.location} • {selectedJob.postedAgo} • {selectedJob.applicantCount}
                  </p>
                </div>

                <div className="inline-block bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                  {selectedJob.type} {selectedJob.stipend ? `• ${selectedJob.stipend}` : ''}
                </div>

                {/* AI Fit Assessment */}
                <div className="space-y-2">
                  <div className="text-xs font-bold text-slate-800">Use AI to assess how you fit</div>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors bg-white shadow-xs">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      Show match details
                    </button>
                    <button className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors bg-white shadow-xs">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                      Help me stand out
                    </button>
                  </div>
                </div>

                {/* Match Details */}
                <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                    <span>APAAR & NCVET Match Score</span>
                    <span className="text-emerald-700 font-mono">{selectedJob.matchScore}% Match</span>
                  </div>
                  <ul className="space-y-1 text-xs text-slate-600">
                    {selectedJob.matchDetails.map((detail, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-slate-900">About the job</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {selectedJob.aboutCompany}
                  </p>
                </div>

                {/* Alert Toggle */}
                <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 bg-white">
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-slate-900">Set alert for similar jobs</div>
                    <div className="text-[11px] text-slate-500">{selectedJob.title}, {selectedJob.location}</div>
                  </div>
                  <button
                    onClick={() => toggleAlert(selectedJob.title)}
                    className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                      jobAlerts[selectedJob.title] ? 'bg-blue-700 justify-end' : 'bg-slate-300 justify-start'
                    }`}
                  >
                    <div className="w-4 h-4 rounded-full bg-white shadow-md" />
                  </button>
                </div>

                {/* Resume Review Card */}
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                  <div className="flex items-start gap-3">
                    <FileText className="w-6 h-6 text-blue-700 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Put your best foot forward with your application</h4>
                      <p className="text-[11px] text-slate-500">Get an automated AI resume audit against this posting.</p>
                    </div>
                  </div>
                  <button className="w-full py-2 bg-white border border-slate-300 hover:border-slate-400 text-blue-700 font-bold text-xs rounded-lg transition-colors">
                    Get a resume review
                  </button>
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="p-4 sm:px-6 border-t border-slate-200 bg-slate-50/50 flex items-center gap-3">
                <button className="flex-1 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs py-3 rounded-full transition-all shadow-sm flex items-center justify-center gap-1.5 active:scale-95">
                  Apply <ExternalLink className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => toggleSaveJob(selectedJob.id)}
                  className="flex-1 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs py-3 rounded-full transition-all flex items-center justify-center gap-1.5"
                >
                  <Bookmark className={`w-3.5 h-3.5 ${savedJobs.includes(selectedJob.id) ? 'fill-blue-700 text-blue-700' : ''}`} />
                  {savedJobs.includes(selectedJob.id) ? 'Saved' : 'Save'}
                </button>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OpportunitiesTab;