import type { RenderReportStatisticsProps } from "./ReadReportStatistics";
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";

export const RenderReportStatistics = ({
    currentGraph,
    chartsDataArray,
}: RenderReportStatisticsProps) => {
    return (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {chartsDataArray.map((chart) => (
                <div
                    key={chart.title}
                    className="rounded-lg border bg-white p-5 shadow-sm"
                >
                    <h2>{chart.title}</h2>

                    {currentGraph === 0 && (
                        <LineChart
                            width={400}
                            height={300}
                            data={chart.data}
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
                            data={chart.data}
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
                </div>
            ))}
        </div>
    );
};
