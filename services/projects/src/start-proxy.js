import { createServer } from 'http';
import { createProxy } from 'http-proxy';
import Config from './config';
import log from './utils/log';

function printConfigChanges({
  kind,
  lhs,
  path,
  rhs,
}) {
  switch (kind) {
    case 'D':
      if (path[0] === 'default') {
        log('  Removed proxy default target.');
        break;
      }

      log(`  Removed rule for source ${path[1]}`);
      break;
    case 'E':
      if (path[0] === 'default') {
        log(`  Updated proxy default target: ${lhs} -> ${rhs}`);
        break;
      }

      log(`  Updated target for proxy rule (${path[1]}): ${lhs} -> ${rhs}`);
      break;
    case 'N':
      if (path[0] === 'default') {
        log(`  Added proxy default target: ${rhs}`);
        break;
      }

      log(`  Added new proxy rule: ${path[1]} -> ${rhs}`);
      break;
    default:
      break;
  }
}

export default async function startProxy() {
  const config = await Config.init(process.env.CONFIG_FILE);
  const port = parseInt(process.env.PORT, 10);

  config.on('changed', diffs => {
    log('Proxy config changes:');
    diffs.forEach(printConfigChanges);
  });

  const proxy = createProxy();
  const server = createServer((req, res) => {
    const target = config.rules.match(req);
    if (!target) {
      const message = `Unable to resolve: ${req.url}`;
      log(message);
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end(message);
      return;
    }

    log(`Resolved proxy request: ${req.url} -> ${target}`);
    proxy.web(req, res, { target });
  });

  server.listen(port, () => log(`Started server at http://localhost:${port}`));
}
