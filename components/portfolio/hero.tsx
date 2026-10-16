"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { useRef } from "react";
import { EASE } from "@/lib/portfolio-data";
import { Halftone } from "./halftone";
import { Label, MaskLines } from "./primitives";

const PLATES = ["/images/movement.webp"];

const particulars = [
  { k: "Discipline", v: "Cloud infrastructure & DevOps" },
  { k: "Estates", v: "AWS · Terraform · Docker" },
  { k: "Practice", v: "Rabat, Morocco" },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-22%"]);
  const metaOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const cloudMistOpacity = useTransform(scrollYProgress, [0.35, 0.95], [0, 0.9]);
  const cloudMistScale = useTransform(scrollYProgress, [0.3, 1], [0.95, 1.35]);

  return (
    <section id="cover" ref={ref} className="relative min-h-svh overflow-hidden">
      <div className="relative z-10 mx-auto flex min-h-svh w-full max-w-[1800px] flex-col px-5 pb-6 pt-20 md:px-10 md:pb-10 md:pt-28">
        <motion.div
          style={{ opacity: metaOpacity }}
          className="flex items-start justify-between gap-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 2.9, ease: EASE }}
            className="max-w-sm"
          >
            <Label className="text-stone">
              {"Sale Nº 26 · The Evening Session"}
            </Label>
            <p className="mt-3 font-serif text-[1.75rem] leading-[1.08] md:mt-4 md:text-[2.1rem]">
              Hicham El Hanafi
              <br />
              <span className="italic text-stone">
                {"Cloud & DevOps Engineer"}
              </span>
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, delay: 3.1, ease: EASE }}
            className="hidden max-w-[17rem] bg-paper/95 px-2 py-1 text-right font-mono text-[12px] uppercase leading-relaxed tracking-[0.14em] text-stone md:block"
          >
            {"Fig. 0 — A movement, keeping time."}
            <br />
            {"Infrastructure should do the same, without supervision."}
          </motion.p>
        </motion.div>

        {/* High-Definition Horological Movement Canvas (340px tall on mobile so watch details shine) */}
        <div
          aria-hidden="true"
          className="relative my-4 h-[38svh] min-h-[290px] w-full md:absolute md:inset-y-0 md:left-auto md:right-[-4%] md:-z-10 md:my-0 md:h-auto md:w-[62%] md:[mask-image:linear-gradient(to_right,transparent,black_34%),linear-gradient(to_bottom,black_58%,transparent_90%)] md:[mask-composite:intersect] md:[-webkit-mask-composite:source-in]"
        >
          <Halftone srcs={PLATES} progress={scrollYProgress} />
        </div>

        <motion.div style={{ y: titleY }} className="mt-auto pt-4 md:pt-16">
          <h1 className="font-serif text-[clamp(3.2rem,11.4vw,15.5rem)] font-normal leading-[0.84] tracking-[-0.04em] [text-shadow:0_0_36px_rgba(236,235,230,0.95)]">
            <MaskLines
              immediate
              delay={2.95}
              stagger={0.14}
              lines={[
                "Infrastructure,",
                <span key="c" className="italic text-klein">
                  considered.
                </span>,
              ]}
            />
          </h1>
        </motion.div>

        <div className="relative mt-8 md:mt-14">
          <motion.div
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.8, delay: 3.1, ease: EASE }}
            className="h-px origin-left bg-ink/25"
          />
          <div className="grid grid-cols-1 gap-x-6 gap-y-5 pt-5 sm:grid-cols-2 md:grid-cols-4">
            {particulars.map((p, i) => (
              <motion.div
                key={p.k}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 3.25 + i * 0.08, ease: EASE }}
              >
                <Label className="text-stone">{p.k}</Label>
                <p className="mt-1 font-text text-base leading-snug md:mt-1.5 md:text-lg">
                  {p.v}
                </p>
              </motion.div>
            ))}
            <motion.a
              href="#lots"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 3.5, ease: EASE }}
              className="group flex items-end justify-between gap-4 border-ink pt-2 sm:col-span-2 md:col-span-1 md:pt-0"
            >
              <span className="flex flex-col">
                <Label className="text-klein">Lots I — II</Label>
                <span className="relative mt-1 font-text text-2xl italic md:text-[1.75rem]">
                  Explore the architecture
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-100 bg-ink transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:origin-left group-hover:scale-x-0"
                  />
                </span>
              </span>
              <span className="flex size-12 shrink-0 items-center justify-center bg-ink text-paper transition-colors duration-500 group-hover:bg-klein">
                <ArrowDownRight
                  aria-hidden="true"
                  strokeWidth={1.25}
                  className="size-5 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-rotate-45"
                />
              </span>
            </motion.a>
          </div>
        </div>
      </div>

      {/* Smooth Parting Mist Veil on Scroll */}
      <motion.div
        aria-hidden="true"
        style={{ opacity: cloudMistOpacity, scale: cloudMistScale }}
        className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-paper via-paper/80 to-transparent"
      />
    </section>
  );
}
