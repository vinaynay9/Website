"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { motionTokens } from "@/lib/motion";

type ParallaxLayerProps = {
  children: React.ReactNode;
  speed?: number;
  axis?: "x" | "y";
  className?: string;
  clamp?: boolean;
};

export function ParallaxLayer({
  children,
  speed = motionTokens.parallax.medium,
  axis = "y",
  className,
  clamp = true
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const motionAmount = prefersReducedMotion ? 0 : speed;
  const transformValue = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -motionAmount],
    { clamp }
  );

  const style = axis === "x" ? { x: transformValue } : { y: transformValue };

  return (
    <motion.div ref={ref} className={className} style={style}>
      {children}
    </motion.div>
  );
}

