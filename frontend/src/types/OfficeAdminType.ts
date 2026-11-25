/** getReportStatisticService types */
type ActiveQueue = {
  _id: string;
  code: string;
  status: string;
  selectedService: string[];
};

export type ActiveQueueResponse = {
  queue: ActiveQueue[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  date: string;
  status: {
    expired: number;
    pending: number;
    used: number;
  };
};

/** getReportStatisticByDate types */
type ReportStatisticsRatings = {
  accessFacilities: number;
  assurance: number;
  communication: number;
  costs: number;
  integrity: number;
  outcome: number;
  reliability: number;
  responsiveness: number;
}

interface ReportStatisticsFeedbackItem {
  _id: string;
  service: string | string[];
  comments: string;
  client: {
    address: string;
    affiliation: string;
    ageGroup: string;
    employmentStatus: string;
    gender: string;
  };
  ratings: ReportStatisticsRatings
  createdAt: Date;
}

type ReportStatisticsServiceTransaction = {
    service: string;
    totalTransactions: number;
};

type ReportService = {
  service: string;
  type: string;
};

export type ReportStatisticsResponse = {
    totalFeedbacks: number;
    feedbacks: ReportStatisticsFeedbackItem[];
    serviceTransactions: ReportStatisticsServiceTransaction[];
    services: ReportService[];
    office: { code: string; name: string };
    dateFrom: string;
    dateTo: string;
};

/**getUserProfileInformationService types */
export type UserProfileResponse = {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    userName: string;
    role: string;
    officeCode: string;
  };
};

/**updateUserPasswordService types */
export type UserChangePasswordRequest = {
  currentPassword: string;
  newPassword: string;
}

export type UserChangePasswordResponse = {
  message: string;
};

/**getUserLoginHistoryService types */
type LoginHistoryEntry = {
  ip: string;
  userAgent: string;
  loginAt: string;
  success: boolean;
};

export type LoginHistoryResponse = {
  history: LoginHistoryEntry[];
  total: number;
  totalPages: number;
  page: number;
};

/**getUserNotificationService types */
type Notification = {
  _id: string;
  type: string;
  content: string;
  createdAt: string;
};

export type NotificationsResponse = {
  notifications: Notification[];
};

/** getDetailedFeedbackByCodeService types */
export interface DetailedFeedbackByCodeResponse {
  // _id: string;
  queue: DetailedFeedbackQueue;
  feedback: DetailedFeedback;
}

export interface DetailedFeedbackQueue {
  code: string;
  otherServiceDetail: string | null;
}

export interface DetailedFeedback {
  client: DetailedFeedbackClient;
  comments: string;
  otherServiceDetail: string | null;
  ratings: ReportStatisticsRatings;
  service: string;
}

export interface DetailedFeedbackClient {
  name: string;
  gender: string;
  employmentStatus: string;
  address: string;
}