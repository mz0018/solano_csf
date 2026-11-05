
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

const GRAPH_COLORS = [
    "#22C55E", // Vibrant green
    "#EA580C", // Bright orange
    "#2563EB", // Royal blue
    "#E11D48", // Rose red
    "#A3E635", // Lime green
    "#9333EA", // Vivid purple
    "#EAB308", // Bright yellow
    "#0D9488", // Teal
    "#EC4899", // Hot pink
    "#4F46E5", // Indigo
    "#D97706", // Amber
    "#16A34A", // Emerald
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
        () => shuffleColors(GRAPH_COLORS),
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
                        <small className="inline-flex max-w-full items-center rounded-full border border-slate-200 px-3 py-1.5 text-xs font-light text-[#003566] sm:text-sm mb-9">
                            {chart.title}
                        </small>

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
