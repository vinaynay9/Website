"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

type AnimatedSectionProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
};

// Memoized animation variants
const reducedMotionSettings = {
  initial: { opacity: 1, y: 0 },
  whileInView: { opacity: 1, y: 0 }
} as const;

const normalMotionSettings = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.75, ease: [0.19, 1, 0.22, 1] as const }
} as const;

const viewportSettings = { once: true, amount: 0.25 } as const;

export function AnimatedSection({ children, className, id }: AnimatedSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  const motionSettings = useMemo(
    () => shouldReduceMotion ? reducedMotionSettings : normalMotionSettings,
    [shouldReduceMotion]
  );

  return (
    <motion.section
      id={id}
      className={`scene w-full ${className ?? ""}`}
      viewport={viewportSettings}
      {...motionSettings}
    >
      {children}
    </motion.section>
  );
}

