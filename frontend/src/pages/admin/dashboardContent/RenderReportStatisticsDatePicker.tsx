import type { RenderReportStatisticsDatePickerProps } from "./ReadReportStatistics";

export const RenderReportStatisticsDatePicker = ({
    officeCode,
    month,
    year,
    startDate,
    endDate,
}: RenderReportStatisticsDatePickerProps) => {
    return (
        <div className="w-full rounded-lg border border-gray-300 bg-white p-5">
            <div className="mb-5 border-b border-gray-200 pb-4">
                <p className="text-base font-semibold text-gray-900">
                    Report Period
                </p>

                <p className="mt-1 text-sm text-gray-500">
                    {month}/{year}
                </p>
            </div>

            <div className="mb-5">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                    Office
                </p>

                <p className="mt-1 text-sm font-medium text-gray-900">
                    {officeCode}
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                    <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-500">
                        Start Date
                    </p>

                    <div className="rounded-md border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm font-medium text-gray-800">
                        {startDate}
                    </div>
                </div>

                <div>
                    <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-500">
                        End Date
                    </p>

                    <div className="rounded-md border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm font-medium text-gray-800">
                        {endDate}
                    </div>
                </div>
            </div>
        </div>
    );
};
