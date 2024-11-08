/* eslint-disable @typescript-eslint/no-require-imports */
const Dotenv = require('dotenv-webpack');

module.exports = (env) => ({
  entry: './src/index.ts',

  target: 'web',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new Dotenv({
			path: `./.env.${env}`
		})
  ],
});