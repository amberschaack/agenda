const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();

// GET route to return logged in users groups
router.get('/', rejectUnauthenticated, (req, res) => {
  console.log('/group GET route');
  // const queryText = `SELECT groups.name, groups.id, groups.owner FROM groups JOIN memberships ON groups.id=memberships.group_id
  //                   JOIN "users" ON "users".id=memberships.user_id WHERE users.id=$1;`;
  const queryText = `SELECT groups.id, groups.name, groups.logo, groups.description, groups.privacy_type, 
                        "users".username, "users".avatar 
                        FROM groups JOIN memberships on memberships.group_id=groups.id
                        JOIN "users" on "users".id=memberships.user_id
                        WHERE "users".id=$1;`
  pool.query(queryText, [req.user.id])
    .then((result) => {
      res.send(result.rows);
    }).catch((error) => {
      console.log(error);
      res.sendStatus(500);
  });
});

// GET route returns groups that user owns
router.get('/my-group', rejectUnauthenticated, (req, res) => {
  console.log('/group/my-group GET route');
  const queryText = `SELECT groups.id, groups.owner, groups.name, groups.description, "users".username, "users".avatar, groups.logo FROM groups 
                    JOIN "users" on "users".id=groups.owner
                      WHERE "users".id=$1;`
  pool.query(queryText, [req.user.id])
    .then((result) => {
      res.send(result.rows);
    }).catch((error) => {
      console.log(error);
      res.sendStatus(500);
  });
});

router.get('/all-groups', rejectUnauthenticated, (req, res) => {
  console.log('/group/all-groups GET route');
  const queryText = `SELECT * FROM groups;`;
  pool.query(queryText)
    .then((result) => {
      res.send(result.rows)
    }).catch((error) => {
      console.log(error);
      res.sendStatus(500);
  });
})

// Returns all info on specific group
router.get('/:id', rejectUnauthenticated,  (req, res) => {
  const queryText = `SELECT groups.id, groups.name, groups.logo, groups.description, groups.privacy_type, 
	                    "users".username AS owner, "users".avatar 
                      FROM groups JOIN memberships on memberships.group_id=groups.id
                      JOIN "users" on "users".id=memberships.user_id
                      WHERE groups.id=$1 AND groups.owner="users".id;`;
  pool.query(queryText, [req.params.id])
    .then((result) => {res.send(result.rows[0])})
    .catch((error) => {
      console.log('Error getting event details', error);
      res.sendStatus(500);
  })
})

// POST route to create a new group (creates new group, but needs to add owner to it automatically)
router.post('/', rejectUnauthenticated, async (req, res) => {
  try {
    console.log('/group POST route');
    const queryText = `INSERT INTO groups ("owner", "name", "description", "logo")
                        VALUES ($1, $2, $3, $4) RETURNING *;`;
    const result = await pool.query(queryText, [req.user.id, req.body.name, req.body.description, req.body.logo])
    const createdGroupId = result.rows[0].id;
    console.log(result.rows);
    console.log('Group ID:', createdGroupId);
    const membershipText = `INSERT INTO memberships ("user_id", "group_id", "user_avatar")
                            VALUES ($1, $2, (SELECT "avatar" FROM "users" WHERE "users".id=$1));`;
    const result2 = await pool.query(membershipText, [req.user.id, createdGroupId]);
    res.send(result2.rows[0]);
  } catch (error) {
    console.log('Error adding new group', error);
    res.sendStatus(500);
  }
});

// PUT route to edit an existing group that you created
router.put('/:id', rejectUnauthenticated, (req, res) => {
  console.log('req body', req.body);
  console.log('req params', req.params);
  const queryText = `UPDATE groups SET name=$1, description=$2, logo=$3
                      WHERE groups.id=$4 AND groups.owner=$5;`;
  pool.query(queryText, [req.body.name, req.body.description, req.body.logo, req.params.id, req.user.id])
    .then((result) => {
      res.sendStatus(200);
   })
  .catch((error) => {
      console.log('Error in put, updating event:', error);
      res.sendStatus(500);
  });
});

// DELETE route to delete an existing group that you created
// (need alert if you try deleting something that isn't yours)
router.delete('/:id', rejectUnauthenticated, (req, res) => {
  const queryText = `DELETE FROM groups WHERE groups.owner=$1 AND groups.id=$2;`;
  pool.query(queryText, [req.user.id, req.params.id])
      .then((result) => {
          res.sendStatus(200);
      }).catch((error) => {
          console.log('Error deleting event', error);
          res.sendStatus(500);
      });
});

router.delete('/remove-member/:group_id/:member_id', rejectUnauthenticated, (req, res) => {
  console.log('remove member route');
  console.log('req params', req.params);
  const queryText = `DELETE FROM "memberships"
                      USING "groups"
                      WHERE memberships.group_id=groups.id
                      AND memberships.id=$1 AND groups.owner=$2 AND memberships.group_id=$3;`;
  pool.query(queryText, [req.params.member_id, req.user.id, req.params.group_id])
    .then((result) => {
    res.sendStatus(200);
}).catch((error) => {
    console.log('Error removing member', error);
    res.sendStatus(500);
});
})

module.exports = router;
