import React from 'react';
import {useSelector} from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

export default function MyGroups() {
    const groups = useSelector(store => store.group);
    console.log(groups);
    const user = useSelector(store => store.user);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch({ type: 'FETCH_GROUP' });
    }, []);

    const myGroups = groups.filter(group => group.owner === user.id);
    console.log(myGroups);

    const groupDetails = (groupid) => {
        dispatch({ type: 'FETCH_GROUP_DETAILS', payload: groupid });
        history.push(`/group/details/${groupid}`);
    }

    const editGroup = (groupid) => {
        console.log('Clicked', groupid);
        dispatch({ type: 'FETCH_GROUP_DETAILS', payload: groupid });
        history.push(`/group/edit/${groupid}`);
    }

    return (
        <div className="container">
        <h1>My Groups</h1>
        <h3>Joined Groups</h3>
            <ul>
                {groups.map((group) => (
                    <li key={group.id} onClick={() => groupDetails(group.id)}>{group.name}</li>
                ))}
            </ul>
        {myGroups.length>0 ? 
        <>
            <h3>Manage My Groups</h3>
            <ul>
                {myGroups.map((myGroup) => (
                    <li key={myGroup.id} onClick={() => editGroup(myGroup.id)}>{myGroup.name}</li>
                ))}
            </ul>
        </>
        :
        <>
        <h3>Manage My Groups</h3>
        <ul>
                <li>You currently don't own any groups.</li>
                <button>Create New Group</button>
            </ul>
        </>
        }
        </div>
    )
}