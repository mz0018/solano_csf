import type { 
    ActiveQueueResponse, 
    ReportStatisticsResponse, 
    UserProfileResponse,
    LoginHistoryResponse,
    NotificationsResponse,
    UserChangePasswordRequest,
    UserChangePasswordResponse,
    DetailedFeedbackByCodeResponse,
} from '../types/OfficeAdminType';

export const getReportStatisticService = async (page: number = 1, statusFilter: string = ""): Promise<ActiveQueueResponse> => {

    const params = new URLSearchParams({
        page: String(page),
        limit: String(10),
    });

    if (statusFilter) {
        params.set("status", statusFilter);
    }

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/active-queue?${params}`,
                { credentials: "include" }
            );
    
            if (!res.ok) {
                throw new Error('Failed to fetch report response statistics on service.')
            }

            return res.json();
        } catch (err) {
            console.error('Failed to fetch report statistics on service. ', err);
            throw err;
        }
}

export const getReportStatisticByDateService = async (officeCode: string, dateFrom: string, dateTo: string): Promise<ReportStatisticsResponse> => {

    const params = new URLSearchParams({
        officeCode,
        dateFrom,
        dateTo,
    });

    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/report-statistics?${params}`,
            { credentials: "include" }
        );

        if (!res.ok) {
            throw new Error('Failed to fetch report response statistics by date on service.')
        }

        return res.json();
    } catch (err) {
        console.error('Failed to fetch report statistics by date on service. ', err);
        throw err;
    }
}

export const getUserProfileInformationService = async (): Promise<UserProfileResponse> => {
    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/verify`, {
            credentials: "include",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch profile information response on service.");
        }

        return res.json();
    } catch (err) {
        console.error('Failed to fetch user profile information on service. ', err);
        throw err;
    }
}

export const getUserLoginHistoryService = async (page: number = 1, limit: number = 5): Promise<LoginHistoryResponse> => {

    const params = new URLSearchParams({ 
        page: String(page), 
        limit: String(limit) 
    });

    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/login-history?${params}`, 
            { credentials: 'include' }
        );

        if (!res.ok) {
            throw new Error('Failed to fetch user login history response on service.')
        }

        return res.json();

    } catch (err) {
        console.error('Failed to fetch user login history on service. ', err);
        throw err;
    }
}

export const getUserNotificationService = async (): Promise<NotificationsResponse> => {
    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/notifications`,
            { credentials: "include" }
        );

        if (!res.ok) {
            throw new Error("Failed to fetch user notification response on service.");
        }

        return res.json();
    } catch (err) {
        console.error('Failed to fetch user notification on service.', err);
        throw err;
    }
}

export const getDetailedFeedbackByCodeService = async (code: string): Promise<DetailedFeedbackByCodeResponse> => {
    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/feedback/${code}`,
            { credentials: "include" }
        );

        if (!res.ok) {
            throw new Error("Failed to fetch detailed feedback response on service.");
        }

        return res.json();

    } catch (err) {
        console.error('Failed to fetch detailed feedback on service.', err);
        throw err;
    }
}

export const updateUserPasswordService = async ({ currentPassword, newPassword}: UserChangePasswordRequest): Promise<UserChangePasswordResponse> => {
    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/change-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ currentPassword, newPassword })
        });

        if (!res.ok) {
            throw new Error("Failed to update user password response on service.");
        }

        return res.json();

    } catch (err) {
        console.error('Failed to update user password on service.', err);
        throw err;
    }
}