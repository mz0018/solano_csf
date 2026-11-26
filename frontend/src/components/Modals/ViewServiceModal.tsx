import { useState } from "react";
import { Select } from "../../ui/form/Select";
import { ModalUI } from "../../ui/form/ModalUI";
import { ErrorText } from "../../ui/form/ErrorText";
import { AdminButton } from "../../ui/form/AdminButton";
import { useMutateUpdateRegisteredServiceStatusHook } from "../../hooks/head_office_admin/useMutateUpdateRegisteredServiceStatusHook";
import { useMutatePartialUpdateRegisteredServiceHook } from "../../hooks/head_office_admin/useMutatePartialUpdateRegisteredServiceHook";

import type { ServiceDraft } from "../../types/HeadOfficeAdminType";
import type { ViewServiceModalProps } from "../../types/ModalTypes";

export const ViewServiceModal = ({ service, onClose, onServiceUpdated }: ViewServiceModalProps) => {
  
  const { mutateAsync, isPending } = useMutateUpdateRegisteredServiceStatusHook();
  const { mutateAsync: partialAsync, isPending: partialPending } = useMutatePartialUpdateRegisteredServiceHook();

  const [hasError, setHasError] = useState<string>("");
  const [draft, setDraft] = useState<ServiceDraft | null>(null);

  // Nothing to show without a selected service.
  if (!service) {
    return null;
  }

  // Only use the draft while it belongs to the service we are currently viewing.
  const serviceName = draft && draft.serviceId === service._id ? draft.name : service.name;
  const serviceType = draft && draft.serviceId === service._id ? draft.type : service.type;

  const hasChanges = serviceName !== service.name || serviceType !== service.type;

  const handleStatusChange = async () => {
    
    if (service.status === "active") {
      const confirmed = window.confirm("Are you sure you want to deactivate this service?");
      if (!confirmed) return;
    }

    const status = service.status === "active" ? "inactive" : "active";
    await mutateAsync({ serviceId: service._id, serviceStatus: status });
    onServiceUpdated({ ...service, status });
  };

  const handlePartialUpdate = async () => {

    if (!serviceName.trim()) {
      setHasError("Service name is required.");
      return;
    }

    await partialAsync({ service, edited: { name: serviceName, type: serviceType } });
    onServiceUpdated({ ...service, name: serviceName, type: serviceType });

    setDraft(null);
  };

  const statusButtonLabel = isPending
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
      description={`View and edit details for service ${service.name}.`}
      footer={
        <>
          <button
            type="button"
            onClick={handleStatusChange}
            disabled={isPending}
            className={`w-full border ${statusButtonClasses} p-4 font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer rounded-sm`}
          >
            {statusButtonLabel}
          </button>
          <AdminButton
            type="button"
            icon="/icons/colored-submit.svg"
            iconAlt="Save"
            onClick={handlePartialUpdate}
            disabled={partialPending || !hasChanges}
            className="w-full bg-[#003566] border border-[#FFC300] text-[#FFD60A] transition-colors duration-200 hover:bg-[#004080] hover:border-[#FFD60A] font-semibold whitespace-nowrap"
          >
            {partialPending ? "Saving..." : "Save Changes"}
          </AdminButton>
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
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-4 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Service type */}
        <div>
          <dt className="text-sm font-medium text-gray-500">Service Type</dt>
          <Select
            variant="admin"
            value={serviceType}
            onChange={(event) =>
              setDraft({
                serviceId: service._id,
                name: serviceName,
                type: event.target.value,
              })
            }
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-4 text-sm text-gray-900"
          >
            <option value="external">External</option>
            <option value="internal">Internal</option>
          </Select>
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

        <div>
          {hasError && <ErrorText message={hasError} />}
        </div>
      </dl>
    </ModalUI>
  );
};