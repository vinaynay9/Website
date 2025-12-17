"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { HoverRevealCard } from "@/components/HoverRevealCard";
import { Modal } from "@/components/Modal";
import { ProjectCard } from "@/components/ProjectCard";
import { Scene } from "@/components/Scene";
import { SectionHeader } from "@/components/SectionHeader";
import { ParallaxLayer } from "@/components/motion/ParallaxLayer";
import { useCursor } from "@/components/CursorProvider";
import { homePanels } from "@/data/homePanels";
import { projects } from "@/data/projects";

const themedPages = [
  { href: "/activity", title: "Activity", description: "Sports, hikes, scuba, and lifts." },
  { href: "/travel", title: "Travel", description: "Map, countries, and photo modals." },
  { href: "/music", title: "Music", description: "Instruments, playlists, theater notes." },
  { href: "/timeline", title: "Timeline", description: "Tampa → Georgia Tech → startups." }
];

export default function HomeClient() {
  const [chosenPanel, setChosenPanel] = useState<typeof homePanels[number] | null>(null);
  const { setCursorType } = useCursor();
  const { scrollYProgress } = useScroll();

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.35, 0.38, 0.55, 0.58, 0.8, 0.83, 1],
    ["#000000", "#000000", "#0f0f0f", "#f8f7f3", "#f8f7f3", "#f8f7f3", "#101010", "#000000"]
  );
  const textColor = useTransform(
    scrollYProgress,
    [0, 0.35, 0.55, 0.8, 1],
    ["#f5f5f0", "#f5f5f0", "#010101", "#010101", "#f5f5f0"]
  );
  const borderColor = useTransform(
    scrollYProgress,
    [0, 0.35, 0.55, 0.8, 1],
    ["rgba(255,255,255,0.08)", "rgba(255,255,255,0.08)", "rgba(0,0,0,0.08)", "rgba(0,0,0,0.08)", "rgba(255,255,255,0.08)"]
  );

  const handleNavigateHover = () => setCursorType("link");
  const handleNavigateLeave = () => setCursorType("default");

  return (
    <motion.div style={{ backgroundColor, color: textColor }}>
      <div className="scene-stack w-full">
        <Scene className="flex flex-col items-center justify-center gap-3">
          <ParallaxLayer speed={48}>
            <motion.p
              className="font-display text-[clamp(72px,9vw,120px)] uppercase tracking-[0.1em] text-center"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Hi.
            </motion.p>
          </ParallaxLayer>
          <ParallaxLayer speed={30}>
            <p className="text-sm uppercase tracking-[0.5em] text-muted text-center">
              Builder. Explorer. Systems thinker.
            </p>
          </ParallaxLayer>
        </Scene>
        <Scene className="flex flex-col items-center justify-center gap-4">
          <ParallaxLayer speed={32}>
            <p className="text-5xl font-semibold tracking-[0.25em] text-center">I’m Vinay.</p>
          </ParallaxLayer>
          <ParallaxLayer speed={20}>
            <p className="max-w-3xl text-center text-base text-muted">
              Quiet confidence, high craft, and a scroll that feels like a cinematic story.
            </p>
          </ParallaxLayer>
        </Scene>
        <Scene className="flex flex-col items-center justify-center gap-3">
          <ParallaxLayer speed={18}>
            <p className="text-3xl font-semibold tracking-[0.25em] text-center">Hover over the frames.</p>
          </ParallaxLayer>
          <ParallaxLayer speed={12}>
            <p className="max-w-2xl text-center text-sm text-muted">
              Each panel is a doorway. Slide into the story and discover why I build the way I do.
            </p>
          </ParallaxLayer>
        </Scene>
        <Scene className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <SectionHeader
              title="Snapshot panels"
              description="Hover to reveal memories, then tap to dive deeper."
            />
          </div>
          <ParallaxLayer speed={14} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {homePanels.map((panel) => (
              <HoverRevealCard
                key={panel.id}
                panel={panel}
                onReveal={() => setChosenPanel(panel)}
              />
            ))}
          </ParallaxLayer>
        </Scene>
        <Scene className="flex flex-col gap-8">
          <SectionHeader
            eyebrow="Projects"
            title="Projects in motion"
            description="A curated pulse of Recall, Anchor, ReadTheField, and more."
          />
          <ParallaxLayer speed={10} className="project-grid">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </ParallaxLayer>
        </Scene>
        <Scene className="flex flex-col items-center justify-center gap-5 text-center">
          <ParallaxLayer speed={6}>
            <p className="text-sm uppercase tracking-[0.5em] text-muted">What I’m chasing next</p>
          </ParallaxLayer>
          <ParallaxLayer speed={4}>
            <p className="max-w-3xl text-base text-muted">
              Building clarity for teams moving at product speed, paired with a compass of craft and signal.
            </p>
          </ParallaxLayer>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/projects"
              onMouseEnter={handleNavigateHover}
              onMouseLeave={handleNavigateLeave}
              className="rounded-full border border-border/70 px-6 py-2 text-xs uppercase tracking-[0.4em]"
            >
              View builds
            </Link>
            <Link
              href="/timeline"
              onMouseEnter={handleNavigateHover}
              onMouseLeave={handleNavigateLeave}
              className="rounded-full border border-border/70 px-6 py-2 text-xs uppercase tracking-[0.4em]"
            >
              Explore timeline
            </Link>
          </div>
        </Scene>
        <Scene className="flex flex-col gap-8">
          <SectionHeader
            eyebrow="Themed paths"
            title="Where to go next"
            description="Activity, travel, music, and the full timeline live on their own pages."
          />
          <div className="grid gap-4 md:grid-cols-2">
            {themedPages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                onMouseEnter={handleNavigateHover}
                onMouseLeave={handleNavigateLeave}
                className="group flex flex-col justify-between rounded-[20px] border border-border/60 bg-surface/60 p-6 transition hover:border-white/70"
              >
                <div className="text-xs uppercase tracking-[0.45em] text-muted">Go</div>
                <h3 className="mt-4 text-2xl font-semibold">{page.title}</h3>
                <p className="mt-2 text-sm text-muted">{page.description}</p>
              </Link>
            ))}
          </div>
        </Scene>
      </div>
      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-10 mx-auto h-0.5 w-4/5 bg-gradient-to-r from-current/0 via-current to-current/0 opacity-40"
        style={{ borderColor }}
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
            onMouseEnter={handleNavigateHover}
            onMouseLeave={handleNavigateLeave}
            className="text-xs uppercase tracking-[0.5em] text-accent"
          >
            Go to story
          </Link>
        )}
      </Modal>
    </motion.div>
  );
}

