module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // This enables dark mode
  theme: {
    extend: {
      colors: {
        'brand': {
          100: '#e6f0ff',
          200: '#b3d1ff',
          300: '#80b3ff',
          400: '#4d94ff',
          500: '#1a75ff',
          600: '#0066ff',
          700: '#0052cc',
          800: '#003d99',
          900: '#002966',
        },
      },
    },
  },
  plugins: [],
}