import { useState } from "react";
import { ModalUI } from "../../ui/form/ModalUI";
import { Button } from "../../ui/form/Buttons";
import type { Service } from "../../hooks/useGetServices";
import { useUpdateNewService } from "../../hooks/useUpdateNewService";
import { useServicePartialUpdate } from "../../hooks/useServicePartialUpdate";
import { CSFCustomToaster } from "../../utils/Toaster";
import { ErrorText } from "../../ui/form/ErrorText";

type ViewServiceModalProps = {
  service: Service | null;
  onClose: () => void;
  onServiceUpdated: (service: Service) => void;
};

// Local edits are kept separate from the saved service so we can tell
// when there is something new to save.
type ServiceDraft = {
  serviceId: string;
  name: string;
  type: string;
};

export const ViewServiceModal = ({ service, onClose, onServiceUpdated }: ViewServiceModalProps) => {
  const {
    isLoading,
    updateServiceStatus,
    hasErrorsUpdate,
    setHasErrorsUpdate,
    isRateLimitedUpdate,
  } = useUpdateNewService();

  const {
    isLoading: isSaving,
    updateService,
    hasErrors,
    setHasErrors,
    isRateLimited,
  } = useServicePartialUpdate();

  const [draft, setDraft] = useState<ServiceDraft | null>(null);

  // Nothing to show without a selected service.
  if (!service) {
    return null;
  }

  // Only use the draft while it belongs to the service we are currently viewing.
  const serviceName = draft && draft.serviceId === service._id ? draft.name : service.name;
  const serviceType = draft && draft.serviceId === service._id ? draft.type : service.type;

  const hasChanges = serviceName !== service.name || serviceType !== service.type;

  // Both requests share the same error area, so clear both before each action.
  const clearErrors = () => {
    setHasErrors(null);
    setHasErrorsUpdate(null);
  };

  const handleStatusChange = async () => {
    if (service.status === "active") {
      const confirmed = window.confirm("Are you sure you want to deactivate this service?");

      if (!confirmed) return;
    }

    clearErrors();

    const status = service.status === "active" ? "inactive" : "active";

    try {
      const result = await updateServiceStatus(service._id, status);
      if (!result) return;

      onServiceUpdated({ ...service, status });
      CSFCustomToaster.success(result.message);
    } catch (error) {
      setHasErrorsUpdate(
        error instanceof Error ? error.message : "Unable to update the service."
      );
    }
  };

  const handlePartialUpdate = async () => {
    clearErrors();

    if (!serviceName.trim()) {
      setHasErrors("Service name is required.");
      return;
    }

    try {
      const result = await updateService(service, { name: serviceName, type: serviceType });
      if (!result) return;

      onServiceUpdated({ ...service, ...result.updates });
      // Let the saved service drive the inputs again.
      setDraft(null);
      CSFCustomToaster.success(result.message);
    } catch (error) {
      setHasErrors(
        error instanceof Error ? error.message : "Unable to update the service."
      );
    }
  };

  const statusButtonLabel = isLoading
    ? "Updating..."
    : service.status === "active"
      ? "Deactivate"
      : "Activate";

  const statusButtonClasses =
    service.status === "active"
      ? "border-red-400 text-red-400 hover:bg-red-100"
      : "border-blue-400 text-blue-400 hover:bg-blue-100";

  return (
    <ModalUI
      isOpen
      onClose={onClose}
      title={`Service ${service.name}`}
      footer={
        <>
          <button
            type="button"
            onClick={handleStatusChange}
            disabled={isLoading || isRateLimitedUpdate}
            className={`w-full border ${statusButtonClasses} p-4 font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer rounded-sm`}
          >
            {statusButtonLabel}
          </button>
          <Button
            type="button"
            onClick={handlePartialUpdate}
            disabled={isSaving || !hasChanges || isRateLimited}
            className="w-full bg-blue-500 p-4 text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </>
      }
    >
      <dl className="space-y-4">
        {/* Service name */}
        <div>
          <dt className="text-sm font-medium text-gray-500">Service Name</dt>
          <input
            type="text"
            value={serviceName}
            onChange={(event) =>
              setDraft({
                serviceId: service._id,
                name: event.target.value,
                type: serviceType,
              })
            }
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Service type */}
        <div>
          <dt className="text-sm font-medium text-gray-500">Service Type</dt>
          <select
            value={serviceType}
            onChange={(event) =>
              setDraft({
                serviceId: service._id,
                name: serviceName,
                type: event.target.value,
              })
            }
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900"
          >
            <option value="external">External</option>
            <option value="internal">Internal</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <dt className="flex items-center text-sm font-medium text-gray-500">
            Status:
            <span className="ml-2 flex items-center gap-2 capitalize font-light">
              {service.status}
              <span
                className={`h-2 w-2 rounded-full ${
                  service.status === "active"
                    ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)] animate-pulse"
                    : "bg-red-500"
                }`}
              />
            </span>
          </dt>
        </div>

        {/* Errors */}
        <div>
          {hasErrors && <ErrorText message={hasErrors} />}
          {hasErrorsUpdate && <ErrorText message={hasErrorsUpdate} />}
        </div>
      </dl>
    </ModalUI>
  );
};