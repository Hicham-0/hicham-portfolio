"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { EASE, projects } from "@/lib/portfolio-data";
import { Plate } from "./plate";
import { Label, MaskLines } from "./primitives";

const ROMAN = ["I", "II", "III", "IV", "V", "VI"];

function Rise({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.0, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Full-Screen Lot Monograph Modal.
 * Fixed at `z-[85]` (above `SiteHeader` `z-50`) with a solid sticky top bar,
 * an unmistakable `Close [X]` button, Escape key support, and a bottom return bar
 * so the visitor is never trapped inside a project view.
 */
export function LotEntry({
  index,
  onClose,
  onNavigate,
}: {
  index: number;
  onClose: () => void;
  onNavigate: (i: number) => void;
}) {
  const p = projects[index];
  const n = projects.length;
  const prev = (index - 1 + n) % n;
  const next = (index + 1) % n;
  const scrollRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate(next);
      if (e.key === "ArrowLeft") onNavigate(prev);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onNavigate, next, prev]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [index]);

  const details = [
    { k: "Commissioned by", v: p.client },
    { k: "Role", v: p.role },
    { k: "Estate", v: p.cloud },
    { k: "Year", v: p.year },
  ];

  return (
    <motion.div
      ref={scrollRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="lot-title"
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
      animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
      exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
      transition={{ duration: 0.9, ease: EASE }}
      className="fixed inset-0 z-[85] overflow-y-auto overscroll-contain bg-paper text-ink"
    >
      {/* Sticky Top Bar (Sits cleanly above SiteHeader) */}
      <div className="sticky top-0 z-30 border-b border-ink/20 bg-paper/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-[1800px] items-center justify-between px-5 md:px-10">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.16em] text-stone transition-colors hover:text-ink"
          >
            <ArrowLeft className="size-4" />
            <span>Back to Catalogue</span>
          </button>

          <span className="hidden font-mono text-[12px] uppercase tracking-[0.16em] text-stone md:block">
            {`Catalogue Nº 26 — Lot ${p.index} / 0${n}`}
          </span>

          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close project view"
            className="group flex items-center gap-3 border border-ink/25 bg-paper px-3.5 py-1.5 font-mono text-[12px] uppercase tracking-[0.16em] text-ink transition-colors hover:border-klein hover:bg-klein hover:text-paper"
          >
            <span>Close</span>
            <X
              aria-hidden="true"
              strokeWidth={1.5}
              className="size-4 transition-transform duration-500 group-hover:rotate-90"
            />
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.article
          key={p.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.35 } }}
          className="mx-auto w-full max-w-[1800px] px-5 pb-20 pt-12 md:px-10 md:pt-20"
        >
          <div className="grid gap-10 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <Rise delay={0.2}>
                <Label className="text-klein">{`Lot ${p.index} · ${p.cloud} · ${p.year}`}</Label>
              </Rise>
              <h2
                id="lot-title"
                className="mt-6 font-serif text-[clamp(3.6rem,12vw,13.5rem)] leading-[0.84] tracking-[-0.045em]"
              >
                <MaskLines immediate delay={0.25} lines={[p.title]} />
              </h2>
              <Rise delay={0.45}>
                <p className="mt-6 font-text text-2xl italic text-ink/75 md:text-3xl">
                  {p.subtitle}
                </p>
              </Rise>
            </div>
            <Rise delay={0.55} className="md:col-span-4 md:col-start-9">
              <p className="font-text text-xl leading-snug md:text-2xl">
                {p.summary}
              </p>
            </Rise>
          </div>

          <Rise delay={0.65} className="mt-14 md:mt-20">
            <figure>
              <div className="border border-ink/20 bg-paper p-4 md:p-10">
                <div className="mx-auto aspect-[640/420] max-h-[70svh] w-full">
                  <Plate diagram={p.diagram} title={p.title} animateIn={false} />
                </div>
              </div>
              <figcaption className="mt-3 flex flex-col justify-between gap-1 font-mono text-[11.5px] uppercase tracking-[0.15em] text-stone md:flex-row">
                <span>{`Plate ${ROMAN[index]}. ${p.title}, schematic.`}</span>
                <span>Ink and Klein blue on screen · Reproduced at actual scale</span>
              </figcaption>
            </figure>
          </Rise>

          <div className="mt-20 grid gap-14 md:mt-28 md:grid-cols-12">
            <Rise delay={0.1} className="md:col-span-3">
              <dl className="flex flex-col">
                {details.map((d) => (
                  <div key={d.k} className="border-t border-ink/15 py-4">
                    <dt className="font-mono text-[11.5px] uppercase tracking-[0.16em] text-stone">
                      {d.k}
                    </dt>
                    <dd className="mt-1 font-text text-lg">{d.v}</dd>
                  </div>
                ))}
                <div className="border-y border-ink/15 py-4">
                  <dt className="font-mono text-[11.5px] uppercase tracking-[0.16em] text-stone">
                    Medium
                  </dt>
                  <dd className="mt-2 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[12px] uppercase tracking-[0.12em]">
                    {p.stack.map((s) => (
                      <span key={s}>{s}</span>
                    ))}
                  </dd>
                </div>
              </dl>
            </Rise>

            <div className="grid gap-12 md:col-span-8 md:col-start-5 md:grid-cols-2">
              <Rise delay={0.15}>
                <Label className="text-stone">The commission</Label>
                <p className="mt-4 font-text text-xl leading-relaxed first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-7xl first-letter:leading-[0.8] first-letter:text-klein">
                  {p.brief}
                </p>
              </Rise>
              <Rise delay={0.25}>
                <Label className="text-stone">The composition</Label>
                <p className="mt-4 font-text text-xl leading-relaxed text-ink/80">
                  {p.composition}
                </p>
              </Rise>
            </div>
          </div>

          <div className="mt-20 grid gap-px bg-ink/15 md:mt-28 md:grid-cols-3">
            {p.outcomes.map((o, i) => (
              <Rise
                key={o.label}
                delay={0.1 + i * 0.08}
                className="bg-paper py-8 md:px-8 md:py-10"
              >
                <p className="font-mono text-[11.5px] uppercase tracking-[0.16em] text-stone">{`Measured · 0${i + 1}`}</p>
                <p className="mt-6 font-serif text-[clamp(3.2rem,5.8vw,6.2rem)] leading-none tracking-[-0.04em]">
                  {o.value}
                </p>
                <p className="mt-3 font-text text-lg italic text-ink/70">
                  {o.label}
                </p>
              </Rise>
            ))}
          </div>

          <nav
            aria-label="Other lots"
            className="mt-24 grid border-t border-ink/20 md:grid-cols-3"
          >
            <button
              type="button"
              onClick={() => onNavigate(prev)}
              className="group flex items-center gap-5 py-8 text-left md:border-r md:border-ink/20"
            >
              <ArrowLeft
                aria-hidden="true"
                strokeWidth={1.25}
                className="size-5 transition-transform duration-700 group-hover:-translate-x-2"
              />
              <span>
                <span className="block font-mono text-[11.5px] uppercase tracking-[0.16em] text-stone">{`Previous · Lot ${projects[prev].index}`}</span>
                <span className="mt-1 block font-serif text-3xl italic transition-colors duration-500 group-hover:text-klein md:text-4xl">
                  {projects[prev].title}
                </span>
              </span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="flex items-center justify-center border-t border-ink/20 py-8 font-mono text-[12px] uppercase tracking-[0.18em] text-stone transition-colors hover:text-klein md:border-r md:border-t-0"
            >
              Return to All Lots ×
            </button>

            <button
              type="button"
              onClick={() => onNavigate(next)}
              className="group flex items-center justify-end gap-5 border-t border-ink/20 py-8 text-right md:border-t-0"
            >
              <span>
                <span className="block font-mono text-[11.5px] uppercase tracking-[0.16em] text-stone">{`Next · Lot ${projects[next].index}`}</span>
                <span className="mt-1 block font-serif text-3xl italic transition-colors duration-500 group-hover:text-klein md:text-4xl">
                  {projects[next].title}
                </span>
              </span>
              <ArrowRight
                aria-hidden="true"
                strokeWidth={1.25}
                className="size-5 transition-transform duration-700 group-hover:translate-x-2"
              />
            </button>
          </nav>
        </motion.article>
      </AnimatePresence>
    </motion.div>
  );
}
