"use client";

import type { MotionValue } from "framer-motion";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const TAU = Math.PI * 2;
const INTRO_MS = 2000;

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

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

    const styles = getComputedStyle(document.documentElement);
    const ink = styles.getPropertyValue("--ink").trim() || "#111111";
    const klein = styles.getPropertyValue("--klein").trim() || "#1a31d0";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let gap = 7;
    let cols = 0;
    let rows = 0;
    let lensR = 165;
    let tones = new Float32Array(0);
    let lensDots = new Float32Array(0);
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

      const nextTones = new Float32Array(cols * rows);
      o.fillStyle = "#fff";
      o.fillRect(0, 0, cols, rows);
      const fit = w < 768 ? Math.min : Math.max;
      const scale = fit(cols / image.width, rows / image.height) * 0.96;
      const iw = image.width * scale;
      const ih = image.height * scale;
      o.drawImage(image, (cols - iw) / 2, (rows - ih) / 2, iw, ih);
      const data = o.getImageData(0, 0, cols, rows).data;
      for (let i = 0; i < cols * rows; i++) {
        const lum =
          (0.299 * data[i * 4] +
            0.587 * data[i * 4 + 1] +
            0.114 * data[i * 4 + 2]) /
          255;
        nextTones[i] = Math.pow(1 - lum, w < 768 ? 1.28 : 1.15);
      }
      tones = nextTones;
      lensDots = new Float32Array(cols * rows * 3);
    };

    const draw = (now: number) => {
      if (!visible || !tones.length) {
        raf = requestAnimationFrame(draw);
        return;
      }
      if (!start) start = now;

      const t = reduce ? 1 : clamp01((now - start) / INTRO_MS);

      // Automatically glide the blue lens whenever the cursor/finger is NOT inside the watch
      if (!isPointerInside && !reduce) {
        mouse.tx = w * (0.5 + 0.23 * Math.cos(now * 0.0011));
        mouse.ty = h * (0.5 + 0.23 * Math.sin(now * 0.0014));
        mouse.ts = 0.85;
        if (!mouse.seen) {
          mouse.x = mouse.tx;
          mouse.y = mouse.ty;
          mouse.seen = true;
        }
      }

      mouse.x += (mouse.tx - mouse.x) * 0.16;
      mouse.y += (mouse.ty - mouse.y) * 0.16;
      mouse.s += (mouse.ts - mouse.s) * 0.12;

      const scroll = progress?.get() ?? 0;
      const scrollCloudPart = clamp01(scroll * 1.35);
      const fade = 1 - clamp01(scroll * 1.2);
      const maxR = gap * (w < 768 ? 0.58 : 0.6);

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = ink;
      ctx.beginPath();
      let lensCount = 0;

      const centerX = w * 0.5;
      const centerY = h * 0.5;

      for (let row = 0; row < rows; row++) {
        const offset = row % 2 ? gap / 2 : 0;
        for (let col = 0; col < cols; col++) {
          const idx = row * cols + col;
          const tone = tones[idx];
          if (tone < 0.05) continue;

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
          let lens = 0;

          if (mouse.s > 0.01) {
            const dx = x - mouse.x;
            const dy = y - mouse.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < lensR * lensR) {
              const d = Math.sqrt(d2) || 1;
              const k = 1 - d / lensR;
              lens = k * k * (3 - 2 * k) * mouse.s;
              r = r * (1 + lens * 0.85) + lens * maxR * 0.15 * local * fade;
              const push = w < 768 ? 8 : 14;
              x += (dx / d) * lens * push;
              y += (dy / d) * lens * push;
            }
          }

          if (r < 0.22) continue;
          if (lens > 0.25) {
            lensDots[lensCount * 3] = x;
            lensDots[lensCount * 3 + 1] = y;
            lensDots[lensCount * 3 + 2] = r;
            lensCount++;
          } else {
            ctx.moveTo(x + r, y);
            ctx.arc(x, y, r, 0, TAU);
          }
        }
      }
      ctx.fill();

      if (lensCount) {
        ctx.fillStyle = klein;
        ctx.beginPath();
        for (let i = 0; i < lensCount; i++) {
          const x = lensDots[i * 3];
          const y = lensDots[i * 3 + 1];
          const r = lensDots[i * 3 + 2];
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
      gap = w < 640 ? 3.4 : w < 1024 ? 5.2 : 6.8;
      lensR = w < 640 ? 78 : w < 1024 ? 125 : 170;
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
