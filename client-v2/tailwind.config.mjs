/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{mjs,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        pink: {
          900: '#FF66AA',
        },
        gray: {
          custom: '#717171'
        }
      },
    },
  },
  plugins: []
}