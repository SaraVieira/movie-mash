const paths = [
  "./src/pages/**/*.{js,ts,jsx,tsx}",
  "./src/components/**/*.{js,ts,jsx,tsx}",
  "./src/views/**/*.{js,ts,jsx,tsx}",
];

module.exports = {
  darkMode: "class",
  content: paths,
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("flowbite/plugin"),
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#313D4D",
          darkBlue: "#0F1B2B",
          inputBg: "#2B3543",
          red: "#E51937",
          yellow: "#FFC045",
          lightBlue: "#47CFFF",
          green: "#19E58F",
          border: "#2C3F5B",
        },
      },
    },
  },
};
