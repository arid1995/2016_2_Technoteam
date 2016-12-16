const webpack = require('webpack');

module.exports = {
  entry: './public/main.js',
  output: {
    path: './public/bin',
    filename: 'angry.bundle.js',
  },
  /*module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015'],
      },
    }],
  },
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
