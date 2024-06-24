import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import event from './event.reducer';
import eventDetails from './eventDetails.reducer';
import rsvp from './rsvp.reducer';
import eventTypes from './eventTypes.reducer';
import group from './group.reducer';
import myEvent from './myEvent.reducer';
import groupDetails from './groupDetails.reducer';
import membership from './membership.reducer';
import allGroups from './allGroups.reducer';
import myGroup from './myGroup.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  event,
  eventDetails,
  rsvp,
  eventTypes,
  group,
  myEvent,
  groupDetails,
  membership,
  allGroups,
  myGroup
});

export default rootReducer;
