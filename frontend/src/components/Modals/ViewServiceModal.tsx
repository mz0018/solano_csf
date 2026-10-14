import { useState } from "react";
import { ModalUI } from "../../ui/form/ModalUI";
import { Button } from "../../ui/form/Buttons";
import type { Service } from "../../hooks/useGetServices";
import { useUpdateNewService } from "../../hooks/useUpdateNewService";
import { CSFCustomToaster } from "../../utils/Toaster";
import { Pencil } from "lucide-react";

type ViewServiceModalProps = {
  service: Service | null;
  onClose: () => void;
  onServiceUpdated: (service: Service) => void;
};

export const ViewServiceModal = ({ service, onClose, onServiceUpdated }: ViewServiceModalProps) => {
  const { isLoading, updateServiceStatus } = useUpdateNewService();
  const [editServiceName, setEditServiceName] = useState<boolean>(false);

  if (!service) {
    return null;
  }

  const handleStatusChange = async () => {
    const status = service.status === "active" ? "inactive" : "active";

    try {
      const result = await updateServiceStatus(service._id, status);
      onServiceUpdated({ ...service, status });
      CSFCustomToaster.success(result.message);
    } catch (error) {
      CSFCustomToaster.error(
        error instanceof Error ? error.message : "Unable to update the service."
      );
    }
  };

  const handleInputChange = (type: string, id: string) => {
    console.log(type)
    console.log(id)
  }

  return (
    <ModalUI
      isOpen
      onClose={onClose}
      title="Service Details"
      footer={
        <Button
          type="button"
          onClick={handleStatusChange}
          disabled={isLoading}
          className="w-full bg-blue-500 p-4 text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading
            ? "Updating..."
            : service.status === "active"
              ? "Deactivate Service"
              : "Activate Service"}
        </Button>
      }
    >
      <dl className="space-y-4">
        {/**Service name */}
        <div>
          <dt className="text-sm font-medium text-gray-500">Service Name</dt>
          <div className="flex items-center justify-between">
            {editServiceName ? (
              <input
                type="text"
                value={service.name}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            ) : (
              <dd className="text-gray-900">{service.name}</dd>
            )}
            <Pencil 
              onClick={() => {
                handleInputChange(service.name, service._id)
                setEditServiceName(true)
              }}
              className="ml-2 h-4 w-4 cursor-pointer text-gray-500 hover:text-gray-900" 
            />
          </div>
        </div>
        
        {/**Service type */}
        <div>
          <dt className="text-sm font-medium text-gray-500">Service Type</dt>
          <div className="flex items-center justify-between">
            <dd className="capitalize text-gray-900">{service.type}</dd>
            <Pencil onClick={() => handleInputChange(service.type, service._id)} className="h-4 w-4 cursor-pointer text-gray-500 hover:text-gray-900" />
          </div>
        </div>
        <div>
          <dt className="text-sm font-medium text-gray-500">Status</dt>
          <dd className="capitalize text-gray-900">{service.status}</dd>
        </div>
      </dl>
    </ModalUI>
  );
};