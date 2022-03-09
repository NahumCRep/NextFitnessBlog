module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily:{
        farvo:['Arvo', 'serif'],
        fleague:["'League Gothic'", 'sans-serif'],
        faudiowide:['Audiowide', 'cursive'],
        fgrotesque:["'Darker Grotesque'", 'sans-serif']
      },
      keyframes:{
        fadein:{
          from:{opacity: 0},
          to:{opacity: 0.7}
        }
      },
      animation:{
        'fade-in': 'fadein 2s linear 1'
      },
      gridTemplateColumns: {
        'auto-fit': 'repeat(auto-fit, minmax(300px, 1fr))',
        'auto-fill': 'repeat(auto-fill, minmax(300px, 1fr))',
      },
      gridTemplateRows: {
        'auto-fit': 'repeat(auto-fit, minmax(300px, 1fr))',
        'auto-fill': 'repeat(auto-fill, minmax(300px, 1fr))',
      },
    },
  },
  plugins: [],
}
