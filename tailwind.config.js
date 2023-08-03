module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    container: {
      padding: '1rem',
      center: true
    },
    extend: {}
  },
  daisyui: {
    themes: ['dracula']
  },
  plugins: [require('daisyui')]
}
