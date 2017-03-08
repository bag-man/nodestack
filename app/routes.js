const GenericController = require(__dirname + '/controllers/generic.js')

module.exports = (app) => {

  app.get('/generic/:id?', (req, res, next) => {
    try {
      let gene = new GenericController(req, res)
      if (req.params.id) {
        gene.view({ _id: req.params.id })
      } else {
        gene.view(req.query)
      }
    } catch (e) {
      next(e)
    }
  })

  app.get('*', (req, res, next) => {
    let template = require('pug').compileFile(__dirname + '/assets/templates/index.pug')
    try {
      let html = template({ title: 'Home' })
      res.send(html)
    } catch (e) {
      next(e)
    }
  })

  return app
}
