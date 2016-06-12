'use strict';

const webpack = require('webpack');
const path = require('path');

let env = process.env.NODE_ENV || 'development';

let entry = ['./src'];
if (env == 'development') {
  entry.push(
    'webpack-dev-server/client?http://192.168.1.112:3000',
    'webpack/hot/dev-server');
}

module.exports = {
  entry,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel'], exclude: /node_modules/ },
      { test: /\.scss$/, loaders: ['style', 'css', 'postcss', 'sass'], exclude: /node_modules/ },
      { test: /\.css$/, loaders: ['style', 'css', 'postcss'] },
      { test: /\.(png|jpg|gif)$/, loader: `url-loader?limit=${8192 * 3}` },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' }
    ]
  },
  plugins: [
    // new webpack.DefinePlugin({
    //   'process.env': { NODE_ENV: '"production"' }
    // })
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
}
