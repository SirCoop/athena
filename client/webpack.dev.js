const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  devtool: 'source-map',
  devServer: {
    port: 1213,
    historyApiFallback: true,
    stats: 'errors-only',
  },
  mode: 'development',
});