module.exports = (url) => {
  const Database = require('./dbmongoose.js')
      , db = new Database(url)
      , { Model, Schema } = db.database

  const schema = new Schema(
    { id: Schema.ObjectId
    , foo: Number
    , bar: String
    }
  )

  class fooModel extends Model {
    getNumString () {
      return this.field1 + this.field2
    }
  }

  return db.database.model(fooModel, schema, 'foos')
}
