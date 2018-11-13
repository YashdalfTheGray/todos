require('dotenv').config();
const { resolve } = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const {
  FIREBASE_API_KEY,
  FIREBASE_PROJECT_ID,
  FIREBASE_MESSAGING_ID
} = process.env;

module.exports = {
  entry: ['@babel/polyfill', './src/index.tsx'],
  output: {
    path: resolve(__dirname, './public'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: resolve(__dirname, './public')
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [{ loader: 'babel-loader' }, { loader: 'ts-loader' }]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['public/*.js', 'public/*.js.map']),
    new webpack.DefinePlugin({
      FIREBASE_API_KEY: JSON.stringify(FIREBASE_API_KEY),
      FIREBASE_PROJECT_ID: JSON.stringify(FIREBASE_PROJECT_ID),
      FIREBASE_MESSAGING_ID: JSON.stringify(FIREBASE_MESSAGING_ID)
    })
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.scss']
  },
  stats: {
    colors: true
  }
};
