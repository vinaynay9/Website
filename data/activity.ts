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
    image: "/mock/activity/sports_1.svg",
    badge: "Community energy"
  },
  {
    id: "hiking",
    title: "Hiking",
    subtitle: "Fuji · Kilimanjaro · Machu Picchu",
    description: "Altitude offers clarity, patience, and a reminder to pace builds.",
    image: "/mock/activity/hiking_1.svg",
    badge: "High views"
  },
  {
    id: "scuba",
    title: "Scuba",
    subtitle: "Reef focus · calm breathing",
    description: "Weightless worlds teach me to pause and peek behind the obvious.",
    image: "/mock/activity/scuba_1.svg",
    badge: "Deep calm"
  },
  {
    id: "gym",
    title: "Gym lifts",
    subtitle: "Strength routines + small wins",
    description: "Numbers and steady progress—tracking lifts mirrors product cadence.",
    image: "/mock/activity/sports_2.svg",
    badge: "Lifting focus"
  }
];

