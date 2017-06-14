// @flow
import { ChromeLauncher } from 'lighthouse/lighthouse-cli/chrome-launcher';

import type { launchConfig, chromeLauncherType } from './types/launcher';

/**
 * chrome headless mode launch default options
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
 */
export function mergeConfig(config?: Object): launchConfig {
  return Object.assign({}, defaultConfig, config);
}

/**
 * @type {Launcher}
 */
export default class Launcher {
  /**
   * launcher config
   */
  config: launchConfig;

  /**
   * lighthouse/lighthouse-cli/chrome-launcher instance
   */
  chromeLauncher: chromeLauncherType;

  /**
   */
  constructor(config?: Object): void {
    this.config = mergeConfig(config);
    this.chromeLauncher = new ChromeLauncher(this.config);
  }

  /**
   * check chrome is launched?
   */
  isLaunched(): boolean {
    if (this.chromeLauncher.chrome) {
      return true;
    }

    return false;
  }

  /**
   * chrome reboot method.
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
   */
  async terminate(): Promise<{}> {
    return this.chromeLauncher.kill();
  }

  /**
   * Launch Chrome with Background.
   */
  async start(): Promise<{}> {
    return this.chromeLauncher.run().catch(err => this.terminate().then(() => {
      throw err;
    }));
  }
}
