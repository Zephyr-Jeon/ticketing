// start up a copy of MongoDB in memory
// allow to run multiple different test suites at the same time across different projects
// without them all trying to reach out to the same copy of MongoDB
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';

declare global {
  var signin: () => Promise<string[]>;
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

global.signin = async () => {
  const email = 'test@test.com';
  const password = 'password';

  const res = await request(app)
    .post('/api/users/signup')
    .send({
      email,
      password,
    })
    .expect(201);

  const cookie = res.get('Set-Cookie');

  return cookie;
};
