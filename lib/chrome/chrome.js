// @flow
import CDP from 'chrome-remote-interface';
import Defaults from 'chrome-remote-interface/lib/defaults';

import type { chromeOption, DevToolsProtocolClient } from './types/chrome';

/**
 * chrome default option
 */
export const defaultChromeOption = {
  host: Defaults.HOST,
  port: Defaults.PORT,
  secure: true,
};

/**
 * Convert to object corresponding to chrome launcher option.
 */
export function mergeDefaultChromeOption(option?: Object): chromeOption {
  return Object.assign({}, defaultChromeOption, option);
}

/**
 * @type {Chrome}
 */
export default class Chrome {
  option: chromeOption;
  client: DevToolsProtocolClient;

  /**
   * chrome class constructor
   */
  constructor(options?: Object) {
    this.option = mergeDefaultChromeOption(options);
  }

  /**
   * try connect at chrome devtools protocol
   */
  async connectDevToolsProtocolClient(): Promise<> {
    if (!this.client) {
      const [tab] = await CDP.List();
      this.client = await CDP({ host: this.option.host, target: tab });
    }

    return this;
  }

  /**
   * fetch devtools-protocol client
   */
  async fetchProtocol(): Promise<DevToolsProtocolClient> {
    await this.connectDevToolsProtocolClient().catch(e => this.terminate().then(() => {
      throw e;
    }));

    return this.client;
  }

  /**
   * terminate chrome.
   */
  async terminate(): Promise<> {
    if (this.client) {
      await this.client.close();
      delete this.client;
    }
    return this;
  }
}
