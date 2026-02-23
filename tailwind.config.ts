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
        primary: {
          DEFAULT: "#696cff",
          light: "#e7e7ff",
          dark: "#5f61e6",
        },
        success: {
          DEFAULT: "#71dd37",
          light: "#e8fadf",
        },
        info: {
          DEFAULT: "#03c3ec",
          light: "#d7f5fc",
        },
        warning: {
          DEFAULT: "#ffab00",
          light: "#fff2d6",
        },
        danger: {
          DEFAULT: "#ff3e1d",
          light: "#ffe0db",
        },
        secondary: {
          DEFAULT: "#8592a3",
          light: "#ebeef0",
        },
        dark: {
          DEFAULT: "#233446",
          light: "#435971",
        },
        body: "#697a8d",
        heading: "#566a7f",
        bg: "#f5f5f9",
        card: "#ffffff",
        border: "#d9dee3",
      },
      fontFamily: {
        sans: ['"Public Sans"', "system-ui", "sans-serif"],
        mono: ['"Courier New"', "monospace"],
      },
      boxShadow: {
        card: "0 2px 6px 0 rgba(67, 89, 113, 0.12)",
        "card-hover": "0 4px 12px 0 rgba(67, 89, 113, 0.16)",
      },
    },
  },
  plugins: [],
};

export default config;
