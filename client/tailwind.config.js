/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#00CCBC",
        secondary: "#03aa9c",
        dark: "#2E3333",
        lightdark: "#434848",
        text: "#2E3333",
        lighttext: "#585C5C",
        darkgreen: "#4D7C1B",
        secondarybg: "#F9FAFA",
      },
    },
    fontFamily: {
      secondary: ["IBM Plex Sans", "sans-serif"],
    },
  },
  plugins: [],
};
