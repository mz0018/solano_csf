import type { RenderReportStatisticsDatePickerProps } from "./ReadReportStatistics";

export const RenderReportStatisticsDatePicker = ({
    officeCode,
    month,
    year,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
}: RenderReportStatisticsDatePickerProps) => {
    return (
        <div className="w-64">
            <p className="mb-3 font-medium">Report Period {month} {year}</p>

            <p className="mb-3 text-sm text-gray-500">
                Office: {officeCode}
            </p>

            <div className="space-y-3">
                <div>
                    <label className="mb-1 block text-sm text-gray-600">
                        Start date
                    </label>

                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                    />
                </div>

                <div>
                    <label className="mb-1 block text-sm text-gray-600">
                        End date
                    </label>

                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                    />
                </div>
            </div>
        </div>
    );
};
