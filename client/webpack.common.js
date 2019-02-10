const path = require('path');

const ExtractPlugin = require('extract-text-webpack-plugin');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const CleanwebpackPlugin = require('clean-webpack-plugin');

const HtmlwebpackPluginConfig = new HtmlwebpackPlugin({
  template: path.join(__dirname, 'src', 'index.html'),
  filename: 'index.html',
  inject: 'body',
  favicon: '',
});

const CleanwebpackPluginConfig = new CleanwebpackPlugin(['dist']);

module.exports = {
  entry: `${__dirname}/src/index.js`,
  output: {
    filename: 'athena_bundle-[hash].js',
    path: `${__dirname}/dist`,
    publicPath: '/',
  },
  plugins: [
    HtmlwebpackPluginConfig,
    CleanwebpackPluginConfig,
    new ExtractPlugin('athena_bundle-[hash].css'),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ExtractPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!sass-loader',
        }),
      },
      {
        test: /\.scss$/,
        use: ExtractPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!sass-loader',
        }),
      },
    ],
  },
}