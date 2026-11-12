
type LegendData = {
    name: string;
    value: number;
};

type CustomLegendProps = {
    data: LegendData[];
    colors: string[];
};

export const CustomLegend = ({ data, colors }: CustomLegendProps) => {
    return (
        <div className="mx-auto mt-2 grid w-full grid-cols-2 justify-items-start gap-x-3 gap-y-2 px-2 py-3 text-xs sm:grid-cols-3 sm:px-4">
            {data.map((entry, index) => {
                const label =
                    entry.name === "Government (Within LGU)"
                        ? "Within LGU"
                        : entry.name === "Government (Other Offices/Agencies)"
                        ? "Government Agency"
                        : entry.name;

                return (
                    <div
                        key={entry.name}
                        className="flex min-w-0 items-start gap-1.5"
                    >
                        <span
                            className="h-3 w-3 flex-shrink-0"
                            style={{
                                backgroundColor: colors[index % colors.length],
                            }}
                        />

                        <span className="min-w-0 break-words font-medium leading-4 text-slate-600">
                            {label}
                        </span>
                    </div>
                );
            })}
        </div>
    );
};
