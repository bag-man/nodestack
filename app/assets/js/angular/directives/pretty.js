export default (app) => {
  app.directive('pretty', () => {
    return { restrict: 'E', scope: { info: '=' }, templateUrl: '/templates/pretty.html' }
  })
}
