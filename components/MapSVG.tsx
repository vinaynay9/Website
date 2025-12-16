"use client";

import type { KeyboardEvent } from "react";
import { useCursor } from "./CursorProvider";

import type { TravelCountry } from "@/data/travel";

type MapSVGProps = {
  countries: TravelCountry[];
  activeCode?: string;
  onSelect: (country: TravelCountry) => void;
};

export function MapSVG({ countries, activeCode, onSelect }: MapSVGProps) {
  const { setCursorType } = useCursor();

  const handleFocus = () => setCursorType("link");
  const handleBlur = () => setCursorType("default");

  const handleKey = (event: KeyboardEvent, country: TravelCountry) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelect(country);
    }
  };

  return (
    <svg
      viewBox="0 0 600 360"
      className="h-[360px] w-full rounded-[28px] border border-border/40 bg-surface/30"
      role="img"
      aria-label="Interactive travel map"
    >
      <rect
        x={0}
        y={0}
        width="100%"
        height="100%"
        rx="28"
        fill="url(#travelGradient)"
      />
      <defs>
        <linearGradient id="travelGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(255, 255, 255, 0.05)" />
          <stop offset="100%" stopColor="rgba(15, 61, 107, 0.4)" />
        </linearGradient>
      </defs>
      {countries.map((country) => {
        const isActive = country.code === activeCode;
        return (
          <circle
            key={country.code}
            cx={country.coords[0]}
            cy={country.coords[1]}
            r={isActive ? 16 : 12}
            fill={isActive ? "var(--color-accent)" : "var(--color-accent-soft)"}
            stroke="rgba(255,255,255,0.6)"
            strokeWidth={isActive ? 2 : 1}
            className="cursor-pointer transition-all duration-200"
            role="button"
            tabIndex={0}
            aria-label={`${country.name} • ${country.region}`}
            onClick={() => onSelect(country)}
            onMouseEnter={handleFocus}
            onMouseLeave={handleBlur}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={(event) => handleKey(event, country)}
          />
        );
      })}
    </svg>
  );
}

