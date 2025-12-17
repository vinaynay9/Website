"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string | React.ReactNode;
  children: React.ReactNode;
};

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKey);
    }

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, onClose]);

// Memoized animation variants
const backdropInitialVariant = { opacity: 0 } as const;
const backdropAnimateVariant = { opacity: 1 } as const;
const backdropExitVariant = { opacity: 0 } as const;
const modalInitialVariant = { scale: 0.95, opacity: 0 } as const;
const modalAnimateVariant = { scale: 1, opacity: 1 } as const;
const modalExitVariant = { scale: 0.95, opacity: 0 } as const;
const modalTransitionConfig = { duration: 0.35, ease: [0.19, 1, 0.22, 1] as const } as const;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-5"
          initial={backdropInitialVariant}
          animate={backdropAnimateVariant}
          exit={backdropExitVariant}
          onClick={onClose}
        >
          <motion.div
            className="modal-backdrop absolute inset-0 bg-background/70"
            aria-hidden
          />
          <motion.div
            className="relative z-10 max-w-3xl rounded-[24px] border border-border/50 bg-surface/95 p-8 shadow-soft"
            role="dialog"
            aria-modal="true"
            aria-label={typeof title === "string" ? title : "Modal"}
            initial={modalInitialVariant}
            animate={modalAnimateVariant}
            exit={modalExitVariant}
            transition={modalTransitionConfig}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4">
              <div className="text-2xl font-semibold">
                {typeof title === "string" ? <h3>{title}</h3> : title}
              </div>
              <button
                className="accent-hover text-sm uppercase tracking-[0.5em] text-muted transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
                onClick={onClose}
                type="button"
              >
                Close
              </button>
            </div>
            <div className="mt-6 space-y-4">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

