/** @type {import('tailwindcss').Config} */

const tailwindConfig = {
  content: [
    './src/pages/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
    './src/pageComponents/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Montserrat', 'sans-serif'],
      retro: ['Retro Computer', 'sans-serif'],
    },
  },
};

export default tailwindConfig;
