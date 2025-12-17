"use client";

import { type CSSProperties, type ReactNode } from "react";

import { palettes, type PaletteKey } from "@/lib/theme";

const createVars = (palette: PaletteKey) => {
  const colors = palettes[palette];

  const vars: CSSProperties = {
    "--color-background": colors.background,
    "--color-surface": colors.surface,
    "--color-text": colors.text,
    "--color-muted": colors.muted,
    "--color-border": colors.border,
    "--color-accent": colors.accent,
    "--color-accent-soft": colors.accentSoft
  } as CSSProperties;

  return vars;
};

type ThemeProviderProps = {
  palette?: PaletteKey;
  children: ReactNode;
};

export function ThemeProvider({ palette = "dark", children }: ThemeProviderProps) {
  const style = createVars(palette);
  // Map palette to theme for CSS variable switching
  const theme = palette === "light" ? "light" : "dark";

  return (
    <div style={style} className="theme-provider" data-theme={theme}>
      {children}
    </div>
  );
}

