import { ReportCharts } from "../Charts/ReportCharts";
import type { FeedbackItem } from "../buttons/BtnGenerateReport";
import { ErrorText } from "../../ui/form/ErrorText";
import { InlineLoader } from "../Loader";
import { Search } from "lucide-react";

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
        return (
            <div className="w-full flex flex-col items-center justify-center text-center m-9">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                <Search size={22} className="text-gray-400" />
                </div>

                <p className="text-sm font-medium text-gray-700">
                No Reports found
                </p>

                <p className="mt-1 text-xs text-gray-400">
                Try changing the filter or check back later.
                </p>
            </div>
        );
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