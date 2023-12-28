/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
/*       fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      }, */
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "background-clr": "#222222",
        "primary-card": "#393939",
        "secondary-card": "#656565",
        "tertiary-card": "#8b8b8b",
        "main-heading": "#FFFFFF",
        "role-text": "#909090",
        "role-text-2": "#d8d8d8",
        "role-background": "#D9D9D9",
        "divider-color": "#D9D9D9",
        "card-hover": "#6E6E6E",
        "logo-bg": "#60CE72",
      },
    },
  },
  plugins: [],
}
