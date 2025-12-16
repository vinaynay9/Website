// TODO: Replace placeholder countries and galleries with the finalized travel history.
export type TravelCountry = {
  code: string;
  name: string;
  region: string;
  year: string;
  highlight: string;
  images: string[];
  coords: [number, number];
};

export const travelLog: TravelCountry[] = [
  {
    code: "USA",
    name: "United States",
    region: "East coast · Tampa / Atlanta",
    year: "2010 → 2025",
    highlight: "Family, craft, and early tech circuits.",
    images: [
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=900&q=80"
    ],
    coords: [120, 180]
  },
  {
    code: "JPN",
    name: "Japan",
    region: "Tokyo · Fuji",
    year: "2019",
    highlight: "Clear lines, mountain treks, and precise craft.",
    images: [
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=900&q=80"
    ],
    coords: [500, 130]
  },
  {
    code: "PER",
    name: "Peru",
    region: "Machu Picchu",
    year: "2022",
    highlight: "Altitude, patience, and slow reveals.",
    images: [
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80"
    ],
    coords: [340, 220]
  },
  {
    code: "EQU",
    name: "Ecuador",
    region: "Galápagos · Coastal",
    year: "2023",
    highlight: "Scuba, data dives, and reef patience.",
    images: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80"
    ],
    coords: [310, 230]
  }
];

