/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        warmbg: '#FFFDF8',
        ambersoft: {
          50: '#fff8e1',
          100: '#fff2c2',
          300: '#FCD34D',
          400: '#F59E0B'
        }
      },
      boxShadow: {
        glass: '0 6px 18px rgba(15,15,15,0.06)',
      },
      backdropBlur: {
        sm: '4px'
      }
    },
  },
  plugins: [],
}