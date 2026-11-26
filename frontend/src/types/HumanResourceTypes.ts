
/** getFeedbackByOfficeAndDateRangeService */

export type FeedbackByOfficeAndDateRangeRequest = {
    officeCode: string;
    month: string;
    year: string;
    page: number;
    limit: number;
};

export type FeedbackByOfficeAndDateRangeRatings = {
    responsiveness: number;
    reliability: number;
    accessFacilities: number;
    communication: number;
    costs: number;
    integrity: number;
    assurance: number;
    outcome: number;
};

export type FeedbackByOfficeAndDateRangeItem = {
    _id: string;
    queueNumber: string;
    averageRating: number;
    createdAt: string;
    ratings: FeedbackByOfficeAndDateRangeRatings;
};

export type FeedbackByOfficeAndDateRangeResponse = {
    officeCode: string;
    month: string;
    year: string;
    page: string;
    limit: string;
    total: number;
    totalPages: number;
    feedbacks: FeedbackByOfficeAndDateRangeItem[];
};

/**getOfficeListService */
export type ListOfOfficeResponse = {
    code: string;
    name: string;
}