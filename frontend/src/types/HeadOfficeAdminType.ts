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