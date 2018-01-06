import chokidar from 'chokidar';
import { diff } from 'deep-diff';
import EventEmitter from 'events';
import ProxyRules from 'http-proxy-rules';
import {
  exists,
  readFile,
  writeFile,
} from './utils/fs';
import log from './utils/log';

const DEFAULT_CONFIG_FILE = 'proxy.json';

async function maybeInitConfig(path) {
  const pathExists = await exists(path);
  if (!pathExists) {
    const emptyConfig = { rules: {} };
    await writeFile(path, JSON.stringify(emptyConfig));
    log(`Created proxy configuration file: ${path}`);
  }
}

async function parseConfig(path) {
  try {
    return JSON.parse(await readFile(path, 'utf-8'));
  } catch (_) {
    log(`Check config file for errors: ${path}`);
    return null;
  }
}

/**
 * Class representing the proxy configuration file. The only given option is
 * the location of the config file, which is defined by the CONFIG_FILE
 * environment variable. What's special about this config class is that it
 * allows reloading of the config. When the config file is changed, the class
 * will detect changes and emit a 'changed' event to the proxy service.
*/
export default class Config extends EventEmitter {
  static async init(path = DEFAULT_CONFIG_FILE) {
    await maybeInitConfig(path);
    const config = await parseConfig(path);
    return new Config(path, config);
  }

  /**
   * Create a new config. This constructor should not be called directly.
   * Instead, a user should use the static function `Config.init()` because the
   * class has to perform asynchronous work to be initialized fully.
   * @param {String} path Path to the config file.
   * @param {Object} config Object containing rules mapping source URL to destination URL.
   */
  constructor(path, config) {
    super();
    this._path = path;
    this._config = config;
    this._rules = new ProxyRules(config);
    this._watcher = chokidar.watch(path, { ignoreInitial: true });
    this._watcher.on('change', this._handleConfigChange.bind(this));
  }

  get rules() {
    return this._rules;
  }

  async _handleConfigChange(path) {
    // Parse modified config. If the value returned is `null`, then the config is
    // currently in an unreadable state, so we skip updating.
    const nextConfig = await parseConfig(path);
    if (!nextConfig) return;

    // If the serialized config objects are the same, then skip updating.
    if (JSON.stringify(this._config) === JSON.stringify(nextConfig)) return;

    this.emit('changed', diff(this._config, nextConfig));
    this._config = nextConfig;
    this._rules = new ProxyRules(nextConfig);
  }
}
