"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useMemo, useCallback } from "react";
import { activitySections } from "@/data/activity";
import { DynamicHeading } from "@/components/DynamicHeading";
import { activityTypography } from "@/lib/typography";

// Memoized animation variants
const activityCardInitialVariant = { opacity: 0, scale: 0.85, y: 20 } as const;
const activityCardAnimateVariant = { opacity: 1, scale: 1, y: 0 } as const;
const activityImageTransitionConfig = { duration: 0.4, ease: [0.19, 1, 0.22, 1] as const } as const;
const activityTextTransitionConfig = { duration: 0.4, ease: [0.19, 1, 0.22, 1] as const } as const;
const activityTitleInitialVariant = { opacity: 0 } as const;
const activityTitleAnimateVariant = { opacity: 1 } as const;
const activityTitleTransitionConfig = { delay: 0.2 } as const;

type ActivityHoverRevealCardProps = {
  src: string;
  alt: string;
  x: string;
  y: string;
  parallaxSpeed: number;
  scrollProgress: any;
  placeholderText: string;
  delay?: number;
};

function ActivityHoverRevealCard({
  src,
  alt,
  x,
  y,
  parallaxSpeed,
  scrollProgress,
  placeholderText,
  delay = 0
}: ActivityHoverRevealCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const yOffset = useTransform(scrollProgress, [0, 1], [0, parallaxSpeed]);
  const scale = useTransform(scrollProgress, [0, 0.5, 1], [1, 1.05, 1]);

  const containerStyle = useMemo(
    () => ({
      left: x,
      top: y,
      y: yOffset,
      scale
    }),
    [x, y, yOffset, scale]
  );

  const transitionConfig = useMemo(
    () => ({ duration: 1, delay, ease: [0.19, 1, 0.22, 1] as const }),
    [delay]
  );

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  const imageAnimateVariant = useMemo(
    () => ({
      opacity: isHovered ? 0 : 1,
      scale: isHovered ? 1.05 : 1
    }),
    [isHovered]
  );

  const textAnimateVariant = useMemo(
    () => ({
      opacity: isHovered ? 1 : 0,
      y: isHovered ? 0 : 8
    }),
    [isHovered]
  );

  const shadowStyle = useMemo(
    () => ({
      boxShadow: isHovered 
        ? "0 20px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px var(--color-accent-muted), 0 0 20px var(--color-accent-muted)"
        : "0 10px 30px rgba(0, 0, 0, 0.3)"
    }),
    [isHovered]
  );

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={containerStyle}
      initial={activityCardInitialVariant}
      animate={activityCardAnimateVariant}
      transition={transitionConfig}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative group">
        <div className="relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48">
          {/* Image Layer - fades on hover */}
          <motion.div
            className="absolute inset-0"
            animate={imageAnimateVariant}
            transition={activityImageTransitionConfig}
          >
            <Image
              src={src}
              alt={alt}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 128px, 192px"
            />
          </motion.div>

          {/* Text Layer - revealed on hover */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center p-4"
            animate={textAnimateVariant}
            transition={activityTextTransitionConfig}
          >
            {/* Glass blur background for text */}
            <div className="absolute inset-0 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 shadow-2xl" />
            
            {/* Text content */}
            <div className="relative z-10 text-center">
              <p className="text-xs md:text-sm text-white/90 leading-relaxed px-2">
                {placeholderText}
              </p>
            </div>
          </motion.div>

          {/* Soft shadow container */}
          <motion.div
            className="absolute inset-0 rounded-2xl shadow-2xl"
            style={shadowStyle}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>
    </motion.div>
  );
}

type ActivitySectionProps = {
  section: typeof activitySections[0];
  height: string;
  backgroundClass: string;
  sectionIndex: number;
  images: string[];
};

