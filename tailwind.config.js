/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Magenta del logo (antes rosa palo #B8929A de Verona)
        petal: {
          DEFAULT: '#AD1A5B',
          light: '#F7E6EC',
          dark: '#8A1448',
        },
        pearl: {
          DEFAULT: '#FDFCF9',
          dark: '#F0E3D0',
        },
        mocha: {
          DEFAULT: '#3D2D26',
          light: '#5C4A42',
        },
        charcoal: {
          DEFAULT: '#2C2018',
          light: '#4A3830',
        },
        coral: '#C96840',
      },
    },
  },
  plugins: [],
}
