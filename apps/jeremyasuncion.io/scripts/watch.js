import clear from 'clear';
import nodemon from 'nodemon';

import { serverCompiler } from './build';
import { resolve } from './common';

function main() {
  let watcherStarted = false;
  serverCompiler.watch({}, (err, stats) => {
    if (err) throw err;
    clear();
    console.log(stats.toString({ colors: true }));
    if (!watcherStarted) {
      watcherStarted = true;
      nodemon({
        script: resolve('dist/server.js'),
        watch: [
          resolve('dist/server.js'),
          resolve('dist/*.server.js'),
        ],
      });
      nodemon.on('quit', () => process.exit());
    }
  });
}

if (!module.parent) main();

