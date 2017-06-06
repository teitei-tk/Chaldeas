// @flow
import CDP from 'chrome-remote-interface';
import Defaults from 'chrome-remote-interface/lib/defaults';

import Launcher, { defaultConfig as defaultLaunchConfig } from './launcher';

import type { launcher } from './types/launcher';
import type { chromeOptionProperties, devToolsProtocolClient } from './types/chrome';

export const defaultOption = {
  host: Defaults.HOST,
  port: Defaults.PORT,
  secure: true,
};

export function mergeDefaultOption(conf: Object): chromeOptionProperties {
  return Object.assign({}, defaultOption, conf);
}

export default class Chrome {
  option: chromeOptionProperties;
  launcher: launcher;
  client: devToolsProtocolClient;

  constructor(options: Object) {
    this.option = mergeDefaultOption(options);
  }

  async connectDevToolsProtocolClient(): Promise<Chrome> {
    if (!this.launcher) {
      this.launcher = new Launcher(defaultLaunchConfig);
    }

    if (!this.launcher.isLaunched()) {
      await this.launcher.start();
    }

    if (!this.client) {
      const [tab] = await CDP.List();
      this.client = await CDP({ host: this.option.host, target: tab });
    }

    return this;
  }

  async run(): Promise<any> {
    await this.connectDevToolsProtocolClient().catch(e => this.terminate().then(() => {
      throw e;
    }));

    return this.client;
  }

  async terminate(): Promise<{}> {
    this.client.close();
    const r = await this.launcher.terminate();
    return r;
  }
}
