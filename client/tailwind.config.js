// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // ← THIS IS CRITICAL
  ],
  theme: {
    extend: {
      // Optional: Add custom colors, fonts, etc.
      colors: {
        cyan: {
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
        },
      },
    },
    screens: {
      sm: '640px',
      md: '768px',   // ← REQUIRED FOR md:grid-cols-3
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [],
};