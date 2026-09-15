import type { RenderReportStatisticsTableProps } from "./ReadReportStatistics";
import { TableUI } from "../../../ui/form/TableUI";

export const RenderReportStatisticsTable = ({
    chartsDataArray,
}: RenderReportStatisticsTableProps) => {
    return (
        <>
            {chartsDataArray.map((chart) => (
                <div key={chart.title}>
                    <h2>{chart.title}</h2>

                    <TableUI>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Count</th>
                            </tr>
                        </thead>

                        <tbody>
                            {chart.data.map((item) => (
                                <tr key={item.name}>
                                    <td>{item.name}</td>
                                    <td>{item.value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </TableUI>
                </div>
            ))}
        </>
    );
};
