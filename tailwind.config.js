/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"nanum-gothic-regular"', "system-ui", "sans-serif"],
        serif: ['"nanum-gothic-regular"', "Georgia", "serif"],
        mono: ['"nanum-gothic-regular"', "Menlo", "monospace"],
      },
      colors: {
        primaryPink: "#C30045",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
