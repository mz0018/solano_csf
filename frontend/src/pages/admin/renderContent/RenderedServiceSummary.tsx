import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

type RenderedServiceSummaryProps = {
    serviceCounts: Record<string, number>;
    dateFrom: string;
    dateTo: string;
};

export const RenderedServiceSummary = ({
    serviceCounts,
    dateFrom,
    dateTo,
}: RenderedServiceSummaryProps) => {
    const chartData = Object.entries(serviceCounts).map(([service, count]) => ({
        service: service.replaceAll("_", " "),
        count,
    }));

    const vibrantColors = [
        "#F43F5E", 
        "#10B981",
        "#F59E0B",
        "#6366F1",
        "#D946EF",
        "#0EA5E9",
        "#84CC16",
        "#F97316",
    ];

    const sortedServiceCounts = Object.entries(serviceCounts).sort(
        ([serviceA], [serviceB]) => {
            const isOtherService = (service: string) =>
                service.toLowerCase() === "other_service";

            return Number(isOtherService(serviceA)) - Number(isOtherService(serviceB));
        }
    );

    const formatSelectedDate = (date: string) =>
        new Date(`${date}T00:00:00`).toLocaleDateString("en-PH", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });

    const selectedDateRange =
        dateFrom === dateTo
            ? formatSelectedDate(dateFrom)
            : `${formatSelectedDate(dateFrom)} - ${formatSelectedDate(dateTo)}`;

    return (
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5 lg:p-6 mb-5">
            {/* Left column */}
            <div>
                     
                <div className="mb-2 w-full min-w-0">
                    <h2 className="flex flex-row flex-nowrap items-center gap-2 text-base font-semibold text-[#003566] sm:text-lg lg:text-xl">
                        <span className="shrink-0">Services Chart</span>

                        <small className="min-w-0 truncate rounded-full border border-[#FFC300] bg-[#FFC300]/20 px-2 py-1.5 text-xs font-normal text-[#003566] sm:px-3 sm:text-sm lg:text-base sm:py-2">
                            {selectedDateRange}
                        </small>
                    </h2>
                </div>

                <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={chartData}
                            margin={{
                                top: 10,
                                right: 10,
                                left: 0,
                                bottom: 60,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />

                            <XAxis
                                dataKey="service"
                                angle={-45}
                                textAnchor="end"
                                interval={0}
                                height={80}
                                tick={{ fontSize: 8 }}
                            />

                            <YAxis />

                            <Tooltip />

                            <Bar
                                dataKey="count"
                                radius={[4, 4, 0, 0]}
                            >
                                {chartData.map((entry, index) => (
                                    <Cell
                                        key={`${entry.service}-${index}`}
                                        fill={vibrantColors[index % vibrantColors.length]}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Right column — chart only */}
            <div className="rounded-md bg-white p-4">
                {Object.keys(serviceCounts).length > 0 && (
                    <section>

                        <div className="divide-y divide-gray-100">
                            {sortedServiceCounts.map(
                                ([service, count]) => (
                                    <div
                                        key={service}
                                        className="flex items-center justify-between px-4 py-3 hover:bg-blue-50/50 transition-colors"
                                    >
                                        <p className="text-sm text-gray-600">
                                            {service
                                                .replaceAll("_", " ")
                                                .replace(/([a-z])([A-Z])/g, "$1 $2")
                                                .toLowerCase()
                                                .replace(/\b\w/g, (letter) => letter.toUpperCase())}
                                        </p>

                                        <span className="text-sm font-semibold text-gray-900">
                                            {count}
                                        </span>
                                    </div>
                                )
                            )}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};
