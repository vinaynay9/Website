"use client";

import { motion, useTransform, useMotionValueEvent } from "framer-motion";
import { useState, useEffect } from "react";
import { displayFonts } from "@/lib/fonts";
import { useSharedScroll } from "@/lib/motion/useSharedScroll";

interface LokiTitleProps {
  text: string;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

/**
 * LokiTitle - Animated title with subtle letter shifting and slow font morphing
 * Inspired by Loki's time/identity theme - elegant, not glitchy
 */
export function LokiTitle({ text, className = "", size = "xl" }: LokiTitleProps) {
  const [currentFontIndex, setCurrentFontIndex] = useState(0);
  const [letterOffsets, setLetterOffsets] = useState<number[]>([]);

  // Initialize letter offsets with subtle random values
  useEffect(() => {
    setLetterOffsets(
      Array.from({ length: text.length }, () => (Math.random() - 0.5) * 2)
    );
  }, [text.length]);

  // Scroll-based font morphing (slow transition between fonts)
  // Use shared scroll hook for better performance
  const scrollYProgress = useSharedScroll();
  const fontMorphProgress = useTransform(scrollYProgress, [0, 1], [0, displayFonts.length]);

  useMotionValueEvent(fontMorphProgress, "change", (latest) => {
    const newIndex = Math.min(Math.floor(latest), displayFonts.length - 1);
    if (newIndex !== currentFontIndex && newIndex >= 0) {
      setCurrentFontIndex(newIndex);
    }
  });

  // Subtle letter shifting animation (continuous, gentle)
  useEffect(() => {
    const interval = setInterval(() => {
      setLetterOffsets((prev) =>
        prev.map((offset) => offset + (Math.random() - 0.5) * 0.3)
      );
    }, 2000); // Slow, subtle shifts every 2 seconds

    return () => clearInterval(interval);
  }, []);

  const sizeClasses = {
    sm: "text-4xl",
    md: "text-6xl",
    lg: "text-8xl",
    xl: "text-[clamp(72px,12vw,160px)]",
  };

  const currentFont = displayFonts[currentFontIndex];

  return (
    <div className={`flex items-center justify-center ${className}`}>
      {text.split("").map((letter, index) => {
        // Skip spaces for cleaner animation
        if (letter === " ") {
          return <span key={index} className="w-2 md:w-4" />;
        }

        return (
          <motion.span
            key={index}
            className={`${currentFont} ${sizeClasses[size]} font-bold leading-none inline-block`}
            style={{
              fontFamily: `var(${currentFont}), serif`,
              x: letterOffsets[index] || 0,
              y: (letterOffsets[index] || 0) * 0.5, // Vertical offset is half of horizontal
            }}
            animate={{
              x: letterOffsets[index] || 0,
              y: (letterOffsets[index] || 0) * 0.5,
            }}
            transition={{
              duration: 3,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            {letter}
          </motion.span>
        );
      })}
    </div>
  );
}

