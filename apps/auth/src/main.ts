import express from 'express';
import createExpressSession from 'express-session';
import { json, urlencoded } from 'body-parser';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import jwt from 'jsonwebtoken';

passport.use(
  new LocalStrategy({}, (username, password, done) => {
    console.log('login', username);
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
  const { newUserArgs } = req.body.input;

  // run some business logic

  /*
  // In case of errors:
  return res.status(400).json({
    message: "error happened"
  })
  */

  // success
  return res.json({
    success: true,
    email: newUserArgs.email,
  });
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
