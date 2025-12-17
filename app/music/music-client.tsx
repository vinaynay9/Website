"use client";

import { SectionHeader } from "@/components/SectionHeader";
import { MusicShelf } from "@/components/AlbumShelf";
import { DynamicHeading } from "@/components/DynamicHeading";
import { musicTypography } from "@/lib/typography";
import { musicShelves } from "@/data/music";

export default function MusicClient() {
  return (
    <div data-accent="music">
      <section 
        className="min-h-screen px-4 py-16 md:py-24"
        style={{
          background: "linear-gradient(180deg, #1f1826 0%, #15101a 30%, #0d0a10 70%, #07150D 100%)"
        }}
      >
      <div className="mx-auto max-w-7xl space-y-20">
        <div className="max-w-2xl space-y-4">
          <DynamicHeading
            profile={musicTypography.subheading!}
            as="p"
            className="text-xs uppercase text-muted/90"
          >
            Music
          </DynamicHeading>
          <DynamicHeading
            profile={musicTypography.heading}
            as="h1"
            className="text-4xl md:text-5xl"
            animate
          >
            The Shelf
          </DynamicHeading>
          <DynamicHeading
            profile={musicTypography.body}
            as="p"
            className="text-sm text-muted/90"
          >
            A curated collection of tracks that shape the soundtrack of my days. Each cover opens a world of sound.
          </DynamicHeading>
        </div>

        {/* Music shelves */}
        <div className="space-y-20 md:space-y-24">
          {musicShelves.map((shelf) => (
            <MusicShelf key={shelf.id} shelf={shelf} />
          ))}
        </div>
      </div>
    </section>
    </div>
  );
}

