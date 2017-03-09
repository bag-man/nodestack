const dbUrl = 'mongodb://localhost/test'
    , FooModel = require('../app/dbschema.js')(dbUrl)
    , assert = require('assert')

describe('Database', () => {
  let testData = { foo: 10, bar: 'foo' }

  afterEach(() => {
    FooModel.db.dropDatabase()
  })

  it('should create a new model', (done) => {
    let testModel = new FooModel(testData)
    assert(testModel.getNumString(), '10foo', 'data not correct')
    done()
  })

  it('should save & find a new model', (done) => {
    FooModel.create(testData, () => {
      FooModel.findOne({ foo: 10 }, 'foo', (err, result) => {
        if (err) console.log(err)
        assert.equal(result.foo, 10, 'Data not saved')
        done()
      })
    })
  })
})
