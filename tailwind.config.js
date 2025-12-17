const tokens = {
  colors: {
    background: "#000000",
    surface: "#0c0c0c",
    muted: "#111111",
    border: "rgba(255,255,255,0.08)",
    text: "#f5f5f0",
    accent: "#2d5a3d",
    accentSoft: "#4a7c5a",
    accentLight: "#5a8a6a",
    accentMuted: "rgba(45, 90, 61, 0.4)",
    accentSubtle: "rgba(45, 90, 61, 0.15)",
    travel: "#0f3d6b",
    activity: "#a55f2d",
    music: "#8c63dc",
    lavenderDark: "#2d1f3d",
    lavenderBase: "#4a3a5a",
    lavenderSoft: "#6b5a7a",
    lavenderLight: "#8b7a9a",
    lavenderMuted: "rgba(107, 90, 122, 0.4)",
    lavenderSubtle: "rgba(107, 90, 122, 0.15)",
    lavenderAccent: "#9d8bb3"
  },
  spacing: {
    4: "1rem",
    6: "1.5rem",
    8: "2rem",
    10: "2.5rem",
    12: "3rem",
    14: "3.5rem",
    16: "4rem",
    20: "5rem"
  },
  radii: {
    sm: "6px",
    md: "12px",
    lg: "24px"
  },
  motion: {
    durations: {
      short: "0.25s",
      medium: "0.45s",
      long: "0.8s"
    },
    easing: "cubic-bezier(0.19, 1, 0.22, 1)"
  },
  shadows: {
    soft: "0 20px 45px rgba(0,0,0,0.45)",
    focus: "0 0 0 18px rgba(126, 231, 135, 0.25)"
  }
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.ts"
  ],
  theme: {
    extend: {
      colors: tokens.colors,
      spacing: tokens.spacing,
      borderRadius: tokens.radii,
      boxShadow: tokens.shadows,
      transitionTimingFunction: {
        eased: tokens.motion.easing
      },
      transitionDuration: {
        short: tokens.motion.durations.short,
        medium: tokens.motion.durations.medium,
        long: tokens.motion.durations.long
      },
      fontFamily: {
        // Fun/comic fonts for accents
        bungee: ["var(--font-bungee)", "sans-serif"],
        fredoka: ["var(--font-fredoka)", "sans-serif"],
        // TODO: Temporarily removed font families for stability - restore when font fetch issues are resolved
        // "bungee-inline": ["var(--font-bungee-inline)", "sans-serif"],
        // "bungee-shade": ["var(--font-bungee-shade)", "sans-serif"],
        // "permanent-marker": ["var(--font-permanent-marker)", "sans-serif"],
        // righteous: ["var(--font-righteous)", "sans-serif"],
        // "rubik-glitch": ["var(--font-rubik-glitch)", "sans-serif"],
        // Body and headers (friendly, modern)
        body: ["var(--font-space-grotesk)", "var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-space-grotesk)", "var(--font-inter)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      }
    }
  },
  plugins: []
};

