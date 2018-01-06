module.exports = {
  presets: [
    ['@babel/preset-env', {
      target: { node: true },
    }],
    '@babel/preset-stage-0',
  ],
  plugins: ['@babel/plugin-transform-runtime'],
};
