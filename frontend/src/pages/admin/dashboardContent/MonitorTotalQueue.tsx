import { useGetActiveQueue } from "../../../hooks/useGetActiveQueue";

export const MonitorTotalQueue = () => {
    const {
        data: queueData,
        isLoading: queueLoading,
    } = useGetActiveQueue();

    return (
        <div className="w-full">
            <h1 className="mb-5 text-xl font-semibold text-gray-900">
                Dashboard
            </h1>

            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
                {/* Total Queues */}
                <div className="rounded-lg border border-gray-300 bg-white p-5">
                    <p className="text-sm font-medium text-gray-500">
                        Total Queues
                    </p>

                    {queueLoading ? (
                        <div className="mt-3 h-8 w-16 animate-pulse rounded bg-gray-200" />
                    ) : (
                        <p className="mt-3 text-2xl font-semibold text-gray-900">
                            {queueData?.total ?? 0}
                        </p>
                    )}
                </div>

                {/* Pending */}
                <div className="rounded-lg border border-gray-300 bg-white p-5">
                    <p className="text-sm font-medium text-gray-500">
                        Pending
                    </p>

                    {queueLoading ? (
                        <div className="mt-3 h-8 w-16 animate-pulse rounded bg-gray-200" />
                    ) : (
                        <p className="mt-3 text-2xl font-semibold text-yellow-600">
                            {queueData?.status?.pending ?? 0}
                        </p>
                    )}
                </div>

                {/* Used */}
                <div className="rounded-lg border border-gray-300 bg-white p-5">
                    <p className="text-sm font-medium text-gray-500">
                        Used
                    </p>

                    {queueLoading ? (
                        <div className="mt-3 h-8 w-16 animate-pulse rounded bg-gray-200" />
                    ) : (
                        <p className="mt-3 text-2xl font-semibold text-green-600">
                            {queueData?.status?.used ?? 0}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};
