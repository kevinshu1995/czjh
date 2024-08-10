module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    container: {
      padding: '1rem',
      center: true
    },
    extend: {
      colors: {
        yellow11: '#e8b34d'
      }
    }
  },
  daisyui: {
    themes: ['light']
  },
  plugins: [require('daisyui')]
}
