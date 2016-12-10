let template = require('jade').compileFile(__dirname + '/assets/templates/index.jade')

module.exports = (app) => {

  app.get('*', (req, res, next) => {
    try {
      let html = template({ title: 'Home' })
      res.send(html)
    } catch (e) {
      next(e)
    }
  })

  return app
}
