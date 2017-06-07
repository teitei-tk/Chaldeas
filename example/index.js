// captureScreenshot
// from : https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-captureScreenshot
const fs = require('fs');
const chaldeas = require('./../src');

const Chaldeas = chaldeas.default;

const c = Chaldeas.new();
c.fetchProtocol().then((r) => {
  Promise.all([
    r.Network.enable(),
    r.Page.enable(),
  ]).then(() => {
    r.Page.navigate({ url: 'https://github.com/teitei-tk' });
    r.Page.captureScreenshot().then((cap) => {
      const fr = Buffer.from(cap.data, 'base64');
      fs.writeFile('foo.png', fr, (err) => {
        console.log(err);
      });
    }).then(() => {
      c.terminate();
    });
  });
});
