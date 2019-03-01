const webpack = require('webpack');
const path = require('path');
const dotenv = require('dotenv');
const ExtractPlugin = require('extract-text-webpack-plugin');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const CleanwebpackPlugin = require('clean-webpack-plugin');

const HtmlwebpackPluginConfig = new HtmlwebpackPlugin({
  template: path.join(__dirname, 'src', 'index.html'),
  filename: 'index.html',
  inject: 'body',
  favicon: '',
});

const CleanwebpackPluginConfig = new CleanwebpackPlugin([path.resolve(__dirname, '../dist')]);

const env = dotenv.config().parsed;
const EnvironmentPluginConfig = new webpack.EnvironmentPlugin({...env});

module.exports = {
  entry: `${__dirname}/src/index.js`,
  output: {
    filename: 'athena_bundle-[hash].js',
    path: path.resolve(__dirname, "../dist"),
    publicPath: '/'
  },
  plugins: [
    HtmlwebpackPluginConfig,
    CleanwebpackPluginConfig,
    EnvironmentPluginConfig,
    new ExtractPlugin('athena_bundle-[hash].css'),    
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/react'],
            plugins: [
              '@babel/plugin-proposal-object-rest-spread',
              '@babel/plugin-syntax-dynamic-import',
              '@babel/plugin-proposal-class-properties'
            ]
          }
        }
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