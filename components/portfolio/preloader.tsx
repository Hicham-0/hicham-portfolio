"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { EASE } from "@/lib/portfolio-data";

/**
 * Cinematic Horological Entry Ceremony (~2.8s load + 1.25s silky curtain opening).
 * Features a rotating escapement dial, sweeping progress arc, live 000 -> 100 counter,
 * and masked editorial typography on warm archival paper (#ecebe6), then parts smoothly
 * into the Hero with zero jarring color flash.
 */
export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const [unmounted, setUnmounted] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setUnmounted(true);
      return;
    }

    let start: number | null = null;
    const duration = 2650; // 2.65 seconds of smooth counting & dial rotation
    let rafId = 0;

    const tick = (now: number) => {
      if (!start) start = now;
      const elapsed = now - start;
      const t = Math.min(1, elapsed / duration);
      // Smooth quintic ease-in-out
      const eased =
        t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2;
      setProgress(Math.round(eased * 100));

      if (t < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setOpen(true), 220);
        setTimeout(() => setUnmounted(true), 1550);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  if (unmounted) return null;

  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress / 100);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[100] overflow-hidden"
    >
      {/* Top Archival Curtain */}
      <motion.div
        initial={{ y: "0%" }}
        animate={open ? { y: "-102%" } : { y: "0%" }}
        transition={{ duration: 1.22, ease: EASE }}
        className="absolute inset-x-0 top-0 flex h-1/2 flex-col justify-between border-b border-ink/15 bg-paper px-6 pb-8 pt-6 will-change-transform md:px-12 md:pb-10"
      >
        <motion.div
          animate={open ? { opacity: 0, y: -10 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-stone"
        >
          <span>Catalogue Nº 26</span>
          <span>Rabat · Morocco</span>
        </motion.div>

        <motion.div
          animate={
            open
              ? { opacity: 0, scale: 0.94, y: -18 }
              : { opacity: 1, scale: 1, y: 0 }
          }
          transition={{ duration: 0.55, ease: EASE }}
          className="mx-auto flex flex-col items-center text-center"
        >
          {/* Animated Horological Escapement Dial */}
          <div className="relative flex size-32 items-center justify-center">
            <svg
              viewBox="0 0 140 140"
              className="size-full -rotate-90 overflow-visible"
            >
              {/* Outer Fine Tick Marks */}
              {Array.from({ length: 24 }).map((_, i) => {
                const angle = (i * 360) / 24;
                return (
                  <line
                    key={i}
                    x1="70"
                    y1="4"
                    x2="70"
                    y2={i % 6 === 0 ? "10" : "7"}
                    stroke="#111111"
                    strokeOpacity={i % 6 === 0 ? "0.45" : "0.2"}
                    strokeWidth="1"
                    transform={`rotate(${angle} 70 70)`}
                  />
                );
              })}

              {/* Static Track Ring */}
              <circle
                cx="70"
                cy="70"
                r={radius}
                fill="none"
                stroke="#111111"
                strokeOpacity="0.12"
                strokeWidth="1"
              />

              {/* Sweeping Klein Blue Horological Arc */}
              <circle
                cx="70"
                cy="70"
                r={radius}
                fill="none"
                stroke="#1a31d0"
                strokeWidth="1.5"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="square"
              />
            </svg>

            {/* Center Counter */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-serif text-3xl italic tracking-[-0.03em] text-ink">
                {String(progress).padStart(2, "0")}
              </span>
              <span className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-klein">
                Calibre 26
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom Archival Curtain */}
      <motion.div
        initial={{ y: "0%" }}
        animate={open ? { y: "102%" } : { y: "0%" }}
        transition={{ duration: 1.22, ease: EASE }}
        className="absolute inset-x-0 bottom-0 flex h-1/2 flex-col justify-between bg-paper px-6 pb-6 pt-8 will-change-transform md:px-12 md:pt-10"
      >
        <motion.div
          animate={open ? { opacity: 0, y: 18 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE }}
          className="mx-auto flex max-w-md flex-col items-center text-center"
        >
          <p className="font-serif text-3xl italic tracking-[-0.02em] text-ink md:text-4xl">
            Hanafi<span className="text-klein">.</span>
          </p>
          <p className="mt-2 font-text text-base italic text-stone md:text-lg">
            “A thousand parts in service of one quiet purpose.”
          </p>

          {/* Expanding Hairline Progress Bar */}
          <div className="mt-6 h-px w-48 overflow-hidden bg-ink/15">
            <div
              className="h-full bg-klein transition-all duration-75"
              style={{ width: `${progress}%` }}
            />
          </div>
        </motion.div>

        <motion.div
          animate={open ? { opacity: 0, y: 10 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-stone"
        >
          <span>Infrastructure, Considered</span>
          <span>{`${String(progress).padStart(3, "0")} %`}</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
