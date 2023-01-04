import { errorHandler, NotFoundError } from '@zj_ticketing/common';
import cookieSession from 'cookie-session';
import express from 'express';
import 'express-async-errors'; // thrown errors can be handled by express without using next() in async functions
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';

const app = express();

// Due to traffic being proxied through ingress nginx
// https://expressjs.com/en/guide/behind-proxies.html
app.set('trust proxy', true);

app.use(express.json());

// cookieSession attaches the property "session" to "req"
// if the contents of "req.session" were altered, automatically adds a Set-Cookie header to the response
app.use(
  cookieSession({
    signed: false, // Do not encrypt cookies, 1. JWT itself temper-resistant, 2. Hard for different services to decrypt
    secure: process.env.NODE_ENV !== 'test',
  })
);

app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.use(currentUserRouter);

app.all('*', async () => {
  throw new NotFoundError();
});

// define error-handling middleware last, after other app.use() and routes calls
// https://expressjs.com/en/guide/error-handling.html
app.use(errorHandler);

export { app };
