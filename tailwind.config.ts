import type { Config } from "tailwindcss";

/**
 * Tailwind theme dipetakan dari `styles/tokens.css` (tema READY DESIGN / Figma).
 * Warna semantik (bg/fg/nav-fg/accent/pattern) mengacu CSS variable yang di-flip
 * oleh [data-surface="light|dark"] — jadi utility yg sama otomatis ganti kontras
 * saat surface section berubah (sesuai storyboard).
 */
const withAlpha = (varName: string) =>
  `color-mix(in srgb, var(${varName}) calc(<alpha-value> * 100%), transparent)`;

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      // palet mentah
      paper: withAlpha("--paper"),
      ink: withAlpha("--ink"),
      forest: withAlpha("--forest"),
      "forest-deep": withAlpha("--forest-deep"),
      bone: withAlpha("--bone"),
      lime: withAlpha("--lime"),
      "lime-deep": withAlpha("--lime-deep"),
      // semantik (ikut surface)
      bg: withAlpha("--bg"),
      fg: withAlpha("--fg"),
      "fg-dim": withAlpha("--fg-dim"),
      "nav-fg": withAlpha("--nav-fg"),
      accent: withAlpha("--accent"),
      pattern: "var(--pattern)",
    },
    fontFamily: {
      display: "var(--font-display)",
      serif: "var(--font-serif)",
      brush: "var(--font-brush)",
      body: "var(--font-body)",
      mono: "var(--font-mono)",
    },
    fontSize: {
      display: ["var(--fs-display)", { lineHeight: "var(--lh-tight)" }],
      h1: ["var(--fs-h1)", { lineHeight: "var(--lh-tight)" }],
      h2: ["var(--fs-h2)", { lineHeight: "var(--lh-snug)" }],
      h3: ["var(--fs-h3)", { lineHeight: "var(--lh-snug)" }],
      h4: ["var(--fs-h4)", { lineHeight: "var(--lh-snug)" }],
      p1: ["var(--fs-p1)", { lineHeight: "var(--lh-body)" }],
      p2: ["var(--fs-p2)", { lineHeight: "var(--lh-body)" }],
      body1: ["var(--fs-body1)", { lineHeight: "var(--lh-body)" }],
      body2: ["var(--fs-body2)", { lineHeight: "var(--lh-body)" }],
      caption: ["var(--fs-caption)", { lineHeight: "1.4" }],
      label: ["var(--fs-label)", { lineHeight: "1.4" }],
    },
    letterSpacing: {
      tight: "var(--tracking-tight)",
      normal: "0",
      label: "var(--tracking-label)",
    },
    lineHeight: {
      tight: "var(--lh-tight)",
      snug: "var(--lh-snug)",
      body: "var(--lh-body)",
    },
    extend: {
      spacing: {
        "1": "var(--space-1)", "2": "var(--space-2)", "3": "var(--space-3)",
        "4": "var(--space-4)", "6": "var(--space-6)", "8": "var(--space-8)",
        "12": "var(--space-12)", "16": "var(--space-16)",
        "24": "var(--space-24)", "32": "var(--space-32)",
      },
      maxWidth: { content: "var(--maxw)" },
      borderRadius: {
        none: "var(--radius-0)",
        sm: "var(--radius-1)",
        DEFAULT: "var(--radius-2)",
        pill: "var(--radius-pill)",
      },
      transitionTimingFunction: {
        out: "var(--ease-out)",
        inout: "var(--ease-inout)",
      },
      transitionDuration: {
        micro: "var(--dur-micro)",
        std: "var(--dur-std)",
        flip: "var(--dur-flip)",
      },
      zIndex: { nav: "100", menu: "200", splash: "900" },
    },
  },
  plugins: [],
};

export default config;
