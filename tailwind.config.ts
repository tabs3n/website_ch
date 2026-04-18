import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#05070b",
          900: "#0a0d13",
          800: "#10141c",
          700: "#161b26",
          600: "#1d2330",
        },
        steel: {
          400: "#8a93a4",
          300: "#aab2c0",
          200: "#cdd3dd",
        },
        accent: {
          DEFAULT: "#2563eb",
          hover: "#3b82f6",
          soft: "#1d4ed8",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-space)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.04em",
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
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to bottom, rgba(10,13,19,0) 0%, rgba(10,13,19,1) 85%)",
      },
    },
  },
  plugins: [],
};

export default config;
