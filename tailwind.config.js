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
      gradientColorStops:{
        grad_purple: 'bg-gradient-to-br from-black via-fuchsia-700 to-slate-800'
      }

    },
  },
  plugins: [],
}
