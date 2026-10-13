import { useState } from "react";
import { ModalUI } from "../../ui/form/ModalUI";

type NewServiceModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const NewServiceModal = ({ isModalOpen, setIsModalOpen }: NewServiceModalProps) => {
  const [serviceName, setServiceName] = useState("");
  const [serviceType, setServiceType] = useState("office");

  const handleClose = () => {
    setServiceName("");
    setServiceType("office");
    setIsModalOpen(false);
  };

  return (
    <ModalUI
      isOpen={isModalOpen}
      onClose={handleClose}
      title="Add New Service"
      footer={
        <button
          type="button"
          onClick={handleClose}
          className="rounded-md bg-[#628dec] px-4 py-2 text-sm font-medium text-white hover:bg-[#4e7de0] transition-colors duration-150"
        >
          Save Service
        </button>
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
            className="w-full rounded-md border border-[#d1d5db] bg-white px-3 py-2 text-sm text-[#111827] outline-none transition focus:border-[#628dec]"
          />
        </div>

        <div>
          <label htmlFor="service-type" className="mb-1 block text-sm font-medium text-[#374151]">
            Service Type
          </label>
          <select
            id="service-type"
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            className="w-full rounded-md border border-[#d1d5db] bg-white px-3 py-2 text-sm text-[#111827] outline-none transition focus:border-[#628dec]"
          >
            <option value="external">External</option>
            <option value="internal">Internal</option>
          </select>
        </div>
      </div>
    </ModalUI>
  );
};