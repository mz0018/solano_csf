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