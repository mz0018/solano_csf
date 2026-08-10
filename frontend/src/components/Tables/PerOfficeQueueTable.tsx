import { useState } from "react";
import { TableUI } from "../../ui/form/TableUI";
import { HRViewFeedbackModal } from "../Modals/HRViewFeedbackModal";
import { PaginationUI } from "../../ui/form/PaginationUI";
import { Fullscreen } from "lucide-react";

type Feedback = {
    queueNumber: string
    createdAt: string
    averageRating: string
}

type Props = {
    feedbacks: Feedback[];
    totalPages: number;
    page: number;
    onPageChange: (page: number) => void;
};

export const PerOfficeQueueTable = ({ feedbacks, totalPages, page, onPageChange }: Props) => {

    const [feedbackModalOpen, setFeedbackModalOpen] = useState<boolean>(false);
    const [selectedFeedback, setSelectedFeedback] = useState<string | null>(null);

    return (
        <>
            <TableUI>
                <thead>
                    <tr>
                        <th>Queue Number</th>
                        <th>Average Rating</th>
                        <th>Date Created</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {feedbacks.map((item) => (
                        <tr key={item.queueNumber}>
                            <td>{item.queueNumber}</td>
                            <td>{item.averageRating}</td>
                            <td>
                                {new Date(item.createdAt).toLocaleString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                    hour: "numeric",
                                    minute: "2-digit",
                                })}
                            </td>
                            <td>
                                <button
                                    onClick={() => {
                                            setFeedbackModalOpen(true);
                                            setSelectedFeedback(item.queueNumber);
                                        }}
                                    className="cursor-pointer inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100"
                                    >
                                    <Fullscreen size={16} />
                                    <span>Review</span>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </TableUI>

            {totalPages > 1 && (
                <PaginationUI
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                />
            )}

            <HRViewFeedbackModal
                feedbackModalOpen={feedbackModalOpen}
                setFeedbackModalOpen={setFeedbackModalOpen}
                selectedFeedback={selectedFeedback}
            />
        </>
    );
};