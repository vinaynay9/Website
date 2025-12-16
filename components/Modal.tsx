"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="modal-backdrop absolute inset-0 bg-black/70"
            aria-hidden
          />
          <motion.div
            className="relative z-10 max-w-3xl rounded-[24px] border border-border/50 bg-surface/95 p-8 shadow-soft"
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-2xl font-semibold">{title}</h3>
              <button
                className="text-sm uppercase tracking-[0.5em] text-muted"
                onClick={onClose}
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

