export interface ILead {
  id: number;
  revNumber: number;
  revId: number;
  salutation: string | null;
  companyName: string | null;
  firstName: string | null;
  LastName: string | null;
  department: string | null;
  email: string | null;
  mobile: string | null;
  addressLine1: string | null;
  addressLine2: string | null;
  addressLine3: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  postalCode: string | null;
  region: string | null;
  website: string | null;
  industries: string | null;
  projectName: string | null;
  clientName: string | null;
  lastResearchDate: string | null;
  submissionDate: string | null;
  uploadDate: string | null;
  validationMethod: string | null;
  verificationStatus: string | null;
  remark: string | null;
}