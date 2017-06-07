// @flow
import { ChromeLauncher } from 'lighthouse/lighthouse-cli/chrome-launcher';

import type { launchConfig, chromeLauncherType } from './types/launcher';

export const defaultConfig = {
  port: 9222,
  autoSelectChrome: true,
  additionalFlags: [
    '--window-size=412,732',
    '--disable-gpu',
    '--headless',
  ],
};

export function mergeConfig(config?: Object): launchConfig {
  return Object.assign({}, defaultConfig, config);
}

export default class Launcher {
  config: launchConfig;
  chromeLauncher: chromeLauncherType;

  constructor(config?: Object): void {
    this.config = mergeConfig(config);
    this.chromeLauncher = new ChromeLauncher(this.config);
  }

  isLaunched(): boolean {
    if (this.chromeLauncher.chrome) {
      return true;
    }

    return false;
  }

  async reboot(): Promise<{}> {
    if (!this.isLaunched()) {
      const s = await this.start();
      return s;
    }

    await this.terminate();
    const r = await this.start();
    return r;
  }

  async terminate(): Promise<{}> {
    return this.chromeLauncher.kill();
  }

  async start(): Promise<{}> {
    return this.chromeLauncher.run().catch(err => this.terminate().then(() => {
      throw err;
    }));
  }
}
