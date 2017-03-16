require('../app/database.js')()

const GenericModel = require('../app/models/generic.js')
    , data = [ { foo: 'bar', name: 'one' }, { foo: 'bar', name: 'two' } ]

GenericModel.db.dropDatabase(() => {
  GenericModel.create(data, (err, result) => {
    if (err) console.log('ERROR: ' + err)
    if (result) console.log('Success')
    GenericModel.db.close()
  })
})
