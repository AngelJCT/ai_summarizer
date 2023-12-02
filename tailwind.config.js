/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ["Satoshi", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"]
      },
      colors: {
        'start-color': '#6A7185',
        'middle-color': '#012A4A',
        'end-color': '#6A7185',
        'blueish': '#012A4A'
      }
    },
  },
  plugins: [],
}
