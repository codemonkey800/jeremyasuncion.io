import webpack from 'webpack';

import {
  client as clientConfig,
  server as serverConfig,
} from './webpack';

export const clientCompiler = webpack(clientConfig);

export const serverCompiler = webpack(serverConfig);

function main(argv) {
  const compiler = argv[argv.length - 1] === 'server'
    ? serverCompiler
    : clientCompiler;

  compiler.run((err, stats) => {
    if (err) throw err;
    console.log(stats.toString({ colors: true }));
  });
}

if (!module.parent) main(process.argv);

