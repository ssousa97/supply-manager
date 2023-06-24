/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#49a4b2',
          secondary: '#cbe83c',
          accent: '#403ba0',
          neutral: '#272135',
          'base-100': '#282e48',
          info: '#a4c8f4',
          success: '#6eddce',
          warning: '#f4d371',
          error: '#f7407a',
        },
      },
    ],
  },
}
