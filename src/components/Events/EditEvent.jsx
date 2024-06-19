import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

export default function EditEvent() {
    const dispatch = useDispatch();
    const history = useHistory();
    const eventDetails = useSelector(store => store.eventDetails);
    console.log('Event Details Store:', eventDetails);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('All my changes', eventDetails);
        const myModifiedDetails = {event_date: eventDetails.event_date, event_time: eventDetails.event_time,
            event_name: eventDetails.event_name, description: eventDetails.description, location: eventDetails.location};
        dispatch({ type: 'EDIT_EVENT', payload: {eventId: eventDetails.event_id, details: myModifiedDetails} });
        history.push('/my-events');
    }

    const backToMyEvents = () => {
        history.push('/my-events');
    }

    return (
        <>
        <div className='container'>
        <h1>Update {eventDetails?.event_name}</h1>
        <form onSubmit={handleSubmit}>
            <input id='event-date' type='date' placeholder='Event Date' value={eventDetails?.event_date} 
                onChange={(event) => dispatch({type: 'EDIT_EVENT_DETAILS', payload: {event_date: event.target.value}})} />
            <input id='event-time' type='time' placeholder='Event Time' value={eventDetails?.event_time} 
                onChange={(event) => dispatch({type: 'EDIT_EVENT_DETAILS', payload: {event_time: event.target.value}})} />
            <input id='event-name' type='text' placeholder='Event Name' value={eventDetails?.event_name}
                onChange={(event) => dispatch({type: 'EDIT_EVENT_DETAILS', payload: {event_name: event.target.value}})} />
            <br></br>
            <input id='event-description' type='text' placeholder='Event Desc.' value={eventDetails?.description}
                onChange={(event) => dispatch({type: 'EDIT_EVENT_DETAILS', payload: {description: event.target.value}})} />
            <br></br>
            <input id='event-location' type='text' placeholder='Event Location' value={eventDetails?.location}
                onChange={(event) => dispatch({type: 'EDIT_EVENT_DETAILS', payload: {location: event.target.value}})} />
            <br></br>
            <button>Update Event</button>
        </form>
            <button onClick={backToMyEvents}>Cancel</button>
        </div>
        </>
    )
}