import express from 'express'
import logger from 'morgan'
import addRoutes from './routes'
import attachSocket from './sockets'
import path from 'path'
import cache from 'express-cache-headers'
import connectDatabase from './database.js'

const port = process.env.PORT || 3000

let app = express()

app.use(cache(60))
app.use(logger('dev'))
app.use(express.static(path.join(__dirname, 'assets', 'build')))
addRoutes(app)
connectDatabase()

let server = app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
  attachSocket(server)
})
