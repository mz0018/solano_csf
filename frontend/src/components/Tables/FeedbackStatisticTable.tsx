import { ReportCharts } from "../Charts/ReportCharts";
import type { FeedbackItem } from "../buttons/BtnGenerateReport";
import { ErrorText } from "../../ui/form/ErrorText";
import { InlineLoader } from "../Loader";

type ReportStatistics = {
    totalFeedbacks: number;
    feedbacks: FeedbackItem[];
    serviceTransactions: { service: string; totalTransactions: number }[];
    services: ReportService[];
    office: { code: string; name: string };
    dateFrom: string;
    dateTo: string;
};

type ReportService = {
  service: string;
  type: string;
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
            <div className="p-9 flex w-full flex-col items-center justify-center overflow-x-auto rounded-md border border-slate-200/80 bg-white text-center">
                <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 sm:h-16 sm:w-16 md:h-18 md:w-18">
                <img src="/icons/piechart.svg" alt="" className="h-[32px] w-[32px] sm:h-[36px] sm:w-[36px]" />
                </div>

                <p className="text-sm font-medium text-gray-700 block text-base font-semibold text-slate-500 sm:text-lg lg:text-xl">
                No Reports found
                </p>

                <p className="mt-1 text-xs md:text-sm text-gray-400">
                Try changing the filter or check back later.
                </p>
            </div>
        );
    }

    return (
        <div className="flex w-full flex-col items-start justify-start overflow-x-auto rounded-md border border-slate-200/80 bg-white text-center p-2">
            <p className="text-sm text-gray-600 mb-2">
                Total Feedbacks: <span className="font-semibold">{stats.totalFeedbacks}</span>
            </p>
            <div>
                <ReportCharts 
                    feedback={stats.feedbacks} 
                    selectedOfficeName={stats.office?.name ?? ''}
                    selectedDateFrom={stats.dateFrom}
                    selectedDateTo={stats.dateTo}
                    serviceTransactions={stats.serviceTransactions} 
                    services={stats.services}
                />
            </div>
        </div>
    );
};