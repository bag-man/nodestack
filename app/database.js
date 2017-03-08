const MongoClient = require('mongodb')
    , ObjectId = require('mongodb').ObjectID

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
      this.db.collection('collection').save(
          data
        , { new: true, upsert: true }
        , (err, data) => {
          if (err) reject(err)
          resolve(data)
        })
    })
  }

  findItem (options) {
    return new Promise((resolve, reject) => {
      let constraints = { _id: true, foo: true }
      if (options._id) {
        options._id = ObjectId(options._id)
        constraints = { _id: false }
      }

      this.db.collection('collection').find(options, constraints)
        .toArray((err, data) => {
          if (err) reject(err)
          if (data) {
            resolve(data)
          } else {
            resolve(0)
          }
        }
      )
    })
  }

}

module.exports = Database
