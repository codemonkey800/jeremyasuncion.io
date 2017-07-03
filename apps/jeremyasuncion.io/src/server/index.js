/* eslint-disable no-console */

import { createServer } from 'http';

import app from './app';

const host = process.env.HOST || '0.0.0.0';
const port = parseInt(process.env.PORT || 8080, 10);

// Keep track of current app callback reference for hot reloading.
let currentApp = app.callback();
const server = createServer(currentApp);

function main() {
  server.listen(port, host, () => {
    console.log(`Server started at ${host}:${port}`);
  });
}

if (module.hot) {
  console.log('Hot reloading enabled for server!');

  // If the './app' module has a new hot update, we replace the current http
  // server's listener with the new app callback.
  module.hot.accept('./app', () => {
    console.log('Starting hot reload...');
    server.removeListener('request', currentApp);
    currentApp = app.callback();
    server.on('request', currentApp);
    console.log('Hot reloaded Koa server.');
  });
}

if (!module.parent) main();

