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
import { Divider } from '@mui/joy';


function UserPage() {
  const user = useSelector((store) => store.user);
  const events = useSelector((store) => store.event);
  const groups = useSelector((store) => store.allGroups);
  console.log('Groups:', groups);
  console.log('Events', events);
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
    <Stack direction="column" justifyContent="space-around" alignItems="center" spacing={1} sx={{ paddingBottom: "10px" }}>
      <Avatar src={user.avatar} sx={{ width: 100, height: 100 }} />
      <Typography variant="h4">Welcome, {user.username}!</Typography>
    </Stack>
    <Divider inset="none" />
    </div>
    <Stack direction="row" spacing={2} sx={{ padding: "10px" }} justifyContent="center" alignItems="center">
      <Typography variant="h4">
        Upcoming Events
      </Typography>
      <Avatar src="calendar.png" variant="square" />
    </Stack>
      <Stack direction="column" spacing={2} justifyContent="space-around" alignItems="center" >
        {going.slice(0, 4).map((event) =>
          <EventItem key={event.event_id} event={event} />  
        )}
      <Button sx={{ bgcolor: "#0097B2", mb: "10px" }} startDecorator={<Add />} onClick={newEvent} >Create New Event</Button>
      </Stack>
    <Stack direction="row" spacing={2} sx={{ padding: "20px" }} justifyContent="center" alignItems="center">
      <Typography variant="h4">
        Explore New Groups
      </Typography>
      </Stack>
      <Stack direction="column" spacing={2} justifyContent="space-around" alignItems="center" >
      {nonGroup.map((group) => (
        <GroupItems key={group.id} group={group} />
      ))}
        <Button sx={{ bgcolor: "#0097B2" }} startDecorator={<Add />} onClick={newGroup} >Create New Group</Button>
      </Stack>
    </>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
