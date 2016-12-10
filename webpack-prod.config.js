const path = require('path')
const webpack = require('webpack')

module.exports = {
  devtool: 'source-map'
, entry: [
    './app/assets/js/index'
  ]
, output: {
    path: path.join(__dirname, 'app', 'assets', 'build', 'js')
  , filename: 'bundle.js'
  , publicPath: '/app/assets/build/js/'
  }
, plugins: [
    new webpack.optimize.DedupePlugin()
  , new webpack.optimize.UglifyJsPlugin({
      minimize: true
    , compress: {
        warnings: false
      }
    })
  ]
, module: {
    loaders: [
      { test: /\.js$/
      , loader: 'babel-loader'
      , query: {
          presets: [ 'es2015' ]
        }
      , include: path.join(__dirname, 'app/assets/js')
      }
    ]
  }
}
