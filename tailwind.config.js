/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx,scss}"],
  theme: {
    extend: {
      fontFamily: {
        rubik: ['Rubik', 'sans-serif'],
        karla: ['Karla', 'sans-serif']
      },
      letterSpacing: {
        wide: '0.25em',
      }
    },
  },
  plugins: []
}

