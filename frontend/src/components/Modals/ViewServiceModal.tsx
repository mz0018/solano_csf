import { ModalUI } from "../../ui/form/ModalUI";
import { Button } from "../../ui/form/Buttons";
import type { Service } from "../../hooks/useGetServices";
import { useUpdateNewService } from "../../hooks/useUpdateNewService";
import { CSFCustomToaster } from "../../utils/Toaster";

type ViewServiceModalProps = {
  service: Service | null;
  onClose: () => void;
  onServiceUpdated: (service: Service) => void;
};

export const ViewServiceModal = ({
  service,
  onClose,
  onServiceUpdated,
}: ViewServiceModalProps) => {
  const { isLoading, updateServiceStatus } = useUpdateNewService();

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
        <div>
          <dt className="text-sm font-medium text-gray-500">Service Name</dt>
          <dd className="text-gray-900">{service.name}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-gray-500">Service Type</dt>
          <dd className="capitalize text-gray-900">{service.type}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-gray-500">Status</dt>
          <dd className="capitalize text-gray-900">{service.status}</dd>
        </div>
      </dl>
    </ModalUI>
  );
};