/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef8f2",
          100: "#d7eddf",
          200: "#b0dbc2",
          300: "#7fc39e",
          400: "#4da678",
          500: "#2c8a5c",
          600: "#1d6f49",
          700: "#17593b",
          800: "#124730",
          900: "#0d3a27",
          950: "#062a1c",
        },
        gold: {
          300: "#f6d87a",
          400: "#f0c44c",
          500: "#e0a92e",
          600: "#c78f1a",
        },
        ivory: "#faf8f2",
        ink: "#0b2b20",
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "ui-sans-serif", "system-ui", "sans-serif"],
        arabic: ['"Amiri"', "serif"],
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(6, 42, 28, 0.18)",
        card: "0 6px 24px -8px rgba(6, 42, 28, 0.12)",
      },
    },
  },
  plugins: [],
};
