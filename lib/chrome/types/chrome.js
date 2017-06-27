// @flow
import type { Page as page } from './devtools/page';
import type { Network as network } from './devtools/network';
import type { DOM as dom } from './devtools/dom';
import type { Runtime as runtime } from './devtools/runtime';
import type { Emulation as emulation } from './devtools/emulation';
import type { Input as input } from './devtools/input';
import type { Target as target } from './devtools/target';
import type { Security as security } from './devtools/security';

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
