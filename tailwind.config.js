/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      primaryColor: "#00308fe6",
      secondaryColor: "#ffffff",
      backgroundColor: "#8080801a",
      hoverColor: "#00308f",
    },
    extend: {},
  },
  plugins: [],
};
