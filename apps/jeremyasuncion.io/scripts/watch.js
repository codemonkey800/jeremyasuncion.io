import clear from 'clear';
import MemoryFS from 'memory-fs';
import {
  execSync,
  spawn,
} from 'child_process';

import { serverCompiler } from './build';
import { resolve } from './common';

function main() {
  const fs = new MemoryFS();
  serverCompiler.outputFileSystem = fs;

  let serverProcess = null;
  serverCompiler.watch({}, err => {
    if (err) throw err;
    clear();

    const serverCode = fs.readFileSync(resolve('dist/server.js')).toString();

    if (serverProcess) {
      serverProcess.kill();
    }

    serverProcess = spawn('node', ['-e', serverCode], {
      stdio: 'inherit',
    });

    serverProcess.on('exit', () => {
      serverProcess = null;
    });
  });
}

if (!module.parent) main();

