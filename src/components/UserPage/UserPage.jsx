import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const events = useSelector((store) => store.event);
  console.log(events);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_EVENTS' })
  }, []);

  return (
    <>
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      {/* <p>Your ID is: {user.id}</p> */}
    </div>
    <div className="container">
      <h3>Upcoming Events</h3>
      <ul>
        {events.map((event, i) =>
          <li key={i}>{event.name}</li>  
        )}
      </ul>
    </div>
    {/* <LogOutButton className="btn" /> */}
    </>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
