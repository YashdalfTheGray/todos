const { resolve } = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: ['./src/index.jsx'],
  output: {
    path: resolve(__dirname, './public'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: resolve(__dirname, './public'),
    hot: true
  },
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
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss']
  },
  stats: {
    colors: true
  }
};
