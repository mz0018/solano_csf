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
        <div className="mt-3 flex flex-wrap justify-center gap-x-3 gap-y-2 p-5 text-xs">
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
                        className="flex w-full items-start gap-2"
                    >
                        <span
                            className="mt-1 h-3 w-3 flex-shrink-0"
                            style={{
                                backgroundColor: colors[index % colors.length],
                            }}
                        />

                        <span className="font-semibold break-words leading-4">
                            {label}
                        </span>
                    </div>
                );
            })}
        </div>
    );
};
