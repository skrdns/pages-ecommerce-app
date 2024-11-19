/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'dark-purple': '#1b1535', // Основной фон страницы
        'purple-800': '#3b2071', // Оттенок для текста и кнопок
        'gray-300': '#D1D5DB', // Цвет текста для описания
      },
      fontFamily: {
        sans: ['Helvetica', 'Arial', 'sans-serif'], // Основной шрифт
      },
      backgroundImage: {
        'gif-bg': "url('/src/assets/disco.gif')", // Путь к гифке фона
      },
      maxWidth: {
        '7xl': '1900px', // Додає нову максимальну ширину
      },
    },
  },
  plugins: [],
}
