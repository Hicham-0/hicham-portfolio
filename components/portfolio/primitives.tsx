"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { EASE } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

export const container = "mx-auto w-full max-w-[1800px] px-5 md:px-10";

export function Label({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "font-mono text-[12px] uppercase leading-relaxed tracking-[0.16em]",
        className
      )}
    >
      {children}
    </p>
  );
}

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-6% 0px" }}
      transition={{ duration: 1.05, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Fixed MaskLines:
 * Attaches IntersectionObserver (`useInView`) to the stationary outer `<span ref={ref}>`
 * rather than the translated inner children, guaranteeing that Line 1 and Line 2
 * ALWAYS animate into view together on both desktop and mobile.
 */
export function MaskLines({
  lines,
  className,
  delay = 0,
  stagger = 0.12,
  immediate = false,
}: {
  lines: ReactNode[];
  className?: string;
  delay?: number;
  stagger?: number;
  immediate?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });
  const shouldShow = immediate || inView;

  return (
    <span ref={ref} className={cn("block", className)}>
      {lines.map((line, i) => (
        <span
          key={i}
          className="-mb-[0.14em] block overflow-hidden pb-[0.14em]"
        >
          <motion.span
            className="block will-change-transform"
            initial={{ y: "108%" }}
            animate={shouldShow ? { y: "0%" } : { y: "108%" }}
            transition={{
              duration: 1.25,
              delay: shouldShow ? delay + i * stagger : 0,
              ease: EASE,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function SectionHead({
  no,
  title,
  note,
  tone = "ink",
}: {
  no: string;
  title: string;
  note: string;
  tone?: "ink" | "paper";
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        tone === "paper" ? "text-paper" : "text-ink"
      )}
    >
      <motion.div
        aria-hidden="true"
        className={cn(
          "h-px w-full origin-left",
          tone === "ink" ? "bg-ink/25" : "bg-paper/35"
        )}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: EASE }}
      />
      <div className="flex items-baseline justify-between gap-6 font-mono text-[12px] uppercase tracking-[0.16em]">
        <span>
          {"§ "}
          {no}
          <span className="md:hidden">{` — ${title}`}</span>
        </span>
        <span className="hidden md:block">{title}</span>
        <span
          className={cn(
            "hidden sm:block",
            tone === "ink" ? "text-stone" : "text-paper/80"
          )}
        >
          {note}
        </span>
      </div>
    </div>
  );
}
