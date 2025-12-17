"use client";

import Link from "next/link";
import Image from "next/image";
import { memo } from "react";
import { motion } from "framer-motion";
import { useCursor } from "./CursorProvider";

import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
};

export const ProjectCard = memo(function ProjectCard({ project }: ProjectCardProps) {
  const { setCursorType } = useCursor();

  const handleEnter = () => setCursorType("link");
  const handleLeave = () => setCursorType("default");

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
      whileHover={{ y: -4 }}
      className="group overflow-hidden rounded-[20px] border border-border/60 bg-surface/80 shadow-soft backdrop-blur transition-all duration-[120ms] hover:border-accent hover:shadow-[0_0_0_1px_var(--color-accent-muted),0_0_20px_var(--color-accent-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98] active:shadow-[0_0_0_1px_var(--color-accent-muted),0_0_12px_var(--color-accent-muted)]"
    >
      <Link
        href={project.link}
        prefetch={true}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className="flex flex-col"
      >
        {/* Preview Image - 16:9 aspect ratio */}
        <div className="relative aspect-video w-full overflow-hidden bg-surface/40">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
            className="relative h-full w-full"
          >
            <Image
              src={project.previewImage}
              alt={`${project.name} preview`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </motion.div>
          {/* Status badge */}
          <div className="absolute top-3 right-3">
            <span className="rounded-full border border-border/60 bg-surface/90 px-3 py-1 text-[0.65rem] uppercase tracking-[0.3em] backdrop-blur-sm">
              {project.status === "building" ? "Building" : "Shipped"}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-4 p-6">
          {/* Title + Subtitle */}
          <div className="flex flex-col gap-2">
            <h3 className="text-2xl font-semibold leading-tight">{project.name}</h3>
            <p className="text-sm leading-relaxed text-muted">{project.subtitle}</p>
          </div>

          {/* Bullet Points - Exactly 2 */}
          <ul className="flex flex-col gap-2.5">
            {project.bullets.map((bullet, index) => (
              <li key={index} className="flex items-start gap-2.5 text-sm text-muted">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60" />
                <span className="leading-relaxed">{bullet}</span>
              </li>
            ))}
          </ul>

          {/* CTA indicator */}
          <div className="flex items-center gap-2 pt-2 text-xs uppercase tracking-[0.4em] text-accent/80 transition-colors group-hover:text-accent">
            <span>View project</span>
            <motion.span
              initial={{ x: 0 }}
              whileHover={{ x: 3 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              aria-hidden
            >
              →
            </motion.span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
});

