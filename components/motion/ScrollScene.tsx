"use client";

import { motion, useMotionValue, useReducedMotion, useScroll } from "framer-motion";
import type { MotionValue } from "framer-motion";
import { useMemo, useRef } from "react";

type ScrollSceneProps = {
  children: React.ReactNode | ((state: { progress: MotionValue<number> }) => React.ReactNode);
  className?: string;
  minHeight?: string;
  pin?: boolean;
};

export function ScrollScene({ children, className = "", minHeight = "120vh", pin = false }: ScrollSceneProps) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const scrollOpts = useMemo(
    () => ({
      target: sceneRef,
      offset: ["start end", "end start"]
    }),
    []
  );

  const { scrollYProgress } = useScroll(scrollOpts);
  const fallbackProgress = useMotionValue(0);
  const progress = prefersReducedMotion ? fallbackProgress : scrollYProgress;

  const content =
    typeof children === "function" ? children({ progress }) : children;

  const sectionStyle = useMemo(
    () => ({ minHeight }),
    [minHeight]
  );

  const sectionClassName = useMemo(
    () => `scroll-scene ${pin ? "scroll-scene-pin" : ""} ${className}`.trim(),
    [pin, className]
  );

  return (
    <motion.section
      ref={sceneRef}
      className={sectionClassName}
      style={sectionStyle}
    >
      {content}
    </motion.section>
  );
}

