import React, { useState } from 'react';
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
import {IconButton} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';

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
        window.scrollTo(0, 0);
      }, []);

    const eventsPerPage = 3;
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentEvents = going.slice(currentIndex, currentIndex + eventsPerPage);

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

      const myEventsPerPage = 3;
      const [myCurrentIndex, setMyCurrentIndex] = useState(0);
      const myCurrentEvents = ownedEvents.slice(myCurrentIndex, myCurrentIndex + myEventsPerPage);
  
      const myNextEvents = () => {
          if (myCurrentIndex + myEventsPerPage >= ownedEvents.length) {
            setMyCurrentIndex(0);
          } else {
              setMyCurrentIndex(myCurrentIndex + myEventsPerPage);
          }
        }
      
        const myPreviousEvents = () => {
          if (myCurrentIndex + myEventsPerPage >= ownedEvents.length) {
            setMyCurrentIndex(0);
          } else {
            if (myCurrentIndex === 0) {
              return;
            } else {
              setMyCurrentIndex(myCurrentIndex - myEventsPerPage);
            }
          }
        }

        const pendPerPage = 2;
        const [pendIndex, setPendIndex] = useState(0);
        const pendEvents = pending.slice(pendIndex, pendIndex + pendPerPage);
    
        const nextPendEvents = () => {
            if (pendIndex + pendPerPage >= pending.length) {
              setPendIndex(0);
            } else {
                setPendIndex(pendIndex + pendPerPage);
            }
          }
        
          const prevPendEvents = () => {
            if (pendIndex + pendPerPage >= pending.length) {
              setPendIndex(0);
            } else {
              if (pendIndex === 0) {
                return;
              } else {
                setPendIndex(pendIndex - pendPerPage);
              }
            }
          }

          const notPerPage = 2;
          const [notIndex, setNotIndex] = useState(0);
          const notEvents = notGoing.slice(notIndex, notIndex + notPerPage);
      
          const nextNotEvents = () => {
              if (notIndex + notPerPage >= notGoing.length) {
                setNotIndex(0);
              } else {
                  setNotIndex(notIndex + notPerPage);
              }
            }
          
            const prevNotEvents = () => {
              if (notIndex + notPerPage >= notGoing.length) {
                setNotIndex(0);
              } else {
                if (notIndex === 0) {
                  return;
                } else {
                  setNotIndex(notIndex - notPerPage);
                }
              }
            }

      const newEvent = () => {
        console.log('Clicked');
        history.push('/add-event');
      }

    return (
        <div className='container'>
            <center>
                <h1>My Events</h1>
            </center>
            <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{mb: '5px'}}>
             <h3>Upcoming Events</h3>
             <EditCalendarIcon sx={{fontSize: '40px', color: "#0097B2", cursor: 'pointer'}} onClick={newEvent}/>
            </Stack>
            <Stack direction="column" justifyContent="space-around" alignItems="center" spacing={1} sx={{ paddingBottom: "10px" }}>
                    {currentEvents.map((event) =>
                    <EventItem key={event.event_id} event={event} />  
                    )}
            </Stack>
            {/* {currentEvents.length > eventsPerPage ?  */}
                <Stack direction='row' justifyContent='space-between' sx={{ margin: '6px'}}>
                    <IconButton onClick={previousEvents}>
                        <ArrowBackIosNewIcon />
                    </IconButton>
                    <IconButton onClick={nextEvents}>
                        <ArrowForwardIosIcon />
                    </IconButton>
                </Stack>

            {ownedEvents.length>0 ? 
            <>
            <h3>Manage My Events</h3>
            <Stack direction="column" justifyContent="space-around" alignItems="center" spacing={1} sx={{ paddingBottom: "10px" }}>
                    {myCurrentEvents.map((myEvent) =>
                    <EventItem key={myEvent.event_id} event={myEvent} />  
                    )}
            </Stack>
                    {/* {myCurrentEvents.length > myEventsPerPage ?  */}
                        <Stack direction='row' justifyContent='space-between' sx={{ margin: '6px'}}>
                            <IconButton onClick={myPreviousEvents}>
                                <ArrowBackIosNewIcon />
                            </IconButton>
                            <IconButton onClick={myNextEvents}>
                                <ArrowForwardIosIcon />
                            </IconButton>
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
                    {pendEvents.map((pEvent) =>
                    <EventItem key={pEvent.event_id} event={pEvent} />  
                    )}
             </Stack>
                    {/* {pendEvents.length > pendPerPage ?  */}
                        <Stack direction='row' justifyContent='space-between' sx={{ margin: '6px'}}>
                            <IconButton onClick={prevPendEvents}>
                                <ArrowBackIosNewIcon />
                            </IconButton>
                            <IconButton onClick={nextPendEvents}>
                                <ArrowForwardIosIcon />
                            </IconButton>
                        </Stack>
            </>
            :
            <></>
            }
            {notGoing.length>0 ? 
            <>
            <h3>Denied Events:</h3>              
            <Stack direction="column" justifyContent="space-around" alignItems="center" spacing={1} sx={{ paddingBottom: "10px" }}>
                    {notEvents.map((nEvent) =>
                    <EventItem key={nEvent.event_id} event={nEvent} />  
                    )}
             </Stack>
                    {/* {notEvents.length > notPerPage ?  */}
                        <Stack direction='row' justifyContent='space-between' sx={{ margin: '6px'}}>
                            <IconButton onClick={prevNotEvents}>
                                <ArrowBackIosNewIcon />
                            </IconButton>
                            <IconButton onClick={nextNotEvents}>
                                <ArrowForwardIosIcon />
                            </IconButton>
                        </Stack>
            </>
            :
            <></>
            }
        </div>
    )
}