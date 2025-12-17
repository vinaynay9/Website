 "use client";

import { ParallaxLayer } from "@/components/motion/ParallaxLayer";
import { SectionHeader } from "@/components/SectionHeader";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export default function ProjectsClient() {
  return (
    <section className="space-y-12 px-4 py-10">
      <ParallaxLayer speed={14}>
        <SectionHeader
          eyebrow="Projects"
          title="Crafted experiments"
          description="Current builds and launched workstreams with short context."
        />
      </ParallaxLayer>
      <ParallaxLayer speed={8} className="project-grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </ParallaxLayer>
    </section>
  );
}

