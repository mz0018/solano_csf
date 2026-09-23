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
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
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
            <div className="space-y-6">
                <h1 className="text-xl font-semibold">
                    Rendered Services
                </h1>

                {/* Service Summary */}
                {Object.keys(serviceCounts).length > 0 && (
                    <div>
                        <h2 className="mb-3 text-lg font-semibold">
                            Service Summary
                        </h2>

                        <TableUI>
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-3">
                                        Service
                                    </th>
                                    <th className="px-4 py-3 text-center">
                                        Total
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {Object.entries(serviceCounts).map(
                                    ([service, count]) => (
                                        <tr key={service}>
                                            <td className="px-4 py-3">
                                                {service.replaceAll("_", " ")}
                                            </td>
                                            <td className="px-4 py-3 text-center font-semibold">
                                                {count}
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </TableUI>
                    </div>
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
            </div>
        </AdminResponsiveContainer>
    );
};

export default RenderedService;