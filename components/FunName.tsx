"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { bungee, fredoka } from "@/lib/fonts";

// Font assignments for each letter of "Vinay" - cycling between Bungee and Fredoka
const letterFonts = [
  { letter: "V", fontClass: bungee.variable, rotation: -2 },
  { letter: "i", fontClass: fredoka.variable, rotation: 1 },
  { letter: "n", fontClass: bungee.variable, rotation: -1.5 },
  { letter: "a", fontClass: fredoka.variable, rotation: 2 },
  { letter: "y", fontClass: bungee.variable, rotation: -1 },
];

interface FunNameProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export function FunName({ className = "", size = "xl" }: FunNameProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const sizeClasses = {
    sm: "text-4xl",
    md: "text-6xl",
    lg: "text-8xl",
    xl: "text-[clamp(72px,12vw,160px)]",
  };

  return (
    <div className={`flex items-center justify-center gap-0.5 md:gap-1 ${className}`}>
      {letterFonts.map(({ letter, fontClass, rotation }, index) => (
        <motion.span
          key={index}
          className={`${fontClass} ${sizeClasses[size]} font-bold leading-none inline-block`}
          style={{
            fontFamily: `var(${fontClass}), sans-serif`,
          }}
          initial={{ opacity: 0, y: 20, rotate: rotation }}
          animate={{
            opacity: 1,
            y: 0,
            rotate: rotation,
          }}
          whileHover={{
            rotate: rotation + (Math.random() * 4 - 2),
            scale: 1.03,
            transition: { duration: 0.2, type: "spring", stiffness: 300 },
          }}
          onHoverStart={() => setHoveredIndex(index)}
          onHoverEnd={() => setHoveredIndex(null)}
          transition={{
            opacity: { duration: 0.5, delay: index * 0.08 },
            y: { duration: 0.5, delay: index * 0.08, type: "spring", stiffness: 200 },
            rotate: { duration: 0.25 },
          }}
        >
          {letter}
        </motion.span>
      ))}
    </div>
  );
}

