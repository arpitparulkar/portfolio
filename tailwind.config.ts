import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0d0d0d",
        paper: "#f2f2f2",
        ember: "#8a8a8a",
      },
      fontFamily: {
        sans: ["Arial", "Helvetica Neue", "sans-serif"],
        display: ["Arial", "Helvetica Neue", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
