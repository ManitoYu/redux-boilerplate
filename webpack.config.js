const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://192.168.162.128:3000',
    'webpack/hot/dev-server',
    './src'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      { test: /.js$/, loaders: ['babel'], exclude: /node_modules/ }
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
