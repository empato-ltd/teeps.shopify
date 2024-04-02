import formsPlugin from '@tailwindcss/forms';
import typographyPlugin from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  plugins: [formsPlugin, typographyPlugin],
  theme: {
    extend: {
      height: {
        15: '3.75rem',
      },
      width: {
        15: '3.75rem',
      },
      colors: {
        light: '#F2FAFF',
        secondary: '#D5EDFE',
        primary: '#052DC1',
        dark: '#041f87',
        text: '#728FA3',
      },
      fontFamily: {
        exo: ['Exo', 'sans-serif'],
        roboto: ['Roboto'],
        poppins: ['Poppins'],
      },
    },
  },
};
