"use client";

import Image from "next/image";
import { SectionHeader } from "@/components/SectionHeader";
import { activitySections } from "@/data/activity";

export const metadata = {
  title: "Activity · Vinay",
  description: "Sports, hiking, scuba, and gym lifts — how the body follows the mind."
};

export default function ActivityPage() {
  return (
    <section className="space-y-12">
      <SectionHeader
        eyebrow="Activity"
        title="Movement chapters"
        description="Stitched-in habits and the scenic, calm focus they invite."
      />
      <div className="space-y-8">
        {activitySections.map((section) => (
          <article
            key={section.id}
            className="grid gap-6 rounded-[20px] border border-border/60 bg-surface/80 p-6 shadow-soft md:grid-cols-[1.3fr,1fr]"
          >
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.5em] text-muted">{section.badge}</p>
              <h3 className="text-3xl font-semibold">{section.title}</h3>
              <p className="text-sm text-muted">{section.subtitle}</p>
              <p className="text-base leading-relaxed text-muted">{section.description}</p>
            </div>
            <div className="relative w-full overflow-hidden rounded-[18px] border border-border/60 bg-black h-56">
              <Image
                src={section.image}
                alt={section.title}
                width={650}
                height={450}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

