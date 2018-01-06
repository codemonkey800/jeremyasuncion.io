import '@babel/polyfill';
import log from './utils/log';
import startProxy from './start-proxy';

async function loadEnvironmentVariables() {
  const dotenv = await import('dotenv');
  const {
    exists,
    writeFile,
  } = await import('./utils/fs');

  // Use .env file. If it doesn't exist, use .env.sample instead.
  const path = await exists('.env')
    ? '.env'
    : '.env.sample';

  // If `path` does not exist, then it means we're using .env.sample and the
  // file does not exist. If this happens, we create an empty file named
  // .env.sample.
  const pathExists = await exists(path);
  if (!pathExists) {
    await writeFile(path, '');
    log(`Created empty env file: ${path}`);
  }

  const { parsed } = dotenv.config({ path });
  log(`Loaded environment variables from file: ${path}`);
  log('Loaded the following variables:');

  Object
    .keys(parsed)
    .forEach(key => log(`  ${key} = ${parsed[key]}`));
}

async function main() {
  if (process.env.NODE_ENV !== 'production') await loadEnvironmentVariables();
  await startProxy();
}

if (!module.parent) main();
