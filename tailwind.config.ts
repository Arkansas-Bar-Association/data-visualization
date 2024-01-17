/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        fade: 'fadeIn .5s ease-in-out'
      },

      keyframes: {
        fadeIn: {
          from: { opacity: 0, transform: 'translate(0, 10px)' },
          to: { opacity: 1, transform: 'translate(0, 0)' }
        }
      }
    }
  },
  plugins: []
}
