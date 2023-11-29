/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#fdf2f8",
          100: "#fce7f3",
          200: "#fbcfe8",
          300: "#f9a8d4",
          400: "#f472b6",
          500: "#ec4899",
          600: "#db2777",
          700: "#be185d",
          800: "#9d174d",
          900: "#831843",
          950: "#500724",
        },
      },
      height: {
        160: "40rem",
        128: "32rem",
        "90%": "90%",
        "10%": "10%",
        "20%": "20%",
        "80%": "80%",
      },
    },
    fontFamily: {
      primary: ["Poppins"],
      title: ["Oswald"],
    },
  },
  plugins: [],
};
  
  