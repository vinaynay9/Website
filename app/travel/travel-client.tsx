"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";

import { Modal } from "@/components/Modal";
import { ParallaxLayer } from "@/components/motion/ParallaxLayer";
import { ScrollScene } from "@/components/motion/ScrollScene";
import { SectionHeader } from "@/components/SectionHeader";
import { travelLog, type TravelCountry, visitedCountries } from "@/data/travel";

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

const GlobeDisplay = dynamic(
  () =>
    import("@/components/GlobeDisplay")
      .then((mod) => mod.GlobeDisplay)
      .catch((error) => {
        console.error("Globe failed to load", error);
        return () => <GlobeFallback message="Interactive globe coming soon" />;
      }),
  {
    ssr: false,
    loading: () => <GlobeFallback message="Loading globe…" />
  }
);

export default function TravelClient() {
  const [highlightedCountry, setHighlightedCountry] = useState<TravelCountry | null>(null);
  const [modalCountry, setModalCountry] = useState<TravelCountry | null>(null);

  const openModal = (country: TravelCountry | undefined) => {
    setHighlightedCountry(country ?? null);
    setModalCountry(country ?? null);
  };

  return (
    <div className="space-y-10 px-4 py-10">
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
              <GlobeDisplay
                visited={visitedCountries}
                onCountrySelect={(name) => {
                  const match = travelLog.find(
                    (country) => country.name.toLowerCase() === name.toLowerCase()
                  );
                  openModal(match ?? undefined);
                }}
              />
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
                <p className="text-xs uppercase tracking-[0.5em] text-muted">{country.year}</p>
                <h3 className="text-2xl font-semibold text-white">{country.name}</h3>
              </div>
              <span className="text-xs uppercase tracking-[0.5em] text-accent">{country.region}</span>
            </div>
            <p className="text-sm text-muted">{country.highlight}</p>
            <button
              type="button"
              onClick={() => openModal(country)}
              className="mt-4 self-start rounded-full border border-border/60 px-5 py-2 text-xs uppercase tracking-[0.4em]"
            >
              View gallery
            </button>
          </article>
        ))}
      </div>
      <Modal
        isOpen={Boolean(modalCountry)}
        onClose={() => setModalCountry(null)}
        title={modalCountry?.name ?? "Visited country"}
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

