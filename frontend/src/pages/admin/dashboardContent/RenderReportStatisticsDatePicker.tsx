import { Maximize2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetActiveQueue } from "../../../hooks/useGetActiveQueue";
import type { RenderReportStatisticsDatePickerProps } from "./ReadReportStatistics";

export const RenderReportStatisticsDatePicker = ({
    officeCode,
    month,
    year,
    startDate,
    endDate,
}: RenderReportStatisticsDatePickerProps) => {
    const navigate = useNavigate();

    const {
        data: queueData,
        isLoading: queueLoading,
        isError: queueError,
    } = useGetActiveQueue();

    return (
        <>
            {/* Date picker custom */}
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

            {/* Active List */}
            <div className="mt-2 h-85 w-full rounded-lg border border-gray-300 bg-white p-5">
                <div className="mb-4 flex items-start justify-between border-b border-gray-200 pb-4">
                    <div>
                        <p className="text-base font-semibold text-gray-900">
                            {officeCode} Live Tickets
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                            Active tickets
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => navigate("/admin/queue/monitor")}
                        className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                        aria-label="Expand live tickets"
                    >
                        <Maximize2 className="h-5 w-5" />
                    </button>
                </div>

                {/* Loading */}
                {queueLoading && (
                    <div className="space-y-2">
                        <div className="h-10 animate-pulse rounded-md bg-gray-100" />
                        <div className="h-10 animate-pulse rounded-md bg-gray-100" />
                        <div className="h-10 animate-pulse rounded-md bg-gray-100" />
                    </div>
                )}

                {/* Error */}
                {queueError && (
                    <p className="py-3 text-sm text-red-500">
                        Failed to load active tickets.
                    </p>
                )}

                {/* Empty */}
                {!queueLoading &&
                    !queueError &&
                    queueData?.queue?.length === 0 && (
                        <p className="py-4 text-center text-sm text-gray-500">
                            No active tickets.
                        </p>
                    )}

                {/* Tickets */}
                {!queueLoading &&
                    !queueError &&
                    queueData?.queue &&
                    queueData.queue.length > 0 && (
                        <div className="max-h-52 overflow-y-auto divide-y divide-gray-200 rounded-md border border-gray-200">
                            {queueData.queue.map((ticket) => (
                                <div
                                    key={ticket._id}
                                    className="flex items-center justify-between px-4 py-3"
                                >
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">
                                            {ticket.code}
                                        </p>

                                        <p className="text-xs text-gray-500">
                                            Ticket
                                        </p>
                                    </div>

                                    <span className="rounded-md bg-yellow-50 px-2.5 py-1 text-xs font-medium capitalize text-yellow-700">
                                        {ticket.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
            </div>
        </>
    );
};
