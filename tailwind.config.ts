import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        // Avulus primary brand accent — light purple
        primary: {
          DEFAULT: "#CA98FF",
          dim: "#9c42f4"
        },
        // Text color used on primary-filled backgrounds
        "on-primary": "#46007D",
        // Restaurant / pink accent
        secondary: "#FF6C8F",
        // Status green accent
        tertiary: "#8EFF71"
      },
      fontFamily: {
        sans: ["var(--font-space-grotesk)", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
