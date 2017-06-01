const launcher = require('./../lib/chrome/launcher');

const klass = launcher.default;
const conf = launcher.defaultConfig;

const instance = new klass(conf);
const r = instance.start();

console.log(r);

instance.terminate();
