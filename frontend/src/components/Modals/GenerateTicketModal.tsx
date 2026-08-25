import { useState } from "react"
import { ModalUI } from "../../ui/form/ModalUI"
import { Button } from "../../ui/form/Buttons"
import { useGenerateTicket } from "../../hooks/useGenerateTicket"

type GenerateTicketModalProps = {
  isModalOpen: boolean
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const GenerateTicketModal = ({ isModalOpen, setIsModalOpen }: GenerateTicketModalProps) => {

  const { createNewTicket, isGeneratingTicket } = useGenerateTicket(() => setIsModalOpen(false))
  const [ticketCount, setTicketCount] = useState<number>(2)
  const [isMultipleMode, setIsMultipleMode] = useState<boolean>(false)

  const handleGenerateTicket = () => {
    createNewTicket(isMultipleMode ? ticketCount : 1)
  }

  return (
    <ModalUI
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      title="Generate Ticket"
      footer={
        <Button
          disabled={isGeneratingTicket}
          onClick={handleGenerateTicket}
          className="w-full bg-blue-500 text-white p-4 rounded-sm cursor-pointer hover:bg-blue-600 transition-colors"
        >
          {isGeneratingTicket ? 'Loading...' : `Generate`}
        </Button>
      }
    >

      <div className="space-y-4">

        <p className="text-sm text-gray-500">
          Generate a new queue ticket?
        </p>

        {/* Switch */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">
            Multiple Generate
          </span>

          <button
            type="button"
            onClick={() => {
              setIsMultipleMode(prev => {
                if (prev) {
                  setTicketCount(2)
                }
                return !prev
              })
            }}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
              isMultipleMode
                ? "bg-blue-600"
                : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                isMultipleMode
                  ? "translate-x-6"
                  : "translate-x-1"
              }`}
            />
          </button>
        </div>

        <div className="space-y-3">
            <p className="text-sm text-gray-500">
                Mode:{" "}
                <span className="font-medium text-gray-700">
                {isMultipleMode ? "Multiple Tickets" : "Single Ticket"}
                </span>
            </p>

            {isMultipleMode && (
                <div>
                <label className="text-sm font-medium text-gray-700">
                    How many tickets should be generated?
                </label>

                <input
                  type="number"
                  min={2}
                  value={ticketCount}
                  className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  onChange={(e) => {
                    const value = Number(e.target.value)
                    setTicketCount(value < 2 ? 2 : value)
                  }}
                />
                </div>
            )}
        </div>

      </div>

    </ModalUI>
  )
}