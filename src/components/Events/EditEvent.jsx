import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

export default function EditEvent() {
    const params = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const eventDetails = useSelector(store => store.eventDetails);
    console.log('Event Details Store:', eventDetails);
    
    // const [editEvent, setEditEvent] = useState(eventDetails);

    // useEffect(() => {
    //     // dispatch({ type: 'FETCH_EVENT_DETAILS', payload: params.id });
    //     return () => dispatch({type: 'CLEAR_EVENT_DETAILS'});
    // }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('All my changes', eventDetails);
        const myModifiedDetails = {event_date: eventDetails.event_date, event_time: eventDetails.event_time,
            event_name: eventDetails.event_name, description: eventDetails.description, location: eventDetails.location};
        dispatch({ type: 'EDIT_EVENT', payload: {eventId: eventDetails.event_id, details: myModifiedDetails} });
        history.push('/my-events');
    }

    return (
        <>
        <div className='container'>
        <h1>Update {eventDetails?.event_name}</h1>
        <form onSubmit={handleSubmit}>
            {/* <input id='event-date' type='date' placeholder='Event Date' value={editEvent?.event_date} 
                onChange={(event) => setEditEvent({...editEvent, event_date: event.target.value})} />
            <input id='event-time' type='time' placeholder='Event Time' value={editEvent?.event_time} 
                onChange={(event) => setEditEvent({...editEvent, event_time: event.target.value})} /> */}
            <input id='event-name' type='text' placeholder='Event Name' value={eventDetails?.event_name}
                onChange={(event) => dispatch({type: 'EDIT_EVENT_DETAILS', payload: {event_name: event.target.value}})} />
            <br></br>
            <input id='event-description' type='text' placeholder='Event Desc.' value={eventDetails?.description}
                onChange={(event) => dispatch({type: 'EDIT_EVENT_DETAILS', payload: {description: event.target.value}})} />
            <br></br>
            {/* <input id='event-location' type='text' placeholder='Event Location' value={editEvent?.location}
                onChange={(event) => setEditEvent({...editEvent, location: event.target.value})} /> */}
            <br></br>
            {/* <label htmlFor="event-type">Event Type:</label>
                <select id="event-type" onChange={handleChange}>
                    {types.map((type, i) => (
                        <option key={i}
                            placeholder='Event Type'
                            value={type.event_type_id}>
                            {type.event_type}</option>
                    ))}
                </select>
            <br></br>
            <br></br>
            <label htmlFor="event-group">Select Group:</label>
                <select id="event-group" onChange={handleChange}>
                    {groups.map((group, i) => (
                        <option key={i}
                            placeholder='Event Group'
                            value={group.id}>
                            {group.name}</option>
                    ))}
                </select>
            <br></br> */}
            <br></br>
            <button>Update Event</button>
        </form>
            <button>Cancel</button>
        </div>
        </>
    )
}