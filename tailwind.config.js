/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins"]
      },
      colors: {
        primary: colors.rose,
        secondary: colors.pink,
        error: "#dc2626",
        warining: "#ea580c",
        success: "#16a34a",
        
        // Light Theme
        l_background: "whitesmoke",
        l_backgroundLight: "#fff",
        l_backgroundLighter: "#a1a1aa",
        l_text: "#000",
        l_textLight: "#6b7280",
        l_input: "#d1d5db",

        // Dark Theme
        d_background: "#171717",
        d_backgroundLight: "#262626",
        d_backgroundLighter: "#404040",
        d_text: "#fff",
        d_textLight: "#6b7280",
        d_input: "#fff",
      }
    },  
  },
  plugins: [],
}
