"use client";

import { motion, useReducedMotion, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";
import { useRef, useMemo } from "react";

import { motionTokens } from "@/lib/motion";
import { useSharedScroll } from "@/lib/motion/useSharedScroll";

type ParallaxLayerProps = {
  children: React.ReactNode;
  speed?: number;
  axis?: "x" | "y";
  className?: string;
  clamp?: boolean;
  /**
   * Optional: Provide a custom scroll progress value.
   * If not provided, uses the shared scroll hook.
   */
  scrollProgress?: MotionValue<number>;
};

export function ParallaxLayer({
  children,
  speed = motionTokens.parallax.medium,
  axis = "y",
  className,
  clamp = true,
  scrollProgress
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  
  // Use provided scroll progress or fall back to shared scroll hook
  const sharedScrollProgress = useSharedScroll();
  const progress = scrollProgress ?? sharedScrollProgress;

  const motionAmount = prefersReducedMotion ? 0 : speed;
  const transformValue = useTransform(
    progress,
    [0, 1],
    [0, -motionAmount],
    { clamp }
  );

  const style = useMemo(
    () => (axis === "x" ? { x: transformValue } : { y: transformValue }),
    [axis, transformValue]
  );

  return (
    <motion.div ref={ref} className={className} style={style}>
      {children}
    </motion.div>
  );
}

