/* eslint-disable no-console */

import Koa from 'koa';

import { renderPage } from './ssr';

const host = process.env.HOST || '0.0.0.0';
const port = parseInt(process.env.PORT || 8080, 10);

const app = new Koa();

app.use(ctx => {
  renderPage(ctx);
});

function main() {
  app.listen(port, host, () => {
    console.log(`Started server at ${host}:${port}`);
  });
}

if (!module.parent) main();

