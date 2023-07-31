module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    container: {
      padding: '8px',
      center: true
    },
    extend: {}
  },
  daisyui: {
    themes: ['dracula']
  },
  plugins: [require('daisyui')]
}
