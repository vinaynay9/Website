export type MusicInstrument = {
  name: string;
  detail: string;
  image: string;
  badge: string;
};

export type Playlist = {
  title: string;
  description: string;
  link: string;
};

export type MusicEntry = {
  title: string;
  note: string;
};

export const instruments: MusicInstrument[] = [
  {
    name: "Double bass",
    detail: "Classical sections + jazz combos when time allows.",
    image: "https://images.unsplash.com/photo-1470229538611-16ba8c7ffbd7?auto=format&fit=crop&w=900&q=80",
    badge: "Low vibrations"
  },
  {
    name: "Drumline",
    detail: "Percussion sync, cadence, and the discipline of ensembles.",
    image: "https://images.unsplash.com/photo-1454922912201-5b64fe5d6a1b?auto=format&fit=crop&w=900&q=80",
    badge: "Cadence"
  },
  {
    name: "Dhol",
    detail: "Rhythms for celebrations; learning while building community.",
    image: "https://images.unsplash.com/photo-1523917595241-5bb4c4b66b0f?auto=format&fit=crop&w=900&q=80",
    badge: "Ceremonial beats"
  },
  {
    name: "Piano (self-taught)",
    detail: "Quiet practice with layered motifs and patience for phrasing.",
    image: "https://images.unsplash.com/photo-1511376777868-611b54f68947?auto=format&fit=crop&w=900&q=80",
    badge: "Habit"
  }
];

// TODO: Replace the placeholder Spotify URLs with the live playlist links.
export const playlists: Playlist[] = [
  {
    title: "Top 50 focus set",
    description: "Lean beats for building sprints and deep work.",
    link: "https://open.spotify.com"
  },
  {
    title: "Listening notes",
    description: "Field recordings, jazz, and new releases I keep returning to.",
    link: "https://open.spotify.com"
  },
  {
    title: "Wrapped staples",
    description: "Year-end recap of what moved me and why it kept playing.",
    link: "https://open.spotify.com"
  }
];

export const musicals: MusicEntry[] = [
  { title: "Next to Normal", note: "Healing through layered score." },
  { title: "Hamilton", note: "Precision in language + rhythm." },
  { title: "Book of Mormon", note: "Comedy with an earnest pulse." }
];

