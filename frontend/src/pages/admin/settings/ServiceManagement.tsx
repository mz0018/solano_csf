import { useEffect, useState } from "react";
import { useGetServices } from "../../../hooks/useGetServices";
import type { Service } from "../../../hooks/useGetServices";
import { TableUI } from "../../../ui/form/TableUI";
import { NewServiceModal } from "../../../components/Modals/NewServiceModal";
import { ViewServiceModal } from "../../../components/Modals/ViewServiceModal";
import { Fullscreen } from "lucide-react";

const ServiceManagementSettings = () => {
  const { getOfficeService } = useGetServices();
  const [services, setServices] = useState<Service[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      const data = await getOfficeService();
      setServices(data ?? []);
    };

    fetchServices();
  }, [getOfficeService]);

  return (
    <>
      <div className="w-full min-w-0">
        {/* Header */}
        <div className="mb-4 border-b border-gray-300 py-3">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                {/* Title and Description */}
                <div className="min-w-0 lg:hidden">
                    <h1 className="text-lg font-semibold text-[#628dec]">
                        Service Management
                    </h1>

                    <p className="mt-1 text-sm leading-relaxed text-gray-900">
                        Create new services and manage existing service information and status.
                    </p>
                </div>

                {/* Add New Service - Always Visible */}
                <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="admin-blue-button w-full shrink-0 sm:ml-auto sm:w-auto"
                >
                    Add New Service
                </button>
            </div>
        </div>

        {/* Services Table */}
        <div className="w-full overflow-x-auto">
            <TableUI className="w-full min-w-[36rem]">
                <thead>
                    <tr>
                        <th>Service Name</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {services.length === 0 ? (
                        <tr>
                            <td colSpan={3} className="py-8 text-center">
                                No services found
                            </td>
                        </tr>
                    ) : (
                        <>
                            {/* External Services */}
                            <tr>
                                <td
                                    colSpan={3}
                                    className="py-3 font-semibold capitalize"
                                >
                                    External Services
                                </td>
                            </tr>

                            {services
                                .filter(
                                    (service) =>
                                        service.type?.toLowerCase() === "external"
                                )
                                .map((service) => (
                                    <tr key={service._id}>
                                        <td>
                                            <span className="inline-block pl-6">
                                                {service.name}
                                            </span>
                                        </td>

                                        <td className="capitalize">
                                            {service.status}
                                        </td>

                                        <td>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setSelectedService(service)
                                                }
                                                className="inline-flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100"
                                            >
                                                <Fullscreen size={16} />
                                                <span>Manage</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}

                            {/* Internal Services */}
                            <tr>
                                <td
                                    colSpan={3}
                                    className="py-3 font-semibold capitalize"
                                >
                                    Internal Services
                                </td>
                            </tr>

                            {services
                                .filter(
                                    (service) =>
                                        service.type?.toLowerCase() === "internal"
                                )
                                .map((service) => (
                                    <tr key={service._id}>
                                        <td>
                                            <span className="inline-block pl-6">
                                                {service.name}
                                            </span>
                                        </td>

                                        <td className="capitalize">
                                            {service.status}
                                        </td>

                                        <td>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setSelectedService(service)
                                                }
                                                className="inline-flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100"
                                            >
                                                <Fullscreen size={16} />
                                                <span>Manage</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </>
                    )}
                </tbody>
            </TableUI>
        </div>
      </div>

      {isModalOpen && <NewServiceModal onClose={() => setIsModalOpen(false)} />}

      {selectedService && (
        <ViewServiceModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
          onServiceUpdated={(updatedService) => {
            setServices((currentServices) =>
              currentServices.map((service) =>
                service._id === updatedService._id ? updatedService : service
              )
            );
            setSelectedService(updatedService);
          }}
        />
      )}
    </>
  );
};

export default ServiceManagementSettings;