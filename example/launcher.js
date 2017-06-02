const chaldeas = require('./../lib/chrome/chrome');

console.log(chaldeas);

const Chrome = chaldeas.default;
const instance = new Chrome(chaldeas.defaultOption);

const r = instance.run();

r.then((c) => {
  console.log('pass!');
  console.log(c.Page);
  console.log('--------------------------');
  console.log(c.Network);
}).then(() => {
  instance.terminate();
});
