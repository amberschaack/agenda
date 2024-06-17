const pool = require('../modules/pool');

const rejectUnauthenticated = (req, res, next) => {
  // check if logged in
  if (req.isAuthenticated()) {
    // They were authenticated! User may do the next thing
    // Note! They may not be Authorized to do all things
    next();
  } else {
    // failure best handled on the server. do redirect here.
    res.sendStatus(403);
  }
};

/* reject unauthenticated users AND users who are not part of the group
  (identified via req.body.group_id)
  When we care about group permissions:
    - Creating an event by group_id (group id: req.body.group_id)
    - Deleting an event by event_id (group id: in database, under the event itself, event id is: req.params.event_id)
*/
const rejectNonMembers = async (req, res, next) => {
  // is there req.body.group_id? yes: good to go
  // no: is there req.params.event_id? yes: go look up this event's group id

  // special logic for superadmin
  if (req.user?.superadmin) {
    next();
    return;
  }

  let group_id = req.body.group_id;
  if (!group_id && req.params.event_id) {
    // Try to find the group id based on req.params.event_id
    const eventResult = await pool.query(`SELECT "group_id" FROM "events" WHERE event_id=$1;`, [req.params.event_id]);
    if (eventResult.rows.length > 0) {
      group_id = eventResult.rows[0].group_id; // we found the group that this event belongs to
    }
  }

  if (req.isAuthenticated() && group_id) {
    const memberSql = `SELECT "id" FROM "memberships" WHERE "user_id"=$1 AND "group_id"=$2`;
    const memberResult = await pool.query(memberSql, [req.user.id, group_id]);
    // console.log(req.user.id, req.body.group_id);
    if (memberResult.rows.length === 0) {
      // there are no results, so they are not part of this group
      const error = {error: `You (user.id ${req.user.id}) must be a member to access this resource: ${req.originalUrl}`};
      res.status(400).send(error);
      console.error(error);
    } else {
      next();
    }
  } else {
    // failure best handled on the server. do redirect here.
    res.sendStatus(403);
  }
};

module.exports = { rejectUnauthenticated, rejectNonMembers };
