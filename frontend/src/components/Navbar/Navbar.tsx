import { useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";

type NavbarProps = {
  isScrolling: boolean;
  scrollTo: (key: string) => void;
  theme: "light" | "dark";
  onToggleTheme: () => void;
};

const navigation = [
  { name: "Home", href: "#", key: "home" },
  { name: "How It Works", href: "#how-it-works", key: "how-it-works" },
  { name: "About Us", href: "#about-us", key: "about-us" },
];

export const Navbar = ({ isScrolling, scrollTo, theme, onToggleTheme }: NavbarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      className={`backdrop-blur-sm fixed inset-x-0 top-0 z-50 border-b border-[var(--theme-border)] transition-all duration-300 ${
        isScrolling
          ? "bg-[var(--theme-nav-bg)] shadow-sm"
          : "bg-transparent border-transparent shadow-none"
      }`}
    >
      <div className="flex h-24 w-full items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <img src="/img/logo.png" alt="Logo" className="h-14 md:h-16 w-auto" />
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => { e.preventDefault(); scrollTo(item.key); }}
              className="text-md font-medium text-[var(--theme-muted)] transition hover:text-[var(--theme-text)] nav-link-underline tracking-wider"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Theme toggle + Admin Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            className="rounded-full p-2 text-[var(--theme-text)] transition hover:bg-[var(--theme-border)]"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          <a
            href="/signin"
            className="hidden rounded-sm border border-[var(--theme-border)] px-5 py-2 text-sm font-semibold text-[var(--theme-text)] transition hover:bg-[var(--theme-border)] md:block"
          >
            Admin Login
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          className="rounded-lg p-2 text-[var(--theme-text)] hover:bg-[var(--theme-border)] md:hidden"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-[var(--theme-border)] bg-[var(--theme-nav-bg)] md:hidden">
          <div className="space-y-2 px-4 py-4">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => { e.preventDefault(); scrollTo(item.key); setMobileOpen(false); }}
                className="block rounded-lg px-3 py-2 text-sm font-medium text-[var(--theme-muted)] hover:bg-[var(--theme-border)] hover:text-[var(--theme-text)]"
              >
                {item.name}
              </a>
            ))}

            <a
              href="/signin"
              className="mt-2 block rounded-lg border border-[var(--theme-border)] px-3 py-2 text-center text-sm font-semibold text-[var(--theme-text)] hover:bg-[var(--theme-border)]"
            >
              Admin Login
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};