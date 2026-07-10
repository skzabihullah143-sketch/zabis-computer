/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#eef3fb",
          100: "#d7e3f5",
          200: "#b0c7ea",
          300: "#84a6da",
          400: "#5680c4",
          500: "#3763ac",
          600: "#284c8c",
          700: "#1f3d70",
          800: "#122759",
          900: "#0a1a40",
          950: "#060f28",
        },
        gold: {
          400: "#e8bf5a",
          500: "#d4a017",
          600: "#b3860f",
        },
      },
      fontFamily: {
        display: ["Poppins", "sans-serif"],
        sans: ["Inter", "sans-serif"],
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(10, 26, 64, 0.15)",
      },
      backdropBlur: {
        xs: "2px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: 0, transform: "translateY(16px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-500px 0" },
          "100%": { backgroundPosition: "500px 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        shimmer: "shimmer 2s linear infinite",
      },
    },
  },
  plugins: [],
};
