// start up a copy of MongoDB in memory
// allow to run multiple different test suites at the same time across different projects
// without them all trying to reach out to the same copy of MongoDB
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';
import jwt from 'jsonwebtoken';

// use nats-wrapper.ts file inn __mock__ directory instead of the actual implementation
jest.mock('../nats-wrapper');

declare global {
  var signin: () => string[];
}

let mongo: any;

// run before all of the tests start to be executed
beforeAll(async () => {
  // add JWT_KEY in test env
  process.env.JWT_KEY = 'asdf';

  const mongo = await MongoMemoryServer.create();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

// run before each test
beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();

  // delete all of the data in different collections
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }

  await mongoose.connection.close();
});

// fabricate a cookie to mimic signin
global.signin = () => {
  // Build a JWT payload. { id, email }
  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: 'test@test.com',
  };

  // Create the JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Build session Object. { jwt: MY_JWT }
  const session = { jwt: token };

  // Turn the session into JSON
  const sessionJSON = JSON.stringify(session);

  // Take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString('base64');

  // Return a string thats the cookie with the encoded data
  return [`session=${base64}`]; // supertest expects an array of string for setting cookie
};
