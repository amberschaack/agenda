import React from 'react';
import {useSelector} from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import moment from 'moment/moment';
import { CardOverflow, Grid, Stack } from '@mui/joy';
import { CardActions, CardContent } from "@mui/material";
import Button from '@mui/joy/Button';
import EventItem from '../Events/EventItem';
import Add from '@mui/icons-material/Add';

export default function MyEvents() {
    const events = useSelector(store => store.event);
    const ownedEvents = useSelector(store => store.myEvent);
    console.log('owned events', ownedEvents);
    console.log('All Events:', events);
    const dispatch = useDispatch();
    const history = useHistory();

    const pending = events.filter(event => event.rsvp_status === null);
    console.log('Pending events:', pending);
    const going = events.filter(event => event.rsvp_status === 1);
    const notGoing = events.filter(event => event.rsvp_status === 2);


    useEffect(() => {
        dispatch({ type: 'FETCH_EVENT' });
        dispatch({ type: 'FETCH_MY_EVENT' });
      }, []);

      const newEvent = () => {
        console.log('Clicked');
        history.push('/add-event');
      }

    return (
        <div className="container">
            <h1>My Events</h1>
            <h3>Upcoming Events:</h3>
            <Stack direction="column" justifyContent="space-around" alignItems="center" spacing={1} sx={{ paddingBottom: "10px" }}>
                    {going.map((event) =>
                    <EventItem key={event.event_id} event={event} />  
                    )}
            </Stack>
            {ownedEvents.length>0 ? 
            <>
            <h3>Manage My Events:</h3>
            <Stack direction="column" justifyContent="space-around" alignItems="center" spacing={1} sx={{ paddingBottom: "10px" }}>
                    {ownedEvents.map((myEvent) =>
                    <EventItem key={myEvent.event_id} event={myEvent} />  
                    )}
            </Stack>
            </>
            :
            <>
            <h3>Manage My Events:</h3>
            <Stack direction="column" justifyContent="space-around" alignItems="center" spacing={1} sx={{ paddingBottom: "10px" }}>
                <Typography fontSize='20px'>You currently don't own any events.</Typography>
                <Button sx={{ bgcolor: "#0097B2", mb: "10px" }} startDecorator={<Add />} onClick={newEvent} >Create New Event</Button>
            </Stack>
            </>
            }
            {pending.length>0 ? 
            <>
            <h3>Pending Events:</h3>
            <Stack direction="column" justifyContent="space-around" alignItems="center" spacing={1} sx={{ paddingBottom: "10px" }}>
                    {pending.map((pEvent) =>
                    <EventItem key={pEvent.event_id} event={pEvent} />  
                    )}
             </Stack>
            </>
            :
            <></>
            }
            {notGoing.length>0 ? 
            <>
            <h3>Denied Events:</h3>              
            <Stack direction="column" justifyContent="space-around" alignItems="center" spacing={1} sx={{ paddingBottom: "10px" }}>
                    {notGoing.map((nEvent) =>
                    <EventItem key={nEvent.event_id} event={nEvent} />  
                    )}
             </Stack>
            </>
            :
            <></>
            }
        </div>
    )
}