import React from 'react';
import {useSelector} from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';


export default function SelectGroup() {
    const dispatch = useDispatch();
    const groups = useSelector(store => store.allGroups);
    console.log(groups);

    useEffect(() => {
        dispatch({ type: 'FETCH_ALL_GROUPS' });
    }, []);

    return (
        <div className="container">
            <h1>Select a Group to Join:</h1>
            <ul>
                {groups.map((group) => (
                    <li key={group.id}>{group.name}</li>
                ))}
            </ul>
        </div>
    )
}