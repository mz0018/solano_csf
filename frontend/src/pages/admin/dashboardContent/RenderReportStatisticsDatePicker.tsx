import { Maximize2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetActiveQueue } from "../../../hooks/useGetActiveQueue";
import { ErrorText } from "../../../ui/form/ErrorText";
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
            <div className="w-full rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md bg-gradient-to-l from-blue-50 to-white">
                <div className="">

                    <div className="mb-3 flex items-baseline gap-1 text-base font-semibold text-[#000814] sm:text-lg lg:text-xl">
                        {officeCode}
                        <p className="text-sm text-slate-500 font-light">/ Report Period</p>
                    </div>


                     <small className="mt-3 inline-flex max-w-full items-center rounded-full border border-slate-200 px-3 py-1.5 text-xs font-light text-[#003566] sm:text-sm">
                        {formattedMonth}
                     </small>
                </div>
     
                <div className="mt-4 rounded-md border border-blue-200 bg-blue-50 p-4">
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
            <div className="mt-3 w-full rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md bg-gradient-to-l from-blue-50 to-white">
                <div className="mb-4 flex items-center justify-between border-b border-slate-200 pb-4">
                    <div className="flex items-baseline gap-1 text-base font-semibold text-[#000814] sm:text-lg lg:text-xl">
                        {officeCode}
                        <p className="text-sm text-slate-500 font-light">/ Live Tickets</p>
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
                    <ErrorText message="Failed to load active tickets." />
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
                                        <p className="text-md sm:text-lg lg:text-xl font-semibold text-slate-500">
                                            {ticket.code}
                                        </p>

                                        <p className="text-xs text-slate-400">
                                            Ticket
                                        </p>
                                    </div>

                                   <small
                                        className={`tracking-wide rounded-md px-2.5 py-1 text-xs font-medium capitalize border ${
                                            ticket.status === "pending"
                                                ? "bg-amber-100 text-amber-800 border-amber-400"
                                                : ticket.status === "used"
                                                    ? "bg-green-100 text-green-800 border-green-400"
                                                    : "bg-blue-50 text-blue-800 border-blue-300"
                                        }`}
                                    >
                                        {ticket.status}
                                    </small>
                                </div>
                            ))}
                        </div>
                    )}
            </div>
        </>
    );
};
