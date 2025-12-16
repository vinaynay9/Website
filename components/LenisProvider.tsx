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

    lenisInstance.current = new Lenis({
      duration: 1.3,
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

    return () => {
      rafId.current && cancelAnimationFrame(rafId.current);
      lenisInstance.current?.destroy();
      lenisInstance.current = null;
    };
  }, []);

  return <>{children}</>;
}

