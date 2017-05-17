const { ChromeLauncher } = require('lighthouse/lighthouse-cli/chrome-launcher')

const defaultConfig = {
  port: 9222,
  autoSelectChrome: true,
  additionalFlags: [
    '--window-size=412,732',
    '--disable-gpu',
    '--headless'
  ]
};

class Launcher {
  constuctor(config = {}) {
    this.config = this.mergeConfig(config)
    this.chromeLauncher = new ChromeLauncher(this.config);
  }

  mergeConfig(config = {}) {
    return Object.assign({}, defaultConfig, config)
  }

  terminate() {
    return this.chromeLauncher.kill();
  }

  start() {
    return this.chromeLauncher.run().then(() => launcher).catch(err => {
      return this.terminate().then(() => {
        throw err;
      }, console.error);
    });
  }
}

module.exports = Launcher;
