import React, { useEffect, useState }from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function EventForm() {
    const dispatch = useDispatch();
    const [newEvent, setNewEvent] = useState({event_date: '', event_time: '', event_name: '', description: '', location: '', event_type_id: '', event_admin: '', group_id: ''});
    const types = useSelector(store => store.eventTypes);
    console.log(types);

    useEffect(() => {
        dispatch({ type: 'FETCH_EVENT_TYPES' });
    }, []);

    const addEvent = (event) => {
        event.preventDefault();
        dispatch({ type: 'POST_EVENT', payload: newEvent });
        setNewEvent({event_date: '', event_time: '', event_name: '', description: '', location: '', event_type_id: '', event_admin: '', group_id: ''});
    }

    const handleChange = (event) => {
        switch (event.target.placeholder) {
            case 'Event Date':
                setNewEvent({...newEvent, event_date: event.target.value});
                break;
            case 'Event Time':
                setNewEvent({...newEvent, event_time: event.target.value});
                break;
            case 'Event Name':
                setNewEvent({...newEvent, event_name: event.target.value});
                break;
            case 'Event Description':
                setNewEvent({...newEvent, event_description: event.target.value});
                break;
            case 'Event Type':
                setNewEvent({...newEvent, event_type_id: event.target.value})
        }
    }

    return (
        <>
        <h1>New Event Form</h1>
        <form onSubmit={addEvent}>
            <input type='date' placeholder='Event Date' value={newEvent.event_date} onChange={handleChange} />
            <input type='time' placeholder='Event Time' value={newEvent.event_time} onChange={handleChange} />
            <input type='text' placeholder='Event Name' value={newEvent.event_name} onChange={handleChange} />
            <input type='text' placeholder='Event Description' value={newEvent.description} onChange={handleChange} />
            <label htmlFor="event-types">Event Type:</label>
                <select name="event-types">
                    {types.map((type, i) => (
                        <option key={i}
                            placeholder='Event Type'
                            value={newEvent.event_type_id}>
                            {type.event_type}</option>
                    ))}
                </select>
        </form>
        </>
    )
}