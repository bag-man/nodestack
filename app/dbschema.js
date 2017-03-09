module.exports = (url) => {
  const Database = require('./dbmongoose.js')
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
