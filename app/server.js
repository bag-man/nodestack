
let express = require('express')
  , logger = require('morgan')
  , app = express()
  , addRoutes = require('./routes')
  , attachSocket = require('./sockets')
  , port = process.env.PORT || 3000
  , path = require('path')
  , connectDatabase = require('./database.js')

app.use(logger('dev'))
app.use(express.static(path.join(__dirname, 'assets', 'build')))
addRoutes(app)

connectDatabase()

let server = app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
  attachSocket(server)
})
