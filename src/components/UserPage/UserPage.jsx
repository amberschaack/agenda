import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const events = useSelector((store) => store.event);
  console.log(events);
  const dispatch = useDispatch();
  const history = useHistory();

  const going = events.filter(event => event.status === 1);

  useEffect(() => {
    dispatch({ type: 'FETCH_EVENT' })
  }, []);

  const eventDetails = (eventid) => {
    console.log('Clicked', eventid);
    dispatch({ type: 'FETCH_EVENT_DETAILS', payload: eventid });
    history.push(`/event/details/${eventid}`);
  }

  const newEvent = () => {
    console.log('Clicked');
    history.push('/add-event');
  }

  const newGroup = () => {
    console.log('Clicked');
    history.push('/add-group');
  }

  return (
    <>
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      {/* <p>Your ID is: {user.id}</p> */}
    </div>
    <div className="container">
      <h3>Upcoming Events</h3>
      <ul>
        {going.map((event) =>
          <li key={event.event_id} onClick={() => eventDetails(event.event_id)}>{event.event_date} | {event.event_name}</li>  
        )}
      </ul>
    </div>
    <div className='container'>
      <button onClick={newEvent}>Create New Event</button>
    </div>
    <div className='container'>
      <button onClick={newGroup}>Create New Group</button>
    </div>
    {/* <LogOutButton className="btn" /> */}
    </>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
