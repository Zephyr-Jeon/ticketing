import 'express-async-errors'; // thrown errors can be handled by express without using next() in async functions
import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
  console.log('Starting up....');

  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
  } catch (e) {
    console.log('Failed to connect to MongoDB: ', e);
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000, Auth');
  });
};

start();
