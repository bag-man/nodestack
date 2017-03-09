const GenericModel = require('../models/generic.js')()
    , template = require('pug').compileFile(__dirname + '/../assets/templates/generic.pug')

class GenericController {
  constructor (req, res) {
    this.res = res
  }

  render (gene, err) {
    let html = template({ title: 'Generic', data: gene, error: err })
    this.res.send(html)
  }

  view (options) {
    let constraints = {}

    if (options._id) {
      constraints = { _id: false }
    } else {
      constraints = { _id: true, name: true }
    }

    GenericModel.find(options, constraints, (err, data) => {
      if (err) {
        this.render(null, err)
      } else {
        this.render(data, null)
      }
    })
  }
}

module.exports = GenericController
