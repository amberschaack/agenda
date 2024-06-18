import React, { useEffect, useState }from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

export default function EventForm() {
    const dispatch = useDispatch();
    const [newEvent, setNewEvent] = useState({event_date: '', event_time: '', event_name: '', description: '', location: '', event_type_id: '', event_admin: '', group_id: ''});
    console.log(newEvent);
    const types = useSelector(store => store.eventTypes);
    const groups = useSelector(store => store.group);
    console.log(types);
    console.log(groups);
    const history = useHistory();

    useEffect(() => {
        dispatch({ type: 'FETCH_EVENT_TYPES' });
        dispatch({ type: 'FETCH_GROUP' });
    }, []);

    const backToUpcoming = () => {
        history.push('/user');
    }

    const addEvent = (event) => {
        event.preventDefault();
        dispatch({ type: 'ADD_EVENT', payload: newEvent });
        setNewEvent({event_date: '', event_time: '', event_name: '', description: '', location: '', event_type_id: '', group_id: ''});
    }

    const handleChange = (event) => {
        switch (event.target.id) {
            case 'event-date':
                setNewEvent({...newEvent, event_date: event.target.value});
                break;
            case 'event-time':
                setNewEvent({...newEvent, event_time: event.target.value});
                break;
            case 'event-name':
                setNewEvent({...newEvent, event_name: event.target.value});
                break;
            case 'event-description':
                setNewEvent({...newEvent, description: event.target.value});
                break;
            case 'event-location':
                setNewEvent({...newEvent, location: event.target.value});
                break;
            case 'event-type':
                setNewEvent({...newEvent, event_type_id: event.target.value});
                break;
            case 'event-group':
                setNewEvent({...newEvent, group_id: event.target.value});
                break;
        }
    }

    return (
        <>
        <div className='container'>
        <h1>New Event Form</h1>
        <form onSubmit={addEvent}>
            <input id='event-date' type='date' placeholder='Event Date' value={newEvent.event_date} onChange={handleChange} />
            <input id='event-time' type='time' placeholder='Event Time' value={newEvent.event_time} onChange={handleChange} />
            <input id='event-name' type='text' placeholder='Event Name' value={newEvent.event_name} onChange={handleChange} />
            <br></br>
            <input id='event-description' type='text' placeholder='Event Description' value={newEvent.description} onChange={handleChange} />
            <br></br>
            <input id='event-location' type='text' placeholder='Event Location' value={newEvent.location} onChange={handleChange} />
            <br></br>
            <label htmlFor="event-type">Event Type:</label>
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
            <br></br>
            <br></br>
            <button>Create New Event</button>
        </form>
            <button onClick={backToUpcoming}>Cancel</button>
        </div>
        </>
    )
}