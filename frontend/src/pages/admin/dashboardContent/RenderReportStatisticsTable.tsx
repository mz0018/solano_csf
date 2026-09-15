import type { RenderReportStatisticsTableProps } from "./ReadReportStatistics";
import { TableUI } from "../../../ui/form/TableUI";

export const RenderReportStatisticsTable = ({
    chartsDataArray,
}: RenderReportStatisticsTableProps) => {
    return (
        <div className="mt-6 flex flex-col gap-6">
            {chartsDataArray.map((chart) => (
                <div key={chart.title}>
                    <h2 className="mb-3 text-base font-semibold text-slate-800">
                        {chart.title} Statistics
                    </h2>

                    <TableUI>
                        <thead>
                            <tr>
                                <th>Category</th>
                                <th>Total Responses</th>
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
        </div>
    );
};
