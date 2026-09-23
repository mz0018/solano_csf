import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

type RenderedServiceSummaryProps = {
    serviceCounts: Record<string, number>;
};

export const RenderedServiceSummary = ({
    serviceCounts,
}: RenderedServiceSummaryProps) => {
    const chartData = Object.entries(serviceCounts).map(([service, count]) => ({
        service: service.replaceAll("_", " "),
        count,
    }));

    return (
        <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Left column */}
            <div>
                {Object.keys(serviceCounts).length > 0 && (
                    <section className="rounded-md border border-gray-200 bg-white shadow-xs">
                        <div className="border-b border-gray-200 px-4 py-3">
                            <h2 className="text-sm font-semibold text-gray-900">
                                Service Summary
                            </h2>

                            <p className="mt-1 text-xs text-gray-500">
                                Total rendered services for the selected date range.
                            </p>
                        </div>

                        <div className="divide-y divide-gray-100">
                            {Object.entries(serviceCounts).map(
                                ([service, count]) => (
                                    <div
                                        key={service}
                                        className="flex items-center justify-between px-4 py-3"
                                    >
                                        <p className="text-sm capitalize text-gray-600">
                                            {service.replaceAll("_", " ")}
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

            {/* Right column — chart only */}
            <div className="rounded-md border border-gray-200 bg-white p-4 shadow-xs">
                <h2 className="mb-4 text-sm font-semibold text-gray-900">
                    Services Chart
                </h2>

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
                                fill="#3b82f6"
                                radius={[4, 4, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};