function ActivitySection({
  section,
  height,
  backgroundClass,
  sectionIndex,
  images
}: ActivitySectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Parallax for title - moves slower than scroll
  const titleY = useTransform(sectionProgress, [0, 1], [0, -40]);
  const titleOpacity = useTransform(sectionProgress, [0, 0.2, 0.5, 0.8, 1], [0, 1, 1, 1, 0]);
  const titleScale = useTransform(sectionProgress, [0, 0.3, 0.7, 1], [0.95, 1, 1, 0.95]);

  // Background opacity - fades in at start, stays visible, fades out at end
  const bgOpacity = useTransform(sectionProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height }}
    >
      {/* Fixed Background - stays in place while content scrolls */}
      <motion.div
        className={`fixed inset-0 ${backgroundClass}`}
        style={{
          opacity: bgOpacity,
          zIndex: -1,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed"
        }}
        aria-hidden
      />

      {/* Gradient overlay for better text readability */}
      <motion.div
        className="fixed inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40 pointer-events-none"
        style={{
          opacity: bgOpacity,
          zIndex: -1
        }}
        aria-hidden
      />

      {/* Content Container */}
      <div className="relative h-full flex flex-col items-center justify-center px-6 py-20">
        {/* Section Title */}
        <motion.div
          className="text-center mb-20 md:mb-32 z-10"
          style={{ 
            y: titleY, 
            opacity: titleOpacity,
            scale: titleScale
          }}
        >
          <motion.div
            initial={activityTitleInitialVariant}
            animate={activityTitleAnimateVariant}
            transition={activityTitleTransitionConfig}
          >
            <DynamicHeading
              profile={activityTypography.subheading!}
              as="p"
              className="text-xs text-muted mb-4"
            >
              {section.badge}
            </DynamicHeading>
          </motion.div>
          <DynamicHeading
            profile={activityTypography.heading}
            as="h2"
            className="text-4xl md:text-6xl mb-4 text-white"
            animate
          >
            {section.title}
          </DynamicHeading>
          <DynamicHeading
            profile={activityTypography.body}
            as="p"
            className="text-sm md:text-base text-muted/90 max-w-md mx-auto"
          >
            {section.description}
          </DynamicHeading>
        </motion.div>

        {/* Floating Images Container */}
        <div className="relative w-full max-w-7xl h-[60vh] md:h-[70vh]">
          {images.map((img, idx) => {
            // Distribute images across the space
            const positions = [
              { x: "8%", y: "10%" },
              { x: "75%", y: "20%" },
              { x: "20%", y: "65%" },
              { x: "85%", y: "60%" },
              { x: "45%", y: "35%" },
              { x: "12%", y: "80%" }
            ];
            const pos = positions[idx % positions.length];
            // Alternate parallax directions for visual interest
            const parallaxSpeed = idx % 2 === 0 ? 60 : -60;
            
            // Generate unique placeholder text for each card
            const cardNumber = String(idx + 1).padStart(2, "0");
            const sectionIdUpper = section.id.toUpperCase();
            const placeholderText = `${sectionIdUpper}_CARD_${cardNumber}: This is placeholder content for ${section.title} card ${idx + 1}. Replace this text with your actual content.`;
            
            return (
              <ActivityHoverRevealCard
                key={idx}
                src={img}
                alt={`${section.title} image ${idx + 1}`}
                x={pos.x}
                y={pos.y}
                parallaxSpeed={parallaxSpeed}
                scrollProgress={sectionProgress}
                placeholderText={placeholderText}
                delay={idx * 0.15}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function ActivityClient() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Get images for each section - using available images
  const sportsImages = [
    "/mock/activity/sports_1.svg",
    "/mock/activity/sports_2.svg",
    "/mock/soccer.svg" // Additional image for variety
  ];
  const hikingImages = [
    "/mock/activity/hiking_1.svg",
    "/mock/activity/hiking_2.svg"
  ];
  const scubaImages = [
    "/mock/activity/scuba_1.svg",
    "/mock/activity/scuba_2.svg"
  ];

  const sportsSection = activitySections.find(s => s.id === "sports")!;
  const hikingSection = activitySections.find(s => s.id === "hiking")!;
  const scubaSection = activitySections.find(s => s.id === "scuba")!;

  return (
    <div data-accent="activity" ref={containerRef} className="relative">
      {/* Sports Section - 200vh */}
      <ActivitySection
        section={sportsSection}
        height="200vh"
        backgroundClass="activity-bg-sports"
        sectionIndex={0}
        images={sportsImages}
      />

      {/* Hiking Section - 200vh */}
      <ActivitySection
        section={hikingSection}
        height="200vh"
        backgroundClass="activity-bg-hiking"
        sectionIndex={1}
        images={hikingImages}
      />

      {/* Scuba Section - 100vh */}
      <ActivitySection
        section={scubaSection}
        height="100vh"
        backgroundClass="activity-bg-scuba"
        sectionIndex={2}
        images={scubaImages}
      />
    </div>
  );
}
