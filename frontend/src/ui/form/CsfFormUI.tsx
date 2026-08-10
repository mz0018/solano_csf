type CsfFormUIProps = {
  children: React.ReactNode;
};

export const CsfFormUI = ({ children }: CsfFormUIProps) => {
  return (
    <div className="w-full max-w-xl bg-[var(--theme-nav-bg)]/90 border border-[var(--theme-border)] rounded-lg shadow-md p-8">
      {children}
    </div>
  );
};