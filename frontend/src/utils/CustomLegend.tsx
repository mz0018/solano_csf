
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
        <div className="mx-auto mt-3 grid w-full grid-cols-3 justify-items-center gap-x-2 gap-y-3 p-5 text-xs">
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
                        className="flex min-w-0 items-center justify-center gap-1"
                    >
                        <span
                            className="h-3 w-3 flex-shrink-0"
                            style={{
                                backgroundColor: colors[index % colors.length],
                            }}
                        />

                        <span className="whitespace-nowrap font-semibold leading-4">
                            {label}
                        </span>
                    </div>
                );
            })}
        </div>
    );
};
