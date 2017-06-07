// @flow
import Chrome from './chrome/chrome';
import Launcher from './chrome/launcher';

import type { chrome as chromeType, devToolsProtocolClient } from './chrome/types/chrome';
import type { launcher as launcherType } from './chrome/types/launcher';

export default class Chaldeas {
  chrome: chromeType;
  launcher: launcherType;

  constructor(chrome: Chrome, launcher: Launcher) {
    this.chrome = chrome;
    this.launcher = launcher;
  }

  static new(chromeOption?: Object, launchOption?: Object): Chaldeas {
    const chrome = new Chrome(chromeOption);
    const launcher = new Launcher(launchOption);

    return new Chaldeas(chrome, launcher);
  }

  async dispatch() {
    if (!this.launcher.isLaunched()) {
      await this.launcher.start();
    }

    await this.chrome.connectDevToolsProtocolClient();
  }

  async fetchProtocol(): Promise<devToolsProtocolClient> {
    const procotol = await this.dispatch().then(async () => {
      const client = await this.chrome.fetchProcotol();
      return client;
    });

    return procotol;
  }

  async terminate() {
    await this.chrome.terminate();
    await this.launcher.terminate();
  }
}
