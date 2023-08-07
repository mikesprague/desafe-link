/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
/* eslint-disable global-require */

module.exports = {
  plugins: [
    require('autoprefixer'),
    require('tailwindcss'),
    require('cssnano')({
      preset: 'default',
    }),
    require('@fullhuman/postcss-purgecss')({
      content: ['./src/index.html', './src/index.js', './src/components/**/*.jsx'],
      fontFace: false,
      safelist: [],
    }),
  ],
};
