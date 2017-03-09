const defaultUrl = process.env.MONGODB_URI || 'mongodb://localhost/database'

module.exports = (dbUrl = defaultUrl) => {
  const Database = require('./dbmongoose.js')
      , url = process.env.MONGODB_URI || dbUrl
      , db = new Database(url)
      , mongoose = db.database
      , { Model, Schema } = mongoose

  const schema = new Schema(
    { id: Schema.ObjectId
    , field1: Number
    , field2: String
    }
  )

  class fooModel extends Model {
    getNumString () {
      return this.field1 + this.field2
    }
  }

  return mongoose.model(fooModel, schema, 'foos')
}
