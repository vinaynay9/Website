"use client";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <div className="max-w-2xl space-y-4">
      {eyebrow && (
        <p className="text-xs uppercase tracking-[0.5em] text-muted/90">{eyebrow}</p>
      )}
      <h2 className="text-4xl font-semibold uppercase tracking-[0.2em] leading-tight">
        {title}
      </h2>
      {description && (
        <p className="text-sm text-muted/90 leading-relaxed">{description}</p>
      )}
    </div>
  );
}

