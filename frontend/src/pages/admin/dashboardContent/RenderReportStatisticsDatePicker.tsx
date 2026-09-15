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
            {/* Report Period */}
            <div className="w-full rounded-lg border border-slate-200 bg-white p-5">
                <div className="mb-5 border-b border-slate-200 pb-4">
                    <p className="text-base font-semibold text-slate-800">
                        Report Period
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                        {month}/{year}
                    </p>
                </div>

                <div className="mb-5">
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        Office
                    </p>

                    <p className="mt-1 text-sm font-medium text-slate-700">
                        {officeCode}
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <p className="mb-1 text-xs font-medium text-slate-500">
                            Start Date
                        </p>

                        <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
                            {startDate}
                        </div>
                    </div>

                    <div>
                        <p className="mb-1 text-xs font-medium text-slate-500">
                            End Date
                        </p>

                        <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
                            {endDate}
                        </div>
                    </div>
                </div>
            </div>

            {/* Live Tickets */}
            <div className="mt-3 w-full rounded-lg border border-slate-200 bg-white p-5">
                <div className="mb-4 flex items-center justify-between border-b border-slate-200 pb-4">
                    <div>
                        <p className="text-base font-semibold text-slate-800">
                            {officeCode} Live Tickets
                        </p>

                        <p className="mt-1 text-sm text-slate-500">
                            Active tickets
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => navigate("/admin/queue/monitor")}
                        className="cursor-pointer p-1 text-slate-400"
                        aria-label="View live tickets"
                    >
                        <Maximize2 className="h-5 w-5" />
                    </button>
                </div>

                {queueLoading && (
                    <div className="space-y-2">
                        <div className="h-10 animate-pulse rounded-md bg-slate-100" />
                        <div className="h-10 animate-pulse rounded-md bg-slate-100" />
                        <div className="h-10 animate-pulse rounded-md bg-slate-100" />
                    </div>
                )}

                {queueError && (
                    <p className="py-3 text-sm text-red-500">
                        Failed to load active tickets.
                    </p>
                )}

                {!queueLoading &&
                    !queueError &&
                    queueData?.queue?.length === 0 && (
                        <p className="py-6 text-center text-sm text-slate-400">
                            No active tickets.
                        </p>
                    )}

                {!queueLoading &&
                    !queueError &&
                    queueData?.queue &&
                    queueData.queue.length > 0 && (
                        <div className="max-h-52 overflow-y-auto divide-y divide-slate-100">
                            {queueData.queue.map((ticket) => (
                                <div
                                    key={ticket._id}
                                    className="flex items-center justify-between py-3"
                                >
                                    <div>
                                        <p className="text-sm font-semibold text-slate-800">
                                            {ticket.code}
                                        </p>

                                        <p className="text-xs text-slate-400">
                                            Ticket
                                        </p>
                                    </div>

                                    <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium capitalize text-amber-600">
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
