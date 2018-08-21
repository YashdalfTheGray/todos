const { resolve } = require('path');

module.exports = {
  entry: ['./src/index.jsx'],
  output: {
    path: resolve(__dirname, './public'),
    filename: 'bundle.js'
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
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss']
  },
  stats: {
    colors: true
  }
};
