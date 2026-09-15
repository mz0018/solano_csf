import { useState } from "react";
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
    setStartDate: (date: string) => void;
    setEndDate: (date: string) => void;
};

export const ReadReportStatistics = () => {
    const { user } = useAuth();

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const lastDayOfMonth = new Date(year, month, 0).getDate();

    const typeOfGraph = ["lineGraph", "barGraph"];

    const [currentGraph, setCurrentGraph] = useState<number>(0);

    const handleChangeGraph = () => {
        setCurrentGraph((prev) => (prev + 1) % typeOfGraph.length);
    };

    const [startDate, setStartDate] = useState(
        `${year}-${String(month).padStart(2, "0")}-01`
    );

    const [endDate, setEndDate] = useState(
        `${year}-${String(month).padStart(2, "0")}-${String(lastDayOfMonth).padStart(2, "0")}`
    );

    const officeCode = user?.officeCode ?? "";

    const { data: stats, isLoading, error } = useGetReportStatistics(officeCode,startDate,endDate);

    if (isLoading) return <>Loading....</>;
    if (error) return <>Something error</>;

    const createClientChartData = (key: "gender" | "ageGroup" | "employmentStatus" | "affiliation") => {
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
    const employmentStatusChartData = createClientChartData("employmentStatus");
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

    return (
        <>
            <h1>Read Report Statistics</h1>

            

            <button onClick={handleChangeGraph}>
                Change {typeOfGraph[currentGraph]}
            </button>

            <div className="flex gap-4">
                <div>
                    <RenderReportStatistics
                        currentGraph={currentGraph}
                        chartsDataArray={chartsDataArray}
                    />
                </div>

                <div>
                    <RenderReportStatisticsDatePicker
                        officeCode={officeCode}
                        month={month}
                        year={year}
                        startDate={startDate}
                        endDate={endDate}
                        setStartDate={setStartDate}
                        setEndDate={setEndDate}
                    />
                </div>
            </div>

            

            <RenderReportStatisticsTable
                chartsDataArray={chartsDataArray}
            />
            
        </>
    );
};
