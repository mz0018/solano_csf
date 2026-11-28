export type FeedbackFormButtons = {
    onNext: () => void;
    onBack: () => void;
    onSubmit: (arg: string) => void;
    isLoading?: boolean;
}

export type FeedbackFormRatingKey = 
    | "responsiveness"
    | "reliability"
    | "accessFacilities"
    | "communication"
    | "costs"
    | "integrity"
    | "assurance"
    | "outcome";

export type FeedbackRating = {
    labelKey: FeedbackFormRatingKey;
    questionKey: string;
}

export type FeedbackRatingScale = {
    value: number;
    emoji: string;
    labelKey: string;
}

export type FeedbackFormResponse = {
  success?: boolean;
  queueNumber?: string;
}

export interface FeedbackFormRequest {
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
  barangay: string;
  addressDetail: string;
  responsiveness: number;
  reliability: number;
  accessFacilities: number;
  communication: number;
  costs: number;
  integrity: number;
  assurance: number;
  outcome: number;
}

export interface FeedbackVerifiedQueue {
  code?: string
  officeCode?: string
  selectedService?: string[]
  selectedChildService?: string[]
  services?: { code: string; name: string }[]
  source?: "HRMO"
}

export interface FeedbackContextType {
  verified: FeedbackVerifiedQueue | null
  setVerified: (data: FeedbackVerifiedQueue) => void
  reset: () => void
  formData: Partial<FeedbackFormRequest>
  updateFormData: (partial: Record<string, unknown>) => void
}

/**verifyQueueTicketService */
export type TicketVerificationResponse = {
  exists: boolean;
  officeCode: string;
  services: { 
    code: string;
    name: string;
  }[]
  selectedService: string;
  otherServiceDetail?: string | null;
  selectedChildService?: string | null;
}