const MongoClient = require('mongodb').MongoClient
    , url = process.env.MONGODB_URI || 'mongodb://localhost:27017/database'

MongoClient.connect(url, (err, db) => {
  if (err) console.log('ERROR: ' + err)
  db.dropDatabase()
  let collection = db.collection('collection')

  collection.insertMany([ { foo: 'bar' }, { foo: 'car' } ], (err, result) => {
    if (err) console.log('ERROR: ' + err)
    if (result) console.log('Success')
    db.close()
  })
})
