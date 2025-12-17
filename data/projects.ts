export type Project = {
  id: string;
  name: string;
  subtitle: string;
  bullets: [string, string];
  previewImage: string;
  status: "building" | "shipped";
  link: string;
};

export const projects: Project[] = [
  {
    id: "this-website",
    name: "This Website",
    subtitle: "A personal portfolio built with Next.js and thoughtful motion design.",
    bullets: [
      "Custom cursor interactions and scroll-based theme transitions",
      "Responsive layouts with parallax effects and smooth animations"
    ],
    previewImage: "/placeholders/this-website.svg",
    status: "shipped",
    link: "/projects#this-website"
  },
  {
    id: "read-the-field",
    name: "ReadTheField",
    subtitle: "Signals, notes, and experiments for the modern research team.",
    bullets: [
      "Research workflow optimization with intelligent signal detection",
      "Collaborative note-taking system with experiment tracking"
    ],
    previewImage: "/placeholders/read-the-field.svg",
    status: "building",
    link: "/projects#read-the-field"
  },
  {
    id: "anchor",
    name: "Anchor",
    subtitle: "A refined writer studio + editorial OS for product teams.",
    bullets: [
      "Editorial workflow management with design system integration",
      "Publishing pipeline automation for product documentation"
    ],
    previewImage: "/placeholders/anchor.svg",
    status: "shipped",
    link: "/projects#anchor"
  }
];

