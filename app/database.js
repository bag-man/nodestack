const mongoose = require('mongoose')
    , defaultUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/database'

class Database {
  constructor (url = defaultUrl) {
    mongoose.Promise = global.Promise
    this.database = mongoose
    this.database.connect(url)
    this.connection = this.database.connection
    this.connection.on('error', (err) => {
      console.log('Mongoose Connection ERROR: ' + err)
    })

  }
}

module.exports = Database
