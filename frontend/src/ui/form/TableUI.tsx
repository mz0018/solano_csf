
type TableUIProps = {
    children: React.ReactNode;
    className?: string;
};

export const TableUI = ({
    children,
    className = "",
}: TableUIProps) => {
    return (
        <div className="w-full overflow-x-auto rounded-md border border-slate-200/80 bg-white">
            <table
                className={`
                    w-full table-fixed border-collapse text-sm

                    /* Premium table header */
                    [&_thead]:bg-slate-50/90
                    [&_th]:border-b
                    [&_th]:border-slate-200
                    [&_th]:px-3
                    [&_th]:py-4
                    [&_th]:text-start
                    [&_th]:text-md
                    [&_th]:font-semibold
                    [&_th]:uppercase
                    [&_th]:tracking-wider
                    [&_th]:text-slate-500
                    [&_th]:align-middle

                    /* Refined table cells */
                    [&_td]:border-b
                    [&_td]:border-slate-100
                    [&_td]:px-3
                    [&_td]:py-4
                    [&_td]:text-start
                    [&_td]:text-sm
                    [&_td]:font-medium
                    [&_td]:text-slate-700
                    [&_td]:align-middle
                    [&_td]:transition-colors
                    [&_td]:duration-150

                    /* Comfortable desktop spacing */
                    sm:[&_th]:px-5
                    sm:[&_th]:py-4
                    sm:[&_td]:px-5
                    sm:[&_td]:py-[18px]

                    /* Subtle hover interaction */
                    [&_tbody_tr]:transition-colors
                    [&_tbody_tr:hover_td]:bg-blue-50/50

                    /* Clean final row */
                    [&_tbody_tr:last-child_td]:border-b-0

                    /* Prevent long content from breaking layout */
                    [&_td]:break-words

                    ${className}
                `}
            >
                {children}
            </table>
        </div>
    );
};
