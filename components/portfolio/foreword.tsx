"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { tenets } from "@/lib/portfolio-data";
import { Reveal, SectionHead, container } from "./primitives";

const statement =
  "Good infrastructure behaves like a *fine* *movement* — a thousand parts in service of one quiet purpose. I am learning to build cloud platforms that keep perfect time: scaling without ceremony, failing without drama, and asking *nothing* of the people who depend on them.";

const words = statement.split(" ").map((raw) => ({
  text: raw.replace(/\*/g, ""),
  emphasis: raw.startsWith("*"),
}));

function Word({
  progress,
  range,
  emphasis,
  children,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  emphasis: boolean;
  children: string;
}) {
  const opacity = useTransform(progress, range, [0.13, 1]);
  return (
    <motion.span
      style={{ opacity }}
      className={emphasis ? "italic text-klein" : undefined}
    >
      {children}
    </motion.span>
  );
}

export function Foreword() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.45"],
  });

  return (
    <section id="foreword" className="py-28 md:py-44">
      <div className={container}>
        <SectionHead no="I" title="Foreword" note="A statement of intent" />

        <div ref={ref} className="mt-16 md:mt-24">
          <p className="max-w-6xl font-serif text-[clamp(2rem,4.4vw,5.1rem)] leading-[1.06] tracking-[-0.02em]">
            {words.map((w, i) => (
              <span key={i}>
                <Word
                  progress={scrollYProgress}
                  range={[i / words.length, (i + 1) / words.length]}
                  emphasis={w.emphasis}
                >
                  {w.text}
                </Word>{" "}
              </span>
            ))}
          </p>
        </div>

        <ol className="mt-24 grid gap-px bg-ink/15 md:mt-36 md:grid-cols-2 lg:grid-cols-4">
          {tenets.map((t, i) => (
            <li key={t.title} className="bg-paper">
              <Reveal
                delay={i * 0.08}
                className="group flex h-full flex-col p-0 pb-10 pt-8 md:p-8 md:pb-12"
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-serif text-6xl leading-none transition-colors duration-700 group-hover:text-klein md:text-7xl">
                    {t.numeral}
                  </span>
                  <span className="font-mono text-[12px] uppercase tracking-[0.16em] text-stone">
                    {`Article ${i + 1}`}
                  </span>
                </div>
                <h3 className="mt-10 font-mono text-[12px] uppercase tracking-[0.14em]">
                  {t.title}
                </h3>
                <p className="mt-4 font-text text-xl leading-snug text-ink/80">
                  {t.text}
                </p>
                <div className="mt-auto pt-10">
                  <div className="h-px w-8 bg-ink transition-[width,background-color] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full group-hover:bg-klein" />
                  <p className="mt-3 font-mono text-[11.5px] uppercase tracking-[0.14em] text-stone">
                    {t.spec}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
