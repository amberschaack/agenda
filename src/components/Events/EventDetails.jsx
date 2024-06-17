import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

export default function EventDetails() {
    const params = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const eventDetails = useSelector(store => store.eventDetails);
    console.log('Event Details Store:', eventDetails);

    useEffect(() => {
        dispatch({ type: 'FETCH_EVENT_DETAILS', payload: params.id })
    }, []);

    const backToUpcoming = () => {
        history.push('/user');
    }

    return (
        <>
        <h1>Event Details</h1>
            <h2>{eventDetails.event_name}</h2>
            <h3>{eventDetails.event_date}</h3>
            <h3>{eventDetails.event_time}</h3>
            <h3>{eventDetails.location}</h3>
            <h3>{eventDetails.description}</h3>
        <button onClick={backToUpcoming}>Back to Upcoming Events</button>
        </>
    )
}