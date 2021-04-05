import express from 'express';
import createExpressSession from 'express-session';
import { json, urlencoded } from 'body-parser';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import jwt from 'jsonwebtoken';
import { getSdk, SignupArgs } from './sdk';
import { GraphQLClient, ClientError } from 'graphql-request';
import bcrypt from 'bcrypt';
const graphQLClient = new GraphQLClient('http://localhost:8080/v1/graphql', {
  headers: {
    'x-hasura-admin-secret': 'dev_secret',
  },
});
const sdk = getSdk(graphQLClient);
passport.use(
  new LocalStrategy({}, async (username, password, done) => {
    const pwResponse = await sdk.getUserPassword({ email: username });
    await new Promise((resolve, reject) => {
      bcrypt.compare(password, pwResponse.users[0].password, (err, same) => {
        if (err) return reject(err);
        if (!same) return reject('Incorrect password');
        resolve(same);
      });
    });
    done(null, { email: username });
  })
);
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));
const expressSession = createExpressSession({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
});
app.use(expressSession);
app.use(passport.initialize());
app.use(passport.session());
app.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/refresh_token',
  })
);
// Request Handler
app.post('/signUp', async (req, res) => {
  // get request input
  const { newUserArgs }: { newUserArgs: SignupArgs } = req.body.input;

  try {
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
      email: response.insert_users_one.email,
    });
  } catch (e) {
    const error: ClientError = e;
    console.log(
      'User registration failed',
      error.response?.errors.map(({ message }) => message)
    );
    return res.status(400).json({
      code: '400',
      message: 'Unable to create user.',
    });
  }
});

app.get('/refresh_token', async (req, res, next) => {
  if (!req.user) {
    res.statusCode = 401;
    res.json({
      error: 'you must be logged in to get a token',
    });
  }
  const token = jwt.sign({ user: req.user }, process.env.JWT_SECRET);

  return res.json({ token });
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
