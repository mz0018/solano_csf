import { useState, useEffect } from "react";
import { TableUI } from "../../ui/form/TableUI";
import { ErrorText } from "../../ui/form/ErrorText";
import { useGetActiveQueue } from "../../hooks/useGetActiveQueue";
import { ViewFeedbackModal } from "../Modals/ViewFeedbackModal";
import { PaginationUI } from "../../ui/form/PaginationUI";
import { Fullscreen, Search } from "lucide-react";
import { InlineLoader } from "../Loader";

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

  return (
    <>
      <TableUI>
        <thead>
          <tr>
            <th>Ticket</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={3}>
                <InlineLoader />
              </td>
            </tr>
          ) : isError ? (
            <tr>
              <td colSpan={3}>
                <ErrorText message={(error as Error).message} />
              </td>
            </tr>
          ) : data?.queue && data.queue.length > 0 ? (
              data.queue.map((queue) => (
              <tr key={queue._id}>
                <td>{queue.code}</td>

                <td className="capitalize">
                  {queue.status}
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
                      className="inline-flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100"
                    >
                      <Fullscreen size={16} />
                      <span>Review</span>
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="py-12">
                <div className="flex flex-col items-center justify-center text-center m-9">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                    <Search size={22} className="text-gray-400" />
                  </div>

                  <p className="text-sm font-medium text-gray-700">
                    No {statusFilter || ""} tickets found
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    Try changing the filter or check back later.
                  </p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </TableUI>

      {/* Total */}
      <p className="mx-2 text-sm text-gray-500 capitalize tracking-wider">
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
