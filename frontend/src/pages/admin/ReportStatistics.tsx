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
            <div className="flex flex-col leading-none">
                <h1 className="text-2xl font-semibold">
                    Report Statistics
                </h1>

                <span className="text-sm text-gray-500">View queue statistics and feedback reports by office</span>
            </div>
            <div className="flex gap-4">
                <div>
                    <label htmlFor="office" className="mb-1 block text-sm font-medium">
                        Office
                    </label>
                    <Select id="office" value={officeCode} onChange={(e) => setOfficeCode(e.target.value)}>
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
                    <label htmlFor="dateFrom" className="mb-1 block text-sm font-medium">
                        Date From
                    </label>
                    <input
                        id="dateFrom"
                        type="date"
                        value={dateFrom}
                        onChange={(e) => setDateFrom(e.target.value)}
                        className="p-4 rounded-sm border border-gray-300 text-gray-500 focus:outline-none"
                    />
                </div>
                <div>
                    <label htmlFor="dateTo" className="mb-1 block text-sm font-medium">
                        Date To
                    </label>
                    <input
                        id="dateTo"
                        type="date"
                        value={dateTo}
                        onChange={(e) => setDateTo(e.target.value)}
                        className="p-4 rounded-sm border border-gray-300 text-gray-500 focus:outline-none"
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