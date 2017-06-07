# Chaldeas

[![npm version](https://badge.fury.io/js/chaldeas.svg)](https://badge.fury.io/js/chaldeas)
[![Dependency Status](https://gemnasium.com/badges/github.com/teitei-tk/Chaldeas.svg)](https://gemnasium.com/github.com/teitei-tk/Chaldeas)

## Dependency
* GoogleChrome Version59 later or Canary
* babel-runtime 6.23.0 or later
* chrome-remote-interface 0.22.0 or later
* lighthouse 1.6.5 or later

## Architecture
* AsyncAwait Support (babel-preset-es2017)
* flowtype Support
* eslint

## Example

Capture Page Screenshot

```bash
$ yarn add --dev chaldeas
```

```JavaScript
import Chaldeas from 'chaldeas'

const instance = Chaldeas.new();

instance.fetchProtocol().then((procotol) => {
  Promise.all([
    procotol.Network.enable(),
    procotol.Page.enable()
  ]).then(() => {
    procotol.Page.navigate({ url : 'https://github.com' });
    procotol.Page.captureScreenshot().then((cap) => {
      const buffer = Buffer.from(cap.data, 'base64');
      fs.writeFile('github.png', buffer, (err) => {
        throw err;
      })
    }).then(() => {
      instance.terminate();
    });
  });

}).catch((e) => instance.terminate().then(() => {
  throw e
}));

```

## Development
1. must be Install Chrome Version 59 or later
   * https://www.google.com/chrome/browser/canary.html
1. install npm modules
    * ```bash
      $ yarn
      ```

## Reference
* https://developers.google.com/web/updates/2017/04/headless-chrome
