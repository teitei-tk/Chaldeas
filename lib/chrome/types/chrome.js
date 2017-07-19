// @flow
import type {
  Page as page,
  Network as network,
  DOM as dom,
  Runtime as runtime,
  Input as input,
  Emulation as emulation,
  Target as target,
  Security as security,
} from 'chrome-remote-interface-flowtype';

import ChromeClaass from './../chrome';

export type chromeDefaultConfig = {
  host: string;
  port: number;
  secure: boolean;
};

export type chromeOptionProperties = {
  host: string;
  port: number;
  secure: boolean;
  target: Function;
};

/**
 * @type {Object}
 */
export type devToolsProtocolClient = {
  Protocol: Promise<{}>;
  List: Promise<{}>;
  New: Promise<{}>;
  Activate: Promise<{}>;
  Close: Promise<{}>;
  Version: Promise<{}>;

  Page: page;
  Network: network;
  DOM: dom;
  Runtime: runtime;
  Input: input;
  Emulation: emulation;
  Target: target;
  Security: security;

  close(): void;
};

export type chrome = {
  option: chromeOptionProperties;
  client: devToolsProtocolClient;

  constructor(option?: Object): void;
  connectDevToolsProtocolClient(): Promise<ChromeClaass>;
  fetchProtocol(): Promise<devToolsProtocolClient>;
  terminate(): Promise<ChromeClaass>;
};
