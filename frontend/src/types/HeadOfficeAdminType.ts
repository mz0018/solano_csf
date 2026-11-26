/**getTotalServiceRenderedByDateService types */
type RenderedService = {
    _id: string;
    generatedBy: string;
    generatedByUser: {
        firstName: string;
        lastName: string;
    } | null;
    selectedService: string[];
    createdAt: string;
};

export type TotalServiceRenderedResponse = {
    data: RenderedService[];
    serviceCounts: Record<string, number>;
    total: number;
    page: number;
    limit: number;
    totalPages: number;
};

/**getServicesByOfficeService types */
export type ListOfServicesResponse = {
  _id: string
  code: string
  name: string
  status: string
  type: string
}

/**generatedQrCodeResponse types */
export type GeneratedQrCodeResponse = {
  ticket: {
    code: string
    createdAt: string
    generatedBy: string
    officeCode: string
    selectedService: string[]
    status: string
    updatedAt: string
    _id: string
    otherServiceDetail?: string | null
  }
  qrCode: string
}

/**generateNewTicketService types */
export type NewTicketRequest = {
  selectedService: string[]
  otherServiceDetail?: string
  selectedChildServices?: string
}

export type NewTicketResponse = {
  selectedService: string[]
  selectedChildService?: string[]
  otherServiceDetail: string
  officeCode: string
  code: string
  status: string
  generatedBy: string
  _id: string
  createdAt: string
  updatedAt: string
}

/**registerNewOfficeServiceService types */
export type ServiceType = "external" | "internal" | "";

export type NewServiceRequest = {
  serviceName: string;
  serviceType: ServiceType;
};

/**updateRegisteredOfficeServiceService */
type ServiceStatusType = "active" | "inactive";

export type UpdateServiceRequest = {
  serviceId: string;
  serviceStatus: ServiceStatusType
}

/**updateRegisteredOfficeServiceService */
export type UpdatePartialServiceRequest = {
  service: ListOfServicesResponse;
  edited: Partial<Pick<ListOfServicesResponse, "name" | "type" >>;
}

/**ViewServiceModal Type */
export type ServiceDraft = Pick<ListOfServicesResponse, "name" | "type"> & 
  Pick<UpdateServiceRequest, "serviceId" >
