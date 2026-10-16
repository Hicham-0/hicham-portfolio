"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { container } from "./primitives";

/**
 * Multi-Layer Volumetric Cloud & Stratospheric Horizon Passage ("From Rabat, building the quiet systems...").
 * - Fixes the coordinate offset bug that hid clouds on wide laptop screens: gradients are now
 *   drawn in local `(0, 0)` coordinates after `ctx.translate(cx, cy)` and scaled proportionally
 *   to viewport width (`w`) so both 1920px laptops and 393px phones see rich, realistic
 *   drifting cumulus strata, atmospheric waves, and parting cloud curtains.
 */
export function SkyPassage() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const quoteY = useTransform(scrollYProgress, [0.15, 0.85], ["16%", "-12%"]);
  const quoteOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.35, 0.75, 0.95],
    [0, 1, 1, 0.25]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let rafId = 0;

    // 24 multi-layered volumetric cloud banks + horizon strata waves
    const cloudBanks = Array.from({ length: 24 }, (_, i) => ({
      xNorm: (i / 24) * 1.4 - 0.2,
      yNorm: 0.18 + ((i * 41) % 72) / 100,
      widthFactor: 0.26 + (i % 5) * 0.085,
      aspect: 0.22 + (i % 4) * 0.06,
      speed: (i % 2 === 0 ? 1 : -1) * (0.000028 + (i % 4) * 0.000012),
      alpha: 0.07 + (i % 4) * 0.025,
      tint: i % 3, // 0 = glacial blue, 1 = sunlit ivory mist, 2 = soft twilight slate
      phase: i * 1.7,
    }));

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = Math.max(1, rect.width);
      h = Math.max(1, rect.height);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const draw = (now: number) => {
      ctx.clearRect(0, 0, w, h);
      const s = scrollYProgress.get();

      // 1. Draw flowing atmospheric horizon wave ribbons across full width
      for (let band = 0; band < 5; band++) {
        const baseY = h * (0.28 + band * 0.14) - (s - 0.5) * 60;
        const amp = 18 + band * 8;
        const freq = (Math.PI * 2) / Math.max(400, w * 0.75);
        const phase = now * 0.00045 * (band % 2 === 0 ? 1 : -1) + band * 1.3;

        const waveGrad = ctx.createLinearGradient(0, baseY - 80, 0, baseY + 110);
        waveGrad.addColorStop(0, "rgba(180, 190, 255, 0)");
        waveGrad.addColorStop(
          0.45,
          band % 2 === 0
            ? "rgba(180, 190, 255, 0.075)"
            : "rgba(236, 235, 230, 0.06)"
        );
        waveGrad.addColorStop(1, "rgba(11, 13, 19, 0)");

        ctx.fillStyle = waveGrad;
        ctx.beginPath();
        ctx.moveTo(0, baseY + 140);
        for (let x = 0; x <= w; x += Math.max(12, w / 60)) {
          const y =
            baseY +
            Math.sin(x * freq + phase) * amp +
            Math.cos(x * freq * 0.5 - phase * 0.7) * (amp * 0.6);
          ctx.lineTo(x, y);
        }
        ctx.lineTo(w, baseY + 140);
        ctx.closePath();
        ctx.fill();
      }

      // 2. Draw volumetric multi-puff cumulus cloud banks in local (0, 0) space!
      for (let i = 0; i < cloudBanks.length; i++) {
        const c = cloudBanks[i];
        let wrappedX = (c.xNorm + now * c.speed) % 1.4;
        if (wrappedX < -0.2) wrappedX += 1.4;

        const cx = wrappedX * w;
        const parallaxY = (s - 0.5) * (85 + (i % 3) * 35);
        const bobY = Math.sin(now * 0.0006 + c.phase) * 12;
        const cy = c.yNorm * h - parallaxY + bobY;

        // Scale cloud width proportionally to screen width (both mobile & laptop!)
        const rx = Math.max(150, w * c.widthFactor);
        const ry = rx * c.aspect;

        ctx.save();
        ctx.translate(cx, cy);
        ctx.scale(1, ry / rx);

        // FIXED: Gradient centered at (0, 0) inside the translated coordinate system!
        const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, rx);
        if (c.tint === 0) {
          grad.addColorStop(0, `rgba(180, 190, 255, ${(c.alpha * 1.65).toFixed(3)})`);
          grad.addColorStop(0.48, `rgba(140, 165, 235, ${(c.alpha * 0.75).toFixed(3)})`);
        } else if (c.tint === 1) {
          grad.addColorStop(0, `rgba(236, 235, 230, ${(c.alpha * 1.5).toFixed(3)})`);
          grad.addColorStop(0.5, `rgba(200, 208, 230, ${(c.alpha * 0.7).toFixed(3)})`);
        } else {
          grad.addColorStop(0, `rgba(120, 145, 225, ${(c.alpha * 1.4).toFixed(3)})`);
          grad.addColorStop(0.5, `rgba(45, 65, 130, ${(c.alpha * 0.65).toFixed(3)})`);
        }
        grad.addColorStop(1, "rgba(11, 13, 19, 0)");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(0, 0, rx, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      if (!reduce) {
        rafId = requestAnimationFrame(draw);
      }
    };

    rafId = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, [scrollYProgress]);

  return (
    <section
      ref={sectionRef}
      aria-label="Passage from Rabat to the global cloud"
      className="relative overflow-hidden py-36 text-paper md:py-56"
      style={{
        background:
          "linear-gradient(180deg, #ecebe6 0%, #aeb4c4 14%, #2c3548 36%, #111622 68%, #0b0d13 100%)",
      }}
    >
      {/* Live Full-Width Volumetric Clouds Canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
      />

      <motion.div
        style={{ y: quoteY, opacity: quoteOpacity }}
        className={container}
      >
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <blockquote className="font-serif text-[clamp(2.2rem,5vw,5.25rem)] font-normal leading-[1.04] tracking-[-0.03em] text-paper [text-shadow:0_8px_32px_rgba(11,13,19,0.65)]">
            “From Rabat, building{" "}
            <span className="italic text-klein-soft">the quiet systems</span>{" "}
            that let ideas travel{" "}
            <span className="italic text-klein-soft">without borders.</span>”
          </blockquote>
        </div>
      </motion.div>
    </section>
  );
}
