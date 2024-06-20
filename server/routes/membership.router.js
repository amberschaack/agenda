const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();

// GET memberships for groups
router.get('/:id', rejectUnauthenticated, (req, res) => {
    console.log('/memberships GET route');
    const queryText = `SELECT memberships.id, "users".username, "users".username, memberships.user_avatar 
                        FROM memberships
                        JOIN "users" ON "users".id=memberships.user_id
                        WHERE memberships.group_id=$1;`;
    pool.query(queryText, [req.params.id])
        .then((result) => {res.send(result.rows)})
        .catch((error) => {
            console.log('Error getting event details', error);
            res.sendStatus(500);
        })
})

// Join a group
router.post('/:id', rejectUnauthenticated, (req, res) => {
    console.log('/memberships POST route');
    const queryText = `INSERT INTO memberships ("user_id", "group_id", "user_avatar")
	                    VALUES ($1, $2, (SELECT "avatar" FROM "users" WHERE "users".id=$1));`;
    pool.query(queryText, [req.user.id, req.params.id])
        .then((result) => {
            res.send(result.rows[0]);
        }).catch((error) => {
            console.log('Error in post, joining group:', error);
            res.sendStatus(500);
        });
})


module.exports = router;