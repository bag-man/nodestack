const mongoose = require('mongoose')
mongoose.Promise = global.Promise

class Database {
  constructor (url, done) {
    mongoose.connect(url)
    const db = mongoose.connection

    db.on('error', console.error.bind(console, 'connection error:'))
    db.once('open', () => { console.log('connected'); done() })
  }

  dropDatabase () {
    mongoose.connection.dropDatabase()
    mongoose.connection.close()
  }
}

module.exports = Database
