"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { feature } from "topojson-client";
import type { FeatureCollection, GeometryObject, GeoJsonProperties } from "geojson";

import worldTopo from "world-atlas/countries-110m.json";
import { countryNameMap } from "@/data/travel";

// Dynamic import with error handling
const Globe = dynamic(() => import("react-globe.gl"), { 
  ssr: false,
  loading: () => null
});

type GlobeDisplayProps = {
  visited: string[];
  onCountrySelect: (name: string) => void;
};

type CountryFeature = {
  geometry: GeometryObject;
  properties: GeoJsonProperties & { name: string };
};

// WebGL detection utility
const checkWebGLSupport = (): boolean => {
  if (typeof window === "undefined") return false;
  
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    return !!gl;
  } catch (e) {
    return false;
  }
};

// Parse countries from topojson
const makeCountries = (): CountryFeature[] => {
  try {
    const geo = feature(
      worldTopo as any,
      (worldTopo as any).objects.countries
    ) as FeatureCollection;

    return geo.features.map((feature) => ({
      ...feature,
      properties: feature.properties ?? { name: "Unknown" }
    })) as CountryFeature[];
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Failed to parse globe topojson", error);
    }
    return [];
  }
};

export function GlobeDisplay({ visited, onCountrySelect }: GlobeDisplayProps) {
  const [webglSupported, setWebglSupported] = useState<boolean | null>(null);
  const [globeError, setGlobeError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Check WebGL support on mount
  useEffect(() => {
    setMounted(true);
    setWebglSupported(checkWebGLSupport());
  }, []);

  // Parse countries data
  const countries = useMemo(() => {
    try {
      return makeCountries();
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Failed to parse globe topojson", error);
      }
      return [];
    }
  }, []);

  // Create visited set with normalized names
  const visitedSet = useMemo(() => {
    const normalized = new Set<string>();
    visited.forEach((name) => {
      normalized.add(name.toLowerCase());
      // Also add mapped names
      const mapped = countryNameMap[name];
      if (mapped) {
        normalized.add(mapped.toLowerCase());
      }
    });
    return normalized;
  }, [visited]);

  const [hovered, setHovered] = useState<string | null>(null);

  // Not mounted yet
  if (!mounted) {
    return (
      <div className="globe-loading-panel flex min-h-[600px] items-center justify-center">
        <p className="text-sm uppercase tracking-[0.4em] text-muted">Loading globe…</p>
      </div>
    );
  }

  // WebGL not supported
  if (webglSupported === false) {
    return (
      <div className="globe-error-panel flex min-h-[600px] flex-col items-center justify-center space-y-4 rounded-lg border border-border/60 bg-surface/40 p-8">
        <p className="text-sm uppercase tracking-[0.4em] text-muted">Interactive globe</p>
        <h3 className="text-2xl font-semibold">WebGL not available</h3>
        <p className="text-xs text-muted text-center max-w-md">
          Your browser or device doesn't support WebGL, which is required for the interactive globe.
        </p>
        <div className="mt-6">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-muted">Visited countries:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {visited.map((country) => (
              <span 
                key={country} 
                className="rounded-full border border-border/60 px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-muted"
              >
                {countryNameMap[country] || country}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Countries data failed to load
  if (!countries.length) {
    return (
      <div className="globe-error-panel flex min-h-[600px] flex-col items-center justify-center space-y-4 rounded-lg border border-border/60 bg-surface/40 p-8">
        <p className="text-sm uppercase tracking-[0.4em] text-muted">Interactive globe</p>
        <h3 className="text-2xl font-semibold">Currently unavailable</h3>
        <p className="text-xs text-muted text-center max-w-md">
          Failed to load country data. Displaying a list of visited countries instead.
        </p>
        <div className="mt-6">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-muted">Visited countries:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {visited.map((country) => (
              <span 
                key={country} 
                className="rounded-full border border-border/60 px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-muted"
              >
                {countryNameMap[country] || country}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Globe error occurred
  if (globeError) {
    return (
      <div className="globe-error-panel flex min-h-[600px] flex-col items-center justify-center space-y-4 rounded-lg border border-border/60 bg-surface/40 p-8">
        <p className="text-sm uppercase tracking-[0.4em] text-muted">Interactive globe</p>
        <h3 className="text-2xl font-semibold">Error loading globe</h3>
        <p className="text-xs text-muted text-center max-w-md">{globeError}</p>
        <div className="mt-6">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-muted">Visited countries:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {visited.map((country) => (
              <span 
                key={country} 
                className="rounded-full border border-border/60 px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-muted"
              >
                {countryNameMap[country] || country}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Helper to check if country is visited
  const isVisited = (countryName: string | undefined): boolean => {
    if (!countryName) return false;
    const normalized = countryName.toLowerCase();
    return visitedSet.has(normalized);
  };

  // Helper to get display name for country
  const getDisplayName = (countryName: string | undefined): string => {
    if (!countryName) return "Unknown";
    return countryNameMap[countryName] || countryName;
  };

  return (
    <div className="globe-wrapper relative w-full" style={{ minHeight: "600px" }}>
      <Globe
        width={600}
        height={600}
        globeImageUrl={undefined}
        backgroundColor="transparent"
        globeGlowColor="rgba(255,255,255,0.1)"
        globeCloudsOpacity={0}
        polygonsData={countries}
        polygonCapColor={({ properties }) => {
          const name = properties?.name as string | undefined;
          return isVisited(name) ? "#7ee787" : "rgba(255,255,255,0.15)";
        }}
        polygonSideColor="rgba(0,0,0,0.1)"
        polygonStrokeColor="rgba(255,255,255,0.1)"
        polygonLabel={({ properties }) => {
          const name = properties?.name as string | undefined;
          return getDisplayName(name);
        }}
        polygonAltitude={({ properties }) => {
          const name = properties?.name as string | undefined;
          return isVisited(name) ? 0.03 : 0.005;
        }}
        polygonsTransitionDuration={300}
        onPolygonHover={(feature) => {
          if (feature?.properties?.name) {
            setHovered(getDisplayName(feature.properties.name as string));
          } else {
            setHovered(null);
          }
        }}
        onPolygonClick={(feature) => {
          if (feature?.properties?.name) {
            const name = feature.properties.name as string;
            const displayName = getDisplayName(name);
            // Pass the display name - travel-client will handle matching
            onCountrySelect(displayName);
          }
        }}
        pointOfView={{ lat: 30, lng: 0, altitude: 2 }}
        enableZoom={true}
        enablePointerInteraction={true}
        onGlobeReady={(globe) => {
          try {
            // Safely access controls - may not exist in all versions
            const controls = globe.controls();
            if (controls) {
              controls.autoRotate = true;
              controls.autoRotateSpeed = 0.25;
            }
          } catch (error) {
            // Controls API might not be available - this is fine
            if (process.env.NODE_ENV === "development") {
              console.warn("Could not set globe controls:", error);
            }
          }
        }}
      />
      {hovered && (
        <div className="globe-tooltip pointer-events-none absolute left-1/2 top-4 -translate-x-1/2 rounded-full border border-border/60 bg-surface/90 px-4 py-2 text-xs uppercase tracking-[0.3em] text-muted shadow-soft">
          {hovered}
        </div>
      )}
    </div>
  );
}
