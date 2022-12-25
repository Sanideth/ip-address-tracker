/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        rubik: ['"Rubik"', "sans-serif"],
      },
      backgroundImage: {
        "header-img": "url('./images/pattern-bg.png')",
      },
      colors: {
        "very-dark-gray": "hsl(0, 0%, 17%)",
        "dark-gray": "hsl(0, 0%, 59%)",
      },
    },
  },
  plugins: [],
};
