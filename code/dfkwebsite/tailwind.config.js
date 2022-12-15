/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "background": "#404040",
        "nav-background": "#4A4A4A",
        "footer-background": "#4A4A4A",
        "accent": "#174DAF",
      },
    },
  },
  plugins: [
    require('tailwind-children'),
  ],
}
