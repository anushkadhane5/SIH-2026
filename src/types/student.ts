export type StudentDomain = 'tech' | 'medical' | 'finance' | 'law' | 'creative';

export type VerificationStatus = 'SELF_DECLARED' | 'TEST_VERIFIED' | 'EVIDENCE_VERIFIED';

export interface SkillItem {
  id: string;
  name: string;
  category: string;
  domain: StudentDomain;
  score: number; // 0 to 100
  status: VerificationStatus;
  issuer?: string;
  verifiedAt?: string;
}

export interface CertificateItem {
  id: string;
  title: string;
  issuingOrganization: string;
  issueDate: string;
  credentialId?: string;
  fileUrl?: string;
  isApaarSynced: boolean;
  domain: StudentDomain;
}