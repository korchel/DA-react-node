/* eslint-disable @typescript-eslint/no-require-imports */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { merge } = require('webpack-merge');

const common = require('./webpack.config.common.js');

module.exports = merge(common('development'), {
  mode: 'development',
  devServer: {
    port: 3000,
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, '/public')
    },
    open: true,
    hot: true,
    liveReload: true,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html')
    }),
  ]
});