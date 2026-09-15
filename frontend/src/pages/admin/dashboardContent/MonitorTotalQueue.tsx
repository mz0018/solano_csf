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
            <div className="mb-5">
                <h1 className="text-xl font-semibold text-gray-900">
                    Dashboard
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Get an overview of the current queues, pending requests,
                    and completed services.
                </p>
            </div>

            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
                {/* Total Queues */}
                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500">
                                Total Queues
                            </p>

                            {queueLoading ? (
                                <div className="mt-3 h-8 w-16 animate-pulse rounded bg-gray-200" />
                            ) : (
                                <p className="mt-2 text-3xl font-bold text-gray-900">
                                    {totalQueues}
                                </p>
                            )}
                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                            <List className="h-6 w-6" strokeWidth={1.8} />
                        </div>
                    </div>

                    <div className="my-4 h-px bg-gray-100" />

                    <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 text-gray-500">
                            <span className="h-2 w-2 rounded-full bg-green-500" />
                            <span>Currently in queue</span>
                        </div>
                    </div>
                </div>

                {/* Pending */}
                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500">
                                Pending
                            </p>

                            {queueLoading ? (
                                <div className="mt-3 h-8 w-16 animate-pulse rounded bg-gray-200" />
                            ) : (
                                <p className="mt-3 text-3xl font-bold text-yellow-600">
                                    {pendingQueues}
                                </p>
                            )}
                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-yellow-50 text-yellow-600">
                            <Clock3 className="h-6 w-6" strokeWidth={1.8} />
                        </div>
                    </div>

                    <div className="my-4 h-px bg-gray-100" />

                    <div className="text-xs text-gray-500">
                        Waiting to be served
                    </div>
                </div>

                {/* Used */}
                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500">
                                Used
                            </p>

                            {queueLoading ? (
                                <div className="mt-3 h-8 w-16 animate-pulse rounded bg-gray-200" />
                            ) : (
                                <p className="mt-3 text-3xl font-bold text-green-600">
                                    {usedQueues}
                                </p>
                            )}
                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-green-50 text-green-600">
                            <CircleCheck
                                className="h-6 w-6"
                                strokeWidth={1.8}
                            />
                        </div>
                    </div>

                    <div className="my-4 h-px bg-gray-100" />

                    <div className="text-xs text-gray-500">
                        Queues already served
                    </div>
                </div>
            </div>
        </div>
    );
};
