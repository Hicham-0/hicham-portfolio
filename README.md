# Catalogue Nº 26 — Infrastructure, Considered

**Live Production:** [https://hichamelh.qzz.io](https://hichamelh.qzz.io)  
**Author:** Hicham El Hanafi — Cloud & DevOps Engineer (Rabat, Morocco)  
**LinkedIn:** [linkedin.com/in/hicham-elhanafi](https://www.linkedin.com/in/hicham-elhanafi/)

An editorial monograph and interactive portfolio presenting Cloud Architecture, Infrastructure as Code (Terraform), Zero-Downtime CI/CD Delivery, and Enterprise Linux Observability through the lens of horological precision and architectural permanence.

## I. Architectural Overview

Instead of following a conventional developer template, **Catalogue Nº 26** is structured as an archival exhibition catalogue divided into five chapters:

| Section | Title | Architectural Focus & Interactive Mechanics |
| :--- | :--- | :--- |
| **Cover** | *Sale Nº 26 · The Evening Session* | High-resolution HTML5 Canvas halftone dot engine (`halftone.tsx`) rendering an interactive mechanical watch movement (`movement.webp`) with real-time pointer/touch magnetic lens refraction and scroll-driven cloud dispersion. |
| **§ I** | *Foreword* | Scroll-scrubbed word-by-word typographic illumination (`foreword.tsx`) followed by the Four Articles of Practice (*I. Resilience*, *II. Automation*, *III. Continuity*, *IV. Isolation*). |
| **§ II** | *The Lots* | Interactive index of cloud works (`lots-index.tsx`) featuring spring-tracked floating CAD schematic plates (`plate.tsx`) and full-viewport `clipPath` monograph drawers (`lot-entry.tsx`) for **Lot 01: Slipstream** (Multi-AZ AWS & Blue/Green ECS Fargate) and **Lot 02: Aperture** (Event-Driven Serverless Media Pipeline). |
| **Passage** | *Sky Passage* | Scroll-linked atmospheric horizon transition (`sky-passage.tsx`) with multi-layer procedural volumetric cumulus clouds drifting across a darkening twilight canvas. |
| **§ III** | *Inventory* | Interactive five-estate technical cabinet (`inventory.tsx`) covering **Compute**, **Data and storage**, **Delivery**, **Network and security**, and **Linux** over a live nocturnal cloud canvas. |
| **§ IV** | *Provenance* | Reverse-chronological engineering ledger (`provenance.tsx`) detailing production work at **Smartovate LTD** (London, Remote), **Navimar Systems** (Rabat), and **EMSI**, alongside verified **AWS Certified Solutions Architect – Associate** and **Red Hat (RHEL)** credentials. |
| **§ V** | *Enquiries* | Direct conversion section (`enquiries.tsx`) for 2027 6-month PFE internship enquiries with one-click clipboard copy and direct LinkedIn integration. |

## II. Technical Stack

| Layer | Technology | Role in Production |
| :--- | :--- | :--- |
| **Framework** | Next.js (App Router, Static Export) | Pre-renders the entire application into a zero-latency static edge bundle (`out/`). |
| **Language** | TypeScript (Strict Mode) | Enforces compile-time type safety across all schematic coordinates, data models, and motion props. |
| **Styling & Design System** | Tailwind CSS + Custom CSS Tokens | Implements a zero-radius (`0px`) archival palette (`--paper: #ecebe6`, `--ink: #111111`, `--night-sky: #0b0d13`, `--klein: #1a31d0`) with an inline SVG `feTurbulence` film grain overlay. |
| **Motion & Physics** | Framer Motion + HTML5 2D Canvas | Powers masked line reveals, spring-tracked floating schematics, scroll-linked word opacity, and 60fps procedural cloud/halftone canvases with `prefers-reduced-motion` accessibility support. |
| **Typography** | Bodoni Moda, Custom Bodoni Punct, Newsreader & IBM Plex Mono | Pairs high-contrast display serifs with technical monospace cataloguing. |
| **CI/CD & Edge Hosting** | GitHub Actions + Cloudflare Pages | Enforces automated TypeScript and static build verification on every Pull Request before deploying globally to the Cloudflare edge network. |

## III. Project Structure

```text
├── .github/
│   └── workflows/
│       └── ci.yml                  # Automated PR gate (npm ci, typecheck, static build)
├── app/
│   ├── globals.css                 # Archival color tokens, @font-face rules, SVG grain utility
│   ├── layout.tsx                  # Root layout, metadata, viewport configuration
│   └── page.tsx                    # Main monograph assembly
├── components/
│   └── portfolio/
│       ├── preloader.tsx           # Horological escapement dial & split-curtain entry ceremony
│       ├── site-header.tsx         # Fixed archival navigation bar with scroll progress rule
│       ├── hero.tsx                # Cover section & particulars ledger
│       ├── halftone.tsx            # Interactive dot-matrix watch movement canvas
│       ├── foreword.tsx            # Scroll-scrubbed manifesto & Four Articles grid
│       ├── lots-index.tsx          # Interactive works index with cursor-tracked schematic preview
│       ├── lot-entry.tsx           # Full-screen clip-path project monograph modal
│       ├── plate.tsx               # Animated SVG cloud architecture schematic renderer
│       ├── sky-passage.tsx         # Procedural volumetric cloud horizon transition
│       ├── inventory.tsx           # Five-estate interactive technical cabinet
│       ├── provenance.tsx          # Experience timeline & AWS/Red Hat credentials
│       ├── enquiries.tsx           # Contact section, clipboard handler & LinkedIn channel
│       └── primitives.tsx          # Shared SectionHead, MaskLines, Reveal & Label primitives
├── lib/
│   ├── portfolio-data.ts           # Structured project schematics, tenets, inventory & timeline data
│   └── utils.ts                    # Class merging utility (clsx + tailwind-merge)
├── public/
│   ├── fonts/                      # Custom subsetted Bodoni Punct WOFF2 fonts
│   └── images/                     # High-contrast horological & atmospheric source plates
└── next.config.mjs                 # Configured with output: "export" for Cloudflare Pages
```

## IV. Local Development & Verification

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

3. **Run strict TypeScript verification:**
   ```bash
   npm run typecheck
   ```

4. **Build the static production bundle (`out/`):**
   ```bash
   npm run build
   ```


## V. Author & Contact

* **Hicham El Hanafi** — Cloud & DevOps Engineer (Rabat, Morocco)
* **Portfolio:** [https://hichamelh.qzz.io](https://hichamelh.qzz.io)
* **LinkedIn:** [https://www.linkedin.com/in/hicham-elhanafi/](https://www.linkedin.com/in/hicham-elhanafi/)
* **Email:** [mlyhichamelhanafi@gmail.com](mailto:mlyhichamelhanafi@gmail.com)
