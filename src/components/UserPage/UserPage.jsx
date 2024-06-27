import React from 'react';
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
import {IconButton} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

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

  const eventsPerPage = 2;
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentEvents = going.slice(currentIndex, currentIndex + eventsPerPage);

  const groupsPerPage = 2;
  const [groupIndex, setGroupIndex] = useState(0);
  const currentGroups = nonGroup.slice(groupIndex, groupIndex + groupsPerPage);

  const nextEvents = () => {
    if (currentIndex + eventsPerPage >= going.length) {
      setCurrentIndex(0);
    } else {
        setCurrentIndex(currentIndex + eventsPerPage);
    }
  }

  const previousEvents = () => {
    if (currentIndex + eventsPerPage >= going.length) {
      setCurrentIndex(0);
    } else {
      if (currentIndex === 0) {
        return;
      } else {
        setCurrentIndex(currentIndex - eventsPerPage);
      }
    }
  }

  const nextGroups = () => {
    if (groupIndex + groupsPerPage >= nonGroup.length) {
      setGroupIndex(0);
    } else {
      if (groupIndex > (nonGroup.length - groupIndex)) {
        return;
      } else {
        setGroupIndex(groupIndex + groupsPerPage);
      }
    }
  }

  const previousGroups = () => {
    if (groupIndex + groupsPerPage >= nonGroup.length) {
      setGroupIndex(0);
    } else {
      if (groupIndex === 0) {
        return;
      } else {
        setGroupIndex(groupIndex - groupsPerPage);
      }
    }
  }

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
    <div>
    <Stack direction="row" spacing={1} sx={{ padding: "10px" }} justifyContent="space-around" alignItems="center">
      <Typography fontSize='30px'>
        Upcoming Events
      </Typography>
      <EditCalendarIcon sx={{fontSize: '40px', color: "#0097B2"}} onClick={newEvent}/>
    </Stack>
      <Stack direction="column" spacing={1} justifyContent="space-around" alignItems="center" >
        {currentEvents.map((event) =>
          <EventItem key={event.event_id} event={event} />  
        )}
      </Stack>
        {currentEvents.length > eventsPerPage ? 
          <Stack direction='row' justifyContent='space-between' sx={{ margin: '6px'}}>
          <IconButton onClick={previousEvents}>
            <ArrowBackIosNewIcon />
          </IconButton>
          <IconButton onClick={nextEvents}>
            <ArrowForwardIosIcon />
          </IconButton>
          </Stack>
          :
          <></>
        }
      </div>
      <div>
      {nonGroup.length>0 ? 
      <>
      <Stack direction="row" spacing={2} sx={{ padding: "20px" }} justifyContent="space-around" alignItems="center">
      <Typography fontSize='30px'>
        Explore New Groups
      </Typography>
      <GroupAddIcon sx={{fontSize: '40px', color: "#0097B2"}} onClick={newGroup}/>
      </Stack>
      <Stack direction="column" spacing={1} justifyContent="space-around" alignItems="center" >
      {currentGroups.map((group) => (
        <GroupItems key={group.id} group={group}/>
      ))}
      </Stack>
        {currentGroups.length > groupsPerPage ? 
          <Stack direction='row' justifyContent='space-between' sx={{ margin: '6px'}}>
          <IconButton onClick={previousGroups}>
            <ArrowBackIosNewIcon />
          </IconButton>
          <IconButton onClick={nextGroups}>
            <ArrowForwardIosIcon />
          </IconButton>
          </Stack>
          :
          <></>
        }
      </>
      :
      <></>
      }
    </div>
    </>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
