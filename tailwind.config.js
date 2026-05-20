/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: '#2e7d32', // A vibrant green for success and growth
        accent: '#ffb300', // An amber/gold for highlights and insights
        secondary: '#1e3a8a', // A deep blue for professionalism and trust
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}