"use client";

import Link from "next/link";
import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion, useTransform, useMotionValueEvent } from "framer-motion";

import { HoverRevealCard } from "@/components/HoverRevealCard";
import { Modal } from "@/components/Modal";
import { ProjectCard } from "@/components/ProjectCard";
import { Scene } from "@/components/Scene";
import { SectionHeader } from "@/components/SectionHeader";
import { useCursor } from "@/components/CursorProvider";
import { FunName } from "@/components/FunName";
import { FloatingMoments } from "@/components/FloatingMoments";
import { DynamicHeading } from "@/components/DynamicHeading";
import { LokiTitle } from "@/components/LokiTitle";
import { homePanels } from "@/data/homePanels";
import { projects } from "@/data/projects";
import { homeTypography } from "@/lib/typography";
import { useSharedScroll } from "@/lib/motion/useSharedScroll";

// Dynamically import ElectricField to reduce initial bundle size
const ElectricField = dynamic(
  () => import("@/components/ElectricField").then((mod) => mod.ElectricField),
  { ssr: false }
);

const themedPages = [
  { href: "/activity", title: "Activity", description: "Sports, hikes, scuba, and lifts." },
  { href: "/travel", title: "Travel", description: "Map, countries, and photo modals." },
  { href: "/music", title: "Music", description: "Instruments, playlists, theater notes." },
  { href: "/timeline", title: "Timeline", description: "Tampa → Georgia Tech → startups." }
];

/**
 * Theme Zone System - Three Clear Chapters:
 * 
 * Chapter 1: Introduction / Identity (0% - 33%)
 *   - Dark forest green background, white text
 *   - Content: "Hi", "I'm Vinay", "Hover over the frames"
 *   - Boundary at 33% ensures all intro content completes before theme change
 * 
 * Chapter 2: Story & Work (33% - 67%)
 *   - Faint green-tinted off-white background, black text
 *   - Content: "Snapshot panels", "Projects in motion"
 *   - Boundary at 67% provides sufficient space for both story sections
 * 
 * Chapter 3: Closing / Forward Energy (67% - 100%)
 *   - Dark forest green background, white text
 *   - Content: "What I'm chasing next", "Where to go next"
 *   - Final black zone creates forward momentum and closure
 * 
 * Sharp transitions at boundaries prevent text from straddling theme changes,
 * ensuring each chapter reads cleanly within its visual context.
 */
const ZONE_BOUNDARIES = {
  ZONE_1_END: 0.33, // End of Chapter 1 (Introduction)
  ZONE_2_END: 0.67, // End of Chapter 2 (Story & Work)
} as const;

