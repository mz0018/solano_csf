import { useRef } from "react";
import {
    CartesianGrid,
    Cell,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
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

    const createChartData = (key: keyof Client) =>
        Object.entries(
            feedback.reduce((acc, item) => {
                const value = item.client[key];
                acc[value] = (acc[value] || 0) + 1;
                return acc;
            }, {} as Record<string, number>)
        ).map(([name, value]) => ({ name, value }));

    const createChartDescription = (
        title: string,
        data: { name: string; value: number }[]
    ) => {
        if (data.length === 0) {
            return <>No {title.toLowerCase()} feedback is available for this report.</>;
        }

        const total = data.reduce((sum, item) => sum + item.value, 0);
        const leadingEntry = data.reduce((current, item) =>
            item.value > current.value ? item : current
        );
        const leadingPercent = Math.round((leadingEntry.value / total) * 100);

        return (
            <>
                <strong className="text-slate-800">{leadingEntry.name}</strong> is
                the largest group with <strong className="text-slate-800">{leadingEntry.value}</strong> of{" "}
                <strong className="text-slate-800">{total} responses</strong> ( 
                <strong className="text-blue-600">{leadingPercent}%</strong>).
                This helps show which <strong className="text-slate-800">{title.toLowerCase()}</strong>{" "}
                segment is most represented in the current feedback.
            </>
        );
    };

    const createCategoryTrend = (key: keyof Client, category: string) => {
        const counts = feedback.reduce((acc, item) => {
            const date = new Date(item.createdAt);
            if (Number.isNaN(date.getTime()) || item.client[key] !== category) {
                return acc;
            }

            const dateKey = date.toISOString().slice(0, 10);
            acc[dateKey] = (acc[dateKey] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        return Object.entries(counts)
            .sort(([left], [right]) => left.localeCompare(right))
            .map(([date, responses]) => ({
                date,
                label: new Date(`${date}T00:00:00`).toLocaleDateString("en-PH", {
                    month: "short",
                    day: "numeric",
                }),
                responses,
            }));
    };

    const formatDate = (value: string) =>
        value
            ? new Date(`${value}T00:00:00`).toLocaleDateString("en-PH", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
              })
            : "All dates";

    const charts = [
        { title: "Address", data: createChartData("address") },
        { title: "Affiliation", data: createChartData("affiliation") },
        { title: "Age Group", data: createChartData("ageGroup") },
        { title: "Employment", data: createChartData("employmentStatus") },
        { title: "Sex", data: createChartData("gender") },
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

            <div className="mt-4 grid grid-cols-1 gap-4 sm:mt-5 sm:gap-5 2xl:grid-cols-2">
                {charts.map(({ title, data }, index) => {
                    const leadingEntry = data.length
                        ? data.reduce((current, item) =>
                              item.value > current.value ? item : current
                          )
                        : undefined;
                    const categoryTrend = leadingEntry
                        ? createCategoryTrend(
                              title === "Address"
                                  ? "address"
                                  : title === "Affiliation"
                                  ? "affiliation"
                                  : title === "Age Group"
                                  ? "ageGroup"
                                  : title === "Employment"
                                  ? "employmentStatus"
                                  : "gender",
                              leadingEntry.name
                          )
                        : [];

                    return (
                    <div
                        key={title}
                        className="grid min-w-0 grid-cols-1 items-center gap-5 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5 lg:p-6 2xl:grid-cols-[minmax(0,1.15fr)_minmax(12rem,.85fr)] 2xl:gap-4"
                    >
                        <div
                            ref={(element) => {
                                chartRefs.current[index] = element;
                            }}
                            className="flex min-w-0 flex-col items-center"
                        >
                            <h3 className="mb-1 text-sm font-semibold tracking-wide text-slate-700 sm:text-base">
                                {title}
                            </h3>

                            <div className="h-[280px] w-full max-w-[22rem]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
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
                                                const angle = -midAngle * (Math.PI / 180);
                                                const color = COLORS[index % COLORS.length];
                                                const labelDistance = 28;
                                                const sx = cx + outerRadius * Math.cos(angle);
                                                const sy = cy + outerRadius * Math.sin(angle);
                                                const bx = cx + (outerRadius + labelDistance) * Math.cos(angle);
                                                const by = cy + (outerRadius + labelDistance) * Math.sin(angle);

                                                return (
                                                    <g>
                                                        <line x1={bx} y1={by} x2={sx} y2={sy} stroke={color} strokeWidth={1} />
                                                        <rect x={bx - 18} y={by - 10} width={36} height={20} rx={6} fill="white" stroke={color} strokeWidth={1} />
                                                        <text x={bx} y={by + 4} textAnchor="middle" fontSize={12} fontWeight="bold" fill="#334155">
                                                            {(percent * 100).toFixed(0)}%
                                                        </text>
                                                    </g>
                                                );
                                            }}
                                        >
                                            {data.map((_, dataIndex) => (
                                                <Cell key={dataIndex} fill={COLORS[dataIndex % COLORS.length]} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>

                            <CustomLegend data={data} colors={COLORS} />
                        </div>

                        <div className="min-w-0 border-t border-slate-200/80 pt-4 text-left 2xl:border-l 2xl:border-t-0 2xl:pl-5 2xl:pt-0">
                            <p className="max-w-sm text-sm leading-6 text-slate-600">
                                {createChartDescription(title, data)}
                            </p>
                            <div className="mt-4 h-40 w-full min-w-0">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={categoryTrend} margin={{ top: 8, right: 8, left: -24, bottom: 0 }}>
                                        <CartesianGrid stroke="#E2E8F0" strokeDasharray="4 4" />
                                        <XAxis dataKey="label" tick={{ fill: "#64748B", fontSize: 10 }} tickLine={false} axisLine={false} />
                                        <YAxis allowDecimals={false} tick={{ fill: "#64748B", fontSize: 10 }} tickLine={false} axisLine={false} width={30} />
                                        <Tooltip
                                            contentStyle={{ border: "1px solid #E2E8F0", borderRadius: 8, fontSize: 12 }}
                                            formatter={(value) => [`${value} responses`, leadingEntry?.name || "Feedback"]}
                                        />
                                        <Line type="monotone" dataKey="responses" stroke={COLORS[index % COLORS.length]} strokeWidth={2.5} dot={{ r: 3, fill: COLORS[index % COLORS.length], stroke: "#fff", strokeWidth: 1.5 }} activeDot={{ r: 5 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                            <p className="mt-2 text-xs leading-5 text-slate-500">
                                Daily responses for <strong className="font-medium text-slate-700">{leadingEntry?.name || "this segment"}</strong>.
                            </p>
                        </div>

                        <div className="col-span-full flex flex-col gap-1 border-t border-slate-100 pt-3 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
                            <span>Office: <strong className="font-medium text-slate-700">{selectedOfficeName || "All offices"}</strong></span>
                            <span>Date range: <strong className="font-medium text-slate-700">{formatDate(selectedDateFrom)} - {formatDate(selectedDateTo)}</strong></span>
                        </div>
                    </div>
                    );
                })}
            </div>
        </>
    );
};
