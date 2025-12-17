"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { activitySections } from "@/data/activity";

type FloatingImageProps = {
  src: string;
  alt: string;
  x: string;
  y: string;
  parallaxSpeed: number;
  scrollProgress: any;
  hoverText: string;
  delay?: number;
};

function FloatingImage({
  src,
  alt,
  x,
  y,
  parallaxSpeed,
  scrollProgress,
  hoverText,
  delay = 0
}: FloatingImageProps) {
  const [isHovered, setIsHovered] = useState(false);
  const yOffset = useTransform(scrollProgress, [0, 1], [0, parallaxSpeed]);
  const scale = useTransform(scrollProgress, [0, 0.5, 1], [1, 1.05, 1]);

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        left: x,
        top: y,
        y: yOffset,
        scale
      }}
      initial={{ opacity: 0, scale: 0.85, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1, delay, ease: [0.19, 1, 0.22, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
    >
      <div className="relative group">
        <div className="relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-contain opacity-60 transition-all duration-500 group-hover:opacity-100 group-hover:brightness-110"
            sizes="(max-width: 768px) 128px, 192px"
          />
          {/* Subtle glow on hover */}
          <motion.div
            className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-30 bg-white/20"
            transition={{ duration: 0.3 }}
          />
        </div>
        <motion.div
          className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none z-20"
          initial={{ opacity: 0, y: 15, scale: 0.9 }}
          animate={{ 
            opacity: isHovered ? 1 : 0, 
            y: isHovered ? 0 : 15,
            scale: isHovered ? 1 : 0.9
          }}
          transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
        >
          <span className="text-xs uppercase tracking-[0.3em] text-white bg-black/70 px-4 py-2 rounded-full backdrop-blur-md border border-white/10 shadow-lg">
            {hoverText}
          </span>
        </motion.div>
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
          <motion.p 
            className="text-xs uppercase tracking-[0.6em] text-muted mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {section.badge}
          </motion.p>
          <h2 className="text-4xl md:text-6xl font-semibold tracking-[0.05em] mb-4 text-white">
            {section.title}
          </h2>
          <p className="text-sm md:text-base text-muted/90 max-w-md mx-auto leading-relaxed">
            {section.description}
          </p>
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
            
            return (
              <FloatingImage
                key={idx}
                src={img}
                alt={`${section.title} image ${idx + 1}`}
                x={pos.x}
                y={pos.y}
                parallaxSpeed={parallaxSpeed}
                scrollProgress={sectionProgress}
                hoverText={section.subtitle}
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
    <div ref={containerRef} className="relative">
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
