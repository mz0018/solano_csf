/**getTotalServiceRenderedByDateService */
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

/**getServicesByOfficeService */
export type ListOfServicesResponse = {
  _id: string
  code: string
  name: string
  status: string
  type: string
}

/**GeneratedQrCodeResponse */
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