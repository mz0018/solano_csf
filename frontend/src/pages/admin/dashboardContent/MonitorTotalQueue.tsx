import { CircleCheck, Clock3, List } from "lucide-react";
import { useGetActiveQueue } from "../../../hooks/useGetActiveQueue";

export const MonitorTotalQueue = () => {
    const {
        data: queueData,
        isLoading: queueLoading,
    } = useGetActiveQueue();

    const totalQueues = queueData?.total ?? 0;
    const pendingQueues = queueData?.status?.pending ?? 0;
    const usedQueues = queueData?.status?.used ?? 0;

    return (
        <div className="w-full">
            <div className="block mb-4 flex items-center gap-3 border-b border-gray-300 py-3 lg:hidden">
                <div>
                    <h1 className="text-lg font-semibold text-[#628dec]">
                    Dashboard
                    </h1>

                    <p className="mt-1 text-sm text-gray-900">
                    Get an overview of the current queues, pending requests, and completed services.
                    </p>
                </div>
            </div>

            <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
                {/* Total Queues */}
                <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5">
                    <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                            <p className="text-xs font-medium text-gray-500 sm:text-sm">
                                Total Queues
                            </p>

                            {queueLoading ? (
                                <div className="mt-2 h-7 w-16 animate-pulse rounded bg-gray-200 sm:mt-3 sm:h-8" />
                            ) : (
                                <p className="mt-1 text-2xl font-bold text-gray-900 sm:mt-2 sm:text-3xl">
                                    {totalQueues}
                                </p>
                            )}
                        </div>

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 sm:h-11 sm:w-11">
                            <List className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.8} />
                        </div>
                    </div>

                    <div className="my-3 h-px bg-gray-100 sm:my-4" />

                    <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="h-2 w-2 shrink-0 rounded-full bg-green-500" />
                        <span>Currently in queue</span>
                    </div>
                </div>

                {/* Pending */}
                <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5">
                    <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                            <p className="text-xs font-medium text-gray-500 sm:text-sm">
                                Pending
                            </p>

                            {queueLoading ? (
                                <div className="mt-2 h-7 w-16 animate-pulse rounded bg-gray-200 sm:mt-3 sm:h-8" />
                            ) : (
                                <p className="mt-1 text-2xl font-bold text-yellow-600 sm:mt-2 sm:text-3xl">
                                    {pendingQueues}
                                </p>
                            )}
                        </div>

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-yellow-50 text-yellow-600 sm:h-11 sm:w-11">
                            <Clock3 className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.8} />
                        </div>
                    </div>

                    <div className="my-3 h-px bg-gray-100 sm:my-4" />

                    <div className="text-xs text-gray-500">
                        Waiting to be served
                    </div>
                </div>

                {/* Used */}
                <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5">
                    <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                            <p className="text-xs font-medium text-gray-500 sm:text-sm">
                                Used
                            </p>

                            {queueLoading ? (
                                <div className="mt-2 h-7 w-16 animate-pulse rounded bg-gray-200 sm:mt-3 sm:h-8" />
                            ) : (
                                <p className="mt-1 text-2xl font-bold text-green-600 sm:mt-2 sm:text-3xl">
                                    {usedQueues}
                                </p>
                            )}
                        </div>

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-600 sm:h-11 sm:w-11">
                            <CircleCheck
                                className="h-5 w-5 sm:h-6 sm:w-6"
                                strokeWidth={1.8}
                            />
                        </div>
                    </div>

                    <div className="my-3 h-px bg-gray-100 sm:my-4" />

                    <div className="text-xs text-gray-500">
                        Queues already served
                    </div>
                </div>
            </div>
        </div>
    );
};
