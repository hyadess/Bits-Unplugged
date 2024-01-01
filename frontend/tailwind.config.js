/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
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
          800: "#1C5B5F",
          900: "#ebebeb",
          // 950: "#500724",
        },
      },
      height: {
        160: "40rem",
        128: "32rem",
        "90%": "90%",
        "10%": "10%",
        "20%": "20%",
        "70%": "70%",
        "80%": "80%",
        "100%": "100%",
      },
      width: {
        "5%": "5%",
        "10%": "10%",
        "15%": "15%",
        "20%": "20%",
        "30%": "30%",
        "40%": "40%",
        "50%": "50%",
        "60%": "60%",
        "75%": "75%",
        "80%": "80%",
        "90%": "90%",
      },
    },
    fontFamily: {
      primary: ["Poppins"],
      title: ["Oswald"],
    },
  },
  plugins: [require("flowbite/plugin")],
  darkMode: "class",
};
