"use client";

import { motion, useTransform, useMotionValueEvent } from "framer-motion";
import { useState, useEffect, useRef, useMemo } from "react";
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
  // Use ref to track current font index to avoid unnecessary state updates
  const currentFontIndexRef = useRef(0);

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
    // Only update state if font index actually changed
    if (newIndex !== currentFontIndexRef.current && newIndex >= 0) {
      currentFontIndexRef.current = newIndex;
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

  // Memoized transition config
  const letterTransition = useMemo(
    () => ({
      duration: 3,
      ease: "easeInOut" as const,
      repeat: Infinity,
      repeatType: "reverse" as const,
    }),
    []
  );

  // Compute all letter data outside map to avoid hooks in map
  const lettersData = useMemo(
    () =>
      text.split("").map((letter, index) => {
        if (letter === " ") {
          return { letter, index, isSpace: true };
        }
        const xOffset = letterOffsets[index] || 0;
        const yOffset = xOffset * 0.5; // Vertical offset is half of horizontal
        return {
          letter,
          index,
          isSpace: false,
          style: {
            fontFamily: `var(${currentFont}), serif`,
            x: xOffset,
            y: yOffset,
          },
          animate: {
            x: xOffset,
            y: yOffset,
          },
        };
      }),
    [text, letterOffsets, currentFont]
  );

  return (
    <div className={`flex items-center justify-center ${className}`}>
      {lettersData.map((data) => {
        if (data.isSpace) {
          return <span key={data.index} className="w-2 md:w-4" />;
        }

        return (
          <motion.span
            key={data.index}
            className={`${currentFont} ${sizeClasses[size]} font-bold leading-none inline-block`}
            style={data.style}
            animate={data.animate}
            transition={letterTransition}
          >
            {data.letter}
          </motion.span>
        );
      })}
    </div>
  );
}

