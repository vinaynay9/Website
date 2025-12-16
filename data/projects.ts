export type Project = {
  id: string;
  name: string;
  tagline: string;
  tags: string[];
  status: "building" | "shipped";
  cta: string;
  link: string;
};

export const projects: Project[] = [
  {
    id: "recall",
    name: "Recall",
    tagline: "Private knowledge + team memory built for fast-moving builders.",
    tags: ["knowledge", "spatial UX", "AI copilots"],
    status: "building",
    cta: "View build notes",
    link: "/projects#recall"
  },
  {
    id: "anchor",
    name: "Anchor",
    tagline: "A refined writer studio + editorial OS for product teams.",
    tags: ["publishing", "ops", "design systems"],
    status: "shipped",
    cta: "See launch highlights",
    link: "/projects#anchor"
  },
  {
    id: "read-the-field",
    name: "ReadTheField",
    tagline: "Signals, notes, and experiments for the modern research team.",
    tags: ["research", "systems", "data"],
    status: "building",
    cta: "Read the log",
    link: "/projects#read-the-field"
  }
];

