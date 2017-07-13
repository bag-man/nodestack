import angular from 'angular'

import mainController from './angular/controllers/main-controller'
import reverseService from './angular/services/reverse'
import prettyDirective from './angular/directives/pretty'

let app = angular.module('DefaultApp', [])
mainController(app)
reverseService(app)
prettyDirective(app)

import Socket from './socket'
let socket = new Socket(window.io)
socket.ping()

