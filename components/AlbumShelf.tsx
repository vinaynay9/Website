"use client";

import Image from "next/image";
import { useState } from "react";
import { useCursor } from "./CursorProvider";
import type { Album, AlbumRow } from "@/data/albums";

type AlbumCardProps = {
  album: Album;
  index: number;
};

function AlbumCard({ album, index }: AlbumCardProps) {
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

  // Subtle tilt for each album (between -5 and 5 degrees) for natural shelf feel
  const tilt = (index % 7) * 1.5 - 4.5;

  return (
    <div className="relative mb-20">
      <a
        href={album.spotifyUrl}
        target="_blank"
        rel="noreferrer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group relative block w-[180px] transition-all duration-500 ease-out"
        style={{
          transform: isHovered
            ? `translateY(-24px) rotate(${tilt}deg) scale(1.05)`
            : `rotate(${tilt}deg)`,
          transformStyle: "preserve-3d",
          perspective: "1000px"
        }}
      >
        {/* Album cover with 3D depth */}
        <div
          className="relative overflow-hidden rounded-lg shadow-2xl transition-all duration-500"
          style={{
            transform: isHovered ? "translateZ(20px)" : "translateZ(0px)",
            boxShadow: isHovered
              ? "0 24px 48px rgba(107, 90, 122, 0.4), 0 8px 16px rgba(0, 0, 0, 0.3)"
              : "0 8px 24px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(107, 90, 122, 0.2)"
          }}
        >
          <div className="relative aspect-square w-full">
            <Image
              src={album.coverImage}
              alt={`${album.title} by ${album.artist}`}
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

        {/* Song/Artist text overlay on hover */}
        <div
          className={`absolute -bottom-14 left-1/2 -translate-x-1/2 whitespace-nowrap transition-all duration-500 ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          <div className="rounded-full bg-lavenderBase/90 backdrop-blur-sm px-4 py-2 border border-lavenderSoft/30">
            <p className="text-sm font-medium text-white">{album.title}</p>
            <p className="text-xs text-lavenderLight mt-0.5">{album.artist}</p>
          </div>
        </div>
      </a>
    </div>
  );
}

type AlbumShelfProps = {
  row: AlbumRow;
};

export function AlbumShelf({ row }: AlbumShelfProps) {
  return (
    <div className="space-y-10">
      {row.title && (
        <h3 className="text-sm uppercase tracking-[0.5em] text-lavenderLight/70 font-medium">
          {row.title}
        </h3>
      )}
      <div className="flex flex-wrap gap-8 md:gap-10">
        {row.albums.map((album, index) => (
          <AlbumCard key={album.id} album={album} index={index} />
        ))}
      </div>
    </div>
  );
}

