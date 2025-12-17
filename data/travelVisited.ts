/**
 * Visited Countries Data
 * 
 * Single source of truth for countries that have been visited.
 * Used by the globe component to highlight visited countries.
 * 
 * Structure:
 * - ISO code (ISO-3166 alpha-3)
 * - name: Display name
 * - nativeName: Optional native name
 * - visited: Always true (for consistency)
 * - worldAtlasName: Name as it appears in world-atlas topojson (for matching)
 */

export type VisitedCountry = {
  code: string; // ISO-3166 alpha-3 code
  name: string;
  nativeName?: string;
  visited: true;
  worldAtlasName: string; // Name as it appears in world-atlas
};

export const visitedCountriesData: VisitedCountry[] = [
  {
    code: "USA",
    name: "United States",
    nativeName: "United States of America",
    visited: true,
    worldAtlasName: "United States of America"
  },
  {
    code: "CAN",
    name: "Canada",
    visited: true,
    worldAtlasName: "Canada"
  },
  {
    code: "MEX",
    name: "Mexico",
    nativeName: "México",
    visited: true,
    worldAtlasName: "Mexico"
  },
  {
    code: "PER",
    name: "Peru",
    nativeName: "Perú",
    visited: true,
    worldAtlasName: "Peru"
  },
  {
    code: "COL",
    name: "Colombia",
    visited: true,
    worldAtlasName: "Colombia"
  },
  {
    code: "GBR",
    name: "United Kingdom",
    nativeName: "United Kingdom",
    visited: true,
    worldAtlasName: "United Kingdom"
  },
  {
    code: "FRA",
    name: "France",
    nativeName: "France",
    visited: true,
    worldAtlasName: "France"
  },
  {
    code: "DEU",
    name: "Germany",
    nativeName: "Deutschland",
    visited: true,
    worldAtlasName: "Germany"
  },
  {
    code: "AUT",
    name: "Austria",
    nativeName: "Österreich",
    visited: true,
    worldAtlasName: "Austria"
  },
  {
    code: "CZE",
    name: "Czech Republic",
    nativeName: "Česká republika",
    visited: true,
    worldAtlasName: "Czechia" // Note: world-atlas uses "Czechia"
  },
  {
    code: "ITA",
    name: "Italy",
    nativeName: "Italia",
    visited: true,
    worldAtlasName: "Italy"
  },
  {
    code: "CHE",
    name: "Switzerland",
    nativeName: "Schweiz",
    visited: true,
    worldAtlasName: "Switzerland"
  },
  {
    code: "BEL",
    name: "Belgium",
    nativeName: "België",
    visited: true,
    worldAtlasName: "Belgium"
  },
  {
    code: "LUX",
    name: "Luxembourg",
    nativeName: "Luxembourg",
    visited: true,
    worldAtlasName: "Luxembourg"
  },
  {
    code: "ESP",
    name: "Spain",
    nativeName: "España",
    visited: true,
    worldAtlasName: "Spain"
  },
  {
    code: "MAR",
    name: "Morocco",
    nativeName: "المغرب",
    visited: true,
    worldAtlasName: "Morocco"
  },
  {
    code: "ARE",
    name: "United Arab Emirates",
    nativeName: "الإمارات العربية المتحدة",
    visited: true,
    worldAtlasName: "United Arab Emirates"
  },
  {
    code: "IND",
    name: "India",
    nativeName: "भारत",
    visited: true,
    worldAtlasName: "India"
  },
  {
    code: "THA",
    name: "Thailand",
    nativeName: "ประเทศไทย",
    visited: true,
    worldAtlasName: "Thailand"
  },
  {
    code: "JPN",
    name: "Japan",
    nativeName: "日本",
    visited: true,
    worldAtlasName: "Japan"
  },
  {
    code: "TZA",
    name: "Tanzania",
    nativeName: "Tanzania",
    visited: true,
    worldAtlasName: "Tanzania"
  }
];

// Export array of world-atlas names for easy use in globe component
export const visitedCountryNames = visitedCountriesData.map(c => c.worldAtlasName);

// Export mapping from world-atlas names to display names
export const visitedCountryNameMap: Record<string, string> = visitedCountriesData.reduce((acc, country) => {
  acc[country.worldAtlasName] = country.name;
  return acc;
}, {} as Record<string, string>);

