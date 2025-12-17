"use client";

import { SectionHeader } from "@/components/SectionHeader";
import { AlbumShelf } from "@/components/AlbumShelf";
import { albumRows } from "@/data/albums";

export default function MusicClient() {
  return (
    <section 
      className="min-h-screen px-4 py-16 md:py-24"
      style={{
        background: "linear-gradient(180deg, #1f1826 0%, #15101a 30%, #0d0a10 70%, #000000 100%)"
      }}
    >
      <div className="mx-auto max-w-7xl space-y-20">
        <SectionHeader
          eyebrow="Music"
          title="The Shelf"
          description="A curated collection of albums that shape the soundtrack of my days. Each cover opens a world of sound."
        />

        {/* Album shelves */}
        <div className="space-y-20 md:space-y-24">
          {albumRows.map((row) => (
            <AlbumShelf key={row.id} row={row} />
          ))}
        </div>

        {/* Subtle footer note */}
        <div className="pt-12 border-t border-lavenderMuted/30">
          <p className="text-xs text-lavenderLight/50 text-center uppercase tracking-[0.3em]">
            More shelves coming soon
          </p>
        </div>
      </div>
    </section>
  );
}

