import connectDatabase from '../app/database'
import GenericModel from '../app/models/generic'

const data = [ { foo: 'bar', name: 'one' }, { foo: 'bar', name: 'two' } ]

connectDatabase()

GenericModel.db.dropDatabase(() => {
  GenericModel.create(data, (err, result) => {
    if (err) console.log('ERROR: ' + err)
    if (result) console.log('Success')
    GenericModel.db.close()
  })
})
