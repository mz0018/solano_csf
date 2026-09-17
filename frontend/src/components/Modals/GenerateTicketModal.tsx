import { useEffect, useState } from "react"
import { ModalUI } from "../../ui/form/ModalUI"
import { Button } from "../../ui/form/Buttons"
import { useGenerateTicket } from "../../hooks/useGenerateTicket"
import { useGetServices } from "../../hooks/useGetServices"
import type { Service } from "../../hooks/useGetServices"
import { ErrorText } from "../../ui/form/ErrorText"

type GenerateTicketModalProps = {
  isModalOpen: boolean
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const GenerateTicketModal = ({ isModalOpen, setIsModalOpen }: GenerateTicketModalProps) => {

  const { createNewTicket, isGeneratingTicket } = useGenerateTicket(() => setIsModalOpen(false))
  const { getOfficeService } = useGetServices()
  const [services, setServices] = useState<Service[]>([])
  const [selectedService, setSelectedService] = useState<string[]>([])
  const [serviceError, setServiceError] = useState<string>("")

  const sortedServices = [
    ...services.filter((service) => service.name !== "Other Service"),
    ...services.filter((service) => service.name === "Other Service"),
  ]

  const handleServiceChange = (serviceCode: string) => {
    setSelectedService((prev) =>
      prev.includes(serviceCode)
        ? prev.filter((code) => code !== serviceCode)
        : [...prev, serviceCode]
    )

    setServiceError("")
  }

  const handleGenerateTicket = () => {
    if (selectedService.length === 0) {
      setServiceError("Service is required")
      return
    }

    setServiceError("")
    createNewTicket(selectedService)
  }

  useEffect(() => {
    if (!isModalOpen) return

    const fetchServices = async () => {
      const data = await getOfficeService()
      if (data) setServices(data)
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
          {isGeneratingTicket ? "Loading..." : "Generate"}
        </Button>
      }
    >
      <div className="space-y-4">
        <p className="text-sm text-gray-500">
          Generate a new queue ticket?
        </p>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Services
          </label>

          <div className="w-96 space-y-2">
            {sortedServices.map((service) => (
              <label
                key={service.code}
                className="flex items-center gap-3 p-3 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <input
                  type="checkbox"
                  value={service.code}
                  checked={selectedService.includes(service.code)}
                  onChange={() => handleServiceChange(service.code)}
                  className="h-4 w-4 rounded text-blue-500 focus:ring-blue-500"
                />

                <span className="text-sm text-gray-700">
                  {service.name}
                </span>
              </label>
            ))}

            {serviceError && <ErrorText message={serviceError} />}
          </div>
        </div>
      </div>
    </ModalUI>
  )
}
