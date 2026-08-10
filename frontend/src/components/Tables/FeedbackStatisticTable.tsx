import { ReportCharts } from "../Charts/ReportCharts";
import type { FeedbackItem } from "../buttons/BtnGenerateReport";
import { ErrorText } from "../../ui/form/ErrorText";
import { InlineLoader } from "../Loader";

type ReportStatistics = {
    totalFeedbacks: number;
    feedbacks: FeedbackItem[];
    office: { code: string; name: string };
    dateFrom: string;
    dateTo: string;
};

type FeedbackStatisticTableProps = {
    stats?: ReportStatistics;
    isLoading: boolean;
    error: Error | null;
};

export const FeedbackStatisticTable = ({ stats, isLoading, error }: FeedbackStatisticTableProps) => {

    if (isLoading) {
        return <InlineLoader message="Loading statistics..." />;
    }

    if (error) {
        return <ErrorText message={error.message} />;
    }

    if (!stats || stats.totalFeedbacks === 0) {
        return <p className="mt-4 text-gray-500">No statistics available.</p>;
    }

    return (
        <>
            <p className="text-sm text-gray-600 mb-2">
                Total Feedbacks: <span className="font-semibold">{stats.totalFeedbacks}</span>
            </p>
            <div>
                <ReportCharts 
                    feedback={stats.feedbacks} 
                    selectedOfficeName={stats.office?.name ?? ''}
                    selectedDateFrom={stats.dateFrom}
                    selectedDateTo={stats.dateTo}
                />
            </div>
        </>
    );
};