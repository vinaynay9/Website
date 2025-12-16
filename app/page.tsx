"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

import { HoverRevealCard } from "@/components/HoverRevealCard";
import { Modal } from "@/components/Modal";
import { ProjectCard } from "@/components/ProjectCard";
import { Scene } from "@/components/Scene";
import { SectionHeader } from "@/components/SectionHeader";
import { useCursor } from "@/components/CursorProvider";
import { homePanels } from "@/data/homePanels";
import { projects } from "@/data/projects";

export const metadata = {
  title: "Vinay — Quiet Confidence, Cinematic Stories",
  description:
    "Story-forward scroll, hover-reveal panels, and projects that carry the weight of thoughtful craft."
};

const themedPages = [
  { href: "/activity", title: "Activity", description: "Sports, hikes, scuba, and lifts." },
  { href: "/travel", title: "Travel", description: "Map, countries, and photo modals." },
  { href: "/music", title: "Music", description: "Instruments, playlists, theater notes." },
  { href: "/timeline", title: "Timeline", description: "Tampa → Georgia Tech → startups." }
];

export default function HomePage() {
  const [chosenPanel, setChosenPanel] = useState<typeof homePanels[number] | null>(null);
  const { setCursorType } = useCursor();

  const handleNavigateHover = () => setCursorType("link");
  const handleNavigateLeave = () => setCursorType("default");

  return (
    <>
      <div className="scene-stack w-full">
        <Scene>
          <div className="flex w-full flex-col items-center justify-center gap-4 text-center">
            <motion.p
              className="font-display text-[clamp(72px,9vw,120px)] uppercase tracking-[0.1em]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Hi.
            </motion.p>
            <p className="text-sm uppercase tracking-[0.5em] text-muted">
              Builder. Explorer. Systems thinker.
            </p>
          </div>
        </Scene>
        <Scene>
          <div className="flex w-full flex-col items-center justify-center gap-4 text-center">
            <p className="text-6xl font-semibold tracking-[0.2em]">I’m Vinay.</p>
            <p className="max-w-3xl text-center text-base text-muted">
              Quiet confidence, high craft, and a scroll that feels like a moving picture.
            </p>
          </div>
        </Scene>
        <Scene>
          <div className="flex w-full flex-col items-center justify-center gap-3 text-center">
            <p className="text-3xl font-semibold tracking-[0.25em]">Hover over the frames.</p>
            <p className="max-w-2xl text-sm text-muted">
              Each panel is a doorway. Slide into the story and discover why I build the way I do.
            </p>
          </div>
        </Scene>
        <Scene className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <SectionHeader
              title="Snapshot panels"
              description="Hover to reveal memories, then tap to dive deeper."
            />
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {homePanels.map((panel) => (
              <HoverRevealCard
                key={panel.id}
                panel={panel}
                onReveal={() => setChosenPanel(panel)}
              />
            ))}
          </div>
        </Scene>
        <Scene className="flex flex-col gap-8">
          <SectionHeader
            eyebrow="Projects"
            title="Projects in motion"
            description="A curated pulse of Recall, Anchor, ReadTheField, and more."
          />
          <div className="project-grid">{projects.map((project) => <ProjectCard key={project.id} project={project} />)}</div>
        </Scene>
        <Scene>
          <div className="flex w-full flex-col items-center justify-center gap-5 text-center">
            <p className="text-sm uppercase tracking-[0.5em] text-muted">What I’m chasing next</p>
            <p className="max-w-3xl text-base text-muted">
              Building clarity for teams moving at product speed, paired with a compass of craft and signal.
            </p>
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
    </>
  );
}

