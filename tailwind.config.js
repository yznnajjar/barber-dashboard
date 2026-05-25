/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1A1A18',
        accent: '#C9A96E',
        success: '#1D9E75',
        warning: '#BA7517',
        danger: '#C0392B',
      },
    },
  },
  plugins: [],
}
