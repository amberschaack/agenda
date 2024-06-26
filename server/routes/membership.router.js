const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();

// GET user's memberships
router.get('/user', rejectUnauthenticated, (req, res) => {
    console.log('/memberships/user GET route');
    const queryText = `SELECT memberships.id, memberships.group_id
                        FROM memberships
                        WHERE memberships.user_id=$1;`;
    pool.query(queryText, [req.user.id])
        .then((result) => {res.send(result.rows)})
        .catch((error) => {
            console.log('Error getting event details', error);
            res.sendStatus(500);
        })
})

// GET memberships for groups
router.get('/:id', rejectUnauthenticated, (req, res) => {
    console.log('/memberships GET route');
    const queryText = `SELECT memberships.id, "users".username, memberships.user_avatar 
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
            console.log('join group results', result.rows);
        }).catch((error) => {
            console.log('Error in post, joining group:', error);
            res.sendStatus(500);
        });
})

//Leave a group
router.delete('/:id', rejectUnauthenticated, (req, res) => {
    console.log('/memberships DELETE route');
    const queryText = `DELETE FROM memberships WHERE memberships.user_id=$1 
                        AND memberships.group_id=$2;`;
    pool.query(queryText, [req.user.id, req.params.id])
        .then((result) => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log('Error unjoining group', error);
            res.sendStatus(500);
        });
})

// Remove a member from a group you own
// router.delete('/remove-member/:id', rejectUnauthenticated, (req, res) => {
//     console.log('/memberships DELETE route');
//     console.log('req body', req.body);
//     const queryText = `DELETE FROM memberships WHERE memberships.user_id=$1 
//                         AND memberships.group_id=$2;`;
//     pool.query(queryText, [req.body.id, req.params.id])
//         .then((result) => {
//             res.sendStatus(200);
//         }).catch((error) => {
//             console.log('Error removing member from group', error);
//             res.sendStatus(500);
//         });
// })

module.exports = router;