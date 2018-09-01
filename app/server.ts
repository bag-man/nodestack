console.log('Hello world! I love you!')
import * as compression from 'compression'
import * as express from 'express'
import * as logger from 'morgan'
import * as path from 'path'

import apiRoutes from './routes/api-routes'

const port = process.env.PORT || 3000

const app = express()

app.use(compression())
app.use(logger('dev'))
app.use(express.static(path.join(__dirname, '../', 'dist')))
apiRoutes(app)

const server = app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})
