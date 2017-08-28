# Chaldeas
Chaldeas is a library that can automatically launch Chrome as Headless mode and Provide Devtools Protocol API at node.js

[![npm version](https://badge.fury.io/js/chaldeas.svg)](https://badge.fury.io/js/chaldeas)
[![Document](https://teitei-tk.github.io/Chaldeas/badge.svg)](https://teitei-tk.github.io/Chaldeas/)
[![Docker Automated buil](https://img.shields.io/docker/automated/jrottenberg/ffmpeg.svg)](https://hub.docker.com/r/teitei/chaldeas/)
[![Docker Build Statu](https://img.shields.io/docker/build/jrottenberg/ffmpeg.svg)](https://hub.docker.com/r/teitei/chaldeas/)

## Dependency
* Node 6.10.3 or later
* GoogleChrome Version59 later or Canary
* babel-runtime 6.23.0 or later
* chrome-remote-interface 0.22.0 or later
* lighthouse 1.6.5 or later
* chrome-remote-interface-flowtype 0.1.2 or later

## Architecture
* AsyncAwait Support (babel-preset-es2017)
* flowtype Support
* eslint

## API Document
* https://teitei-tk.github.io/Chaldeas/

## Example
Print Page PDF

```bash
$ yarn add --dev chaldeas
```

```JavaScript
import { writeFile } from 'fs';
import Chaldeas from 'chaldeas';

async function main() {
  const chaldeas = Chaldeas.new();

  try {
    const protocol = await chaldeas.fetchProtocol();

    const { Page, Network } = protocol;
    await Promise.all([
      Page.enable(),
      Network.enable(),
    ]);

    await Page.navigate({ url: 'https://github.com' });

    await Page.loadEventFired(async () => {
      const result = await Page.printToPDF();
      const fileName = (new Date()).getTime();
      const buffer = Buffer.from(result.data, 'base64');
      writeFile(`${fileName}.pdf`, buffer, (e) => {
        if (e) {
          throw e;
        }
      });

      await chaldeas.terminate();
    });
  } catch (error) {
    await chaldeas.terminate();
    console.error(error);
  }
}

main();
```

## Development
1. install npm modules
    * ```bash
      $ yarn
      ```
1. Docker
  * ```bash
    $ yarn chrome:launch // alias of `yarn build; docker run -it -d --rm --name chaldeas --shm-size=1024m --cap-add=SYS_ADMIN -v `pwd`:/data teitei/chaldeas;`
    $ docker attach chaldeas

    root@ebcb835b0fcc:/data# ./node_modules/.bin/babel-node example/printPdf.js
    root@ebcb835b0fcc:/data# ls
    1497018362340.pdf  LICENSE    example  node_modules  src             yarn.lock
    Dockerfile         README.md  lib      package.json  yarn-error.log
    ```

## Contributing
Bug reports and pull requests are welcome :) on GitHub at https://github.com/teitei-tk/Chaldeas.

## Reference
* https://developers.google.com/web/updates/2017/04/headless-chrome
* https://chromedevtools.github.io/devtools-protocol/tot/

## LICENSE
Apache License 2.0
