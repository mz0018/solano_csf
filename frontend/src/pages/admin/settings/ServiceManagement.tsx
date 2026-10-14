import { useEffect, useState } from "react";
import { useGetServices } from "../../../hooks/useGetServices";
import type { Service } from "../../../hooks/useGetServices";
import { TableUI } from "../../../ui/form/TableUI";
import { AdminResponsiveContainer } from "../../../ui/form/AdminResponsiveContainer";
import { NewServiceModal } from "../../../components/Modals/NewServiceModal";

const ServiceManagementSettings = () => {
  const { getOfficeService } = useGetServices();
  const [services, setServices] = useState<Service[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      const data = await getOfficeService();
      setServices(data ?? []);
    };

    fetchServices();
  }, [getOfficeService]);

  return (
    <>
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1>Service Management</h1>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="admin-blue-button"
          >
            Add New Service
          </button>
        </div>

        <AdminResponsiveContainer>
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
                services.map((service) => (
                  <tr key={service._id}>
                    <td>
                      {service.name}
                      <span className="block capitalize">{service.type}</span>
                    </td>
                    <td className="capitalize">{service.status}</td>
                    <td>
                      <button
                        type="button"
                        onClick={() => alert(service._id)}
                        className="admin-blue-button"
                      >
                        {service.status === "active" ? "Deactivate" : "Activate"}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </TableUI>
        </AdminResponsiveContainer>
      </section>

      <NewServiceModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  );
};

export default ServiceManagementSettings;