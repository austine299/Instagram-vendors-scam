/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'navbg': "#c8159a", // 👈 custom name
      },
      colors:{
        'instacolor': "#c8159a",
      }
    },
  },
  plugins: [],
}

