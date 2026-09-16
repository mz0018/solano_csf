import { useState } from "react";
import { TableUI } from "../../ui/form/TableUI";
import { HRViewFeedbackModal } from "../Modals/HRViewFeedbackModal";
import { PaginationUI } from "../../ui/form/PaginationUI";
import { Fullscreen, Search } from "lucide-react";

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
    hasSelectedOffice: boolean;
};

export const PerOfficeQueueTable = ({ feedbacks, totalPages, page, onPageChange, hasSelectedOffice }: Props) => {

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
                    {!hasSelectedOffice ? (
                        <tr>
                            <td colSpan={4} className="py-8 text-center">
                                <div className="m-9 flex flex-col items-center justify-center text-center">
                                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                                        <Search size={22} className="text-gray-400" />
                                    </div>

                                    <p className="text-sm font-medium text-gray-700">
                                        Please select an office
                                    </p>

                                    <p className="mt-1 text-xs text-gray-400">
                                        Select a municipality office to view its feedback.
                                    </p>
                                </div>
                            </td>
                        </tr>
                    ) : feedbacks.length === 0 ? (
                        <tr>
                            <td colSpan={4} className="py-8 text-center">
                                <div className="m-9 flex flex-col items-center justify-center text-center">
                                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                                        <Search size={22} className="text-gray-400" />
                                    </div>

                                    <p className="text-sm font-medium text-gray-700">
                                        No Feedbacks found
                                    </p>

                                    <p className="mt-1 text-xs text-gray-400">
                                        Try changing the filter or check back later.
                                    </p>
                                </div>
                            </td>
                        </tr>
                    ) : (
                        feedbacks.map((item) => (
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
                                        className="inline-flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100"
                                    >
                                        <Fullscreen size={16} />
                                        <span>Review</span>
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
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