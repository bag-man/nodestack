const mongoose = require('mongoose')
mongoose.Promise = global.Promise

class Database {
  constructor (url) {
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
