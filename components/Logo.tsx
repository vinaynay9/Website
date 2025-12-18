"use client";

import { useCursor } from "./CursorProvider";

type LogoProps = {
  className?: string;
};

/**
 * Logo component for site header
 * 
 * Features:
 * - Custom SVG logo with playful handwritten "V" + clean "inay"
 * - Designed to be replaced easily with future custom graphics
 * - Inherits text color from parent (works with theme system)
 * - Minimal assumptions about dimensions
 * 
 * To replace with a custom logo:
 * 1. Replace the SVG content in /public/logo/vinay-logo.svg
 * 2. Or swap this component entirely with an Image component
 * 3. Update className prop for custom sizing if needed
 */
export function Logo({ className = "" }: LogoProps) {
  const { setCursorType } = useCursor();

  return (
    <div 
      onMouseEnter={() => setCursorType("link")}
      onMouseLeave={() => setCursorType("default")}
      className={`logo-container inline-flex items-center gap-1 transition-all duration-200 hover:scale-105 ${className}`}
      style={{ color: "inherit" }}
    >
      {/* Inline SVG for better control and theme integration */}
      <svg 
        width="48" 
        height="48" 
        viewBox="0 0 48 48" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-300 hover:rotate-1"
        aria-label="Vinay Logo"
      >
        <g>
          {/* "V" with a dynamic swoosh */}
          <path 
            d="M8 8 L24 38 L40 8" 
            stroke="currentColor" 
            strokeWidth="4" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            fill="none"
          />
          
          {/* Small accent dot (like a signature mark) */}
          <circle cx="24" cy="42" r="2.5" fill="currentColor" opacity="0.7"/>
          
          {/* Subtle underline swoosh */}
          <path 
            d="M6 45 Q24 43 42 45" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            fill="none" 
            opacity="0.5"
          />
        </g>
      </svg>
      <span className="text-xl font-medium tracking-wide" style={{ fontFamily: "var(--font-space-grotesk)" }}>
        inay
      </span>
    </div>
  );
}

