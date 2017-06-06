// @flow
import CDP from 'chrome-remote-interface';
import Defaults from 'chrome-remote-interface/lib/defaults';

import type { chromeOptionProperties, devToolsProtocolClient } from './types/chrome';

export const defaultOption = {
  host: Defaults.HOST,
  port: Defaults.PORT,
  secure: true,
};

export function mergeDefaultOption(option?: Object): chromeOptionProperties {
  return Object.assign({}, defaultOption, option);
}

export default class Chrome {
  option: chromeOptionProperties;
  client: devToolsProtocolClient;

  constructor(options?: Object) {
    this.option = mergeDefaultOption(options);
  }

  async connectDevToolsProtocolClient(): Promise<Chrome> {
    if (!this.client) {
      const [tab] = await CDP.List();
      this.client = await CDP({ host: this.option.host, target: tab });
    }

    return this;
  }

  async fetchProcotol(): Promise<devToolsProtocolClient> {
    await this.connectDevToolsProtocolClient().catch(e => this.terminate().then(() => {
      throw e;
    }));

    return this.client;
  }

  async terminate(): Promise<Chrome> {
    await this.client.close();
    delete this.client;
    return this;
  }
}
