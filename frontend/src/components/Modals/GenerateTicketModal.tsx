import { useEffect, useState } from "react"

import { ModalUI } from "../../ui/form/ModalUI"
import { Button } from "../../ui/form/Buttons"
import { useGenerateTicket } from "../../hooks/useGenerateTicket"
import { useGetServices } from "../../hooks/useGetServices"
import type { Service } from "../../hooks/useGetServices"
import { ErrorText } from "../../ui/form/ErrorText"
import { Input } from "../../ui/form/Input"
import { printQr } from "../../utils/printQr"

type GeneratedQrCode = {
  ticket: {
    code: string
    createdAt: string
    generatedBy: string
    officeCode: string
    selectedService: string[]
    status: string
    updatedAt: string
    _id: string
    otherServiceDetail?: string | null
  }
  qrCode: string
}


type GenerateTicketModalProps = {
  isModalOpen: boolean
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const GenerateTicketModal = ({
  isModalOpen,
  setIsModalOpen,
}: GenerateTicketModalProps) => {
  const { createNewTicket, isGeneratingTicket } = useGenerateTicket()

  const { getOfficeService } = useGetServices()

  const [services, setServices] = useState<Service[]>([])
  const [selectedService, setSelectedService] = useState<string[]>([])
  const [serviceError, setServiceError] = useState<string>("")
  const [otherText, setOtherText] = useState<string>("")
  const [otherError, setOtherError] = useState<string>("")
  const [activeQr, setActiveQr] = useState<GeneratedQrCode | null>(null)


  const sortedServices = [
    ...services.filter((service) => service.name !== "Other Service"),
    ...services.filter((service) => service.name === "Other Service"),
  ]

  const otherService = services.find(
    (s) => s.name === "Other Service"
  )

  const isOtherSelected = otherService
    ? selectedService.includes(otherService.code)
    : false

  const handleServiceChange = (serviceCode: string) => {
    setSelectedService((prev) => {
      const isCurrentlySelected = prev.includes(serviceCode)

      if (
        otherService &&
        serviceCode === otherService.code &&
        isCurrentlySelected
      ) {
        setOtherText("")
        setOtherError("")
      }

      return isCurrentlySelected
        ? prev.filter((code) => code !== serviceCode)
        : [...prev, serviceCode]
    })

    setServiceError("")
  }

  const handleGenerateTicket = async () => {
    if (selectedService.length === 0) {
      setServiceError("Service is required")
      return
    }

    if (isOtherSelected && !otherText.trim()) {
      setOtherError("Please specify other service")
      return
    }

    setServiceError("")
    setOtherError("")

    const qrCodes = await createNewTicket(selectedService, otherText.trim())
    if (qrCodes?.length) {
      setActiveQr(qrCodes[0])
    }

  }

  useEffect(() => {
    if (!isModalOpen) {
      return
    }

    const fetchServices = async () => {
      const data = await getOfficeService()

      if (data) {
        setServices(data)
      }
    }

    fetchServices()
  }, [isModalOpen, getOfficeService])

  const handleClose = () => {
    setSelectedService([])
    setOtherText("")
    setServiceError("")
    setOtherError("")
    setIsModalOpen(false)
  }

  return (
    <ModalUI
      isOpen={isModalOpen}
      onClose={handleClose}
      title="Generate Ticket"
      footer={
        activeQr ? (
          <Button
            onClick={() => printQr(activeQr.qrCode, activeQr.ticket.code)}
            className="w-full bg-blue-500 text-white p-4 rounded-sm cursor-pointer hover:bg-blue-600 transition-colors"
          >
            Print QR
          </Button>
        ) : (
          <Button
            disabled={isGeneratingTicket}
            onClick={handleGenerateTicket}
            className="w-full bg-blue-500 text-white p-4 rounded-sm cursor-pointer hover:bg-blue-600 transition-colors"
          >
            {isGeneratingTicket ? "Loading..." : "Generate"}
          </Button>
        )
      }
    >
      <div className="space-y-4">
        {!activeQr ? (
          <>
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

                {isOtherSelected && (
                  <div className="pt-2">
                    <Input
                      type="text"
                      placeholder="Please specify other service"
                      value={otherText}
                      onChange={(e) => {
                        setOtherText(e.target.value)

                        if (otherError) {
                          setOtherError("")
                        }
                      }}
                      error={otherError}
                      className="w-full p-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                      autoFocus
                    />

                    {otherError && (
                      <p className="mt-1 text-xs text-red-500">
                        {otherError}
                      </p>
                    )}
                  </div>
                )}

                {serviceError && (
                  <ErrorText message={serviceError} />
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <p className="text-xl font-bold">
              {activeQr.ticket.code}
            </p>

            <img
              src={activeQr.qrCode}
              alt="Ticket QR Code"
              className="w-64 h-64"
            />
          </div>
        )}
      </div>
    </ModalUI>
  )
}
