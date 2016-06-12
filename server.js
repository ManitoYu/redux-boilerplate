'use strict';

const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const config = require('./webpack.config');

let server = new WebpackDevServer(webpack(config), {
  // proxy: {
  //   "*": "http://192.168.1.112:8000"
  // },
  hot: false,
  inline: true,
  noInfo: true,
  contentBase: './src'
});

server.listen(3000, '192.168.1.112');
