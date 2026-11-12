/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#14213D',
        cream: '#F4EDE0',
        coral: '#FF6B5B',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Vazirmatn"', 'sans-serif'],
        display: ['"Space Grotesk"', '"Vazirmatn"', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Vazirmatn"', 'monospace'],
      },
    },
  },
  plugins: [],
};
