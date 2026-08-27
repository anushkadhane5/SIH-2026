export type DomainRole = 'tech' | 'medical' | 'finance' | 'law';

export interface UserTargetGoal {
  targetRole: string; // e.g. "Frontend Developer", "Clinical Resident", "Tax Consultant"
  targetCompany?: string; // e.g. "Google", "AIIMS", "Deloitte"
  domain: DomainRole;
}

export interface RecommendedCourse {
  id: string;
  title: string;
  provider: string;
  domain: DomainRole;
  duration: string;
  rating: number;
  studentsEnrolled: string;
  imageUrl: string;
  skillsTaught: string[];
  progressPercent?: number;
  isEnrolled?: boolean;
}