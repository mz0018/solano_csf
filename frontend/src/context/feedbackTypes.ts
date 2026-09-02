export interface VerifiedQueue {
  code?: string
  officeCode?: string
  services?: { code: string; name: string }[]
}

export interface FeedbackFormData {
  queueNumber: string;
  clientName?: string;
  contactNumber?: string;
  gender: string;
  comments?: string;
  service: string;
  affiliation: string;
  ageGroup: string;
  employmentStatus: string;
  address: string;
  barangay?: string;
  region?: string;
  province?: string;
  municipality?: string;
  addressDetail?: string;
  responsiveness: number;
  reliability: number;
  accessFacilities: number;
  communication: number;
  costs: number;
  integrity: number;
  assurance: number;
  outcome: number;
}

export interface FeedbackContextType {
  verified: VerifiedQueue | null
  setVerified: (data: VerifiedQueue) => void
  reset: () => void
  formData: Partial<FeedbackFormData>
  updateFormData: (partial: Record<string, unknown>) => void
}
