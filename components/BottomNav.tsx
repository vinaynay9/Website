"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [isAtBottom, setIsAtBottom] = useState(false);
  const isAtBottomRef = useRef(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const windowHeight = window.innerHeight;
          const documentHeight = document.documentElement.scrollHeight;
          const currentScrollY = window.scrollY;
          const scrollBottom = documentHeight - (currentScrollY + windowHeight);

          // Check if we're at the very bottom (within 100px of footer)
          // This threshold ensures the bottom nav disappears before footer is fully visible
          const atBottom = scrollBottom < 100;
          
          // Only update state if value actually changed
          if (atBottom !== isAtBottomRef.current) {
            isAtBottomRef.current = atBottom;
            setIsAtBottom(atBottom);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const hoverable = {
    onMouseEnter: () => setCursorType("link"),
    onMouseLeave: () => setCursorType("default"),
  };

  return (
    <AnimatePresence>
      {!isAtBottom && (
        <motion.nav
          initial={{ y: 0, opacity: 1 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{
            duration: 0.3,
            ease: [0.4, 0.0, 0.2, 1],
          }}
          className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/40 bg-background/80 backdrop-blur-md"
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
                  className={`nav-link-playful accent-hover text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm ${
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
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

