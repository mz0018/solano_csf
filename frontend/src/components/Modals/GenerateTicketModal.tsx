import { useState } from "react"
import { Input } from "../../ui/form/Input"
import { Select } from "../../ui/form/Select"
import { printQr } from "../../utils/printQr"
import { Button } from "../../ui/form/Buttons"
import { ModalUI } from "../../ui/form/ModalUI"
import { ErrorText } from "../../ui/form/ErrorText"
import { AdminButton } from "../../ui/form/AdminButton"
import { useMutateGenerateTicketHook } from "../../hooks/head_office_admin/useMutateGenerateTicketHook"
import { useQueryGetListOfServicesByOfficeHook } from "../../hooks/head_office_admin/useQueryGetListOfServicesByOfficeHook"
import { useQueryGetChildServicesByParentHook } from "../../hooks/head_office_admin/useQueryGetChildServicesByParentHook"

import type { GenerateTicketModalProps} from "../../types/ModalTypes"
import type { GeneratedQrCodeResponse } from "../../types/HeadOfficeAdminType"

export const GenerateTicketModal = ({ isModalOpen, setIsModalOpen }: GenerateTicketModalProps) => {

  const { mutate: createNewTicket, isPending: isGeneratingTicket } = useMutateGenerateTicketHook()

  const { data: childServices = [] } = useQueryGetChildServicesByParentHook()
  const { data: services = [] } = useQueryGetListOfServicesByOfficeHook()

  const [selectedService, setSelectedService] = useState<string[]>([])
  const [selectedChildServices, setSelectedChildServices] = useState<string>("")
  const [serviceError, setServiceError] = useState<string>("")
  const [childServiceError, setChildServiceError] = useState<string>("")
  const [otherText, setOtherText] = useState<string>("")
  const [otherError, setOtherError] = useState<string>("")
  const [activeQr, setActiveQr] = useState<GeneratedQrCodeResponse | null>(null)

  const sortedServices = [
    ...services.filter((service) => service.status === "active" && service.name !== "Other Service"),
    ...services.filter((service) => service.status === "active" && service.name === "Other Service"),
  ]

  const otherService = services.find(
    (s) => s.status === "active" && s.name === "Other Service"
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

  const handleGenerateTicket = () => {
    if (selectedService.includes("APPLICATION_FOR_LEAVE") && !selectedChildServices) {
      setChildServiceError("Please select a leave type")
      return
    }

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

    createNewTicket(
      {
        selectedService,
        otherServiceDetail: otherText.trim() || undefined,
        selectedChildServices: selectedChildServices || undefined,
      },
      {
        onSuccess: (qrCodes) => {
          if (qrCodes.length) {
            setActiveQr(qrCodes[0])
          }
        },
      }
    )
  }

  const resetModal = () => {
    setSelectedService([])
    setOtherText("")
    setServiceError("")
    setOtherError("")
    setActiveQr(null)
  }

  const handleClose = () => {
    resetModal()
    setIsModalOpen(false)
  }

  return (
    <ModalUI
      isOpen={isModalOpen}
      onClose={handleClose}
      title="Generate Ticket"
      description="Generate a new queue ticket?"
      footer={
        activeQr ? (
          <Button
            onClick={() => {
              printQr(activeQr.qrCode, activeQr.ticket.code, activeQr.ticket.officeCode)
              handleClose()
            }}
            className="w-full bg-[#003566] border border-[#FFC300] text-[#FFD60A] transition-colors duration-200 hover:bg-[#004080] hover:border-[#FFD60A] font-semibold whitespace-nowrap"
          >
            Print QR
          </Button>
        ) : (
          <AdminButton
            icon="/icons/colored-submit.svg"
            iconAlt="Submit"
            disabled={isGeneratingTicket}
            onClick={handleGenerateTicket}
            className="w-full bg-[#003566] border border-[#FFC300] text-[#FFD60A] transition-colors duration-200 hover:bg-[#004080] hover:border-[#FFD60A] font-semibold whitespace-nowrap"
          >
            {isGeneratingTicket ? "Loading..." : "Proceed"}
          </AdminButton>
        )
      }
    >
      <div className="space-y-4">
        {!activeQr ? (
          <>
            <div className="space-y-2">
              <div className="w-96 space-y-2">
                {sortedServices.map((service) => (
                  <div key={service.code}>
                    <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
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

                    {service.code === "APPLICATION_FOR_LEAVE" &&
                      selectedService.includes("APPLICATION_FOR_LEAVE") && (
                        <>
                        <Select
                          variant="admin"
                          className="mt-2"
                          value={selectedChildServices}
                          onChange={(e) => {
                            setSelectedChildServices(e.target.value)
                            setChildServiceError("")
                          }}
                          error={childServiceError}
                        >
                          <option value="" disabled>
                            Select leave type
                          </option>
                          
                          {childServices.map((cs) => (
                            <option key={cs._id} value={cs.code}>
                              {cs.name}
                            </option>
                          ))}
                        </Select>
                        {childServiceError && (
                          <ErrorText message={childServiceError} />
                        )}
                        </>
                      )}
                  </div>
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
                      <ErrorText message={otherError} />
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
