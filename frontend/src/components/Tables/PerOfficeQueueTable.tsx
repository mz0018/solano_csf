import { useState } from "react";
import { TableUI } from "../../ui/form/TableUI";
import { AdminButton } from "../../ui/form/AdminButton";
import { HRViewFeedbackModal } from "../Modals/HRViewFeedbackModal";
import { PaginationUI } from "../../ui/form/PaginationUI";

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
    selectedOfficeName?: string;
    selectedPeriod?: string;
};

const getRatingIcon = (averageRating: string) => {
    const rating = Number.parseFloat(averageRating);

    if (!Number.isFinite(rating)) return "/icons/line-graph.svg";
    if (rating >= 4.5) return "/icons/very-satisfied.svg";
    if (rating >= 3.5) return "/icons/satisfied.svg";
    if (rating >= 2.5) return "/icons/neutral.svg";
    if (rating >= 1.5) return "/icons/dissatisfied.svg";

    return "/icons/very-dissatisfied.svg";
};

export const PerOfficeQueueTable = ({
    feedbacks,
    totalPages,
    page,
    onPageChange,
    hasSelectedOffice,
    selectedOfficeName,
    selectedPeriod,
}: Props) => {

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
                    {!hasSelectedOffice || !selectedPeriod ? (
                        <tr>
                            <td colSpan={4} className="py-8 text-center">
                                <div className="m-9 flex max-w-full flex-col items-center justify-center px-4 text-center">
                                    <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 sm:h-16 sm:w-16 md:h-[72px] md:w-[72px]">
                                        <img src="/icons/records.svg" alt="" aria-hidden="true" className="h-8 w-8 sm:h-9 sm:w-9" />
                                    </div>

                                    <p className="block text-base font-semibold text-slate-500 sm:text-lg lg:text-xl">
                                        Please select an office, month, and year
                                    </p>

                                    <p className="mt-1 text-xs text-gray-400 sm:text-sm">
                                        Choose the filters above to view office feedback.
                                    </p>
                                </div>
                            </td>
                        </tr>
                    ) : feedbacks.length === 0 ? (
                        <tr>
                            <td colSpan={4} className="py-8 text-center">
                                <div className="m-9 flex max-w-full flex-col items-center justify-center px-4 text-center">
                                    <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 sm:h-16 sm:w-16 md:h-[72px] md:w-[72px]">
                                        <img src="/icons/table-graph.svg" alt="" aria-hidden="true" className="h-8 w-8 sm:h-9 sm:w-9" />
                                    </div>

                                    <p className="block max-w-full text-base font-semibold text-slate-500 sm:text-lg lg:text-xl">
                                        No feedback found for {selectedOfficeName ?? "the selected office"}{selectedPeriod ? ` in ${selectedPeriod}` : ""}
                                    </p>

                                    <p className="mt-1 text-xs text-gray-400 sm:text-sm">
                                        Try changing the office, month, or year filter, then check again.
                                    </p>
                                </div>
                            </td>
                        </tr>
                    ) : (
                        feedbacks.map((item) => (
                            <tr key={item.queueNumber}>
                                <td>
                                    <span className="inline-flex items-center gap-2">
                                        <img src="/icons/ticket.svg" alt="" aria-hidden="true" className="h-5 w-5" />
                                        {item.queueNumber}
                                    </span>
                                </td>
                                <td>
                                    <span className="inline-flex items-center gap-2">
                                        <img src={getRatingIcon(item.averageRating)} alt="" aria-hidden="true" className="h-5 w-5" />
                                        {item.averageRating}
                                    </span>
                                </td>
                                <td>
                                    <span className="inline-flex items-center gap-2">
                                        <img src="/icons/date-time.svg" alt="" aria-hidden="true" className="h-5 w-5" />
                                        {new Date(item.createdAt).toLocaleString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                            hour: "numeric",
                                            minute: "2-digit",
                                        })}
                                    </span>
                                </td>
                                <td>
                                    <AdminButton
                                        type="button"
                                        icon="/icons/open.svg"
                                        iconAlt="Review Feedback"
                                        onClick={() => {
                                            setFeedbackModalOpen(true);
                                            setSelectedFeedback(item.queueNumber);
                                        }}
                                        className="border border-[#2563EB] py-2 text-sm font-semibold text-[#2563EB] transition-colors hover:bg-[#2563EB]/10"
                                    >
                                        Review
                                    </AdminButton>
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