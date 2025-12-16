// TODO: Replace placeholder imagery, copy, and highlights with the final narratives or shots.
export type HomePanel = {
  id: string;
  title: string;
  description: string;
  caption: string;
  image: string;
  route: string;
  highlights: string[];
};

export const homePanels: HomePanel[] = [
  {
    id: "tampa-roots",
    title: "Tampa Roots",
    description: "Community, family, and curious afternoons in a humid Florida heat.",
    caption: "Family / community",
    image:
      "https://images.unsplash.com/photo-1445510861639-0f5c3042a1b4?auto=format&fit=crop&w=900&q=80",
    route: "/timeline#tampa",
    highlights: ["Neighborhood rituals", "Soccer on local fields", "First hardware tinkerers"]
  },
  {
    id: "nerd-origin",
    title: "Nerd Origin Story",
    description: "Code, puzzles, and midnight experimentation fed the curiosity.",
    caption: "Curiosity",
    image:
      "https://images.unsplash.com/photo-1485217988980-11786ced9454?auto=format&fit=crop&w=900&q=80",
    route: "/timeline#soccer-nerd",
    highlights: ["Early dashboards", "Math club notebooks", "Side projects for friends"]
  },
  {
    id: "soccer-energy",
    title: "Team Energy",
    description: "Soccer, intramurals, and the discipline to operate on a schedule.",
    caption: "Soccer",
    image:
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=900&q=80",
    route: "/timeline#soccer-nerd",
    highlights: ["Competing with grit", "Leadership on the field", "Team rituals"]
  },
  {
    id: "georgia-tech",
    title: "Georgia Tech",
    description: "Systems thinking at the intersection of economics, data, and labs.",
    caption: "GT · MS Analytics",
    image:
      "https://images.unsplash.com/photo-1430185819558-4c4cfa6dffc0?auto=format&fit=crop&w=900&q=80",
    route: "/timeline#georgia-tech",
    highlights: ["Research clarity", "Signal obsession", "Economics + analytics"]
  },
  {
    id: "startups",
    title: "Startup Builder Arc",
    description: "Recall, Anchor, ReadTheField — experiments with documentation rituals.",
    caption: "Startups",
    image:
      "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=900&q=80",
    route: "/projects",
    highlights: ["Product gists", "Growth + listening loops", "Runbooks for founders"]
  },
  {
    id: "internships",
    title: "VC · Innovation Internships",
    description: "Engage, Tech Square Ventures, Catalyst — turning chaos into calm due diligence.",
    caption: "VC / innovation",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80",
    route: "/timeline#internships",
    highlights: ["Founder journeys", "Research-based theses", "Data-backed conviction"]
  }
];

