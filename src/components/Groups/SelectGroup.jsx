import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import GroupItems from './GroupItems';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


export default function SelectGroup() {
    const dispatch = useDispatch();
    const history = useHistory();
    const groups = useSelector(store => store.allGroups);
    console.log(groups);

    useEffect(() => {
        dispatch({ type: 'FETCH_ALL_GROUPS' });
    }, []);

    const nextPage = () => {
        history.push('/user');
        dispatch({ type: 'FETCH_GROUP' });
    }

    return (
        <div className="container">
            <h1>Select a Group to Join:</h1>
                {groups.map((group) => (
                    <GroupItems key={group.id} group={group}/>
                ))}
            <button onClick={nextPage}>Done</button>
        </div>
    )
}