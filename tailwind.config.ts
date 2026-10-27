import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "brand-navy": "#091a36",
        "brand-blue": "#1d4ed8",
        "brand-orange": "#ea580c",
        "brand-green": "#16a34a",
        "brand-slate": "#475569",
        "brand-border": "#e2e8f0",
      },
    },
  },
  plugins: [],
};

export default config;
