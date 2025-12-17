const tokens = {
  colors: {
    // Use CSS variables for theme-aware colors
    background: "var(--color-background)",
    surface: "var(--color-surface)",
    muted: "var(--color-muted)",
    border: "var(--color-border)",
    text: "var(--color-text)",
    accent: "var(--color-accent)",
    accentSoft: "var(--color-accent-soft)",
    accentLight: "var(--color-accent-light)",
    accentMuted: "var(--color-accent-muted)",
    accentSubtle: "var(--color-accent-subtle)",
    // Themed colors (still use CSS variables)
    travel: "var(--color-travel)",
    activity: "var(--color-activity)",
    music: "var(--color-music)",
    lavenderDark: "var(--color-lavender-dark)",
    lavenderBase: "var(--color-lavender-base)",
    lavenderSoft: "var(--color-lavender-soft)",
    lavenderLight: "var(--color-lavender-light)",
    lavenderMuted: "var(--color-lavender-muted)",
    lavenderSubtle: "var(--color-lavender-subtle)",
    lavenderAccent: "var(--color-lavender-accent)",
    roseLavender: "var(--color-rose-lavender)",
    roseLavenderGlow: "var(--color-rose-lavender-glow)"
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
        // Core fonts only - stable set for dev
        bungee: ["var(--font-bungee)", "sans-serif"],
        fredoka: ["var(--font-fredoka)", "sans-serif"],
        "permanent-marker": ["var(--font-permanent-marker)", "sans-serif"],
        righteous: ["var(--font-righteous)", "sans-serif"],
        // Body and headers (friendly, modern)
        body: ["var(--font-space-grotesk)", "var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-space-grotesk)", "var(--font-inter)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      }
    }
  },
  plugins: []
};

