import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

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
          },
        },
        jiggle: {
          "0%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(5px)" },
          "50%": { transform: "translateX(-5px)" },
          "75%": { transform: "translateX(5px)" },
          "100%": { transform: "translateX(0)" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      }),
      animation: {
        pop: "pop 0.3s linear",
        jiggle: "jiggle 0.2s ease-out",
        "fade-out": "fadeOut 0.3s ease-out forwards",
      },
      screens: {
        tiny: { raw: "(max-height: 630px)" },
      },
    },
  },
  plugins: [
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          "animation-delay": (value) => {
            return {
              "animation-delay": value,
            };
          },
        },
        {
          values: theme("transitionDelay"),
        }
      );
    }),
  ],
};
export default config;
