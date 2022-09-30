/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "light-gray": "#dbdbdb",
        "insta-green": "#40db2f",
        "insta-light-blue": "#c3dcf5",
        "insta-dark-blue": "#0a78be",
      },
    },
  },
  plugins: [],
};
