import { useState } from "react";
import { TableUI } from "../../ui/form/TableUI";
import { HRViewFeedbackModal } from "../Modals/HRViewFeedbackModal";
import { PaginationUI } from "../../ui/form/PaginationUI";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import notFoundReport from "../../assets/not-found-report.json";

type Feedback = {
    _id: string
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

const getRatingClass = (averageRating: string) => {
    const rating = Number.parseFloat(averageRating);

    if (!Number.isFinite(rating)) return "border-slate-300 bg-slate-100 text-slate-500";
    if (rating >= 4.5) return "border-green-400 bg-green-100 text-green-700";
    if (rating >= 3.5) return "border-lime-400 bg-lime-100 text-lime-700";
    if (rating >= 2.5) return "border-amber-400 bg-amber-100 text-amber-700";
    if (rating >= 1.5) return "border-orange-400 bg-orange-100 text-orange-700";

    return "border-red-400 bg-red-100 text-red-700";
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
                                        <DotLottieReact
                                            data={notFoundReport}
                                            loop
                                            autoplay
                                            style={{ width: "100%", height: "100%" }}
                                        />
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
                                    <div className="mb-3 flex h-14 w-14 items-center justify-center sm:h-16 sm:w-16 md:h-[72px] md:w-[72px]">
                                        <DotLottieReact
                                            data={notFoundReport}
                                            loop
                                            autoplay
                                            style={{ width: "100%", height: "100%" }}
                                        />
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
                                    <div className="flex min-w-0 items-center gap-2">
                                        <img
                                            src="/icons/ticket.svg"
                                            alt=""
                                            aria-hidden="true"
                                            className="h-5 w-5 shrink-0"
                                        />

                                        <div className="min-w-0">
                                            <div className="truncate text-lg">
                                                {item.queueNumber}
                                            </div>

                                            <small className="block truncate text-sm text-gray-500 tracking-wider font-light">
                                                {item._id}
                                            </small>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <p className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 ${getRatingClass(item.averageRating)}`}>
                                        <span className="mr-1 text-xl leading-none">•</span>
                                        {item.averageRating}
                                    </p>
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
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setFeedbackModalOpen(true);
                                            setSelectedFeedback(item.queueNumber);
                                        }}
                                        className="text-[#000814] bg-[#FFC300] rounded-md px-2.5 py-1 hover:bg-[#E5AC00] transition-colors duration-200 font-semibold tracking-wider cursor-pointer"
                                    >
                                        Review
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