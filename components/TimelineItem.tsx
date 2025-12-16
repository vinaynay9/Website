"use client";

import { motion } from "framer-motion";

import type { TimelineItem } from "@/data/timeline";

const accentColorMap: Record<string, string> = {
  tampa: "var(--color-accent)",
  gt: "var(--color-activity)",
  startups: "var(--color-accent-soft)",
  internships: "var(--color-travel)",
  present: "var(--color-music)"
};

type TimelineItemProps = {
  item: TimelineItem;
};

export function TimelineItem({ item }: TimelineItemProps) {
  const accentColor = accentColorMap[item.accent ?? "present"] || "var(--color-accent)";

  return (
    <motion.article
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
      className="group relative overflow-hidden rounded-[20px] border border-border/60 bg-surface/80 px-6 py-8"
    >
      <div
        className="absolute inset-y-6 left-0 w-1 rounded-r-full"
        style={{ backgroundColor: accentColor }}
        aria-hidden
      />
      <div className="relative space-y-3 pl-4">
        <div className="flex flex-wrap items-center gap-3 text-[0.65rem] uppercase tracking-[0.5em] text-muted">
          <span>{item.period}</span>
          {item.location && <span className="text-[0.55rem]">{item.location}</span>}
        </div>
        <h3 className="text-2xl font-semibold">{item.title}</h3>
        <ul className="space-y-2 text-sm text-muted">
          {item.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-2">
              <span className="mt-1 inline-block h-1 w-1 rounded-full bg-text" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

