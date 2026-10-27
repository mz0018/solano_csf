
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
                /* Table layout and background */
                w-full table-fixed overflow-hidden rounded-sm bg-white text-sm

                /* Header: border, background, and text */
                [&_th]:border-b
                [&_th]:border-slate-200
                [&_th]:bg-[#628dec]
                [&_th]:text-left
                [&_th]:text-xs
                [&_th]:font-semibold
                [&_th]:uppercase
                [&_th]:tracking-wide
                [&_th]:text-white

                /* Header: spacing */
                [&_th]:px-3
                [&_th]:py-2
                sm:[&_th]:px-4
                sm:[&_th]:py-3

                /* Table cells: border, text, and spacing */
                [&_td]:border-b
                [&_td]:border-slate-50
                [&_td]:px-4
                [&_td]:py-3
                [&_td]:text-slate-700
                sm:[&_td]:px-5
                sm:[&_td]:py-4

                /* Alternating background for even rows */
                [&_tbody_tr:nth-child(even)_td]:bg-slate-100

                /* Remove the bottom border from the last row */
                [&_tbody_tr:last-child_td]:border-b-0

                /* Allow additional custom styles */
                ${className}
            `}
        >
            {children}
        </table>
    );
};
