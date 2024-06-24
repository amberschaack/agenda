import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import moment from 'moment/moment';
import { CardOverflow, Grid } from '@mui/joy';
import { CardActions, CardContent } from "@mui/material";
import Button from '@mui/joy/Button';

export default function EventDetails() {
    const params = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const eventDetails = useSelector(store => store.eventDetails);
    const attendeesStore = useSelector(store => store.rsvp);
    const user = useSelector(store => store.user);
    console.log('Event Details Store:', eventDetails);
    console.log('Attendees Store:', attendeesStore);

    const attendees = attendeesStore.filter(attendee => attendee.status === 1);

    const going = attendees.some(attendee => attendee.username === user.username && attendee.status === 1);
    console.log('going', going);

    useEffect(() => {
        dispatch({ type: 'FETCH_EVENT_DETAILS', payload: params.id });
        dispatch({ type: 'FETCH_RSVP', payload: params.id })
    }, []);

    const backToUpcoming = () => {
        history.push('/user');
    }

    const removeRSVP = (status) => {
        console.log('clicked');
        dispatch({ type: 'UPDATE_RSVP', payload: {id: Number(params.id), status: Number(status), group_id: eventDetails.group_id }});
    }

    const addRSVP = (status) => {
        console.log('clicked');
        dispatch({ type: 'UPDATE_RSVP', payload: {id: Number(params.id), status: Number(status), group_id: eventDetails.group_id }});
    }

    return (
        <div className="container">
        <Grid>
            <Card sx={{width: 325, maxWidth: '100%' }}>
                <Typography level="title-lg" noWrap>{eventDetails.event_name}</Typography>
                <Typography level="body-md">Hosted By: {eventDetails.username}</Typography>
                <CardOverflow>
                    <AspectRatio sx={{ minWidth: 200 }}>
                        <img src={eventDetails.logo} />
                    </AspectRatio>
                </CardOverflow>
                <CardContent>
                    <Typography level="body-lg">
                        Date: {moment(eventDetails.event_date).format('LL')}
                    </Typography>
                    <Typography level="body-lg">
                        Time: {eventDetails.event_time}
                    </Typography>
                    <Typography level="body-lg">
                        Location: {eventDetails.location}
                    </Typography>
                    <Typography level="body-lg">
                        Details: {eventDetails.description}
                    </Typography>
                    <Typography level="body-lg">
                        Attendees: {attendees.map((attendee, i) =>
                        <li key={i}>{attendee.username}</li>
                        )}
                    </Typography>
                </CardContent>
                <CardActions>
                    {going ? 
                        <Button variant="solid" sx={{ bgcolor: "#0097B2" }} onClick={() => removeRSVP('2')}>
                            Remove RSVP
                        </Button>
                        :
                        <Button variant="solid" sx={{ bgcolor: "#0097B2" }} onClick={() => addRSVP('1')}>
                            RSVP
                        </Button>
                    }

                    <Button variant="solid" sx={{ bgcolor: "#0097B2" }} onClick={backToUpcoming}>
                        Back to Upcoming
                    </Button>
                </CardActions>
            </Card>
        </Grid>
        </div>
    )
}