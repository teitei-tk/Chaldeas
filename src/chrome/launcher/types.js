// @flow

export type launchConfig = {
  port: number,
  autoSelectChrome: boolean,
  additionalFlags: Array<string>
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
    constructor(opts?: {
        startingUrl?: string,
        additionalFlags?: Array<string>,
        autoSelectChrome?: Boolean,
        port?: number
    }): void;
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

export type launcher = {

}
