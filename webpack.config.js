const path = require('path');

module.exports = {
  target: 'node',
  entry: {
    index: `${__dirname}/src/index.js`,
    launcher: `${__dirname}/src/launcher.js`,
    chrome: `${__dirname}/src/chrome.js`,
    page: `${__dirname}/src/page.js`,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        include: __dirname,
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    modules: [path.resolve(__dirname, './src'), 'node_modules'],
  },
  output: {
    libraryTarget: 'commonjs',
    path: `${__dirname}/dist`,
    filename: '[name].js',
  },
  externals: {
    bindings: true,
    serialport: true,
  },
};
