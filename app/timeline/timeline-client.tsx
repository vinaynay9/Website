"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, useReducedMotion } from "framer-motion";
import { timeline } from "@/data/timeline";
import type { TimelineItem } from "@/data/timeline";
import { DynamicHeading } from "@/components/DynamicHeading";
import {
  timelineTypographyEarly,
  timelineTypographyMiddle,
  timelineTypographyLate,
} from "@/lib/typography";

function TimelineEra({ 
  era, 
  index, 
  totalEras, 
  scrollYProgress 
}: { 
  era: TimelineItem; 
  index: number; 
  totalEras: number; 
  scrollYProgress: any;
}) {
  // Font evolution: Early (0-2) → Middle (3-4) → Late (5-6)
  const getTypographyConfig = () => {
    if (index < 2) return timelineTypographyEarly; // Eras 1-2: handwriting/messy
    if (index < 4) return timelineTypographyMiddle; // Eras 3-4: transitional
    return timelineTypographyLate; // Eras 5-7: clean/professional
  };

  const typography = getTypographyConfig();
  const eraRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  
  // Header takes up ~10% of scroll, eras share the remaining 90%
  const headerPortion = 0.1;
  const erasPortion = 1 - headerPortion;
  
  // Calculate when this era should be visible
  const eraStart = headerPortion + (index / totalEras) * erasPortion;
  const eraEnd = headerPortion + ((index + 1) / totalEras) * erasPortion;
  const eraMidpoint = (eraStart + eraEnd) / 2;
  
  // Opacity: fade in when entering, fade out when leaving
  const opacity = useTransform(
    scrollYProgress,
    [
      Math.max(0, eraStart - 0.15),
      eraStart + 0.1,
      eraEnd - 0.1,
      Math.min(1, eraEnd + 0.15)
    ],
    [0, 1, 1, 0]
  );
  
  // Y position: slide up as it enters
  const y = useTransform(
    scrollYProgress,
    [eraStart - 0.1, eraStart + 0.2],
    [40, 0],
    { clamp: true }
  );
  
  // Content progress within this era (0 to 1)
  const contentProgress = useTransform(
    scrollYProgress,
    [eraStart, eraMidpoint],
    [0, 1],
    { clamp: true }
  );

  // Date range animation
  const dateOpacity = useTransform(contentProgress, [0, 0.3], [0, 1], { clamp: true });
  const dateY = useTransform(contentProgress, [0, 0.3], [20, 0], { clamp: true });
  
  // Title animation
  const titleOpacity = useTransform(contentProgress, [0.1, 0.4], [0, 1], { clamp: true });
  const titleY = useTransform(contentProgress, [0.1, 0.4], [20, 0], { clamp: true });
  
  // Location animation
  const locationOpacity = useTransform(contentProgress, [0.2, 0.5], [0, 1], { clamp: true });
  const locationY = useTransform(contentProgress, [0.2, 0.5], [20, 0], { clamp: true });
  
  // Bullets container animation
  const bulletsOpacity = useTransform(contentProgress, [0.3, 0.6], [0, 1], { clamp: true });

  return (
    <motion.section
      ref={eraRef}
      style={{ opacity, y }}
      className="relative min-h-[140vh] flex items-center justify-center px-4 md:px-8"
    >
      <div className="max-w-4xl w-full space-y-6">
        {/* Date range */}
        <motion.div
          style={{ opacity: dateOpacity, y: dateY }}
        >
          <DynamicHeading
            profile={typography.body}
            as="p"
            className="text-xs uppercase text-muted"
          >
            {era.dateRange}
          </DynamicHeading>
        </motion.div>
        
        {/* Title */}
        <motion.div
          style={{ opacity: titleOpacity, y: titleY }}
        >
          <DynamicHeading
            profile={typography.heading}
            as="h2"
            className="text-4xl md:text-5xl"
          >
            {era.title}
          </DynamicHeading>
        </motion.div>
        
        {/* Location */}
        {era.location && (
          <motion.div
            style={{ opacity: locationOpacity, y: locationY }}
          >
            <DynamicHeading
              profile={typography.body}
              as="p"
              className="text-sm text-muted"
            >
              {era.location}
            </DynamicHeading>
          </motion.div>
        )}
        
        {/* Bullets */}
        <motion.ul
          style={{ opacity: bulletsOpacity }}
          className="space-y-3 pt-4"
        >
          {era.bullets.map((bullet, i) => {
            const bulletStart = 0.4 + (i * 0.1);
            const bulletEnd = 0.6 + (i * 0.1);
            const bulletProgress = useTransform(
              contentProgress,
              [bulletStart, bulletEnd],
              [0, 1],
              { clamp: true }
            );
            const bulletOpacity = useTransform(bulletProgress, [0, 1], [0, 1], { clamp: true });
            const bulletX = useTransform(bulletProgress, [0, 1], [-20, 0], { clamp: true });
            
            return (
              <motion.li
                key={i}
                style={{ opacity: bulletOpacity, x: bulletX }}
                className="flex items-start gap-3"
              >
                <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                <DynamicHeading
                  profile={typography.body}
                  as="span"
                  className="text-base md:text-lg text-muted"
                >
                  {bullet}
                </DynamicHeading>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </motion.section>
  );
}

function TimelineSpine({ 
  scrollYProgress, 
  totalEras 
}: { 
  scrollYProgress: any; 
  totalEras: number;
}) {
  const fillHeightPercent = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "100%"],
    { clamp: true }
  );

  return (
    <>
      {/* Desktop: Vertical spine on left */}
      <div className="hidden md:block fixed left-8 top-1/2 -translate-y-1/2 z-30 pointer-events-none">
        <div className="relative w-1 h-[60vh] bg-border/40 rounded-full overflow-hidden">
          <motion.div
            style={{ 
              height: fillHeightPercent
            }}
            className="absolute bottom-0 left-0 right-0 bg-accent rounded-full"
          />
        </div>
        {/* Era markers */}
        <div className="absolute inset-0 flex flex-col justify-between">
          {timeline.map((era, index) => {
            // Account for header taking up initial scroll space
            const headerPortion = 0.1;
            const erasPortion = 1 - headerPortion;
            const markerPosition = headerPortion + ((index + 0.5) / totalEras) * erasPortion;
            const threshold = headerPortion + (index / totalEras) * erasPortion;
            
            // Opacity: 0.3 when not reached, 1 when reached
            const markerOpacity = useTransform(
              scrollYProgress,
              [threshold - 0.05, threshold + 0.05],
              [0.3, 1],
              { clamp: true }
            );
            
            // Scale: pulse when at marker position
            const markerScale = useTransform(
              scrollYProgress,
              [markerPosition - 0.05, markerPosition, markerPosition + 0.05],
              [1, 1.5, 1],
              { clamp: true }
            );
            
            // Background color: transparent to accent
            const bgColor = useTransform(
              scrollYProgress,
              [threshold - 0.05, threshold + 0.05],
              ["transparent", "var(--color-accent)"],
              { clamp: true }
            );
            
            // Border color: border to accent
            const borderColor = useTransform(
              scrollYProgress,
              [threshold - 0.05, threshold + 0.05],
              ["var(--color-border)", "var(--color-accent)"],
              { clamp: true }
            );
            
            return (
              <motion.div
                key={era.id}
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ 
                  top: `${(index + 0.5) * (100 / totalEras)}%`,
                  scale: markerScale,
                  opacity: markerOpacity
                }}
              >
                <motion.div 
                  className="w-3 h-3 rounded-full border-2"
                  style={{
                    backgroundColor: bgColor,
                    borderColor: borderColor
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Mobile: Top progress bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-1 bg-border/40 z-50 pointer-events-none">
        <motion.div
          style={{ 
            width: fillHeightPercent
          }}
          className="h-full bg-accent"
        />
      </div>
    </>
  );
}

export default function TimelineClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentEraIndex, setCurrentEraIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Track which era is currently active for background transitions
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const headerPortion = 0.1;
    const erasPortion = 1 - headerPortion;
    
    // Only check eras after header
    if (latest < headerPortion) {
      setCurrentEraIndex(0);
      return;
    }
    
    const adjustedProgress = (latest - headerPortion) / erasPortion;
    const eraIndex = Math.min(
      timeline.length - 1,
      Math.floor(adjustedProgress * timeline.length)
    );
    setCurrentEraIndex(eraIndex);
  });

  // Background color transition
  const currentEra = timeline[currentEraIndex];
  const bgStyle: React.CSSProperties = {
    backgroundColor: currentEra?.bgColor || "transparent",
    transition: prefersReducedMotion ? "none" : "background-color 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
  };

  // Calculate total height: header (100vh) + 7 eras (140vh each) + footer (50vh)
  const totalHeight = `calc(100vh + ${timeline.length * 140}vh + 50vh)`;

  return (
    <div ref={containerRef} className="relative" style={{ minHeight: totalHeight }}>
      {/* Background color layer */}
      <div 
        className="fixed inset-0 -z-10 pointer-events-none"
        style={bgStyle}
        aria-hidden
      />
      
      {/* Timeline spine */}
      <TimelineSpine scrollYProgress={scrollYProgress} totalEras={timeline.length} />
      
      {/* Header section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
        className="relative min-h-screen flex items-center justify-center px-4 md:px-8"
      >
        <div className="max-w-4xl w-full text-center space-y-4">
          <DynamicHeading
            profile={timelineTypographyEarly.body}
            as="div"
            className="text-xs uppercase text-muted"
          >
            Timeline
          </DynamicHeading>
          <DynamicHeading
            profile={timelineTypographyEarly.heading}
            as="h1"
            className="text-5xl md:text-6xl"
            animate
          >
            Life story
          </DynamicHeading>
          <DynamicHeading
            profile={timelineTypographyEarly.body}
            as="p"
            className="text-lg text-muted max-w-2xl mx-auto"
          >
            A calm scroll through every honest chapter.
          </DynamicHeading>
        </div>
      </motion.section>
      
      {/* Timeline eras */}
      {timeline.map((era, index) => (
        <TimelineEra
          key={era.id}
          era={era}
          index={index}
          totalEras={timeline.length}
          scrollYProgress={scrollYProgress}
        />
      ))}
      
      {/* Footer spacer */}
      <div className="min-h-[50vh]" />
    </div>
  );
}
