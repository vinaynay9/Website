export type ActivitySection = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  badge: string;
};

export const activitySections: ActivitySection[] = [
  {
    id: "sports",
    title: "Sports",
    subtitle: "Soccer · intramurals",
    description: "Energy, rituals, and the joy of winning with a vibe-filled team.",
    image: "https://images.unsplash.com/photo-1508830524289-0adcbe822b40?auto=format&fit=crop&w=900&q=80",
    badge: "Community energy"
  },
  {
    id: "hiking",
    title: "Hiking",
    subtitle: "Fuji · Kilimanjaro · Machu Picchu",
    description: "Altitude offers clarity, patience, and a reminder to pace builds.",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    badge: "High views"
  },
  {
    id: "scuba",
    title: "Scuba",
    subtitle: "Reef focus · calm breathing",
    description: "Weightless worlds teach me to pause and peek behind the obvious.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
    badge: "Deep calm"
  },
  {
    id: "gym",
    title: "Gym lifts",
    subtitle: "Strength routines + small wins",
    description: "Numbers and steady progress—tracking lifts mirrors product cadence.",
    image: "https://images.unsplash.com/photo-1518893065058-1d5a97c7d5f6?auto=format&fit=crop&w=900&q=80",
    badge: "Lifting focus"
  }
];

