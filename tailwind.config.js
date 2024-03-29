import formsPlugin from '@tailwindcss/forms';
import typographyPlugin from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  plugins: [formsPlugin, typographyPlugin],
  theme: {
    extend: {
      colors: {
        light: '#F2FAFF',
        secondary: '#D5EDFE',
        primary: '#052DC1',
      },
      fontFamily: {
        exo: ['Exo', 'sans-serif'],
        roboto: ['Roboto'],
        poppins: ['Poppins'],
      },
    },
  },
};
