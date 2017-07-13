import Socket from './socket'
import Action from './actions'

let socket = new Socket(window.io)
  , action = new Action(socket)

$('.echo').on('click', () => {
  action.echo()
})

// This needs to be split up into different files
import angular from 'angular'

let app = angular.module('DefaultApp', [])

app.controller('MainController', ['$scope', 'reverseService', ($scope, defaultService) => {
  $scope.reverse = () => {
    defaultService.reverse($scope.input).then((data) => {
      $scope.output = data.reverse
    })
  }

  $scope.input = 'Test input'
}])

app.factory('reverseService', ['$http', ($http) => {
  return {
    reverse: (input) => {
      return $http(
        { url: '/api/reverse'
        , method: 'GET'
        , params: { string: input }
        }
      ).then((data) => {
        return data.data
      }, (error) => {
        return error
      })
    }
  }
}])
