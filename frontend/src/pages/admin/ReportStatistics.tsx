import { useState } from "react";
import { Select } from "../../ui/form/Select";
import { useGetOffices } from "../../hooks/useGetOffices";
import { useGetReportStatistics } from "../../hooks/useGetReportStatistics";
import { FeedbackStatisticTable } from "../../components/Tables/FeedbackStatisticTable";

const ReportStatistics = () => {
    const { data: offices, isLoading: officesLoading } = useGetOffices();
    const [officeCode, setOfficeCode] = useState("");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const { data: stats, isLoading, error } = useGetReportStatistics(officeCode, dateFrom, dateTo);

    return (
        <>
            {/* Mobile Header */}
            <div className="w-full">
                <div className="mb-4 border-b border-gray-300 py-3 lg:hidden">
                    <h1 className="text-lg font-semibold text-[#628dec]">
                        Report Statistics
                    </h1>

                    <p className="mt-1 text-sm leading-relaxed text-gray-900">
                        View queue statistics and feedback reports by office
                    </p>
                </div>
            </div>

            {/* Filters */}
            <div className="mb-4 flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end sm:gap-4">
                {/* Municipality Office */}
                <div className="w-full sm:w-96 sm:max-w-full">
                    <label
                        htmlFor="office"
                        className="mb-1 block text-sm font-medium"
                    >
                        Municipality Office
                    </label>

                    <Select
                        id="office"
                        variant="admin"
                        value={officeCode}
                        onChange={(e) => setOfficeCode(e.target.value)}
                    >
                        <option value="">
                            {officesLoading
                                ? "Loading offices..."
                                : "Select an office"}
                        </option>

                        {offices?.map((office) => (
                            <option key={office.code} value={office.code}>
                                {office.name}
                            </option>
                        ))}
                    </Select>
                </div>

                {/* Start Date */}
                <div className="w-full sm:w-96 sm:max-w-full">
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
                        className="w-full min-w-0 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>

                {/* End Date */}
                <div className="w-full sm:w-96 sm:max-w-full">
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
                        className="w-full min-w-0 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* Feedback Statistics Table */}
            <div className="w-full min-w-0">
                <FeedbackStatisticTable
                    isLoading={isLoading}
                    error={error}
                    stats={stats}
                />
            </div>
        </>
    );
};
export default ReportStatistics;