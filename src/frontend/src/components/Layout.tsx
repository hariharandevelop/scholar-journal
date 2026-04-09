import { Link, useLocation } from "@tanstack/react-router";

interface LayoutProps {
  children: React.ReactNode;
}

const navLinks = [
  { to: "/", label: "SUBMIT" },
  { to: "/latest", label: "LATEST PAPERS" },
  { to: "/admin", label: "ADMIN" },
];

export function Layout({ children }: LayoutProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Header */}
      <header className="bg-primary text-primary-foreground border-b border-primary sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-stretch h-14">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center pr-8 border-r border-primary-foreground/20 shrink-0"
            >
              <span className="font-display italic text-xl text-primary-foreground tracking-tight">
                Scholar Journal
              </span>
            </Link>

            {/* Nav */}
            <nav
              className="flex items-stretch ml-auto"
              aria-label="Main navigation"
            >
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={[
                      "flex items-center px-6 font-body text-xs font-semibold tracking-widest border-l border-primary-foreground/20 transition-smooth",
                      isActive
                        ? "bg-primary-foreground text-primary"
                        : "text-primary-foreground hover:bg-primary-foreground/10",
                    ].join(" ")}
                    data-ocid="nav-link"
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 bg-background">{children}</main>

      {/* Footer */}
      <footer className="bg-muted/40 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <span className="font-display italic text-base text-foreground">
              Scholar Journal
            </span>
            <div className="flex items-center gap-4">
              <p className="font-body text-xs text-muted-foreground">
                © {new Date().getFullYear()}. Built with love using{" "}
                <a
                  href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                    typeof window !== "undefined"
                      ? window.location.hostname
                      : "",
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-foreground transition-smooth"
                >
                  caffeine.ai
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
