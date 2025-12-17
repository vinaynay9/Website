"use client";

import { motion, MotionProps } from "framer-motion";
import { TypographyProfile } from "@/lib/typography";
import { ReactNode, useMemo } from "react";

export type DynamicHeadingProps = {
  profile: TypographyProfile;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  animate?: boolean;
  scrollProgress?: number; // 0-1 for scroll-based animations
  motionProps?: MotionProps;
};

// Memoized animation variants
const initialVariant = { opacity: 0, y: 20 } as const;
const animateVariant = { opacity: 1, y: 0 } as const;
const transitionConfig = { duration: 0.6, ease: [0.19, 1, 0.22, 1] as const } as const;

/**
 * DynamicHeading - A flexible heading component that applies typography profiles
 * Supports scroll-based font changes and animations
 */
export function DynamicHeading({
  profile,
  as = "h2",
  children,
  className = "",
  style,
  animate = false,
  scrollProgress,
  motionProps,
}: DynamicHeadingProps) {
  const Component = motion[as] as any;

  const baseStyle: React.CSSProperties = useMemo(
    () => ({
      fontFamily: `var(${profile.fontFamily}), var(--font-space-grotesk), var(--font-inter), system-ui, sans-serif`,
      fontWeight: profile.fontWeight,
      letterSpacing: profile.letterSpacing,
      lineHeight: profile.lineHeight,
      ...style, // Merge with provided style prop
    }),
    [profile.fontFamily, profile.fontWeight, profile.letterSpacing, profile.lineHeight, style]
  );

  const baseClasses = useMemo(
    () => `${profile.className || ""} ${className}`.trim(),
    [profile.className, className]
  );

  if (animate || scrollProgress !== undefined) {
    return (
      <Component
        style={baseStyle}
        className={baseClasses}
        initial={animate ? initialVariant : undefined}
        animate={animate ? animateVariant : undefined}
        transition={transitionConfig}
        {...motionProps}
      >
        {children}
      </Component>
    );
  }

  const StaticComponent = as;
  return (
    <StaticComponent style={baseStyle} className={baseClasses}>
      {children}
    </StaticComponent>
  );
}

