# nodestack

[![Build Status](https://img.shields.io/travis/bag-man/nodestack.svg?style=flat-square)](https://travis-ci.org/bag-man/nodestack)
[![Coverage](https://img.shields.io/codecov/c/github/bag-man/nodestack.svg?style=flat-square)](https://codecov.io/github/bag-man/nodestack)
[![Dependencies](https://img.shields.io/david/bag-man/nodestack.svg?style=flat-square)](https://david-dm.org/bag-man/nodestack)
[![Code Climate](https://img.shields.io/codeclimate/github/bag-man/nodestack.svg?style=flat-square)](https://codeclimate.com/github/bag-man/nodestack)
[![Known Vulnerabilities](https://snyk.io/test/github/bag-man/nodestack/badge.svg?style=flat-square)](https://snyk.io/test/github/bag-man/nodestack)
[![Stories in Backlog](https://img.shields.io/waffle/label/bag-man/nodestack.svg?label=Backlog&title=Backlog&style=flat-square)](http://waffle.io/bag-man/nodestack)

This is designed to be a nice chunk of boilerplate that sets up a NodeJS project using:

* ES6
* Webpack
* MongoDB
* Mongoose
* SocketIO
* Travis CI
* Eslint
* CodeCov
* Heroku
* Pug
* Stylus

[You can see it live on Heroku here.](https://nodestack-.herokuapp.com/)

Read about it [on my blog](http://blog.owen.cymru/nodejs-es6-boiler-plate/).

It uses Node 6.9.0 and Mongo 3.2

### Building

    nave usemain 6.9.0
    yarn install
    npm run build
    npm start

    # Development Mode
    npm run watch

### Testing

    npm run test
