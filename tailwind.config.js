module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Sora"', "sans-serif"],
      },
      colors: {
        brand: {
          blue900: "#001A57",
          blue800: "#00308F",
          red: "#D9251D",
          blue300: "#689EFF",
          blue100: "rgba(0, 89, 247, 0.16)",

          gray900: "#070E27",
          gray800: "#081131",
          gray700: "#162044",
          gray600: "#4E5A85",
          gray500: "#7E8BB6",
          gray300: "#CCD2E9",
        },
      },
    },
  },
  plugins: [],
};
