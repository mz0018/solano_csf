import { useEffect, useState } from "react";
import { useGetServices } from "../../../hooks/useGetServices";
import type { Service } from "../../../hooks/useGetServices";

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
        <div>
            <h2>Service Management</h2>

            {services.map((service) => (
               <div key={service._id}>
                    <p>{service.code}</p>
                    <p>{service.name}</p>
                    <button 
                        onClick={() => alert(service._id)}
                        className="p-2 bg-blue-200 text-white"
                    >
                        Status
                    </button>
               </div>
            ))}
        </div>
    );
};

export default ServiceManagementSettings;