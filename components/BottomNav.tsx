"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { useCursor } from "./CursorProvider";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/activity", label: "Activity" },
  { href: "/travel", label: "Travel" },
  { href: "/music", label: "Music" },
  { href: "/timeline", label: "Timeline" },
  { href: "/projects", label: "Projects" },
];

export function BottomNav() {
  const pathname = usePathname();
  const { setCursorType } = useCursor();
  const [isVisible, setIsVisible] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(false);

  // Use refs to track state without triggering re-renders
  const isVisibleRef = useRef(true);
  const isAtBottomRef = useRef(false);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const windowHeight = window.innerHeight;
          const documentHeight = document.documentElement.scrollHeight;
          const scrollBottom = documentHeight - (currentScrollY + windowHeight);

          // Check if we're near the bottom (within 200px of footer) - hide earlier to avoid collision
          const nearBottom = scrollBottom < 200;
          
          // Only update state if value actually changed
          if (nearBottom !== isAtBottomRef.current) {
            isAtBottomRef.current = nearBottom;
            setIsAtBottom(nearBottom);
          }

          // Calculate visibility
          let shouldBeVisible = true;
          if (!nearBottom) {
            if (currentScrollY > lastScrollYRef.current && currentScrollY > 100) {
              // Scrolling down
              shouldBeVisible = false;
            } else {
              // Scrolling up
              shouldBeVisible = true;
            }
          } else {
            // At bottom, always hide
            shouldBeVisible = false;
          }

          // Only update state if visibility actually changed
          if (shouldBeVisible !== isVisibleRef.current) {
            isVisibleRef.current = shouldBeVisible;
            setIsVisible(shouldBeVisible);
          }

          lastScrollYRef.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initialize refs
    lastScrollYRef.current = window.scrollY;

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const hoverable = {
    onMouseEnter: () => setCursorType("link"),
    onMouseLeave: () => setCursorType("default"),
  };

  if (!isVisible) {
    return null;
  }

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/40 bg-background/80 backdrop-blur-md transition-transform duration-300"
      style={{
        transform: isVisible ? "translateY(0)" : "translateY(100%)",
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-6 px-6 py-4">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              prefetch={true}
              {...hoverable}
              className={`accent-hover text-xs uppercase tracking-[0.4em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm ${
                isActive
                  ? "text-accent"
                  : "text-muted hover:text-accent focus-visible:text-accent"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

