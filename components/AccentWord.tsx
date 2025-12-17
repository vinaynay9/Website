"use client";

import { funFonts } from "@/lib/fonts";
import { useMemo } from "react";

interface AccentWordProps {
  children: React.ReactNode;
  className?: string;
  font?: "bungee" | "fredoka" | "permanent-marker" | "righteous" | "random";
}

const fontMap = {
  bungee: "var(--font-bungee)",
  fredoka: "var(--font-fredoka)",
  "permanent-marker": "var(--font-permanent-marker)",
  righteous: "var(--font-righteous)",
  // Temporarily removed for stability
  // "bungee-inline": "var(--font-bungee-inline)",
  // "bungee-shade": "var(--font-bungee-shade)",
};

export function AccentWord({ children, className = "", font = "random" }: AccentWordProps) {
  const selectedFont = useMemo(() => {
    if (font === "random") {
      return funFonts[Math.floor(Math.random() * funFonts.length)];
    }
    return fontMap[font];
  }, [font]);

  return (
    <span
      className={`inline-block transition-all duration-300 group ${className}`}
      style={{ fontFamily: `${selectedFont}, sans-serif` }}
    >
      <span className="relative">
        {children}
        <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </span>
    </span>
  );
}

