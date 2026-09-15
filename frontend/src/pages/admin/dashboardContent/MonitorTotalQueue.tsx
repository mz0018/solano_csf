import { useGetActiveQueue } from "../../../hooks/useGetActiveQueue";

export const MonitorTotalQueue = () => {

    const {
        data: queueData,
        isLoading: queueLoading,
    } = useGetActiveQueue();

    return (
        <div className="w-full p-4">
            <h1 className="mb-6 text-2xl font-bold">Dashboard</h1>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {/* Total Queues */}
                <div className="rounded-lg border bg-white p-5 shadow-sm">
                    <p className="text-sm font-medium text-gray-500">
                        Total Queues
                    </p>

                    {queueLoading ? (
                        <div className="mt-2 h-9 w-16 animate-pulse rounded bg-gray-200" />
                    ) : (
                        <p className="mt-2 text-3xl font-bold text-gray-900">
                            {queueData?.total ?? 0}
                        </p>
                    )}
                </div>

                {/* Pending */}
                <div className="rounded-lg border bg-white p-5 shadow-sm">
                    <p className="text-sm font-medium text-gray-500">
                        Pending
                    </p>

                    {queueLoading ? (
                        <div className="mt-2 h-9 w-16 animate-pulse rounded bg-gray-200" />
                    ) : (
                        <p className="mt-2 text-3xl font-bold text-yellow-600">
                            {queueData?.status?.pending ?? 0}
                        </p>
                    )}
                </div>

                {/* Used */}
                <div className="rounded-lg border bg-white p-5 shadow-sm">
                    <p className="text-sm font-medium text-gray-500">
                        Used
                    </p>

                    {queueLoading ? (
                        <>Loading...</>
                    ) : (
                        <p className="mt-2 text-3xl font-bold text-green-600">
                            {queueData?.status?.used ?? 0}
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}
