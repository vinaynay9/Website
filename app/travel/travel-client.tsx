"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

import { Modal } from "@/components/Modal";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ParallaxLayer } from "@/components/motion/ParallaxLayer";
import { ScrollScene } from "@/components/motion/ScrollScene";
import { SectionHeader } from "@/components/SectionHeader";
import { DynamicHeading } from "@/components/DynamicHeading";
import { travelTypography, getNativeCountryName } from "@/lib/typography";
import { travelLog, type TravelCountry, visitedCountries, countryNameMap } from "@/data/travel";

const GlobeFallback = ({ message }: { message: string }) => (
  <div className="globe-fallback-panel">
    <p className="text-xs uppercase tracking-[0.4em] text-muted">Globe</p>
    <h3 className="text-2xl font-semibold">{message}</h3>
    <p className="text-[0.75rem] text-muted">Visited countries:</p>
    <div className="mt-3 flex flex-wrap justify-center gap-2 text-[0.55rem] uppercase tracking-[0.3em] text-muted">
      {visitedCountries.map((country) => (
        <span key={country} className="rounded-full border border-border/60 px-3 py-1">
          {country}
        </span>
      ))}
    </div>
  </div>
);

// Dynamically import GlobeClient - heavy Three.js/globe.gl bundle
// Loads only when needed (route-level) and client-side only
const GlobeClient = dynamic(
  () =>
    import("@/components/globe/GlobeClient")
      .then((mod) => mod.GlobeClient)
      .catch((error) => {
        if (process.env.NODE_ENV === "development") {
          console.error("Globe failed to load", error);
        }
        return () => <GlobeFallback message="Interactive globe coming soon" />;
      }),
  {
    ssr: false,
    loading: () => <GlobeFallback message="Loading globe…" />
  }
);

// Intersection observer wrapper to delay loading until globe is near viewport
function LazyGlobeClient({
  visited,
  countryNameMap,
  onCountrySelect,
  onCountryHover,
  onGlobeStateChange
}: {
  visited: string[];
  countryNameMap: Record<string, string>;
  onCountrySelect: (name: string, isVisited: boolean) => void;
  onCountryHover?: (name: string | null, isVisited: boolean) => void;
  onGlobeStateChange?: (state: { status: "loading" | "ready" | "error"; error?: string | null }) => void;
}) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect();
          }
        });
      },
      {
        // Start loading when globe container is 200px from viewport
        rootMargin: "200px"
      }
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Safety: load after a short delay even if IntersectionObserver fails
  useEffect(() => {
    if (shouldLoad) return;
    const timer = setTimeout(() => setShouldLoad(true), 1200);
    return () => clearTimeout(timer);
  }, [shouldLoad]);

  return (
    <div ref={containerRef} className="w-full">
      {shouldLoad ? (
        <GlobeClient
          visited={visited}
          countryNameMap={countryNameMap}
          onCountrySelect={onCountrySelect}
          onCountryHover={onCountryHover}
          onGlobeStateChange={onGlobeStateChange}
        />
      ) : (
        <GlobeFallback message="Loading globe…" />
      )}
    </div>
  );
}

// TODO: Consider extracting helper functions to lib/travel-helpers.ts
// Helper to find country in travel log by name (handles name variations)
const findCountryByName = (name: string): TravelCountry | undefined => {
  const normalized = name.toLowerCase();
  
  // Direct match
  let match = travelLog.find(
    (country) => country.name.toLowerCase() === normalized
  );
  
  if (match) return match;
  
  // Check if name matches a mapped value (e.g., "United States" from "United States of America")
  const mappedKey = Object.entries(countryNameMap).find(
    ([_, value]) => value.toLowerCase() === normalized
  )?.[0];
  
  if (mappedKey) {
    match = travelLog.find(
      (country) => country.name.toLowerCase() === mappedKey.toLowerCase()
    );
  }
  
  // Check reverse: if name is a key in countryNameMap, find by its value
  if (!match && countryNameMap[name]) {
    match = travelLog.find(
      (country) => country.name.toLowerCase() === countryNameMap[name].toLowerCase()
    );
  }
  
  return match;
};

