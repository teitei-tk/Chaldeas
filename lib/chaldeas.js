// @flow
import Chrome from './chrome/chrome';
import Launcher from './chrome/launcher';

import DevToolsInterface from './chrome/devtools';

import type { chrome as chromeType, devToolsProtocolClient } from './chrome/types/chrome';
import type { launcher as launcherType } from './chrome/types/launcher';

/**
 * @type {Chaldeas}
 */
export default class Chaldeas {
  chrome: chromeType;
  launcher: launcherType;

  /**
   */
  constructor(chrome: Chrome, launcher: Launcher) {
    this.chrome = chrome;
    this.launcher = launcher;
  }

  /**
   * constructor alias,
   */
  static new(chromeOption?: Object, launchOption?: Object): Chaldeas {
    const chrome = new Chrome(chromeOption);
    const launcher = new Launcher(launchOption);

    return new Chaldeas(chrome, launcher);
  }

  /**
   * Chrome Launch with Headlessmode and Connect devtools protocol
   */
  async dispatch() {
    if (!this.launcher.isLaunched()) {
      await this.launcher.start();
    }

    await this.chrome.connectDevToolsProtocolClient();
  }

  /**
   * fetch chromedevtools protocol client
   */
  async fetchProtocol(): Promise<devToolsProtocolClient> {
    const procotol = await this.dispatch().then(async () => {
      const client = await this.chrome.fetchProtocol();
      return client;
    }).catch(e => this.terminate().then(() => {
      throw e;
    }));

    return procotol;
  }

  /**
 * get DevToolsInterface class
 */
  async getDevtoolsInterface(): Promise<DevToolsInterface> {
    const client = await this.fetchProtocol();
    return new DevToolsInterface(client);
  }

  /**
   * terminate chrome and disconnect devToolsProtocol
   */
  async terminate() {
    await this.chrome.terminate();
    await this.launcher.terminate();
  }
}
