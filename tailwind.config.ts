import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: ({ theme }) => ({
        pop: {
          "0%": {
            transform: "scale(1.5)",
            color: theme("colors.green.500"),
          },
          "50%": {
            transform: "scale(1)",
            color: theme("colors.green.500"),
          },
          "100%": {
            transform: "scale(1)",
            color: theme("colors.black"),
          },
        },
        jiggle: {
          "0%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(5px)" },
          "50%": { transform: "translateX(-5px)" },
          "75%": { transform: "translateX(5px)" },
          "100%": { transform: "translateX(0)" },
        },
      }),
      animation: {
        pop: "pop 0.3s linear",
      },
    },
  },
  plugins: [],
};
export default config;
