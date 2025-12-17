"use client";

import { motion, useReducedMotion, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";
import type { ReactNode } from "react";

type ThemeTransitionProps = {
  progress: MotionValue<number>;
  fromColors?: { background: string; text: string };
  toColors?: { background: string; text: string };
  className?: string;
  children: ReactNode;
};

export function ThemeTransition({
  progress,
  fromColors = { background: "#07150D", text: "#ffffff" },
  toColors = { background: "#F3F7F3", text: "#050505" },
  className,
  children
}: ThemeTransitionProps) {
  const prefersReducedMotion = useReducedMotion();

  const backgroundColor = prefersReducedMotion
    ? fromColors.background
    : useTransform(progress, [0, 0.7], [fromColors.background, toColors.background]);

  const textColor = prefersReducedMotion
    ? fromColors.text
    : useTransform(progress, [0, 0.7], [fromColors.text, toColors.text]);

  const borderColor = prefersReducedMotion
    ? "rgba(255,255,255,0.12)"
    : useTransform(progress, [0, 0.7], ["rgba(255,255,255,0.08)", "rgba(0,0,0,0.08)"]);

  return (
    <motion.div
      className={className}
      style={{ backgroundColor, color: textColor, borderColor }}
    >
      {children}
    </motion.div>
  );
}

