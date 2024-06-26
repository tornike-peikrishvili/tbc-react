import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  darkMode: [
    "variant",
    [
      "@media (prefers-color-scheme: dark) { &:not(.light *) }",
      "&:is(.dark *)",
    ],
  ],
  theme: {
    extend: {
      backgroundColor: {
        primary: "#1A1A2E",
        secondary: "#16213E",
        tertiary: "#0F3460",
      },
      boxShadow: {
        "box-shdw": "rgba(0, 0, 0, 0.08) 0px 4px 12px",
        "drk-shdw":
          "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conicgradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      screens: {
        xs: { min: "320px", max: "399px" },
        sm: "375px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1370px",
      },
    },
  },
};

export default config;
