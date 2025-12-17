"use client";

import Image from "next/image";
import { useState } from "react";
import { useCursor } from "./CursorProvider";
import { DynamicHeading } from "./DynamicHeading";
import { musicTypography } from "@/lib/typography";
import type { MusicTrack, MusicShelf } from "@/data/music";

type TrackCardProps = {
  track: MusicTrack;
  index: number;
};

function TrackCard({ track, index }: TrackCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { setCursorType } = useCursor();

  const handleMouseEnter = () => {
    setIsHovered(true);
    setCursorType("link");
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCursorType("default");
  };

  // Subtle tilt for each track (between -5 and 5 degrees) for natural shelf feel
  const tilt = (index % 7) * 1.5 - 4.5;

  return (
    <div className="relative mb-20 flex-shrink-0">
      <a
        href={track.spotifyUrl}
        target="_blank"
        rel="noreferrer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group relative block w-[180px] transition-all duration-500 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-roseLavender focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-lg"
        style={{
          transform: isHovered
            ? `translateY(-24px) rotate(${tilt}deg) scale(1.05)`
            : `rotate(${tilt}deg)`,
          transformStyle: "preserve-3d",
          perspective: "1000px"
        }}
      >
        {/* Track cover with 3D depth */}
        <div
          className="relative overflow-hidden rounded-lg shadow-2xl transition-all duration-500"
          style={{
            transform: isHovered ? "translateZ(20px)" : "translateZ(0px)",
            boxShadow: isHovered
              ? "0 24px 48px var(--color-rose-lavender-glow), 0 8px 16px rgba(0, 0, 0, 0.3), 0 0 0 1px var(--color-rose-lavender), 0 0 20px var(--color-rose-lavender-glow)"
              : "0 8px 24px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(107, 90, 122, 0.2)"
          }}
        >
          <div className="relative aspect-square w-full">
            <Image
              src={track.coverImage}
              alt={`${track.title} by ${track.artist}`}
              fill
              sizes="180px"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* Overlay gradient on hover */}
            <div
              className={`absolute inset-0 bg-gradient-to-t from-lavenderDark/80 via-transparent to-transparent transition-opacity duration-500 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
        </div>

        {/* Track name/Artist text overlay on hover */}
        <div
          className={`absolute -bottom-14 left-1/2 -translate-x-1/2 whitespace-nowrap transition-all duration-500 ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          <div className="rounded-full bg-lavenderBase/90 backdrop-blur-sm px-4 py-2 border border-lavenderSoft/30">
            <p className="text-sm font-medium text-white">{track.title}</p>
            <p className="text-xs text-lavenderLight mt-0.5">{track.artist}</p>
          </div>
        </div>
      </a>
    </div>
  );
}

type MusicShelfProps = {
  shelf: MusicShelf;
};

export function MusicShelf({ shelf }: MusicShelfProps) {
  return (
    <div className="space-y-6">
      {/* Shelf header with title and description */}
      <div className="space-y-2">
        <DynamicHeading
          profile={musicTypography.accent!}
          as="h3"
          className="text-lg text-lavenderLight"
        >
          {shelf.title}
        </DynamicHeading>
        {shelf.description && (
          <DynamicHeading
            profile={musicTypography.body}
            as="p"
            className="text-sm text-lavenderLight/70 max-w-2xl"
          >
            {shelf.description}
          </DynamicHeading>
        )}
      </div>

      {/* Horizontal scrollable shelf - swipeable on mobile */}
      <div className="overflow-x-auto overflow-y-visible pb-4 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
        <div className="flex gap-8 md:gap-10">
          {shelf.tracks.map((track, index) => (
            <TrackCard key={track.id} track={track} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

