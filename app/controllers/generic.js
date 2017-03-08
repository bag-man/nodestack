const Database = require('../database')
    , dbUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/database'
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
    let db = new Database(dbUrl)
      , database = db.connect().catch((err) => {
      this.render(null, err)
    })

    database.then(() => {
      db.findItem(options).then((data) => {
        this.render(data, null)
      }).catch((err) => {
        this.render(null, err)
      })
    })
  }
}

module.exports = GenericController
