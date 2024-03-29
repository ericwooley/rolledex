import express, { Request, Response } from 'express';
import createExpressSession from 'express-session';
import { json, urlencoded } from 'body-parser';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import jwt from 'jsonwebtoken';
import { getSdk, SignupArgs } from './sdk';
import { GraphQLClient, ClientError } from 'graphql-request';
import bcrypt from 'bcrypt';
import cors from 'cors';
import redis from 'redis';
import CreateRedisStore from 'connect-redis';

const redisClient = redis.createClient();
const RedisStore = CreateRedisStore(createExpressSession);
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error('JWT_SECRET is not defined');
declare module 'express' {
  export interface Request {
    user?: {
      id: string;
    };
  }
}

const graphQLClient = new GraphQLClient('http://localhost:8080/v1/graphql', {
  headers: {
    'x-hasura-admin-secret': 'dev_secret',
  },
});
const sdk = getSdk(graphQLClient);
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (username, password, done) => {
      const pwResponse = await sdk.getUserData({ email: username });
      const user = pwResponse.users[0];
      if (!user) return done('user not found');
      await new Promise((resolve, reject) => {
        bcrypt.compare(password, user.password, (err, same) => {
          if (err) return reject(err);
          if (!same) return reject('Incorrect password');
          resolve(same);
        });
      });
      done(null, { email: user.email, id: user.id });
    }
  )
);
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user: { id: string }, done) {
  if (!user) return done('no user');
  done(null, user);
});

const app = express();
app.use((req, res, next) =>
  cors({
    credentials: true,
    origin:
      process.env.NODE_ENV === 'development'
        ? req.headers.origin
        : 'http://whatever.com',
  })(req, res, next)
);
app.use(json());
app.use(urlencoded({ extended: true }));
const expressSession = createExpressSession({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  store: new RedisStore({
    host: 'localhost',
    port: 6379,
    client: redisClient,
    ttl: 86400,
  }),
});
app.use(expressSession);
app.use(passport.initialize());
app.use(passport.session());
const refreshTokenHandler = (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401).json({
      message: 'you must be logged in to get a token',
    });
  }
  const token = jwt.sign(
    {
      'https://hasura.io/jwt/claims': {
        'x-hasura-allowed-roles': ['user'],
        'x-hasura-default-role': 'user',
        'x-hasura-user-id': req.user?.id,
      },
    },
    JWT_SECRET,
    {
      // expiresIn: '15m',
    }
  );

  return res.status(200).json({ accessToken: token });
};

app.use('/logout', (req, res) => {
  req.logout();
  res.status(200).json({ ok: true });
});
app.post(
  '/login',
  (req, res, next) => {
    req.body = { ...req.body, ...(req.body.input?.loginArgs || {}) };
    passport.authenticate('local')(req, res, next);
  },
  refreshTokenHandler
);

app.post('/me', async (req, res) => {
  console.log('me', req.user);
  return res.json({
    authorized: !!req.user,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    email: req.user?.email || '',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    id: req.user?.id || '',
  });
});
// Request Handler
app.post('/signUp', async (req, res) => {
  if (req.user) {
    req.logOut();
  }
  // get request input
  const { newUserArgs }: { newUserArgs: SignupArgs } = req.body.input;

  try {
    if (newUserArgs.password.length < 6)
      return res.status(406).json({
        message: 'Password must be at least 6 characters.',
      });
    if (newUserArgs.password.length > 100)
      return res.status(406).json({
        message: 'Password limit is 100 characters.',
      });
    const password = await new Promise<string>((resolve, reject) =>
      bcrypt.hash(newUserArgs.password, 10, (err, hash) => {
        if (err) return reject(err);
        return resolve(hash);
      })
    );

    const response = await sdk.createUser({
      email: newUserArgs.email,
      password: `${password}`,
    });
    // success
    return res.status(200).json({
      success: true,
      email: response.insert_users_one?.email,
    });
  } catch (e) {
    const error: ClientError = e;
    console.log(
      'User registration failed',
      error.response?.errors?.map(({ message }) => message)
    );
    return res.status(400).json({
      code: '400',
      message: 'Unable to create user.',
    });
  }
});

app.get('/refresh_token', refreshTokenHandler);

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
