/** @type {import('tailwindcss').Config} */
export const darkMode = 'class';
export const content = [
     "./src/**/*.{js,jsx,ts,tsx}", // সোর্স ফোল্ডার অনুযায়ী
];
export const theme = {
     extend: {
          colors: {
               primary: "#342995", // তোমার কাস্টম কালার
          },
     },
};
export const plugins = [];
