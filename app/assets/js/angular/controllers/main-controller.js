export default (app) => {
  app.controller('MainController', ['$scope', 'reverseService', ($scope, defaultService) => {
    $scope.reverse = () => {
      defaultService.reverse($scope.input).then((data) => {
        $scope.output = data.reverse
      })
    }

    $scope.input = 'Test input'
  }])
}
