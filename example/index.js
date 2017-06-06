const chaldeas = require('./../src');

const Chaldeas = chaldeas.default;

const c = Chaldeas.new();
c.fetchProtocol().then((r) => {
  console.log(r);
  console.log(r.Page);
}).then(() => {
  c.terminate();
});

/*
instance.run().then((c) => {
  Promise.all([
    c.Page.enable(),
  ]).then((p) => {
    console.log(p);
  });

  console.log('pass!');
  // console.log(c.Page.enable());
  console.log('--------------------------');
  // console.log(c.Network);
}).then(() => {
  instance.terminate();
});
*/
