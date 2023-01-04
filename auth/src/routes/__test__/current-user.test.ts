import request from 'supertest';
import { app } from '../../app';

it('Response with details about the current user', async () => {
  // Cookie is not autumatically handled by supertest unlike browser
  const cookie = await signin();

  const response = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .expect(200);

  console.log(response.body);

  expect(response.body.currentUser.email).toEqual('test@test.com');
});

it('responds with null if not authenticated', async () => {
  await request(app).get('/api/users/currentuser').expect(401);
});
