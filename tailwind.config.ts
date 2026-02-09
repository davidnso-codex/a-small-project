import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Georgia", "Garamond", "Times New Roman", "serif"],
        elegant: ["Palatino", "Book Antiqua", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
