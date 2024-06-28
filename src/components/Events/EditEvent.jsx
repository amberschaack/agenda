import { Button, Stack, Typography } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useEffect } from 'react';

export default function EditEvent() {
    const dispatch = useDispatch();
    const history = useHistory();
    const eventDetails = useSelector(store => store.eventDetails);
    console.log('Event Details Store:', eventDetails);

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('All my changes', eventDetails);
        dispatch({ type: 'EDIT_EVENT', payload: {eventId: eventDetails.event_id, details: eventDetails} });
        history.push('/my-events');
    }

    const backToMyEvents = () => {
        history.push('/my-events');
    }

    const deleteEvent = (eventId) => {
        console.log('clicked', eventId);
        dispatch({ type: 'DELETE_EVENT', payload: eventId });
        history.push('/my-events');
    }

    return (
        <>
        <div className='container'>
        <form onSubmit={handleSubmit}>
        <Stack
          direction='row'
          justifyContent='space-between'
          sx={{ mb: '10px' }}
        >
            <Button sx={{ bgcolor: '#ADB5BD' }} onClick={backToMyEvents}>Cancel</Button>
            <Button type='submit' sx={{ bgcolor: '#1BAC5C' }}>Save</Button>
        </Stack>
        <Stack alignItems='center'>
            <Typography level='h3' sx={{mb: '10px'}}> Edit {eventDetails?.event_name}</Typography>
        </Stack>
            <div className="col-12 mb-3">
                <label>Event Date</label>
                <input id='event-date' type='date' placeholder='Event Date' value={eventDetails?.event_date} className="form-control"
                onChange={(event) => dispatch({type: 'EDIT_EVENT_DETAILS', payload: {event_date: event.target.value}})} />
            </div>
            <div className="col-12 mb-3">
                <label>Event Time</label>
                <input id='event-time' type='time' placeholder='Event Time' value={eventDetails?.event_time} className="form-control"
                onChange={(event) => dispatch({type: 'EDIT_EVENT_DETAILS', payload: {event_time: event.target.value}})} />
            </div>
            <div className="col-12 mb-3">
                <label>Event Name</label>
                <input id='event-name' type='text' placeholder='Event Name' value={eventDetails?.event_name} className="form-control"
                onChange={(event) => dispatch({type: 'EDIT_EVENT_DETAILS', payload: {event_name: event.target.value}})} />
            </div>
            <div className="col-12 mb-3">
                <label>Event Description</label>
                <input id='event-description' type='text' placeholder='Event Desc.' value={eventDetails?.description} className="form-control"
                onChange={(event) => dispatch({type: 'EDIT_EVENT_DETAILS', payload: {description: event.target.value}})} />
            </div>
            <div className="col-12 mb-3">
                <label>Event Location</label>
                <input id='event-location' type='text' placeholder='Event Location' value={eventDetails?.location} className="form-control"
                onChange={(event) => dispatch({type: 'EDIT_EVENT_DETAILS', payload: {location: event.target.value}})} />
            </div>
        </form>
        <Stack direction='row' justifyContent='space-evenly' alignItems='center'>
            <Button
            sx={{ bgcolor: '#AC2C1B', mt: '20px' }}
            onClick={() => deleteEvent(eventDetails.event_id)}
            >
            Delete Event
            </Button>
        </Stack>
        </div>
        </>
    )
}