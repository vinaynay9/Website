import { LayoutShell } from "@/components/LayoutShell";
import "@/styles/globals.css";

export const metadata = {
  title: "Vinay — Builder · Story · Motion",
  description:
    "Vinay crafts systems, products, and playlists with quiet confidence. Story-driven scroll, cinematic pacing, and thoughtful details.",
  openGraph: {
    title: "Vinay — Builder · Story · Motion",
    description:
      "Vinay crafts systems, products, and playlists with quiet confidence. Story-driven scroll, cinematic pacing, and thoughtful details.",
    siteName: "Vinay Portfolio",
    type: "website",
    url: "https://vinay.com"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}

