import type { ReactNode } from 'react'

type MainLayoutUIProps = {
  children: ReactNode
  className?: string
};

export const MainLayoutUI = ({ children, className }: MainLayoutUIProps) => {
  return (
    <div className={`ml-16 lg:ml-0 ${className}`}>
    {children}
    </div>
  );
};