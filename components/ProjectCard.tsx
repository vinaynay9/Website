"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useCursor } from "./CursorProvider";

import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const { setCursorType } = useCursor();

  const handleEnter = () => setCursorType("link");
  const handleLeave = () => setCursorType("default");

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
      className="overflow-hidden rounded-[20px] border border-border/60 bg-surface/80 p-6 shadow-soft backdrop-blur"
    >
      <Link
        href={project.link}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className="flex flex-col gap-4"
      >
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.45em]">
          <span>{project.status === "building" ? "Building" : "Shipped"}</span>
          <span className="text-muted">{project.id}</span>
        </div>
        <div>
          <h3 className="text-2xl font-semibold">{project.name}</h3>
          <p className="mt-2 text-sm text-muted">{project.tagline}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-[0.7rem] uppercase tracking-[0.45em] text-muted">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-border/40 px-3 py-1">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.5em] text-accent">
          <span>{project.cta}</span>
          <span aria-hidden>→</span>
        </div>
      </Link>
    </motion.article>
  );
}

