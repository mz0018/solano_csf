import type { ReactNode } from "react";
type AdminContainer = {
  children?: ReactNode;
};
export const AdminResponsiveContainer = ({ children }: AdminContainer) => {
  return (
    <div className="sidebar-surface admin-content w-full min-w-0 overflow-x-scroll p-6 flex flex-col items-start gap-6 shadow-md rounded-sm border border-[#cbd5e1]">
      {children}
    </div>
  );
};