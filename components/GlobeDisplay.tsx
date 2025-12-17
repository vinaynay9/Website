"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { feature } from "topojson-client";
import type { FeatureCollection, GeometryObject, GeoJsonProperties } from "geojson";

import worldTopo from "world-atlas/countries-110m.json";

const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

type GlobeDisplayProps = {
  visited: string[];
  onCountrySelect: (name: string) => void;
};

type CountryFeature = {
  geometry: GeometryObject;
  properties: GeoJsonProperties & { name: string };
};

const makeCountries = (): CountryFeature[] => {
  const geo = feature(
    worldTopo as any,
    (worldTopo as any).objects.countries
  ) as FeatureCollection;

  return geo.features.map((feature) => ({
    ...feature,
    properties: feature.properties ?? { name: "Unknown" }
  })) as CountryFeature[];
};

export function GlobeDisplay({ visited, onCountrySelect }: GlobeDisplayProps) {
  const countries = useMemo(() => {
    try {
      return makeCountries();
    } catch (error) {
      console.error("Failed to parse globe topojson", error);
      return [];
    }
  }, []);

  const visitedSet = useMemo(
    () => new Set(visited.map((name) => name.toLowerCase())),
    [visited]
  );
  const [hovered, setHovered] = useState<string | null>(null);

  if (!countries.length) {
    return (
      <div className="globe-error-panel">
        <p className="text-sm uppercase tracking-[0.4em] text-muted">Interactive globe</p>
        <h3 className="text-2xl font-semibold">Currently unavailable</h3>
        <p className="text-xs text-muted">
          Displaying a list of visited countries because the globe could not initialize.
        </p>
        <ul className="mt-4 grid gap-1 text-[0.65rem] uppercase leading-snug text-muted">
          {visited.map((country) => (
            <li key={country}>{country}</li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="globe-wrapper">
      <Globe
        width={600}
        height={600}
        globeImageUrl={undefined}
        backgroundColor="transparent"
        globeGlowColor="rgba(255,255,255,0.1)"
        globeCloudsOpacity={0}
        polygonsData={countries}
        polygonCapColor={({ properties }) =>
          visitedSet.has((properties.name ?? "").toLowerCase())
            ? "#7ee787"
            : "rgba(255,255,255,0.15)"
        }
        polygonSideColor="rgba(0,0,0,0.1)"
        polygonStrokeColor="rgba(255,255,255,0.1)"
        polygonLabel={({ properties }) => properties.name}
        polygonAltitude={({ properties }) =>
          visitedSet.has((properties.name ?? "").toLowerCase()) ? 0.03 : 0.005
        }
        polygonsTransitionDuration={300}
        onPolygonHover={(feature) => setHovered(feature.properties.name)}
        onPolygonClick={(feature) => {
          if (feature?.properties?.name) {
            onCountrySelect(feature.properties.name);
          }
        }}
        pointOfView={{ lat: 30, lng: 0, altitude: 2 }}
        enableZoom={true}
        enablePointerInteraction
        onGlobeReady={(globe) => {
          globe.controls().autoRotate = true;
          globe.controls().autoRotateSpeed = 0.25;
        }}
      />
      {hovered && <div className="globe-tooltip">{hovered}</div>}
    </div>
  );
}

