"use client";

import { SectionHeader } from "@/components/SectionHeader";
import { TimelineItem } from "@/components/TimelineItem";
import { timeline } from "@/data/timeline";
import { ParallaxLayer } from "@/components/motion/ParallaxLayer";

export default function TimelineClient() {
  return (
    <section className="space-y-10 px-4 py-10">
      <ParallaxLayer speed={14}>
        <SectionHeader
          eyebrow="Timeline"
          title="Life story"
          description="A calm scroll through every honest chapter."
        />
      </ParallaxLayer>
      <div className="space-y-6">
        {timeline.map((item) => (
          <ParallaxLayer key={item.id} speed={6}>
            <TimelineItem item={item} />
          </ParallaxLayer>
        ))}
      </div>
    </section>
  );
}

