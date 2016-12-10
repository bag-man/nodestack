const MongoClient = require('mongodb')

class Database {

  constructor (uri) {
    this.uri = uri
    this.db = {}
    return this
  }

  connect () {
    return new Promise((resolve, reject) => {
      MongoClient.connect(this.uri, (err, db) => {
        if (err) reject(err)
        this.db = db
        resolve(this)
      })
    })
  }

  addItem (data) {
    return new Promise((resolve, reject) => {
      this.db.collection('example').findAndModify(
        { example: data }
      , {}
      , { $inc: { hit: 1 } }
      , { new: true, upsert: true }
      , (err, data) => {
          if (err) reject(err)
          resolve(data)
        })
    })

  }

  findItem (data) {
    return new Promise((resolve, reject) => {
      this.db.collection('example').findOne(
        { example: data }
      , { _id: false }
      , (err, data) => {
          if (err) reject(err)
          if (data) {
            resolve(data)
          } else {
            resolve(0)
          }
        })
    })
  }
}

module.exports = Database
