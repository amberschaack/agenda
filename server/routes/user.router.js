const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const number = req.body.phone_number;

  const queryText = `INSERT INTO "users" (username, password, phone_number)
    VALUES ($1, $2, $3) RETURNING id`;
  pool
    .query(queryText, [username, password, number])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res, next) => {
  // Use passport's built-in method to log out the user
  req.logout((err) => {
    if (err) { return next(err); }
    res.sendStatus(200);
  });
});

// Edit profile picture
router.put('/', rejectUnauthenticated, async (req, res) => {
  console.log('req body', req.body);
  console.log('req params', req.params);
  try {
    const queryText = `UPDATE "users" SET "avatar"=$1
                        WHERE "users".id=$2;`;
    await pool.query(queryText, [req.body.avatar, req.user.id])
    console.log('avatar', req.body.avatar);
    const queryText2 = `UPDATE "memberships" SET "user_avatar"=$1
                       WHERE user_id=$2;`;
    await pool.query(queryText2, [req.body.avatar, req.user.id])
    res.sendStatus(200);
} catch(error) {
      console.log('Error in put, updating profile picture:', error);
      res.sendStatus(500);
  }
})

module.exports = router;
