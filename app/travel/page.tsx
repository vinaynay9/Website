"use client";

import Image from "next/image";
import { useState } from "react";

import { MapSVG } from "@/components/MapSVG";
import { Modal } from "@/components/Modal";
import { SectionHeader } from "@/components/SectionHeader";
import { travelLog, type TravelCountry } from "@/data/travel";

export const metadata = {
  title: "Travel · Vinay",
  description: "Interactive map, country snapshots, and modal galleries from the road."
};

export default function TravelPage() {
  const [highlightedCountry, setHighlightedCountry] = useState<TravelCountry | null>(null);
  const [modalCountry, setModalCountry] = useState<TravelCountry | null>(null);

  const openModal = (country: TravelCountry) => {
    setHighlightedCountry(country);
    setModalCountry(country);
  };

  return (
    <section className="space-y-10">
      <SectionHeader
        eyebrow="Travel"
        title="Country log"
        description="Click a circle to open a framed reminder."
      />
      <MapSVG
        countries={travelLog}
        activeCode={highlightedCountry?.code ?? modalCountry?.code ?? undefined}
        onSelect={openModal}
      />
      <div className="space-y-5">
        {travelLog.map((country) => (
          <article
            key={country.code}
            className="flex flex-col gap-3 rounded-[20px] border border-border/60 bg-surface/80 p-5 shadow-soft"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.5em] text-muted">{country.year}</p>
                <h3 className="text-2xl font-semibold">{country.name}</h3>
              </div>
              <span className="text-xs uppercase tracking-[0.5em] text-accent">{country.region}</span>
            </div>
            <p className="text-sm text-muted">{country.highlight}</p>
            <button
              type="button"
              onClick={() => openModal(country)}
              className="self-start rounded-full border border-border/60 px-5 py-2 text-xs uppercase tracking-[0.4em]"
            >
              View gallery
            </button>
          </article>
        ))}
      </div>
      <Modal
        isOpen={Boolean(modalCountry)}
        onClose={() => setModalCountry(null)}
        title={modalCountry?.name ?? ""}
      >
        <p className="text-sm text-muted">{modalCountry?.highlight}</p>
        <div className="grid gap-4 sm:grid-cols-2">
          {modalCountry?.images.map((image, index) => (
            <div key={`${image}-${index}`} className="overflow-hidden rounded-[16px] border border-border/50">
              <Image
                src={image}
                alt={`${modalCountry?.name} ${index}`}
                width={420}
                height={280}
                className="h-40 w-full object-cover"
              />
            </div>
          ))}
        </div>
      </Modal>
    </section>
  );
}

