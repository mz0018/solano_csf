import { useEffect, useState } from "react";
import { useGetServices } from "../../../hooks/useGetServices";
import type { Service } from "../../../hooks/useGetServices";
import { TableUI } from "../../../ui/form/TableUI";
import { NewServiceModal } from "../../../components/Modals/NewServiceModal";
import { ViewServiceModal } from "../../../components/Modals/ViewServiceModal";
import { AdminButton } from "../../../ui/form/AdminButton";

const getServiceStatusDotColor = (status: string) => {
    const normalizedStatus = status.toLowerCase();

    if (normalizedStatus === "active" || normalizedStatus === "enabled") {
        return "bg-green-500";
    }

    if (normalizedStatus === "inactive" || normalizedStatus === "disabled") {
        return "bg-red-500";
    }

    return "bg-amber-500";
};

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
    <div className="w-full min-w-0 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5 lg:p-6">
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

                {/* Add New Service*/}
                <AdminButton
                    type="button"
                    icon="/icons/generate.svg"
                    iconAlt="Service"
                    onClick={() => setIsModalOpen(true)}
                    className="bg-[#628dec] text-white hover:bg-[#628dec]/90 transition-colors font-semibold sm:ml-auto sm:w-auto whitespace-nowrap"
                >
                    Add New Service
                </AdminButton>
            </div>
        </div>

        {/* Services Table */}
        <div className="w-full overflow-x-auto">
            <TableUI className="w-full min-w-[40rem]">
                <thead>
                    <tr>
                        <th className="whitespace-nowrap">Service Name</th>
                        <th className="whitespace-nowrap">Status</th>
                        <th className="whitespace-nowrap">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {services.length === 0 ? (
                        <tr>
                            <td colSpan={3} className="py-12 text-center">
                                <div className="flex flex-col items-center justify-center px-4">
                                    <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 sm:h-16 sm:w-16 md:h-[72px] md:w-[72px]">
                                        <img src="/icons/service-management.svg" alt="" aria-hidden="true" className="h-8 w-8 sm:h-9 sm:w-9" />
                                    </div>
                                    <p className="max-w-full text-base font-semibold text-slate-500 sm:text-lg lg:text-xl">No services found</p>
                                    <p className="mt-1 text-xs text-gray-400 sm:text-sm">Add a service to begin managing office services.</p>
                                </div>
                            </td>
                        </tr>
                    ) : (
                        <>
                            {/* External Services */}
                            <tr>
                                <td
                                    colSpan={3}
                                    className="whitespace-nowrap bg-slate-50/90 py-3 font-semibold capitalize text-slate-500"
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
                                        <td className="whitespace-nowrap">
                                            <span className="inline-flex max-w-full items-center gap-2 pl-2 sm:pl-6">
                                                <img src="/icons/service-management.svg" alt="" aria-hidden="true" className="h-5 w-5 shrink-0" />
                                                <span className="max-w-[16rem] truncate sm:max-w-[24rem]">{service.name}</span>
                                            </span>
                                        </td>

                                        <td className="whitespace-nowrap capitalize">
                                            <span className="inline-flex shrink-0 items-center gap-2">
                                                <span
                                                    className={`h-2.5 w-2.5 shrink-0 rounded-full ${getServiceStatusDotColor(service.status)}`}
                                                    title={`${service.status} status`}
                                                />
                                                {/* <img src={getServiceStatusIcon(service.status)} alt="" aria-hidden="true" className="h-5 w-5 shrink-0" /> */}
                                                {service.status}
                                            </span>
                                        </td>

                                        <td>
                                            <AdminButton
                                                type="button"
                                                icon="/icons/open.svg"
                                                iconAlt="Manage Service"
                                                onClick={() =>
                                                    setSelectedService(service)
                                                }
                                                className="shrink-0 whitespace-nowrap border border-[#628dec] py-2 text-sm font-semibold text-[#628dec] transition-colors hover:bg-[#628dec]/10"
                                            >
                                                Manage
                                            </AdminButton>
                                        </td>
                                    </tr>
                                ))}

                            {/* Internal Services */}
                            <tr>
                                <td
                                    colSpan={3}
                                    className="whitespace-nowrap bg-slate-50/90 py-3 font-semibold capitalize text-slate-500"
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
                                        <td className="whitespace-nowrap">
                                            <span className="inline-flex max-w-full items-center gap-2 pl-2 sm:pl-6">
                                                <img src="/icons/service-management.svg" alt="" aria-hidden="true" className="h-5 w-5 shrink-0" />
                                                <span className="max-w-[16rem] truncate sm:max-w-[24rem]">{service.name}</span>
                                            </span>
                                        </td>

                                        <td className="whitespace-nowrap capitalize">
                                            <span className="inline-flex shrink-0 items-center gap-2">
                                                <span
                                                    className={`h-2.5 w-2.5 shrink-0 rounded-full ${getServiceStatusDotColor(service.status)}`}
                                                    title={`${service.status} status`}
                                                />
                                                {/* <img src={getServiceStatusIcon(service.status)} alt="" aria-hidden="true" className="h-5 w-5 shrink-0" /> */}
                                                {service.status}
                                            </span>
                                        </td>

                                        <td>
                                            <AdminButton
                                                type="button"
                                                icon="/icons/open.svg"
                                                iconAlt="Manage Service"
                                                onClick={() =>
                                                    setSelectedService(service)
                                                }
                                                className="shrink-0 whitespace-nowrap border border-[#628dec] py-2 text-sm font-semibold text-[#628dec] transition-colors hover:bg-[#628dec]/10"
                                            >
                                                Manage
                                            </AdminButton>
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