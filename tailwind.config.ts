import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // New design system tokens
        bg: "#0A0A0A",
        accent: {
          DEFAULT: "#2563EB",
          hover: "#3B82F6",
          soft: "#1D4ED8",
        },
        // Legacy tokens (kept for inner pages)
        ink: {
          950: "#0A0A0A",
          900: "#111111",
          800: "#181818",
          700: "#202020",
          600: "#282828",
        },
        steel: {
          400: "#9a9a8a",
          300: "#b8b4a8",
          200: "#d4d0c8",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", '"Inter Tight"', "system-ui", "sans-serif"],
        // Überschriften-Schrift (per CMS umstellbar über --font-headline)
        serif: ["var(--font-headline)", '"Inter Tight"', "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", '"JetBrains Mono"', "ui-monospace", "monospace"],
        // Legacy alias
        display: ["var(--font-headline)", '"Inter Tight"', "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        tight2: "-0.035em",
        tight3: "-0.03em",
        eyebrow: "0.14em",
        cap: "0.08em",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1.25rem",
          md: "2rem",
          lg: "3rem",
        },
        screens: {
          "2xl": "1400px",
        },
      },
    },
  },
  plugins: [],
};

export default config;
