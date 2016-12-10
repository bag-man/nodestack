const Database = require('../app/database')
    , dbUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/test'
    , assert = require('assert')

describe('Database', () => {
  let database

  beforeEach((done) => {
    database = new Database(dbUrl)
    database.connect()
      .then(() => { done() })
      .catch((err) => { done(err) })
  })

  afterEach(() => {
    database.db.dropDatabase()
  })

  it('should add a one item to the database', (done) => {
    database.addItem('testData')
      .then((data) => {
        assert.equal(data.value.example, 'testData', 'item not inserted')
        return database.findItem('testData')
      })
      .then((data) => {
        assert.equal(data.hit, 1, 'incorrect number of reports')
        done()
      })
      .catch((err) => {
        done(err)
      })
  })
})
