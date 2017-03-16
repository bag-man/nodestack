const mongoose = require('mongoose')
    , { Model, Schema } = mongoose

const schema = new Schema(
  { id: Schema.ObjectId
  , foo: String
  , name: String
  }
)

class genericModel extends Model { }

module.exports = mongoose.model(genericModel, schema, 'collection')
