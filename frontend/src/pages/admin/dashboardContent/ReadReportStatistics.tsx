import { useState } from "react";
import { BarChart3, LineChart } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { RenderReportStatistics } from "./RenderStatistics";
import { RenderReportStatisticsTable } from "./RenderReportStatisticsTable";
import { useGetReportStatistics } from "../../../hooks/useGetReportStatistics";
import { RenderReportStatisticsDatePicker } from "./RenderReportStatisticsDatePicker";

type ChartData = {
    name: string;
    value: number;
};

export type Chart = {
    title: string;
    data: ChartData[];
};

export type RenderReportStatisticsProps = {
    currentGraph: number;
    chartsDataArray: Chart[];
};

export type RenderReportStatisticsTableProps = {
    chartsDataArray: Chart[];
};

export type RenderReportStatisticsDatePickerProps = {
    officeCode: string;
    month: number;
    year: number;
    startDate: string;
    endDate: string;
};

export const ReadReportStatistics = () => {
    const { user } = useAuth();

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const lastDayOfMonth = new Date(year, month, 0).getDate();

    const [currentGraph, setCurrentGraph] = useState<number>(0);

    const startDate = `${year}-${String(month).padStart(2, "0")}-01`;
    const endDate = `${year}-${String(month).padStart(2, "0")}-${String(
        lastDayOfMonth
    ).padStart(2, "0")}`;

    const officeCode = user?.officeCode ?? "";

    const { data: stats, isLoading, error } = useGetReportStatistics(
        officeCode,
        startDate,
        endDate
    );

    if (isLoading) return <>Loading....</>;
    if (error) return <>Something error</>;

    const createClientChartData = (
        key: "gender" | "ageGroup" | "employmentStatus" | "affiliation"
    ) => {
        const counts: Record<string, number> = {};

        stats?.feedbacks.forEach((feedback) => {
            const value = feedback.client?.[key];

            if (value) {
                counts[value] = (counts[value] || 0) + 1;
            }
        });

        return Object.entries(counts).map(([name, value]) => ({
            name,
            value,
        }));
    };

    const genderChartData = createClientChartData("gender");
    const ageGroupChartData = createClientChartData("ageGroup");
    const employmentStatusChartData =
        createClientChartData("employmentStatus");
    const affiliationChartData = createClientChartData("affiliation");

    const chartsDataArray = [
        {
            title: "Gender",
            data: genderChartData,
        },
        {
            title: "Age Group",
            data: ageGroupChartData,
        },
        {
            title: "Employment Status",
            data: employmentStatusChartData,
        },
        {
            title: "Affiliation",
            data: affiliationChartData,
        },
    ];

    const isLineChart = currentGraph === 0;

    const handleGraphToggle = () => {
        setCurrentGraph((prev) => (prev === 0 ? 1 : 0));
    };

    return (
        <div className="w-full">
            <div className="mb-5 flex items-center justify-between border-b border-gray-300">
                <div className="mb-4">
                    <h1 className="text-xl font-semibold text-gray-900">
                        Report Statistics
                    </h1>

                    <p className="mt-0.5 text-sm text-gray-500">
                        View and compare client feedback statistics.
                    </p>
                </div>

                {/* Chart Type Switch */}
                <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-600">
                        Chart type
                    </span>

                    <button
                        type="button"
                        role="switch"
                        aria-checked={isLineChart}
                        aria-label="Toggle chart type"
                        onClick={handleGraphToggle}
                        className="group flex items-center gap-1 rounded-full border border-gray-200 bg-gray-100 p-1 shadow-sm transition-colors hover:bg-gray-200 cursor-pointer"
                    >
                        {/* Line Chart */}
                        <span
                            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-all ${
                                isLineChart
                                    ? "bg-white text-blue-600 shadow-sm"
                                    : "text-gray-500"
                            }`}
                        >
                            <LineChart className="h-4 w-4" />
                            Line
                        </span>

                        {/* Bar Chart */}
                        <span
                            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-all ${
                                !isLineChart
                                    ? "bg-white text-blue-600 shadow-sm"
                                    : "text-gray-500"
                            }`}
                        >
                            <BarChart3 className="h-4 w-4" />
                            Bar
                        </span>
                    </button>
                </div>
            </div>

            <div className="flex w-full gap-4">
                <div className="w-2/3">
                    <RenderReportStatistics
                        currentGraph={currentGraph}
                        chartsDataArray={chartsDataArray}
                    />
                </div>

                <div className="min-w-0 flex-1">
                    <RenderReportStatisticsDatePicker
                        officeCode={officeCode}
                        month={month}
                        year={year}
                        startDate={startDate}
                        endDate={endDate}
                    />
                </div>
            </div>

            <RenderReportStatisticsTable
                chartsDataArray={chartsDataArray}
            />
        </div>
    );
};
