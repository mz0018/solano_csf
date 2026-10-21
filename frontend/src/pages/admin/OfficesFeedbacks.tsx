import { useState } from "react";
import { Select } from "../../ui/form/Select";
import { useGetOffices } from "../../hooks/useGetOffices";
import { useGetOfficeFeedbackByDate } from "../../hooks/useGetOfficeFeedbackByDate";
import { PerOfficeQueueTable } from "../../components/Tables/PerOfficeQueueTable";
import { ErrorText } from "../../ui/form/ErrorText";

const OfficesFeedbacks = () => {
    const [selectedOfficeCode, setSelectedOfficeCode] = useState("");
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [page, setPage] = useState<number>(1);
    const [itemsPerPage] = useState<number>(10);
    
    const { data: offices, isLoading: officesLoading } = useGetOffices();
    const { data, isLoading, error } = useGetOfficeFeedbackByDate(
        selectedOfficeCode,
        selectedMonth, 
        selectedYear,
        page,
        itemsPerPage
    );

    const currentYear = new Date().getFullYear();

    const years = Array.from(
        { length: 10 },
        (_, index) => currentYear - index
    );

    const handleOfficeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const code = e.target.value;
        setSelectedOfficeCode(code);
        setPage(1);
    };

    const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const month = e.target.value;
        setSelectedMonth(month);
        setPage(1);
    };

    const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const year = e.target.value;
        setSelectedYear(year);
        setPage(1);
    };

    

    const handlePageChange = (newPage: number) => {
        if (newPage < 1 || newPage > (data?.totalPages || 1) || isLoading) return;
        setPage(newPage);
    };

    return (
        <>
            {/* Mobile Header */}
            <div className="w-full">
                <div className="mb-4 border-b border-gray-300 py-3 lg:hidden">
                    <h1 className="text-lg font-semibold text-[#628dec]">
                        Select an office to view specific feedback
                    </h1>

                    <p className="mt-1 text-sm leading-relaxed text-gray-900">
                        Filter and review feedback entries by office
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
                        value={selectedOfficeCode}
                        onChange={handleOfficeChange}
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

                {/* Month */}
                <div className="w-full sm:w-96 sm:max-w-full">
                    <label
                        htmlFor="month"
                        className="mb-1 block text-sm font-medium"
                    >
                        Select Month
                    </label>

                    <Select
                        id="month"
                        variant="admin"
                        value={selectedMonth}
                        onChange={handleMonthChange}
                    >
                        <option value="">Select month</option>
                        <option value="1">January</option>
                        <option value="2">February</option>
                        <option value="3">March</option>
                        <option value="4">April</option>
                        <option value="5">May</option>
                        <option value="6">June</option>
                        <option value="7">July</option>
                        <option value="8">August</option>
                        <option value="9">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                    </Select>
                </div>

                {/* Year */}
                <div className="w-full sm:w-96 sm:max-w-full">
                    <label
                        htmlFor="year"
                        className="mb-1 block text-sm font-medium"
                    >
                        Select Year
                    </label>

                    <Select
                        id="year"
                        variant="admin"
                        value={selectedYear}
                        onChange={handleYearChange}
                    >
                        <option value="">Select year</option>

                        {years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </Select>
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <ErrorText message={(error as Error).message} />
            )}

            {/* Feedback Table */}
            <div className="w-full min-w-0">
                <PerOfficeQueueTable
                    feedbacks={data?.feedbacks ?? []}
                    totalPages={data?.totalPages ?? 0}
                    page={page}
                    onPageChange={handlePageChange}
                    hasSelectedOffice={!!selectedOfficeCode}
                />
            </div>
        </>
    );
};

export default OfficesFeedbacks;