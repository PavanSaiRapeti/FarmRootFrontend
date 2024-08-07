/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.html", "./src/**/*.js", "./src/**/*.jsx"],
  theme: {
    extend: {
      colors: {
        frGreen: "#768350",
        frBlack: "#1E2203",
        frGreendark: "#35452B",
        frGray: "#E9E7DE",
        frWhite: "#FBF9EF",
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },
      animation: ["hover", "focus", "jump", "frLoading" ,"frBounce" ],
      animation: {
        "jump": "jump 1s forwards",
        "frLoading": "frLoading 2s linear infinite",
        "frBounce" :" frBounce 2s ease-in-out infinite"
      },
    },
    keyframes: {
      "jump": {
        "0%": { transform: "translateY(0)" },
        "50%": { transform: "translateY(-40px)" },
        "100%": { transform: "translateY(0)" },
      },
      "frLoading": {
        "100%": {
          transform: "rotate(360deg)",
        },
      },
      "frBounce": {
        "0% " : {
          transform: "scale(0)",
        }
        , 
        "50%": {
          transform: "scale(1)",
        },
        "100%": {
          transform: "scale(0)",
        },
      },
    },
  },
  plugins: [],
};