export default function TravelClient() {
  const [modalCountry, setModalCountry] = useState<TravelCountry | null>(null);
  const [activeCountry, setActiveCountry] = useState<TravelCountry | null>(null);
  const [hoveredName, setHoveredName] = useState<string | null>(null);
  const [globeStatus, setGlobeStatus] = useState<"loading" | "ready" | "error">("loading");
  const [globeError, setGlobeError] = useState<string | null>(null);

  const openModal = (country: TravelCountry | undefined) => {
    setModalCountry(country ?? null);
  };

  const syncActiveCountry = (name: string | null, isVisited: boolean) => {
    setHoveredName(name);
    if (name && isVisited) {
      const match = findCountryByName(name);
      setActiveCountry(match ?? null);
    } else {
      setActiveCountry(null);
    }
  };

  return (
    <div data-accent="travel" className="space-y-10 px-4 py-10">
      <SectionHeader
        eyebrow="Travel"
        title="Country log"
        description="Drag the globe to explore the map, click a pin to open a note."
      />
      <ScrollScene minHeight="120vh">
        {() => (
          <div className="relative overflow-hidden rounded-[32px] border border-border/60 bg-surface/80 px-6 py-8 shadow-soft">
            <ParallaxLayer speed={18}>
              <p className="text-xs uppercase tracking-[0.5em] text-muted">Globe</p>
            </ParallaxLayer>
            <ParallaxLayer speed={14}>
              <ErrorBoundary
                fallback={<GlobeFallback message="Globe unavailable" />}
                onError={(error) => {
                  if (process.env.NODE_ENV === "development") {
                    console.error("[Travel] Globe error:", error);
                  }
                }}
              >
                <LazyGlobeClient
                  visited={visitedCountries}
                  countryNameMap={countryNameMap}
                  onCountrySelect={(name, isVisited) => {
                    syncActiveCountry(name, isVisited);
                    if (isVisited) openModal(findCountryByName(name));
                  }}
                  onCountryHover={syncActiveCountry}
                  onGlobeStateChange={({ status, error }) => {
                    setGlobeStatus(status);
                    setGlobeError(error ?? null);
                  }}
                />
              </ErrorBoundary>
            </ParallaxLayer>
            <ParallaxLayer speed={10}>
              <div className="mt-6 flex flex-col gap-2 text-sm text-muted">
                <p>Drag to rotate, click to unlock travel notes.</p>
                <p className="text-xs uppercase tracking-[0.3em] text-accent">
                  Globe status: {globeStatus === "ready" ? "Ready" : globeStatus === "error" ? "Issue" : "Loading"}
                  {globeError ? ` – ${globeError}` : ""}
                </p>
              </div>
            </ParallaxLayer>
          </div>
        )}
      </ScrollScene>
      <div className="rounded-[20px] border border-border/60 bg-surface/70 p-4 shadow-soft">
        <p className="text-xs uppercase tracking-[0.35em] text-muted">Country detail</p>
        {activeCountry ? (
          <div className="mt-3 space-y-1">
            <DynamicHeading profile={travelTypography.heading} as="h3" className="text-xl text-white">
              {activeCountry.name}
            </DynamicHeading>
            <p className="text-xs uppercase tracking-[0.25em] text-accent">{activeCountry.year}</p>
            <p className="text-sm text-muted">{activeCountry.highlight}</p>
          </div>
        ) : hoveredName ? (
          <p className="mt-3 text-sm text-muted/80">
            {hoveredName} is not in the travel log yet.
          </p>
        ) : (
          <p className="mt-3 text-sm text-muted/80">Hover a highlighted country to sync with the log.</p>
        )}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {travelLog.map((country) => (
          <article
            key={country.code}
            className={`relative overflow-hidden rounded-[20px] border bg-gradient-to-br from-[#0f1a2a] to-[#05090f] p-6 shadow-soft transition duration-150 ${
              activeCountry?.code === country.code
                ? "border-accent/70 shadow-[0_0_0_1px_rgba(56,189,248,0.3)]"
                : "border-border/60"
            } ${hoveredName && activeCountry?.code !== country.code ? "opacity-75" : ""}`}
            aria-live={activeCountry?.code === country.code ? "polite" : "off"}
          >
            <div className="absolute inset-0 opacity-30" aria-hidden />
            <div className="relative space-y-1">
              <DynamicHeading
                profile={travelTypography.heading}
                as="h3"
                className="text-2xl font-medium text-white"
              >
                {country.name}
              </DynamicHeading>
              {(() => {
                const native = getNativeCountryName(country.name);
                return native ? (
                  <DynamicHeading
                    profile={travelTypography.subheading!}
                    as="p"
                    className="text-sm italic text-muted/60"
                  >
                    {native.native}
                  </DynamicHeading>
                ) : null;
              })()}
              <DynamicHeading
                profile={travelTypography.subheading!}
                as="p"
                className="pt-2 text-xs uppercase tracking-[0.3em] text-muted"
              >
                {country.year}
              </DynamicHeading>
            </div>
          </article>
        ))}
      </div>
      <Modal
        isOpen={Boolean(modalCountry)}
        onClose={() => setModalCountry(null)}
        title={
          modalCountry ? (
            <div>
              <DynamicHeading profile={travelTypography.heading} as="span">
                {modalCountry.name}
              </DynamicHeading>
              {(() => {
                const native = getNativeCountryName(modalCountry.name);
                return native ? (
                  <DynamicHeading
                    profile={travelTypography.subheading!}
                    as="p"
                    className="text-sm text-muted/70 mt-1"
                  >
                    {native.native}
                  </DynamicHeading>
                ) : null;
              })()}
            </div>
          ) : (
            "Visited country"
          )
        }
      >
        <p className="text-sm text-muted">
          {modalCountry?.highlight ?? "Tap a highlighted country to see a placeholder note."}
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {(modalCountry?.images ?? ["/placeholders/blank-white.svg"]).map((image, index) => (
            <div key={`${image}-${index}`} className="overflow-hidden rounded-[16px] border border-border/50">
              <Image
                src={image}
                alt={`${modalCountry?.name ?? "Country"} ${index}`}
                width={420}
                height={280}
                className="h-40 w-full object-cover"
              />
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
}

