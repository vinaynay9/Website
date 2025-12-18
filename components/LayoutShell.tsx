 "use client";

console.log("[BOOT] LayoutShell LOADED");

import Link from "next/link";
import { useCallback } from "react";
import { LenisProvider } from "./LenisProvider";
import { CursorProvider, useCursor } from "./CursorProvider";
import { ThemeProvider } from "./ThemeProvider";
import { BottomNav } from "./BottomNav";
import { Footer } from "./Footer";
import { RouteProgress } from "./RouteProgress";
import { SharedScrollProvider } from "@/lib/motion/useSharedScroll";

const contactLinks = [
  { href: "https://www.linkedin.com/in/vinaygov", label: "LinkedIn" },
  { href: "mailto:vinaysgovindaraju@gmail.com", label: "Email" },
  { href: "https://www.instagram.com/vinaynay9", label: "Instagram" },
];

type LayoutShellProps = {
  children: React.ReactNode;
};

export function LayoutShell({ children }: LayoutShellProps) {
  return (
    <CursorProvider>
      <LenisProvider>
        <SharedScrollProvider>
          <ThemeProvider>
            <LayoutContent>{children}</LayoutContent>
          </ThemeProvider>
        </SharedScrollProvider>
      </LenisProvider>
    </CursorProvider>
  );
}

function LayoutContent({ children }: LayoutShellProps) {
  const { setCursorType } = useCursor();

  const hoverable = useCallback(() => ({
    onMouseEnter: () => setCursorType("link"),
    onMouseLeave: () => setCursorType("default")
  }), [setCursorType]);

  return (
    <div className="relative min-h-screen bg-background text-text">
      <RouteProgress />
      <div className="noise-layer" aria-hidden />
      <div className="circuit-texture" aria-hidden />
      <div className="wiring-overlay" aria-hidden />
      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/80 px-6 py-5 backdrop-blur-sm transition-colors hover:border-accent/30">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link 
            href="/" 
            prefetch={true} 
            {...hoverable()} 
            className="accent-hover transition-colors hover:text-accent focus-visible:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm text-xl font-medium tracking-wide"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Vinay
          </Link>
          <nav className="flex flex-wrap gap-5 text-sm">
            {contactLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                {...hoverable()}
                className="nav-link-contact accent-hover transition-colors hover:text-accent focus-visible:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </header>
      {/* Increased vertical padding (py-12) for better top/bottom breathing room */}
      {/* Added pb-24 to account for bottom nav, allowing smooth transition to footer */}
      <main className="relative z-10 px-6 py-12 pb-24">{children}</main>
      <Footer />
      <BottomNav />
    </div>
  );
}

