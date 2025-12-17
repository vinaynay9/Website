"use client";

import { motion } from "framer-motion";
import { useCursor } from "./CursorProvider";

import type { HomePanel } from "@/data/homePanels";

type HoverRevealCardProps = {
  panel: HomePanel;
  onReveal: (panel: HomePanel) => void;
};

export function HoverRevealCard({ panel, onReveal }: HoverRevealCardProps) {
  const { setCursorType } = useCursor();

  const handleHover = () => setCursorType("reveal");
  const handleReset = () => setCursorType("default");

  return (
    <motion.button
      type="button"
      aria-describedby={`${panel.id}-details`}
      onClick={() => onReveal(panel)}
      onMouseEnter={handleHover}
      onMouseLeave={handleReset}
      onFocus={handleHover}
      onBlur={handleReset}
      className="group relative h-64 w-full overflow-hidden rounded-[24px] border border-border/60 bg-surface text-left shadow-soft transition-colors hover:border-accent/40"
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 180, damping: 16 }}
    >
      <motion.div
        className="absolute inset-0 bg-cover bg-center transition duration-500"
        style={{ backgroundImage: `url(${panel.image})` }}
        whileHover={{ scale: 1.05 }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      <motion.div
        layout
        className="absolute inset-0 flex flex-col justify-end p-6 text-sm font-medium"
        initial={{ y: 0 }}
        whileHover={{ y: -12 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <span className="text-xs uppercase tracking-[0.4em] text-muted">{panel.caption}</span>
        <p className="mt-3 text-xl font-semibold leading-tight">{panel.title}</p>
        <p
          id={`${panel.id}-details`}
          className="max-w-sm pt-2 text-[0.85rem] leading-relaxed opacity-80"
        >
          {panel.description}
        </p>
        <span className="mt-4 text-xs uppercase tracking-[0.5em] text-accent">
          Learn more
        </span>
      </motion.div>
    </motion.button>
  );
}

