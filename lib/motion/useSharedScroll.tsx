/**
 * Shared Scroll Hook
 * 
 * Provides a single scroll progress source for parallax effects.
 * This prevents multiple useScroll hooks from being created per element,
 * which is a major performance bottleneck.
 */

"use client";

import { useScroll } from "framer-motion";
import { createContext, useContext, type ReactNode } from "react";
import type { MotionValue } from "framer-motion";

type SharedScrollContextValue = {
  scrollYProgress: MotionValue<number>;
};

const SharedScrollContext = createContext<SharedScrollContextValue | null>(null);

export function SharedScrollProvider({ children }: { children: ReactNode }) {
  // Single scroll hook for the entire page
  const { scrollYProgress } = useScroll();
  
  return (
    <SharedScrollContext.Provider value={{ scrollYProgress }}>
      {children}
    </SharedScrollContext.Provider>
  );
}

export function useSharedScroll(): MotionValue<number> {
  const context = useContext(SharedScrollContext);
  
  if (!context) {
    // Fallback: create a local scroll hook if provider is missing
    // This allows gradual migration
    const { scrollYProgress } = useScroll();
    return scrollYProgress;
  }
  
  return context.scrollYProgress;
}

