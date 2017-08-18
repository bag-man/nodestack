import cache from 'express-cache-headers'
import compression from 'compression'
import express from 'express'
import logger from 'morgan'
import path from 'path'

import routes from './routes/routes'
import apiRoutes from './routes/api-routes'
import attachSocket from './sockets'
import connectDatabase from './database'

const port = process.env.PORT || 3000

let app = express()

app.use(cache(60))
app.use(compression())
app.use(logger('dev'))
app.use(express.static(path.join(__dirname, 'assets', 'build')))
apiRoutes(app)
routes(app)
connectDatabase()

let server = app.listen(port, () => {
  attachSocket(server)
  console.log(`Listening on http://localhost:${port}`)
})
