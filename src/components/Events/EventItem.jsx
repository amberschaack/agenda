import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import moment from 'moment/moment';
import { Grid } from '@mui/joy';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function EventItem({ event }) {
    const dispatch = useDispatch();
    const history = useHistory();


    const eventDetails = (eventid) => {
        console.log('Clicked', eventid);
        dispatch({ type: 'FETCH_EVENT_DETAILS', payload: eventid });
        history.push(`/event/details/${eventid}`);
      }

    return (
        <>
        <Grid>
            <Card sx={{ width: 250, height: 200, flexGrow: 1, mb: 2 }} id='card'
            onClick={() => eventDetails(event.event_id)}>
                <div>
                    <Typography level="title-lg" noWrap>{event.event_name}</Typography>
                    <Typography level="body-sm">{moment(event.event_date).format('LL')}</Typography>
                </div>
                <AspectRatio minHeight="50px" maxHeight="200px">
                    <img src={event.photo} loading="lazy" />
                </AspectRatio>
            </Card>
        </Grid>
        </>
    )
}