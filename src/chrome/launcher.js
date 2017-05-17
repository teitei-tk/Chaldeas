import { ChromeLauncher } from 'lighthouse/lighthouse-cli/chrome-launcher';

const defaultConfig = {
  port: 9222,
  autoSelectChrome: true,
  additionalFlags: [
    '--window-size=412,732',
    '--disable-gpu',
    '--headless',
  ],
};

const mergeConfig = (config = {}) => Object.assign({}, defaultConfig, config);

export {
  defaultConfig,
  mergeConfig,
};

export default class Launcher {
  constuctor(config = {}) {
    this.config = mergeConfig(config);
    this.chromeLauncher = new ChromeLauncher(this.config);
  }

  terminate() {
    return this.chromeLauncher.kill();
  }

  start() {
    return this.chromeLauncher.run().catch(err => this.terminate().then(() => {
      throw err;
    }));
  }
}
