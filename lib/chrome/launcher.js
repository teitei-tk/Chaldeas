// @flow
import { ChromeLauncher } from 'lighthouse/lighthouse-cli/chrome-launcher';

import type { launchOption, chromeLauncherType } from './types/launcher';

/**
 * chrome headless mode launch default options
 */
export const defaultLaunchOption = {
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
export function mergeLaunchOption(option?: Object): launchOption {
  return Object.assign({}, defaultLaunchOption, option);
}

/**
 * @type {Launcher}
 */
export default class Launcher {
  /**
   * launcher config
   */
  config: launchOption;

  /**
   * lighthouse/lighthouse-cli/chrome-launcher instance
   */
  chromeLauncher: chromeLauncherType;

  /**
   */
  constructor(option?: Object): void {
    this.config = mergeLaunchOption(option);
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
