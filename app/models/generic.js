module.exports = (url) => {
  const Database = require('../database.js')
      , db = new Database(url)
      , { Model, Schema } = db.database

  const schema = new Schema(
    { id: Schema.ObjectId
    , foo: String
    , name: String
    }
  )

  class genericModel extends Model { }

  return db.database.model(genericModel, schema, 'collection')
}
