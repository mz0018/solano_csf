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

    const matteColors = [
        "#6b7280",
        "#7c8f8a",
        "#8f8175",
        "#7d8491",
        "#9b8f82",
        "#718096",
        "#858e7c",
        "#927c83",
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
                <h2 className="mb-1 text-base font-semibold text-slate-500 sm:text-lg lg:text-xl">
                    Services Chart
                </h2>

                <small className="mb-5 inline-flex max-w-full items-center rounded-full border border-slate-200 px-3 py-1.5 text-xs font-light text-[#628dec] sm:text-sm">
                    {selectedDateRange}
                </small>

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
                                        fill={matteColors[index % matteColors.length]}
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
                        {/* <div className="border-b border-gray-200 px-4 py-3">
                            <h2 className="text-sm font-semibold text-gray-900">
                                Service Summary
                            </h2>

                            <p className="mt-1 text-xs text-gray-500">
                                Total rendered services for the selected date range.
                            </p>
                        </div> */}

                        <div className="divide-y divide-gray-100">
                            {sortedServiceCounts.map(
                                ([service, count]) => (
                                    <div
                                        key={service}
                                        className="flex items-center justify-between px-4 py-3"
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
