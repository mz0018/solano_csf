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

    const {
        data: stats,
        isLoading,
        error,
    } = useGetReportStatistics(officeCode, startDate, endDate);

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

    // Line / Bar navigation tabs
    const chartTypeTabs = (
        <div
            className="flex items-center gap-1"
            role="group"
            aria-label="Chart type"
        >
            <button
                type="button"
                aria-pressed={isLineChart}
                onClick={() => {
                    if (!isLineChart) handleGraphToggle();
                }}
                className={`flex items-center gap-2 border-b-2 px-4 py-3 text-md sm:text-lg lg:text-xl font-medium transition-colors ${
                    isLineChart
                        ? "border-[#628dec] text-[#628dec]"
                        : "border-transparent text-slate-500 hover:text-slate-700"
                }`}
            >
                <LineChart className="h-4 w-4" />
                Line
            </button>

            <button
                type="button"
                aria-pressed={!isLineChart}
                onClick={() => {
                    if (isLineChart) handleGraphToggle();
                }}
                className={`flex items-center gap-2 border-b-2 px-4 py-3 text-md sm:text-lg lg:text-xl font-medium transition-colors ${
                    !isLineChart
                        ? "border-[#628dec] text-[#628dec]"
                        : "border-transparent text-slate-500 hover:text-slate-700"
                }`}
            >
                <BarChart3 className="h-4 w-4" />
                Bar
            </button>
        </div>
    );

    return (
        <div className="w-full">
            {/* Mobile Header */}
            <div className="mb-4 border-b border-gray-300 py-3 lg:hidden">
                <div className="mb-4">
                    <h1 className="text-lg font-semibold text-[#628dec]">
                        Report Statistics
                    </h1>

                    <p className="mt-1 text-sm text-gray-900">
                        View and compare client feedback statistics.
                    </p>
                </div>
            </div>

            {/* Chart and Date Picker */}
            <div className="flex w-full flex-col gap-4 lg:flex-row">
                {/* Chart with attached navigation tabs */}
                <div className="w-full lg:w-2/3">
                    <div className="overflow-hidden min-w-0 rounded-xl border border-gray-200 bg-white py-4 shadow-sm transition-shadow hover:shadow-md">
                        {/* Navigation Tabs */}
                        <div className=" border-slate-200 px-4">
                            {chartTypeTabs}
                        </div>

                        {/* Chart Content */}
                        <div className="p-4">
                            <RenderReportStatistics
                                currentGraph={currentGraph}
                                chartsDataArray={chartsDataArray}
                            />
                        </div>
                    </div>
                </div>

                {/* Date Picker */}
                <div className="min-w-0 w-full lg:flex-1">
                    <RenderReportStatisticsDatePicker
                        officeCode={officeCode}
                        month={month}
                        year={year}
                        startDate={startDate}
                        endDate={endDate}
                    />
                </div>
            </div>

            {/* Statistics Table */}
            <RenderReportStatisticsTable
                chartsDataArray={chartsDataArray}
            />
        </div>
    );
};