/* eslint-disable @typescript-eslint/no-require-imports */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.config.common.js');

module.exports = merge(common('production'), {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html'),
      minify: true,
    })
  ],
  optimization: {
    minimize: true,
    usedExports: true,
    splitChunks: {
       chunks: 'all',
     },
  },
  devtool: 'source-map',
});