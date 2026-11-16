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