import { useState } from "react";
import { Select } from "../../ui/form/Select";
import { ModalUI } from "../../ui/form/ModalUI";
import { ErrorText } from "../../ui/form/ErrorText";
import { AdminButton } from "../../ui/form/AdminButton";
import { useMutateSaveNewServiceHook } from "../../hooks/head_office_admin/useMutateSaveNewServiceHook";

import type { ServiceType } from "../../types/HeadOfficeAdminType";
import type { GenerateTicketModalProps } from "../../types/ModalTypes";

export const NewServiceModal = ({ setIsModalOpen }: Pick<GenerateTicketModalProps, "setIsModalOpen">) => {

  const { mutateAsync, isPending } = useMutateSaveNewServiceHook();

  const [serviceName, setServiceName] = useState<string>("");
  const [serviceType, setServiceType] = useState<ServiceType>("");
  const [hasError, setHasError] = useState<string>("");

  const handleSave = async () => {
    if (!serviceName.trim()) {
      setHasError("Service name is required.");
      return;
    }

    if (!serviceType) {
      setHasError("Please select a service type.");
      return;
    }

    await mutateAsync({ serviceName, serviceType })
    setIsModalOpen(false);
  }

  return (
    <ModalUI
      isOpen
      onClose={() => setIsModalOpen(false)}
      title="Add New Service"
      description="Fill in the details below to create and add a new service to the system."
      footer={
        <AdminButton
          type="button"
          onClick={handleSave}
          disabled={isPending}
          className="w-full bg-[#003566] border border-[#FFC300] text-[#FFD60A] transition-colors duration-200 hover:bg-[#004080] hover:border-[#FFD60A] font-semibold whitespace-nowrap"
        >
          {isPending ? "Loading..." : "Save Service"}
        </AdminButton>
      }
    >
      <div className="space-y-4">
        <div>
          <label htmlFor="service-name" className="mb-1 block text-sm font-medium text-[#374151]">
            Service Name
          </label>
          <input
            id="service-name"
            type="text"
            value={serviceName}
            onChange={(event) => setServiceName(event.target.value)}
            placeholder="Enter service name"
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-4 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="service-type" className="mb-1 block text-sm font-medium text-[#374151]">
            Service Type
          </label>
          <Select
            variant="admin"
            id="service-type"
            value={serviceType}
            onChange={(event) => setServiceType(event.target.value as ServiceType)}
            className="w-full rounded-md border border-[#d1d5db] bg-white px-3 py-2 text-sm text-[#111827] outline-none transition focus:border-[#628dec]"
          >
            <option value="">Select a service type</option>
            <option value="external">External</option>
            <option value="internal">Internal</option>
          </Select>
        </div>

        <div>
          {hasError && <ErrorText message={hasError} />}
        </div>
      </div>
    </ModalUI>
  );
};