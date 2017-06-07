const chaldeas = require('./../src');

const Chaldeas = chaldeas.default;

const c = Chaldeas.new();
c.fetchProtocol().then((r) => {
  Promise.all([
    r.Network.enable(),
    r.DOM.enable(),
  ]).then(() => {
    const a = r.DOM.getDocument();
    a.then((b) => {
      console.log(b);
    });
  }).then(() => {
    c.terminate();
  });
});
