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
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {chartsDataArray.map((chart) => (
                <div
                    key={chart.title}
                    className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-md sm:p-6"
                >
                    <h2 className="mb-6 text-lg font-bold tracking-tight text-slate-800">
                        {chart.title}
                    </h2>

                    <div className="h-[280px] w-full sm:h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            {currentGraph === 0 ? (
                                <LineChart
                                    data={chart.data}
                                    margin={{
                                        top: 10,
                                        right: 15,
                                        left: -10,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid
                                        stroke="#E2E8F0"
                                        strokeDasharray="4 4"
                                        vertical={false}
                                    />

                                    <XAxis
                                        dataKey="name"
                                        axisLine={{
                                            stroke: "#CBD5E1",
                                        }}
                                        tickLine={false}
                                        tick={{
                                            fill: "#64748B",
                                            fontSize: 12,
                                            fontWeight: 500,
                                        }}
                                        dy={10}
                                    />

                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{
                                            fill: "#64748B",
                                            fontSize: 12,
                                            fontWeight: 500,
                                        }}
                                    />

                                    <Tooltip
                                        cursor={{
                                            stroke: "#94A3B8",
                                            strokeWidth: 1,
                                        }}
                                        contentStyle={{
                                            backgroundColor: "#FFFFFF",
                                            border: "1px solid #CBD5E1",
                                            borderRadius: "8px",
                                            boxShadow:
                                                "0 8px 20px rgba(15, 23, 42, 0.10)",
                                            padding: "10px 14px",
                                        }}
                                        labelStyle={{
                                            color: "#334155",
                                            fontWeight: 700,
                                            marginBottom: "4px",
                                        }}
                                        itemStyle={{
                                            color: "#1E3A5F",
                                            fontWeight: 600,
                                        }}
                                    />

                                    <Line
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#1E40AF"
                                        strokeWidth={4}
                                        dot={{
                                            r: 4,
                                            fill: "#FFFFFF",
                                            stroke: "#1E40AF",
                                            strokeWidth: 3,
                                        }}
                                        activeDot={{
                                            r: 6,
                                            fill: "#1E40AF",
                                            stroke: "#FFFFFF",
                                            strokeWidth: 3,
                                        }}
                                    />
                                </LineChart>
                            ) : (
                                <BarChart
                                    data={chart.data}
                                    margin={{
                                        top: 10,
                                        right: 15,
                                        left: -10,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid
                                        stroke="#E2E8F0"
                                        strokeDasharray="4 4"
                                        vertical={false}
                                    />

                                    <XAxis
                                        dataKey="name"
                                        axisLine={{
                                            stroke: "#CBD5E1",
                                        }}
                                        tickLine={false}
                                        tick={{
                                            fill: "#64748B",
                                            fontSize: 12,
                                            fontWeight: 500,
                                        }}
                                        dy={10}
                                    />

                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{
                                            fill: "#64748B",
                                            fontSize: 12,
                                            fontWeight: 500,
                                        }}
                                    />

                                    <Tooltip
                                        cursor={{
                                            fill: "#F1F5F9",
                                        }}
                                        contentStyle={{
                                            backgroundColor: "#FFFFFF",
                                            border: "1px solid #CBD5E1",
                                            borderRadius: "8px",
                                            boxShadow:
                                                "0 8px 20px rgba(15, 23, 42, 0.10)",
                                            padding: "10px 14px",
                                        }}
                                        labelStyle={{
                                            color: "#334155",
                                            fontWeight: 700,
                                            marginBottom: "4px",
                                        }}
                                        itemStyle={{
                                            color: "#1E3A5F",
                                            fontWeight: 600,
                                        }}
                                    />

                                    <Bar
                                        dataKey="value"
                                        fill="#1E40AF"
                                        radius={[5, 5, 0, 0]}
                                        maxBarSize={55}
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