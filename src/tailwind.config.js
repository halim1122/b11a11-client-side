/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // সোর্স ফোল্ডার অনুযায়ী
  ],
  theme: {
    extend: {
      colors: {
        primary: "#342995", // তোমার কাস্টম কালার
      },
    },
  },
  plugins: [],
};
