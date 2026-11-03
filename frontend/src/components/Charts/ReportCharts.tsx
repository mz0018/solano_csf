
import { useRef } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { CustomLegend } from "../../utils/CustomLegend";
import { useCaptureChart } from "../../hooks/useCaptureChart";
import {
    BtnGenerateReport,
    type FeedbackItem,
} from "../buttons/BtnGenerateReport";

type Client = {
    address: string;
    affiliation: string;
    ageGroup: string;
    employmentStatus: string;
    gender: string;
};

export type ReportChartsProps = {
    feedback: FeedbackItem[];
    selectedOfficeName: string;
    selectedDateFrom: string;
    selectedDateTo: string;
    serviceTransactions: {
        service: string;
        totalTransactions: number;
    }[];
    services: {
        service: string;
        type: string;
    }[];
};

const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#A855F7",
    "#EC4899",
    "#10B981",
    "#F97316",
];

export const ReportCharts = ({
    feedback,
    selectedOfficeName,
    selectedDateFrom,
    selectedDateTo,
    serviceTransactions,
    services,
}: ReportChartsProps) => {
    const chartRefs = useRef<(HTMLDivElement | null)[]>([]);
    const { handleCapture, isCapturing } = useCaptureChart();

    const createChartData = (key: keyof Client) => {
        return Object.entries(
            feedback.reduce((acc, item) => {
                const value = item.client[key];

                acc[value] = (acc[value] || 0) + 1;

                return acc;
            }, {} as Record<string, number>)
        ).map(([name, value]) => ({
            name,
            value,
        }));
    };

    const createChartDescription = (
        title: string,
        data: { name: string; value: number }[]
    ) => {
        if (data.length === 0) {
            return (
                <>No {title.toLowerCase()} feedback is available for this report.</>
            );
        }

        const total = data.reduce((sum, item) => sum + item.value, 0);
        const leadingEntry = data.reduce((current, item) =>
            item.value > current.value ? item : current
        );
        const leadingPercent = Math.round((leadingEntry.value / total) * 100);

        return (
            <>
                <strong className="text-slate-800">{leadingEntry.name}</strong> is
                the largest group with{" "}
                <strong className="text-slate-800">{leadingEntry.value}</strong> of{" "}
                <strong className="text-slate-800">{total} responses</strong> (
                <strong className="text-blue-600">{leadingPercent}%</strong>).
                This helps show which{" "}
                <strong className="text-slate-800">{title.toLowerCase()}</strong>{" "}
                segment is most represented in the current feedback.
            </>
        );
    };

    const charts = [
        {
            title: "Address",
            data: createChartData("address"),
        },
        {
            title: "Affiliation",
            data: createChartData("affiliation"),
        },
        {
            title: "Age Group",
            data: createChartData("ageGroup"),
        },
        {
            title: "Employment",
            data: createChartData("employmentStatus"),
        },
        {
            title: "Sex",
            data: createChartData("gender"),
        },
    ];

    return (
        <>
            <BtnGenerateReport
                isCapturing={isCapturing}
                handleCapture={handleCapture}
                chartRefs={chartRefs}
                feedback={feedback}
                selectedOfficeName={selectedOfficeName}
                selectedDateFrom={selectedDateFrom}
                selectedDateTo={selectedDateTo}
                serviceTransactions={serviceTransactions}
                services={services}
            />

            <div className="mt-5 grid grid-cols-1 gap-6 xl:grid-cols-2">
                {charts.map(({ title, data }, index) => (
                    <div
                        key={title}
                        className="grid min-w-0 grid-cols-1 items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5 lg:grid-cols-[60%_40%] lg:p-6"
                    >
                        {/* Left Container */}
                        <div
                            ref={(el) => {
                                chartRefs.current[index] = el;
                            }}
                            className="flex min-w-0 flex-col items-center"
                        >
                            <h3 className="m-2 font-semibold">
                                {title}
                            </h3>

                            <PieChart width={320} height={280}>
                            <Pie
                                data={data}
                                dataKey="value"
                                outerRadius={80}
                                labelLine={false}
                                label={({
                                    cx = 0,
                                    cy = 0,
                                    midAngle = 0,
                                    outerRadius = 0,
                                    percent = 0,
                                    index = 0,
                                }) => {
                                    const RADIAN = Math.PI / 180;
                                    const color = COLORS[index % COLORS.length];
                                    const text = `${(percent * 100).toFixed(0)}%`;

                                    const angle = -midAngle * RADIAN;

                                    const sx =
                                        cx + outerRadius * Math.cos(angle);
                                    const sy =
                                        cy + outerRadius * Math.sin(angle);

                                    const labelDistance = 28;

                                    const bx =
                                        cx +
                                        (outerRadius + labelDistance) *
                                            Math.cos(angle);

                                    const by =
                                        cy +
                                        (outerRadius + labelDistance) *
                                            Math.sin(angle);

                                    return (
                                        <g>
                                            <line
                                                x1={bx}
                                                y1={by}
                                                x2={sx}
                                                y2={sy}
                                                stroke={color}
                                                strokeWidth={1}
                                            />

                                            <rect
                                                x={bx - 18}
                                                y={by - 10}
                                                width={36}
                                                height={20}
                                                rx={6}
                                                fill="white"
                                                stroke={color}
                                                strokeWidth={1}
                                            />

                                            <text
                                                x={bx}
                                                y={by + 4}
                                                textAnchor="middle"
                                                fontSize={12}
                                                fontWeight="bold"
                                                fill="#000"
                                            >
                                                {text}
                                            </text>
                                        </g>
                                    );
                                }}
                            >
                                {data.map((_, index) => (
                                    <Cell
                                        key={index}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            </PieChart>

                            <CustomLegend
                                data={data}
                                colors={COLORS}
                            />
                        </div>

                        {/* Right Container */}
                        <div className="flex text-start p-4">
                            <p className="max-w-sm text-sm leading-6 text-slate-600 border-b border-slate-200/80">
                                {createChartDescription(title, data)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};
