const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();

// GET memberships for groups
router.get('/:id', rejectUnauthenticated, (req, res) => {
    console.log('/memberships GET route');
    const queryText = `SELECT memberships.id, "users".username, "users".username 
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


module.exports = router;