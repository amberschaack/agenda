import React from 'react';
import {useSelector} from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

export default function MyEvents() {
    const events = useSelector(store => store.event);
    const user = useSelector(store => store.user);
    console.log('All Events:', events);
    const dispatch = useDispatch();
    const history = useHistory();

    const pending = events.filter(event => event.status === 3);
    console.log('Pending events:', pending);
    const going = events.filter(event => event.status === 1);
    const notGoing = events.filter(event => event.status === 2);
    const myEvents = events.filter(event => event.admin === user.username);
    console.log('My events:', myEvents);

    useEffect(() => {
        dispatch({ type: 'FETCH_EVENT' });
      }, []);
    
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
        <div className="container">
            <h1>My Events</h1>
            <h3>Upcoming Events:</h3>
                <ul>
                    {going.map((gEvent) =>
                     <li key={gEvent.event_id} onClick={() => eventDetails(gEvent.event_id)}>{gEvent.event_name}</li>  
                     )}
                 </ul>
            {myEvents.length>0 ? 
            <>
            <h3>Manage My Events:</h3>
                <ul>
                    {myEvents.map((myEvent) => (
                        <li key={myEvent.event_id} onClick={() => editEvent(myEvent.event_id)}>{myEvent.event_name}</li>
                    ))}
                </ul>
            </>
            :
            <>
            <h3>Manage My Events:</h3>
            <ul>
                <li>You currently don't own any events.</li>
                <button>Create New Event</button>
            </ul>
            </>
            }
            {pending.length>0 ? 
            <>
            <h3>Pending Events:</h3>
                <ul>
                    {pending.map((pEvent) => (
                        <li key={pEvent.event_id} onClick={() => eventDetails(pEvent.event_id)}>{pEvent.event_name}</li>
                    ))}
                </ul>
            </>
            :
            <></>
            }
            {notGoing.length>0 ? 
            <>
            <h3>Denied Events:</h3>
                <ul>
                    {notGoing.map((nEvent) => (
                        <li key={nEvent.event_id} onClick={() => eventDetails(nEvent.event_id)}>{nEvent.event_name}</li>
                    ))}
                </ul>
            </>
            :
            <></>
            }
        </div>
    )
}