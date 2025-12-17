"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { ScrollScene } from "@/components/motion/ScrollScene";
import { SectionHeader } from "@/components/SectionHeader";
import { activitySections } from "@/data/activity";

export default function ActivityClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const sportsOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const hikingOpacity = useTransform(scrollYProgress, [0.25, 0.6], [0, 1]);
  const scubaOpacity = useTransform(scrollYProgress, [0.5, 1], [0, 1]);

  return (
    <section ref={containerRef} className="relative overflow-hidden">
      <motion.div
        className="activity-bg activity-bg-sports"
        style={{ opacity: sportsOpacity }}
        aria-hidden
      />
      <motion.div
        className="activity-bg activity-bg-hiking"
        style={{ opacity: hikingOpacity }}
        aria-hidden
      />
      <motion.div
        className="activity-bg activity-bg-scuba"
        style={{ opacity: scubaOpacity }}
        aria-hidden
      />
      <div className="relative space-y-20 px-6 py-10">
        <SectionHeader
          eyebrow="Activity"
          title="Cinematic chapters"
          description="Sports → Hiking → Scuba with layered worlds and slow parallax."
        />
        <ScrollScene minHeight="140vh">
          {() => (
            <div className="rounded-[32px] border border-border/60 bg-surface/70 p-6 shadow-soft backdrop-blur">
              <p className="text-xs uppercase tracking-[0.6em] text-muted">Chapter 01</p>
              <h2 className="text-4xl font-semibold tracking-[0.25em]">Sports collage</h2>
              <p className="mt-2 text-sm text-muted">
                Calm chaos — a Where’s Waldolike collage of gear pulses in the background.
              </p>
              <div className="mt-10 grid gap-6 md:grid-cols-2">
                {activitySections.slice(0, 2).map((section) => (
                  <article
                    key={section.id}
                    className="relative overflow-hidden rounded-[24px] border border-border/60 bg-[#0b0b0b]/80 p-5"
                  >
                    <div className="relative h-56 overflow-hidden rounded-[18px] border border-border/40 bg-gray-900">
                      <Image
                        src="/placeholders/blank-white.svg"
                        alt="Placeholder"
                        fill
                        className="object-cover opacity-70"
                        sizes="(max-width: 600px) 100vw, 45vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d]/90 via-[#0d0d0d]/40 to-transparent" />
                      <div className="absolute inset-0 flex flex-col justify-end p-5">
                        <p className="text-xs uppercase tracking-[0.3em] text-muted">Placeholder</p>
                        <h3 className="text-2xl font-semibold text-white">{section.title}</h3>
                      </div>
                    </div>
                    <p className="mt-4 text-sm text-muted">{section.description}</p>
                  </article>
                ))}
              </div>
            </div>
          )}
        </ScrollScene>
        <ScrollScene minHeight="140vh">
          {() => (
            <div className="rounded-[32px] border border-border/60 bg-gradient-to-br from-[#0d1f17] to-[#132623] p-6 shadow-soft">
              <p className="text-xs uppercase tracking-[0.6em] text-muted">Chapter 02</p>
              <h2 className="text-4xl font-semibold text-[#8dd5a7] tracking-[0.25em]">
                Hiking atmosphere
              </h2>
              <p className="mt-2 text-sm text-muted">
                Outdoorsy silhouettes and airy offsets create a grounded palette.
              </p>
              <div className="mt-10 grid gap-6 md:grid-cols-2">
                {activitySections.slice(1, 3).map((section) => (
                  <article
                    key={section.id}
                    className="rounded-[24px] border border-border/60 bg-[#0f2e1c]/60 p-5 shadow-inner"
                  >
                    <div className="relative h-56 overflow-hidden rounded-[18px] border border-border/40 bg-gray-900">
                      <Image
                        src="/placeholders/blank-white.svg"
                        alt="Placeholder"
                        fill
                        className="object-cover opacity-70"
                        sizes="(max-width: 600px) 100vw, 45vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0f2e1c]/90 via-[#0f2e1c]/40 to-transparent" />
                      <div className="absolute inset-0 flex flex-col justify-end p-5">
                        <p className="text-xs uppercase tracking-[0.3em] text-muted">Placeholder</p>
                        <h3 className="text-2xl font-semibold text-white">{section.title}</h3>
                      </div>
                    </div>
                    <p className="mt-4 text-sm text-muted">{section.description}</p>
                  </article>
                ))}
              </div>
            </div>
          )}
        </ScrollScene>
        <ScrollScene minHeight="140vh">
          {() => (
            <div className="rounded-[32px] border border-border/60 bg-gradient-to-br from-[#030d19] to-[#052944] p-6 shadow-soft">
              <p className="text-xs uppercase tracking-[0.6em] text-muted">Chapter 03</p>
              <h2 className="text-4xl font-semibold text-[#52c7e1] tracking-[0.25em]">Scuba calm</h2>
              <p className="mt-2 text-sm text-muted">Oceanic depth with mask and fin silhouettes.</p>
              <div className="mt-10 grid gap-6 md:grid-cols-2">
                {activitySections.slice(2, 4).map((section) => (
                  <article
                    key={section.id}
                    className="rounded-[24px] border border-border/60 bg-[#04122c]/70 p-5"
                  >
                    <div className="relative h-56 overflow-hidden rounded-[18px] border border-border/40 bg-gray-900">
                      <Image
                        src="/placeholders/blank-white.svg"
                        alt="Placeholder"
                        fill
                        className="object-cover opacity-70"
                        sizes="(max-width: 600px) 100vw, 45vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#04122c]/90 via-[#04122c]/40 to-transparent" />
                      <div className="absolute inset-0 flex flex-col justify-end p-5">
                        <p className="text-xs uppercase tracking-[0.3em] text-muted">Placeholder</p>
                        <h3 className="text-2xl font-semibold text-white">{section.title}</h3>
                      </div>
                    </div>
                    <p className="mt-4 text-sm text-muted">{section.description}</p>
                  </article>
                ))}
              </div>
            </div>
          )}
        </ScrollScene>
        <div className="rounded-[28px] border border-border/60 bg-surface/80 p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.5em] text-muted">Gym lifts</p>
            <span className="text-xs uppercase tracking-[0.5em] text-accent">Last updated: today</span>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {activitySections
              .filter((section) => section.id.includes("gym"))
              .map((lift) => (
                <div
                  key={lift.id}
                  className="rounded-[18px] border border-border/60 bg-black/30 px-4 py-3 text-sm uppercase tracking-[0.35em] text-muted"
                >
                  <p className="text-base text-white">{lift.title ?? lift.badge}</p>
                  <p className="text-xs text-muted">{lift.subtitle}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}

