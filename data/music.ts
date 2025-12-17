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

// Music shelf data model
export type MusicTrack = {
  id: string;
  title: string;
  artist: string;
  coverImage: string;
  spotifyUrl: string;
};

export type MusicShelf = {
  id: string;
  title: string;
  description: string;
  tracks: MusicTrack[];
};

// Placeholder data for music shelves - replace with real data later
export const musicShelves: MusicShelf[] = [
  {
    id: "all-time-top",
    title: "All-time top songs",
    description: "The tracks that have shaped my musical journey and continue to resonate.",
    tracks: [
      {
        id: "MUSIC_ALLTIME_01",
        title: "Track Title 01",
        artist: "Artist Name 01",
        coverImage: "/placeholders/this-website.svg",
        spotifyUrl: "https://open.spotify.com/track/placeholder-01"
      },
      {
        id: "MUSIC_ALLTIME_02",
        title: "Track Title 02",
        artist: "Artist Name 02",
        coverImage: "/placeholders/this-website.svg",
        spotifyUrl: "https://open.spotify.com/track/placeholder-02"
      },
      {
        id: "MUSIC_ALLTIME_03",
        title: "Track Title 03",
        artist: "Artist Name 03",
        coverImage: "/placeholders/this-website.svg",
        spotifyUrl: "https://open.spotify.com/track/placeholder-03"
      },
      {
        id: "MUSIC_ALLTIME_04",
        title: "Track Title 04",
        artist: "Artist Name 04",
        coverImage: "/placeholders/this-website.svg",
        spotifyUrl: "https://open.spotify.com/track/placeholder-04"
      },
      {
        id: "MUSIC_ALLTIME_05",
        title: "Track Title 05",
        artist: "Artist Name 05",
        coverImage: "/placeholders/this-website.svg",
        spotifyUrl: "https://open.spotify.com/track/placeholder-05"
      },
      {
        id: "MUSIC_ALLTIME_06",
        title: "Track Title 06",
        artist: "Artist Name 06",
        coverImage: "/placeholders/this-website.svg",
        spotifyUrl: "https://open.spotify.com/track/placeholder-06"
      }
    ]
  },
  {
    id: "past-month",
    title: "Past month most listened",
    description: "What's been on repeat lately—the soundtrack of recent days.",
    tracks: [
      {
        id: "MUSIC_MONTH_01",
        title: "Track Title 01",
        artist: "Artist Name 01",
        coverImage: "/placeholders/this-website.svg",
        spotifyUrl: "https://open.spotify.com/track/placeholder-01"
      },
      {
        id: "MUSIC_MONTH_02",
        title: "Track Title 02",
        artist: "Artist Name 02",
        coverImage: "/placeholders/this-website.svg",
        spotifyUrl: "https://open.spotify.com/track/placeholder-02"
      },
      {
        id: "MUSIC_MONTH_03",
        title: "Track Title 03",
        artist: "Artist Name 03",
        coverImage: "/placeholders/this-website.svg",
        spotifyUrl: "https://open.spotify.com/track/placeholder-03"
      },
      {
        id: "MUSIC_MONTH_04",
        title: "Track Title 04",
        artist: "Artist Name 04",
        coverImage: "/placeholders/this-website.svg",
        spotifyUrl: "https://open.spotify.com/track/placeholder-04"
      },
      {
        id: "MUSIC_MONTH_05",
        title: "Track Title 05",
        artist: "Artist Name 05",
        coverImage: "/placeholders/this-website.svg",
        spotifyUrl: "https://open.spotify.com/track/placeholder-05"
      },
      {
        id: "MUSIC_MONTH_06",
        title: "Track Title 06",
        artist: "Artist Name 06",
        coverImage: "/placeholders/this-website.svg",
        spotifyUrl: "https://open.spotify.com/track/placeholder-06"
      }
    ]
  },
  {
    id: "favorite-genre",
    title: "Favorite recent genre",
    description: "Exploring new sounds—top picks from a genre I've been diving into.",
    tracks: [
      {
        id: "MUSIC_GENRE_01",
        title: "Track Title 01",
        artist: "Artist Name 01",
        coverImage: "/placeholders/this-website.svg",
        spotifyUrl: "https://open.spotify.com/track/placeholder-01"
      },
      {
        id: "MUSIC_GENRE_02",
        title: "Track Title 02",
        artist: "Artist Name 02",
        coverImage: "/placeholders/this-website.svg",
        spotifyUrl: "https://open.spotify.com/track/placeholder-02"
      },
      {
        id: "MUSIC_GENRE_03",
        title: "Track Title 03",
        artist: "Artist Name 03",
        coverImage: "/placeholders/this-website.svg",
        spotifyUrl: "https://open.spotify.com/track/placeholder-03"
      },
      {
        id: "MUSIC_GENRE_04",
        title: "Track Title 04",
        artist: "Artist Name 04",
        coverImage: "/placeholders/this-website.svg",
        spotifyUrl: "https://open.spotify.com/track/placeholder-04"
      },
      {
        id: "MUSIC_GENRE_05",
        title: "Track Title 05",
        artist: "Artist Name 05",
        coverImage: "/placeholders/this-website.svg",
        spotifyUrl: "https://open.spotify.com/track/placeholder-05"
      }
    ]
  }
];

