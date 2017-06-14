// @flow

import type { devToolsProtocolClient } from './types/chrome';
import type { Page } from './types/devtools/page';
import type { Network } from './types/devtools/network';
import type { DOM } from './types/devtools/dom';

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
}
