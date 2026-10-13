import { useEffect, useState } from "react";
import { useGetServices } from "../../../hooks/useGetServices";
import type { Service } from "../../../hooks/useGetServices";
import { TableUI } from "../../../ui/form/TableUI";
import { AdminResponsiveContainer } from "../../../ui/form/AdminResponsiveContainer";

const ServiceManagementSettings = () => {
    const { getOfficeService } = useGetServices();
    const [services, setServices] = useState<Service[]>([]);

    useEffect(() => {
        const fetchServices = async () => {
            const data = await getOfficeService();
            setServices(data ?? []);
        };

        fetchServices();
    }, [getOfficeService]);

    return (
        <section className="flex flex-col gap-4">
            <h2 className="text-base font-semibold text-slate-800">Service Management</h2>

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
                                    <td>{service.name}</td>
                                    <td className="capitalize">{service.status}</td>
                                    <td>
                                        <button 
                                            onClick={() => alert(service._id)}
                                            className="bg-blue-500 p-2 text-white"
                                        >
                                            {service.status === "active" ? 'Deactivate' : 'Activate'}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </TableUI>
            </AdminResponsiveContainer>
        </section>
    );
};

export default ServiceManagementSettings;