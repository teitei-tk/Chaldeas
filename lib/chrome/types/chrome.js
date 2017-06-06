// @flow

import type { page } from './devtools/page';
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

export type devToolsProtocolClient = {
  Protocol: Promise<{}>;
  List: Promise<{}>;
  New: Promise<{}>;
  Activate: Promise<{}>;
  Close: Promise<{}>;
  Version: Promise<{}>;

  /* domains */
  Page: page;

  DOM: any;
  DOMDebugger: any;
  Debugger: any;
  Emulation: any;
  Input: any;
  Network: any;
  Profiler: any;
  Runtime: any;
  Schema: any;

  close(): void;
}

export type chrome = {
  option: chromeOptionProperties;
  client: devToolsProtocolClient;

  /* methods */
  constructor(option?: Object): void;
  connectDevToolsProtocolClient(): Promise<Chrome>;
  fetchProcotol(): Promise<devToolsProtocolClient>;
  terminate(): Promise<Chrome>;
};
