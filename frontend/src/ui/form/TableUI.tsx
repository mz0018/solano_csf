type TableUIProps = {
  children: React.ReactNode
  className?: string
}

export const TableUI = ({ children, className = "" }: TableUIProps) => {
  return (
    <table
      className={`text-xs w-full border-collapse ${className}`}
      style={{ tableLayout: 'fixed', minWidth: 1000 }}
    >
      <style>{`
        table th, table td { border: 1px solid #e5e7eb; padding: 0.75rem 1rem; }
        table th { background: #f8fafc; font-weight: 600; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280; text-align: left; }
        table td { background: #ffffff; font-size: 0.875rem; transition: background-color 0.1s ease; }
        table tbody tr:hover td { background-color: #f3f4f6; }
      `}</style>
      {children}
    </table>
  )
}