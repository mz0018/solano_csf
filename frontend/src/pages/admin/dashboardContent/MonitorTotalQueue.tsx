import { useGetActiveQueue } from "../../../hooks/useGetActiveQueue";

export const MonitorTotalQueue = () => {
    const { data: queueData, isLoading: queueLoading } =
        useGetActiveQueue();

    const totalQueues = queueData?.total ?? 0;
    const pendingQueues = queueData?.status?.pending ?? 0;
    const usedQueues = queueData?.status?.used ?? 0;

    const queueCards = [
        {
            title: "Total Queues",
            value: totalQueues,
            description: "Currently in queue",
            icon: "/icons/total.svg",
            dotColor: "bg-green-500",
        },
        {
            title: "Pending Queues",
            value: pendingQueues,
            description: "Waiting to be served",
            icon: "/icons/pending.svg",
        },
        {
            title: "Served Queues",
            value: usedQueues,
            description: "Queues already served",
            icon: "/icons/done.svg",
        },
    ];

    return (
        <div className="w-full min-w-0">
    {/* Dashboard Header - Mobile Only */}
    <div className="mb-4 border-b border-gray-300 py-3 lg:hidden">
        <h1 className="text-lg font-semibold text-[#628dec]">
            Dashboard
        </h1>
        <p className="mt-1 max-w-2xl text-sm leading-relaxed text-gray-600">
            Get an overview of the current queues, pending requests, and
            completed services.
        </p>
    </div>

    {/* Queue Cards */}
    <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 sm:gap-4">
        {queueCards.map((card) => {
            return (
                <div
                    key={card.title}
                    className="min-w-0 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5 lg:p-6"
                >
                    {/* Card Header */}
                    <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                            <p className="mb-3 text-base font-semibold text-[#628dec] sm:text-lg lg:text-xl">
                                {card.title}
                            </p>

                            <small className="inline-flex max-w-full items-center rounded-full border border-slate-200 px-3 py-1.5 text-xs font-light text-[#628dec] sm:text-sm">
                                {queueData?.date
                                    ? new Date(queueData.date).toLocaleDateString(
                                          "en-PH",
                                          {
                                              month: "long",
                                              timeZone: "Asia/Manila",
                                          }
                                      )
                                    : ""}
                            </small>
                        </div>

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#628dec]/10 sm:h-12 sm:w-12">
                            <img
                                src={card.icon}
                                alt=""
                                className="h-5 w-5 sm:h-6 sm:w-6"
                            />
                        </div>
                    </div>

                    {/* Queue Value */}
                    <div className="mt-4 min-h-10 sm:mt-5 sm:min-h-14">
                        {queueLoading ? (
                            <div className="h-8 w-16 animate-pulse rounded bg-gray-200 sm:h-10 sm:w-20" />
                        ) : (
                            <p className="break-words text-3xl font-bold leading-tight text-[#628dec] sm:text-4xl lg:text-5xl">
                                {card.value}
                            </p>
                        )}
                    </div>

                    {/* Card Footer */}
                    <div className="my-4 h-px bg-gray-100" />

                    <div className="flex min-w-0 items-start gap-2 text-xs leading-relaxed text-gray-500 sm:text-sm">
                        {card.dotColor && (
                            <span
                                className={`mt-1 h-2 w-2 shrink-0 rounded-full ${card.dotColor}`}
                            />
                        )}
                        <span>{card.description}</span>
                    </div>
                </div>
            );
        })}
    </div>
</div>
    );
};