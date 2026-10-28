
import { useMemo } from "react";
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

const MATTE_COLORS = [
    "#8FA8A0", // Sage green
    "#B7795B", // Terracotta
    "#8E9DB5", // Muted blue
    "#C49A8A", // Dusty rose
    "#A3A380", // Olive
    "#A69CAC", // Muted lavender
    "#C2A878", // Matte gold
    "#7F9C96", // Eucalyptus
    "#B58B8B", // Dusty pink
    "#8996A8", // Slate blue
    "#B5A08B", // Sand
    "#9AAB8A", // Soft moss
];

const shuffleColors = (colors: string[]) => {
    const shuffled = [...colors];

    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
};

export const RenderReportStatistics = ({
    currentGraph,
    chartsDataArray,
}: RenderReportStatisticsProps) => {
    const chartColors = useMemo(
        () => shuffleColors(MATTE_COLORS),
        [chartsDataArray]
    );

    return (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {chartsDataArray.map((chart, index) => {
                const color = chartColors[index % chartColors.length];

                return (
                    <div
                        key={chart.title}
                        className="min-w-0 p-5"
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
                                            stroke={color}
                                            strokeWidth={2}
                                            dot={{
                                                r: 3,
                                                fill: "#fff",
                                                stroke: color,
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
                                            fill={color}
                                            radius={[3, 3, 0, 0]}
                                            maxBarSize={45}
                                        />
                                    </BarChart>
                                )}
                            </ResponsiveContainer>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
