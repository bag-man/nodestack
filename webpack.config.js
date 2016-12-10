const path = require('path')

module.exports = {
  entry: [
    './app/assets/js/index'
  ]
, output: {
    path: path.join(__dirname, 'app', 'assets', 'build', 'js')
  , filename: 'bundle.js'
  , publicPath: '/app/assets/build/js/'
  }
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

