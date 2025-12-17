"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { useCursor } from "./CursorProvider";

import type { HomePanel } from "@/data/homePanels";

type HoverRevealCardProps = {
  panel: HomePanel;
  onReveal: (panel: HomePanel) => void;
};

// Memoized animation variants
const cardWhileHoverVariant = { scale: 1.01 } as const;
const cardTransitionConfig = { type: "spring" as const, stiffness: 180, damping: 16 } as const;
const imageWhileHoverVariant = { scale: 1.05 } as const;
const contentInitialVariant = { y: 0 } as const;
const contentWhileHoverVariant = { y: -12 } as const;
const contentTransitionConfig = { duration: 0.4, ease: "easeOut" as const } as const;

export const HoverRevealCard = memo(function HoverRevealCard({ panel, onReveal }: HoverRevealCardProps) {
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
      className="group relative h-64 w-full overflow-hidden rounded-[24px] border border-border/60 bg-surface text-left shadow-soft transition-all duration-[120ms] hover:border-accent hover:shadow-[0_0_0_1px_var(--color-accent-muted),0_0_20px_var(--color-accent-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98] active:shadow-[0_0_0_1px_var(--color-accent-muted),0_0_12px_var(--color-accent-muted)]"
      whileHover={cardWhileHoverVariant}
      transition={cardTransitionConfig}
    >
      <motion.div
        className="absolute inset-0 bg-cover bg-center transition duration-500"
        style={{ backgroundImage: `url(${panel.image})` }}
        whileHover={imageWhileHoverVariant}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      <motion.div
        layout
        className="absolute inset-0 flex flex-col justify-end p-6 text-sm font-medium"
        initial={contentInitialVariant}
        whileHover={contentWhileHoverVariant}
        transition={contentTransitionConfig}
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
});

