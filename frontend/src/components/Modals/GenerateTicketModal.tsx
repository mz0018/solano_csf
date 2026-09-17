import { useEffect, useState } from "react"
import { ModalUI } from "../../ui/form/ModalUI"
import { Button } from "../../ui/form/Buttons"
import { useGenerateTicket } from "../../hooks/useGenerateTicket"
import { useGetServices } from "../../hooks/useGetServices"
import type { Service } from "../../hooks/useGetServices"
import { Select } from "../../ui/form/Select"
import { ErrorText } from "../../ui/form/ErrorText"

type GenerateTicketModalProps = {
  isModalOpen: boolean
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const GenerateTicketModal = ({ isModalOpen, setIsModalOpen }: GenerateTicketModalProps) => {

  const { createNewTicket, isGeneratingTicket } = useGenerateTicket(() => setIsModalOpen(false))
  const { getOfficeService } = useGetServices()
  const [ticketCount, setTicketCount] = useState<number>(2)
  const [isMultipleMode, setIsMultipleMode] = useState<boolean>(false)
  const [services, setServices] = useState<Service[]>([])
  const [selectedService, setSelectedService] = useState<string>("")
  const [serviceError, setServiceError] = useState<string>("")

  const sortedServices = [
    ...services.filter((service) => service.name !== "Other Service"),
    ...services.filter((service) => service.name === "Other Service"),
  ]

  const handleGenerateTicket = () => {

    if (!selectedService) {
      setServiceError('Service is required')
      return
    }
    setServiceError("")
    createNewTicket(isMultipleMode ? ticketCount : 1, selectedService)
  }

  useEffect(() => {
    if (!isModalOpen) return

    const fetchServices = async () => {
      const data = await getOfficeService()
      if (data) {
        setServices(data)
      }
    }

    fetchServices()
  }, [isModalOpen, getOfficeService])

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

        {/* Service */}
        <div className="space-y-2">
          <label
            htmlFor="services"
            className="text-sm font-medium text-gray-700"
          >
            Service
          </label>

          <div className="w-96">
            <Select
              id="services"
              variant="admin"
              onChange={(e) => setSelectedService(e.target.value)}
              error={serviceError}
            >
              <option value="">Please select a service</option>

              {sortedServices.map((service) => (
                <option key={service.code} value={service.code}>
                  {service.name}
                </option>
              ))}
            </Select>
            {serviceError && (
              <ErrorText message={serviceError} />
            )}
          </div>
        </div>

        {/* Multiple Generate */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-sm font-medium text-gray-700">
            Multiple Generate
          </span>

          <button
            type="button"
            onClick={() => {
              setIsMultipleMode((prev) => {
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
              {isMultipleMode
                ? "Multiple Tickets"
                : "Single Ticket"}
            </span>
          </p>

          {isMultipleMode && (
            <div>
              <label
                htmlFor="ticket-count"
                className="text-sm font-medium text-gray-700"
              >
                How many tickets should be generated?
              </label>

              <input
                id="ticket-count"
                name="ticketCount"
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