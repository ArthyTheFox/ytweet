const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{svelte,js,ts}'],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.slate,
      green: colors.emerald,
      purple: colors.violet,
      yellow: colors.amber,
      pink: colors.fuchsia,
      red: colors.red,
      gray: colors.gray,
      sky: colors.sky,
      neutral: colors.neutral,
      'main': '#25232e',
      'main-fonce': '#191820',
      'extra': '#23b2a4'
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
