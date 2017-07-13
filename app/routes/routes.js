import GenericController from '../controllers/generic'

export default (app) => {
  app.get('/generic/:id?', (req, res, next) => {
    try {
      let genericController = new GenericController(req, res)
      if (req.params.id) {
        genericController.view({ _id: req.params.id })
      } else {
        genericController.view(req.query)
      }
    } catch (e) {
      next(e)
    }
  })

  app.get('*', (req, res, next) => {
    let template = require('pug').compileFile(`${__dirname}/../assets/templates/index.pug`)
    try {
      let html = template({ title: 'Home' })
      res.send(html)
    } catch (e) {
      next(e)
    }
  })

  return app
}
