// @flow
import { ChromeLauncher } from 'lighthouse/lighthouse-cli/chrome-launcher';

import type { launchConfig, chromeLauncherType } from './types/launcher';

/**
 * chrome headless mode launch default options
 * @type {Object}
 */
export const defaultConfig = {
  port: 9222,
  autoSelectChrome: true,
  additionalFlags: [
    '--window-size=412,732',
    '--disable-gpu',
    '--headless',
  ],
};

/**
 * Convert to object corresponding to chrome launcher option.
 * @param  {Obejct} config
 * @return {Object} result is {
 *     port: Number,
 *     autoSelectChrome: Boolean,
 *     additionalFlags: Array<String>
 * }
 */
export function mergeConfig(config?: Object): launchConfig {
  return Object.assign({}, defaultConfig, config);
}

export default class Launcher {
  /**
   * launcher config
   * @type {Object}
   */
  config: launchConfig;

  /**
   * lighthouse/lighthouse-cli/chrome-launcher instance
   * @type {ChromeLauncher}
   */
  chromeLauncher: chromeLauncherType;

  /**
   * @param {Object} chrome launch config
   */
  constructor(config?: Object): void {
    this.config = mergeConfig(config);
    this.chromeLauncher = new ChromeLauncher(this.config);
  }

  /**
   * check chrome is launched?
   * @return {Boolean}
   */
  isLaunched(): boolean {
    if (this.chromeLauncher.chrome) {
      return true;
    }

    return false;
  }

  /**
   * chrome reboot method.
   * @return {Promise}
   */
  async reboot(): Promise<{}> {
    if (!this.isLaunched()) {
      const s = await this.start();
      return s;
    }

    await this.terminate();
    const r = await this.start();
    return r;
  }

  /**
   * chrome is terminate
   * @type {Promise}
   */
  async terminate(): Promise<{}> {
    return this.chromeLauncher.kill();
  }

  /**
   * Launch Chrome with Background.
   * @type {Promis}
   */
  async start(): Promise<{}> {
    return this.chromeLauncher.run().catch(err => this.terminate().then(() => {
      throw err;
    }));
  }
}
