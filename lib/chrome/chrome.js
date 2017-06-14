// @flow
import CDP from 'chrome-remote-interface';
import Defaults from 'chrome-remote-interface/lib/defaults';

import type { chromeOptionProperties, devToolsProtocolClient } from './types/chrome';

/**
 * chrome default option
 */
export const defaultOption = {
  host: Defaults.HOST,
  port: Defaults.PORT,
  secure: true,
};

/**
 * Convert to object corresponding to chrome launcher option.
 */
export function mergeDefaultOption(option?: Object): chromeOptionProperties {
  return Object.assign({}, defaultOption, option);
}

/**
 * @type {Chrome}
 */
export default class Chrome {
  option: chromeOptionProperties;
  client: devToolsProtocolClient;

  /**
   * chrome class constructor
   */
  constructor(options?: Object) {
    this.option = mergeDefaultOption(options);
  }

  /**
   * try connect at chrome devtools protocol
   */
  async connectDevToolsProtocolClient(): Promise<Chrome> {
    if (!this.client) {
      const [tab] = await CDP.List();
      this.client = await CDP({ host: this.option.host, target: tab });
    }

    return this;
  }

  /**
   * fetch devtools-protocol client
   */
  async fetchProtocol(): Promise<devToolsProtocolClient> {
    await this.connectDevToolsProtocolClient().catch(e => this.terminate().then(() => {
      throw e;
    }));

    return this.client;
  }

  /**
   * terminate chrome.
   */
  async terminate(): Promise<Chrome> {
    if (this.client) {
      await this.client.close();
      delete this.client;
    }
    return this;
  }
}
