export type StudentDomain = 'tech' | 'medical' | 'finance' | 'law' | 'creative';

export type SkillStatus = 'TEST_VERIFIED' | 'PROJECT_VERIFIED' | 'ASSESSMENT_VERIFIED' | 'NEEDS_VERIFICATION' | 'SELF_DECLARED';

export interface SkillItem {
  id: string;
  name: string;
  category: string;
  domain: StudentDomain;
  score: number;
  status: SkillStatus;
  issuer?: string;
}

export interface CertificateItem {
  id: string;
  title: string;
  issuingOrganization: string;
  issueDate: string;
  isApaarSynced: boolean;
  domain: StudentDomain;
}