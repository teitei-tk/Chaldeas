const path = require('path');

module.exports = {
  entry: {
    launcher: `${__dirname}/src/chrome/launcher.js`,
    page: `${__dirname}/src/page.js`,
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    modules: [path.resolve(__dirname, './src'), 'node_modules'],
  },
  output: {
    path: `${__dirname}/dist`,
    filename: '[name].js',
  },
};
