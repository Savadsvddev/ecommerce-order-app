/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1E40AF",         // base color (blue-800)
          light: "#3B82F6",           // optional lighter shade
          dark: "#1E3A8A",            // optional darker shade
          foreground: "#ffffff",      // for text on primary background
        },
      },
    },
  },
  plugins: [],
};
