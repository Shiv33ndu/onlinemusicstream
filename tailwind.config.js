/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blackCurrant: '#2F2938',
        pastelGray: '#D7D3BF',
        silver: '#A8AFAB',
        fuchsiaBlue: '#654FC9',
        raisinBlack: '#21251F',
        inchWormGreen: '#C8F560',
        davyGrey: '#4E515C',
        midSlateBlue: '#7862F8',
        soptifyGreen: '#29cf63',
      },
      animation: {
        slideup: 'slideup 1s ease-in-out',
        slideupfast: 'slideupfast .2s ease-in-out',
        slidedown: 'slidedown 1s ease-in-out',
        slideleft: 'slideleft 1s ease-in-out',
        slideright: 'slideright 1s ease-in-out',
        wave: 'wave 1.2s linear infinite',
        slowfade: 'slowfade 2.2s ease-in-out',
      },
      keyframes: {
        slowfade: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        slideup: {
          from: { opacity: 0, transform: 'translateY(25%)' },
          to: { opacity: 1, transform: 'none' },
        },
        slideupfast: {
          from: { opacity: 1, transform: 'translateY(25%)' },
          to: { opacity: 1, transform: 'none' },
        },
        slidedown: {
          from: { opacity: 0, transform: 'translateY(-25%)' },
          to: { opacity: 1, transform: 'none' },
        },
        slideleft: {
          from: { opacity: 0, transform: 'translateX(-20px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        slideright: {
          from: { opacity: 0, transform: 'translateX(20px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        wave: {
          '0%': { transform: 'scale(0)' },
          '50%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(0)' },
        },
      },
      screens:{
        'xxs': '0px', 
      },
      fontFamily: {
        poppin: ['Poppings','sans-serif'], 
      },
    },
  },
  plugins: [],
}