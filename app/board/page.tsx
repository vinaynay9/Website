"use client";

import { useState, type FormEvent } from "react";

import { SectionHeader } from "@/components/SectionHeader";

const board = [
  {
    name: "Maya Patel",
    role: "Operator · Systems thinker",
    note: "Holds an honest lens on founder flow."
  },
  {
    name: "Carlos Nunez",
    role: "Product + design mentor",
    note: "Calms the room and bets on craft."
  },
  {
    name: "Aditi Rao",
    role: "Venture partner",
    note: "Signals when clarity can meet risk."
  }
];

export const metadata = {
  title: "Board of Directors · Vinay",
  description: "Private list of mentors and guides.",
  robots: {
    index: false,
    follow: false
  }
};

export default function BoardPage() {
  const [passphrase, setPassphrase] = useState("");
  const [accessGranted, setAccessGranted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (passphrase.trim().toLowerCase() === "clarity") {
      setAccessGranted(true);
    }
  };

  return (
    <section className="space-y-8">
      <SectionHeader
        title="Board of Directors"
        description="Private guidance, kept quiet until the right passphrase."
      />
      {!accessGranted ? (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <p className="text-sm text-muted">
            Enter the known word to reveal the chamber.
          </p>
          <div className="flex flex-col gap-3">
            <label className="text-xs uppercase tracking-[0.5em] text-muted">
              Passphrase
            </label>
            <input
              value={passphrase}
              onChange={(event) => setPassphrase(event.target.value)}
              placeholder="clarity"
              className="rounded-[12px] border border-border/60 bg-surface/90 px-4 py-3 text-base text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
            />
            <button
              type="submit"
              className="w-max rounded-full border border-border/70 px-6 py-2 text-xs uppercase tracking-[0.4em]"
            >
              Enter
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-muted">
            These people hold the quiet accountability. Still solid ground, even while the door is open.
          </p>
          <div className="space-y-3">
            {board.map((member) => (
              <article
                key={member.name}
                className="rounded-[18px] border border-border/60 bg-surface/80 p-5 shadow-soft"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <span className="text-xs uppercase tracking-[0.5em] text-muted">Mentor</span>
                </div>
                <p className="text-sm text-muted">{member.role}</p>
                <p className="mt-2 text-sm text-muted">{member.note}</p>
              </article>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

