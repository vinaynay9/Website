// Typography configuration system - defines font profiles per page/section
// Each profile specifies font family, weight, letter spacing, and animation behavior
// NOTE: Using core fonts only for stability. Decorative fonts will be reintroduced later.

import {
  spaceGrotesk,
  inter,
  righteous,
  bungee,
  fredoka,
  permanentMarker,
} from "./fonts";

export type TypographyProfile = {
  fontFamily: string; // CSS variable name
  fontWeight: string | number;
  letterSpacing: string;
  lineHeight?: string;
  className?: string; // Additional Tailwind classes
};

export type TypographyConfig = {
  heading: TypographyProfile;
  subheading?: TypographyProfile;
  body: TypographyProfile;
  accent?: TypographyProfile; // For special accents/emphasis
};

// === HOME PAGE TYPOGRAPHY ===
export const homeTypography: TypographyConfig = {
  heading: {
    fontFamily: righteous.variable, // Fallback: was playfairDisplay
    fontWeight: 700,
    letterSpacing: "0.05em",
    className: "font-display",
  },
  subheading: {
    fontFamily: spaceGrotesk.variable, // Fallback: was cinzel
    fontWeight: 400,
    letterSpacing: "0.1em",
  },
  body: {
    fontFamily: spaceGrotesk.variable,
    fontWeight: 400,
    letterSpacing: "0.02em",
    lineHeight: "1.7",
  },
};

// === SPORTS/ACTIVITY TYPOGRAPHY ===
// Heavy, bold, athletic fonts with large letter spacing
export const activityTypography: TypographyConfig = {
  heading: {
    fontFamily: bungee.variable, // Fallback: was blackOpsOne
    fontWeight: 400,
    letterSpacing: "0.15em", // Large spacing for "stadium big" feel
    className: "uppercase",
  },
  subheading: {
    fontFamily: righteous.variable, // Fallback: was oswald
    fontWeight: 700,
    letterSpacing: "0.1em",
    className: "uppercase",
  },
  body: {
    fontFamily: spaceGrotesk.variable,
    fontWeight: 400,
    letterSpacing: "0.03em",
    lineHeight: "1.6",
  },
};

// === MUSIC TYPOGRAPHY ===
// Elegant cursive/script-inspired headers with smooth spacing
export const musicTypography: TypographyConfig = {
  heading: {
    fontFamily: fredoka.variable, // Fallback: was greatVibes
    fontWeight: 400,
    letterSpacing: "0.05em",
    className: "", // Color handled via CSS variables in music page
  },
  subheading: {
    fontFamily: permanentMarker.variable, // Fallback: was dancingScript
    fontWeight: 600,
    letterSpacing: "0.03em",
  },
  body: {
    fontFamily: spaceGrotesk.variable,
    fontWeight: 400,
    letterSpacing: "0.02em",
    lineHeight: "1.7",
  },
  accent: {
    fontFamily: permanentMarker.variable, // Fallback: was dancingScript
    fontWeight: 400,
    letterSpacing: "0.04em",
  },
};

// === TRAVEL TYPOGRAPHY ===
// Clean, modern headers with multilingual support
export const travelTypography: TypographyConfig = {
  heading: {
    fontFamily: righteous.variable, // Fallback: was bebasNeue
    fontWeight: 400,
    letterSpacing: "0.08em",
    className: "uppercase",
  },
  subheading: {
    fontFamily: spaceGrotesk.variable,
    fontWeight: 600,
    letterSpacing: "0.05em",
  },
  body: {
    fontFamily: spaceGrotesk.variable,
    fontWeight: 400,
    letterSpacing: "0.02em",
    lineHeight: "1.7",
  },
};

// === TIMELINE TYPOGRAPHY (evolves with scroll) ===
// Early: handwriting/messy, Middle: transitional, Later: clean/professional
export const timelineTypographyEarly: TypographyConfig = {
  heading: {
    fontFamily: permanentMarker.variable, // Fallback: was caveat
    fontWeight: 700,
    letterSpacing: "0.02em",
    lineHeight: "1.4",
  },
  body: {
    fontFamily: fredoka.variable, // Fallback: was kalam
    fontWeight: 400,
    letterSpacing: "0.01em",
    lineHeight: "1.6",
  },
};

export const timelineTypographyMiddle: TypographyConfig = {
  heading: {
    fontFamily: spaceGrotesk.variable,
    fontWeight: 600,
    letterSpacing: "0.05em",
  },
  body: {
    fontFamily: spaceGrotesk.variable,
    fontWeight: 400,
    letterSpacing: "0.02em",
    lineHeight: "1.7",
  },
};

export const timelineTypographyLate: TypographyConfig = {
  heading: {
    fontFamily: inter.variable,
    fontWeight: 600,
    letterSpacing: "0.03em",
  },
  body: {
    fontFamily: inter.variable,
    fontWeight: 400,
    letterSpacing: "0.01em",
    lineHeight: "1.7",
  },
};

// === MULTILINGUAL FONT MAPPING ===
// Maps language codes to appropriate fonts
// NOTE: Multilingual fonts temporarily removed for stability
// All languages fallback to core fonts - will be reintroduced later
export const multilingualFonts: Record<string, string> = {
  ja: spaceGrotesk.variable, // Japanese - fallback
  zh: spaceGrotesk.variable, // Chinese (Simplified) - fallback
  ar: spaceGrotesk.variable, // Arabic - fallback
  hi: spaceGrotesk.variable, // Hindi/Devanagari - fallback
  default: spaceGrotesk.variable, // Fallback
};

// Country name mappings to their native languages
export const countryNativeNames: Record<string, { native: string; lang: string }> = {
  Japan: { native: "日本", lang: "ja" },
  Italy: { native: "Italia", lang: "default" }, // Latin script, use default
  Spain: { native: "España", lang: "default" }, // Latin script with accent
  France: { native: "France", lang: "default" }, // Same in native
  Germany: { native: "Deutschland", lang: "default" },
  China: { native: "中国", lang: "zh" },
  India: { native: "भारत", lang: "hi" },
  "United Arab Emirates": { native: "الإمارات العربية المتحدة", lang: "ar" },
  // Add more as needed
};

// Helper to get font for a language
export function getFontForLanguage(lang: string): string {
  return multilingualFonts[lang] || multilingualFonts.default;
}

// Helper to get native name for a country
export function getNativeCountryName(countryName: string): { native: string; font: string } | null {
  const mapping = countryNativeNames[countryName];
  if (!mapping) return null;
  
  return {
    native: mapping.native,
    font: getFontForLanguage(mapping.lang),
  };
}

