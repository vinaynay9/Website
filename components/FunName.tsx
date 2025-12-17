"use client";

import { motion } from "framer-motion";
import { useState, useMemo, useCallback } from "react";
import { bungee, fredoka } from "@/lib/fonts";

// Font assignments for each letter of "Vinay" - cycling between Bungee and Fredoka
const letterFonts = [
  { letter: "V", fontClass: bungee.variable, rotation: -2 },
  { letter: "i", fontClass: fredoka.variable, rotation: 1 },
  { letter: "n", fontClass: bungee.variable, rotation: -1.5 },
  { letter: "a", fontClass: fredoka.variable, rotation: 2 },
  { letter: "y", fontClass: bungee.variable, rotation: -1 },
];

// Memoized animation variants
const underlineInitialVariant = { scaleX: 0, opacity: 0 } as const;
const underlineTransitionConfig = { duration: 0.2, ease: "easeOut" as const } as const;
const letterTransitionConfig = {
  opacity: { duration: 0.5 },
  y: { duration: 0.5, type: "spring" as const, stiffness: 200 },
  rotate: { duration: 0.25 },
  color: { duration: 0.2, ease: "easeOut" as const }
} as const;

interface FunNameProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

// Memoized letter component to avoid hooks in map
type LetterProps = {
  letter: string;
  fontClass: string;
  rotation: number;
  size: "sm" | "md" | "lg" | "xl";
  index: number;
  hoveredIndex: number | null;
  onHoverStart: () => void;
  onHoverEnd: () => void;
};

const sizeClasses = {
  sm: "text-4xl",
  md: "text-6xl",
  lg: "text-8xl",
  xl: "text-[clamp(72px,12vw,160px)]",
} as const;

const whileHoverTransition = { 
  duration: 0.2, 
  type: "spring" as const, 
  stiffness: 300,
  color: { duration: 0.2, ease: "easeOut" as const },
} as const;

function Letter({ letter, fontClass, rotation, size, index, hoveredIndex, onHoverStart, onHoverEnd }: LetterProps) {
  const initialVariant = { opacity: 0, y: 20, rotate: rotation } as const;
  
  const animateVariant = useMemo(
    () => ({
      opacity: 1,
      y: 0,
      rotate: rotation,
      color: hoveredIndex === index ? "#2d5a3d" : "var(--color-text)",
    }),
    [rotation, hoveredIndex, index]
  );

  const whileHoverVariant = useMemo(
    () => ({
      rotate: rotation + (Math.random() * 4 - 2),
      scale: 1.03,
      color: "#2d5a3d",
      transition: whileHoverTransition,
    }),
    [rotation]
  );

  const letterTransition = useMemo(
    () => ({
      opacity: { duration: 0.5, delay: index * 0.08 },
      y: { duration: 0.5, delay: index * 0.08, type: "spring" as const, stiffness: 200 },
      rotate: { duration: 0.25 },
      color: { duration: 0.2, ease: "easeOut" as const },
    }),
    [index]
  );

  const underlineAnimateVariant = useMemo(
    () => ({
      scaleX: hoveredIndex === index ? 1 : 0,
      opacity: hoveredIndex === index ? 0.8 : 0,
    }),
    [hoveredIndex, index]
  );

  const underlineStyle = useMemo(
    () => ({
      boxShadow: hoveredIndex === index ? '0 0 12px rgba(45, 90, 61, 0.6)' : 'none',
    }),
    [hoveredIndex, index]
  );

  return (
    <motion.span
      className={`${fontClass} ${sizeClasses[size]} font-bold leading-none inline-block relative`}
      style={{
        fontFamily: `var(${fontClass}), sans-serif`,
      }}
      initial={initialVariant}
      animate={animateVariant}
      whileHover={whileHoverVariant}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      transition={letterTransition}
    >
      {letter}
      <motion.span
        className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#2d5a3d] rounded-full"
        initial={underlineInitialVariant}
        animate={underlineAnimateVariant}
        transition={underlineTransitionConfig}
        style={underlineStyle}
      />
    </motion.span>
  );
}

export function FunName({ className = "", size = "xl" }: FunNameProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleHoverStart = useCallback((index: number) => () => setHoveredIndex(index), []);
  const handleHoverEnd = useCallback(() => setHoveredIndex(null), []);

  return (
    <div className={`flex items-center justify-center gap-0.5 md:gap-1 ${className}`}>
      {letterFonts.map(({ letter, fontClass, rotation }, index) => (
        <Letter
          key={index}
          letter={letter}
          fontClass={fontClass}
          rotation={rotation}
          size={size}
          index={index}
          hoveredIndex={hoveredIndex}
          onHoverStart={handleHoverStart(index)}
          onHoverEnd={handleHoverEnd}
        />
      ))}
    </div>
  );
}

