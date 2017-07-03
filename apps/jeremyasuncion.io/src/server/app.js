/* eslint-disable no-console */

import fs from 'fs';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import Router from 'koa-router';
import send from 'koa-send';
import path from 'path';
import {
 graphiqlKoa,
 graphqlKoa,
} from 'graphql-server-koa';

import renderPage from './render-page';
import schema from '../shared/schema';

const app = new Koa();
const router = new Router();

const graphqlMiddleware = graphqlKoa({ schema });
router.get('/graphql', graphqlMiddleware);
router.post('/graphql', graphqlMiddleware);
router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }));

if (process.env.NODE_ENV === 'production') {
  const manifestFile = path.resolve(__dirname, 'webpack-manifest.json');
  if (!fs.existsSync(manifestFile)) {
    throw new Error(`Can't find webpack manifest at: '${manifestFile}`);
  }
  const manifest = JSON.parse(fs.readFileSync(manifestFile, 'utf-8'));
  Object.values(manifest).forEach(file => {
    router.get(`/${file}`, async ctx => {
      await send(ctx, ctx.path, {
        immutable: true,
        root: __dirname,
      });
    });
  });
} else {
  console.log('in dev mode');
  console.log('in dev mode');
}

app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())
  .use(renderPage);

export default app;

