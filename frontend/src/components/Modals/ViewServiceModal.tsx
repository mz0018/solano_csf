import { useState } from "react";
import { ModalUI } from "../../ui/form/ModalUI";
import { Button } from "../../ui/form/Buttons";
import type { Service } from "../../hooks/useGetServices";
import { useUpdateNewService } from "../../hooks/useUpdateNewService";
import { useServicePartialUpdate } from "../../hooks/useServicePartialUpdate";
import { CSFCustomToaster } from "../../utils/Toaster";

type ViewServiceModalProps = {
  service: Service | null;
  onClose: () => void;
  onServiceUpdated: (service: Service) => void;
};

type ServiceDraft = {
  serviceId: string;
  name: string;
  type: string;
} | null

export const ViewServiceModal = ({ service, onClose, onServiceUpdated }: ViewServiceModalProps) => {
  const { isLoading, updateServiceStatus } = useUpdateNewService();
  const { isLoading: isSaving, updateService } = useServicePartialUpdate();
  const [draft, setDraft] = useState<ServiceDraft>(null);
  
  const serviceName =
    draft && draft.serviceId === service?._id
      ? draft.name
      : service?.name ?? "";

  const serviceType =
    draft && draft.serviceId === service?._id
      ? draft.type
      : service?.type ?? "";

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

  const handlePartialUpdate = async () => {
    try {
      const result = await updateService(service, { name: serviceName, type: serviceType });
      if (!result) return;
      onServiceUpdated({ ...service, ...result.updates });
      CSFCustomToaster.success(result.message);
    } catch (error) {
      CSFCustomToaster.error(
        error instanceof Error ? error.message : "Unable to update the service."
      );
    }
  }

  return (
    <ModalUI
      isOpen
      onClose={onClose}
      title="Service Details"
      footer={
        <div className="flex w-full flex-col gap-2">
          <Button
            type="button"
            onClick={handlePartialUpdate}
            disabled={isSaving}
            className="w-full bg-blue-500 p-4 text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
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
        </div>
      }
    >
      <dl className="space-y-4">
        {/**Service name */}
        <div>
          <dt className="text-sm font-medium text-gray-500">Service Name</dt>
          <input
            type="text"
            value={serviceName}
            onChange={(event) => setDraft({
              serviceId: service._id,
              name: event.target.value,
              type: serviceType,
            })}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        
        {/**Service type */}
        <div>
          <dt className="text-sm font-medium text-gray-500">Service Type</dt>
          <select
            value={serviceType}
            onChange={(event) => setDraft({
              serviceId: service._id,
              name: serviceName,
              type: event.target.value,
            })}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900"
          >
            <option value="external">External</option>
            <option value="internal">Internal</option>
          </select>
        </div>
        <div>
          <dt className="text-sm font-medium text-gray-500">Status</dt>
          <dd className="capitalize text-gray-900">{service.status}</dd>
        </div>
      </dl>
    </ModalUI>
  );
};