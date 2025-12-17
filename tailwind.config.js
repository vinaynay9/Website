const tokens = {
  colors: {
    background: "#000000",
    surface: "#0c0c0c",
    muted: "#111111",
    border: "rgba(255,255,255,0.08)",
    text: "#f5f5f0",
    accent: "#7ee787",
    accentSoft: "#43f0d7",
    travel: "#0f3d6b",
    activity: "#a55f2d",
    music: "#8c63dc"
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
        display: ["Clash Display", "sans-serif"],
        body: ["Inter", "sans-serif"]
      }
    }
  },
  plugins: []
};

