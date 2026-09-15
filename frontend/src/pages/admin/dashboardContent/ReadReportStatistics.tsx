import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useGetReportStatistics } from "../../../hooks/useGetReportStatistics";

import { LineChart,Line,BarChart,Bar,XAxis,YAxis,Tooltip } from "recharts";

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

    const startDate = `${year}-${String(month).padStart(2, "0")}-01`;
    const endDate = `${year}-${String(month).padStart(2, "0")}-${String(lastDayOfMonth).padStart(2, "0")}`;

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

    return (
        <>
            <h1>ReadReportStatistics</h1>

            <ul>
                <li>Office code: {officeCode}</li>
                <li>Month: {month}</li>
                <li>Year: {year}</li>
                <li>Start date: {startDate}</li>
                <li>End date: {endDate}</li>
            </ul>

            <button onClick={handleChangeGraph}>
                Change {typeOfGraph[currentGraph]}
            </button>

            {currentGraph === 0 && (
                <LineChart
                    width={400}
                    height={300}
                    data={genderChartData}
                >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />

                    <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#3B82F6"
                    />
                </LineChart>
            )}

            {currentGraph === 1 && (
                <BarChart
                    width={400}
                    height={300}
                    data={genderChartData}
                >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />

                    <Bar
                        dataKey="value"
                        fill="#3B82F6"
                    />
                </BarChart>
            )}
        </>
    );
};
