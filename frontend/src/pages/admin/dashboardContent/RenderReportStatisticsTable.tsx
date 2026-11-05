import type { RenderReportStatisticsTableProps } from "./ReadReportStatistics";
import { TableUI } from "../../../ui/form/TableUI";

export const RenderReportStatisticsTable = ({
    chartsDataArray,
}: RenderReportStatisticsTableProps) => {
    return (
        <div className="mt-6 flex flex-col gap-6">
            {chartsDataArray.map((chart) => (
                <div key={chart.title}>
                    <h2 className="inline-flex max-w-full items-center rounded-full border border-slate-200 px-3 py-1.5 text-xs font-light text-[#003566] sm:text-sm mb-2">
                        {chart.title} Statistics
                    </h2>

                    <TableUI>
                        <thead>
                            <tr>
                                <th></th>
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
