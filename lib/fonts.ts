/**
 * Self-Hosted Font System
 * 
 * All fonts are loaded locally from /public/fonts/ to avoid runtime Google Fonts downloads.
 * This prevents ETIMEDOUT errors and ensures the dev server remains stable.
 * 
 * To add fonts:
 * 1. Download font files (see docs/fonts.md)
 * 2. Place .woff2 files in /public/fonts/{FontName}/
 * 3. Add font definition below using next/font/local
 * 4. Export the font variable
 * 5. Add to fontVariables if it should be globally available
 * 6. Run: npm run verify-fonts
 * 
 * To remove fonts:
 * 1. Remove font folder from /public/fonts/
 * 2. Remove font definition below
 * 3. Remove references in components
 * 4. Run: npm run verify-fonts
 */

import localFont from "next/font/local";

// === CORE FONTS ===

export const inter = localFont({
  src: [
    {
      path: "./public/fonts/Inter/Inter-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./public/fonts/Inter/Inter-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./public/fonts/Inter/Inter-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-inter",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const spaceGrotesk = localFont({
  src: [
    {
      path: "./public/fonts/SpaceGrotesk/SpaceGrotesk-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./public/fonts/SpaceGrotesk/SpaceGrotesk-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./public/fonts/SpaceGrotesk/SpaceGrotesk-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-space-grotesk",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

// === ACCENT/FUN FONTS ===

export const bungee = localFont({
  src: [
    {
      path: "./public/fonts/Bungee/Bungee-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-bungee",
  display: "swap",
  fallback: ["sans-serif"],
});

export const fredoka = localFont({
  src: [
    {
      path: "./public/fonts/Fredoka/Fredoka-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-fredoka",
  display: "swap",
  fallback: ["sans-serif"],
});

export const righteous = localFont({
  src: [
    {
      path: "./public/fonts/Righteous/Righteous-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-righteous",
  display: "swap",
  fallback: ["sans-serif"],
});

export const permanentMarker = localFont({
  src: [
    {
      path: "./public/fonts/PermanentMarker/PermanentMarker-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-permanent-marker",
  display: "swap",
  fallback: ["cursive", "sans-serif"],
});

// === DISPLAY FONTS ===

export const playfairDisplay = localFont({
  src: [
    {
      path: "./public/fonts/PlayfairDisplay/PlayfairDisplay-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./public/fonts/PlayfairDisplay/PlayfairDisplay-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./public/fonts/PlayfairDisplay/PlayfairDisplay-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-playfair-display",
  display: "swap",
  fallback: ["serif"],
});

export const cinzel = localFont({
  src: [
    {
      path: "./public/fonts/Cinzel/Cinzel-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./public/fonts/Cinzel/Cinzel-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./public/fonts/Cinzel/Cinzel-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-cinzel",
  display: "swap",
  fallback: ["serif"],
});

export const bebasNeue = localFont({
  src: [
    {
      path: "./public/fonts/BebasNeue/BebasNeue-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-bebas-neue",
  display: "swap",
  fallback: ["sans-serif"],
});

export const oswald = localFont({
  src: [
    {
      path: "./public/fonts/Oswald/Oswald-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./public/fonts/Oswald/Oswald-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./public/fonts/Oswald/Oswald-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-oswald",
  display: "swap",
  fallback: ["sans-serif"],
});

export const blackOpsOne = localFont({
  src: [
    {
      path: "./public/fonts/BlackOpsOne/BlackOpsOne-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-black-ops-one",
  display: "swap",
  fallback: ["sans-serif"],
});

// === SCRIPT FONTS ===

export const dancingScript = localFont({
  src: [
    {
      path: "./public/fonts/DancingScript/DancingScript-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./public/fonts/DancingScript/DancingScript-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-dancing-script",
  display: "swap",
  fallback: ["cursive", "sans-serif"],
});

export const greatVibes = localFont({
  src: [
    {
      path: "./public/fonts/GreatVibes/GreatVibes-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-great-vibes",
  display: "swap",
  fallback: ["cursive", "sans-serif"],
});

export const caveat = localFont({
  src: [
    {
      path: "./public/fonts/Caveat/Caveat-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./public/fonts/Caveat/Caveat-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-caveat",
  display: "swap",
  fallback: ["cursive", "sans-serif"],
});

export const kalam = localFont({
  src: [
    {
      path: "./public/fonts/Kalam/Kalam-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./public/fonts/Kalam/Kalam-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-kalam",
  display: "swap",
  fallback: ["cursive", "sans-serif"],
});

// === INTERNATIONAL FONTS ===

export const notoSansJP = localFont({
  src: [
    {
      path: "./public/fonts/NotoSansJP/NotoSansJP-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./public/fonts/NotoSansJP/NotoSansJP-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-noto-sans-jp",
  display: "swap",
  fallback: ["sans-serif"],
});

export const notoSansSC = localFont({
  src: [
    {
      path: "./public/fonts/NotoSansSC/NotoSansSC-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./public/fonts/NotoSansSC/NotoSansSC-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-noto-sans-sc",
  display: "swap",
  fallback: ["sans-serif"],
});

export const notoSansDevanagari = localFont({
  src: [
    {
      path: "./public/fonts/NotoSansDevanagari/NotoSansDevanagari-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./public/fonts/NotoSansDevanagari/NotoSansDevanagari-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-noto-sans-devanagari",
  display: "swap",
  fallback: ["sans-serif"],
});

export const notoSansArabic = localFont({
  src: [
    {
      path: "./public/fonts/NotoSansArabic/NotoSansArabic-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./public/fonts/NotoSansArabic/NotoSansArabic-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-noto-sans-arabic",
  display: "swap",
  fallback: ["sans-serif"],
});

// === FONT COLLECTIONS ===

/**
 * All font CSS variables combined for global application.
 * Add this to the <html> className in layout.tsx
 */
export const fontVariables = [
  inter.variable,
  spaceGrotesk.variable,
  bungee.variable,
  fredoka.variable,
  permanentMarker.variable,
  righteous.variable,
  playfairDisplay.variable,
  cinzel.variable,
  bebasNeue.variable,
  oswald.variable,
  blackOpsOne.variable,
  dancingScript.variable,
  greatVibes.variable,
  caveat.variable,
  kalam.variable,
  notoSansJP.variable,
  notoSansSC.variable,
  notoSansDevanagari.variable,
  notoSansArabic.variable,
].join(" ");

/**
 * Fun/comic fonts for accents and playful text.
 * Used by AccentWord component for random selection.
 */
export const funFonts = [
  bungee.variable,
  fredoka.variable,
  permanentMarker.variable,
  righteous.variable,
];

/**
 * Display fonts for Loki-style morphing and large headings.
 * Used by LokiTitle component for scroll-based font transitions.
 */
export const displayFonts = [
  righteous.variable,
  bungee.variable,
  fredoka.variable,
  oswald.variable,
  bebasNeue.variable,
  blackOpsOne.variable,
];
