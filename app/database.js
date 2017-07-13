import mongoose from 'mongoose';
const dbUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/database';

export default (url = dbUrl) => {
  mongoose.Promise = global.Promise
  mongoose.connect(url)
  mongoose.connection.on('error', (err) => {
      console.log('Mongoose Connection ERROR: ' + err)
  })
};
