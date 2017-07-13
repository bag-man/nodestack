import mongoose from 'mongoose'
const { Model, Schema } = mongoose

const schema = new Schema(
  { id: Schema.ObjectId
  , foo: String
  , name: String
  }
)

class genericModel extends Model { }

export default mongoose.model(genericModel, schema, 'collection')
