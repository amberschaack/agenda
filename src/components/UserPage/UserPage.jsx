import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import EventItem from '../Events/EventItem';


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
    <Stack direction="row" spacing={2} sx={{ paddingBottom: "50px" }}>
      <Avatar src={user.avatar} sx={{ width: 100, height: 100 }} />
      <Typography variant="h3">Welcome, {user.username}!</Typography>
    </Stack>
    <Stack direction="row" spacing={2} sx={{ padding: "10px" }}>
      <Typography variant="h4">
        Upcoming Events
      </Typography>
      <Avatar src="/public/calendar.png" variant="square" />
    </Stack>
    </div>
    <div className="container">
        {going.map((event) =>
          <EventItem key={event.event_id} event={event} />  
        )}
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
