import { useState } from "react";
import { Select } from "../../ui/form/Select";
import { useGetOffices } from "../../hooks/useGetOffices";
import { useGetReportStatistics } from "../../hooks/useGetReportStatistics";
import { FeedbackStatisticTable } from "../../components/Tables/FeedbackStatisticTable";
import { AdminResponsiveContainer } from "../../ui/form/AdminResponsiveContainer";

const ReportStatistics = () => {
    const { data: offices, isLoading: officesLoading } = useGetOffices();
    const [officeCode, setOfficeCode] = useState("");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const { data: stats, isLoading, error } = useGetReportStatistics(officeCode, dateFrom, dateTo);

    return (
        <AdminResponsiveContainer>
            <div className="flex w-full flex-col leading-none">
                <div className="border-b border-gray-300 py-3">
                    <h1 className="text-xl font-semibold text-gray-900">
                    Report Statistics
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        View queue statistics and feedback reports by office
                    </p>
                </div>
            </div>
            <div className="flex gap-4">
                <div>
                    <label htmlFor="office" className="mb-1 block text-sm font-medium">
                        Municipality Office
                    </label>
                    <Select id="office" variant="admin" value={officeCode} onChange={(e) => setOfficeCode(e.target.value)}>
                        <option value="">
                            {officesLoading ? "Loading offices..." : "Select an office"}
                        </option>
                        {offices?.map((office) => (
                            <option key={office.code} value={office.code}>
                                {office.name}
                            </option>
                        ))}
                    </Select>
                </div>
                <div>
                    <label
                        htmlFor="dateFrom"
                        className="mb-1 block text-sm font-medium"
                    >
                        Start Date
                    </label>
                    <input
                        id="dateFrom"
                        type="date"
                        value={dateFrom}
                        onChange={(e) => setDateFrom(e.target.value)}
                        className="w-96 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label
                        htmlFor="dateTo"
                        className="mb-1 block text-sm font-medium"
                    >
                        End Date
                    </label>
                    <input
                        id="dateTo"
                        type="date"
                        value={dateTo}
                        onChange={(e) => setDateTo(e.target.value)}
                        className="w-96 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>
            </div>
            <FeedbackStatisticTable
                isLoading={isLoading}
                error={error}
                stats={stats}
            />
        </AdminResponsiveContainer>
    );
};
export default ReportStatistics;