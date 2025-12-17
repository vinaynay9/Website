import { Bungee, Fredoka, Inter, Space_Grotesk } from "next/font/google";

// TODO: Temporarily removed fonts for stability - restore when font fetch issues are resolved
// Removed: Bungee_Inline, Bungee_Shade, Permanent_Marker, Righteous, Rubik_Glitch

// Fun/comic fonts for "Vinay" and accents
export const bungee = Bungee({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bungee",
  display: "swap",
});

// Note: next/font/google uses "Fredoka" (not "Fredoka One")
// Fredoka is the base family that includes the rounded, friendly style
export const fredoka = Fredoka({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-fredoka",
  display: "swap",
});

// Body and header fonts (friendly, modern)
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const spaceGrotesk = Space_Grotesk({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

// Combine all font variables for easy application
export const fontVariables = [
  bungee.variable,
  fredoka.variable,
  inter.variable,
  spaceGrotesk.variable,
].join(" ");

