export type Album = {
  id: string;
  title: string;
  artist: string;
  coverImage: string;
  spotifyUrl: string;
  year?: number;
};

export type AlbumRow = {
  id: string;
  title?: string;
  albums: Album[];
};

// Stub data - will be replaced with real Spotify data later
export const albumRows: AlbumRow[] = [
  {
    id: "recent-favorites",
    title: "Recent Favorites",
    albums: [
      {
        id: "album-1",
        title: "Midnight Dreams",
        artist: "Luna Echo",
        coverImage: "/placeholders/this-website.svg",
        spotifyUrl: "https://open.spotify.com/album/placeholder-1",
        year: 2024
      },
      {
        id: "album-2",
        title: "Velvet Nights",
        artist: "The Purple Hour",
        coverImage: "/placeholders/this-website.svg",
        spotifyUrl: "https://open.spotify.com/album/placeholder-2",
        year: 2023
      },
      {
        id: "album-3",
        title: "Quiet Storm",
        artist: "Ambient Fields",
        coverImage: "/placeholders/this-website.svg",
        spotifyUrl: "https://open.spotify.com/album/placeholder-3",
        year: 2024
      },
      {
        id: "album-4",
        title: "Deep Resonance",
        artist: "Bass & Soul",
        coverImage: "/placeholders/this-website.svg",
        spotifyUrl: "https://open.spotify.com/album/placeholder-4",
        year: 2023
      },
      {
        id: "album-5",
        title: "Ethereal Waves",
        artist: "Synth Collective",
        coverImage: "/placeholders/this-website.svg",
        spotifyUrl: "https://open.spotify.com/album/placeholder-5",
        year: 2024
      },
      {
        id: "album-6",
        title: "Mood Indigo",
        artist: "Jazz Noir",
        coverImage: "/placeholders/this-website.svg",
        spotifyUrl: "https://open.spotify.com/album/placeholder-6",
        year: 2023
      }
    ]
  },
  {
    id: "classical-collection",
    title: "Classical Collection",
    albums: [
      {
        id: "album-7",
        title: "Symphony No. 9",
        artist: "Orchestra Moderna",
        coverImage: "/placeholders/this-website.svg",
        spotifyUrl: "https://open.spotify.com/album/placeholder-7",
        year: 2022
      },
      {
        id: "album-8",
        title: "Piano Sonatas",
        artist: "Elena Virtuoso",
        coverImage: "/placeholders/this-website.svg",
        spotifyUrl: "https://open.spotify.com/album/placeholder-8",
        year: 2023
      },
      {
        id: "album-9",
        title: "String Quartets",
        artist: "Quartet Aurora",
        coverImage: "/placeholders/this-website.svg",
        spotifyUrl: "https://open.spotify.com/album/placeholder-9",
        year: 2024
      },
      {
        id: "album-10",
        title: "Chamber Music",
        artist: "Ensemble Serenade",
        coverImage: "/placeholders/this-website.svg",
        spotifyUrl: "https://open.spotify.com/album/placeholder-10",
        year: 2023
      }
    ]
  },
  {
    id: "jazz-vibes",
    title: "Jazz Vibes",
    albums: [
      {
        id: "album-11",
        title: "Blue Notes",
        artist: "Saxophone Dreams",
        coverImage: "/placeholders/this-website.svg",
        spotifyUrl: "https://open.spotify.com/album/placeholder-11",
        year: 2024
      },
      {
        id: "album-12",
        title: "Late Night Sessions",
        artist: "The Trio",
        coverImage: "/placeholders/this-website.svg",
        spotifyUrl: "https://open.spotify.com/album/placeholder-12",
        year: 2023
      },
      {
        id: "album-13",
        title: "Smooth Grooves",
        artist: "Bass Line Collective",
        coverImage: "/placeholders/this-website.svg",
        spotifyUrl: "https://open.spotify.com/album/placeholder-13",
        year: 2024
      },
      {
        id: "album-14",
        title: "Improvisations",
        artist: "Free Form Jazz",
        coverImage: "/placeholders/this-website.svg",
        spotifyUrl: "https://open.spotify.com/album/placeholder-14",
        year: 2023
      },
      {
        id: "album-15",
        title: "Vintage Vinyl",
        artist: "Retro Swing",
        coverImage: "/placeholders/this-website.svg",
        spotifyUrl: "https://open.spotify.com/album/placeholder-15",
        year: 2022
      }
    ]
  }
];

