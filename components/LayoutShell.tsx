 "use client";

import Link from "next/link";
import { LenisProvider } from "./LenisProvider";
import { CursorProvider, useCursor } from "./CursorProvider";
import { ThemeProvider } from "./ThemeProvider";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/timeline", label: "Timeline" },
  { href: "/activity", label: "Activity" },
  { href: "/travel", label: "Travel" },
  { href: "/music", label: "Music" }
];

const footerLinks = [
  ...navLinks,
  { href: "/board", label: "Board (private)" },
  { href: "mailto:hi@vinay.com", label: "Email" },
  { href: "https://www.linkedin.com/in/vinay", label: "LinkedIn" },
  { href: "https://github.com/vinay", label: "GitHub" }
];

type LayoutShellProps = {
  children: React.ReactNode;
};

export function LayoutShell({ children }: LayoutShellProps) {
  return (
    <CursorProvider>
      <LenisProvider>
        <ThemeProvider>
          <LayoutContent>{children}</LayoutContent>
        </ThemeProvider>
      </LenisProvider>
    </CursorProvider>
  );
}

function LayoutContent({ children }: LayoutShellProps) {
  const { setCursorType } = useCursor();

  const hoverable = {
    onMouseEnter: () => setCursorType("link"),
    onMouseLeave: () => setCursorType("default")
  };

  return (
    <div className="relative min-h-screen bg-background text-text">
      <div className="noise-layer" aria-hidden />
      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/80 px-6 py-5 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between text-xs uppercase tracking-[0.4em]">
          <Link href="/" {...hoverable} className="text-sm tracking-[0.65em]">
            Vinay
          </Link>
          <nav className="flex flex-wrap gap-5 text-[0.65rem] tracking-[0.45em]">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} {...hoverable}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="relative z-10 px-6 py-10">{children}</main>
      <footer className="border-t border-border/40 px-6 py-8 text-[0.65rem] uppercase tracking-[0.4em]">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-4 text-muted">
          <div className="flex flex-wrap gap-4">
            {footerLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-text" {...hoverable}>
                {link.label}
              </Link>
            ))}
          </div>
          <p className="text-[0.6rem] tracking-[0.6em] text-muted">
            Quiet confidence + crafted motion · {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}

