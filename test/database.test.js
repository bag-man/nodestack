const dbUrl = 'mongodb://localhost/test'
    , GenericModel = require('../app/models/generic.js')(dbUrl)
    , assert = require('assert')

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
