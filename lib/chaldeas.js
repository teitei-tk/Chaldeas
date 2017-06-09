// @flow
import Chrome from './chrome/chrome';
import Launcher from './chrome/launcher';

import type { chrome as chromeType, devToolsProtocolClient } from './chrome/types/chrome';
import type { launcher as launcherType } from './chrome/types/launcher';

export default class Chaldeas {
  chrome: chromeType;
  launcher: launcherType;

  /**
   * @public
   * @param  {Chrome} chrome
   * @param  {Launcher} launcher
   */
  constructor(chrome: Chrome, launcher: Launcher) {
    this.chrome = chrome;
    this.launcher = launcher;
  }

  /**
   * constructor alias,
   *
   * @public
   * @param  {Object} chromeOption [default is { host: 'localhost': port: 9222, secure: true }]
   * @param  {Object} launchOption [default is {
   *   port: 9222, autoSelectChrome: true,
   *   additionalFlags['--window-size412,732', '--disable-gpu', '--headless']
   *   }]
   * @return {Chaldeas}
   */
  static new(chromeOption?: Object, launchOption?: Object): Chaldeas {
    const chrome = new Chrome(chromeOption);
    const launcher = new Launcher(launchOption);

    return new Chaldeas(chrome, launcher);
  }

  /**
   * Chrome Launch with Headlessmode and Connect devtools protocol
   *
   * @public
   * @return {Promise}
   */
  async dispatch() {
    if (!this.launcher.isLaunched()) {
      await this.launcher.start();
    }

    await this.chrome.connectDevToolsProtocolClient();
  }

  /**
   * fetch chromedevtools protocol client
   *
   * @public
   * @return {Promise} [Promise<devToolsProtocolClient>]
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
   * terminate chrome and disconnect devToolsProtocol
   *
   * @public
   * @return {Promise}
   */
  async terminate() {
    await this.chrome.terminate();
    await this.launcher.terminate();
  }
}
