export const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-[-1] h-screen bg-[var(--theme-bg)] text-[var(--theme-muted)]">
      <div className="mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-16">
        <div className="flex flex-col items-center justify-between gap-6 border-b border-[var(--theme-border)] pb-8 md:flex-row">
          <div>
            <h2 className="text-xl font-semibold text-[var(--theme-text)]">LGU Solano CSF</h2>
            <p className="mt-2 text-sm text-[var(--theme-muted)]">
              Share your experience and help shape better government services.
            </p>
          </div>

          <nav className="flex gap-6 text-sm">
            <a href="#" className="transition hover:text-[var(--theme-text)]">Home</a>
            <a href="#" className="transition hover:text-[var(--theme-text)]">How It Works</a>
            <a href="#" className="transition hover:text-[var(--theme-text)]">About</a>
          </nav>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 pt-6 text-sm text-[var(--theme-muted)] md:flex-row">
          <p>© {new Date().getFullYear()} LGU Solano MMO-Information Technology.</p>

          <div className="flex gap-4">
            <a href="#" className="hover:text-[var(--theme-text)]">Official Website</a>
            <a href="#" className="hover:text-[var(--theme-text)]">Facebook</a>
          </div>
        </div>
      </div>
    </footer>
  );
};