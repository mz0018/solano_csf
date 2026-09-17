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
  const [services, setServices] = useState<Service[]>([])
  const [selectedService, setSelectedService] = useState<string>("")
  const [serviceError, setServiceError] = useState<string>("")

  const sortedServices = [
    ...services.filter((service) => service.name !== "Other Service"),
    ...services.filter((service) => service.name === "Other Service"),
  ]

  const handleGenerateTicket = () => {
    if (!selectedService) { setServiceError('Service is required'); return }
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
          {isGeneratingTicket ? 'Loading...' : `Generate`}
        </Button>
      }
    >
      <div className="space-y-4">
        <p className="text-sm text-gray-500">Generate a new queue ticket?</p>
        <div className="space-y-2">
          <label htmlFor="services" className="text-sm font-medium text-gray-700">Service</label>
          <div className="w-96">
            <Select id="services" variant="admin" onChange={(e) => setSelectedService(e.target.value)} error={serviceError}>
              <option value="">Please select a service</option>
              {sortedServices.map((service) => (
                <option key={service.code} value={service.code}>{service.name}</option>
              ))}
            </Select>
            {serviceError && <ErrorText message={serviceError} />}
          </div>
        </div>
      </div>
    </ModalUI>
  )
}