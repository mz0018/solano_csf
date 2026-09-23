import { useEffect, useState } from "react";
import { AdminResponsiveContainer } from "../../ui/form/AdminResponsiveContainer";
import { PaginationUI } from "../../ui/form/PaginationUI";
import { TableUI } from "../../ui/form/TableUI";
import { useRenderedServices } from "../../hooks/useRenderedServices";

type RenderedService = {
    _id: string;
    generatedBy: string;
    generatedByUser: {
        firstName: string;
        lastName: string;
    } | null;
    selectedService: string[];
    createdAt: string;
};

type RenderedServiceResponse = {
    data: RenderedService[];
    serviceCounts: Record<string, number>;
    total: number;
    page: number;
    limit: number;
    totalPages: number;
};

const RenderedService = () => {
    const [dateFrom, setDateFrom] = useState(() => new Date().toISOString().split('T')[0]);
    const [dateTo, setDateTo] = useState(() => new Date().toISOString().split('T')[0]);
    const [page, setPage] = useState(1);
    const [renderedServices, setRenderedServices] =
        useState<RenderedServiceResponse | null>(null);

    const { handleGetRenderedServiceByDate } = useRenderedServices();

    useEffect(() => {
        if (!dateFrom || !dateTo) return;

        const fetchData = async () => {
            const result = await handleGetRenderedServiceByDate({
                selectedDateFrom: dateFrom,
                selectedDateTo: dateTo,
                page,
                limit: 10,
            });

            if (result) setRenderedServices(result);
        };

        fetchData();
    }, [dateFrom, dateTo, page, handleGetRenderedServiceByDate]);

    const data = renderedServices?.data || [];
    const serviceCounts = renderedServices?.serviceCounts || {};

    const formatDate = (date: string) =>
        new Date(date).toLocaleString("en-PH", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
        });

    return (
        <AdminResponsiveContainer>
            
                <div className="flex w-full flex-col leading-none">
                <div className="border-b border-gray-300 py-3">
                    <h1 className="text-xl font-semibold text-gray-900">
                    Rendered Services
                    
                    </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            Overview of services currently rendered, including their total counts.
                        </p>

                    </div>
                </div>

                {/* Service Summary */}
                {Object.keys(serviceCounts).length > 0 && (
                    <section>
                        
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {Object.entries(serviceCounts).map(([service, count]) => (
                                <div
                                    key={service}
                                    className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-gray-300 hover:shadow"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-medium capitalize text-gray-600">
                                                {service.replaceAll("_", " ")}
                                            </p>
                                        </div>

                                        <span className="text-2xl font-bold text-gray-900">
                                            {count}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Date Filter */}
                <div className="flex gap-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Start Date
                        </label>

                        <input
                            type="date"
                            value={dateFrom}
                            onChange={(e) => {
                                setDateFrom(e.target.value);
                                setPage(1);
                            }}
                            className="w-96 rounded-lg border border-gray-300 px-3 py-2 text-sm"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            End Date
                        </label>

                        <input
                            type="date"
                            value={dateTo}
                            onChange={(e) => {
                                setDateTo(e.target.value);
                                setPage(1);
                            }}
                            className="w-96 rounded-lg border border-gray-300 px-3 py-2 text-sm"
                        />
                    </div>
                </div>

                {/* Rendered Services */}
                {data.length > 0 && (
                    <TableUI>
                        <thead>
                            <tr>
                                <th className="px-4 py-3">
                                    Generated By
                                </th>
                                <th className="px-4 py-3">
                                    Service
                                </th>
                                <th className="px-4 py-3">
                                    Date & Time Rendered
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {data.map((item) =>
                                item.selectedService.map((service) => (
                                    <tr
                                        key={`${item._id}-${service}`}
                                        className="border-t"
                                    >
                                        <td className="capitalize">
                                            {item.generatedByUser
                                                ? `${item.generatedByUser.firstName} ${item.generatedByUser.lastName}`.replaceAll("_", " ")
                                                : "Unknown"}
                                        </td>

                                        <td>
                                            {service.replaceAll("_", " ")}
                                        </td>

                                        <td>
                                            {formatDate(item.createdAt)}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </TableUI>
                )}

                {/* Pagination */}
                {renderedServices &&
                    renderedServices.totalPages > 1 && (
                        <PaginationUI
                            currentPage={renderedServices.page}
                            totalPages={renderedServices.totalPages}
                            onPageChange={setPage}
                        />
                    )}

                {/* No Data */}
                {dateFrom && dateTo && data.length === 0 && (
                    <p className="text-sm text-gray-500">
                        No rendered services found for the selected
                        date range.
                    </p>
                )}
            
        </AdminResponsiveContainer>
    );
};

export default RenderedService;