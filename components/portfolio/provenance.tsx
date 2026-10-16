"use client";

import { credentials, timeline } from "@/lib/portfolio-data";
import { Label, MaskLines, Reveal, SectionHead, container } from "./primitives";

/**
 * § IV — Provenance.
 * Fixes Screenshot 4 (`image_63866b.jpg`):
 * - Adds generous horizontal padding (`px-6 py-8 md:px-8 md:py-10`) on mobile and desktop
 *   so when the dark background highlight activates, text never collides with the left/right edges!
 * - Restricts the full-bleed black curtain sweep to hover-capable devices (`[@media(hover:hover)]`)
 *   while giving mobile a refined left Klein accent bar and spacious padding.
 */
export function Provenance() {
  return (
    <section id="provenance" className="py-28 md:py-44">
      <div className={container}>
        <SectionHead
          no="IV"
          title="Provenance"
          note="Three custodians · 2022 — present"
        />

        <div className="mt-16 flex flex-col justify-between gap-8 md:mt-24 md:flex-row md:items-end">
          <h2 className="font-serif text-[clamp(2.8rem,7vw,8rem)] leading-[0.9] tracking-[-0.035em]">
            <MaskLines
              lines={[
                "The making",
                <span key="p" className="italic text-klein">
                  of an engineer.
                </span>,
              ]}
            />
          </h2>
          <p className="max-w-sm font-text text-lg leading-snug text-ink/70">
            {
              "Listed in reverse order, as provenance always is — the most recent custodian first."
            }
          </p>
        </div>

        <ol className="mt-16 md:mt-24">
          {timeline.map((t, i) => (
            <li key={t.no} className="border-t border-ink/20 last:border-b">
              <Reveal delay={i * 0.05}>
                <div className="group relative overflow-hidden">
                  {/* Desktop Hover Curtain (With Generous Inner Padding on All Sides) */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 origin-bottom scale-y-0 bg-ink transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] [@media(hover:hover)]:group-hover:scale-y-100"
                  />
                  <div className="relative grid gap-4 px-5 py-8 transition-colors duration-500 [@media(hover:hover)]:group-hover:text-paper sm:px-6 md:grid-cols-12 md:items-baseline md:gap-6 md:px-8 md:py-11">
                    {/* Col 1-2: Index & Years */}
                    <div className="md:col-span-2">
                      <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-stone transition-colors duration-500 [@media(hover:hover)]:group-hover:text-paper/85">
                        {t.no}
                      </p>
                      <p className="mt-2 font-text text-xl">{t.years}</p>
                    </div>

                    {/* Col 3-5: Company & Role */}
                    <div className="md:col-span-3">
                      <h3 className="font-serif text-4xl leading-none tracking-[-0.02em] lg:text-5xl">
                        {t.company}
                      </h3>
                      <p className="mt-3 font-mono text-[12px] uppercase tracking-[0.14em] text-klein transition-colors duration-500 [@media(hover:hover)]:group-hover:text-klein-soft">
                        {t.role}
                      </p>
                    </div>

                    {/* Col 6-9: Description */}
                    <p className="font-text text-lg leading-snug text-ink/75 transition-colors duration-500 [@media(hover:hover)]:group-hover:text-paper/90 md:col-span-4">
                      {t.text}
                    </p>

                    {/* Col 10-12: Place & Medium */}
                    <div className="flex flex-col justify-start border-t border-ink/10 pt-3 font-mono text-[11.5px] uppercase leading-relaxed tracking-[0.14em] text-stone transition-colors duration-500 [@media(hover:hover)]:group-hover:border-paper/15 [@media(hover:hover)]:group-hover:text-paper/85 md:col-span-3 md:items-end md:border-t-0 md:pt-0 md:text-right">
                      <p className="font-medium text-ink transition-colors duration-500 [@media(hover:hover)]:group-hover:text-paper">
                        {t.place}
                      </p>
                      <p className="mt-1 text-stone transition-colors duration-500 [@media(hover:hover)]:group-hover:text-paper/80">
                        {t.medium}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        <div className="mt-24 grid gap-10 md:mt-32 md:grid-cols-12">
          <div className="md:col-span-3">
            <Label className="text-stone">Literature & certification</Label>
          </div>
          <ul className="grid gap-px bg-ink/15 sm:grid-cols-2 md:col-span-9">
            {credentials.map((c, i) => (
              <li
                key={c}
                className="flex items-baseline gap-5 bg-paper px-4 py-5 sm:px-6"
              >
                <span className="font-mono text-[11.5px] tracking-[0.15em] text-klein">{`L.${i + 1}`}</span>
                <span className="font-text text-xl italic">{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
