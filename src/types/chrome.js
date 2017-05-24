// @flow
import Interface from 'chrome-remote-interface/lib/chrome';

export type chromeTypes = {
  constructor(config?: Object): void;
  defaultErrorFunc(): Function;
  reboot(): Promise<{}>;
  addErrorLisntner(callback: Function): void;
  run(): Promise<Interface>;
};
