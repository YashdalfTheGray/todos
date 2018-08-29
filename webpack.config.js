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
  entry: ['@babel/polyfill', './src/index.jsx'],
  output: {
    path: resolve(__dirname, './public'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: resolve(__dirname, './public'),
    hot: true
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['public/*.js']),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      FIREBASE_API_KEY: JSON.stringify(FIREBASE_API_KEY),
      FIREBASE_PROJECT_ID: JSON.stringify(FIREBASE_PROJECT_ID),
      FIREBASE_MESSAGING_ID: JSON.stringify(FIREBASE_MESSAGING_ID)
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss']
  },
  stats: {
    colors: true
  }
};
