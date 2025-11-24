/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        bounceSlow: {
          '0%, 100%': { transform: 'translateY(0%)' },
          '50%': { transform: 'translateY(-25%)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 1.2s ease-in both',
        bounceSlow: 'bounceSlow 2s infinite',
      },
    },
  },
  plugins: [],
}
