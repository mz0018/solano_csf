import { ModalUI } from "../../ui/form/ModalUI"
import { useGetDetailedFeedback } from "../../hooks/useGetDetailedFeedback"
import { ErrorText } from "../../ui/form/ErrorText"
import { InlineLoader } from "../Loader"

type HRViewFeedbackModalProps = {
  feedbackModalOpen: boolean
  setFeedbackModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  selectedFeedback: string | null
}
export const HRViewFeedbackModal = ({ feedbackModalOpen, setFeedbackModalOpen, selectedFeedback }: HRViewFeedbackModalProps) => {
    const { data, isLoading, isError } = useGetDetailedFeedback(selectedFeedback ?? "")
    return (
        <ModalUI
            isOpen={feedbackModalOpen}
            onClose={() => setFeedbackModalOpen(false)}
            title={`Review ${selectedFeedback} Feedback`}
        >
            <div className="space-y-4">
                {isLoading ? (
                    <InlineLoader message="Loading feedback..." />
                ) : isError ? (
                    <ErrorText message="Failed to load feedback. Please try again later." />
                ) : data ? (
                    <>
                        <div>
                            <p className="text-sm font-medium">Client: {data.feedback?.client?.name}</p>
                            <p className="text-sm font-medium">Client: {data.feedback?.client?.gender}</p>
                            <p className="text-sm font-medium">Client: {data.feedback?.client?.employmentStatus}</p>
                            <p className="text-sm font-medium">Client: {data.feedback?.client?.address}</p>
                            <p className="text-sm text-gray-500">Service: {data.feedback?.service}</p>
                        </div>
                        {/* Ratings */}
                        <div className="grid grid-cols-2 gap-2">
                            {data.feedback?.ratings && Object.entries(data.feedback.ratings).map(([key, value]) => (
                                <div key={key}>
                                    <p className="text-xs text-gray-400">{key}</p>
                                    <p className="text-sm font-medium">{value as number}/5</p>
                                </div>
                            ))}
                        </div>
                        {/* Comments */}
                        {data.feedback?.comments && (
                            <div>
                                <p className="text-xs text-gray-400">Comments</p>
                                <p className="text-sm">{data.feedback.comments}</p>
                            </div>
                        )}
                    </>
                ) : null}
            </div>
        </ModalUI>
    )
}