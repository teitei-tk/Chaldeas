// @flow

import type {
  Page, Network, DOM,
  Runtime, Input, Emulation,
  Target, Security,
} from 'chrome-remote-interface-flowtype';

import type { DevToolsProtocolClient } from './types/chrome';

/**
 * @type {DevTools}
 */
export default class DevTools {
  client: DevToolsProtocolClient;

  /**
   * @param {DevToolsProtocolClient} client
   */
  constructor(client: DevToolsProtocolClient) {
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
