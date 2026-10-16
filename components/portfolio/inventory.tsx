"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { EASE, inventory } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";
import { MaskLines, SectionHead, container } from "./primitives";

export function Inventory() {
  const [active, setActive] = useState(0);
  const item = inventory[active];
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let w = 0;
    let h = 0;
    let rafId = 0;

    const wisps = Array.from({ length: 12 }, (_, i) => ({
      x: (i / 12) * 1.2,
      y: 0.15 + ((i * 29) % 70) / 100,
      r: 220 + (i % 4) * 75,
      speed: 0.00003 + (i % 3) * 0.000015,
    }));

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = canvas.width = Math.max(1, rect.width);
      h = canvas.height = Math.max(1, rect.height);
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const draw = (now: number) => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < wisps.length; i++) {
        const c = wisps[i];
        const cx = ((c.x + now * c.speed) % 1.3 - 0.15) * w;
        const cy = c.y * h + Math.sin(now * 0.0004 + i) * 18;
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, c.r);
        grad.addColorStop(0, "rgba(180, 190, 255, 0.05)");
        grad.addColorStop(0.55, "rgba(26, 49, 208, 0.025)");
        grad.addColorStop(1, "rgba(11, 13, 19, 0)");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, c.r, 0, Math.PI * 2);
        ctx.fill();
      }
      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      id="inventory"
      className="relative overflow-hidden bg-night-sky py-28 text-paper md:py-40 [&_::selection]:bg-paper [&_::selection]:text-night-sky"
    >
      {/* Subtle Live Drifting Stratospheric Cloud Wisps */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
      />

      <div className={cn(container, "relative z-10")}>
        <SectionHead
          no="III"
          title="Inventory"
          note="Five estates, as catalogued"
          tone="paper"
        />

        <h2 className="mt-16 max-w-5xl font-serif text-[clamp(2.6rem,6vw,6.8rem)] leading-[0.92] tracking-[-0.035em] text-paper md:mt-24">
          <MaskLines
            lines={[
              <span key="line1" className="text-paper">
                Everything in the cabinet,
              </span>,
              <span key="line2" className="italic text-klein-soft">
                catalogued.
              </span>,
            ]}
          />
        </h2>

        <div className="mt-16 grid gap-12 md:mt-24 md:grid-cols-12">
          <div role="tablist" aria-label="Estates" className="md:col-span-4">
            {inventory.map((it, i) => (
              <button
                key={it.id}
                type="button"
                role="tab"
                id={`tab-${it.id}`}
                aria-selected={active === i}
                aria-controls="inv-panel"
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                className={cn(
                  "flex w-full items-baseline gap-4 border-t border-paper/25 py-5 text-left transition-all duration-500",
                  active === i
                    ? "text-klein-soft opacity-100"
                    : "text-paper/70 hover:text-paper hover:opacity-100"
                )}
              >
                <span className="font-mono text-[11.5px] tracking-[0.15em]">{`0${i + 1}`}</span>
                <span className="font-text text-2xl md:text-3xl">{it.label}</span>
              </button>
            ))}
            <div aria-hidden="true" className="border-t border-paper/25" />
          </div>

          <div
            id="inv-panel"
            role="tabpanel"
            aria-labelledby={`tab-${item.id}`}
            className="min-h-[22rem] md:col-span-8"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <p className="font-serif text-[clamp(4.2rem,13vw,15rem)] leading-[0.9] tracking-[-0.05em] text-paper">
                  {item.word}
                </p>
                <p className="mt-8 max-w-xl font-text text-xl italic leading-snug text-paper/90">
                  {item.text}
                </p>
                <ul className="mt-8 flex flex-wrap gap-2 font-mono text-[12px] uppercase tracking-[0.16em]">
                  {item.items.map((s) => (
                    <li
                      key={s}
                      className="border border-paper/45 px-3 py-1.5 text-paper"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
