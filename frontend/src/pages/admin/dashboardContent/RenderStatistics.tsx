import type { RenderReportStatisticsProps } from "./ReadReportStatistics";
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
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
                    className="min-w-0 rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
                >
                    <h2 className="mb-5 text-base font-semibold text-slate-700">
                        {chart.title}
                    </h2>

                    <div className="h-[280px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            {currentGraph === 0 ? (
                                <LineChart
                                    data={chart.data}
                                    margin={{
                                        top: 5,
                                        right: 10,
                                        left: -15,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid
                                        stroke="#E2E8F0"
                                        strokeDasharray="3 3"
                                        vertical={false}
                                    />

                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{
                                            fill: "#64748B",
                                            fontSize: 12,
                                        }}
                                    />

                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{
                                            fill: "#64748B",
                                            fontSize: 12,
                                        }}
                                    />

                                    <Tooltip
                                        contentStyle={{
                                            border: "1px solid #E2E8F0",
                                            borderRadius: "6px",
                                            backgroundColor: "#fff",
                                            padding: "8px 10px",
                                        }}
                                        labelStyle={{
                                            color: "#334155",
                                            fontWeight: 600,
                                        }}
                                    />

                                    <Line
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#2563EB"
                                        strokeWidth={2}
                                        dot={{
                                            r: 3,
                                            fill: "#fff",
                                            stroke: "#2563EB",
                                            strokeWidth: 2,
                                        }}
                                    />
                                </LineChart>
                            ) : (
                                <BarChart
                                    data={chart.data}
                                    margin={{
                                        top: 5,
                                        right: 10,
                                        left: -15,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid
                                        stroke="#E2E8F0"
                                        strokeDasharray="3 3"
                                        vertical={false}
                                    />

                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{
                                            fill: "#64748B",
                                            fontSize: 12,
                                        }}
                                    />

                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{
                                            fill: "#64748B",
                                            fontSize: 12,
                                        }}
                                    />

                                    <Tooltip
                                        contentStyle={{
                                            border: "1px solid #E2E8F0",
                                            borderRadius: "6px",
                                            backgroundColor: "#fff",
                                            padding: "8px 10px",
                                        }}
                                        labelStyle={{
                                            color: "#334155",
                                            fontWeight: 600,
                                        }}
                                    />

                                    <Bar
                                        dataKey="value"
                                        fill="#2563EB"
                                        radius={[3, 3, 0, 0]}
                                        maxBarSize={45}
                                    />
                                </BarChart>
                            )}
                        </ResponsiveContainer>
                    </div>
                </div>
            ))}
        </div>
    );
};
