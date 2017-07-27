// @flow

import type {
  Page, Network, DOM,
  Runtime, Input, Emulation,
  Target, Security,
} from 'chrome-remote-interface-flowtype';

export type chromeDefaultOption = {
  host: string;
  port: number;
  secure: boolean;
};

export type chromeOption = {
  host: string;
  port: number;
  secure: boolean;
  target: Function;
};

/**
 * @type {Object}
 */
export type DevToolsProtocolClient = {
  Protocol: Promise<>;
  List: Promise<>;
  New: Promise<>;
  Activate: Promise<>;
  Close: Promise<>;
  Version: Promise<>;

  Page: Page;
  Network: Network;
  DOM: DOM;
  Runtime: Runtime;
  Input: Input;
  Emulation: Emulation;
  Target: Target;
  Security: Security;

  close(): void;
};

export type Chrome = {
  option: chromeOption;
  client: DevToolsProtocolClient;

  constructor(option?: Object): void;
  connectDevToolsProtocolClient(): Promise<>;
  fetchProtocol(): Promise<DevToolsProtocolClient>;
  terminate(): Promise<>;
};
