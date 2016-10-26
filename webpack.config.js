'use strict'

const webpack = require('webpack')
const path = require('path')
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')

const env = process.env.NODE_ENV || 'development'

const configs = {
  development: {
    entry: [
      './src',
      'webpack-dev-server/client?http://192.168.1.112:3000',
      'webpack/hot/dev-server'
    ],
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'bundle.js'
    }
  },
  production: {
    entry: [
      './src'
    ],
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'bundle.gzjs'
    }
  }
}

module.exports = {
  entry: configs[env].entry,
  output: configs[env].output,
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
  postcss: [autoprefixer],
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      template: './src/index.html',
      minify: {
        collapseBooleanAttributes: true,
        collapseWhitespace: true
      }
    }),
    new CompressionPlugin({
      asset: 'bundle.gzjs',
      algorithm: 'gzip',
      test: /\.gzjs$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(env) }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
}
