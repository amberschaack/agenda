import React from 'react';
import {useSelector} from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import GroupItems from './GroupItems';
import MyGroupItems from './MyGroupItems';

export default function MyGroups() {
    const groups = useSelector(store => store.group);
    const myGroups = useSelector(store => store.myGroup);
    console.log('groups', groups);
    console.log('my groups', myGroups);
    const user = useSelector(store => store.user);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch({ type: 'FETCH_GROUP' });
        dispatch({ type: 'FETCH_MY_GROUP' });
    }, []);

    // const myGroups = groups.filter(group => group.owner === user.username);
    // console.log('My groups:', myGroups);



    return (
        <div className="container">
        <h1>My Groups</h1>
        <h3>Joined Groups</h3>
            <div className='container'>
                {groups.map((group) => (
                    <GroupItems key={group.id} group={group} />
                ))}
            </div>
        {myGroups.length>0 ? 
        <>
        <h3>Manage My Groups</h3>
            <div className='container'>
                {myGroups.map((group) => (
                    <MyGroupItems key={group.id} group={group} />
                ))}
            </div>
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