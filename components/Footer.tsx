"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { useCursor } from "./CursorProvider";
import { footerPages, footerSocials, footerProjects } from "@/data/footerLinks";

export function Footer() {
  const { setCursorType } = useCursor();
  const router = useRouter();
  const [pendingRoute, setPendingRoute] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const windowHeight = window.innerHeight;
          const documentHeight = document.documentElement.scrollHeight;
          const currentScrollY = window.scrollY;
          const scrollBottom = documentHeight - (currentScrollY + windowHeight);

          // Footer becomes visible when approaching bottom (within 150px)
          const shouldBeVisible = scrollBottom < 150;
          setIsVisible(shouldBeVisible);

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

  const hoverable = useCallback(() => ({
    onMouseEnter: () => setCursorType("link"),
    onMouseLeave: () => setCursorType("default"),
  }), [setCursorType]);

  const handleLinkHover = useCallback((href: string) => {
    // Prefetch on hover for internal routes
    if (href.startsWith("/")) {
      router.prefetch(href);
    }
  }, [router]);

  const handleLinkClick = useCallback((href: string) => {
    if (href.startsWith("/")) {
      setPendingRoute(href);
      // Clear pending state after navigation completes
      setTimeout(() => setPendingRoute(null), 500);
    }
  }, []);

  const linkClassName = "accent-hover text-muted block py-1.5 px-2 -mx-2 rounded-sm transition-all duration-150 hover:text-accent hover:bg-accent/5 focus-visible:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:bg-accent/5 active:translate-y-[1px] active:opacity-80 relative";

  const sectionHeaderClassName = "mb-5 text-[0.65rem] font-medium uppercase tracking-[0.5em] text-muted/80 relative pb-2";

  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.4, 0.0, 0.2, 1],
      },
    },
  };

  return (
    <footer className="relative border-t border-border bg-gradient-to-b from-background via-background to-background/95 px-6 pt-16 pb-24 text-xs uppercase tracking-[0.4em]">
      {/* Subtle gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent opacity-30" />
      
      <motion.div
        className="relative mx-auto max-w-6xl"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        <div className="grid grid-cols-1 gap-12 sm:gap-16 md:grid-cols-2 lg:grid-cols-3">
          {/* Pages Section */}
          <motion.section variants={sectionVariants}>
            <h3 className={sectionHeaderClassName}>
              Pages
              <span className="absolute bottom-0 left-0 h-px w-12 bg-gradient-to-r from-accent/40 to-transparent" />
            </h3>
            <nav className="flex flex-col gap-1">
              {footerPages.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  prefetch={true}
                  {...hoverable()}
                  onMouseEnter={() => handleLinkHover(link.href)}
                  onClick={() => handleLinkClick(link.href)}
                  className={`${linkClassName} ${pendingRoute === link.href ? "opacity-60" : ""}`}
                >
                  {link.label}
                  {pendingRoute === link.href && (
                    <span className="ml-2 inline-block h-1 w-1 animate-pulse rounded-full bg-accent" />
                  )}
                </Link>
              ))}
            </nav>
          </motion.section>

          {/* Socials Section */}
          <motion.section variants={sectionVariants}>
            <h3 className={sectionHeaderClassName}>
              Socials
              <span className="absolute bottom-0 left-0 h-px w-12 bg-gradient-to-r from-accent/40 to-transparent" />
            </h3>
            <nav className="flex flex-col gap-1">
              {footerSocials.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  {...hoverable()}
                  className={linkClassName}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.section>

          {/* Projects Section */}
          <motion.section 
            variants={sectionVariants}
            className="md:col-span-2 lg:col-span-1"
          >
            <h3 className={sectionHeaderClassName}>
              Projects
              <span className="absolute bottom-0 left-0 h-px w-12 bg-gradient-to-r from-accent/40 to-transparent" />
            </h3>
            <nav className="flex flex-col gap-1">
              {footerProjects.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  prefetch={true}
                  {...hoverable()}
                  onMouseEnter={() => handleLinkHover(link.href)}
                  onClick={() => handleLinkClick(link.href)}
                  className={`${linkClassName} ${pendingRoute === link.href ? "opacity-60" : ""}`}
                >
                  {link.label}
                  {pendingRoute === link.href && (
                    <span className="ml-2 inline-block h-1 w-1 animate-pulse rounded-full bg-accent" />
                  )}
                </Link>
              ))}
            </nav>
          </motion.section>
        </div>
      </motion.div>
    </footer>
  );
}

