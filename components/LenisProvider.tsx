"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

type LenisProviderProps = {
  children: React.ReactNode;
};

export function LenisProvider({ children }: LenisProviderProps) {
  const lenisInstance = useRef<Lenis | null>(null);
  const rafId = useRef<number>();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Lenis 1.1.0 configuration - minimal, stable options
    // The 'prevent' option MUST be a function that returns boolean
    lenisInstance.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
      prevent: (node) => {
        // Prevent smooth scrolling on elements with data-lenis-prevent attribute
        // or elements inside them (e.g., modals, popups, specific sections)
        return node.hasAttribute('data-lenis-prevent') || 
               node.closest('[data-lenis-prevent]') !== null;
      }
    });

    const animate = (time: number) => {
      lenisInstance.current?.raf(time);
      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      if (lenisInstance.current) {
        lenisInstance.current.destroy();
        lenisInstance.current = null;
      }
    };
  }, []);

  return <>{children}</>;
}

