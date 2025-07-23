/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
      'text': '#e5f3fb',
      'background': '#04101a',
      'primary': '#82bceb',
      'secondary': '#8b1716',
      'tertiary' : '#2D1318',
      'accent': '#dec133',
      'card-bg' : '#0B1924'
},


      fontSize: {
      sm: '0.750rem',
      base: '1rem',
      xl: '1.333rem',
     '2xl': '1.777rem',
     '3xl': '2.369rem',
     '4xl': '3.158rem',
     '5xl': '4.210rem',
     },

    fontFamily: {
    heading: 'Ruda',
    body: 'Ruda',
    },
    fontWeight: {
    normal: '400',
    bold: '700',
    },
    },
  },
  plugins: [],
}