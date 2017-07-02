const common = {
  loader: 'babel-loader',
  test: /\.js$/,
  exclude: /node_modules/,
  options: {
    babelrc: false,
    cacheDirectory: true,
    presets: [
      'stage-0',
      'react',
    ],
    plugins: [
      'transform-runtime',
      'transform-decorators-legacy',
      'syntax-dynamic-import',
    ],
    env: {
      production: {
        plugins: [
          'transform-react-remove-prop-types',
        ],
      },
    },
  },
};

export const clientRule = {
  ...common,
  options: {
    ...common.options,
    presets: [
      ['env', {
        targets: {
          browsers: 'last 3 versions',
          uglify: true,
        },
        useBuiltIns: true,
      }],
      ...common.options.presets,
    ],
    plugins: [
      'react-hot-loader/babel',
      ...common.options.plugins,
    ],
  },
};


export const serverRule = {
  ...common,
  options: {
    ...common.options,
    presets: [
      ['env', {
        targets: {
          node: true,
          uglify: true,
        },
        useBuiltIns: true,
      }],
      ...common.options.presets,
    ],
  },
};

