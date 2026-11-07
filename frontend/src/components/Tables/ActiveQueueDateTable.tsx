
import { useState, useEffect } from "react";
import { TableUI } from "../../ui/form/TableUI";
import { ErrorText } from "../../ui/form/ErrorText";
import { useGetActiveQueue } from "../../hooks/useGetActiveQueue";
import { ViewFeedbackModal } from "../Modals/ViewFeedbackModal";
import { PaginationUI } from "../../ui/form/PaginationUI";
import { InlineLoader } from "../Loader";
import { CSFCustomToaster } from "../../utils/Toaster";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import notFoundReport from "../../assets/not-found-report.json";

export interface ActiveQueueDateTableProps {
  onDateChange?: (date: Date) => void;
  statusFilter?: string;
}

export const ActiveQueueDateTable = ({
  onDateChange,
  statusFilter = "",
}: ActiveQueueDateTableProps) => {
  const [page, setPage] = useState<number>(1);

  const {
    data,
    isLoading,
    isError,
    error,
  } = useGetActiveQueue(page, statusFilter);

  const [feedbackModalOpen, setFeedbackModalOpen] =
    useState<boolean>(false);

  const [selectedFeedback, setSelectedFeedback] =
    useState<string | null>(null);

  useEffect(() => {
    setPage(1);
  }, [statusFilter]);

  useEffect(() => {
    if (data?.date) {
      onDateChange?.(new Date(data.date));
    }
  }, [data?.date, onDateChange]);

  const statusLabel = !statusFilter
    ? "All statuses"
    : `${statusFilter.charAt(0).toUpperCase()}${statusFilter.slice(1)}`;

  const total = statusFilter
    ? data?.status?.[
        statusFilter as keyof typeof data.status
      ] ?? 0
    : data?.total ?? 0;

  const handleCopyTicket = async (ticketCode: string) => {
    try {
      await navigator.clipboard.writeText(ticketCode);
      CSFCustomToaster.success(`Ticket ${ticketCode} copied`);
    } catch {
      CSFCustomToaster.error("Unable to copy ticket");
    }
  };

  return (
    <>
      <TableUI>
        <thead>
          <tr>
            <th className="w-[25%] px-4 py-3">ticket</th>
            <th className="w-[15%] px-4 py-3">status</th>
            <th className="w-[35%] px-4 py-3">selected service</th>
            <th className="w-[25%] px-4 py-3">actions</th>
          </tr>
        </thead>

        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={4}>
                <InlineLoader />
              </td>
            </tr>
          ) : isError ? (
            <tr>
              <td colSpan={4}>
                <ErrorText message={(error as Error).message} />
              </td>
            </tr>
          ) : data?.queue && data.queue.length > 0 ? (
            data.queue.map((queue) => (
              <tr key={queue._id}>
                <td>
                  <div className="flex min-w-0 items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleCopyTicket(queue.code)}
                      aria-label={`Copy ticket ${queue.code}`}
                      title={`Copy ticket ${queue.code}`}
                      className="shrink-0 cursor-pointer rounded p-1 transition-colors hover:bg-[#628dec]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#628dec]"
                    >
                      <img
                        src="/icons/copy-ticket.svg"
                        alt=""
                        aria-hidden="true"
                        className="h-5 w-5"
                      />
                    </button>

                    <div className="min-w-0">
                      <div className="truncate text-lg">
                        {queue.code}
                      </div>

                      <small className="block truncate text-sm text-gray-500 tracking-wider font-light">
                        CSF{queue._id}.v1
                      </small>
                    </div>
                  </div>
                </td>

                <td className="capitalize">
                  <small
                    className={`inline-flex items-center whitespace-nowrap tracking-wide rounded-full px-2.5 py-1 text-sm font-medium border ${
                      queue.status === "pending"
                        ? "bg-amber-100 text-amber-800 border-amber-400"
                        : queue.status === "used"
                          ? "bg-green-100 text-green-800 border-green-400"
                          : "bg-blue-50 text-blue-800 border-blue-300"
                    }`}
                  >
                    <span className="mr-1 text-xl leading-none">
                      •
                    </span>
                    {queue.status}
                  </small>
                </td>

                <td>
                  <p className="line-clamp-2">
                    {queue.selectedService
                      .map((service) =>
                        service
                          .replace(/_/g, " ")
                          .toLowerCase()
                          .replace(/\b\w/g, (char) =>
                            char.toUpperCase()
                          )
                      )
                      .join(", ")}
                  </p>
                </td>

                <td>
                  {queue.status === "pending" ? (
                    <>- -</>
                  ) : (
                    <button
                      onClick={() => {
                        setFeedbackModalOpen(true);
                        setSelectedFeedback(queue.code);
                      }}
                      className="text-[#000814] bg-[#FFC300] rounded-md px-2.5 py-1 hover:bg-[#E5AC00] transition-colors duration-200 font-semibold tracking-wider cursor-pointer"
                    >
                      Review Feedback
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="py-12">
                <div className="m-9 flex max-w-full flex-col items-center justify-center px-4 text-center">
                  <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 sm:h-16 sm:w-16 md:h-[72px] md:w-[72px]">
                    <DotLottieReact
                      data={notFoundReport}
                      loop
                      autoplay
                      aria-label="No tickets found"
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>

                  <p className="block max-w-full text-base font-semibold text-slate-500 sm:text-lg lg:text-xl">
                    No {statusFilter ? `${statusLabel.toLowerCase()} ` : ""}tickets found
                  </p>

                  <p className="mt-1 text-xs text-gray-400 sm:text-sm">
                    {statusFilter
                      ? `Try changing the Filter by selection, then check again.`
                      : "Try changing the Filter by selection or check back later."}
                  </p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </TableUI>

      {/* Total */}
      <p className="mx-2 my-2 text-xs lg:text-sm text-slate-500 capitalize border-b border-slate-200 py-4">
        Total {statusLabel.toLowerCase()}: {total} ticket{total === 1 ? "" : "s"}
      </p>

      {/* Pagination */}
      {!isLoading &&
        !isError &&
        (data?.queue?.length ?? 0) > 0 && (
          <PaginationUI
            currentPage={data?.page ?? page}
            totalPages={data?.totalPages ?? 1}
            onPageChange={setPage}
          />
        )}

      {/* Feedback Modal */}
      <ViewFeedbackModal
        feedbackModalOpen={feedbackModalOpen}
        setFeedbackModalOpen={setFeedbackModalOpen}
        selectedFeedback={selectedFeedback}
      />
    </>
  );
};
