const Database = require('../app/dbmongoose.js')
    , FooModel = require('../app/dbschema.js')
    , dbUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/test'
    , assert = require('assert')

describe('Database', () => {
  let database

  before((done) => {
    database = new Database(dbUrl, done)
  })

  afterEach(() => {
    database.dropDatabase()
  })

  it('should create a new model', (done) => {
    let testData = { field1: 10, field2: 'foo' }
      , testModel = new FooModel(testData)

    assert(testModel.getNumString(), '10foo', 'data not correct')
    done()
  })

  it('should save a new model', (done) => {
    let testData = { field1: 10, field2: 'foo' }
      , testModel = new FooModel(testData)

    testModel.save((data) => {
      console.log(data)
      done()
    })
  })
})
