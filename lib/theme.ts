export type PaletteKey = "dark" | "light" | "sports" | "hiking" | "scuba";

type Palette = {
  background: string;
  surface: string;
  text: string;
  muted: string;
  border: string;
  accent: string;
  accentSoft: string;
};

export const palettes: Record<PaletteKey, Palette> = {
  dark: {
    background: "#000000",
    surface: "#0c0c0c",
    text: "#f6f6f2",
    muted: "#cfcfcf",
    border: "rgba(255, 255, 255, 0.08)",
    accent: "#7ee787",
    accentSoft: "#43f0d7"
  },
  light: {
    background: "#f8f7f3",
    surface: "#ffffff",
    text: "#030303",
    muted: "#666666",
    border: "rgba(0, 0, 0, 0.1)",
    accent: "#1c5c9a",
    accentSoft: "#a7bfd5"
  },
  sports: {
    background: "#050505",
    surface: "#121212",
    text: "#f7f7f7",
    muted: "#d3d3d3",
    border: "rgba(255, 255, 255, 0.12)",
    accent: "#7eedb4",
    accentSoft: "#33d7a9"
  },
  hiking: {
    background: "#0b1810",
    surface: "#172a20",
    text: "#e9f4ec",
    muted: "#c1d3c6",
    border: "rgba(224, 255, 243, 0.25)",
    accent: "#95e1bf",
    accentSoft: "#5fa88c"
  },
  scuba: {
    background: "#010c19",
    surface: "#071826",
    text: "#e4f4ff",
    muted: "#b6d0e7",
    border: "rgba(255, 255, 255, 0.15)",
    accent: "#4bc0c8",
    accentSoft: "#24a0c6"
  }
};

