export default (app) => {
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
}
