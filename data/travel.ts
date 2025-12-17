// TODO: Replace placeholder countries and galleries with the finalized travel history.
export type TravelCountry = {
  code: string;
  name: string;
  region: string;
  year: string;
  highlight: string;
  images: string[];
  coords: [number, number];
  states?: string[];
};

export const travelLog: TravelCountry[] = [
  {
    code: "USA",
    name: "United States",
    region: "Florida · Georgia · coasts",
    year: "2010 → 2025",
    highlight: "Family, craft, and early tech circuits.",
    images: ["/mock/travel_usa.svg", "/mock/tampa.svg"],
    coords: [120, 180],
    states: ["Florida", "Georgia", "Texas", "New Jersey", "New York", "California", "Washington DC", "Tennessee", "Louisiana"]
  },
  {
    code: "JPN",
    name: "Japan",
    region: "Tokyo · Fuji",
    year: "2019",
    highlight: "Clear lines, mountain treks, and precise craft.",
    images: ["/mock/travel_japan.svg"],
    coords: [500, 130]
  },
  {
    code: "PER",
    name: "Peru",
    region: "Machu Picchu",
    year: "2022",
    highlight: "Altitude, patience, and slow reveals.",
    images: ["/mock/travel_peru.svg"],
    coords: [340, 220]
  },
  {
    code: "EQU",
    name: "Ecuador",
    region: "Galápagos · Coastal",
    year: "2023",
    highlight: "Scuba, data dives, and reef patience.",
    images: ["/mock/travel_galapagos.svg"],
    coords: [310, 230]
  }
];

export const visitedCountries = [
  "United States of America",
  "Canada",
  "Mexico",
  "Peru",
  "Colombia",
  "United Kingdom",
  "France",
  "Germany",
  "Austria",
  "Czechia",
  "Italy",
  "Switzerland",
  "Belgium",
  "Luxembourg",
  "Spain",
  "Morocco",
  "United Arab Emirates",
  "India",
  "Thailand",
  "Japan",
  "Tanzania"
];

