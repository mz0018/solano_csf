import { AdminResponsiveContainer } from "../../ui/form/AdminResponsiveContainer";
import { MonitorTotalQueue } from "./dashboardContent/MonitorTotalQueue";
import { ReadReportStatistics } from "./dashboardContent/ReadReportStatistics";

const Dashboard = () => {
    

    return (
        <AdminResponsiveContainer>
        <MonitorTotalQueue />
        <ReadReportStatistics />
        </AdminResponsiveContainer>
    );
};

export default Dashboard;
