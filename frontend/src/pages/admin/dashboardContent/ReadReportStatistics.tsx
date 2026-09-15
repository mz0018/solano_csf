import { useGetReportStatistics } from "../../../hooks/useGetReportStatistics";
import { useAuth } from "../../../context/AuthContext";

export const ReadReportStatistics = () => {
    const { user } = useAuth();
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const lastDayOfMonth = new Date(year, month, 0).getDate();

    const startDate = `${year}-${String(month).padStart(2, "0")}-01`;
    const endDate = `${year}-${String(month).padStart(2, "0")}-${String(lastDayOfMonth).padStart(2, "0")}`;
    const officeCode = user?.officeCode ?? "";

    const { data: stats, isLoading, error } = useGetReportStatistics(officeCode, startDate, endDate);

    if (isLoading) return <>Loading....</>;
    if (error) return <>Something error</>;

    console.log(stats)

    return (
        <>
            <h1>ReadReportStatistics</h1>

            <ul>
                <li>Office code: {officeCode}</li>
                <li>Month: {month}</li>
                <li>Year: {year}</li>
                <li>Start date: {startDate}</li>
                <li>End date: {endDate}</li>
            </ul>

            {stats?.feedbacks.forEach(s => {
                console.log(s)
            })}
        </>
    );
};
