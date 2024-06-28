import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import moment from 'moment/moment';
import { CardOverflow, Grid } from '@mui/joy';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import CardContent from '@mui/joy/CardContent';

export default function EventItem({ event }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(store => store.user);
    console.log('User', user);
    console.log('event', event);


    const eventDetails = (eventid) => {
        console.log('Clicked', eventid);
        dispatch({ type: 'FETCH_EVENT_DETAILS', payload: eventid });
        history.push(`/event/details/${eventid}`);
    }

    const editEvent = (eventid) => {
        console.log('Clicked', eventid);
        dispatch({ type: 'FETCH_EVENT_DETAILS', payload: eventid });
        history.push(`/event/edit/${eventid}`);
    }

    return (
        <>
            <Card orientation="horizontal" variant="outlined" sx={{ width: '90vw' }}>
                <CardOverflow>
                    <AspectRatio ratio="1" sx={{ width: 90 }}>
                        <img src={event.logo} />
                    </AspectRatio>
                </CardOverflow>
                <CardContent>
                <CardOverflow>
                    <Typography fontWeight="md"  noWrap sx={{width: '200px'}} className='event-name'>
                        {event.event_name}
                    </Typography>
                </CardOverflow>
                    <Typography level="body-sm">
                        {moment(event.event_date).format('LL')}
                    </Typography>
                </CardContent>
                {user.username === event.username ? 
                <CardOverflow
                    onClick={() => editEvent(event.event_id)}
                    variant="soft"
                    color="primary"
                    sx={{
                    px: 2,
                    writingMode: 'vertical-rl',
                    justifyContent: 'center',
                    fontSize: 'xs',
                    fontWeight: 'xl',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    borderLeft: '1px solid',
                    borderColor: 'divider',
                    cursor: 'pointer'
                    }}
                >
                    EDIT
                </CardOverflow>
                :
                <CardOverflow
                    onClick={() => eventDetails(event.event_id)}
                    variant="soft"
                    color="primary"
                    sx={{
                    px: 2,
                    writingMode: 'vertical-rl',
                    justifyContent: 'center',
                    fontSize: 'xs',
                    fontWeight: 'xl',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    borderLeft: '1px solid',
                    borderColor: 'divider',
                    cursor: 'pointer'
                    }}
                >
                    VIEW
                </CardOverflow>
                }
            </Card>
        </>
    )
}