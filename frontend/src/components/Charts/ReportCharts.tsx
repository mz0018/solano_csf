import { useRef } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { CustomLegend } from "../../utils/CustomLegend";
import { useCaptureChart } from "../../hooks/useCaptureChart";
import { BtnGenerateReport, type FeedbackItem } from "../buttons/BtnGenerateReport";

type Client = {
    address: string;
    affiliation: string;
    ageGroup: string;
    employmentStatus: string;
    gender: string;
};

type ReportChartsProps = {
    feedback: FeedbackItem[];
    selectedOfficeName: string;
    selectedDateFrom: string;
    selectedDateTo: string;
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

export const ReportCharts = ({ feedback, selectedOfficeName, selectedDateFrom, selectedDateTo }: ReportChartsProps) => {
    const chartRefs = useRef<(HTMLDivElement | null)[]>([]);
    const { handleCapture, isCapturing } = useCaptureChart()

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

    const charts = [
        { title: "Address", data: createChartData("address") },
        { title: "Affiliation", data: createChartData("affiliation") },
        { title: "Age Group", data: createChartData("ageGroup") },
        { title: "Employment", data: createChartData("employmentStatus") },
        { title: "Gender", data: createChartData("gender") },
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
        />

        <div className="flex flex-wrap gap-6">
            {charts.map(({ title, data }, index) => (
                <div 
                    key={title} 
                    ref={(el) => {
                        chartRefs.current[index] = el;
                    }}
                    className="flex flex-col items-center"
                >
                    <h3 className="font-semibold m-2">
                        {title}
                    </h3>

                    <PieChart width={320} height={280}>
                        <Pie
                            data={data}
                            dataKey="value"
                            innerRadius={55}
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

                                const sx = cx + outerRadius * Math.cos(angle);
                                const sy = cy + outerRadius * Math.sin(angle);

                                const labelDistance = 28;
                                const bx = cx + (outerRadius + labelDistance) * Math.cos(angle);
                                const by = cy + (outerRadius + labelDistance) * Math.sin(angle);

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
            ))}
        </div>
        </>
    );
};
