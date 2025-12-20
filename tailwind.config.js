/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: "var(--primary)", // #006442
        accent: "var(--accent-btn)", // #ffe552
        muted: "var(--text-muted)", // #3c3c3b
        bgsoft: "var(--bg-soft)", // #ffffff
      },
      fontFamily: {
        brand: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
