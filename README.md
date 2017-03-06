[![Stories in Ready](https://badge.waffle.io/bag-man/nodestack.png?label=ready&title=Ready)](https://waffle.io/bag-man/nodestack)
# nodestack

[![Build Status](https://img.shields.io/travis/bag-man/nodestack.svg?style=flat-square)](https://travis-ci.org/bag-man/nodestack)
[![Coverage](https://img.shields.io/codecov/c/github/bag-man/nodestack.svg?style=flat-square)](https://codecov.io/github/bag-man/nodestack)
[![Dependencies](https://img.shields.io/david/bag-man/nodestack.svg?style=flat-square)](https://david-dm.org/bag-man/nodestack)
[![Code Climate](https://img.shields.io/codeclimate/github/bag-man/nodestack.svg?style=flat-square)](https://codeclimate.com/github/bag-man/nodestack)

This is designed to be a nice chunk of boilerplate that sets up a NodeJS project using:

* ES6
* Webpack
* MongoDB
* SocketIO
* Travis CI
* Eslint
* CodeCov
* Heroku
* Jade
* Stylus

[You can see it live on Heroku here.](https://nodestack-.herokuapp.com/)

It uses Node 6.9.0 and Mongo 3.2

### Building

    nave usemain 6.9.0
    npm install
    npm run build
    npm start

    # Development Mode
    npm run watch

### Testing

    npm run test
