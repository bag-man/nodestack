const mongoose = require('mongoose')
    , defaultUrl = process.env.MONGODB_URI || 'mongodb://localhost/database'

class Database {
  constructor (url = defaultUrl) {
    mongoose.Promise = global.Promise
    this.database = mongoose
    this.database.connect(url)
    this.con = mongoose.connection
    this.con.on('error', console.error.bind(console, 'connection error:'))
  }

  dropDatabase () {
    mongoose.connection.dropDatabase()
    mongoose.connection.close()
  }
}

module.exports = Database
