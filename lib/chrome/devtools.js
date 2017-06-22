// @flow

import type { devToolsProtocolClient } from './types/chrome';
import type { Page } from './types/devtools/page';
import type { Network } from './types/devtools/network';
import type { DOM } from './types/devtools/dom';
import type { Runtime } from './types/devtools/runtime';
import type { Emulation } from './types/devtools/emulation';
import type { Input } from './types/devtools/input';
import type { Target } from './types/devtools/target';
import type { Security } from './types/devtools/security';

/**
 * @type {DevTools}
 */
export default class DevTools {
  client: devToolsProtocolClient;

  constructor(client: devToolsProtocolClient) {
    this.client = client;
  }

  async PageDomain(): Promise<Page> {
    await this.client.Page.enable();
    return this.client.Page;
  }

  async NetworkDomain(): Promise<Network> {
    await this.client.Network.enable();
    return this.client.Network;
  }

  async DOMDomain(): Promise<DOM> {
    await this.client.DOM.enable();
    return this.client.DOM;
  }

  async RuntimeDomain(): Promise<Runtime> {
    return this.client.Runtime;
  }

  async EmulationDomain(): Promise<Emulation> {
    return this.client.Emulation;
  }

  async InputDomain(): Promise<Input> {
    return this.client.Input;
  }

  async TargetDomain(): Promise<Target> {
    return this.client.Target;
  }

  async SecurityDomain(enabled?: boolean): Promise<Security> {
    if (enabled) {
      await this.client.Security.enable();
    }

    return this.client.Security;
  }
}
