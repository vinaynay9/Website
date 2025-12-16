"use client";

import { SectionHeader } from "@/components/SectionHeader";
import { TimelineItem } from "@/components/TimelineItem";
import { timeline } from "@/data/timeline";

export const metadata = {
  title: "Timeline · Vinay",
  description: "Milestones tracing Tampa roots, Georgia Tech, startups, internships, and the present."
};

export default function TimelinePage() {
  return (
    <section className="space-y-10">
      <SectionHeader
        eyebrow="Timeline"
        title="Life story"
        description="A calm scroll through every honest chapter."
      />
      <div className="space-y-6">
        {timeline.map((item) => (
          <TimelineItem key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}

