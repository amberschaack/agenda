import { Button, Stack } from '@mui/joy';
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
    console.log('groups', groups);
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
        history.push('my-events');
        setNewEvent({event_date: '', event_time: '', event_name: '', description: '', location: '', event_type_id: '', group_id: ''});
    }

    const handleChange = (event) => {
        console.log('event id', event.target.id);
        console.log('event value', event.target.value);
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
            <div className='col-12 mb-3'>
                <label>Event Date</label>
                <input type='date' className='form-control' id='event-date' value={newEvent.event_date} onChange={handleChange}/>
            </div>
            <div className='col-12 mb-3'>
                <label>Event Time</label>
                <input type='time' className='form-control' id='event-time' value={newEvent.event_time} onChange={handleChange}/>
            </div>
            <div className='col-12 mb-3'>
                <label>Event Name</label>
                <input type='text' className='form-control' placeholder='Event Name' id='event-name' value={newEvent.event_name} onChange={handleChange}/>
            </div>
            <div className='col-12 mb-3'>
                <label>Event Description</label>
                <input type='text' className='form-control' placeholder='Event Description' id='event-description' value={newEvent.description} onChange={handleChange}/>
            </div>
            <div className='col-12 mb-3'>
                <label>Event Location</label>
                <input type='text' className='form-control' placeholder='Event Location' id='event-location' value={newEvent.location} onChange={handleChange}/>
            </div>
            <div className='col-6 mb-3'>
                <label>Event Type</label>
                <select className='form-select' id="event-type" onChange={handleChange}>
                <option selected>Choose Type...</option>
                {types.map((type, i) => (
                            <option key={i}
                                value={type.event_type_id}>
                                {type.event_type}</option>
                        ))}
                </select>
            </div>
            <div className='col-6 mb-3'>
                <label>Event Group</label>
                <select className='form-select' id="event-group" onChange={handleChange}>
                <option selected>Choose Group...</option>
                {groups.map((group, i) => (
                            <option key={i}
                                value={group.id}>
                                {group.name}</option>
                        ))}
                </select>
            </div>
            <Stack
                direction='row'
                justifyContent='space-between'
                sx={{ mb: '10px' }}
            >
            <Button onClick={backToUpcoming} sx={{ bgcolor: '#ADB5BD' }}>Cancel</Button>
            <Button sx={{ bgcolor: '#1BAC5C' }} type="submit">Create New Event</Button>
            </Stack>
        </form>
        </div>
        </>
    )
}