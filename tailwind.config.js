/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#1a2a6c", light: "#2b3d8f", dark: "#101a47" },
        brand: { DEFAULT: "#b01c2e", light: "#d63c4f", dark: "#8e1422" },
        gold: { DEFAULT: "#c9a84c", light: "#e0c477", dark: "#a4863a" },
      },
      fontFamily: {
        sans: ["'DM Sans'", "system-ui", "sans-serif"],
        display: ["'Fraunces'", "serif"],
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

