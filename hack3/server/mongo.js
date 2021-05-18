import mongoose from 'mongoose';
import { dataInit } from './upload'
function connectMongo() {
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', dataInit);
}

const mongo = {
  connect: connectMongo,
};

export default mongo;
