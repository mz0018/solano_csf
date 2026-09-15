type TableUIProps = {
    children: React.ReactNode;
    className?: string;
};

export const TableUI = ({
    children,
    className = "",
}: TableUIProps) => {
    return (
        <table
            className={`
                w-full table-fixed border-separate border-spacing-0
                overflow-hidden rounded-lg border border-slate-200
                text-sm

                [&_th]:border-b
                [&_th]:border-slate-200
                [&_th]:bg-slate-50
                [&_th]:px-4
                [&_th]:py-3
                [&_th]:text-left
                [&_th]:text-xs
                [&_th]:font-semibold
                [&_th]:uppercase
                [&_th]:tracking-wide
                [&_th]:text-slate-500

                [&_td]:border-b
                [&_td]:border-slate-100
                [&_td]:px-4
                [&_td]:py-3
                [&_td]:text-sm
                [&_td]:text-slate-700

                [&_tbody_tr:last-child_td]:border-b-0
                [&_tbody_tr:nth-child(even)_td]:bg-slate-50/50

                ${className}
            `}
        >
            {children}
        </table>
    );
};
