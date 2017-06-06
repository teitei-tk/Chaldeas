// @flow

import type { page } from './devtools/page';

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

export type chrome = {
  option: chromeOptionProperties;
  client: any;
};

export type devToolsProtocolClient = {
  Protocol: Promise<{}>;
  List: Promise<{}>;
  New: Promise<{}>;
  Activate: Promise<{}>;
  Close: Promise<{}>;
  Version: Promise<{}>;

  Page: page;
}
