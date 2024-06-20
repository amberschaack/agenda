import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function GroupItems({ group }) {
    const dispatch = useDispatch();

    const [joined, setJoined] = useState(false);

    const joinGroup = (groupId) => {
        console.log('Clicked', groupId);
        dispatch({ type: 'JOIN_GROUP', payload: groupId });
        setJoined(!joined);
    }
    return (
        <>
        <li key={group.id}>{group.name}</li>
        {!joined ? 
        <button onClick={() => joinGroup(group.id)}>Join Group</button>
        :
        <button>Joined</button>
        }
        </>
    )
}