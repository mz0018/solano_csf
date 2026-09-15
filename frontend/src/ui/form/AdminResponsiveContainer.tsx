import type { ReactNode } from "react";
type AdminContainer = {
  children?: ReactNode;
};
export const AdminResponsiveContainer = ({ children }: AdminContainer) => {
  return (
    <div className="admin-content w-full min-w-0 overflow-x-scroll p-6 flex flex-col items-start gap-6">
      {children}
    </div>
  );
};