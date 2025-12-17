export type TimelineItem = {
  id: string;
  title: string;
  period: string;
  dateRange: string;
  location?: string;
  bullets: string[];
  accent?: "era1" | "era2" | "era3" | "era4" | "era5" | "era6" | "era7";
  bgColor: string; // CSS color value for background transition
};

export const timeline: TimelineItem[] = [
  {
    id: "era1",
    title: "Early years",
    period: "Era 1",
    dateRange: "1990s - Early 2000s",
    location: "Tampa, FL",
    bullets: [
      "Family + community first, building with what was nearby.",
      "Soccer fields, sneaking into tech mags, curious about systems.",
      "Foundation of curiosity and connection."
    ],
    accent: "era1",
    bgColor: "rgba(45, 90, 61, 0.08)" // Subtle green
  },
  {
    id: "era2",
    title: "Nerd + soccer arc",
    period: "Era 2",
    dateRange: "Mid 2000s - 2010s",
    location: "Tampa, FL",
    bullets: [
      "Balanced competition on the pitch with intuition for math puzzles.",
      "First product: a club stats dashboard and lasting collaboration rituals.",
      "Learning to bridge physical and digital worlds."
    ],
    accent: "era2",
    bgColor: "rgba(165, 95, 45, 0.08)" // Subtle orange/activity
  },
  {
    id: "era3",
    title: "Tampa roots",
    period: "Era 3",
    dateRange: "2010s",
    location: "Tampa, FL",
    bullets: [
      "Deepening connections to place and people.",
      "Building systems that served real communities.",
      "Understanding the power of local context."
    ],
    accent: "era3",
    bgColor: "rgba(15, 61, 107, 0.08)" // Subtle blue/travel
  },
  {
    id: "era4",
    title: "Georgia Tech",
    period: "Era 4",
    dateRange: "2015 - 2020",
    location: "Atlanta, GA",
    bullets: [
      "Systems thinking shaped at the intersection of economics and data.",
      "Research assistantships + labs that obsessed over signal clarity.",
      "Econ + MS Analytics: learning to see patterns in complexity."
    ],
    accent: "era4",
    bgColor: "rgba(140, 99, 220, 0.08)" // Subtle purple/music
  },
  {
    id: "era5",
    title: "Startups + building",
    period: "Era 5",
    dateRange: "2020 - 2022",
    location: "Atlanta, GA",
    bullets: [
      "Product + growth experiments rooted in listening loops.",
      "Recall · Anchor · ReadTheField: documented every sprint for future founders.",
      "Learning to ship fast, learn faster."
    ],
    accent: "era5",
    bgColor: "rgba(45, 90, 61, 0.12)" // Slightly stronger green
  },
  {
    id: "era6",
    title: "VC/internships",
    period: "Era 6",
    dateRange: "2022 - 2024",
    location: "Atlanta, GA",
    bullets: [
      "Mapped founder journeys for strategic investing.",
      "Engage · Tech Square Ventures · Catalyst: translating messy signals into calm recommendations.",
      "Seeing the patterns in how great companies form."
    ],
    accent: "era6",
    bgColor: "rgba(15, 61, 107, 0.12)" // Slightly stronger blue
  },
  {
    id: "era7",
    title: "Now + where I'm going",
    period: "Era 7",
    dateRange: "2025 →",
    location: "Everywhere",
    bullets: [
      "Building teams where craft, data, and humanity coexist.",
      "Looking for rooms with real momentum—where I can steward clarity.",
      "The next chapter: writing it as we go."
    ],
    accent: "era7",
    bgColor: "rgba(140, 99, 220, 0.12)" // Slightly stronger purple
  }
];

