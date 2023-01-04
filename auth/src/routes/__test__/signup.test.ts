import request from 'supertest';
import { app } from '../../app';

it('Returns a 201 on successful signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(201);
});

it('Returns a 400 with an invallid email', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({ email: 'test', password: 'password' })
    .expect(400);
});

it('Returns a 400 with an invallid password', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: 'p' })
    .expect(400);
});

it('Returns a 400 with missing email and password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com' })
    .expect(400);
  await request(app)
    .post('/api/users/signup')
    .send({ password: 'password' })
    .expect(400);
  await request(app).post('/api/users/signup').send({}).expect(400);
});

it('Disallow duplicate emails', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(201);

  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(400);
});

it('Sets a cookie after succesful signup', async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(201);

  // response.get() inspects headers in the response
  expect(response.get('Set-Cookie')).toBeDefined();
});
