'use client';

import React, { useState } from 'react';
import { X, UserCheck, Briefcase, GraduationCap } from 'lucide-react';

export type UserRole = 'student' | 'recruiter' | 'faculty';

interface AuthModalProps {
  isOpen: boolean;
  initialRole?: UserRole;
  onClose: () => void;
  onSuccess: (userData: { name: string; role: UserRole; email: string }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, initialRole = 'student', onClose, onSuccess }) => {
  const [role, setRole] = useState<UserRole>(initialRole);
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess({
      name: name || (role === 'student' ? 'Aarav Sharma' : role === 'recruiter' ? 'Rajesh Verma (HR)' : 'Dr. S. K. Gupta'),
      role,
      email: email || `${role}@skillbridge.gov.in`
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1 text-center">
          <h2 className="text-xl font-bold text-slate-900">{isSignUp ? 'Create SkillBridge Account' : 'Welcome Back'}</h2>
          <p className="text-xs text-slate-500">Choose your role & authenticate with NCVET SSO</p>
        </div>

        {/* Role Selection Switcher */}
        <div className="grid grid-cols-3 gap-2 bg-slate-100 p-1 rounded-xl">
          {[
            { id: 'student', label: 'Student', icon: GraduationCap },
            { id: 'recruiter', label: 'Industry', icon: Briefcase },
            { id: 'faculty', label: 'Faculty', icon: UserCheck },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setRole(item.id as UserRole)}
              className={`py-2 flex flex-col items-center gap-1 rounded-lg text-xs font-semibold transition-all ${
                role === item.id ? 'bg-white text-blue-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                required
                placeholder="Enter full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-900"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Email / APAAR ID</label>
            <input
              type="text"
              required
              placeholder={role === 'student' ? 'apaar-id@gov.in or email' : 'official@company.com'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-900"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-2.5 rounded-lg text-xs transition-colors shadow-sm"
          >
            {isSignUp ? `Register as ${role.toUpperCase()}` : `Sign In as ${role.toUpperCase()}`}
          </button>
        </form>

        <div className="text-center pt-2">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-xs text-blue-900 font-semibold hover:underline"
          >
            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Register"}
          </button>
        </div>
      </div>
    </div>
  );
};