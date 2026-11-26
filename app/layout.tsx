import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Newsreader, IBM_Plex_Mono } from "next/font/google";
import { PreferencesProvider } from "@/lib/preferences";
import { preferencesScript } from "@/lib/preferences-script";
import "./globals.css";

const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-bodoni",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hicham El Hanafi — Cloud & DevOps Engineer",
  description:
    "Portfolio of Hicham El Hanafi, Cloud & DevOps Engineer based in Rabat: AWS infrastructure, Terraform and zero-downtime delivery.",
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#ecebe6",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bodoniModa.variable} ${newsreader.variable} ${ibmPlexMono.variable} relative bg-paper`}
    >
      <head>
        {/* Applies the stored language before first paint (no flash). */}
        <script dangerouslySetInnerHTML={{ __html: preferencesScript }} />
      </head>
      <body className="relative antialiased">
        <PreferencesProvider>{children}</PreferencesProvider>
        <div
          aria-hidden="true"
          className="grain pointer-events-none fixed inset-0 z-[90] opacity-[0.065] mix-blend-multiply"
        />
      </body>
    </html>
  );
}
