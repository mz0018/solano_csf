// /**getSuperAdminClientService */
// export type SuperAdminClientResponse = {
//     _id: string
//     firstName: string
//     lastName: string
//     userName: string
//     officeCode: string
//     role: string
//     createdAt: string
// }

/**getSuperAdminTicketTrackerService */
export type TicketTrackerResponse = {
    tickets: Array<{
        _id: string;
        code: string;
        status: string;
        createdAt: string;
        generatedBy: { _id: string; firstName: string; lastName: string; userName: string } | null;
    }>;
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    officeCode: string;
    date: string;
};

export type TicketTrackerRequest = {
    officeCode: string;
    dateFrom: string;
    page: number;
    limit: number;
}