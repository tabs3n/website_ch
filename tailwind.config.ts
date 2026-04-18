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
          DEFAULT: "#E8B54A",
          hover: "#f0c25f",
          soft: "#c8982e",
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
        sans: ['"Inter Tight"', "system-ui", "sans-serif"],
        serif: ['"Instrument Serif"', "serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
        // Legacy alias
        display: ['"Instrument Serif"', "serif"],
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
