"use client";

import type { MotionValue } from "framer-motion";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const TAU = Math.PI * 2;
const INTRO_MS = 2000;
const BUCKETS = 6;

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const smootherstep = (k: number) => k * k * k * (k * (k * 6 - 15) + 10);

function parseHex(hex: string): [number, number, number] {
  const clean = hex.replace("#", "").trim();
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean;
  const n = parseInt(full, 16);
  if (Number.isNaN(n)) return [20, 20, 20];
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function mixHex(a: string, b: string, t: number): string {
  const [ar, ag, ab] = parseHex(a);
  const [br, bg, bb] = parseHex(b);
  const r = Math.round(ar + (br - ar) * t);
  const g = Math.round(ag + (bg - ag) * t);
  const bl = Math.round(ab + (bb - ab) * t);
  return `rgb(${r}, ${g}, ${bl})`;
}

export function Halftone({
  srcs,
  progress,
  className,
}: {
  srcs: string[];
  progress?: MotionValue<number>;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 6-tier archival ink + feathered Klein cobalt palette
    const styles = getComputedStyle(document.documentElement);
    const dim = styles.getPropertyValue("--halftone-dim").trim() || "#3d3b36";
    const mid = styles.getPropertyValue("--halftone-mid").trim() || "#141414";
    const lens = styles.getPropertyValue("--halftone-lens").trim() || "#1a31d0";
    const peak = styles.getPropertyValue("--halftone-peak").trim() || "#2a46f0";
    const palette: string[] = [
      dim,
      mid,
      mixHex(mid, lens, 0.28),
      mixHex(mid, lens, 0.62),
      lens,
      peak,
    ];

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let gap = 5.4;
    let cols = 0;
    let rows = 0;
    let lensR = 210;
    let tones = new Float32Array(0);
    let bucketData: Float32Array[] = Array.from(
      { length: BUCKETS },
      () => new Float32Array(0)
    );
    const bucketCounts = new Int32Array(BUCKETS);
    let image: HTMLImageElement | null = null;
    let start = 0;
    let raf = 0;
    let visible = true;
    let isPointerInside = false;
    const mouse = { x: 0, y: 0, tx: 0, ty: 0, s: 0, ts: 0, seen: false };

    const sample = () => {
      if (!w || !h || !image) return;
      cols = Math.ceil(w / gap) + 1;
      rows = Math.ceil(h / gap) + 1;
      const off = document.createElement("canvas");
      off.width = cols;
      off.height = rows;
      const o = off.getContext("2d", { willReadFrequently: true });
      if (!o) return;

      const total = cols * rows;
      const nextTones = new Float32Array(total);
      o.fillStyle = "#fff";
      o.fillRect(0, 0, cols, rows);
      const fit = w < 768 ? Math.min : Math.max;
      const scale = fit(cols / image.width, rows / image.height) * 0.96;
      const iw = image.width * scale;
      const ih = image.height * scale;
      o.drawImage(image, (cols - iw) / 2, (rows - ih) / 2, iw, ih);
      const data = o.getImageData(0, 0, cols, rows).data;

      // Crisp tonal curve: drops faint paper haze cleanly while sharpening gear teeth & bridges.
      const gamma = w < 768 ? 1.18 : 1.06;
      for (let i = 0; i < total; i++) {
        const lum =
          (0.299 * data[i * 4] +
            0.587 * data[i * 4 + 1] +
            0.114 * data[i * 4 + 2]) /
          255;
        const raw = 1 - lum;
        nextTones[i] =
          raw < 0.06 ? 0 : Math.pow(clamp01((raw - 0.05) / 0.88), gamma);
      }

      tones = nextTones;
      bucketData = Array.from(
        { length: BUCKETS },
        () => new Float32Array(total * 3)
      );
    };

    const draw = (now: number) => {
      if (!visible || !tones.length) {
        raf = requestAnimationFrame(draw);
        return;
      }
      if (!start) start = now;

      const t = reduce ? 1 : clamp01((now - start) / INTRO_MS);

      // Gentle horological grazing orbit when cursor is outside the movement
      if (!isPointerInside && !reduce) {
        mouse.tx = w * (0.52 + 0.21 * Math.cos(now * 0.00085));
        mouse.ty = h * (0.48 + 0.21 * Math.sin(now * 0.0011));
        mouse.ts = 0.82;
        if (!mouse.seen) {
          mouse.x = mouse.tx;
          mouse.y = mouse.ty;
          mouse.seen = true;
        }
      }

      mouse.x += (mouse.tx - mouse.x) * 0.14;
      mouse.y += (mouse.ty - mouse.y) * 0.14;
      mouse.s += (mouse.ts - mouse.s) * 0.1;

      const scroll = progress?.get() ?? 0;
      const scrollCloudPart = clamp01(scroll * 1.35);
      const fade = 1 - clamp01(scroll * 1.2);
      const maxR = gap * (w < 768 ? 0.56 : 0.55);

      ctx.clearRect(0, 0, w, h);
      bucketCounts.fill(0);

      const centerX = w * 0.5;
      const centerY = h * 0.5;
      const lensR2 = lensR * lensR;
      const push = w < 768 ? 4 : 7;

      for (let row = 0; row < rows; row++) {
        const offset = row % 2 ? gap / 2 : 0;
        const rowBase = row * cols;
        for (let col = 0; col < cols; col++) {
          const idx = rowBase + col;
          const tone = tones[idx];
          if (tone < 0.06) continue;

          let x = col * gap + offset;
          let y = row * gap;

          if (scrollCloudPart > 0.01) {
            const cdx = x - centerX;
            const cdy = y - centerY;
            x += cdx * scrollCloudPart * 0.55;
            y += cdy * scrollCloudPart * 0.35 - scrollCloudPart * 45;
          }

          const delay = ((w - x) / w) * 0.5 + (y / h) * 0.28;
          const local = easeOut(clamp01(t * 1.85 - delay));
          let r = tone * maxR * local * fade;
          let falloff = 0;

          if (mouse.s > 0.01) {
            const dx = x - mouse.x;
            const dy = y - mouse.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < lensR2) {
              const d = Math.sqrt(d2) || 1;
              const k = 1 - d / lensR;
              falloff = smootherstep(k) * mouse.s;
              // Magnify only existing gear structure — never invent dots in blank space
              r *= 1 + falloff * 0.34;
              x += (dx / d) * falloff * push;
              y += (dy / d) * falloff * push;
            }
          }

          if (r < 0.22) continue;

          // Choose tonal bucket with subtle organic grain dither so the loupe has zero hard circle edge
          let b = tone >= 0.44 ? 1 : 0;
          if (falloff > 0.04) {
            const hash = (((idx * 2654435761) >>> 24) / 255 - 0.5) * 0.16;
            const lumBoost = clamp01(falloff * 1.15 + hash);
            if (lumBoost > 0.78 && tone > 0.38) b = 5;
            else if (lumBoost > 0.54) b = 4;
            else if (lumBoost > 0.30) b = 3;
            else if (lumBoost > 0.12) b = 2;
          }

          const c = bucketCounts[b];
          const arr = bucketData[b];
          arr[c * 3] = x;
          arr[c * 3 + 1] = y;
          arr[c * 3 + 2] = r;
          bucketCounts[b] = c + 1;
        }
      }

      for (let b = 0; b < BUCKETS; b++) {
        const count = bucketCounts[b];
        if (!count) continue;
        const arr = bucketData[b];
        ctx.fillStyle = palette[b];
        ctx.beginPath();
        for (let i = 0; i < count; i++) {
          const x = arr[i * 3];
          const y = arr[i * 3 + 1];
          const r = arr[i * 3 + 2];
          ctx.moveTo(x + r, y);
          ctx.arc(x, y, r, 0, TAU);
        }
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      if (!w || !h) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      gap = w < 640 ? 3.2 : w < 1024 ? 4.6 : 5.4;
      lensR = w < 640 ? 96 : w < 1024 ? 150 : 210;
      sample();
    };

    const aim = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const inside = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
      isPointerInside = inside;
      if (inside) {
        mouse.tx = x;
        mouse.ty = y;
        if (!mouse.seen) {
          mouse.x = x;
          mouse.y = y;
          mouse.seen = true;
        }
        mouse.ts = 1;
      }
    };

    const onMouseMove = (e: MouseEvent) => aim(e.clientX, e.clientY);
    const onPointerMove = (e: PointerEvent) => aim(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => {
      const tp = e.touches[0];
      if (tp) aim(tp.clientX, tp.clientY);
    };
    const onTouchEnd = () => {
      isPointerInside = false;
    };
    const onLeave = () => {
      isPointerInside = false;
    };

    const primarySrc = srcs[0] || "/images/movement.webp";
    const img = new Image();
    const handleImageLoaded = () => {
      image = img;
      start = 0;
      resize();
    };
    img.onload = handleImageLoaded;
    img.src = primarySrc;
    if (img.complete && img.naturalWidth > 0) {
      handleImageLoaded();
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    io.observe(canvas);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerover", onPointerMove, { passive: true });
    window.addEventListener("touchstart", onTouch, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerover", onPointerMove);
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchend", onTouchEnd);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [srcs.join("|")]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn("block h-full w-full touch-pan-y", className)}
    />
  );
}
