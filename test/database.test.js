const Database = require('../app/database')
    , dbUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/test'
    , assert = require('assert')

describe('Database', () => {
  let database
    , mockItem = { foo: 'bar' }

  beforeEach((done) => {
    database = new Database(dbUrl)
    database.connect()
      .then(() => {
        database.addItem(mockItem).then((data) => {
          mockItem._id = data._id
        }).catch((err) => { done(err) })
        done()
      }).catch((err) => { done(err) })
  })

  afterEach(() => {
    database.db.dropDatabase()
  })

  it('should search for item from the database', (done) => {
    let testSearch = { foo: 'bar' }
    database.findItem(testSearch).then((data) => {
      assert.equal(data.length, 1, 'wrong number of items found')
      done()
    }).catch((err) => {
      done(err)
    })
  })

  it('should return item based off of ID', (done) => {
    let testSearch = { _id: mockItem._id }
    database.findItem(testSearch).then((data) => {
      assert.equal(data[0].foo, 'bar', 'incorrect data retrieved')
      done()
    }).catch((err) => {
      done(err)
    })
  })
})
