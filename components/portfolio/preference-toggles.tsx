"use client";

import type { Lang } from "@/lib/content";
import { usePreferences } from "@/lib/preferences";
import { cn } from "@/lib/utils";

type Tone = "header" | "drawer";

/** Minimal EN / FR language switcher. */
export function LangToggle({ tone = "header" }: { tone?: Tone }) {
  const { lang, setLang, t } = usePreferences();
  const options: { value: Lang; short: string; label: string }[] = [
    { value: "en", short: "EN", label: t.header.english },
    { value: "fr", short: "FR", label: t.header.french },
  ];

  return (
    <div
      role="group"
      aria-label={t.header.langGroup}
      className={cn(
        "inline-flex items-center gap-0.5 border p-0.5",
        tone === "header" ? "border-ink/20" : "border-paper/25"
      )}
    >
      {options.map((o) => {
        const pressed = lang === o.value;
        return (
          <button
            key={o.value}
            type="button"
            aria-pressed={pressed}
            aria-label={o.label}
            title={o.label}
            onClick={() => setLang(o.value)}
            className={cn(
              "inline-flex items-center px-2 py-1 font-mono text-[11.5px] uppercase tracking-[0.14em] transition-colors duration-300 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2",
              tone === "header"
                ? pressed
                  ? "bg-ink text-paper"
                  : "text-ink/55 hover:text-ink"
                : pressed
                  ? "bg-paper text-ink"
                  : "text-paper/65 hover:text-paper"
            )}
          >
            <span lang={o.value}>{o.short}</span>
          </button>
        );
      })}
    </div>
  );
}
