// @flow

import type { Page } from './devtools/page';
import type { Network } from './devtools/network';
import type { DOM } from './devtools/dom';
import type { Runtime } from './devtools/runtime';

import Chrome from './../chrome';

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

  /* domains */
  Page: Page;
  Network: Network;
  DOM: DOM;
  Runtime: Runtime;

  DOMDebugger: any;
  Debugger: any;
  Emulation: any;
  Input: any;
  Profiler: any;
  Schema: any;

  close(): void;
}

export type chrome = {
  option: chromeOptionProperties;
  client: devToolsProtocolClient;

  /* methods */
  constructor(option?: Object): void;
  connectDevToolsProtocolClient(): Promise<Chrome>;
  fetchProtocol(): Promise<devToolsProtocolClient>;
  terminate(): Promise<Chrome>;
};
