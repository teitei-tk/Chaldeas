// @flow
import CDP from 'chrome-remote-interface';
import Defaults from 'chrome-remote-interface/lib/defaults';

import Launcher, { defaultConfig as defaultLaunchConfig } from './launcher';

import type { launcher } from './types/launcher';
import type { chromeOptionProperties } from './types/chrome';

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
  client: any;

  constructor(options: Object) {
    this.option = mergeDefaultOption(options);
  }

  async initialize() {
    this.launcher = new Launcher(defaultLaunchConfig);
    await this.launcher.start();

    const [tab] = await CDP.List();
    this.client = await CDP({ host: this.option.host, target: tab });

    return this;
  }

  async run(): Promise<any> {
    await this.initialize().catch(e => this.terminate().then(() => {
      throw e;
    }));

    return this.client;
  }

  async getPage(): any {
    return this.client.Page;
  }

  async terminate(): Promise<{}> {
    this.client.close();
    const r = await this.launcher.terminate();
    return r;
  }
}
