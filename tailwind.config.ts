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
        dark: {
          1: "#2E2E2E",
          2: "#242424"
        },
        neutral: {
          1: "#FAFAFA",
          2: "#F5F5F5",
        },
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        jakarta: ["Plus Jakarta Sans", "sans-serif"]
      }
    },
  },
  plugins: [],
};
export default config;
