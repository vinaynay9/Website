"use client";

import Image from "next/image";
import { useCursor } from "@/components/CursorProvider";
import { SectionHeader } from "@/components/SectionHeader";
import { instruments, playlists, musicals } from "@/data/music";

export const metadata = {
  title: "Music · Vinay",
  description: "Instruments, playlists, and musical theater glimpses."
};

export default function MusicPage() {
  const { setCursorType } = useCursor();

  const handleLinkEnter = () => setCursorType("link");
  const handleLinkLeave = () => setCursorType("default");

  return (
    <section className="space-y-12">
      <SectionHeader
        eyebrow="Music"
        title="Sound chapters"
        description="Instruments, playlists, and theater keep the rhythm steady."
      />
      <div className="space-y-6">
        <h3 className="text-sm uppercase tracking-[0.5em] text-muted">Instruments</h3>
        <div className="grid gap-6 md:grid-cols-2">
          {instruments.map((instrument) => (
            <article
              key={instrument.name}
              className="group overflow-hidden rounded-[20px] border border-border/60 bg-surface/80"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={instrument.image}
                  alt={instrument.name}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="space-y-2 p-6">
                <p className="text-xs uppercase tracking-[0.5em] text-muted">{instrument.badge}</p>
                <h3 className="text-2xl font-semibold">{instrument.name}</h3>
                <p className="text-sm text-muted">{instrument.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="space-y-6">
        <h3 className="text-sm uppercase tracking-[0.5em] text-muted">Playlists</h3>
        <div className="grid gap-4 md:grid-cols-3">
          {playlists.map((playlist) => (
            <a
              key={playlist.title}
              href={playlist.link}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={handleLinkEnter}
              onMouseLeave={handleLinkLeave}
              className="flex flex-col justify-between rounded-[18px] border border-border/60 bg-surface/70 p-5 text-sm uppercase tracking-[0.25em] transition hover:border-white/70"
            >
              <span className="text-xs text-muted">{playlist.title}</span>
              <p className="mt-4 text-[0.7rem] text-muted">{playlist.description}</p>
            </a>
          ))}
        </div>
      </div>
      <div className="space-y-6">
        <h3 className="text-sm uppercase tracking-[0.5em] text-muted">Musical theater</h3>
        <div className="rounded-[20px] border border-border/60 bg-surface/80 p-6">
          <p className="text-sm text-muted">
            Stories with layered scores remind me that craft comes with collaboration, tension, and release.
          </p>
          <ul className="mt-4 flex flex-wrap gap-3 text-xs uppercase tracking-[0.4em]">
            {musicals.map((entry) => (
              <li key={entry.title} className="rounded-full border border-border/40 px-4 py-2">
                {entry.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

