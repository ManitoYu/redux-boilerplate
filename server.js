'use strict';

const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const config = require('./webpack.config');

let server = new WebpackDevServer(webpack(config), {

  hot: true

});

server.listen(3000, '192.168.162.128');
