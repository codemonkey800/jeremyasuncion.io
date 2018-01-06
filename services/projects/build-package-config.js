import fs from 'fs';
import pkg from './package.json';

const whitelist = [
  'name',
  'version',
  'license',
  'engines',
  'dependencies',
];

(() => {
  const config = Object
    .keys(pkg)
    .filter(key => whitelist.includes(key))
    .reduce(
      (acc, key) => Object.assign({}, acc, { [key]: pkg[key] }),
      {},
    );
  config.scripts = { start: 'node .' };

  fs.writeFileSync('dist/package.json', JSON.stringify(config));
})();
