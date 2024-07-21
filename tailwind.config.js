/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
  ],
  presets: ['twrnc'],
  theme: {
    extend: {
      fontFamily: {
      },
    },
  },
  plugins: [],
};