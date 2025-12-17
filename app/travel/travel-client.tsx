"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";

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
  const [highlightedCountry, setHighlightedCountry] = useState<TravelCountry | null>(null);
  const [modalCountry, setModalCountry] = useState<TravelCountry | null>(null);

  const openModal = (country: TravelCountry | undefined) => {
    setHighlightedCountry(country ?? null);
    setModalCountry(country ?? null);
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
                <GlobeClient
                  visited={visitedCountries}
                  countryNameMap={countryNameMap}
                  onCountrySelect={(name, isVisited) => {
                    // Log country name in dev only
                    if (process.env.NODE_ENV === "development") {
                      console.log("Country selected:", name, "Visited:", isVisited);
                    }
                    
                    // If visited, find and open modal
                    if (isVisited) {
                      const match = findCountryByName(name);
                      openModal(match);
                    }
                  }}
                />
              </ErrorBoundary>
            </ParallaxLayer>
            <ParallaxLayer speed={10}>
              <p className="mt-6 text-sm text-muted">Drag to rotate, click to unlock travel notes.</p>
            </ParallaxLayer>
          </div>
        )}
      </ScrollScene>
      <div className="grid gap-4 md:grid-cols-2">
        {travelLog.map((country) => (
          <article
            key={country.code}
            className="relative overflow-hidden rounded-[20px] border border-border/60 bg-gradient-to-br from-[#0f1a2a] to-[#05090f] p-5 shadow-soft"
          >
            <div className="absolute inset-0 opacity-30" aria-hidden />
            <div className="flex items-center justify-between">
              <div>
                <DynamicHeading
                  profile={travelTypography.subheading!}
                  as="p"
                  className="text-xs text-muted"
                >
                  {country.year}
                </DynamicHeading>
                <DynamicHeading
                  profile={travelTypography.heading}
                  as="h3"
                  className="text-2xl text-white"
                >
                  {country.name}
                </DynamicHeading>
                {(() => {
                  const native = getNativeCountryName(country.name);
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
              <DynamicHeading
                profile={travelTypography.subheading!}
                as="span"
                className="text-xs text-accent"
              >
                {country.region}
              </DynamicHeading>
            </div>
            <p className="text-sm text-muted">{country.highlight}</p>
            <button
              type="button"
              onClick={() => openModal(country)}
              className="accent-hover mt-4 self-start rounded-full border border-border/60 px-5 py-2 text-xs uppercase tracking-[0.4em] transition-all duration-300 hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              View gallery
            </button>
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

