const mongoose = require('mongoose')
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

module.exports = mongoose.model(fooModel, schema, 'foos')
