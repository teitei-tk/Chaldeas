// @flow
import EventEmitter from 'events';
import Interface from 'chrome-remote-interface/lib/chrome';

import Launcher from './launcher';
import type { launcherType } from './types/launcher';

export default class Chrome {
  emitter: EventEmitter;
  launcher: launcherType;

  // TODO: append chrome config value to argments
  constructor(config?: Object): void {
    this.launcher = new Launcher(config);
    this.emitter = new EventEmitter();
    this.emitter.on('error', this.defaultErrorFunc);
  }

  defaultErrorFunc(): Function {
    return () => this.launcher.terminate();
  }

  async reboot(): Promise<{}> {
    await this.launcher.terminate();
    return this.launcher.start();
  }

  addErrorLisntner(callback: Function): void {
    this.emitter.on('error', callback);
  }

  async run(): Promise<Interface> {
    await this.launcher.start();

    const getProtcol = protocol => protocol;
    this.emitter.once('connect', getProtcol);

    await new Interface(undefined, this.emitter);
    return Promise.all([getProtcol]).then(results => results[0]);
  }
}
