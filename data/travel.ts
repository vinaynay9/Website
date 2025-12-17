export type TravelCountry = {
  code: string;
  name: string;
  region: string;
  year: string;
  highlight: string;
  images: string[];
  coords: [number, number];
  states?: string[];
  cities?: string[];
};

// Comprehensive travel log with all visited countries
export const travelLog: TravelCountry[] = [
  {
    code: "USA",
    name: "United States",
    region: "Multiple states",
    year: "2010 → 2025",
    highlight: "Family, craft, and early tech circuits.",
    images: ["/mock/travel_usa.svg", "/mock/tampa.svg"],
    coords: [-95, 40],
    states: ["Florida", "Georgia", "Texas", "New Jersey", "New York", "California", "Washington DC", "Tennessee", "Louisiana"]
  },
  {
    code: "CAN",
    name: "Canada",
    region: "Multiple provinces",
    year: "Various",
    highlight: "Northern landscapes and diverse cities.",
    images: ["/placeholders/blank-white.svg"],
    coords: [-100, 60]
  },
  {
    code: "MEX",
    name: "Mexico",
    region: "Multiple regions",
    year: "Various",
    highlight: "Rich culture and vibrant landscapes.",
    images: ["/placeholders/blank-white.svg"],
    coords: [-102, 23]
  },
  {
    code: "PER",
    name: "Peru",
    region: "Machu Picchu",
    year: "2022",
    highlight: "Altitude, patience, and slow reveals.",
    images: ["/mock/travel_peru.svg"],
    coords: [-75, -10]
  },
  {
    code: "COL",
    name: "Colombia",
    region: "Multiple cities",
    year: "Various",
    highlight: "Diverse landscapes and culture.",
    images: ["/placeholders/blank-white.svg"],
    coords: [-74, 4]
  },
  {
    code: "GBR",
    name: "United Kingdom",
    region: "England",
    year: "Various",
    highlight: "Historic cities and countryside.",
    images: ["/placeholders/blank-white.svg"],
    coords: [-2, 54]
  },
  {
    code: "FRA",
    name: "France",
    region: "Multiple regions",
    year: "Various",
    highlight: "Art, culture, and cuisine.",
    images: ["/placeholders/blank-white.svg"],
    coords: [2, 46]
  },
  {
    code: "DEU",
    name: "Germany",
    region: "Multiple cities",
    year: "Various",
    highlight: "History and innovation.",
    images: ["/placeholders/blank-white.svg"],
    coords: [10, 51]
  },
  {
    code: "AUT",
    name: "Austria",
    region: "Alpine regions",
    year: "Various",
    highlight: "Mountain landscapes and culture.",
    images: ["/placeholders/blank-white.svg"],
    coords: [14, 47]
  },
  {
    code: "CZE",
    name: "Czech Republic",
    region: "Prague",
    year: "Various",
    highlight: "Historic architecture and culture.",
    images: ["/placeholders/blank-white.svg"],
    coords: [15, 50]
  },
  {
    code: "ITA",
    name: "Italy",
    region: "Multiple regions",
    year: "Various",
    highlight: "Art, history, and cuisine.",
    images: ["/placeholders/blank-white.svg"],
    coords: [12, 42]
  },
  {
    code: "CHE",
    name: "Switzerland",
    region: "Alpine regions",
    year: "Various",
    highlight: "Mountain peaks and precision.",
    images: ["/placeholders/blank-white.svg"],
    coords: [8, 47]
  },
  {
    code: "BEL",
    name: "Belgium",
    region: "Multiple cities",
    year: "Various",
    highlight: "Historic cities and culture.",
    images: ["/placeholders/blank-white.svg"],
    coords: [4, 50]
  },
  {
    code: "LUX",
    name: "Luxembourg",
    region: "Luxembourg City",
    year: "Various",
    highlight: "Small but significant.",
    images: ["/placeholders/blank-white.svg"],
    coords: [6, 50]
  },
  {
    code: "ESP",
    name: "Spain",
    region: "Multiple regions",
    year: "Various",
    highlight: "Diverse culture and landscapes.",
    images: ["/placeholders/blank-white.svg"],
    coords: [-3, 40]
  },
  {
    code: "MAR",
    name: "Morocco",
    region: "Multiple cities",
    year: "Various",
    highlight: "Rich history and culture.",
    images: ["/placeholders/blank-white.svg"],
    coords: [-7, 32]
  },
  {
    code: "ARE",
    name: "United Arab Emirates",
    region: "Dubai, Abu Dhabi",
    year: "Various",
    highlight: "Modern architecture and innovation.",
    images: ["/placeholders/blank-white.svg"],
    coords: [54, 24]
  },
  {
    code: "IND",
    name: "India",
    region: "Multiple states",
    year: "Various",
    highlight: "Diverse culture and heritage.",
    images: ["/placeholders/blank-white.svg"],
    coords: [77, 20]
  },
  {
    code: "THA",
    name: "Thailand",
    region: "Multiple regions",
    year: "Various",
    highlight: "Tropical landscapes and culture.",
    images: ["/placeholders/blank-white.svg"],
    coords: [101, 13]
  },
  {
    code: "JPN",
    name: "Japan",
    region: "Tokyo · Fuji",
    year: "2019",
    highlight: "Clear lines, mountain treks, and precise craft.",
    images: ["/mock/travel_japan.svg"],
    coords: [139, 36]
  },
  {
    code: "TZA",
    name: "Tanzania",
    region: "Safari regions",
    year: "Various",
    highlight: "Wildlife and natural beauty.",
    images: ["/placeholders/blank-white.svg"],
    coords: [35, -6]
  }
];

// Country names as they appear in world-atlas (for globe matching)
export const visitedCountries = [
  "United States of America", // Matches world-atlas name
  "Canada",
  "Mexico",
  "Peru",
  "Colombia",
  "United Kingdom",
  "France",
  "Germany",
  "Austria",
  "Czechia", // Note: world-atlas uses "Czechia" not "Czech Republic"
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

// Mapping from world-atlas country names to our travel log names
export const countryNameMap: Record<string, string> = {
  "United States of America": "United States",
  "Czechia": "Czech Republic",
  "United Kingdom": "England" // User refers to it as England
};

// Visited states/provinces by country (for future drill-down)
export const visitedStates: { country: string; states: string[] }[] = [
  {
    country: "United States",
    states: ["Florida", "Georgia", "Texas", "New Jersey", "New York", "California", "Washington DC", "Tennessee", "Louisiana"]
  },
  {
    country: "Canada",
    states: [] // To be populated
  },
  {
    country: "Mexico",
    states: [] // To be populated
  }
];

