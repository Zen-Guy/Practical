/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class', // Enables manual dark mode toggling
    content: [
      './app/**/*.{js,jsx}',
      './pages/**/*.{js,jsx}',
      './components/**/*.{js,jsx}',
    ],
    plugins: [require('daisyui')],
  }
  