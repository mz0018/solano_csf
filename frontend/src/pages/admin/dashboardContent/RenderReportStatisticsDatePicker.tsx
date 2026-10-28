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
    const formatDate = (date: string) =>
        new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        });
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);
    const formattedMonth = new Date(year, month - 1).toLocaleDateString(
        "en-US",
        {
            month: "long",
            year: "numeric",
        }
    );

    const {
        data: queueData,
        isLoading: queueLoading,
        isError: queueError,
    } = useGetActiveQueue();

    return (
        <>
            {/* Report Period */}
            <div className="w-full rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
                <div className="">
                    <p className="text-base font-semibold text-slate-500 sm:text-lg lg:text-xl">
                        {officeCode} Report Period
                    </p>

                     <small className="mt-3 inline-flex max-w-full items-center rounded-full border border-slate-200 px-3 py-1.5 text-xs font-light text-[#628dec] sm:text-sm">
                        {formattedMonth}
                     </small>
                </div>
     
                <div className="mt-4 rounded-md bg-blue-50 p-4">
                    <p className="text-sm leading-relaxed tracking-wide text-slate-600">
                        This report covers the entire calendar month of{" "}
                        <span className="font-medium text-slate-800">
                            {formattedMonth}
                        </span>
                        , automatically including all dates from{" "}
                        <span className="font-medium text-slate-800">
                            {formattedStartDate}
                        </span>{" "}
                        through{" "}
                        <span className="font-medium text-slate-800">
                            {formattedEndDate}
                        </span>
                        . The reporting period is automatically set by default to
                        cover the full calendar month, providing a complete overview
                        of office statistics and performance.
                    </p>
                </div>

            </div>

            {/* Live Tickets */}
            <div className="mt-3 w-full rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
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
