const mongoose = require('mongoose')
    , dbUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/test'

module.exports = () => {
  mongoose.Promise = global.Promise
  mongoose.connect(dbUrl)
  mongoose.connection.on('error', (err) => {
      console.log('Mongoose Connection ERROR: ' + err)
  })
}
