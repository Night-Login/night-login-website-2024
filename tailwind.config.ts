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
        red: "#D62340",
        dark: "#2E2E2E",
        white: {
          1: "#FAFAFA",
          2: "#F5F5F5",
        },
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      }
    },
  },
  plugins: [],
};
export default config;
