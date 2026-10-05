import type { ReportChartsProps } from "../Charts/ReportCharts";

export const ScreenshotFeedbackTable = ({ feedback, selectedOfficeName, selectedDateFrom, selectedDateTo }: ReportChartsProps) => {

    return (
        <>
        <h1>Screenshot Feedback Table</h1>
        <p>{selectedOfficeName}</p>
        <p>{selectedDateFrom} to {selectedDateTo}</p>
        
        <ul>
            {feedback.map((item, index) => (
                <li key={index}>
                    <p>Client Address: {item.client.address}</p>
                    <p>Client Affiliation: {item.client.affiliation}</p>
                    <p>Client Age Group: {item.client.ageGroup}</p>
                    <p>Client Employment Status: {item.client.employmentStatus}</p>
                    <p>Client Gender: {item.client.gender}</p>
                </li>
            ))}
        </ul>
        </>
    )
}