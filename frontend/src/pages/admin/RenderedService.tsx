import { AdminResponsiveContainer } from "../../ui/form/AdminResponsiveContainer";
import { useRenderedServices } from "../../hooks/useRenderedServices";
import { useEffect, useState } from "react";

const RenderedService = () => {
    const [selectedDateFrom, setSelectedDateFrom] = useState("");
    const [selectedDateTo, setSelectedDateTo] = useState("");

    const { handleGetRenderedServiceByDate } = useRenderedServices();

    useEffect(() => {
        if (!selectedDateFrom || !selectedDateTo) return;

        handleGetRenderedServiceByDate({ selectedDateFrom, selectedDateTo });

    }, [selectedDateFrom, selectedDateTo]);

    return (
        <AdminResponsiveContainer>
            Total rendered service

            <div>
                <label
                    htmlFor="selectedDateFrom"
                    className="mb-1 block text-sm font-medium"
                >
                    Start Date
                </label>

                <input
                    id="selectedDateFrom"
                    type="date"
                    value={selectedDateFrom}
                    onChange={(e) => setSelectedDateFrom(e.target.value)}
                    className="w-96 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
            </div>

            <div>
                <label
                    htmlFor="selectedDateTo"
                    className="mb-1 block text-sm font-medium"
                >
                    End Date
                </label>

                <input
                    id="selectedDateTo"
                    type="date"
                    value={selectedDateTo}
                    onChange={(e) => setSelectedDateTo(e.target.value)}
                    className="w-96 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
            </div>
        </AdminResponsiveContainer>
    );
};

export default RenderedService;
