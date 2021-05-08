module.exports = {
  presets: ['next/babel'],
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['styled-components', { ssr: true, displayName: true, preprocess: false }]
    // ['transform-define', { 'process.env.NODE_ENV': 'production' }],
  ],
  env: {
    development: {
      presets: ['next/babel'],
      plugins: [['styled-components', { ssr: true, displayName: true }]]
      // plugins: ['inline-dotenv']
    },
    production: {
      presets: ['next/babel'],
      plugins: [
        ['transform-remove-console', { exclude: ['error', 'warn'] }],
        ['styled-components', { ssr: true, displayName: true }]
      ]
      // plugins: [
      //   // ['transform-remove-console', { exclude: ['error', 'warn'] }],
      //   // ['transform-inline-environment-variables']
      // ]
    }
  }
};
