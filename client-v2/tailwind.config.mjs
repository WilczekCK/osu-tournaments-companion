/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{mjs,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        pink: {
          900: '#FF66AA',
          custom: '#A95279'
        },
        gray: {
          custom: '#717171'
        }
      },
      transitionProperty: {
        'height': 'height'
      }
    },
  },
  plugins: []
}