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
    image: "/mock/instrument_bass.svg",
    badge: "Low vibrations"
  },
  {
    name: "Drumline",
    detail: "Percussion sync, cadence, and the discipline of ensembles.",
    image: "/mock/instrument_drum.svg",
    badge: "Cadence"
  },
  {
    name: "Dhol",
    detail: "Rhythms for celebrations; learning while building community.",
    image: "/mock/instrument_piano.svg",
    badge: "Ceremonial beats"
  },
  {
    name: "Piano (self-taught)",
    detail: "Quiet practice with layered motifs and patience for phrasing.",
    image: "/mock/music.svg",
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

