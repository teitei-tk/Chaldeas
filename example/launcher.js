const chaldeas = require('./../lib/chrome/chrome');

const Chrome = chaldeas.default;
const instance = new Chrome(chaldeas.defaultOption);

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
