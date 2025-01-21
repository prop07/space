/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#171717",
        secondary: "#262626",
        outlineWhite: "#525252",
      },
    },
  },
  plugins: [],
};
