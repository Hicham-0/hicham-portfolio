import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#ecebe6",
        "paper-warm": "#e2e0d8",
        ink: "#111111",
        "night-sky": "#0b0d13",
        klein: "#1a31d0",
        "klein-soft": "#b4beff",
        stone: "#5c5951",
      },
      fontFamily: {
        serif: [
          "Bodoni Punct",
          "var(--font-bodoni)",
          "Didot",
          "Bodoni MT",
          "Georgia",
          "serif",
        ],
        text: ["var(--font-newsreader)", "Georgia", "serif"],
        mono: ["var(--font-ibm-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
