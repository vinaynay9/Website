"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

/**
 * RouteProgress - Top progress indicator for route transitions
 * 
 * Shows a subtle progress bar at the top of the page during route transitions.
 * Uses accent color and appears/disappears smoothly.
 */
export function RouteProgress() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Show progress bar when route changes
    setIsLoading(true);
    
    // Hide after a short delay (route transition completes)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed top-0 left-0 right-0 z-[9999] h-0.5 origin-left"
          style={{ pointerEvents: "none" }}
        >
          <motion.div
            className="h-full bg-accent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: [0, 0.7, 1] }}
            exit={{ scaleX: 1 }}
            transition={{
              duration: 0.4,
              ease: [0.19, 1, 0.22, 1],
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

