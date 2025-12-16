export type TimelineItem = {
  id: string;
  title: string;
  period: string;
  location?: string;
  bullets: string[];
  accent?: "tampa" | "gt" | "startups" | "internships" | "present";
};

export const timeline: TimelineItem[] = [
  {
    id: "tampa",
    title: "Tampa origins",
    period: "early years",
    location: "Florida",
    bullets: [
      "Family + community first, building with what was nearby.",
      "Soccer fields, sneaking into tech mags, curious about systems."
    ],
    accent: "tampa"
  },
  {
    id: "soccer-nerd",
    title: "Soccer + nerd era",
    period: "teenage build cycle",
    bullets: [
      "Balanced competition on the pitch with intuition for math puzzles.",
      "First product: a club stats dashboard and lasting collaboration rituals."
    ],
    accent: "gt"
  },
  {
    id: "georgia-tech",
    title: "Georgia Tech",
    period: "Econ + MS Analytics",
    location: "Atlanta",
    bullets: [
      "Systems thinking shaped at the intersection of economics and data.",
      "Research assistantships + labs that obsessed over signal clarity."
    ],
    accent: "gt"
  },
  {
    id: "startups",
    title: "Startup builder arc",
    period: "Recall · Anchor · ReadTheField",
    bullets: [
      "Product + growth experiments rooted in listening loops.",
      "Documented every sprint for future founders."
    ],
    accent: "startups"
  },
  {
    id: "internships",
    title: "VC & Innovation internships",
    period: "Engage · Tech Square Ventures · Catalyst",
    bullets: [
      "Mapped founder journeys for strategic investing.",
      "Loved translating messy signals into calm recommendations."
    ],
    accent: "internships"
  },
  {
    id: "present",
    title: "Now + next",
    period: "2025 →",
    bullets: [
      "Building teams where craft, data, and humanity coexist.",
      "Looking for rooms with real momentum—where I can steward clarity."
    ],
    accent: "present"
  }
];

