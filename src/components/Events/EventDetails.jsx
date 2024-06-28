import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import moment from 'moment/moment';
import { Box, CardOverflow, Grid } from '@mui/joy';
import { CardActions, CardContent, Stack } from "@mui/material";
import Button from '@mui/joy/Button';
import Avatar from '@mui/joy/Avatar';
import AvatarGroup from '@mui/joy/AvatarGroup';
import Divider from '@mui/joy/Divider';
import dayjs from "dayjs";


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
    console.log('attendees', attendees);

    const going = attendees.some(attendee => attendee.username === user.username && attendee.status === 1);
    console.log('going', going);

    useEffect(() => {
        dispatch({ type: 'FETCH_EVENT_DETAILS', payload: params.id });
        dispatch({ type: 'FETCH_RSVP', payload: params.id });
        window.scrollTo(0, 0);
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

    function clampAvatars(attendees, options = { max: 6 }) {
        const { max = 6, total } = options;
        let clampedMax = max < 2 ? 2 : max;
        const totalAvatars = total || attendees.length;
        if (totalAvatars === clampedMax) {
          clampedMax += 1;
        }
        clampedMax = Math.min(totalAvatars + 1, clampedMax);
        const maxAvatars = Math.min(attendees.length, clampedMax - 1);
        const surplus = Math.max(totalAvatars - clampedMax, totalAvatars - maxAvatars, 0);
        return { avatars: attendees.slice(0, maxAvatars).reverse(), surplus };
      }

      const { avatars, surplus } = clampAvatars(attendees, {
        max: 6,
        total: attendees.total,
      });

    return (
        <div className="container">
        <Grid container justifyContent="center">
            <Box sx={{ maxHeight: '80vh', overflow: 'auto'}}>
            <Card sx={{ width: '90vw' }}>
                <Typography level="title-lg" noWrap>{eventDetails.event_name}</Typography>
                <Typography level="body-md">Hosted By: {eventDetails.username}</Typography>
                <CardOverflow>
                    <AspectRatio sx={{ minWidth: 200 }}>
                        <img src={eventDetails.logo} />
                    </AspectRatio>
                </CardOverflow>
                <CardContent>
                    <Typography level='body-md' fontWeight='bold'>Event Date:</Typography>
                    <Typography level="body-lg">
                        {moment(eventDetails.event_date).format('LL')}
                    </Typography>
                    <Divider inset="none" />
                    <Typography level='body-md' fontWeight='bold'>Event Time:</Typography>
                    <Typography level="body-lg">
                        {moment(eventDetails.event_time, "hh:mm:ss").format('h:mm A')}
                    </Typography>
                    <Divider inset="none" />
                    <Typography level='body-md' fontWeight='bold'>Event Location:</Typography>
                    <Typography level="body-lg">
                        {eventDetails.location}
                    </Typography>
                    <Divider inset="none" />
                    <Typography level='body-md' fontWeight='bold'>Event Details:</Typography>
                    <Typography level="body-lg">
                        {eventDetails.description}
                    </Typography>
                    <Divider inset="none" />
                    <Typography level='body-md' fontWeight='bold' sx={{ mb: '10px' }}>Attendees:</Typography>
                    <AvatarGroup sx={{ flexDirection: 'row', "--Avatar-size": "52px" }}>
                        {avatars.map((attendee, i) => (
                            <>
                                <Avatar alt={attendee.username} src={attendee.user_avatar} key={attendee.id} />
                            </>
                        ))}
                        {!!surplus && <Avatar>+{surplus}</Avatar>}
                    </AvatarGroup>
                </CardContent>
                <CardActions>
                    <Stack direction="row" justifyContent="space-evenly" alignItems="center" spacing={9}>
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
                    </Stack>
                </CardActions>
            </Card>
            </Box>
        </Grid>
        </div>
    )
}