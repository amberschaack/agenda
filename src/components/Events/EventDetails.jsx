import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

export default function EventDetails() {
    const params = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const eventDetails = useSelector(store => store.eventDetails);
    const attendees = useSelector(store => store.rsvp);
    console.log('Event Details Store:', eventDetails);
    console.log('Attendees Store:', attendees);

    useEffect(() => {
        dispatch({ type: 'FETCH_EVENT_DETAILS', payload: params.id });
        dispatch({ type: 'FETCH_RSVP', payload: params.id })
    }, []);

    const backToUpcoming = () => {
        history.push('/user');
    }

    return (
        <>
        <h1>Event Details</h1>
            <h2>{eventDetails.event_name}</h2>
                <h4>Admin: {eventDetails.username}</h4>
                <h4>{eventDetails.event_date}</h4>
                <h4>{eventDetails.event_time}</h4>
                <h4>{eventDetails.location}</h4>
                <h4>{eventDetails.description}</h4>
            <h2>Attendees:</h2>
                <ul>
                    {attendees.map((attendee, i) =>
                        <li key={i}>{attendee.username}</li>
                    )}
                </ul>
        <button onClick={backToUpcoming}>Back to Upcoming Events</button>
        </>
    )
}