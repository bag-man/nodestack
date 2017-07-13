import assert from 'assert'
import GenericModel from '../app/models/generic.js'
import connectDatabase from '../app/database.js'

connectDatabase('mongodb://localhost:27017/test')

describe('Database', () => {
  let testData = { foo: 'bar', name: 'one' }

  afterEach(() => {
    GenericModel.db.dropDatabase()
  })

  it('should save & find a new model', (done) => {
    GenericModel.create(testData, () => {
      GenericModel.findOne({ foo: 'bar' }, 'name', (err, result) => {
        if (err) console.log(err)
        assert.equal(result.name, 'one', 'Data not saved')
        done()
      })
    })
  })
})
