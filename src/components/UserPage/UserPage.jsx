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
import GroupItems from '../Groups/GroupItems';
import { Divider } from '@mui/joy';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';

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
    <Stack direction="row" spacing={1} sx={{ padding: "10px" }} justifyContent="space-around" alignItems="center">
      <Typography fontSize='30px'>
        Upcoming Events
      </Typography>
      <EditCalendarIcon sx={{fontSize: '40px', color: "#0097B2"}} onClick={newEvent}/>
    </Stack>
      <Stack direction="column" spacing={1} justifyContent="space-around" alignItems="center" >
        {going.slice(0, 4).map((event) =>
          <EventItem key={event.event_id} event={event} />  
        )}
      </Stack>
      {nonGroup.length>0 ? 
      <>
      <Stack direction="row" spacing={2} sx={{ padding: "20px" }} justifyContent="space-around" alignItems="center">
      <Typography fontSize='30px'>
        Explore New Groups
      </Typography>
      <GroupAddIcon sx={{fontSize: '40px', color: "#0097B2"}} onClick={newGroup}/>
      </Stack>
      <Stack direction="column" spacing={1} justifyContent="space-around" alignItems="center" >
      {nonGroup.map((group) => (
        <GroupItems key={group.id} group={group}/>
      ))}
      </Stack>
      </>
      :
      <></>
      }
    </>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
