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
          className={`${fontClass} ${sizeClasses[size]} font-bold leading-none inline-block relative`}
          style={{
            fontFamily: `var(${fontClass}), sans-serif`,
          }}
          initial={{ opacity: 0, y: 20, rotate: rotation }}
          animate={{
            opacity: 1,
            y: 0,
            rotate: rotation,
            color: hoveredIndex === index ? "#2d5a3d" : "var(--color-text)",
          }}
          whileHover={{
            rotate: rotation + (Math.random() * 4 - 2),
            scale: 1.03,
            color: "#2d5a3d",
            transition: { 
              duration: 0.2, 
              type: "spring", 
              stiffness: 300,
              color: { duration: 0.2, ease: "easeOut" },
            },
          }}
          onHoverStart={() => setHoveredIndex(index)}
          onHoverEnd={() => setHoveredIndex(null)}
          transition={{
            opacity: { duration: 0.5, delay: index * 0.08 },
            y: { duration: 0.5, delay: index * 0.08, type: "spring", stiffness: 200 },
            rotate: { duration: 0.25 },
            color: { duration: 0.2, ease: "easeOut" },
          }}
        >
          {letter}
          <motion.span
            className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#2d5a3d] rounded-full"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{
              scaleX: hoveredIndex === index ? 1 : 0,
              opacity: hoveredIndex === index ? 0.8 : 0,
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{
              boxShadow: hoveredIndex === index ? '0 0 12px rgba(45, 90, 61, 0.6)' : 'none',
            }}
          />
        </motion.span>
      ))}
    </div>
  );
}

