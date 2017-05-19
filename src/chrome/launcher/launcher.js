// @flow
import { ChromeLauncher } from 'lighthouse/lighthouse-cli/chrome-launcher';

import type { launchConfig, chromeLauncherType } from './types';

const defaultConfig = {
  port: 9222,
  autoSelectChrome: true,
  additionalFlags: [
    '--window-size=412,732',
    '--disable-gpu',
    '--headless',
  ],
};

function mergeConfig(config: any): launchConfig {
  return Object.assign({}, config, defaultConfig);
}

export {
  defaultConfig,
  mergeConfig,
};

export default class Launcher {
  config: launchConfig;
  chromeLauncher: chromeLauncherType;

  constuctor(config: launchConfig): void {
    this.config = mergeConfig(config);
    this.chromeLauncher = new ChromeLauncher(this.config);
  }

  terminate(): Promise<{}> {
    return this.chromeLauncher.kill();
  }

  async start(): Promise<{}> {
    return this.chromeLauncher.run().catch(err => this.terminate().then(() => {
      throw err;
    }));
  }
}