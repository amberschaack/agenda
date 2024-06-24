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
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Add from '@mui/icons-material/Add';
import GroupItems from '../Groups/GroupItems';


function UserPage() {
  const user = useSelector((store) => store.user);
  const events = useSelector((store) => store.event);
  const groups = useSelector((store) => store.allGroups);
  console.log('Groups:', groups);
  console.log(events);
  const dispatch = useDispatch();
  const history = useHistory();

  const going = events.filter(event => event.rsvp_status != 2);
  console.log(user.memberships);
  const nonGroup = groups.filter(group => !user.memberships.includes(group.id));
  console.log('Non groups', nonGroup);

  useEffect(() => {
    dispatch({ type: 'FETCH_EVENT' });
    dispatch({ type: 'FETCH_ALL_GROUPS' });
  }, []);

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
    <div className="container">
      <Typography variant="h4">
        Explore New Groups
      </Typography>
      {nonGroup.map((group) => (
        <GroupItems key={group.id} group={group} />
      ))}
    </div>
    <div className='container'>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Button sx={{ bgcolor: "#0097B2" }} startDecorator={<Add />} onClick={newEvent} >Create New Event</Button>
        <Button sx={{ bgcolor: "#0097B2" }} startDecorator={<Add />} onClick={newGroup} >Create New Group</Button>
      </Box>
    </div>
    </>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
