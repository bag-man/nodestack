
import express from 'express';
import logger from 'morgan';
let app = express();
import addRoutes from './routes';
import attachSocket from './sockets';
let port = process.env.PORT || 3000;
import path from 'path';
import cache from 'express-cache-headers';
import connectDatabase from './database.js';

app.use(cache(60))
app.use(logger('dev'))
app.use(express.static(path.join(__dirname, 'assets', 'build')))
addRoutes(app)

connectDatabase()

let server = app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
  attachSocket(server)
})
