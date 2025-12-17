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
    // Removed any unsupported options (e.g., 'prevent') to avoid runtime errors
    lenisInstance.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false
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

