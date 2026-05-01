import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        glow: "0 24px 90px rgba(0, 0, 0, 0.45)",
      },
      backgroundImage: {
        mesh: "radial-gradient(circle at top, rgba(255,255,255,0.08), transparent 35%), linear-gradient(180deg, rgba(12,17,31,0.85), rgba(4,6,10,1))",
      },
    },
  },
  plugins: [],
};

export default config;
