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
    image: "/mock/tampa.svg",
    route: "/timeline#tampa",
    highlights: ["Neighborhood rituals", "Soccer on local fields", "First hardware tinkerers"]
  },
  {
    id: "nerd-origin",
    title: "Nerd Origin Story",
    description: "Code, puzzles, and midnight experimentation fed the curiosity.",
    caption: "Curiosity",
    image: "/mock/gatech.svg",
    route: "/timeline#soccer-nerd",
    highlights: ["Early dashboards", "Math club notebooks", "Side projects for friends"]
  },
  {
    id: "soccer-energy",
    title: "Team Energy",
    description: "Soccer, intramurals, and the discipline to operate on a schedule.",
    caption: "Soccer",
    image: "/mock/soccer.svg",
    route: "/timeline#soccer-nerd",
    highlights: ["Competing with grit", "Leadership on the field", "Team rituals"]
  },
  {
    id: "georgia-tech",
    title: "Georgia Tech",
    description: "Systems thinking at the intersection of economics, data, and labs.",
    caption: "GT · MS Analytics",
    image: "/mock/startups.svg",
    route: "/timeline#georgia-tech",
    highlights: ["Research clarity", "Signal obsession", "Economics + analytics"]
  },
  {
    id: "startups",
    title: "Startup Builder Arc",
    description: "Recall, Anchor, ReadTheField — experiments with documentation rituals.",
    caption: "Startups",
    image: "/mock/travel.svg",
    route: "/projects",
    highlights: ["Product gists", "Growth + listening loops", "Runbooks for founders"]
  },
  {
    id: "internships",
    title: "VC · Innovation Internships",
    description: "Engage, Tech Square Ventures, Catalyst — turning chaos into calm due diligence.",
    caption: "VC / innovation",
    image: "/mock/vc.svg",
    route: "/timeline#internships",
    highlights: ["Founder journeys", "Research-based theses", "Data-backed conviction"]
  }
];

