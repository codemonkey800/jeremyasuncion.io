/* eslint-disable no-console */

import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import Router from 'koa-router';
import {
 graphiqlKoa,
 graphqlKoa,
} from 'graphql-server-koa';

import schema from '../shared/schema';
import { renderPage } from './ssr';

const host = process.env.HOST || '0.0.0.0';
const port = parseInt(process.env.PORT || 8080, 10);

const app = new Koa();
const router = new Router();

const graphqlMiddleware = graphqlKoa({ schema });
router.get('/graphql', graphqlMiddleware);
router.post('/graphql', graphqlMiddleware);
router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }));

app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())
  .use(ctx => renderPage(ctx));

function main() {
  process.exit();
  app.listen(port, host, () => {
    console.log(`Started server at ${host}:${port}`);
  });
}

if (!module.parent) main();

