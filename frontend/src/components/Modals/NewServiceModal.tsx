import { useState } from "react";
import { Select } from "../../ui/form/Select";
import { ModalUI } from "../../ui/form/ModalUI";
import { Button } from "../../ui/form/Buttons";
import { useSaveNewService, type ServiceType } from "../../hooks/useSaveNewService";

type NewServiceModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const NewServiceModal = ({ isModalOpen, setIsModalOpen }: NewServiceModalProps) => {
  const { isLoading, hasError, handleSubmit } = useSaveNewService();
  const [serviceName, setServiceName] = useState("");
  const [serviceType, setServiceType] = useState<ServiceType>("");

  const handleClose = () => {
    setServiceName("");
    setServiceType("");
    setIsModalOpen(false);
  };

  return (
    <ModalUI
      isOpen={isModalOpen}
      onClose={handleClose}
      title="Add New Service"
      footer={
        <Button
          type="button"
          onClick={() => handleSubmit({ serviceName, serviceType })}
          disabled={isLoading}
          className="w-full bg-blue-500 text-white p-4 rounded-sm cursor-pointer hover:bg-blue-600 transition-colors"
        >
          {isLoading ? 'Loading...' : 'Save Service'}
        </Button>
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
            onChange={(e) => setServiceName(e.target.value)}
            placeholder="Enter service name"
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
            onChange={(e) => setServiceType(e.target.value as ServiceType)}
            className="w-full rounded-md border border-[#d1d5db] bg-white px-3 py-2 text-sm text-[#111827] outline-none transition focus:border-[#628dec]"
          >
            <option value="">Select a service type</option>
            <option value="external">External</option>
            <option value="internal">Internal</option>
          </Select>
        </div>

        <div>
          {hasError && (
            <p className="text-sm text-red-500" role="alert">
              {hasError}
            </p>
          )}
        </div>
      </div>
    </ModalUI>
  );
};