/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/**.{ts,tsx}',
    './containers/**/**.{ts,tsx}',
    './pages/**/**.{ts,tsx}',
    './pages-components/**/**.{ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
};
