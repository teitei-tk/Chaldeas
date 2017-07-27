// @flow

export type launchOption = {
  port: number,
  autoSelectChrome: boolean,
  additionalFlags: Array<string>
};

export type chromeLauncherType = {
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
};

export type Launcher = {
  config: launchOption;
  chromeLauncher: chromeLauncherType;

  constructor(config?: Object): void;
  isLaunched(): boolean;
  reboot(): Promise<{}>;
  terminate(): Promise<{}>;
  start(): Promise<{}>;
}
