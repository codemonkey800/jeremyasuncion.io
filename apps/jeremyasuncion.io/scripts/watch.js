import MemoryFS from 'memory-fs';
import { spawn } from 'child_process';

import { serverCompiler } from './build';
import { resolve } from './common';

function main() {
  const fs = new MemoryFS();
  serverCompiler.outputFileSystem = fs;

  let serverProcess = null;
  serverCompiler.watch({}, err => {
    if (err) throw err;

    const serverFile = resolve('dist/server.js');
    const serverCode = fs.readFileSync(serverFile, 'utf-8');

    if (!serverProcess) {
      serverProcess = spawn('node', ['-e', serverCode], {
        stdio: 'inherit',
      });
    }
  });
}

if (!module.parent) main();

