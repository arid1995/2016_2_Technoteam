const webpack = require('webpack');

module.exports = {
  entry: './public/main.js',
  output: {
    path: './public/bin',
    filename: 'angry.bundle.js',
  },
  module: {
    loaders: [
      /* loader: 'babel-loader',
      query: {
        presets: ['es2015'],
      },*/
      { test: /\.tmpl\.xml/, loader: 'fest-loader' },
    ],
  }, /*
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      },
    }),
  ],*/
};
