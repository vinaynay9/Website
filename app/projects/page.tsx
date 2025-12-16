"use client";

import { SectionHeader } from "@/components/SectionHeader";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export const metadata = {
  title: "Projects · Vinay",
  description: "A calm list of current builds, shipped releases, and the craft behind each launch."
};

export default function ProjectsPage() {
  return (
    <section className="space-y-12">
      <SectionHeader
        eyebrow="Projects"
        title="Crafted experiments"
        description="Current builds and launched workstreams with short context."
      />
      <div className="project-grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}

