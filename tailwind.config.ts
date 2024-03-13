import { Config } from 'tailwindcss';

const tailwindConfig: Config = {
  content: [
    './src/pages/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/pageComponents/**/*.{ts,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Montserrat', 'sans-serif'],
      retro: ['Retro Computer', 'sans-serif'],
    },
  },
};

export default tailwindConfig;
