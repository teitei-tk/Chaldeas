// @flow

import type {
  Page, Network, DOM,
  Runtime, Input, Emulation,
  Target, Security,
} from 'chrome-remote-interface-flowtype';

import type { Chrome as chromeType } from './../lib/chrome/types/chrome';
import type { Launcher as launcherType } from './../lib/chrome/types/launcher';

declare class DevToolsProtocolClient {
  Protocol: Promise<>;
  List: Promise<>;
  New: Promise<>;
  Activate: Promise<>;
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
}

declare interface chromeOption {
  host: string,
  port: number;
  secure: boolean;
  target?: Function;
}

declare function mergeDefaultChromeOption(option?: Object): chromeOption;

declare class Chrome {
  option: chromeOption;
  client?: DevToolsProtocolClient;

  constructor(option?: Object): Chrome;
  connectDevToolsProtocolClient(): Promise<Chrome>;
  fetchProtocol(): Promise<DevToolsProtocolClient>;
  terminate(): Promise<Chrome>;
}

declare interface launchOption {
  port: number,
  autoSelectChrome: boolean,
  additionalFlags: Array<string>,
}

declare interface chromeLauncherType {
  prepared: boolean;
  pollInterval: number;
  autoSelectChrome: boolean;
  TMP_PROFILE_DIR: string;
  outFile: number;
  errFile: number;
  pidFile: string;
  startingUrl: string;
  additionalFlags: Array<string>;
  chrome: any;
  port: number;
  constructor(opts?: launchOption): void;
  flags(): void;
  prepare(): void;
  run(): Promise<{}>;
  spawn(execPath: string): Promise<any[]>;
  cleanup(client?: any): void;
  isDebuggerReady(): Promise<{}>;
  waitUntilReady(): Promise<{}>;
  kill(): Promise<{}>;
  destroyTmp(): Promise<{}>
}

declare function mergeDefaultLaunchOption(option?: Object): launchOption;

declare class Launcher {
  config: launchOption;
  chromeLauncher: chromeLauncherType;

  constructor(option?: Object): void;
  isLaunched(): boolean;
  reboot(): Promise<>;
  terminate(): Promise<>;
}

declare class DevTools {
  client: DevToolsProtocolClient;

  constructor(client: DevToolsProtocolClient): DevTools;
  PageDomain(): Promise<Page>;
  NetworkDomain(): Promise<Network>;
  DOMDomain(): Promise<DOM>;
  RuntimeDomain(): Promise<Runtime>;
  EmulationDomain(): Promise<Emulation>;
  InputDomain(): Promise<Input>;
  TargetDomain(): Promise<Target>;
  SecurityDomain(): Promise<Security>;
}

declare class Chaldeas {
  chrome: chromeType;
  launcher: launcherType;

  constructor(chrome: chromeType, launcher: launcherType): Chaldeas;
  static new(chromeOption?: Object, launcherOption?: Object): Chaldeas;
  dispatch(): Promise<Chaldeas>;
  fetchProtocol(): Promise<DevToolsProtocolClient>;
  getDevtoolsInterface(): Promise<DevTools>;
  terminate(): Promise<Chaldeas>;
}

declare interface ChaldeasExports {
  default: typeof Chaldeas;
  Chrome: typeof Chrome;
  Launcher: typeof Launcher;
}

declare module 'chaldeas' {
  declare module.exports: ChaldeasExports;
}
