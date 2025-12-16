"use client";

import { motion, useReducedMotion } from "framer-motion";

type SceneProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
};

export function Scene({ children, className, id }: SceneProps) {
  const shouldReduceMotion = useReducedMotion();

  const motionSettings = shouldReduceMotion
    ? {
        initial: { opacity: 1, y: 0 },
        whileInView: { opacity: 1, y: 0 }
      }
    : {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.75, ease: [0.19, 1, 0.22, 1] }
      };

  return (
    <motion.section
      id={id}
      className={`scene w-full ${className ?? ""}`}
      viewport={{ once: true, amount: 0.25 }}
      {...motionSettings}
    >
      {children}
    </motion.section>
  );
}

