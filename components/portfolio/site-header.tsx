"use client";

import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { EASE } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

export const sections = [
  { id: "foreword", label: "Foreword", no: "I" },
  { id: "lots", label: "The Lots", no: "II" },
  { id: "inventory", label: "Inventory", no: "III" },
  { id: "provenance", label: "Provenance", no: "IV" },
  { id: "enquiries", label: "Enquiries", no: "V" },
];

export function SiteHeader() {
  const { scrollYProgress } = useScroll();
  const [active, setActive] = useState("cover");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const els = ["cover", ...sections.map((s) => s.id)]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const current = sections.find((s) => s.id === active);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.9, ease: EASE }}
        className="fixed inset-x-0 top-0 z-50 bg-paper/90 text-ink backdrop-blur-md"
      >
        <div className="mx-auto flex h-14 w-full max-w-[1800px] items-center justify-between gap-6 px-5 md:px-10">
          <a href="#cover" className="flex items-baseline gap-3">
            <span className="font-serif text-[1.35rem] italic leading-none text-ink">
              Hanafi<span className="text-klein">.</span>
            </span>
            <span className="hidden font-mono text-[11.5px] uppercase tracking-[0.16em] text-stone sm:inline">
              {current ? `§ ${current.no}` : "Cover"}
            </span>
          </a>

          <p className="hidden font-mono text-[12px] uppercase tracking-[0.16em] text-stone xl:block">
            {"Catalogue Nº 26 — Infrastructure, Considered"}
          </p>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-7">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    aria-current={active === s.id ? "true" : undefined}
                    className={cn(
                      "group relative font-mono text-[12px] uppercase tracking-[0.15em] transition-colors duration-500",
                      active === s.id
                        ? "text-klein"
                        : "text-ink/60 hover:text-ink"
                    )}
                  >
                    {s.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute -bottom-1.5 left-0 h-px w-full origin-left bg-current transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                        active === s.id
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      )}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="mobile-index"
            className="font-mono text-[12px] uppercase tracking-[0.16em] text-ink md:hidden"
          >
            Index
          </button>
        </div>
        <div className="relative h-px bg-ink/15">
          <motion.div
            style={{ scaleX: scrollYProgress }}
            className="absolute inset-0 origin-left bg-klein"
          />
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-index"
            role="dialog"
            aria-modal="true"
            aria-label="Catalogue index"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="fixed inset-0 z-[80] flex flex-col bg-ink px-5 pb-8 pt-4 text-paper"
          >
            <div className="flex h-10 items-center justify-between">
              <span className="font-mono text-[12px] uppercase tracking-[0.16em] text-paper/85">
                Index
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="font-mono text-[12px] uppercase tracking-[0.16em] text-paper"
              >
                Close
              </button>
            </div>
            <ol className="mt-auto flex flex-col">
              {sections.map((s, i) => (
                <motion.li
                  key={s.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.2 + i * 0.06, ease: EASE }}
                  className="border-t border-paper/15"
                >
                  <a
                    href={`#${s.id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline justify-between py-4 text-paper"
                  >
                    <span className="font-serif text-4xl italic">{s.label}</span>
                    <span className="font-mono text-[12px] tracking-[0.16em] text-paper/90">{`§ ${s.no}`}</span>
                  </a>
                </motion.li>
              ))}
            </ol>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