export default function HomeClient() {
  const [chosenPanel, setChosenPanel] = useState<typeof homePanels[number] | null>(null);
  const { setCursorType } = useCursor();
  
  // Use shared scroll hook for better performance
  const scrollYProgress = useSharedScroll();

  // Theme state for smooth CSS transitions
  const [isLightTheme, setIsLightTheme] = useState(false);

  // Update theme based on scroll position - triggers CSS transitions
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const shouldBeLight = latest >= ZONE_BOUNDARIES.ZONE_1_END && latest < ZONE_BOUNDARIES.ZONE_2_END;
    setIsLightTheme(shouldBeLight);
  });

  // CSS variables for theme - transitions handled by CSS
  const themeVars: React.CSSProperties = {
    "--color-background": isLightTheme ? "#F3F7F3" : "#07150D",
    "--color-text": isLightTheme ? "#030303" : "#f6f6f2",
    "--color-border": isLightTheme ? "rgba(0, 0, 0, 0.12)" : "rgba(255, 255, 255, 0.12)",
    "--color-muted": isLightTheme ? "#666666" : "#cfcfcf",
    "--color-surface": isLightTheme ? "#f0f5f1" : "#0a1a12",
  };

  // Parallax: Reduced to three speeds for clearer intent
  // Fast: Primary headlines (-20px)
  // Medium: Supporting text (-12px)
  // Slow: Background elements (-6px)
  // useTransform returns stable MotionValue - no memoization needed
  const parallaxFast = useTransform(scrollYProgress, [0, 1], [0, -20]);
  const parallaxMedium = useTransform(scrollYProgress, [0, 1], [0, -12]);
  const parallaxSlow = useTransform(scrollYProgress, [0, 1], [0, -6]);

  const handleNavigateHover = useCallback(() => setCursorType("link"), [setCursorType]);
  const handleNavigateLeave = useCallback(() => setCursorType("default"), [setCursorType]);

  return (
    <div 
      data-accent="default"
      style={themeVars} 
      className="relative bg-background text-text transition-[background-color,color,border-color] duration-[600ms] ease-in-out"
    >
      {/* Electric field background effect - only on home page */}
      <ElectricField scrollYProgress={scrollYProgress} isLightTheme={isLightTheme} />
      
      <div className="scene-stack w-full">
        {/* 
          CHAPTER 1: Introduction / Identity (Black background)
          Scene height: 150vh provides breathing room and natural scroll pacing
          Spacing: gap-10 creates clear hierarchy between headline and supporting text
          Padding: py-20 ensures content doesn't feel cramped at viewport edges
        */}
        <Scene className="flex flex-col items-center justify-center gap-10 min-h-[150vh] py-20">
          <motion.div style={{ y: parallaxFast }}>
            <LokiTitle text="Hi." size="lg" />
          </motion.div>
          <motion.div style={{ y: parallaxMedium }}>
            <DynamicHeading
              profile={homeTypography.subheading!}
              as="p"
              className="text-sm uppercase text-muted/90 text-center"
              animate
            >
              Builder. Explorer. Systems thinker.
            </DynamicHeading>
          </motion.div>
        </Scene>

        <Scene className="flex flex-col items-center justify-center gap-10 min-h-[150vh] py-20">
          <motion.div style={{ y: parallaxFast }} className="flex flex-col items-center gap-4">
            <p className="text-xl font-medium tracking-[0.15em] text-center opacity-75">I'm</p>
            <FunName size="xl" />
          </motion.div>
          <motion.div style={{ y: parallaxMedium }}>
            <DynamicHeading
              profile={homeTypography.body}
              as="p"
              className="max-w-3xl text-center text-base text-muted/90"
            >
              Quiet confidence, high craft, and a scroll that feels like a cinematic story.
            </DynamicHeading>
          </motion.div>
        </Scene>

        <Scene className="flex flex-col items-center justify-center gap-10 min-h-[150vh] py-20">
          <motion.div style={{ y: parallaxFast }}>
            <DynamicHeading
              profile={homeTypography.heading}
              as="p"
              className="header-accent-hover text-2xl text-center relative inline-block transition-all duration-300"
            >
              Hover over the frames.
            </DynamicHeading>
          </motion.div>
          <motion.div style={{ y: parallaxMedium }}>
            <DynamicHeading
              profile={homeTypography.body}
              as="p"
              className="max-w-2xl text-center text-sm text-muted/90"
            >
              Each panel is a doorway. Slide into the story and discover why I build the way I do.
            </DynamicHeading>
          </motion.div>
        </Scene>

        {/* 
          CHAPTER 2: Story & Work (White background)
          Scene height: 160vh accommodates grid content without feeling cramped
          Spacing: gap-20 creates clear separation between header and content grid
          Padding: py-24 provides generous top/bottom breathing room
        */}
        <Scene className="flex flex-col gap-20 min-h-[160vh] py-24">
          <SectionHeader
            title="Snapshot panels"
            description="Hover to reveal memories, then tap to dive deeper."
          />
          <motion.div style={{ y: parallaxSlow }} className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {homePanels.map((panel) => (
              <HoverRevealCard
                key={panel.id}
                panel={panel}
                onReveal={() => setChosenPanel(panel)}
              />
            ))}
          </motion.div>
        </Scene>

        {/* 
          CHAPTER 2 (continued): Floating Moments (White background)
          Scene height: 160vh maintains consistency with other sections
          Spacing: gap-20 creates clear separation between header and content
          Padding: py-24 provides generous top/bottom breathing room
        */}
        <Scene className="flex flex-col gap-20 min-h-[160vh] py-24">
          <SectionHeader
            title="Floating Moments"
            description="Hover to reveal the stories behind each moment."
          />
          <FloatingMoments />
        </Scene>

        {/* 
          CHAPTER 2 (continued): Projects (White background)
          Scene height: 160vh maintains consistency with panels section
          Spacing: gap-20 matches previous section for visual rhythm
          Padding: py-24 ensures projects feel grounded and earned
        */}
        <Scene className="flex flex-col gap-20 min-h-[160vh] py-24">
          <SectionHeader
            eyebrow="Projects"
            title="Projects in motion"
            description="A curated selection of builds, experiments, and shipped work."
          />
          <motion.div style={{ y: parallaxSlow }} className="project-grid">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </motion.div>
        </Scene>

        {/* 
          CHAPTER 3: Closing / Forward Energy (Black background)
          Scene height: 150vh returns to intro pacing for closing statement
          Spacing: gap-12 balances content density with breathing room
          Padding: py-20 matches intro scenes for visual consistency
        */}
        <Scene className="flex flex-col items-center justify-center gap-12 text-center min-h-[150vh] py-20">
          <motion.div style={{ y: parallaxMedium }}>
            <p className="text-sm uppercase tracking-[0.5em] text-muted/90">What I'm chasing next</p>
          </motion.div>
          <motion.div style={{ y: parallaxMedium }}>
            <p className="max-w-3xl text-base text-muted/90 leading-relaxed">
              Building clarity for teams moving at product speed, paired with a compass of craft and signal.
            </p>
          </motion.div>
          <div className="flex flex-wrap items-center justify-center gap-6 mt-6">
            <Link
              href="/projects"
              prefetch={true}
              onMouseEnter={handleNavigateHover}
              onMouseLeave={handleNavigateLeave}
              className="accent-hover rounded-full border border-border/70 px-6 py-2.5 text-xs uppercase tracking-[0.4em] transition-all duration-[120ms] hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              View builds
            </Link>
            <Link
              href="/timeline"
              prefetch={true}
              onMouseEnter={handleNavigateHover}
              onMouseLeave={handleNavigateLeave}
              className="accent-hover rounded-full border border-border/70 px-6 py-2.5 text-xs uppercase tracking-[0.4em] transition-all duration-[120ms] hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Explore timeline
            </Link>
          </div>
        </Scene>

        <Scene className="flex flex-col gap-20 min-h-[150vh] py-24">
          <SectionHeader
            eyebrow="Themed paths"
            title="Where to go next"
            description="Activity, travel, music, and the full timeline live on their own pages."
          />
          <motion.div style={{ y: parallaxSlow }} className="grid gap-6 md:grid-cols-2">
            {themedPages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                prefetch={true}
                onMouseEnter={handleNavigateHover}
                onMouseLeave={handleNavigateLeave}
                className="card-accent-hover group flex flex-col justify-between rounded-[20px] border border-border/60 bg-surface/60 p-8 transition-all duration-[120ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <div className="text-xs uppercase tracking-[0.45em] text-muted/80">Go</div>
                <DynamicHeading
                  profile={homeTypography.heading}
                  as="h3"
                  className="mt-6 text-2xl"
                >
                  {page.title}
                </DynamicHeading>
                <p className="mt-3 text-sm text-muted/90 leading-relaxed">{page.description}</p>
              </Link>
            ))}
          </motion.div>
        </Scene>
      </div>
      {/* 
        Scroll indicator: Minimal visual presence, positioned at bottom
        Opacity reduced to 15% to remain subtle and non-distracting
      */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-16 mx-auto h-0.5 w-3/5 bg-gradient-to-r from-current/0 via-current to-current/0 opacity-[0.15] border-border transition-colors duration-[600ms] ease-in-out"
      />
      <Modal
        isOpen={Boolean(chosenPanel)}
        onClose={() => setChosenPanel(null)}
        title={chosenPanel?.title ?? ""}
      >
        <p className="text-sm text-muted">{chosenPanel?.description}</p>
        <div className="space-y-2">
          {chosenPanel?.highlights.map((item) => (
            <p key={item} className="text-sm">
              ‹ {item}
            </p>
          ))}
        </div>
        {chosenPanel && (
          <Link
            href={chosenPanel.route}
            prefetch={true}
            onMouseEnter={handleNavigateHover}
            onMouseLeave={handleNavigateLeave}
            className="accent-hover text-xs uppercase tracking-[0.5em] text-accent transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
          >
            Go to story
          </Link>
        )}
      </Modal>
    </div>
  );
}

