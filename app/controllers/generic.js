import GenericModel from '../models/generic.js'
const template = require('pug').compileFile(`${__dirname}/../assets/templates/generic.pug`)

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
        if (!data.length) {
          this.render(null, 'No results.')
        } else {
          this.render(data, null)
        }
      }
    })
  }
}

export default GenericController
