"use client";

import { ArrowUpRight, Check, Copy } from "lucide-react";
import { useState } from "react";
import { EMAIL, LINKEDIN_URL } from "@/lib/portfolio-data";
import { usePreferences } from "@/lib/preferences";
import { MaskLines, Reveal, SectionHead, container } from "./primitives";

/** Official LinkedIn square glyph (24×24 viewBox). */
function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export function Enquiries() {
  const { t } = usePreferences();
  const [copied, setCopied] = useState(false);

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
      id="contact"
      className="relative overflow-hidden bg-ink pb-12 pt-24 text-paper md:pb-14 md:pt-32 [&_::selection]:bg-klein [&_::selection]:text-paper"
    >
      <div className={container}>
        <SectionHead
          no="05"
          title={t.nav.contact}
          note={t.contact.note}
          tone="paper"
        />

        <h2 className="mt-12 font-serif text-[clamp(2.6rem,7vw,8rem)] leading-[0.92] tracking-[-0.035em] text-paper md:mt-16">
          <MaskLines
            lines={[
              <span key="l1" className="text-paper">
                {t.contact.title[0]}
              </span>,
              <span key="l2" className="italic text-klein-soft">
                {t.contact.title[1]}
              </span>,
            ]}
          />
        </h2>

        <div className="mt-10 grid gap-12 md:mt-14 lg:grid-cols-12 lg:items-start">
          {/* Left column: email link + Copy Email button only */}
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

            <div className="mt-8">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2.5 border border-paper/25 px-4 py-2 font-mono text-[11.5px] uppercase tracking-[0.16em] text-paper/85 transition-colors hover:border-klein-soft hover:text-klein-soft"
              >
                {copied ? (
                  <>
                    <Check className="size-3.5 text-klein-soft" />
                    <span>{t.contact.copied}</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3.5" />
                    <span>{t.contact.copy}</span>
                  </>
                )}
              </button>
            </div>
          </Reveal>

          {/* Right column: unmistakable LinkedIn card + key details (lifted on desktop) */}
          <Reveal
            delay={0.1}
            className="min-w-0 lg:col-span-4 lg:col-start-9 lg:-mt-16"
          >
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.contact.linkedinAria}
              className="group mb-6 flex items-center justify-between gap-4 border border-klein-soft/45 bg-klein-soft/[0.08] px-5 py-4 text-paper transition-all duration-500 hover:border-klein-soft hover:bg-klein-soft/[0.16] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-klein-soft"
            >
              <span className="flex min-w-0 items-center gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center bg-klein-soft text-ink transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105">
                  <LinkedInIcon className="size-5" />
                </span>
                <span className="min-w-0">
                  <span className="block font-mono text-[11px] uppercase tracking-[0.16em] text-klein-soft">
                    {t.contact.linkedinKicker}
                  </span>
                  <span className="mt-0.5 block truncate font-text text-xl leading-snug text-paper">
                    {t.contact.linkedinHandle}
                  </span>
                </span>
              </span>
              <ArrowUpRight
                aria-hidden="true"
                strokeWidth={1.5}
                className="size-5 shrink-0 text-klein-soft transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>

            <ul className="flex flex-col">
              {t.contact.particulars.map((c) => (
                <li
                  key={c.k}
                  className="border-t border-paper/20 last:border-b"
                >
                  <div className="flex flex-col justify-between gap-1 py-4 sm:flex-row sm:items-baseline">
                    <span className="font-mono text-[12px] uppercase tracking-[0.16em] text-paper/70">
                      {c.k}
                    </span>
                    <span className="font-text text-lg text-paper">{c.v}</span>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <footer className="mt-16 flex flex-col gap-3 border-t border-paper/15 pt-6 font-mono text-[11.5px] uppercase tracking-[0.15em] text-paper/80 md:mt-24 md:flex-row md:justify-between">
          <span>{t.contact.rights}</span>
          <span>{t.contact.place}</span>
          <a
            href="#cover"
            className="text-paper transition-colors hover:text-klein-soft"
          >
            {t.contact.top}
          </a>
        </footer>
      </div>
    </section>
  );
}
