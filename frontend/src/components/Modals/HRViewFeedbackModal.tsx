import { ModalUI } from "../../ui/form/ModalUI"
import { useGetDetailedFeedback } from "../../hooks/useGetDetailedFeedback"
import { ErrorText } from "../../ui/form/ErrorText"
import { InlineLoader } from "../Loader"

type HRViewFeedbackModalProps = {
  feedbackModalOpen: boolean
  setFeedbackModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  selectedFeedback: string | null
}

export const HRViewFeedbackModal = ({
  feedbackModalOpen,
  setFeedbackModalOpen,
  selectedFeedback,
}: HRViewFeedbackModalProps) => {
  const { data, isLoading, isError } = useGetDetailedFeedback(
    selectedFeedback ?? ""
  )

  return (
    <ModalUI
      isOpen={feedbackModalOpen}
      onClose={() => setFeedbackModalOpen(false)}
      title={`${selectedFeedback}`}
    >
      <div className="w-full overflow-hidden rounded-sm border border-gray-200 bg-white">
        {isLoading ? (
          <div className="p-4">
            <InlineLoader message="Loading feedback..." />
          </div>
        ) : isError ? (
          <div className="p-4">
            <ErrorText message="Failed to load feedback. Please try again later." />
          </div>
        ) : data ? (
          <>
            {/* Client & Service */}
            <div className="border-b border-gray-200 px-3 py-3 sm:px-4">
                <div className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
                    <div className="min-w-0">
                    <p className="tracking-wider text-[10px] text-gray-400 uppercase sm:text-xs">
                        Name:
                    </p>
                    <p className="break-words text-xs font-medium sm:text-sm">
                        {data.feedback?.client?.name}
                    </p>
                    </div>

                    <div className="min-w-0">
                    <p className="tracking-wider text-[10px] text-gray-400 uppercase sm:text-xs">
                        Gender:
                    </p>
                    <p className="break-words text-xs font-medium sm:text-sm">
                        {data.feedback?.client?.gender}
                    </p>
                    </div>

                    <div className="min-w-0">
                    <p className="tracking-wider text-[10px] text-gray-400 uppercase sm:text-xs">
                        Status:
                    </p>
                    <p className="break-words text-xs font-medium sm:text-sm">
                        {data.feedback?.client?.employmentStatus}
                    </p>
                    </div>

                    <div className="min-w-0">
                    <p className="tracking-wider text-[10px] text-gray-400 uppercase sm:text-xs">
                        Address:
                    </p>
                    <p className="break-words text-xs font-medium sm:text-sm">
                        {data.feedback?.client?.address}
                    </p>
                    </div>

                    <div className="min-w-0">
                    <p className="tracking-wider text-[10px] text-gray-400 uppercase sm:text-xs">
                        Service:
                    </p>
                    <p className="break-words text-xs font-medium sm:text-sm">
                        {data.feedback?.service}
                    </p>
                    </div>
                </div>
            </div>

            {/* Ratings */}
            {data.feedback?.ratings && (
              <div className="border-b border-gray-200 px-3 py-3 sm:px-4">
                <div className="grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-2">
                  {Object.entries(data.feedback.ratings).map(
                    ([key, value]) => (
                      <div key={key} className="min-w-0">
                        <p className="truncate text-[10px] text-gray-400 uppercase sm:text-xs tracking-wider">
                          {key}
                        </p>
                        <p className="text-xs font-medium sm:text-sm">
                          {value as number}/5
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            {/* Comments */}
            {data.feedback?.comments && (
              <div className="px-3 py-3 sm:px-4">
                <div className="rounded-md border border-gray-200 bg-gray-50 px-3 py-2">
                  <p className="mb-1 text-[10px] text-gray-400 sm:text-xs">
                    Comments
                  </p>

                  <p className="break-words text-xs leading-5 text-gray-700 sm:text-sm">
                    {data.feedback.comments}
                  </p>
                </div>
              </div>
            )}
          </>
        ) : null}
      </div>
    </ModalUI>
  )
}
