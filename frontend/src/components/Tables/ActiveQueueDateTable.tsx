import { useState, useEffect } from "react";
import { TableUI } from "../../ui/form/TableUI";
import { ErrorText } from "../../ui/form/ErrorText";
import { useGetActiveQueue } from "../../hooks/useGetActiveQueue";
import { ViewFeedbackModal } from "../Modals/ViewFeedbackModal";
import { PaginationUI } from "../../ui/form/PaginationUI";
import { Fullscreen } from "lucide-react";
import { InlineLoader } from "../Loader";
export interface ActiveQueueDateTableProps {
  onDateChange?: (date: Date) => void;
}

export const ActiveQueueDateTable = ({ onDateChange }: ActiveQueueDateTableProps) => {
  const [page, setPage] = useState<number>(1);
  const { data, isLoading, isError, error } = useGetActiveQueue(page);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState<boolean>(false);
  const [selectedFeedback, setSelectedFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (data?.date) {
      onDateChange?.(new Date(data.date));
    }
  }, [data?.date, onDateChange]);

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
          ) : (
            data?.queue.map((queue) => (
              <tr key={queue._id}>
                <td>{queue.code}</td>
                <td className="capitalize">{queue.status}</td>
                <td>
                  {queue.status === "pending" ? (
                    <>- -</>
                  ) : (
                    <button
                      onClick={() => {
                        setFeedbackModalOpen(true);
                        setSelectedFeedback(queue.code);
                      }}
                      className="cursor-pointer inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100"
                    >
                      <Fullscreen size={16} />
                      <span>Review</span>
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </TableUI>

      {!isLoading && !isError && (data?.queue?.length ?? 0) > 0 && (
        <PaginationUI
          currentPage={data?.page ?? page}
          totalPages={data?.totalPages ?? 1}
          onPageChange={setPage}
        />
      )}

      <ViewFeedbackModal feedbackModalOpen={feedbackModalOpen} setFeedbackModalOpen={setFeedbackModalOpen} selectedFeedback={selectedFeedback} />
    </>
  );
};