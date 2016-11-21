var path = require('path');
var webpack = require('webpack');
var banner = require('./webpack.banner');
var TARGET = process.env.TARGET || null;

var config = {
  entry: {
    index: './src/animation-bus.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: 'dist/',
    filename: 'animation-bus.js',
    sourceMapFilename: 'animation-bus.sourcemap.js',
    library: 'AnimationBus',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      { test: /\.(js|jsx)/, loader: 'babel-loader' }
    ]
  },
  plugins: [
    new webpack.BannerPlugin(banner)
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};

if (TARGET === 'minify') {
  config.output.filename = 'animation-bus.min.js';
  config.output.sourceMapFilename = 'animation-bus.min.js';
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }));
}

module.exports = config;
