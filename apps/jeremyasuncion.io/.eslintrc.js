module.exports = {
  root: true,

  extends: 'airbnb',

  parser: 'babel-eslint',

  env: {
    commonjs: true,
    es6: true,
    'shared-node-browser': true,
  },

  globals: {
    fetch: true,
  },

  rules: {
    'arrow-parens': [2, 'as-needed'],
    'react/jsx-filename-extension': 0,
    'react/prop-types': 0,
  },
};

