/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryDashboard: "#f3f8fb",
        buttonDashboard: "#a00af6",
      },
      screens: {
        smm: { min: "100px", max: "1024px" },
        smml: { min: "100px", max: "580px" },
      },
    },
  },
  plugins: [],
};
