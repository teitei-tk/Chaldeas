// @flow

export type launchConfig = {
  startUrl?: string,
  additionalFlags?: Array<string>,
  autoSelectChrome?: boolean,
  port?: number;
};

export type chromeLauncherType = {
    prepared: Boolean;
    pollInterval: number;
    autoSelectChrome: Boolean;
    TMP_PROFILE_DIR: string;
    outFile: number;
    errFile: number;
    pidFile: string;
    startingUrl: string;
    additionalFlags: Array<string>;
    chrome: any;
    port: number;
    constructor(opts?: launchConfig): void;
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

export type launcherType = {
  config: launchConfig;
  chromeLauncher: chromeLauncherType;

  constuctor(config: Object): void;
  start(): Promise<{}>;
  terminate(): Promise<{}>;
}
