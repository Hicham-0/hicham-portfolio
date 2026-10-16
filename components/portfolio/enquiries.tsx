"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { useRef, useState } from "react";
import { MaskLines, Reveal, SectionHead, container } from "./primitives";

const EMAIL = "mlyhichamelhanafi@gmail.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/hicham-elhanafi/";

const particulars: { k: string; v: string; href?: string }[] = [
  {
    k: "LinkedIn",
    v: "in/hicham-elhanafi",
    href: LINKEDIN_URL,
  },
  { k: "Availability", v: "6-month PFE internship · 2027" },
  { k: "Based", v: "Rabat, Morocco" },
  { k: "Languages", v: "English · Français · العربية" },
];

export function Enquiries() {
  const ref = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const markY = useTransform(scrollYProgress, [0.4, 1], ["40%", "18%"]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <section
      id="enquiries"
      ref={ref}
      className="relative overflow-hidden bg-ink pt-28 text-paper md:pt-40 [&_::selection]:bg-klein [&_::selection]:text-paper"
    >
      <div className={container}>
        <SectionHead
          no="V"
          title="Enquiries"
          note="Open to a 6-month internship (PFE)"
          tone="paper"
        />

        <h2 className="mt-16 font-serif text-[clamp(2.6rem,7vw,8rem)] leading-[0.92] tracking-[-0.035em] text-paper md:mt-24">
          <MaskLines
            lines={[
              <span key="l1" className="text-paper">
                For enquiries regarding
              </span>,
              <span key="l2" className="italic text-klein-soft">
                any lot, write.
              </span>,
            ]}
          />
        </h2>

        <div className="mt-14 grid gap-14 md:mt-20 lg:grid-cols-12">
          <Reveal className="min-w-0 lg:col-span-7">
            <a
              href={`mailto:${EMAIL}`}
              className="group inline-flex max-w-full items-baseline gap-3 break-all font-serif text-[clamp(1.1rem,2.75vw,3.1rem)] leading-none text-paper sm:break-normal"
            >
              <span className="relative">
                {EMAIL}
                <span
                  aria-hidden="true"
                  className="absolute -bottom-2 left-0 h-px w-full origin-left scale-x-[0.18] bg-klein-soft transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                />
              </span>
              <ArrowUpRight
                aria-hidden="true"
                strokeWidth={1}
                className="size-[0.6em] shrink-0 self-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-45 group-hover:text-klein-soft"
              />
            </a>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2.5 border border-paper/25 px-4 py-2 font-mono text-[11.5px] uppercase tracking-[0.16em] text-paper/85 transition-colors hover:border-klein-soft hover:text-klein-soft"
              >
                {copied ? (
                  <>
                    <Check className="size-3.5 text-klein-soft" />
                    <span>Address copied to clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3.5" />
                    <span>Copy email address</span>
                  </>
                )}
              </button>

              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 border border-paper/25 px-4 py-2 font-mono text-[11.5px] uppercase tracking-[0.16em] text-paper/85 transition-colors hover:border-klein-soft hover:text-klein-soft"
              >
                <span>LinkedIn</span>
                <ArrowUpRight className="size-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="min-w-0 lg:col-span-4 lg:col-start-9">
            <ul className="flex flex-col">
              {particulars.map((c) => (
                <li
                  key={c.k}
                  className="border-t border-paper/20 last:border-b"
                >
                  {c.href ? (
                    <a
                      href={c.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col justify-between gap-1 py-4 sm:flex-row sm:items-baseline"
                    >
                      <span className="font-mono text-[12px] uppercase tracking-[0.16em] text-paper/70">
                        {c.k}
                      </span>
                      <span className="inline-flex items-center gap-1.5 font-text text-lg text-paper transition-colors duration-500 group-hover:text-klein-soft">
                        <span>{c.v}</span>
                        <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </a>
                  ) : (
                    <div className="flex flex-col justify-between gap-1 py-4 sm:flex-row sm:items-baseline">
                      <span className="font-mono text-[12px] uppercase tracking-[0.16em] text-paper/70">
                        {c.k}
                      </span>
                      <span className="font-text text-lg text-paper">{c.v}</span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <footer className="mt-28 flex flex-col gap-3 border-t border-paper/15 pt-6 font-mono text-[11.5px] uppercase tracking-[0.15em] text-paper/80 md:mt-40 md:flex-row md:justify-between">
          <span>{"© 2026 Hicham El Hanafi"}</span>
          <span>{"Rabat, Morocco"}</span>
          <a
            href="#cover"
            className="text-paper transition-colors hover:text-klein-soft"
          >
            {"Return to cover ↑"}
          </a>
        </footer>
      </div>

      <motion.p
        aria-hidden="true"
        style={{ y: markY }}
        className="pointer-events-none -mb-[0.2em] mt-10 select-none whitespace-nowrap text-center font-serif text-[27vw] italic leading-[0.8] tracking-[-0.06em] text-paper/[0.06]"
      >
        Hanafi
      </motion.p>
    </section>
  );
}
