const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const { rejectUnauthenticated, rejectNonMembers } = require('../modules/authentication-middleware');
// const memberships = useSelector(store => store.membership);

// for (const member of memberships) {
//     console.log(member.user_id);
// }

// This route returns the logged in users events
router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('/event GET route');
    // console.log('is authenticated?', req.isAuthenticated());
    console.log('user', req.user);
    const queryText = `SELECT
    e.event_id,
    e.event_date,
    e.event_time,
    e.event_name,
    e.description AS event_description,
    e.location,
    e.event_type_id,
    e.event_admin,
    e.group_id,
    groups.logo,
    r.status AS rsvp_status
FROM 
    events e
INNER JOIN 
    memberships m ON e.group_id = m.group_id
LEFT JOIN 
    rsvp r ON e.event_id = r.event_id AND m.id = r.membership_id
JOIN groups ON groups.id=e.group_id
WHERE 
    m.user_id = $1
ORDER BY e.event_date;`;
    pool.query(queryText, [req.user.id])
        .then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
});

// Returns all events owned by user
router.get('/my-event', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT events.event_id, events.description, events.event_date, events.event_name, events.event_time, events.event_type_id,
                        events.group_id, events.location, "users".username, "users".avatar, groups.logo 
                        FROM events JOIN "users" ON "users".id=events.event_admin
                        JOIN "groups" ON groups.id=events.group_id
                        WHERE events.event_admin=$1
                        ORDER BY events.event_date;`;
    pool.query(queryText, [req.user.id])
        .then((result) => {
            console.log(result.rows);
            res.send(result.rows);
        }).catch((error) => {
            console.log('Error getting users events', error);
            res.sendStatus(500);
        })
})

router.get('/types', (req, res) => {
    console.log('/event/types route');
    const queryText = `SELECT * FROM event_types ORDER BY event_type_id;`;
    pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
})

// Returns all info on specific event
router.get('/:event_id', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT events.event_id, events.description, events.event_date,
                        events.event_name, events.event_time, events.event_type_id,
                        events.group_id, events.location, "users".username, "users".avatar, groups.logo
                        FROM events
	                    JOIN "users" ON "users".id=events.event_admin
                        JOIN groups ON groups.id=events.group_id
	                    WHERE events.event_id=$1;`;
    pool.query(queryText, [req.params.event_id])
        .then((result) => {res.send(result.rows[0])})
        .catch((error) => {
            console.log('Error getting event details', error);
            res.sendStatus(500);
        })
})

// This route adds an event for the logged in user
router.post('/', rejectNonMembers, async (req, res) => {
    console.log('/event POST route');
    console.log(req.body);
    // console.log('is authenticated?', req.isAuthenticated());
    console.log('user', req.user);
    try {
        const eventQueryText = `INSERT INTO "events" ("event_date", "event_time", "event_name", "description", "location", "event_type_id", "event_admin", "group_id")
                            VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;`;
        const result = await pool.query(eventQueryText, [req.body.event_date, req.body.event_time, req.body.event_name, req.body.description, req.body.location, req.body.event_type_id, req.user.id, req.body.group_id])
        const createdEventId = result.rows[0].event_id;
        console.log(result.rows);
        console.log('GROUP ID', req.body.group_id);
        const rsvpText = `INSERT INTO "rsvp" ("event_id", "membership_id", "status") 
                            VALUES ($1, (SELECT "id" FROM "memberships" WHERE "user_id"=$2 AND "group_id"=$3), 1);`;
        const result2 = await pool.query(rsvpText, [createdEventId, req.user.id, req.body.group_id])
        res.send(result2.rows[0]);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// Edit (PUT) event (can only edit an event you made)
router.put('/:id', rejectUnauthenticated, (req, res) => {
    console.log('req body', req.body);
    console.log('req params', req.params);
 
    const queryText = `UPDATE events SET event_time=$1, event_name=$2, description=$3, location=$4, event_date=$5
                        WHERE event_id=$6 AND event_admin=$7;`;
    pool.query(queryText, [req.body.event_time, req.body.event_name, req.body.description,
                            req.body.location, req.body.event_date, req.params.id, req.user.id])
    .then((result) => {
        res.sendStatus(200);
     })
    .catch((error) => {
        console.log('Error in put, updating event:', error);
        res.sendStatus(500);
    });
});

// Delete event (doesn't allow non-creator to delete event, but need to make an alert)
router.delete('/:event_id', rejectNonMembers, (req, res) => {
    const queryText = `DELETE FROM events WHERE event_admin=$1 AND event_id=$2;`;
    pool.query(queryText, [req.user.id, req.params.event_id])
        .then((result) => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log('Error deleting event', error);
            res.sendStatus(500);
        });
});

module.exports = router;