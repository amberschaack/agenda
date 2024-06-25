const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


// Get RSVPs for specific event
router.get('/:id', rejectUnauthenticated, (req, res) => {
    console.log('/rsvp GET route');
    const queryText = `SELECT rsvp.event_id, rsvp.status, memberships.user_id, "users".username, memberships.user_avatar
                         FROM rsvp JOIN memberships ON rsvp.membership_id=memberships.id
	                    JOIN "users" ON "users".id=memberships.user_id
	                    JOIN events ON rsvp.event_id=events.event_id
	                    WHERE events.event_id=$1;`;
    pool.query(queryText, [req.params.id])
        .then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
})

// Get RSVPs for logged in user
router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('/rsvp GET route');
    const queryText = `SELECT rsvp.event_id, rsvp.status, memberships.user_id, memberships.user_avatar 
                        FROM rsvp JOIN memberships ON rsvp.membership_id=memberships.id
	                    JOIN events ON rsvp.event_id=events.event_id
	                    WHERE memberships.user_id=$1;`;
    pool.query(queryText, [req.user.id])
        .then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
})

// Update an RSVP
router.put('/:id', rejectUnauthenticated, (req, res) => {
    console.log('RSVP PUT route');
    console.log('req body', req.body);
    console.log('req user', req.user.id);
    const queryText = `INSERT INTO rsvp (event_id, membership_id, status)
                        VALUES ($2, (SELECT "id" FROM "memberships" WHERE "user_id"=$1 AND "group_id"=$4), $3)
                        ON CONFLICT ("event_id", "membership_id")
                        DO UPDATE SET status=$3;`;
    pool.query(queryText, [req.user.id, req.params.id, req.body.status, req.body.group_id])
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log('Error in put, updating rsvp:', error);
            res.sendStatus(500);
        });
})

module.exports = router;