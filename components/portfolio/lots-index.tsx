"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { EASE, projects } from "@/lib/portfolio-data";
import { usePreferences } from "@/lib/preferences";
import { cn } from "@/lib/utils";
import { LotEntry } from "./lot-entry";
import { Plate } from "./plate";
import { MaskLines, SectionHead, container } from "./primitives";

export function LotsIndex() {
  const { t } = usePreferences();
  const [hover, setHover] = useState<number | null>(null);
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const lastHover = useRef(0);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 160, damping: 22, mass: 0.6 });
  const y = useSpring(my, { stiffness: 160, damping: 22, mass: 0.6 });

  if (hover !== null) lastHover.current = hover;
  const shown = hover ?? lastHover.current;
  const nextIndex = String(projects.length + 1).padStart(2, "0");

  const close = useCallback(() => {
    setHover(null);
    setOpenIdx((idx) => {
      if (idx !== null) triggers.current[idx]?.focus({ preventScroll: true });
      return null;
    });
  }, []);

  return (
    <section id="projects" className="pb-28 pt-8 md:pb-44">
      <div className={container}>
        <SectionHead no="02" title={t.nav.projects} note={t.projects.note} />

        <div className="mt-16 md:mt-24">
          <h2 className="font-serif text-[clamp(2.8rem,7vw,8rem)] leading-[0.9] tracking-[-0.035em]">
            <MaskLines
              lines={[
                t.projects.title[0],
                <span key="q" className="italic text-klein">
                  {t.projects.title[1]}
                </span>,
              ]}
            />
          </h2>
        </div>

        <ul
          className="mt-16 md:mt-24"
          onMouseMove={(e) => {
            mx.set(e.clientX);
            my.set(e.clientY);
          }}
          onMouseLeave={() => setHover(null)}
        >
          {projects.map((p, i) => {
            const copy = t.projects.copy[p.id];
            return (
              <li key={p.id} className="border-t border-ink/20">
                <button
                  ref={(el) => {
                    triggers.current[i] = el;
                  }}
                  type="button"
                  onClick={() => {
                    setHover(null);
                    setOpenIdx(i);
                  }}
                  onMouseEnter={() => setHover(i)}
                  onFocus={(e) => {
                    if (e.currentTarget.matches(":focus-visible")) setHover(i);
                  }}
                  onBlur={() => setHover(null)}
                  aria-haspopup="dialog"
                  aria-label={`${p.title} — ${copy.subtitle}. ${t.projects.open}`}
                  className={cn(
                    "group grid w-full grid-cols-12 items-baseline gap-x-4 py-7 text-left transition-opacity duration-700 md:py-10",
                    hover !== null && hover !== i && "opacity-25"
                  )}
                >
                  <span className="col-span-12 font-mono text-[12px] uppercase tracking-[0.16em] text-stone md:col-span-1">
                    {p.index}
                  </span>
                  <span className="col-span-12 mt-2 font-serif text-[clamp(3rem,6.6vw,7.6rem)] leading-[0.88] tracking-[-0.035em] transition-[color,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3 group-hover:text-klein md:col-span-5 md:mt-0 md:group-hover:translate-x-6">
                    {p.title}
                  </span>
                  <span className="col-span-12 mt-3 font-text text-lg italic leading-snug text-ink/70 md:col-span-3 md:mt-0">
                    {copy.subtitle}
                  </span>
                  <span className="col-span-6 mt-4 font-mono text-[12px] uppercase leading-relaxed tracking-[0.14em] text-stone md:col-span-1 md:mt-0">
                    {p.cloud}
                    <br />
                    {p.year}
                  </span>
                  <span className="col-span-6 mt-4 flex items-baseline justify-end gap-3 text-right font-mono text-[12px] uppercase tracking-[0.14em] md:col-span-2 md:mt-0">
                    <span>{copy.highlight}</span>
                    <ArrowUpRight
                      aria-hidden="true"
                      strokeWidth={1.25}
                      className="size-4 shrink-0 self-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-45 group-hover:text-klein"
                    />
                  </span>
                </button>
              </li>
            );
          })}
          <li className="border-y border-ink/20">
            <a
              href="#contact"
              className="group grid w-full grid-cols-12 items-baseline gap-x-4 py-7 md:py-10"
            >
              <span className="col-span-12 font-mono text-[12px] uppercase tracking-[0.16em] text-stone md:col-span-1">
                {nextIndex}
              </span>
              <span className="col-span-12 mt-2 font-serif text-[clamp(3rem,6.6vw,7.6rem)] italic leading-[0.88] tracking-[-0.035em] text-klein transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3 md:col-span-5 md:mt-0 md:group-hover:translate-x-6">
                {t.projects.next.title}
              </span>
              <span className="col-span-12 mt-3 font-text text-lg italic leading-snug text-ink/80 md:col-span-3 md:mt-0">
                {t.projects.next.text}
              </span>
              <span className="col-span-6 mt-4 font-mono text-[12px] uppercase leading-relaxed tracking-[0.14em] text-stone md:col-span-1 md:mt-0">
                AWS
                <br />
                2027
              </span>
              <span className="col-span-6 mt-4 flex items-baseline justify-end gap-3 font-mono text-[12px] uppercase tracking-[0.14em] md:col-span-2 md:mt-0">
                <span className="relative">
                  {t.projects.next.cta}
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                  />
                </span>
              </span>
            </a>
          </li>
        </ul>
      </div>

      <motion.div
        aria-hidden="true"
        style={{ x, y }}
        className="pointer-events-none fixed left-0 top-0 z-40 hidden [@media(pointer:fine)]:block"
      >
        <motion.div
          animate={
            hover !== null && openIdx === null
              ? { clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }
              : { clipPath: "inset(50% 0% 50% 0%)", opacity: 0 }
          }
          initial={{ clipPath: "inset(50% 0% 50% 0%)", opacity: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="ml-10 w-[min(400px,30vw)] -translate-y-1/2 border border-ink/25 bg-paper shadow-[0_40px_80px_-30px_rgba(17,17,17,0.45)]"
        >
          <div className="aspect-[640/420] p-3">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={shown}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="h-full w-full"
              >
                <Plate
                  diagram={projects[shown].diagram}
                  title={projects[shown].title}
                  animateIn={false}
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex justify-between border-t border-ink/15 px-3 py-2 font-mono text-[9.5px] uppercase tracking-[0.15em] text-stone">
            <span>{`${t.projects.schematic} ${projects[shown].index}`}</span>
            <span>{projects[shown].title}</span>
          </div>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {openIdx !== null && (
          <LotEntry
            key="entry"
            index={openIdx}
            onClose={close}
            onNavigate={setOpenIdx}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
